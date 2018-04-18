angular.module('authModule', ['ngCookies', 'ngRoute'])
  .config(function($routeProvider){

    $routeProvider.when('/login', {
      template:'<login-component></login-component>'
    })
    .otherwise({
      template:'<h1>404 Not Found</h1>'
    })

  });//closes config
