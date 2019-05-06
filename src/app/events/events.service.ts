import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Init } from "./initial-events";

@Injectable()

export class EventsService {
	private _eventsUrl = "event";
	private count=100;
	private httpOptions = {
      headers: new HttpHeaders({
				'Content-Type':  'application/json',
				"Authorization":"Bearer "+localStorage.getItem("email")				
      })
	};
  
	constructor (private _http: HttpClient) { 
		console.log("Initializing Events service ...");
	}

	getEventCount() {
		let eventss = this._http.get(`${this._eventsUrl}/all`).subscribe(
		  (events:any) =>  eventss = events,
		  err => console.log(err)
		);
		if(eventss)
		  return eventss.length;
		else
		  return 0;
	}

	getEvents() {
		return this._http.get(`${this._eventsUrl}/all`);
	}

	getEvent(id: any) {
		let getEventURL = `${this._eventsUrl}/edit/${id}`;
		return this._http.get(getEventURL,this.httpOptions);    
	}

	addEvent(newEvent: any) {
		this.count++;
		let addEventURL = `${this._eventsUrl}/add`;
		return this._http.post(addEventURL, newEvent, this.httpOptions);
	}

	updateEvent(updatedEvent: any) {
		let updateEventURL = `${this._eventsUrl}/edit/${updatedEvent.eventId}`;
		return this._http.post(updateEventURL, updatedEvent, this.httpOptions);
	}

	deleteEvent(id: any) {
		let deleteEventURL = `${this._eventsUrl}/delete/${id}`;
		console.log(deleteEventURL);
		return this._http.delete(deleteEventURL,this.httpOptions);
	}
}
