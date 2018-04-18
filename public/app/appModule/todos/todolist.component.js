
angular.module('todosAppModule')
  .component('todoListComponent',{

    templateUrl:'app/appModule/todos/todolist.component.html',
    controller: function(todoListService, $filter, $cookies){

      var vm = this;
      //local list of todos that can be available at any time to the view
      //this will be loaded up thanks to our service which interacts with
      //the server layer
      vm.todoList = [ ];
      vm.editTodo = null;
      vm.urgencyLevel = null; //For method that allows us to change color of the number of items
      vm.remaining = 0; //So we can display in the html how many tasks are left

      //by the time we're here, a user is already in session
      var user = {
        username:$cookies.get('username')
      }
      vm.user = user; //appending it to the vm object

      function reload(){
        todoListService.index(user).then(function(response){
          vm.todoList = response.data; //grab the list of objects and append to the local todoList

          vm.remaining = 0;
          vm.todoList.forEach(function(element){
            if(!element.isDone) vm.remaining++;
          });
          //urgency level can be updated each time we reload our list of todos
          if(vm.remaining >= 7) vm.urgencyLevel = 'high';
          else if(vm.remaining < 7 && vm.remaining >= 4) vm.urgencyLevel = 'medium';
          else vm.urgencyLevel = 'low';
        });
      }

      reload(); //immediately invoke it so view can have the data

      vm.setEditTodo = function(todo){
        vm.editTodo = todo;
        console.log(todo._id); //so these JS objects do have this property when loaded to client

      }
      vm.updateTodo = function(todo){//all work will be done on editTodo obj
        // todo._id = vm.editTodo._id; --> don't need all todo's have this unique id attached to them regardless
        todoListService.update(todo).then(function(response){
          reload();
          vm.editTodo = null;
        });
      }

      vm.cancelEditTodo = function(){
        vm.editTodo = null;
      }

      vm.destroyTodo = function(todo){
        todoListService.destroy(todo).then(function(response){
          reload();
        });//closes .then
      }//closes destroy

      vm.createTodo = function(todo){
        todoListService.create(todo).then(function(response){
          reload();
        });//closes .then
      }//closes createTodo




    },
    controllerAs:"vm"


});//closes .component
