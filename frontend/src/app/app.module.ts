// Modules imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './routes/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// Components imports.
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// Importing classes for access management.
import {AuthGuard} from './auth/guards/auth.guard';
import {TokenInterceptor} from './auth/interceptors/token.interceptor';
import {AuthService} from './auth/services/auth.service';


@NgModule({
    declarations: [
        // Declaring components.
        AppComponent,
        LoginComponent,
        HomeComponent,
    ],
    imports: [
        // Importing modules from libraries.
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule

    ],
    providers: [{
        // Providing Interceptor and specifying which class it's declared.
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    },
        // Providing AuthGuard with it's class.
        AuthGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
