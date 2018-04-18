var Todos = require('../models/todoModel.js');
var bodyParser = require('body-parser');

module.exports = function(app){

  app.use(bodyParser.json()); //telling it to use this bodyParser middleware
  app.use(bodyParser.urlencoded({
    extended: true
  }));


  //this is the RESTful naming convention for a controller "show" method
  //this is like a controller method.
  //get todos by username --> may go in a user controller next time
  app.get('/api/todos/:uname', function(request, response){

    //equivalent of calling a DAO method that would handle the DB interaction
    Todos.find({ username:request.params.uname },function(err, todos){ //todos is "result"
      if(err) throw err;
      console.log(todos);
      response.send(todos);
    }); //closes find method
  });//closes showUserById

//GET
  app.get('/api/todo/:id', function(request, response){
    Todos.findById({ _id:request.params.id }, function(err, todo){
      if(err) throw err;
      console.log(todo);
      response.send(todo);
    });//closes find
  });//closes showTodoById

//CREATE
  //we want to create a todo for a specific user... need to see how to get that
  //data before it's passed in. Most likely from a cookie. Return later
  app.post('/api/todos', function(request, response){

    var newTodo = Todos({
      username:request.body.username, //will grab this from somewhere later (like session or a cookie)
      description: request.body.description,
      isDone: false, //will always be false when first created
      hasAttachment: request.body.hasAttachment
    });
    newTodo.save(newTodo, function(err){
      if(err) throw err;
      response.send('Success');
    }); //closes save
  });//closes post


//UPDATE
  app.put('/api/todos/:id', function(request, response){
    //feel like object creation should be handled in angular and then passed in here.
    //Arg. 1: id
    //Arg. 2: update
    //Arg. 3: callback
    Todos.findByIdAndUpdate(request.params.id,{ //could be params id next time
      description: request.body.description,
      isDone:request.body.isDone,
      hasAttachment:request.body.hasAttachment
    },
    function(err){
      if(err) throw err;
      response.send('Success');
    });//closes findByIdAndUpdate
  });//closes put

//DESTROY
  //can say request.params.id, but need to get to this later
  app.delete('/api/todos/:id', function(request, response){
    Todos.findByIdAndRemove(request.params.id, function(err){
      if(err) throw err;
      response.send('True');
    });//closes findByIdAndRemove
  });//closes delete




}//closes exports function
