import { Injectable } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  //defining the type for the user
  user:any;
  //defining the type for the jwt token
  token:any;

  constructor(private http:Http) { }

  /**
   * registerUser() method will send a post req to the node server  to save the user in the database 
   * @param user 
   */
  registerUser(user){
    let headers= new Headers();
    headers.append('content-Type' ,'application/json');

    //this will rturn the response of the post request
    return this.http.post("http://localhost:3000/user/register",user ,{ headers : headers})
    .map(res=>res.json());;
  }

  /**
   * loginUser() method will send a post req to the node server
   * @param user 
   */
  loginUser(user){
    let headers= new Headers();
    headers.append('content-Type' ,'application/json');

    //this will rturn the response of the post request
    return this.http.post("http://localhost:3000/user/login",user ,{ headers : headers})
    .map(res=>res.json());;
  }

  /**
   * storeData() method will save the jwt token and userData to the browser local storage
   * @param token 
   * @param userData 
   */
  storeData(token,userData){
    //saving the jwt token and user data in the browser local storage
    localStorage.setItem("token",token);
    localStorage.setItem("useuserData",JSON.stringify(userData));
    //setting the tokens
    this.token=token;
    this.user=userData;
  }

  /** 
   * getUserProfile() method will send a GET req to the node web api and get user JSON
  */
  getUserProfile(){
    //getting the token from local storage
    this.fetchToken(); 

    let headers= new Headers();
    //appending the authourization header to access the blockked profile route
    headers.append('Authorization' ,this.token);
    headers.append('content-Type' ,'application/json');

    return this.http.get("http://localhost:3000/user/profile" ,{ headers : headers}).map(res=>res.json());;
  }

  /**
   * fetchToken() method will get the jwt token saved in the locl storage of the broswer and set it to a variable
   */
  fetchToken(){
    const localToken=localStorage.getItem("token");
    this.token=localToken;
  }

  /** 
   * logoutUser() method will clear the local storage and also set the user and token variables to NULL
   */
  logoutUser(){
    //clearing variables
    this.token=null;
    this.user=null;
    //clearing local storage data
    localStorage.clear();
  }

  //this method is used to check if user is logged in or not
  loggedIn() {
    return tokenNotExpired();
  }

}
