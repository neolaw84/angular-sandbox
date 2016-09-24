(function () {
    'use strict';
    angular.module('ShoppingListApp', [])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyShoppingController.$inject = ['$scope', '$log', 'ShoppingListCheckOffService'];
    AlreadyBoughtShoppingController.$inject = ['$scope', '$log', 'ShoppingListCheckOffService'];
    ShoppingListCheckOffService.$inject = ['$log'];
    
    function ToBuyShoppingController($scope, $log, ShoppingListCheckOffService) {
        
        var vm = this;
        
        vm.isEmpty = ShoppingListCheckOffService.isToBuyListEmpty;    
        
        vm.toBuyList = ShoppingListCheckOffService.getToBuyList();
        
        vm.boughtClicked = function(index) {
            ShoppingListCheckOffService.bought(index);    
        }
    }
    
    function AlreadyBoughtShoppingController($scope, $log, ShoppingListCheckOffService) {
        
        var vm = this;
        
        vm.isEmpty = ShoppingListCheckOffService.isBoughtListEmpty;
        
        vm.BoughtList = ShoppingListCheckOffService.getBoughtList();
        
        console.log(vm.BoughtList);
    }
    
    function ShoppingListCheckOffService($log) {
        var vm = this;
        vm.toBuyList = [
            {
                name : "Main Board", 
                quantity : 10
            },
            {
                name : "CPU", 
                quantity : 5
            },
            {
                name : "Hard Disk Drive", 
                quantity : 8
            },
            {
                name : "GPU", 
                quantity : 10
            },
            {
                name : "Keyboard & Mouse", 
                quantity : 15
            }
        ];
        vm.boughtList = [];
        
        vm.bought = function(index) {
            var boughtItem = vm.toBuyList[index];
            vm.toBuyList.splice(index, 1);
            vm.boughtList.push(boughtItem);
            //console.log(vm.toBuyList);
            //console.log(vm.boughtList);
        }
        
        vm.getToBuyList = function() {
            return vm.toBuyList;
        }
        
        vm.isToBuyListEmpty = function() {
            return vm.toBuyList.length == 0;
        }
        
        vm.getBoughtList = function() {
            return vm.boughtList;
        }
        
        vm.isBoughtListEmpty = function() {
            return vm.boughtList.length == 0;
        }
    }
})();