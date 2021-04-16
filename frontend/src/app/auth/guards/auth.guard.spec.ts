import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../services/auth.service';
import {AppModule} from '../../app.module';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

describe('AuthGuard', () => {
    let services: AuthService;
    let guard: AuthGuard;
    let router: Router;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard, AuthService],
            imports: [HttpClientTestingModule, RouterTestingModule, AppModule]
        });

        // Injecting required services.
        services = TestBed.inject(AuthService);
        guard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    // Defining test to return true on authGuard based on token.
    it('should return true for authGuard', fakeAsync(() => {
        router.navigate(['/home']);
        tick();

        localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODM5MDM' +
            'wOSwianRpIjoiY2FkYjlmYjEtNzllNi00ZjQ5LWFhOTktMDJlYjM0ZDAxMzYzIiwibmJmIjoxNjE4MzkwMzA5LCJ0eXBlIjoiYWNjZ' +
            'XNzIiwic3ViIjoicmVuYW5AZGVsbC5jb20iLCJleHAiOjE2MjM1NzQzMDl9.wEqyRHj-PiRPtYIAAo4ulAL2TTy27ytrPFPd7Hfqrqs');

        expect(guard.canActivate()).toEqual(true);
    }));

    // Defining test to return false on authGuard based on token.
    it('should return false for authGuard', fakeAsync(() => {
        localStorage.clear();
        router.navigate(['/home']);
        tick();

        expect(guard.canActivate()).toEqual(false);
    }));

    // Testing for redirect login function to redirect to login.
    it('should return false for authGuard', fakeAsync(() => {
        guard.redirectLogin();
        expect(location.path()).toBe('/login');
    }));
});
