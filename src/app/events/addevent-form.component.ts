import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EventsService } from "./events.service";

@Component({
  selector: 'addevent-form',
  templateUrl: './addevent-form.component.html',
  styles: ['.panel {margin:15px;}']
})

export class AddEventFormComponent {
	title: string = "Adding an Event";	
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
