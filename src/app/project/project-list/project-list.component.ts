

// for the smart component, need ChangeDetectionStrategy, ChangeDetectorRef to do changedetection
import { Component, OnInit, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import {MdDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

import {routerAnimation} from '../../animation/router.animation';
import {listAnimation} from '../../animation/list.animation';

import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    routerAnimation,
    listAnimation
  ],

  // tell the component to execute the opPush strategy
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  // bind the router animation with the whole component,
  @HostBinding('@routerAnim') state;

  /*
  projects = [
    {
      "id": 1,
      "name": 'task management platform',
      "desc": 'this is one task management platform',
      "coverImg": 'assets/img/covers/0.jpg'
    },
    {
      "id": 2,
      "name": ' new task management platform',
      "desc": 'this is new task management platform',
      "coverImg": 'assets/img/covers/1.jpg'
    }
  ] */

  projects;

  // 1. inject cd: ChangeDetectorRef
  constructor(
    private diaglog: MdDialog, 
    private cd: ChangeDetectorRef,
    private service$: ProjectService
  ) { }

  ngOnInit() {
    this.service$.get("1").subscribe(projects => this.projects = projects)
  }

  // click to open the new project dialog, this dialog is put in the entryComponents.
  openNewProjectDialog() {
    // open the newProjectComponent and send data to the new component
    const dialogRef = this.diaglog.open(NewProjectComponent, {data: {title: 'New Project'}});

    // the dislogref will receive the data from another one.
    dialogRef.afterClosed().subscribe(result => {

      // push the project to the array
      this.projects =[...this.projects, 
        {id: 3, name: 'New Project', desc: 'this is new project', coverImg: 'assets/img/covers/3.jpg'},
        {id: 4, name: 'NewNew Project', desc: 'this is newnew project', coverImg: 'assets/img/covers/4.jpg'}
      ];

      // 2. tell the component that only execute this branch by markforcheck
      this.cd.markForCheck();
    });
  }

  OpenInviteDialog() {
    const dialogRef = this.diaglog.open(InviteComponent);
    
  }

  OpenUpdateDialog() {
    const dialogRef = this.diaglog.open(NewProjectComponent, {data: {title: 'Edit Project'}});
  }

  OpenConfirmDialog(project) {
    const dialogRef = this.diaglog.open(ConfirmDialogComponent, {data: {title: 'Delete Project', content: 'Are you sure delete this project?'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);

      // same as 2.tell the component that only execute this branch by markforcheck
      this.cd.markForCheck();
    });
  }

}
