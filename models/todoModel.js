var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = Schema({
  username:{
    type:String,
    unique:false,
    require:true,
    trim:true
  },
  description:{
    type:String,
    require:true
  },
  isDone:{
    type:Boolean,
    require:true
  },
  hasAttachment:{
    type:Boolean, //Boolean in caps in mongodb
    require:true
  }
});

var Todos = mongoose.model('Todo', todoSchema);

module.exports = Todos;
