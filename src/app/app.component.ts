import { Component, ReflectiveInjector, Inject } from '@angular/core';

//  OverlayContainer used to declare the style in the gloabl component.
import { OverlayContainer } from '@angular/material';

import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  squareState: string;

  private _dark = false;
  
    constructor(private oc: OverlayContainer, @Inject('BASE_CONFIG') config) {

      console.log(config);

      /*

    // the comments part is used to explain the DI in explicit style 

      const injector = ReflectiveInjector.resolveAndCreate([
        // {provide: Person, useClass: Person},
        Person,
        {provide: Address, useFactory: () => {
          if (environment.production) {
            return new Address('aa', 'bj', 'cy', 'xxx');
          } else {
            return new Address('xx', 'xx', 'xx', 'xx');
          }
        }},
        {provide: Id, useFactory: () => {
          return Id.getInstance('idcard');
        }}
      ]);
      
      // get the multiple instance mode
      const childInjector = injector.resolveAndCreateChild([Person]);
      const person = injector.get(Person);
      const personFromChild = childInjector.get(Person);
      console.log(JSON.stringify(person));
      console.log(JSON.stringify(personFromChild));
      console.log(person === personFromChild);

 
      */
    }
  
    get dark() {
      return this._dark;
    }
  
    switchDarkTheme(dark: boolean) {
      this._dark = dark;
      this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
    }

    
}


/*

class Id {
  static getInstance(type: string): Id{
    return new Id();
  }
}

class Address {
  province: string;
  city: string;
  district: string;
  street: string;
  constructor(province, city, district, street) {
    this.province = province;
    this.city = city;
    this.district = district;
    this.street = street;
  }
}


class Person {
  id: Id;
  address: Address;
  constructor(@Inject(Id) id, @Inject(Address) address ) {
    this.id = id;
    this.address = address;
  }
}
*/
