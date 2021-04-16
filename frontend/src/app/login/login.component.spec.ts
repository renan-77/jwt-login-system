import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {Router, RouterModule} from '@angular/router';
import {routes} from '../routes/app-routing.module';
import {AuthService} from '../auth/services/auth.service';
import {AuthGuard} from '../auth/guards/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {BrowserModule, By} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {AppComponent} from '../app.component';
import {HomeComponent} from '../home/home.component';

describe('LoginComponent', () => {
    let fixture;
    let component;
    let router: Router;
    let location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule, MatSnackBarModule, FormsModule, ReactiveFormsModule,
                BrowserModule, RouterModule, RouterTestingModule.withRoutes(routes)],
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

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        router.initialNavigation();
    });

    /***
     * Function to load the forms based on the URL, it will navigate to the url and then execute ngOnInit.
     * @param url: string
     */
    function loadFormWithUrl(url): void {
        router.navigate([`${url}`]);
        tick();
        component.loadForm();
        fixture.detectChanges();
    }

    /**
     * Function to update the login form
     * @param email: string
     * @param password: string
     */
    function updateLoginForm(email: string, password: string): void {
        component.credentialsForm.controls.email.setValue(email);
        component.credentialsForm.controls.password.setValue(password);
    }

    /**
     * Function to update the register form
     * @param name: string
     * @param email: string
     * @param password: string
     */
    function updateRegisterForm(name: string, email: string, password: string): void {
        component.credentialsForm.controls.name.setValue(name);
        component.credentialsForm.controls.email.setValue(email);
        component.credentialsForm.controls.password.setValue(password);
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Testing the goTo() function.
    it('should redirect to home based on function attribute', () => {
        component.goTo('home');
        expect(location.path()).toBe('/home');
    });

    /**
     * Tests for login form.
     */
    describe('LoginForm', () => {
        // Test for submit button to be disabled due to empty fields.
        it('should test if login submit button is disabled when the form is invalid -- Required fields are empty',
            fakeAsync(() => {
                loadFormWithUrl('');
                updateLoginForm('', '');
                fixture.detectChanges();
                expect((document.getElementById('submit-login') as HTMLButtonElement).disabled).toBeTruthy();
            }));

        // Test for submit button to be disabled due to invalid fields.
        it('should test if login submit button is disabled when the form is invalid -- Wrong format of email',
            fakeAsync(() => {
                loadFormWithUrl('');
                updateLoginForm('abc', 'abc@123');
                fixture.detectChanges();
                expect((document.getElementById('submit-login') as HTMLButtonElement).disabled).toBeTruthy();
            }));

        // Test for submit to be enabled when the fields are valid.
        it('should test if login submit button is enabled when the form is valid', fakeAsync(() => {
            loadFormWithUrl('');
            updateLoginForm('renan@email.com', 'password@123');
            fixture.detectChanges();
            console.log('Email value:' + component.credentialsForm.controls.email.value);
            expect((document.getElementById('submit-login') as HTMLButtonElement).disabled).toBeFalsy();
        }));

        // Testing if on submit button the corresponding function is being called.
        it('should test if onLoginSubmit method has been called 0 times', fakeAsync(() => {
            loadFormWithUrl('');
            fixture.detectChanges();
            spyOn(component, 'onLoginSubmit');
            (document.getElementById('submit-login') as HTMLButtonElement).click();
            expect(component.onLoginSubmit).toHaveBeenCalledTimes(0);
        }));
    });

    /**
     * Tests for register form.
     */
    describe('RegisterForm', () => {
        // Test for submit button to be disabled due to empty fields.
        it('should test if register submit button is disabled when the form is invalid -- Required fields are empty',
            fakeAsync(() => {
                loadFormWithUrl('register');
                updateRegisterForm('', '', '');
                fixture.detectChanges();
                expect((document.getElementById('submit-register') as HTMLButtonElement).disabled).toBeTruthy();
        }));

        // Test for submit button to be disabled due to invalid fields.
        it('should test if register submit button is disabled when the form is invalid -- Wrong format of email',
            fakeAsync(() => {
                loadFormWithUrl('register');
                updateRegisterForm('mick', 'abc', 'abc@123');
                fixture.detectChanges();
                expect((document.getElementById('submit-register') as HTMLButtonElement).disabled).toBeTruthy();
        }));

        // Test for submit to be enabled when the fields are valid.
        it('should test if register submit button is enabled when the form is valid', fakeAsync(() => {
            loadFormWithUrl('/register');
            updateRegisterForm('renan', 'renan@email.com', 'password');
            fixture.detectChanges();
            expect((document.getElementById('submit-register') as HTMLButtonElement).disabled).toBeFalsy();
        }));

        // Testing if on submit button the corresponding function is being called.
        it('should test if onRegisterSubmit method has been called 0 times', fakeAsync(() => {
            loadFormWithUrl('/register');
            fixture.detectChanges();
            spyOn(component, 'onRegisterSubmit');
            (document.getElementById('submit-register') as HTMLButtonElement).click();
            expect(component.onRegisterSubmit).toHaveBeenCalledTimes(0);
        }));
    });
});
