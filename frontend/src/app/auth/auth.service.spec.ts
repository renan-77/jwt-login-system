import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import {AuthService} from './auth.service';

describe('AuthService', () => {
    let injector: TestBed;
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
        injector = getTestBed();
        service = injector.inject(AuthService);
        httpMock = injector.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#userCheck()', () => {
        it('should return true for authentication check', () => {
            // Assigning the API link to a variable.
            const loginUrl = 'http://localhost:5000/login';

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

            // Assigning a user to a variable.
            const renanUser = {email: 'renan@dell.com', password: 'renan'};

            // Calling the service.
            service.checkUser(renanUser).subscribe(response => {
                expect(response.login).toEqual(true);
            });

            const req = httpMock.expectOne(loginUrl);

            expect(req.request.method).toEqual('POST');

            req.flush(renanUser);

        });
    });


});
