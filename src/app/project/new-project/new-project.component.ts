

import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {

  title = '';

  //  get the data from outside by inject method
  constructor(@Inject(MD_DIALOG_DATA) private data, 

              // if want to transite the data outside, it need MddialogRef, and let outside component receive it.
              private dialogRef: MdDialogRef<NewProjectComponent>) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data));
  }

  onClick() {
    // when click save to send the data 
    this.dialogRef.close('i received your msg');
  }

}
