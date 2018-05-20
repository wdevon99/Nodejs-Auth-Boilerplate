import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from "../../services/auth.service"
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router ,private authService:AuthService,private flashMessagesService:FlashMessagesService) { }

  ngOnInit() {
  }

  /** 
   * logoutUser() method logs out the current user with the help of the authService.logoutUser method 
  */
  logoutUser(){
    this.authService.logoutUser();
    //redirecting to login page
    this.router.navigate(['/login']);
    //showing success message
    this.flashMessagesService.show( "Successfully Logged Out!", { cssClass: 'alert-success', timeout: 5000 });
    return false; 
  }

}
