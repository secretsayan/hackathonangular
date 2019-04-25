import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";

@Injectable()

export class UsersService{
	private _usersUrl = "http://localhost:3000/user";
	private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
	};
  
	constructor (private _http: HttpClient) { 
		console.log("Initializing Users service ...");
	}

	loginUser(userInfo: any, isAdmin: boolean) {
		let addUserURL = `${this._usersUrl}/login`;
		if(isAdmin) {
			addUserURL = `${this._usersUrl}/admin/login`;
		}
		return this._http.post(addUserURL, userInfo, this.httpOptions)
						 .do(authResult => this.setSession(authResult)) 						 
						 .shareReplay();
	}

	getMyProfile() {
		let getUserURL = `${this._usersUrl}/profile`;
		return this._http.get(getUserURL);
	}

	getUser(id: any) {
		let getUserURL = `${this._usersUrl}/edit/${id}`;
		return this._http.get(getUserURL);    
	}

	addUser(newUser: any) {
		let addUserURL = `${this._usersUrl}/signup`;
		return this._http.post(addUserURL, newUser, this.httpOptions);
	}

	updateUser(updatedUser: any) {
		let updateUserURL = `${this._usersUrl}/edit/${updatedUser.id}`;
		return this._http.post(updateUserURL, updatedUser, this.httpOptions);
	}

	deleteUser(id: any) {
		let deleteUserURL = `${this._usersUrl}/delete/${id}`;
		console.log(deleteUserURL);
		return this._http.get(deleteUserURL);
	}
	
	private setSession(authResult) {
		
		const expiresAt = moment().add(authResult.expiresIn,'second');
		//console.log(authResult.firstname);	
		localStorage.setItem('firstname', authResult.firstname);
		localStorage.setItem('email', authResult.idToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
		
	}        
	
	public getFirstName() {
		console.log(localStorage.getItem("firstname"));
		return localStorage.getItem("firstname");
	}

	public getEmail() {
		return localStorage.getItem("email");
	}

    logout() {
		localStorage.removeItem("id_token");
		localStorage.removeItem("firstname");
		localStorage.removeItem("email");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}
