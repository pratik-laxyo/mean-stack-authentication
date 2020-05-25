import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterService } from './../services/register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private registerService: RegisterService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
  		if(!this.registerService.isLoggedIn()) {
  			this.router.navigateByUrl('/login');
  			this.registerService.deleteToken();
  			return false;
  		}
    return true;
  }
  
}
