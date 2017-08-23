import { Component, OnInit } from '@angular/core';

// import the md-dialog components
import {MdDialog} from '@angular/material';

// import the new project dialog component
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      "name": 'task mg platform',
      "desc": 'this is a platform',
      "coverImg": 'assets/img/covers/0.jpg'
    },
    {
      "name": 'task mg platform',
      "desc": 'this is a platform',
      "coverImg": 'assets/img/covers/1.jpg'
    }
  ];
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  // open the dedicated component.
  openNewProjectDialog() {
    const dialogRef =  this.dialog.open(NewProjectComponent, {
      width: '800px',
      height: '300px', 
      position: {left: '0', top: '0'},
      data: {dark: true }
    });

    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  OpenInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

}
