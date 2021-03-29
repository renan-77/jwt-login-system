import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    /**
     * Checks if the user is authenticated when trying to access the route.
     */
    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    redirectLogin(): void {
        this.router.navigateByUrl('/login');
    }

}
