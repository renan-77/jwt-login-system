import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BackendInterceptor} from '../interceptors/backend.interceptor';
import {users} from '../../tests_data/users';

describe('AuthService', () => {
    let injector: TestBed;
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService,
                {
                    // Importing backend interceptor which is responsible for the mock-backend.
                    provide: HTTP_INTERCEPTORS,
                    useClass: BackendInterceptor,
                    multi: true
                }
            ]
        });

        // Injecting relevant libraries.
        injector = getTestBed();
        service = injector.inject(AuthService);
        httpMock = injector.inject(HttpTestingController);
    });

    afterEach(() => {
        // Verifies that all http requests were handled.
        httpMock.verify();
    });

    /**
     * Testing userCheck() service, that service returns a list of the users in the mock database.
     */
    describe('#userCheck()', () => {
        it('should retrieve users', () => {
            // Creating variable to assign to the response of the API.
            let responseUsers;
            // Calling service.
            service.getUsers().subscribe(response => {
                responseUsers = response;
            });

            expect(responseUsers).toEqual(users);
        });
    });

    /**
     * Testing userLogin() service, that service checks login of user based on it's credentials.
     */
    describe('#checkLogin()', () => {
        // Test for when login credentials match.
        it('should check for login success', () => {
            // Creating body for request.
            const user = {
                email: 'renan@dell.com',
                password: 'renan'
            };

            // Creating expected response.
            const expectedResponse = {
                message: 'Login Successful',
                login: true,
                access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODM5MDMwOSwianRpI' +
                    'joiY2FkYjlmYjEtNzllNi00ZjQ5LWFhOTktMDJlYjM0ZDAxMzYzIiwibmJmIjoxNjE4MzkwMzA5LCJ0eXBlIjoiYWNjZXNz' +
                    'Iiwic3ViIjoicmVuYW5AZGVsbC5jb20iLCJleHAiOjE2MjM1NzQzMDl9.wEqyRHj-PiRPtYIAAo4ulAL2TTy27ytrPFPd7H' +
                    'fqrqs',
                code: 201
            };

            // Creating variable to assign to the response of the API.
            let apiResponse;

            // Calling service.
            service.checkUser(user).subscribe(response => {
                apiResponse = response.response;
            });

            // Checking response elements.
            expect(apiResponse.message).toEqual(expectedResponse.message);
            expect(apiResponse.login).toEqual(expectedResponse.login);
            expect(apiResponse.access_token).toEqual(expectedResponse.access_token);
            expect(apiResponse.code).toEqual(expectedResponse.code);
        });

        // Testing for when the user matches but not the password.
        it('should check for login fail on wrong password', () => {
            // Creating body for request.
            const user = {
                email: 'renan@dell.com',
                password: 'aaaaa'
            };

            // Creating expected response.
            const expectedResponse = {
                message: 'Password is wrong!',
                login: false,
                code: 401
            };

            // Creating variable to assign to the response of the API.
            let apiResponse;

            // Calling service.
            service.checkUser(user).subscribe(response => {
                console.log(response.response);
                apiResponse = response.response;
            });

            // Checking response elements.
            expect(apiResponse.message).toEqual(expectedResponse.message);
            expect(apiResponse.login).toEqual(expectedResponse.login);
            expect(apiResponse.code).toEqual(expectedResponse.code);
        });

        it('should check for login fail on user not found', () => {
            // Creating body for request.
            const user = {
                email: 'renann@dell.com',
                password: 'aaaaa'
            };

            // Creating expected response.
            const expectedResponse = {
                message: 'User does not exist',
                login: false,
                code: 401
            };

            // Creating variable to assign to the response of the API.
            let apiResponse;

            // Calling service.
            service.checkUser(user).subscribe(response => {
                console.log(response.response);
                apiResponse = response.response;
            });

            // Checking response elements.
            expect(apiResponse.message).toEqual(expectedResponse.message);
            expect(apiResponse.login).toEqual(expectedResponse.login);
            expect(apiResponse.code).toEqual(expectedResponse.code);
        });
    });

    /**
     * Testing registerUser() service.
     */
    describe('#registerUser()', () => {
        it('should retrieve last user registered', () => {
            // Creating user obj that will be registered in the database.
            const newUser = {
                _id: '605b0913882b8ff5f812c1f2',
                name: 'Yan',
                email: 'yan@dell.com',
                password: 'yan'
            };

            // Creating variable to assign to the response of the API.
            let responseUsers;
            service.registerUser(newUser).subscribe(response => {
                responseUsers = response;
            });

            // Checking if last user registered is the same as the new one created.
            expect(responseUsers).toEqual(newUser);
        });
    });
});
