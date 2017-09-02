
import { Injectable, Inject } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Project} from '../domain';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectService {

    private readonly domain = 'projects';

    // for the post method
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

    // define the returned thing is the event stream (Observable type), so I can deal with these results as event stream
    add(project: Project): Observable<Project> {
        
        project.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(project), {headers: this.headers})
            // the received data
            .map(res => res.json());
    }

    // same as the add method
    update(project: Project): Observable<Project> {
        
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http
        // patch mesans to select some properties to update
            .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
            .map(res => res.json());
    }

    del(project: Project): Observable<Project> {
        
        // define the event stream, from the tasklist array in this project
        const delTasks$ = Observable.from(project.taskLists)
        //  for each event stream (list), I delete the tasks in this listId by 
        // mergeMap means that delete all the substreams from merged outside streams
            .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
            // confirm the event complete count.
            .count();

        return delTasks$
            // do not care the outside stream, 'delTask$' is the count , if the count confirmed, i just delete the project.
            .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
            // .map(_ => project);
            .mapTo(project);
    }

    //  only delete the project under dedicated user,
    get (userId: string): Observable<Project> {

        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'members_like': userId}})
            // .map(res => res.json() as Project[]);   ?????
            .map(res => res.json());
    }
}