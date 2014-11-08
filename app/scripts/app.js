angular.module('CitizenApp', ['ngRoute'])
.config([
  // '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  '$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: '/templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/officialsList', {
      templateUrl: '/templates/officialsList.html',
      controller: 'OfficialsListCtrl'
    })
    .otherwise({
    	templateUrl: '/templates/error.html'
    });

    // $locationProvider.html5Mode(true);
  }
  ]);
