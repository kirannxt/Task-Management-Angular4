import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {itemAnimation} from '../../animate/item.animate';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],

  animations: [
    itemAnimation
  ]

})
export class TaskItemComponent implements OnInit {

  @Input() item;

  @Input() avatar;

  @Output() taskClick = new EventEmitter<void>();

  private widerPriority = 'out';

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  onItemClick() {
    this.taskClick.emit();
  }

  onCheckboxClick(ev: Event) {
    ev.stopPropagation();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'out';
  }


}
