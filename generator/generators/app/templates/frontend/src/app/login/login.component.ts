import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    credentialsForm: FormGroup;

    whichUrl: string;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
                private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loadForm();
    }

    loadForm(): void{
        // Getting route from URL.
        this.whichUrl = this.router.url;

        // Loads the login form in case url is for login
        if (this.whichUrl === '/login'){
            this.credentialsForm = new FormGroup({
                email: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', Validators.required)
            });
            console.log('Loaded login');
            // Loads the register form in case url is for register
        }else if (this.whichUrl === '/register'){
            this.credentialsForm = new FormGroup({
                name: new FormControl('', Validators.required),
                email: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', Validators.required)
            });
            console.log('Loaded register');
        }
    }

    /**
     * Checking login of the user on submit of the form
     * @param user: object - A JSON from form.
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
                this.router.navigate(['/home']);
            }else{
                this.snackBar.open(response.message, 'Close', {
                    duration: 2000,
                });
            }
        });
    }

    /**
     * Registering user using API call and then redirects the user to /login.
     * @param user: object - A JSON from form.
     */
    onRegisterSubmit(user): void{
        try{
            this.authService.registerUser(user);
            this.router.navigate(['/login']);

            // Pop-up message with user created.
            this.snackBar.open('New user created', 'Close', {
                duration: 2000,
            });
        }catch (e) {
            // Pop-up message with fail on user creation.
            this.snackBar.open('Failed to create user', 'Close', {
                duration: 2000,
            });
        }

    }

    /**
     * Function that redirects the user to the page based on the route passed to it.
     * @param route: string
     */
    goTo(route): void{
        this.router.navigate([route]);
    }

}
