import { Component, OnInit, Inject } from '@angular/core';

// used for the data trasmission from others
//  OverlayContainer used to declare the style.
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {


  //  data used for the data send here, and dialogref used for the data send outside., import the theme
  constructor(@Inject(MD_DIALOG_DATA) private data, 
              private dialogRef: MdDialogRef<NewProjectComponent>,
              private oc: OverlayContainer) { }

  ngOnInit() {
    //  the data will show from other component 'project-list'
    console.log(this.data);

    this.oc.themeClass = this.data.dark ? 'myapp-dark-theme' : 'null';
  }

  onClick() {
    this.dialogRef.close('I received your data');
  }



}
