angular.module('CitizenApp')
	.controller('OfficialsListCtrl', function ($scope, $http, $location, CookieJar, GoogleCivicRepresentatives) {

		$scope.error = 'Loading Data...';
		$scope.localOfficials = [];
		$scope.stateOfficials = [];
		$scope.nationalOfficials = [];

		//get address information from cookie
		var userLocation = CookieJar.getUserLocation();
		// console.log(userLocation);

		if(userLocation){
			if(userLocation.address)
				$scope.address = userLocation.address
			if(userLocation.city)
				$scope.city = userLocation.city;
			if(userLocation.state)
				$scope.state = userLocation.state;
			if(userLocation.postal_code)
				$scope.zip = userLocation.zip;

			/*
			$scope.address = '';
			$scope.city = 'Nashville';
			$scope.state = 'TN';
			*/

			GoogleCivicRepresentatives.getReps($scope.address,$scope.city,$scope.state,$scope.zip)
				.then(function(data) {
					//let's split this data up into four buckets
					//city, state, national
					if(!data.error) {
						$scope.error = '';
						// console.log("data");
						// console.log(data);
						angular.forEach(data, function(info, key) {
							// console.log(info.level);
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
					else if(data.error) {
						$scope.error = data.error;
					}
					else {
						$scope.error = 'Cannot retrieve civic information list.';
					}
				});
			} else {
				$scope.error = 'Cannot retrieve civic information list.';
			}


	});//end OfficialsListCtrl
