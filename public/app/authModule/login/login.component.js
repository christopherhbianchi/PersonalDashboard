angular.module('authModule')
  .component('loginComponent', {

    templateUrl:'app/authModule/login/login.component.html',
    controller: function(authService, $filter, $location, $http, $routeParams, $cookies){

      var vm = this;

      vm.login = function(user){
        console.log("before get token");
        authService.getToken();//service grabs out of cookies (should be empty if nobody is logged in)
        console.log("after get token");
        authService.login(user)//this user passed in ONLY has email and password from login form
          .then(function(response){
            console.log("in .then");
            if(response.data !== undefined) $location.path('/home'); //not to a page with username in url. That's not common practice

            console.log("after location.path");
          })
          .catch(function(error){
            console.log(error);
          });
      }//closes login method

    },
    controllerAs:'vm'




  });//closes configure
