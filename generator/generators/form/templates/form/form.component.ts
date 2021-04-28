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
export class <%= formNamePascalCase %>Component implements OnInit {
    <%= formName %>Form: FormGroup;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
                private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loadForm();
    }

    loadForm(): void{
        this.<%= formName %>Form = new FormGroup({
            <%= fieldsTs %>
        });
    }

    onSubmit(): void{

    }
}
