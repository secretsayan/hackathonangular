import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsersService } from "./users.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'adduser-form',
    templateUrl: './adduser-form.component.html',
    styles: ['.panel {margin:15px;}']
})

export class AddUserFormComponent {
    title: string = "User Registration";

    constructor(private _userService: UsersService, private router: Router, private toastr: ToastrService) { }

    onSubmit(formValue: any) {
        console.log("Form Value = " + JSON.stringify(formValue, null, 4));
        let newUser = {
            firstname: formValue.firstName,
            lastname: formValue.lastName,
            email: formValue.email,
            password: formValue.password,
            location: formValue.location,
            mobile: formValue.mobile,
            role: "user"
        };
        this._userService.addUser(newUser).subscribe(val => {
            this.router.navigate(['login']);
            this.toastr.success("You have successfully registered! Please login now");

        });
    }

}
