import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    whichUrl: string;

    registerForm: FormGroup;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
                private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.whichUrl = this.router.url;
        console.log(this.whichUrl);

        // Loads the login form in case url is for login
        if (this.whichUrl === '/login'){
            this.loginForm = new FormGroup({
                email: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required)
            });
        // Loads the register form in case url is for register
        }else if (this.whichUrl === '/register'){
            this.registerForm = new FormGroup({
                name: new FormControl('', Validators.required),
                email: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required)
            });
        }

    }

    /**
     * Checking login of the user on submit of the form
     * @param user: object
     */
    onLoginSubmit(user): void{
        let login;
        this.authService.checkUser(user).subscribe( response => {
            // Assigning login boolean to a variable.
            login = response.login;

            // Checking if login is successful.
            if (login === true){
                // Setting received token to local storage.
                localStorage.setItem('token', response.access_token);
                this.router.navigateByUrl('/home');
            }else{
                this.snackBar.open(response.message, 'Close', {
                    duration: 2000,
                });
            }
        });
    }

    onRegisterSubmit(user): void{
        try{
            this.authService.registerUser(user);
            this.router.navigateByUrl('/login');
            this.snackBar.open('New user created', 'Close', {
                duration: 2000,
            });
        }catch (e) {
            this.snackBar.open('Failed to create user', 'Close', {
                duration: 2000,
            });
        }

    }

    goTo(route): void{
        this.router.navigateByUrl(route);
    }

}
