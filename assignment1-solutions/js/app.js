(function() {
  'use strict';

  angular.module('LunchCheckerApp', [])
  .controller('LunchCheckerCtrl', LunchCheckerCtrl);

  LunchCheckerCtrl.$inject = ['$scope'];
  function LunchCheckerCtrl($scope) {
    $scope.menu = "";
    $scope.result = "";
    $scope.advance = false;


    $scope.check = function () {
      var curMenu = $scope.menu.trim();

      if (curMenu.length == 0) {
        $scope.result = "Please enter data first";
        return;
      }

      var curMenuSplit = curMenu.split(",");

      console.log(curMenuSplit);

      var count = 0;
      if ($scope.advance) {
        for (var i = 0; i < curMenuSplit.length; i = i + 1) {
          if (curMenuSplit[i].trim().length > 0)
            count = count + 1;
        }
      } else {
        count = curMenuSplit.length;
      }
      console.log(count);
      if (count <= 3) {
        $scope.result = "Enjoy!";
      } else {
        $scope.result = "Too much!";
      }
    };

    $scope.feedYaakov = function () {
      $scope.stateOfBeing = "fed";
    };
  }
})();
