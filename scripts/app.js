angular.module('CitizenApp', ['ngRoute', 'ngCookies', 'infiniteScroll'])
.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/feed', {
      templateUrl: '/templates/feed.html',
      //controller: 'FeedController'
    })
    .when('/reps', {
      templateUrl: '/templates/reps.html',
      controller: 'OfficialsListCtrl'
    })
    .when('/rep-detail', {
      templateUrl: '/templates/rep-detail.html',
      controller: 'OfficialsDetailCtrl'
    })
    .when('/links', {
      templateUrl: '/templates/links.html',
      controller: 'LocalCivicCtrl'
    })
    .when('/about', {
      templateUrl: '/templates/about.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);
