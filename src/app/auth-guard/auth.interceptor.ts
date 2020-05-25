import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { RegisterService } from './../services/register.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(
	    private router: Router,
	    private registerService: RegisterService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		if(req.headers.get('noauth'))
			return next.handle(req.clone());
		else {
			const clonedreq = req.clone({
				headers: req.headers.set("auth-token", this.registerService.getToken())
			});
			return next.handle(clonedreq).pipe(
				tap(
					event => { },
					err => {
						if(err.error.auth == false){
							this.router.navigateByUrl("/login");
						}
					}
				)
			);
		}
	}

}