import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  items = [
    {id: 1, name: 'Rick'},
    {id: 2, name: 'Leo'},
    {id: 3, name: 'Claire'}
  ]
  constructor() { }

  ngOnInit() {
  }

  displayUser(user: {id: string, name: string}) {
    return user ? user.name : "";  
  }

}
