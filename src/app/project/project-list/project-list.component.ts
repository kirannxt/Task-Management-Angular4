

import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// import the md-dialog components
import {MdDialog} from '@angular/material';

// import the new project dialog component
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

import {routingAnimation} from '../../animate/router.animate';
import {listAnimation} from '../../animate/list.animate';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],

  animations: [
    routingAnimation,
    listAnimation
  ],

  //  mark the 'project-list' as the onpush strategy
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {


  //  bind the whole component 'project-list'
  @HostBinding('@routeAnim') state;

  projects = [
    { 
      "id": 1,
      "name": 'task mg project',
      "desc": 'this is a project',
      "coverImg": 'assets/img/covers/0.jpg'
    },
    {
      "id": 2,
      "name": 'task mg project',
      "desc": 'this is a project',
      "coverImg": 'assets/img/covers/1.jpg'
    }
  ];
  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  // open the dedicated component.
  openNewProjectDialog() {
    const dialogRef =  this.dialog.open(NewProjectComponent, {
      data: {title: 'New Project'}
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result); 

      // [].push()
      this.projects = [
        ...this.projects, 
        // to test stagger
        {id: 3, name: "new project", desc: "this is the new project", coverImg: 'assets/img/covers/3.jpg'},
        {id: 4, name: "newnew project", desc: "this is the newnew project", coverImg: 'assets/img/covers/6.jpg'}
      ];

      // just check this branch
      this.cd.markForCheck();

    })
  }

  OpenInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  openUpdateDialog() {
    const dialogRef =  this.dialog.open(NewProjectComponent, {data: {title: 'Edit Project'}});
  }

  openConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: 'Delete Project', content: 'are you sure to delete this project?'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter((p => p.id !== project.id));

      // just check this branch
      this.cd.markForCheck();
    });
  }

}
