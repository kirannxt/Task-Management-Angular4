

import { Injectable, Inject } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Task} from '../domain';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectService {

    private readonly domain = 'tasks';

    // for the post method
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

    // define the returned thing is the event stream (Observable type), so I can deal with these results as event stream
    add(task: Task): Observable<Task> {
        
        task.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(task), {headers: this.headers})
            // the received data
            .map(res => res.json());
    }

    // same as the add method
    update(task: Task): Observable<Task> {
        
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;

        // define the 
        const toUpdate = {
            desc: task.desc,
            priority: task.priority,
            dueDate: task.dueDate,
            reminder: task.reminder,
            ownerId: task.ownerId,
            participantIds: task.participantIds,
            remark: task.remark
        };
        return this.http
        // patch mesans to select some properties to update
            .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
            .map(res => res.json());
    }

    del(task: Task): Observable<Task> {
        
        const uri = `${this.config.uri}/tasklists/${task.id}`
        
        return this.http.delete(uri)
            .mapTo(task);
    }

    //  only delete the project under dedicated user,
    get (tasklistId: string): Observable<Task[]> {

        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'members_like': tasklistId}})
            // .map(res => res.json() as Project[]);   ?????
            .map(res => res.json() as Task[]);
    }
}