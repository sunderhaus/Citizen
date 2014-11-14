angular.module('CitizenApp')
	.controller('OfficialsListCtrl', function ($scope, $http, $location, $rootScope, CookieJar, GoogleCivicRepresentatives) {

		$scope.error = 'Loading Data...';
		$scope.localOfficials = [];
		$scope.stateOfficials = [];
		$scope.nationalOfficials = [];
		
		var address;
		var city;
		var state;
		var zip;
		
		//get address information from cookie
		var userLocation = CookieJar.getUserLocation();
		if(userLocation) {
			if(userLocation.address)
				address = userLocation.address;
                        else
                                address = "";
			if(userLocation.city)
				city = userLocation.city;
                        else
                                city = "";
			if(userLocation.state)
				state = userLocation.state;
                        else
                                state = "";
			if(userLocation.postal_code)
				zip = userLocation.zip;
                        else
                                zip = "";
	
			var currentLocationAddress = (address + city + state + zip).trim().toLowerCase().replace(/[\W_]+/g,"");
			
			//we will see if we already have the data, and if so, use it
			var getNewData = false;
			if($rootScope.currentCivicData && $rootScope.currentCivicDataBaseAddress==currentLocationAddress) {
				//we need to make sure that our current data is the appropriate
				//data set for our current location
				data = $rootScope.currentCivicData;
				processData($rootScope.currentCivicData);
			}
			else
				getNewData = true;
			
			//if we need to get data, get it
			if(getNewData) {
					GoogleCivicRepresentatives.getReps(address,city,state,zip)
					.then(function(data) {
						processData(data);
					});
			}//end getNewData
		}//end if(location
		else {
			$scope.error = 'Cannot get your current location.';
			$location.path( '/');
		}
		
		//function to format the information from google for our page
		function processData(data) {
			//let's split this data up into four buckets
			//city, state, national
			if(data && !data.error && data.length>0) {
				$scope.error = '';
				// console.log("data");
				// console.log(data);
				angular.forEach(data, function(info, key) {
					// console.log(info.level);
					switch(info.level) {
						case "country":
							info.sort = 99;
							if(info.office.trim().toLowerCase()=='united states senate')
								info.sort = 0;
							if(info.office.trim().toLowerCase().match(/united states house.*/))
								info.sort = 1;
							else if(info.office.trim().toLowerCase()=='president')
								info.sort = 2;
							else if(info.office.trim().toLowerCase()=='vice president')
								info.sort = 3;
							$scope.nationalOfficials.push(info);
							break;
						case "administrativeArea1":
							$scope.stateOfficials.push(info);
							break;
						default:
							info.sort = 99;
							if(info.office.trim().toLowerCase()=='metro mayor' || info.office.trim().toLowerCase()=='mayor')
								info.sort = 0;
							else if(info.office.trim().toLowerCase()=='vice mayor')
								info.sort = 1;
							else if(info.office.trim().toLowerCase()=='sheriff')
								info.sort = 2;
							else if(info.office.trim().toLowerCase()=='police')
								info.sort = 3;
							$scope.localOfficials.push(info);
							break;
					}//end switch()
				});
			}
			else if(data.error) 
				$scope.error = data.error;
			else
				$scope.error = 'Cannot retrieve civic information list.';
			
		
		}


	});//end OfficialsListCtrl
