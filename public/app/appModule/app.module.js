
angular.module('todosAppModule', ['ngRoute', 'ngCookies', 'authModule', 'stocksModule'])
  .config(function($routeProvider){

    $routeProvider.when('/',{
      // template:"<todo-list-component></todo-list-component>"
      template:"<login-component></login-component>"
    })
    .when('/home', {
      template:"<todo-list-component></todo-list-component>"
    })
    .otherwise({
      template:"<not-found></not-found>"
    })





  });//closes config
