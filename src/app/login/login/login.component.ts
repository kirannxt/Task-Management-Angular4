
import { Component, OnInit } from '@angular/core';
// import the forms functions
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // bind the [FormGroup]="loginForm" in 'login.component.html'
  loginForm: FormGroup;

  // inject the formBuilder
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    /*
    // when initiate the form, setting the form data and validators
    this.loginForm = new FormGroup({

      // formControl to bind 'formControlName'
      email: new FormControl('rick@gmail.com', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.required)
    });

    */

    this.loginForm = this.fb.group({
      email: ['rick@rick.gmail', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    });
  }

  // when submit the form, it will transmit the data and valid.
  //  {value, valid} === form
  onSubmit({value, valid}, ev: Event) {

    ev.preventDefault();

    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));

    /*
    for the conditional validator, it is when some condition satisfied, it will valide some validator.
    if (condition) {
      this.loginForm.controls['email'].setValidators(this.validate);
    }
    */
  }

  // define the validator 
  validate(fc: FormControl): {[key: string]: any} {
    if (!fc.value) {
      return null;
    }

    const pattern = /^rick+/;
    if (pattern.test(fc.value)) {
      return null;
    }
    return {
      // bind {{loginForm.controls['email'].errors | json }}
      emailNotValid: 'the email must be valid'
    }
  }

}
