import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsersService } from "./users.service";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styles: ['.panel {margin:15px;}']
})

export class LoginFormComponent {
	title: string = "User Login";	
	isAdmin: boolean = false;
	
	constructor(private _userService: UsersService, private router: Router) { }
	
	stateChanged(e: any) {    
		if(e.target.checked) {
		  this.isAdmin = true;
		} else {
		  this.isAdmin = false;
		}    
	}

	onSubmit(formValue: any){
		console.log("Form Value = " + JSON.stringify(formValue, null, 4));
		let userInfo = {
			  //id: issueCount + 1,
			  email: formValue.email,
			  password: formValue.password			  	  
			};
		this._userService.loginUser(userInfo, this.isAdmin).subscribe(val => {
			/*let val[] = val.split("token=");
			localStorage.setItem('loggedUser',JSON.stringify([
			{
			  "email": formValue.email,
			  "password": val[1]			  
			}
		  ]);*/
		  this.router.navigate(['events']);
		  //window.location.reload();
		});    
	} 

}
