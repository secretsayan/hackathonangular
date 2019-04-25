import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { UsersService } from "./users.service";

//import "rxjs/add/operator/map";

@Component({
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    id: any;
    user: any;
    
    constructor(private _userService: UsersService, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
        });
        this.user = this._userService.getUser(this.id).subscribe(
			(user:any) =>  this.user = user,
			err => console.log(err)
		);		
    }

    goBack(): void {
        this.location.back();
    }
}
