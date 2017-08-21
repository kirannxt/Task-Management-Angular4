import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule {

  // core module only needs to be loaded once, import SkipSelf
  // first load import the Optional
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw Error('module existed, cannot load again');
    }
  }
 }
