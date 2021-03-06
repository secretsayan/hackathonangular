import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import { User } from '../models/User';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";

@Injectable()

export class UsersService {
    private _usersUrl = "http://localhost:3000/user";
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private _http: HttpClient) {
        console.log("Initializing Users service ...");
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

    }

    loginUser(userInfo: any, isAdmin: boolean) {
        let addUserURL = `${this._usersUrl}/login`;
        if (isAdmin) {
            addUserURL = `${this._usersUrl}/admin/login`;
        }
        return this._http.post(addUserURL, userInfo, this.httpOptions)
            .do(authResult => this.setSession(authResult))
            .shareReplay();
    }

    getMyProfile() {
        let getUserURL = `${this._usersUrl}/profile`;
        return this._http.get(getUserURL);
    }

    getUser(id: any) {
        let getUserURL = `${this._usersUrl}/edit/${id}`;
        return this._http.get(getUserURL);
    }

    getAllUsers() {
        let getUsersURL = `${this._usersUrl}/all`;
        return this._http.get(getUsersURL);
    }

    addUser(newUser: any) {
        let addUserURL = `${this._usersUrl}/signup`;
        return this._http.post(addUserURL, newUser, this.httpOptions);
    }

    updateUser(updatedUser: any) {
        let updateUserURL = `${this._usersUrl}/edit/${updatedUser.id}`;
        return this._http.post(updateUserURL, updatedUser, this.httpOptions);
    }

    deleteUser(id: any) {
        let deleteUserURL = `${this._usersUrl}/delete/${id}`;
        console.log(deleteUserURL);
        return this._http.get(deleteUserURL);
    }

    private setSession(authResult) {

        const expiresAt = moment().add(authResult.expiresIn, 'second');
        console.log(JSON.stringify(authResult));

        localStorage.setItem('currentUser', JSON.stringify(authResult));
        localStorage.setItem('firstname', authResult.firstname);
        localStorage.setItem('email', authResult.email);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('role', authResult.role);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));

    }

    public getFirstName() {
        return localStorage.getItem("firstname");
    }

    public getEmail() {
        return localStorage.getItem("email");
    }

    public getRole() {
        return localStorage.getItem("role");
    }

    public getRegistrations() {
        let email = localStorage.getItem("email");
        console.log("email"+email);
        let getUsersURL = `${this._usersUrl}/checkreg/` + email;
        return this._http.get(getUsersURL);
    }

    public logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("firstname");
        localStorage.removeItem("email");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    public isLoggedOut() {
        return !this.isLoggedIn();
    }

    public getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
