angular.module('CitizenApp', ['ngRoute'])

.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: '/templates/home.html'
    })
    .when('/officialsList', {
      templateUrl: '/templates/officialsList.html',
      controller: 'OfficialsListCtrl'
    })
    .otherwise({
      redirectTo:'/home'
    });
  }
  ]);
