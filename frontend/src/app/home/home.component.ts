import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    token = localStorage.getItem('token');

    constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        let authenticated = false;

        if (this.token === null){
            this.redirectHomePage();
        }

        this.dataService.authenticateUser(this.token).subscribe(response => {
            console.log(`Api Response: ${response.login}`);
            authenticated = response.login;
            if (!authenticated){
                this.redirectHomePage();
            }else {
                console.log(authenticated);
            }
        });
    }

    redirectHomePage(): void{
        console.log('If you\'re here is because the api returned false or an error.');
        this.router.navigateByUrl('/login');
    }
}
