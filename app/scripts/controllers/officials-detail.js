angular.module('CitizenApp')
	.controller('OfficialsDetailCtrl', function ($scope, $http, $location, $routeParams, CookieJar, GoogleCivicRepresentatives) {

		$scope.error = 'Loading Data...';
		$scope.officials = [];

		//get address information from cookie
		var userLocation = CookieJar.getUserLocation();

		if(userLocation.address)
			$scope.address = userLocation.address
		if(userLocation.city)
			$scope.city = userLocation.city;
		if(userLocation.state)
			$scope.state = userLocation.state;
		if(userLocation.postal_code)
			$scope.zip = userLocation.zip;

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
