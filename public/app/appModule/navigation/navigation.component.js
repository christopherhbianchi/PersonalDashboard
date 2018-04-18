angular.module('todosAppModule')
  .component('navigation', {

    templateUrl:'app/appModule/navigation/navigation.component.html',
    controller: function($cookies){
      var vm = this;
      vm.greeting = $cookies.get('firstname') + " " + $cookies.get('lastname');

    },
    controllerAs:'vm'
  });//closes component
