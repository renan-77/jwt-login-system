import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';
import {log} from "util";

let users = [
    {
        _id: '605b0922882b8ff5f812c1f3',
        name: 'Dovy',
        email: 'dovydas@dell.com',
        password: 'dovydas'
    },
    {
        _id: '605b091a882b8ff5f812c1f2',
        name: 'Renan',
        email: 'renan@dell.com',
        password: 'renan'
    },
    {
        _id: '605b0913882b8ff5f812c1f1',
        name: 'Dylan',
        email: 'dylan@dell.com',
        password: 'dylan'
    }
];

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    /**
     * Function to go through the array of JSON docs looking for a specific register.
     * @param email: string
     * @param password: string
     */
    searchDb(email, password): string{
        for (const user of users){
            if (user.email === email){
                if (user.password === password){
                    return 'success';
                }else {
                    return 'wrong_pass';
                }
            }
        }
        return 'wrong_user';
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        // GET USERS.
        if (request.method === 'GET' && request.url === 'http://localhost:5000/users'){
            return of(new HttpResponse({status: 200, body: users}));
        }

        // REGISTER USER.
        if (request.method === 'POST' && request.url === 'http://localhost:5000/user'){
            // Cloning users array to a new array.
            const newUsers = Object.assign([], users);
            // Adding new user on array based on object.
            newUsers.push(request.body);
            // Returning the new array.
            return of(new HttpResponse({status: 200, body: newUsers[newUsers.length - 1]}));
        }

        // CHECK USER.
        else if (request.method === 'POST' && request.url === 'http://localhost:5000/login'){
            // Creating mock responses.
            const responses = {
                success: {
                    message: 'Login Successful',
                    login: true,
                    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODM5MDMwOSwianRpI' +
                        'joiY2FkYjlmYjEtNzllNi00ZjQ5LWFhOTktMDJlYjM0ZDAxMzYzIiwibmJmIjoxNjE4MzkwMzA5LCJ0eXBlIjoiYWNjZXNz' +
                        'Iiwic3ViIjoicmVuYW5AZGVsbC5jb20iLCJleHAiOjE2MjM1NzQzMDl9.wEqyRHj-PiRPtYIAAo4ulAL2TTy27ytrPFPd7H' +
                        'fqrqs',
                    code: 201
                },
                wrong_pass: {
                    message: 'Password is wrong!',
                    login: false,
                    code: 401
                },
                wrong_user: {
                    message: 'User does not exist',
                    login: false,
                    code: 401
                },
                error: {
                    message: 'An error has occurred',
                    login: false,
                    code: 406
                }
            };

            // Using searchDb function to find if user exists.
            const loginCheck = this.searchDb(request.body.email, request.body.password);

            if (loginCheck === 'success'){
                localStorage.setItem('token', responses.success.access_token);
            }

            // Returning response based on search.
            return of(new HttpResponse({body: {response: responses[loginCheck]}}));
        }
        next.handle(request);
    }
}
