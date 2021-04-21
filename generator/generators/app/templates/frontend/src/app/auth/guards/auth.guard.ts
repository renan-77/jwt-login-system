import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
/**
 * Class used for authentication of user.
 * This class is a guard that will be called on route access.
 */
export class AuthGuard implements CanActivate {

    // Declaring instances of relevant classes.
    constructor(private auth: AuthService, private router: Router) {}

    /**
     * Checks if the user is authenticated when trying to access the route.
     */
    canActivate(): boolean {
        // Checking if the user is authenticated.
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    /**
     * Function to redirect user to login page.
     */
    redirectLogin(): void {
        this.router.navigate(['/login']);
    }
}
