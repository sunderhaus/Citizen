angular.module('CitizenApp')
	.controller('OfficialsDetailCtrl', function ($scope, $http, $location, $routeParams, $cookieStore, GoogleCivicRepresentatives) {
		
		$scope.error = 'Loading Data...';
		$scope.officials = [];
		
		//get address information from cookie
		var userLocation = $cookieStore.get('storedUserLocation');
		
		if(userLocation.userAddress)
			$scope.address = userLocation.street_number + " " + userLocation.route;
		if(userLocation.locality)
			$scope.city = userLocation.locality;
		if(userLocation.administrative_area_level_1)
			$scope.state = userLocation.administrative_area_level_1;
		if(userLocation.postal_code)
			$scope.zip = userLocation.postal_code;
		
		if($routeParams.repName)
			$scope.repName = $routeParams.repName.toLowerCase().replace(/[\W_]+/g,"").trim();
		
		if($scope.repName && $scope.repName!="") {
			GoogleCivicRepresentatives.getReps($scope.address,$scope.city,$scope.state,$scope.zip)
				.then(function(data) {
					var repName = $scope.repName;
					var filterSet = [];
					var done = false;
					angular.forEach( data, function (info, key) {
						if(!done && !repName || repName=='' || (repName!="" && repName===(info.name.trim().toLowerCase().replace(/[\W_]+/g,"")+info.office.trim().toLowerCase().replace(/[\W_]+/g,"")) )) {
							filterSet = info;
							done = true;
						}
					});
					
					if(filterSet.name) {
						$scope.error = '';
						$scope.officialDetail = filterSet;
					}
					else
						$scope.error = 'Cannot retrieve contact information';
				});
		}//endif()
		else
			$scope.error = 'Cannot retrieve contact information';
		
	
	});//end OfficialsListCtrl
