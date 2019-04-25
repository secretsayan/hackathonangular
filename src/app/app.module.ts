import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }  from './app.routing';

import {AboutComponent} from './about/about.component';

//import { UsersComponent } from './users/users.component';
import { LoginFormComponent } from './users/login-form.component';
import { UserComponent } from './users/user.component';
import { AddUserFormComponent } from './users/adduser-form.component';
import { EditUserFormComponent } from './users/edituser-form.component';
import { UserFilterPipe } from './users/users-filter.pipe';
import { UsersService } from './users/users.service';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event.component';
import { AddEventFormComponent } from './events/addevent-form.component';
import { EditEventFormComponent } from './events/editevent-form.component';
import { EventFilterPipe } from './events/events-filter.pipe';
import { EventsService } from './events/events.service';



@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, HttpClientModule, routing ],
  declarations: [ 
			AppComponent, 
			AboutComponent, 
			//UsersComponent,
			LoginFormComponent,
			UserComponent,
			AddUserFormComponent,
			EditUserFormComponent,
			UserFilterPipe,			
			EventsComponent, 
			EventComponent,
			AddEventFormComponent, 
			EditEventFormComponent, 
			EventFilterPipe ],
  providers: [ UsersService, EventsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
