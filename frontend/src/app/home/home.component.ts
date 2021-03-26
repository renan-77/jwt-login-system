import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    // Getting token from local storage.
    token = localStorage.getItem('token');

    constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        let authenticated = false;

        // Calling authenticate function with token as parameter.
        this.dataService.authenticateUser(this.token).subscribe(response => {
            console.log(`Api Response: ${response.login}`);

            // Assigning the response from the call to authenticated variable.
            authenticated = response.login;
        });

        // Checking if token is null or if authenticated is false.
        if (this.token === null || !authenticated){
            this.redirectHomePage();
        }
    }

    /**
     * Redirect to home.
     */
    redirectHomePage(): void{
        console.log('If you\'re here is because the api returned false or an error.');
        this.router.navigateByUrl('/login');
    }
}
