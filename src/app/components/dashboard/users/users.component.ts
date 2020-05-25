import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './../../../services/register.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userDetail; 

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {
  		this.registerService.getUsersDetails().subscribe(
  			res => {
  				// console.log(res.data.data);
  				this.userDetail = res.data.data;
  			},
  			err => {

  			}
  		);
  }

}
