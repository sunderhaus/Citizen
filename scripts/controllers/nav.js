angular.module('CitizenApp')
.controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});//EndNavBarController
