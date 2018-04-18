angular.module('stocksModule')
  .component('stocksComponent', {

    templateUrl:'app/stocksModule/stocks/stocks.component.html',
    controller: function(stocksService){

      var vm = this;
      vm.company = {};


      function loadStocks(){
        stocksService.showApple().then(function(response){
          //response.data should be a single object
          console.log("Only response" + response);
          console.log("Only response.data" + response.data);
          vm.company = response.data;
          console.log('in callback: ' + vm.company.symbol);

        });//closes showApple
      }//closes loadStocks

      //immediately invoke so we can have the data for our vm.company, and our page
      loadStocks();
      //undefined because this keeps running while other code runs asynchronously
      console.log("out of callback" + vm.company.symbol);


//right now the page is loading before we can get the stock data even




    },
    controllerAs:'vm'




  });//closes component
