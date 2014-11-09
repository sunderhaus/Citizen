angular.module('CitizenApp', ['ngRoute', 'ngCookies', 'infiniteScroll'])
.config([
  '$routeProvider', function($routeProvider, $rootScope) {
    $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/feed', {
      //templateUrl: '/templates/feed.html',
      templateUrl: '/templates/rep-detail.html',
      //controller: 'FeedController'
      controller: 'OfficialsDetailCtrl'
    })
    .when('/reps', {
      templateUrl: '/templates/reps.html',
      controller: 'OfficialsListCtrl'
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
     .when('/officialsDetail', {
        templateUrl: '/templates/officialsDetail.html',
        controller: 'OfficialsDetailCtrl'
     })
     .when('/localCivicList', {
        templateUrl: '/templates/localCivicList.html',
        controller: 'LocalCivicCtrl'
     })
    .otherwise({
    	templateUrl: '/templates/error.html'
    });
  }]);
