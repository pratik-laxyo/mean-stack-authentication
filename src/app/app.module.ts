// Default Packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { RegisterService } from './services/register.service';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { LoginUsersComponent } from './components/login-users/login-users.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/includes/sidebar/sidebar.component';
import { NavbarComponent } from './components/dashboard/includes/navbar/navbar.component';
import { UsersComponent } from './components/dashboard/users/users.component';

// auth-guards
import { AuthGuard } from './auth-guard/auth.guard';
import { AuthInterceptor } from './auth-guard/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddUsersComponent,
    LoginUsersComponent,
    ForgotPwdComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard, RegisterService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
