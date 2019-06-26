import { Component, OnInit } from '@angular/core';
import { Event } from './event';
import { UsersService } from "../users/users.service";
import { EventsService } from "./events.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',  
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  title = "List of Events";
  events: Event[];
  descriptionFilter: String;
  userRole: any;
 
  selectedEvents: any[] = [];
 
  constructor(private _userService: UsersService, private _eventService: EventsService, private router: Router) { }

  ngOnInit() {
	if(this._userService.isLoggedIn()) {
    this.userRole = this._userService.getRole();
		this.getEvents();
	} else {
		this.router.navigate(['login']);
	}
	//this._userService.isLoggedIn().subscribe(val => {if(val) this.getEvents(); else this.router.navigate(['login']);});
  }

  getEvents() {
    this._eventService.getEvents().subscribe(
      (events:any) =>  this.events = events,
      err => console.log(err)
    );
  }  

  deleteEvent(id: any) {
    this._eventService.deleteEvent(id).subscribe(
      (data:any) =>  this.getEvents()
    );
  }

  

  stateChanged(e: any,id:any) {
     
    if(e.target.checked) {
      if(this.selectedEvents.indexOf(id)==-1) {
        this.selectedEvents.push(id);
      }
    } else {
      this.selectedEvents.splice( this.selectedEvents.indexOf(id), 1 );
    }
    console.log(this.selectedEvents);
  }

  bulkDelete() {
    if(this.selectedEvents.length>0) {
      for(let i in this.selectedEvents) {
        this.deleteEvent(this.selectedEvents[i]);
      }
    } else {
      alert("Please select at least an event.")
    }
  }
}
