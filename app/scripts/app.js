angular.module('CitizenApp', ['ngRoute', 'ngCookies', 'infiniteScroll'])
.config([
  '$routeProvider', function($routeProvider, $rootScope) {
    $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/feed', {
      templateUrl: '/templates/feed.html',
      controller: 'FeedController'
    })
    .when('/reps', {
      templateUrl: '/templates/reps.html'
    })
    .when('/rep-detail', {
      templateUrl: '/templates/rep-detail.html'
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
