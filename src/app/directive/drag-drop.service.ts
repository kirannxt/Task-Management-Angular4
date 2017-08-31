
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

export interface DragData {

  // tag used for drag which one, list or item
  tag: string;

  // data is the trasmitted data
  data: any;
}

@Injectable()
export class DragDropService {

  // BehaviorSubject can remember the value last time
  private _dragData = new BehaviorSubject<DragData>(null);

  // store the data
  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  // get the data
  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  // clear the data
  clearDragData() {
    this._dragData.next(null);
  }

}
