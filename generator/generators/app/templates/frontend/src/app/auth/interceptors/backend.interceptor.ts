import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';
import {responses} from '../../tests_data/mock_responses';
import {users} from '../../tests_data/users';

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
