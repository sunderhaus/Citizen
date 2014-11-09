angular.module('CitizenApp')
	.controller('OfficialsListCtrl', function ($scope, $http, $location, GoogleCivicRepresentatives) {
		
		$scope.officials = [];
		
		GoogleCivicRepresentatives.getReps(null,'Nashville','TN',null)
			.then(function(data) {
				$scope.officials = data;
			});
		
	
	});//end OfficialsListCtrl
