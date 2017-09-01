
// shared module is used for puting the shared modules and export together, and other smart module just import once.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DirectiveModule} from '../directive/directive.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import 'rxjs/add/operator/map';


import {
  MdToolbarModule, 
  MdIconModule, 
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdGridListModule,
  MdDialogModule,
  MdAutocompleteModule,
  MdMenuModule,
  MdCheckboxModule,
  MdTooltipModule,
  MdRadioModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSidenavModule,
  MdButtonToggleModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule, 
    MdIconModule, 
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonToggleModule
  ],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent, 
    AgeInputComponent
  ],
  exports: [
    CommonModule,
    MdToolbarModule, 
    MdIconModule, 
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ImageListSelectComponent,
    AgeInputComponent,
    MdButtonToggleModule
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
