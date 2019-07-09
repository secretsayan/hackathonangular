import { Component, OnInit } from '@angular/core';
import { Event } from '../events/event';
import { UsersService } from "../users/users.service";
import { EventsService } from "../events/events.service";
import { RegistrationService } from "./registration.service";
import { Registration } from '../models/registration';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    title: string = "Registration for Hackathon";
    statuses: string[] = ["Open", "In Progress", "Closed"];
    members: User[];
    eventId: any;

    constructor(private toastr: ToastrService, private _userService: UsersService, private _registrationService: RegistrationService, private route: ActivatedRoute, private router: Router) {

    }
    ngOnInit() {
        this._userService.getAllUsers().subscribe((user: any) => {
            console.log(user);
            var newUser = user.filter(item => {
            var  userEmail = this._userService.getEmail();
                return item.email != "admin@hack.com" && item.email != userEmail;
            });
            console.log(newUser);
            this.members = newUser;
        });

    }
    onSubmit(formValue: any) {
        console.log("Form Value = " + JSON.stringify(formValue, null, 4));
        formValue.members.push(localStorage.getItem("email"));
        let newReg = {
            eventId: this.route.snapshot.params.id,
            teamName: formValue.name,
            teamDescription: formValue.description,
            teamMembers: formValue.members,
        };
        this._registrationService.addReg(newReg).subscribe(val => {
            this.router.navigate(['events']);
            this.toastr.success("You have successfully Registered for the event");
        });
    }

}
