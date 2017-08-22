import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {HttpModule} from '@angular/http';

import { MdToolbarModule, MdIconModule, MdButtonModule } from '@angular/material';

// import the utils
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from '../utils/svg.util';

 
@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    HttpModule

  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
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
