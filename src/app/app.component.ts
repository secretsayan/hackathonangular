import { Component } from '@angular/core';
import { UsersService } from "./users/users.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Hackathon Event Management';
	isLoggedIn = false;
	firstName = "";
  
	constructor(private _userService: UsersService, private router: Router) { }
  
	ngOnInit() {		
		this.isLoggedIn = this._userService.isLoggedIn();
		this.firstName = this._userService.getFirstName();
	}
  
    logOut() {
		this._userService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['login']);
		
    }  
}
