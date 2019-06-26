import { Routes, RouterModule } from '@angular/router';

import {AboutComponent} from './about/about.component';
import { LoginFormComponent } from './users/login-form.component';
import { AddUserFormComponent } from './users/adduser-form.component';
import { EditUserFormComponent } from './users/edituser-form.component';
//import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event.component';
import { AddEventFormComponent } from './events/addevent-form.component';
import { EditEventFormComponent } from './events/editevent-form.component';
import { RegistrationComponent } from './registration/registration.component';


const appRoutes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'login', component: LoginFormComponent},
  { path: 'signup', component: AddUserFormComponent},
  //{ path: 'users', component: UsersComponent },
  { path: 'profile', component: EditUserFormComponent},
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventComponent },
  { path: 'addEvent', component: AddEventFormComponent},
  { path: 'editEvent/:id', component: EditEventFormComponent},
  { path: 'registration/:id', component: RegistrationComponent},
];

export const routing = RouterModule.forRoot(appRoutes);

