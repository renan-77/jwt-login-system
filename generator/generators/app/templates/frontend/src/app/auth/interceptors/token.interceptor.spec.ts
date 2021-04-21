import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import {AuthService} from '../services/auth.service';
import {TokenInterceptor} from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe(`AuthHttpInterceptor`, () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                {
                    // Providing interceptor based on it's class.
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true,
                },
            ],
        });

        // Providing necessary services.
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    // Checking if the interceptor is actually adding an authorization header.
    it('should add an Authorization header', () => {
        // Calling a SERVICE that does an HTTP Request.
        service.getUsers().subscribe(response => {
            expect(response).toBeTruthy();
        });

        // Expects that a single httpRequest was made.
        const httpRequest = httpMock.expectOne(`http://localhost:5000/users`);

        // Checking for authorization header to be on the request.
        expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    });
});
