angular.module('CitizenApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
        	 $routeProvider
        	 	.when('/officialsList', {
        	 		templateUrl: '/templates/officialsList.html',
        	 		controller: 'OfficialsListCtrl'
        	 	})
        	 	.otherwise(
        	 		{
        	 			templateUrl: '/templates/error.html'
        	 		});
         }
         ]);