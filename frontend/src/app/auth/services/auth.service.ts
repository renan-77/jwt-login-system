import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
/**
 * Service used for authentication and API http calls.
 */
export class AuthService {
    // Declaring API urls.
    private readonly loginUrl: string = 'http://localhost:5000/login';
    private readonly userUrl: string = 'http://localhost:5000/user';

    // Declaring instance of HttpClient.
    constructor(private http: HttpClient) {}

    // Creating instance of JWTHelperService to be provided just for decoding (no need to inject).
    jwtHelper = new JwtHelperService();

    /**
     * Checking if token is valid.
     * @return: A boolean stating whether the user is successfully logged in or not.
     */
    public isAuthenticated(): boolean {
        // Assigning token to variable.
        const token = this.getToken();
        // Check whether the token is expired.
        try{
            return !this.jwtHelper.isTokenExpired(token);
        }catch (e){
            console.log(`Error: ${e}`);
        }
    }

    /**
     * Function that returns the token in case login is successful
     * @param user: object
     * @return: An observable.
     */
    checkUser(user): Observable<any> {
        return this.http.post(this.loginUrl, user);
    }

    /**
     * Getting token from local storage
     * @return: A string (token).
     */
    public getToken(): string {
        return localStorage.getItem('token');
    }

    /**
     * Registering user from form submit
     * @param user: object
     */
    registerUser(user): Observable<any>{
        return this.http.post(this.userUrl, user);
    }

    getUsers(): Observable<any>{
        return this.http.get('http://localhost:5000/users');
    }
}
