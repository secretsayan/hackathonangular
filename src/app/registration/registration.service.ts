import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class RegistrationService {
    private _regUrl = "http://localhost:3000/reg";
    private count = 100;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("email")
        })
    };

    constructor(private _http: HttpClient) {
        console.log("Initializing Events service ...");
    }

    getRegCount() {
        let regs = this._http.get(`${this._regUrl}/all`).subscribe(
            (reg: any) => regs = reg,
            err => console.log(err)
        );
        if (regs)
            return regs.length;
        else
            return 0;
    }

    getAllReg() {
        return this._http.get(`${this._regUrl}/all`);
    }

    getReg(id: any) {
        let getEventURL = `${this._regUrl}/view/${id}`;
        return this._http.get(getEventURL, this.httpOptions);
    }

    addReg(newReg: any) {
        let addRegURL = `${this._regUrl}/add`;
        return this._http.post(addRegURL, newReg, this.httpOptions);
    }

    updateReg(updatedEvent: any) {
        let updateEventURL = `${this._regUrl}/edit/${updatedEvent.eventId}`;
        return this._http.post(updateEventURL, updatedEvent, this.httpOptions);
    }

    deleteReg(id: any) {
        let deleteEventURL = `${this._regUrl}/delete/${id}`;
        console.log(deleteEventURL);
        return this._http.delete(deleteEventURL, this.httpOptions);
    }
}
