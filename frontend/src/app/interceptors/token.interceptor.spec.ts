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
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true,
                },
            ],
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should add an Authorization header', () => {
        service.getUsers().subscribe(response => {
            expect(response).toBeTruthy();
        });

        const httpRequest = httpMock.expectOne(`http://localhost:5000/users`);

        expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    });
});
