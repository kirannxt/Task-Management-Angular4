import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule {


  //  import 'SkipSelf' to avoid the dead loop
  // import 'Optional' to let the component test first time pass.
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('module already exist, can not load');
    }
  }
 }
