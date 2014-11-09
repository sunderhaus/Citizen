angular.module('CitizenApp', ['ngRoute', 'ngCookies', 'infiniteScroll'])
.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/feed', {
      //templateUrl: '/templates/feed.html',
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
     .when('/getTwitterFeed', {
        templateUrl: '/templates/twitterFeed.html',
        controller: 'getTwitterFeed'
     })
    .otherwise({
    	redirectTo: '/'
    });
  }]);
