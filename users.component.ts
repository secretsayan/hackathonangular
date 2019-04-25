import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UsersService } from "./users.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',  
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  title = "List of Users";
  users: User[];
  descriptionFilter: String;
  showFields: any = 
        {desc: true,
        seve: true,
        stat: true,
        cdate: true,
        rdate: true}
  ;  

  selectedUsers: any[] = [];
 
  constructor(private _userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      (users:any) =>  this.users = users,
      err => console.log(err)
    );
  }  

  deleteUser(id: any) {
    this._userService.deleteUser(id).subscribe(
      (data:any) =>  this.getUsers()
    );
  }

  onOff(param: string) {
    this.showFields[param] = !this.showFields[param];
  }

  stateChanged(e: any,id:any) {
    
    if(e.target.checked) {
      if(this.selectedUsers.indexOf(id)==-1) {
        this.selectedUsers.push(id);
      }
    } else {
      this.selectedUsers.splice( this.selectedUsers.indexOf(id), 1 );
    }
    console.log(this.selectedUsers);
  }

  bulkDelete() {
    if(this.selectedUsers.length>0) {
      for(let i in this.selectedUsers) {
        this.deleteUser(this.selectedUsers[i]);
      }
    } else {
      alert("Please select at least an user.")
    }
  }
}
