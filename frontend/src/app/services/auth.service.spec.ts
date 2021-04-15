import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BackendInterceptor} from '../interceptors/backend.interceptor';

describe('AuthService', () => {
    let injector: TestBed;
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BackendInterceptor,
                    multi: true
                }
            ]
        });
        injector = getTestBed();
        service = injector.inject(AuthService);
        httpMock = injector.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#userCheck()', () => {
        it('should retrieve users', () => {
            const users = [
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

            let responseUsers;
            service.getUsers().subscribe(response => {
                responseUsers = response;
            });

            expect(responseUsers).toEqual(users);
        });
    });

    describe('#checkLogin()', () => {
        it('should check for login success', () => {
            const user = {
                email: 'renan@dell.com',
                password: 'renan'
            };

            const expectedResponse = {
                message: 'Login Successful',
                login: true,
                access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODM5MDMwOSwianRpI' +
                    'joiY2FkYjlmYjEtNzllNi00ZjQ5LWFhOTktMDJlYjM0ZDAxMzYzIiwibmJmIjoxNjE4MzkwMzA5LCJ0eXBlIjoiYWNjZXNz' +
                    'Iiwic3ViIjoicmVuYW5AZGVsbC5jb20iLCJleHAiOjE2MjM1NzQzMDl9.wEqyRHj-PiRPtYIAAo4ulAL2TTy27ytrPFPd7H' +
                    'fqrqs',
                code: 201
            };

            let apiResponse;
            service.checkUser(user).subscribe(response => {
                apiResponse = response.response;
            });

            expect(apiResponse.message).toEqual(expectedResponse.message);
            expect(apiResponse.login).toEqual(expectedResponse.login);
            expect(apiResponse.access_token).toEqual(expectedResponse.access_token);
            expect(apiResponse.code).toEqual(expectedResponse.code);
        });

        it('should check for login fail on wrong password', () => {
            const user = {
                email: 'renan@dell.com',
                password: 'aaaaa'
            };

            const expectedResponse = {
                message: 'Password is wrong!',
                login: false,
                code: 401
            };

            let apiResponse;
            service.checkUser(user).subscribe(response => {
                console.log(response.response);
                apiResponse = response.response;
            });

            expect(apiResponse.message).toEqual(expectedResponse.message);
            expect(apiResponse.login).toEqual(expectedResponse.login);
            expect(apiResponse.code).toEqual(expectedResponse.code);
        });

        it('should check for login fail on user not found', () => {
            const user = {
                email: 'renann@dell.com',
                password: 'aaaaa'
            };

            const expectedResponse = {
                message: 'User does not exist',
                login: false,
                code: 401
            };

            let apiResponse;
            service.checkUser(user).subscribe(response => {
                console.log(response.response);
                apiResponse = response.response;
            });

            expect(apiResponse.message).toEqual(expectedResponse.message);
            expect(apiResponse.login).toEqual(expectedResponse.login);
            expect(apiResponse.code).toEqual(expectedResponse.code);
        });
    });

    describe('#registerUser()', () => {
        it('should retrieve last user registered', () => {
            const newUser = {
                _id: '605b0913882b8ff5f812c1f2',
                name: 'Yan',
                email: 'yan@dell.com',
                password: 'yan'
            };

            let responseUsers;
            service.registerUser(newUser).subscribe(response => {
                responseUsers = response;
            });

            expect(responseUsers).toEqual(newUser);
        });
    });
});
