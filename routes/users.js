//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();
//loading the user scema model module
const User= require('../models/user');
//need when logging in a user
const jwt = require('jsonwebtoken')
//to use config data
const config=require("../config/database");
//to make authenticated routes
const passport=require("passport");

//=========  REGISTER ROUTE  ========= 
//defining the "/users/register" route
router.post('/register',(req,res)=>{
    //creating a new user object using the defined scemea
    const newUser=new User({
        username:req.body.username,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    //passing the newUser object and a callback funtion to the saveUser() method to add the user ro the Database
    User.saveUser(newUser,function(err,user){
        if(err){
            //if not inserted
            res.json({state:false,message:"Data not inserted!"});
        }
        if(user){
            //if inserted
            res.json({ state:true,message:"Data inserted!"});
        }
    }); 
});

//=========  LOGIN ROUTE  =========
//defining the "/users" route
router.post('/login',(req,res)=>{
     //getting the user username and password from the user
     const email= req.body.email;
     const password= req.body.password;

     //passing the email and a callback fuction to the findByEmail() function
     User.findByEmail(email,function (err,user){
         if(err) throw err;
         if(!user){
             res.send({state:false,message:"No matching email found"});
         }else{
            //check if passwords are matching
            User.passwordCheck(password,user.password, function (err,match){
                if(err) throw err; 
                //checking if match is a success
                 if(match){
                    //creating a JSON web toke (JWT)
                    const token = jwt.sign(user.toJSON(), config.secret , {expiresIn:86400} );
                    res.json({
                        state:true,
                        message:"Login Successful",
                        token:"JWT "+token,
                        user:{
                            id:user._id,
                            username:user.username,
                            name:user.name, 
                            email:user.email
                        }
                    });
                }
                //checking if match is fail
                if(!match){
                    res.send({state:false,message:"Inncorrect Password , Try Again!"});
                }
            });
         }
     });
});


//=========  PROFILE ROUTE  =========
//this route can be access by a autenticated user
router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json({
            user:req.user
        });
    }
);

//exporting the router to be able to use it in the app.js or any other file
module.exports= router;