import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { ProfileComponent } from '../app/components/profile/profile.component'

import { AuthService }  from "../app/services/auth.service";
import { AuthGuard  }  from "../app/services/auth.gaurd";


//defining the routes of the app
const applicationRoutes:Routes =[
  {path : 'login' ,component :LoginComponent},
  {path : 'register' ,component :RegisterComponent},
  {path : 'profile' ,component :ProfileComponent , canActivate: [AuthGuard]},
  {path : 'unauthorized', component: LoginComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(applicationRoutes),
    FlashMessagesModule
    
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
