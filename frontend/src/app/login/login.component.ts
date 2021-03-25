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

    onSubmit(user): void{
        let login;
        this.dataService.checkUser(user).subscribe( response => {
            login = response.login;
            console.log(response.access_token);
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('eu', 'renan');

            if (login === true){
                this.router.navigateByUrl('/home');
            }else{
                console.log(response.response);
            }
        });
    }

}
