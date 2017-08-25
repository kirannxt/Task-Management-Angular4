import { NgModule, SkipSelf, Optional } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {HttpModule} from '@angular/http';

// import the routing module
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
// import the utils
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from '../utils/svg.util';


import 'hammerjs';

 
@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],

  // export the routing module, and let app.module use it
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AppRoutingModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {

  // core module only needs to be loaded once, import SkipSelf
  // first load import the Optional
  constructor(@Optional() @SkipSelf() parent: CoreModule, 
                                      ir: MdIconRegistry,
                                      ds: DomSanitizer) {
    if (parent) {
      throw Error('module existed, cannot load again');
    }
    loadSvgResources(ir, ds);
  }
 }
