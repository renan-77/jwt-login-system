import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService, JwtModuleOptions} from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginUrl: string = 'http://localhost:5000/login';
    private readonly authUrl: string = 'http://localhost:5000/auth';

    constructor(private http: HttpClient) {}

    // Creating instance of JWTHelperService to be provided just for decoding (no need to inject).
    jwtHelper = new JwtHelperService();

    /**
     * Checking if token is valid.
     */
    public isAuthenticated(): boolean {
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
     */
    checkUser(user): Observable<any> {
        return this.http.post(this.loginUrl, user);
    }

    /**
     * Getting token from local storage
     */
    public getToken(): string {
        return localStorage.getItem('token');
    }
}
