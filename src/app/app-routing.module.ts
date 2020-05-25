import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { LoginUsersComponent } from './components/login-users/login-users.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { AuthGuard } from './auth-guard/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginUsersComponent },
	{ path: 'register', component: AddUsersComponent },
	{ path: 'forgot-pwd', component: ForgotPwdComponent },


	{ path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
	{ path: 'users', component: UsersComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
