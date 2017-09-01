import { NgModule, SkipSelf, Optional } from '@angular/core';

import {HttpModule} from '@angular/http';

import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from '../utils/svg.util';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {SharedModule} from '../shared/shared.module';

import {AppRoutingModule} from '../app-routing.module';
// used for the angular animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// define the service and import
import {ServicesModule} from '../services/services.module';

import 'rxjs/add/operator/take';

import 'hammerjs';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // show the service example
    ServicesModule.forRoot()
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AppRoutingModule,
    BrowserAnimationsModule
  ],

  // provides the DI with string value
  providers: [
    {
      provide: 'BASE_CONFIG', useValue: {
      uri: 'http://localhost:3000'
    }
  }
  ]

})
export class CoreModule { 

  // @skipSelf --- search the parent firstly. @Optional() --- if not exist, just load from its parent.
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MdIconRegistry,
    ds: DomSanitizer) {  // DI: parent

    // just need it load once
    if (parent) {
      throw new Error('core module has existed, cannot laod again');
    }
    // just load once in the whole project.
    loadSvgResources(ir, ds);
  }
}
