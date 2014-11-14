angular.module('CitizenApp')
	.controller('OfficialsDetailCtrl', function ($scope, $http, $location, $routeParams, $rootScope, CookieJar, GoogleCivicRepresentatives) {

		$scope.error = 'Loading Data...';
		$scope.officials = [];

		var address;
		var city;
		var state;
		var zip;
		
		//get the rep name from the url
		if($routeParams.repName)
			$scope.repName = $routeParams.repName.toLowerCase().replace(/[\W_]+/g,"").trim();
		
		//get address information from cookie
		var userLocation = CookieJar.getUserLocation();
		if(userLocation) {
			if(userLocation.address)
				address = userLocation.address
			if(userLocation.city)
				city = userLocation.city;
			if(userLocation.state)
				state = userLocation.state;
			if(userLocation.postal_code)
				zip = userLocation.zip;
		}//end if()
		else {
			$scope.error = 'Cannot get your current location.';
			$location.path( '/');
		}
		
		if( ($scope.repName && $scope.repName!="") || $rootScope.lastOfficialDetailPage!="") {
			if(!$scope.repName || $scope.repName=="")
				$scope.repName = $rootScope.lastOfficialDetailPage;
			
			//we will see if we already have the data, and if so, use it
			var getNewData = false;
			if($rootScope.currentCivicData) {
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
			
			
		}//endif()
		else
			$scope.error = 'Cannot retrieve contact information';

		
		function processData(data) {
			if(data && !data.error && data.length>0) {
				var repName = $scope.repName;
				var filterSet = [];
				var done = false;
				angular.forEach( data, function (info, key) {
					if(!done && !repName || repName=='' || (repName!="" && repName===(info.name.trim().toLowerCase().replace(/[\W_]+/g,"")+info.office.trim().toLowerCase().replace(/[\W_]+/g,"")) )) {
						$rootScope.lastOfficialDetailPage = repName;
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
			}//endif
			else
				$scope.error = 'Cannot retrieve contact information';
		}

	});//end OfficialsListCtrl
