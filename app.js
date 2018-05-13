//loading express module
const express= require('express');
//initializing express
const app= express();

// ========================= USER AUTHENTICATION ================================
const passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// ========================= BODY PARSER ==================================
//loading the body parser module
const bodyparser= require('body-parser');
//making the request body in the JSON format
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// ========================= MONGO DB ==================================

const config= require('./config/database');
//loading mongoose1 module
const mongoose = require('mongoose');
//creating the db connection
const connection =mongoose.connect(config.database);

//checking if connection is successful
if(connection){
    console.log("Db Connection Successful!");
}else{
    console.log("Db Connection Failed!");
}

// ========================= PATH ==================================

//loading files system module
const path= require('path');
//defining the path to the static html files
app.use(express.static(path.join(__dirname,"public")));

// ======================= ROUTE HANDLING ===========================
//getting the user route
const userRoute=  require('./routes/users');
app.use('/user',userRoute);
app.use('/user/register',userRoute);

//defining a route for TESTING
app.get('/',(req,res)=>{
    res.send("NOTE : This will be replaced by the static html in the public folder");
});

// =========================== PORT ===============================

//defining the PORT and making the server listen to that port
const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Listening to port " + PORT);
    
});

