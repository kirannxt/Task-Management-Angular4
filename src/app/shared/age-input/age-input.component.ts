
import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  NG_VALIDATORS, 
  FormControl, 
  FormBuilder, 
  FormGroup
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/rx';
import 'rxjs/add/operator/map';
import {isValidDate} from '../../utils/date.util';

import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
  isFuture,
  isDate,
  isValid
} from 'date-fns';

// define the enum type AgeUnit
export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}



@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,

      // will wait until the 'ImageListSelectComponent' instance, and then DI
      useExisting: forwardRef(() => AgeInputComponent),
      // one for mult
      multi: true
    },
    {
      provide: NG_VALIDATORS,

      // will wait until the 'ImageListSelectComponent' instance, and then DI
      useExisting: forwardRef(() => AgeInputComponent),
      // one for mult
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  // dateOfBirth;
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthTop = 24;
  @Input() monthBottom = 1;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 1;
  @Input() format = 'DD/MM/YYYY';
  @Input() debounceTime = 500;


  selectedUnit = AgeUnit.Year;

  ageUnits = [
    {value: AgeUnit.Year, label: 'Year'},
    {value: AgeUnit.Month, label: 'Month'},
    {value: AgeUnit.Day, label: 'Day'}
  ];

  birthdayForm: FormGroup

  sub: Subscription;

  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder) { };

  ngOnInit() {
    this.birthdayForm = this.fb.group({
      // valide the formControlName="birthday"
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
        // valide the formGroupName="age"
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });

    // get the three elements
    const birthday = this.birthdayForm.get('birthday');
    const ageNum = this.birthdayForm.get('age').get('ageNum');
    const ageUnit = this.birthdayForm.get('age').get('ageUnit');

    // get the event stream
    const birthday$ = birthday.valueChanges
                              .map(d => {
                                return {date: d, from: 'birthday'};
                              })
                              // verify the birthday validator
                              .filter(_ => birthday.valid)
                              .debounceTime(this.debounceTime)
                              .distinctUntilChanged();

    const ageNum$ = ageNum.valueChanges
                          .startWith(ageNum.value)
                          .debounceTime(this.debounceTime)
                          .distinctUntilChanged();

    const ageUnit$ = ageUnit.valueChanges
                              // setting the initial value
                            .startWith(ageUnit.value)
                            // avoid the input too frequently
                            .debounceTime(this.debounceTime)
                            // avoid the repeated input
                            .distinctUntilChanged();

    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {

                              // from age to date
                              return this.toDate({age: _n, unit: _u});
                            })
                            .map(d => {
                              return {date: d, from: 'age'}
                            })
                            // verify the age validator
                            .filter(_ => this.birthdayForm.get('age').valid);

    const merged$ = Observable.merge(birthday$, age$)
                              .filter(_ => this.birthdayForm.valid);

    this.sub = merged$.subscribe(d => {

      // from date to age
      const age = this.toAge(d.date);

      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, {emitEvent: false});
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    })
  }

  // must 
  // used for write value from outside
  writeValue(obj: any): void {
    
    if (obj) {
      const date = format(obj, this.format)
      this.birthdayForm.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.birthdayForm.get('age').get('ageNum').patchValue(age.age);
      this.birthdayForm.get('age').get('ageUnit').patchValue(age.unit);
    }
  }
  
  // if the target tag value changed, tell the form
  // <app-age-input formControlName="dateOfBirth" (change)="onChange($event)"></app-age-input>
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  
  // the target tag touched change, it will tell form
  registerOnTouched(fn: any): void {

  }


  // define the toAge method
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();

    return isBefore(subDays(now, this.daysTop), date) ? 
        {age: differenceInDays(now, date), unit: AgeUnit.Day} :
          isBefore(subMonths(now, this.monthTop), date) ? 
            {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
              {
                age: differenceInYears(now, date), unit: AgeUnit.Year
              };
  }


  // define the toDate method
  toDate(age: Age): string {

    const now = Date.now();
    
    switch(age.unit) {
      case AgeUnit.Year:
        return format(subYears(now, age.age), this.format);
      case AgeUnit.Month:
        return format(subMonths(now, age.age), this.format);
      case AgeUnit.Day: 
        return format(subDays(now, age.age), this.format);
      default:
        return null;
    }
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.sub) {
      this.sub.unsubscribe;
    }
  }

  // is the validator for the whole self-defined form
  // bind with provide: NG_VALIDATORS,
  validate(fc: FormControl): {[key: string]: any} {

    const val = fc.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    }

  }

  // for the birthday form validator
  validateDate(fc: FormControl): {[key: string]: any} {
    const val = fc.value;
    return isValidDate(val) ? null : {
        birthdayInvalid : true
    };
  }
  
  
  validateAge(ageNumKey: string, ageUnitKey: string) {
    
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];

      let result = false;
      const ageNumVal = ageNum.value;

      switch(ageUnit.value) {
        case AgeUnit.Year:
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        case AgeUnit.Month:
          result = ageNumVal >= this.monthBottom && ageNumVal < this.monthTop;
          break;
        case AgeUnit.Day: 
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        default:
          break;
      }

      return result ? null : {ageInvalid: true};
    };
  }


}
