import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { EventsService } from "./events.service";

//import "rxjs/add/operator/map";

@Component({
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    id: any;
    event: Event;
    
    constructor(private _eventService: EventsService, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
        });
        this._eventService.getEvent(this.id).subscribe(
			(event:any) =>  this.event = event,
			err => console.log(err)
		);		
    }

    goBack(): void {
        this.location.back();
    }
}
