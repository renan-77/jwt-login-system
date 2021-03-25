import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService implements HttpInterceptor {
    private readonly loginUrl: string = 'http://localhost:5000/login';
    private readonly authUrl: string = 'http://localhost:5000/auth';

    constructor(private http: HttpClient) {}

    checkUser(user): Observable<any> {
        return this.http.post(this.loginUrl, user);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return undefined;
    }

    authenticateUser(token): Observable<any> {
        const headers = { Accept: 'text/html', Authorization: `Bearer ${token}`};

        console.log(headers);
        return this.http.get(this.authUrl, { headers });
    }
}
