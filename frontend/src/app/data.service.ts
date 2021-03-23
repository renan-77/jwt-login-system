import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private readonly userUrl: string = 'http://localhost:5000/user';

    constructor(private http: HttpClient) {
    }

    checkUser(user): Observable<any>{
        return this.http.post(`${this.userUrl}/${user.email}`, user);
    }
}
