import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {AuthGuard} from '../auth/guards/auth.guard';

export const routes: Routes = [
    // Redirecting blank route to login.
    { path: '',   redirectTo: '/login', pathMatch: 'full' },

    // Loading  components on access of route.
    { path: 'login', component: LoginComponent },
    {path: 'register', component: LoginComponent},

    // Using canActivate to check for valid token
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [
        // Importing route module passing routes const as parameter.
        RouterModule.forRoot(routes)
    ],
    exports: [
        // Exporting router module
        RouterModule
    ]
})
export class AppRoutingModule { }
