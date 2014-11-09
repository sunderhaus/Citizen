angular.module('CitizenApp')
	.controller('OfficialsListCtrl', function ($scope, $http, $location, $cookieStore, GoogleCivicRepresentatives) {
		
		$scope.error = 'Loading Data...';
		$scope.localOfficials = [];
		$scope.stateOfficials = [];
		$scope.nationalOfficials = [];
		
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
		
		/*
		$scope.address = '';
		$scope.city = 'Nashville';
		$scope.state = 'TN';
		*/
		
		GoogleCivicRepresentatives.getReps($scope.address,$scope.city,$scope.state,$scope.zip)
			.then(function(data) {
				//let's split this data up into four buckets
				//city, state, national
				if(data) {
					$scope.error = '';
					angular.forEach(data, function(info, key) {
						console.log(info.level);
						switch(info.level) {
							case "country":
								info.sort = 99;
								if(info.office.toLowerCase()=='united states senate')
									info.sort = 0;
								else if(info.office.toLowerCase()=='president')
									info.sort = 2;
								else if(info.office.toLowerCase()=='vice president')
									info.sort = 3;
								$scope.nationalOfficials.push(info);
								break;
							case "administrativeArea1":
								$scope.stateOfficials.push(info);
								break;
							default:
								info.sort = 99;
								if(info.office.toLowerCase()=='metro mayor' || info.office.toLowerCase()=='mayor')
									info.sort = 0;
								else if(info.office.toLowerCase()=='vice mayor')
									info.sort = 1;
								else if(info.office.toLowerCase()=='sheriff')
									info.sort = 2;
								$scope.localOfficials.push(info);
								break;
						}//end switch()
					});
				}
				else if(data.error) 
					$scope.error = data.error;
				else
					$scope.error = 'Cannot retrieve civic information list.';
			});
		
	
	});//end OfficialsListCtrl
