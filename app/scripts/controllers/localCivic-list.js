angular.module('CitizenApp')
	.controller('LocalCivicCtrl', function ($scope, $cookieStore, LocalCivicData) {
		
		$scope.error = 'Loading Data ...';
		$scope.contactList = [];
		
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
		
		
		LocalCivicData.getInfo($scope.city,$scope.state,$scope.zip)
			.then(function(data) {
				
				if(!data.error) {
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
					
				}//end if(error)
				else
					$scope.error = 'Cannot retrieve local civic contacts for your location.';
			})
});