// this module only used to provide one single port.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule, 
  MdIconModule, 
  MdButtonModule,
  MdCardModule,
  MdInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule, 
    MdIconModule, 
    MdButtonModule,
    MdCardModule,
    MdInputModule
  ],
  exports: [
    CommonModule,
    MdToolbarModule, 
    MdIconModule, 
    MdButtonModule,
    MdCardModule,
    MdInputModule
  ]
})
export class SharedModule { }
