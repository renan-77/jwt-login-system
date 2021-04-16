import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
/**
 * Class used for intercepting http requests and adding an Authorization header (JWT Token) to it for authentication purpose on backend.
 */
export class TokenInterceptor implements HttpInterceptor {

    // Declaring instance of AuthService.
    constructor(private authService: AuthService) {}

    /**
     * Function that intercepts a http request, adds a header and executes it.
     * @param request: HttpRequest
     * @param next: HttpHandler
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Using intercept here');
        request = request.clone({
            //
            setHeaders: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });
        return next.handle(request);
    }
}
