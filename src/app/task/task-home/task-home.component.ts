import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {


  // mock the data
  lists = [

    {
      id: 1,
      name: 'Ready',
      tasks: [

        {
          id: 1,
          desc: 'task one: buy coffee',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: 'rick',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          remainder: new Date()
    
        },

        {
          id: 2,
          desc: 'task two: reday homework',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: 'leo',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
    
        }

      ]
    },

    {
      id: 2,
      name: 'In process',
      tasks: [

        {
          id: 1,
          desc: 'task three: verify the project',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: 'liyue',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          remainder: new Date()
    
        },

        {
          id: 2,
          desc: 'task four: design plan',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: 'claire',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date(),
          remainder: new Date()
    
        }

      ]
    },

    {
      id: 3,
      name: 'Complete',
      tasks: [

        {
          id: 1,
          desc: 'task five: complete plan',
          completed: true,
          priority: 2,
          owner: {
            id: 1,
            name: 'aj',
            avatar: 'avatars:svg-15'
          },
          dueDate: new Date()
    
        },

        {
          id: 2,
          desc: 'task six: complete homework',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: 'amahli',
            avatar: 'avatars:svg-16'
          },
          dueDate: new Date()
    
        }

      ]
    }

    
  ];

  constructor() { }

  ngOnInit() {
  }

}