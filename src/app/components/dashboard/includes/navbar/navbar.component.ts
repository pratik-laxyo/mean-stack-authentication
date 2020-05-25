import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './../../../../services/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username;

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {

  	if(this.registerService.isLoggedIn()) {
  		const token = this.registerService.getUserPayload();
  		const userId = token.id;
  		const userData = this.registerService.getUserDataByID(userId).subscribe(
  			res => { 
  				this.username = res.data.data.name;
  			},
  			err => { 
  				console.log(err);
  			}
  		);
  	}
    
  }

  Logout() {
      this.registerService.deleteToken();
      this.router.navigateByUrl("/login");
  }

}
