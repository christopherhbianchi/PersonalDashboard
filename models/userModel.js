var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  username:{
    type:String,
    unique:true,
    require:true,
    trim:true
  },
  firstname:{
    type:String,
    require:true
  },
  lastname:{
    type:String,
    require:true
  },
  email:{
    type:String,
    unique:true,
    require:true,
    trim: true
  },
  password:{
    type:String,
    require: true
  },
  passwordConf:{
    type:String,
    require: true
  }
});//closes Schema

/* Let's add all the encryption work after we create the object in db
todoSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user)
})
*/

var user = mongoose.model('User', userSchema);
module.exports = user;
