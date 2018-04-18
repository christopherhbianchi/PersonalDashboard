angular.module('todosAppModule')
  .factory('todoListService', function($http, $filter, $cookies){ //factory method builds services

    var service = {};
    var baseUrl = 'api/todos'; //may need "/api..." later

    var todoList = []; //temp array of todosAppModule
    service.index = function(user){
      var username = user.username; //username will be the unique identifier to load a set of todos as written in controller

      return $http({ //route to our apiController
        method:'GET',
        url:baseUrl + '/' + username
      });//this returns a promise
    }//closes index

    //would want to pass user through typically, but we are routing to our controller
    //right now
    service.show = function(todo){
      var todoId = todo._Id;

      return $http({
        method:'GET',
        url:`api/todo/${todoId}`
      });// returns a promise
    }//closes show


    service.update = function(todo){
      return $http({
        method:'PUT',
        url:baseUrl + '/' + todo._id,
        headers:{
          'Content-type':'application/json'
        },
        data:todo
      });//returns promise
    }

    service.destroy = function(todo){
      return $http({
        method:'DELETE',
        url:baseUrl + '/' + todo._id
      });//returns promise
    }//closes destroy

    service.create = function(todo){
      todo.username = $cookies.get('username');
      return $http({
        method:'POST',
        url:baseUrl,
        headers:{
          'Content-type':'application/json'
        },
        data:todo
      });//returns promise
    }//closes create


    return service; //always return the service

  });//closes factory
