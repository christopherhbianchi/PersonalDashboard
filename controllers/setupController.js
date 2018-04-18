var Todos = require('../models/todoModel.js'); //returns us the mongoose model object
var Users = require('../models/userModel.js');
/*
I believe we only want to run this a single time so that we can
seed the database... so in app development, once we have done this once
before loading in our front end, we can go ahead and remove the connections
to this in the app.js file.
*/

module.exports = function(app){

  app.get('/api/setupTodos', function(request, response){

    var starterTodos = [
      {
        username:'cbianchi',
        description:'Go to gym.',
        isDone:false,
        hasAttachment:false
      },
      {
        username:'cbianchi',
        description:'Watch Real Madrid soccer game.',
        isDone:true,
        hasAttachment:false
      },
      {
        username:'cbianchi',
        description:'Create Node application.',
        isDone:false,
        hasAttachment:false
      }
    ];//closes starterTodos array
    Todos.create(starterTodos, function(err, results){
      response.send(results);
    });//closes create
  });//closes get

  app.get('/api/setupUsers', function(request, response){
    var starterUsers = [
      {
        username:'cbianchi',
        firstname:'Christopher',
        lastname:'Bianchi',
        email:'cbianchi@gmail.com',
        password:'pass1',
        passwordConf:'pass1'
      },
      {
        username:'ljames',
        firstname:'LeBron',
        lastname:'James',
        email:'ljames@gmail.com',
        password:'pass2',
        passwordConf:'pass2'
      },
      {
        username:'kirving',
        firstname:'Kyrie',
        lastname:'Irving',
        email:'kirving@gmail.com',
        password:'pass3',
        passwordConf:'pass3'
      }
    ];//closes array

    Users.create(starterUsers, function(err, results){
      response.send(results);
    });//closes create

  });//closes get

}//closes exports object
