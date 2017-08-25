
import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import {cardAnimation} from '../../animate/card.animte';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],

  animations: [
    cardAnimation
  ]
})
export class ProjectItemComponent implements OnInit {

  // input the item from 'project-list'
  @Input() item;

  @Output() onInvite = new EventEmitter<void>();

  @Output() onEdit = new EventEmitter<void>();

  @Output() onDelete = new EventEmitter<void>();


  // bind '@card' with the 'project-list' component
  // it means that all the animation control coding only in this file.
  @HostBinding('@card') cardState = 'out'; 

  constructor() { }

  ngOnInit() {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  // because the project-item component has the invite button 'add'  <md-icon>group_add</md-icon>, so let it execute the click event,
  // BUT do not deal with the logic event, I just emit the event to 'project-list' componnet, which deal with the event. 
  // here 'project-list' component is the smart component, used to deal with the logic event,
  // and 'project-item' component just import and export, this is loose coupling.
  
  onInviteClick() {
    this.onInvite.emit();
  }

  onEditClick() {
    this.onEdit.emit();
  }

  onDeleteClick() {
    this.onDelete.emit();
  }

}
