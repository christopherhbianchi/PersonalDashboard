angular.module('authModule')
  .component('logoutComponent', {
    templateUrl:'./logout.component.html',
    controller: function(authService){

      vm.logout = function(){
        authService.removeToken();
      }
    },
    controllerAs:'vm'
  })
