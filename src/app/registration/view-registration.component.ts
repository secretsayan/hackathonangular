import { Component, OnInit } from '@angular/core';
import { Event } from '../events/event';
import { UsersService } from "../users/users.service";
import { EventsService } from "../events/events.service";
import { RegistrationService } from "./registration.service";
import { Registration } from '../models/registration';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/User';

@ Component({
    selector: 'app-regs',
    templateUrl: './view-registration.component.html',
    styleUrls: ['./view-registration.component.css']
  })

  export class ViewRegistrationComponent implements OnInit{
      regs: any[];

    constructor(private _regService: RegistrationService, private _userService: UsersService, private router: Router, private route: ActivatedRoute){
    }
    ngOnInit(): void {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        if (this._userService.isLoggedIn()) {
            if(this._userService.getRole() == 'admin')
              this._regService.getReg(this.route.snapshot.params.id).subscribe(
                (registrations: any) => {
                    console.log(registrations);
                    this.regs = registrations;
                    console.log(typeof(registrations));
                }
              );

          } else {
            this.router.navigate(['login']);
          }
    }
  }
