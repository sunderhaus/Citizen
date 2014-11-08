angular.module('CitizenApp', ['ngRoute'])
.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: '/templates/home.html'
    })
    .when('/feed', {
      templateUrl: '/templates/feed.html'
    })
    .when('/reps', {
      templateUrl: '/templates/reps.html'
    })
    .when('/links', {
      templateUrl: '/templates/links.html'
    })
    .when('/about', {
      templateUrl: '/templates/about.html'
    })  
    .when('/officialsList', {
        templateUrl: '/templates/officialsList.html',
        controller: 'OfficialsListCtrl'
     })
    .otherwise({
    	templateUrl: '/templates/error.html'
    })
   
  }]);
