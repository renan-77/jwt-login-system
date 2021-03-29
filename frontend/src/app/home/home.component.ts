import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {}

    clearStorage(): void{
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }
}
