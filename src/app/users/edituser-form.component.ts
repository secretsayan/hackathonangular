import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsersService } from "./users.service";
import { User } from "../models/user";

@Component({
  selector: 'edituser-form',
  templateUrl: './edituser-form.component.html',
  styles: ['.panel {margin:15px;}']
})

export class EditUserFormComponent {
	
	title: string = "Editing an User";
	
	id: any;
	user:User={firstName: "", lastName: "", email: "", password: "", location: "", mobile: "", role: ""};

	constructor(private _userService: UsersService, private route: ActivatedRoute, private router: Router) { }
	
   

	ngOnInit(): void {
		
		this.route.params.forEach((params: Params) => {
		  this.id = +params['id'];
		});
		this._userService.getMyProfile().subscribe(
		(ev:any) => {this.user = ev;console.log(this.user);}       
		);  
	}

	onSubmit(formValue: any){
		console.log("Form Value = " + JSON.stringify(formValue, null, 4));
		let updatedUser = {
			  firstname: formValue.firstName,
			  lastname: formValue.lastName,
			  email: formValue.email,
			  password: formValue.password,
			  location: formValue.location,
			  mobile: formValue.mobile,
			  role: "user"	 
			};    
		this._userService.updateUser(updatedUser).subscribe( val => {
			console.log(val);
			this.router.navigate(['events']);
		});
    
	}
}
