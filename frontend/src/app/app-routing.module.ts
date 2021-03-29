import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

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
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
