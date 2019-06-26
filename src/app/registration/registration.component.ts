import { Component, OnInit } from '@angular/core';
import { Event } from '../events/event';
import { UsersService } from "../users/users.service";
import { EventsService } from "../events/events.service";
import { Registration } from '../models/registration';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',  
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
    title: string = "Registration for Hackathon";	
	statuses: string[] = ["Open", "In Progress", "Closed"];	

	constructor(private _eventService: EventsService, private router: Router) { }

	onSubmit(formValue: any){
		console.log("Form Value = " + JSON.stringify(formValue, null, 4));
		let eventCount = this._eventService.getEventCount();
		let newEvent = {
			  //id: issueCount + 1,
			  name: formValue.name,
			  description: formValue.description,
			  startDate: formValue.startDate,
			  endDate: formValue.endDate,
			  status: formValue.status,
			  noOfTeams: formValue.noOfTeams,
			  maxTeamSize: formValue.maxTeamSize,
			  prizes: formValue.prizes,			  
			  hackathonHost: formValue.hackathonHost	 			  
			};
		this._eventService.addEvent(newEvent).subscribe(val => {
		  this.router.navigate(['events']);
		});    
	} 

}
