angular.module('authModule')
  .factory('authService', function($http, $cookies){

    var service = {};
    var admin = false;

    var saveToken = function(user){
      $cookies.put('email', user.email);
      $cookies.put('username', user.username);
      $cookies.put('firstname', user.firstname);
      $cookies.put('lastname', user.lastname);
      console.log($cookies.get('email'));
      console.log($cookies.get('username'));
    }

    service.getToken = function(){
      var user = {
        'email':$cookies.get('email'),
        'username':$cookies.get('username'), //we do not want a "password" in session
        'firstname':$cookies.get('firstname'),
        'lastname':$cookies.get('lastname')
      }
      return user;
    }

    service.login = function(user){
      console.log("inside login function");
      return $http({
        method:'POST',
        url:'/auth/login',
        headers:{
          'Content-type':'application/json'
        },
        data:user //we're passing a user object through that only has an email and password. We can grab those in the controller, and use it to authenticate
      }).then(function(response){
        saveToken(response.data); //at this point we have a user object (with full properties) to pass into saveToken
        return response;
      });

    }//closes login

    var removeToken = function(){
      $cookies.remove('email');
      $cookies.remove('username');
      $cookies.remove('firstname');
      $cookies.remove('lastname');
    }

    service.register = function(user){
      return $http({
        method:'POST',
        url:'/auth/register',
        headers:{
          'Content-type':'application/json'
        },
        data:user
      }).then(function(response){
        if(response){//if actual user returned back from controller, we know it was a legit user. If undefined, we do nothing out here
          saveToken(response.data);
          return response;
        }
      });//returns a promise, and when it's done, stores the user's data in session
    }


    return service;

  });//closes factory
