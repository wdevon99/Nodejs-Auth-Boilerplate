var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

//defining the 'user' schema
const userSchema= new Schema({
    username:{type:String ,required :true},
    name:{type:String ,required :true},
    email:{type:String ,required :true},
    password:{type:String ,required :true}
});

//exporting the sceme model to be able to use it in other files
const User = module.exports=mongoose.model("User" , userSchema);

//this method will incrypt the password and save the user to the database
module.exports.saveUser=function(newUser ,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            //updating the user password to the hash value
            newUser.password=hash;
            //checking for error
            if(err) throw err;
            //save to database
            newUser.save(callback);
 
        });
    });
    
}

//this method will execute a query to find if a match email is in the database
module.exports.findByEmail =function(email,callback){
    //this query is to check if the current email matches any one og the emails in the db
    const query={email:email};
    //executing the query and aslo passing in the callback
    User.findOne(query,callback);    
}

//this method will check if the password provided by the user matches the hashed password in the database
module.exports.passwordCheck = function(plainPassword,hashPassword,callback){
    bcrypt.compare(plainPassword,hashPassword,function(err,res){
        if(err) throw err;
        //passing the result (TRUE ot FALSE) to the callback function
        callback(null,res)    
    })
}

//this method will 
module.exports.findeUserById = function( idQuery, callback){
    //executing the query with the Ids  and also passing in the callback
    User.findOne(idQuery,callback); 
}
