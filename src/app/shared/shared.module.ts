
// shared module is used for puting the shared modules and export together, and other smart module just import once.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DirectiveModule} from '../directive/directive.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  MdSidenavModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';

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
    ReactiveFormsModule
  ],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent
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
    ImageListSelectComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
