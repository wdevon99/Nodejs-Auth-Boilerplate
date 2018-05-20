import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service"
import { FlashMessagesService } from 'angular2-flash-messages'; 
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //defining the types
  email:String;
  password:String;

  constructor(private authService :AuthService , private flashMessagesService:FlashMessagesService,private router:Router) { }

  ngOnInit() {
  }

  //this method will login a user
  loginUser(){
    const user ={
      email:this.email,
      password:this.password
    }

    //passing user object to the login user method in the auth service
    this.authService.loginUser(user).subscribe(res=>{
      //checking if login is successful
      if(res.state){
        //storing the user data in the response (the jwt token and user json)
        this.authService.storeData(res.token, res.user);
        //success flash message
        this.flashMessagesService.show( res.message , { cssClass: 'alert-success', timeout: 5000 });
        //redirecting back to the profile page
        this.router.navigate(["/profile"]);
      }else{
        this.flashMessagesService.show( res.message , { cssClass: 'alert-danger', timeout: 5000 });
        //redirecting back to the login page
        this.router.navigate(["/login"]);
      }
    });
  }

}
