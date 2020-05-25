import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { RegisterService } from './../../services/register.service';

@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrls: ['./login-users.component.css']
})
export class LoginUsersComponent implements OnInit {
	submitted = false;
	loginForm: FormGroup;
	showErrorMsg: string;

  	constructor(
  		public fb: FormBuilder,
  		private router: Router, 
  		private registerService: RegisterService
  	) { }

  	ngOnInit(): void {
  		this.loginForm = this.fb.group({
	      	email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
	      	password: ['', [Validators.required]],
	    });

	    if(this.registerService.isLoggedIn()) {
	    	this.router.navigateByUrl('/dashboard');
	    }
  	}

  	get myForm(){
	    return this.loginForm.controls;
	}
	  
	onSubmit() { 
		this.submitted = true;
		if(!this.loginForm.value){
			return false;
		} else {
			this.registerService.loginUser(this.loginForm.value).subscribe(
				res => { },
				err => {
		          if(err.error.text) {
		              const token = err.error.text;
		              this.registerService.setToken(token);
		              this.router.navigateByUrl('/dashboard');
		          } else {
		              this.showErrorMsg = err.error;
		          }
				}
			);
		}
	}

}
