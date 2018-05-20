import { Component, OnInit } from '@angular/core';
import {AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  username:String;
  email:String;
  password:String;

  constructor( private authService :AuthService  , private flashMessagesService:FlashMessagesService , private router:Router) { }

  ngOnInit() {
  }

  registerData(){

    const user ={
      name :this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }

    this.authService.registerUser(user).subscribe(res=>{
      console.log(res);

      //only if state is true
      if(res.state){
        //showing the success flash message
        this.flashMessagesService.show( res.message , { cssClass: 'alert-success', timeout: 3000 });
        //redirecting the page to the login page
        this.router.navigate(['/login']);
      }else{
         //showing the success flash message
         this.flashMessagesService.show( res.message, { cssClass: 'alert-danger', timeout: 3000 });
          //redirecting the page back to register page
         this.router.navigate(['/register']);
      }

    });
  }




}
