(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .controller('FoundItemDirectiveController', FoundItemsDirectiveController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);
    
    function FoundItems() {
        var ddo = {
            templateUrl : 'directives/found-items.html',
            scope: {
                items: "<",
                onRemove: "&",
                itemsEmpty: "<"
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'dirCtrl',
            bindToController: true
        }
        
        return ddo;
    }
    
    function FoundItemsDirectiveController() {
        
    }
    
    NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
    function NarrowItDownController($scope, MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";
        ctrl.found = [];
        ctrl.itemsEmpty = false;
        ctrl.narrowItDownOnClick = function () {
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
            .then(function(results) {
                ctrl.found = results;
                ctrl.itemsEmpty = (ctrl.found.length == 0);
            })
        }
        ctrl.onRemove = function (index) {
            ctrl.found.splice(index, 1);
            ctrl.itemsEmpty = (ctrl.found.length == 0);
        }
    }
    
    MenuSearchService.$inject = ['$q', '$http'];
    function MenuSearchService ($q, $http) {
        var service = this;
        service.getMatchedMenuItems = function(searchTerm) {
            var deferred = $q.defer();
            if (searchTerm.length == 0) {
                deferred.resolve([]);
                return deferred.promise;
            }
            return $http({
                method : "GET",
                url : "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                var foundItems = [];
                var menu_items = result.data.menu_items;
                console.log(searchTerm);
                for (var i = 0; i < menu_items.length; i = i + 1) {
                    if (menu_items[i].description.toUpperCase()
                    .includes(searchTerm.toUpperCase()))
                        foundItems.push(menu_items[i]);
                }
                
                deferred.resolve(foundItems);
                return deferred.promise;
            }).catch(function (result) {
                console.log("http results : ", result );
                deferred.reject("Error with http : ", result);
                return deferred.promise;
            });
        }
    }
})();