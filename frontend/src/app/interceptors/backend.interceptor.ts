import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';

const usersData = {
    users: [
        {
            _id: '605b0922882b8ff5f812c1f3',
            name: 'Dovy',
            email: 'dovydas@dell.com',
            password: '$2b$12$QlqA4noPR/jnmnKmX2lWTOdW1i3PhN.FFP9eBa.9Us0Qcijw8PGJO'
        },
        {
            _id: '605b091a882b8ff5f812c1f2',
            name: 'Renan',
            email: 'renan@dell.com',
            password: '$2b$12$3qqexDUsrdL6orxkqnSQF.0/mnhfrl5PKNyhsCw2dtTebdN2S9Wc.'
        },
        {
            _id: '605b0913882b8ff5f812c1f1',
            name: 'Dylan',
            email: 'dylan@dell.com',
            password: '$2b$12$CpVl1FeiA.cmuE8/J5VnWuewT9pSkFB3ndLE3MrmqNjhqyEOCCAd.'
        }
    ]
};

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    searchDb(email, password): string{
        for (const user of usersData.users){
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
        if (request.method === 'GET' && request.url === 'http://localhost:5000/users'){
            return of(new HttpResponse({status: 200, body: usersData}));
        }

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

            const loginCheck = this.searchDb(request.body.email, request.body.password);

            return of(new HttpResponse({body: {response: responses[loginCheck]}}));
        }
        next.handle(request);
    }
}
