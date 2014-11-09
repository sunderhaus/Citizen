angular.module('CitizenApp')
	.controller('getTwitterFeed', function ($scope, $http, $location, $rootScope, CookieJar, TwitterConnect, GoogleCivicRepresentatives) {

		TwitterConnect.fetchTimeLine();
		
	});//end controller