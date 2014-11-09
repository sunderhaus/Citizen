angular.module('CitizenApp')
	.controller('LocalCivicCtrl', function ($scope, $rootScope, CookieJar, LocalCivicData) {

		$scope.error = 'Loading Data ...';
		$scope.contactList = [];
		
		$scope.address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zip = '';
		
		//get address information from cookie
		var userLocation = CookieJar.getUserLocation();
		if(userLocation) {
			if(userLocation.address)
				$scope.address = userLocation.address
			if(userLocation.city)
				$scope.city = userLocation.city;
			if(userLocation.state)
				$scope.state = userLocation.state;
			if(userLocation.postal_code)
				$scope.zip = userLocation.zip;
		}
		
		//we will see if we already have the data, and if so, use it
		var getNewData = false;
		if($rootScope.currentLocalCivicData) {
			processData($rootScope.currentLocalCivicData);
		}//endif()
		else
			getNewData = true;
		
		//if we need to get data, get it
		if(getNewData) {
			LocalCivicData.getInfo($scope.address,$scope.city,$scope.state,$scope.zip)
				.then(function(data) {
					processData(data);
				})
		}//end getNewData

			
		function processData(data) {
			if(data && !data.error && data.length>0) {
				//loop over each result to format like we want
				angular.forEach(data, function(info,key) {
					if($scope.zip!="" && $scope.zip.trim().toLowerCase()===info.zip.trim().toLowerCase() ||
						($scope.city!="" && $scope.city.trim().toLowerCase()===info.city.trim().toLowerCase() && 
							$scope.state!="" && $scope.state.trim().toLowerCase()===info.state.trim().toLowerCase())
									) {
						
						//we have a match, let's get this info
						angular.forEach(info.contacts, function(cInfo,ok) {
							//setup the base data
							$scope.contactList.push ( {
								'title':cInfo.title,
								'address':cInfo.address,
								'address2':cInfo.address2,
								'city':cInfo.city,
								'state':cInfo.state,
								'zip':cInfo.zip,
								'phone':cInfo.phone,
								'fax':cInfo.phone,
								'email':cInfo.email,
								'url':cInfo.url,
								'comments':cInfo.comments
							});//end pData
							
						});//end foreach(index)
						
					}//end if location match
				});//end foreachOffice
				
				if($scope.contactList.length>0)
					$scope.error = '';
				else
					$scope.error = 'Cannot retrieve local civic contacts for your location.';
			}//end if(error)
			else
				$scope.error = 'Cannot retrieve local civic contacts for your location.';
		}	
});

