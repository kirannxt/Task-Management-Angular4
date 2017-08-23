
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  // input the item from 'project-list'
  @Input() item;

  @Output() onInvite = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  // because the project-item component has the invite button 'add'  <md-icon>group_add</md-icon>, so let it execute the click event,
  // BUT do not deal with the logic event, I just emit the event to 'project-list' componnet, which deal with the event. 
  // here 'project-list' component is the smart component, used to deal with the logic event,
  // and 'project-item' component just import and export, this is loose coupling.
  
  onInviteClick() {
    this.onInvite.emit();
  }

}
