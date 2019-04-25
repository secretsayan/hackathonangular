import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EventsService } from "./events.service";
import { Event } from "./event";

@Component({
  selector: 'editevent-form',
  templateUrl: './editevent-form.component.html',
  styles: ['.panel {margin:15px;}']
})

export class EditEventFormComponent {
	
	title: string = "Editing an Event";
	statuses: string[] = ["Open", "In Progress", "Closed"];
	id: any;
	event:Event={name:"",description:"",startDate:"",endDate:"",status:"",noOfTeams:"", maxTeamSize:"", prizes:"", hackathonHost:""};

	constructor(private _eventService: EventsService, private route: ActivatedRoute, private router: Router) { }
	
   

	ngOnInit(): void {
		
		this.route.params.forEach((params: Params) => {
		  this.id = +params['id'];
		});
		this._eventService.getEvent(this.id).subscribe(
		(ev:any) => {this.event = ev;console.log(this.event);}       
		);  
	}

	onSubmit(formValue: any){
		console.log("Form Value = " + JSON.stringify(formValue, null, 4));
		let updatedEvent = {
			  id: this.id,
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
		this._eventService.updateEvent(updatedEvent).subscribe( val => {
			console.log(val);
			this.router.navigate(['events']);
		});
    
	}
}
