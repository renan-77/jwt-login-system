import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    /**
     * Checking login of the user on submit of the form
     * @param user: object
     */
    onSubmit(user): void{
        let login;
        this.dataService.checkUser(user).subscribe( response => {
            // Assigning login boolean to a variable.
            login = response.login;

            // Checking if login is successful.
            if (login === true){
                // Setting received token to local storage.
                localStorage.setItem('token', response.access_token);
                this.router.navigateByUrl('/home');
            }else{
                console.log(response.response);
            }
        });
    }

}
