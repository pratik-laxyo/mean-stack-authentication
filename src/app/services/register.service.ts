import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { api } from './../api';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
	baseUri = api.baseUrl;
	headers = new HttpHeaders().set('Content-Type', 'application/json');

	noAuthHeaders = { headers: new HttpHeaders({ 'NoAuth': 'True' }) }

  	constructor(private http: HttpClient) { }

  	/* Methods*/

  	// registerUsers
	createUser(data) {
		return this.http.post(api.baseUrl + 'register', data, this.noAuthHeaders);
	}

	// loginUser
	loginUser(data) {
		return this.http.post(api.baseUrl + 'login', data, this.noAuthHeaders);
	}

	// getUsersDetails
	getUsersDetails() {
		return this.http.get(api.baseUrl);
	}

	// getUserDataByID
	getUserDataByID(data) {
		return this.http.get(api.baseUrl + data);
	}


	/* Helpers */

	// getToken on local storage
	getToken() {
	    return localStorage.getItem('token');
	}

	// setToken on local storage
	setToken(token: string) {
	    localStorage.setItem('token', token);
	}

	// deleteToken on local storage
	deleteToken() {
		localStorage.removeItem('token');
	}

	// 
	getUserPayload() {
		var token = localStorage.getItem('token');
		if(token) {
			const userPayload = atob(token.split('.')[1]);
			return JSON.parse(userPayload);
		} else {
			return null;
		}
	}

	// 
	isLoggedIn() {
		var userPayload = this.getUserPayload();
		if(userPayload) {
			return userPayload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	}

}
