var Users = require('../models/userModel.js');
var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');
const saltRounds = 10; //for bcrypt methods


module.exports = function(app){

  app.post('/auth/login', function(request, response){
    console.log("authController post method. Before findOne");
    Users.findOne({ 'email':request.body.email }, function(err, user){

      /*
      we will now use bcrypt's compare function to see if
      this hashed plain text String matches the one in the database
      -> if it's in the DB it should already be hashed

      1st: get the hash (hashed password) from the database
      2nd: compare method(plain text, hash)

      The user we retrieve with the email string will have the password appended automatically.
      */
      console.log('Hello ' + user);
      if(err) throw err;
      console.log(user);

      bcrypt.compare(request.body.password, user.password, function(err, res){
        if(res) response.send(user); //if the password matches the one in db, we will return this user
      }); //use bcrypts compare and not JS's

    });//closes findOne

  });//closes post

  app.post('/auth/register', function(request, response){

    /*
    so we have a user object being passed through
    need to create a user object, make sure pass and passConf match,
    if so then take it's password, salt and hash it, and then append
    it back to the user, then store the user in the db
    */
    var pword = request.body.password;

    if(pword !== request.body.passwordConf) return "Passwords do not match";
    bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(pword, salt, function(err, hash){
        if(err) throw err;

      /*
      this is asynchronus code. So what was happening is that if we tried
      to update the pword var in here, it was getting updated...
      but not faster than the rest of the synchronus code that kept running
      that came after it...
      so the new user would be created and saved and THEN the new value of "pword"
      would be reflected. But again, not in time for saving.

      So since the rest of new user creation depended on this, we put the newUser
      creation within the callback
      */
        var newUser = Users({
          username:request.body.username,
          firstname:request.body.firstname,
          lastname:request.body.lastname,
          email:request.body.email,
          password:hash,
          passwordConf:hash
        });
        newUser.save(newUser, function(err){
          if(err) throw err; //let it return an error, and we'll catch it later.
          response.send(newUser); //send the newUser back
        });//closes save

      });//closes hash
    });//closes genSalt

  });//closes post





}//closes exports
