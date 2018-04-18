
angular.module('authModule')
  .component('registerComponent', {
    templateUrl:'app/authModule/register/register.component.html',
    controller: function(authService, $location){

      var vm = this;

      vm.register = function(user){
          authService.register(user).then(function(response){
            if(response.data !== undefined) $location.path('/home');
          });
      }


    },
    controllerAs:'vm'
  })
