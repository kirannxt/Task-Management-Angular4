
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuoteService} from './quote.service';

@NgModule()
export class ServicesModule {

  // provide a static service
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService
      ]
    }
  }
 }
