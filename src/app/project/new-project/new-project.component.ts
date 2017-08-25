import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';

// used for the data trasmission from others
//  OverlayContainer used to declare the style.
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],

  // for the dump component only add the onpush
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {

  title = '';


  //  data used for the data send here, and dialogref used for the data send outside., import the theme
  constructor(@Inject(MD_DIALOG_DATA) private data, 
              private dialogRef: MdDialogRef<NewProjectComponent>) { }

  ngOnInit() {
    //  the data will show from other component 'project-list'
    this.title = this.data.title;
    console.log(JSON.stringify(this.data));
  }

  onClick() {
    this.dialogRef.close('I received your data');
  }



}
