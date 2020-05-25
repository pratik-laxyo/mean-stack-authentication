import { Router } from '@angular/router';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  showErrorMsg: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    });

    if(this.registerService.isLoggedIn())
      this.router.navigateByUrl("/dashboard");
  }

  get myForm(){
    return this.registerForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      return false;
    } else {
      // console.log(this.registerForm.value);
      this.registerService.createUser(this.registerForm.value).subscribe(
        res => {
            //setTimeout(() => this.showSuccessMsg = false, 5000);
        }, 
        err => {
          if(err.error.text) {
              const token = err.error.text;
              this.registerService.setToken(token);
              this.router.navigateByUrl('/dashboard');
          } else {
              //console.log(err);
              this.showErrorMsg = err.error;
          }
        }
      );
    }
  }

 
}
