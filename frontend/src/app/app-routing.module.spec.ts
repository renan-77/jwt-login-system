import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Router, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from './app-routing.module';
import {Location} from '@angular/common';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('Router: App', () => {

    let location: Location;
    let router: Router;
    let fixture;
    let component;

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

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it('navigate to "" redirects you to /login', fakeAsync(() => {
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/login');
    }));

    it('expects /home to be the /login (not authenticated)', fakeAsync(() => {
        router.navigate(['/home']);
        tick();
        expect(location.path()).toBe('/login');
    }));

    it('expects that /login renders login component', fakeAsync(() => {
        router.navigate(['/login']);
        tick();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('expects that /home renders login component', fakeAsync(() => {
        router.navigate(['/home']);
        tick();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    }));
});
