import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { AppComponent } from '../app.component';
import {Router, RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from './app-routing.module';
import {Location} from '@angular/common';
import {AuthService} from '../auth/services/auth.service';
import {AuthGuard} from '../auth/guards/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('Router: App', () => {

    let location: Location;
    let router: Router;
    let fixture;
    let component;
    let services;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), HttpClientModule, MatSnackBarModule],
            declarations: [
                HomeComponent,
                LoginComponent,
                AppComponent
            ],
            providers: [
                AuthService,
                AuthGuard
            ]
        });

        // Injecting required services.
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        services = TestBed.inject(AuthService);

        // Creating fixture instance.
        fixture = TestBed.createComponent(AppComponent);

        // Initializing router navigation.
        router.initialNavigation();
    });

    // Testing navigate to standard route.
    it('navigate to "" redirects you to /login', fakeAsync(() => {
        router.navigate(['']);
        // Tick waits for the route to be loaded.
        tick();

        expect(location.path()).toBe('/login');
    }));

    // Testing that without an access token when trying to access /home it will redirect you to /login.
    it('expects /home to be the /login (not authenticated)', fakeAsync(() => {
        // Cleaning storage in case some other test has set the token in the local storage.
        localStorage.clear();
        router.navigate(['/home']);
        tick();

        expect(location.path()).toBe('/login');
    }));

    // Testing that /login renders LoginComponent.
    it('expects that /login renders login component', fakeAsync(() => {
        router.navigate(['/login']);
        tick();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        expect(component).toBeTruthy();
    }));

    // Testing that /home renders HomeComponent.
    it('expects that /home renders login component', fakeAsync(() => {
        router.navigate(['/home']);
        tick();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    }));
});
