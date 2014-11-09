angular.module('CitizenApp', ['ngRoute', 'ngCookies'])
.config([
  '$routeProvider', function($routeProvider, $rootScope) {
    $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
      controller: 'HomeCtrl'
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
    });
  }]);
