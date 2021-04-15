import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../services/auth.service';
import {AppModule} from '../app.module';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

describe('AuthGuard', () => {
    let services: AuthService;
    let guard: AuthGuard;
    let router: Router;
    let location: Location;

    const routerMock = {navigate: jasmine.createSpy('navigate')};
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard, {provide: Router, useValue: routerMock}, AuthService],
            imports: [HttpClientTestingModule, RouterTestingModule, AppModule]
        });
        services = TestBed.inject(AuthService);
        guard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    // it('should redirect an unauthenticated user to the login route', () => {
    //     expect(guard.canActivate()).toEqual(false);
    //     expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    // });
    //
    // it('should allow the authenticated user to access app', () => {
    //     spyOn(services, 'isAuthenticated').and.returnValue(true);
    //     expect(guard.canActivate()).toEqual(true);
    // });

    it('should return true for authGuard', fakeAsync(() => {
        router.navigate(['/home']);
        tick();

        localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODM5MDM' +
            'wOSwianRpIjoiY2FkYjlmYjEtNzllNi00ZjQ5LWFhOTktMDJlYjM0ZDAxMzYzIiwibmJmIjoxNjE4MzkwMzA5LCJ0eXBlIjoiYWNjZ' +
            'XNzIiwic3ViIjoicmVuYW5AZGVsbC5jb20iLCJleHAiOjE2MjM1NzQzMDl9.wEqyRHj-PiRPtYIAAo4ulAL2TTy27ytrPFPd7Hfqrqs');

        expect(guard.canActivate()).toEqual(true);
    }));

    it('should return false for authGuard', fakeAsync(() => {
        router.navigate(['/home']);
        tick();

        localStorage.clear();

        expect(guard.canActivate()).toEqual(false);
    }));
});
