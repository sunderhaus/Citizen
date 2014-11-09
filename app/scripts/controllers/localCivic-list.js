angular.module('CitizenApp')
	.controller('LocalCivicCtrl', function ($scope, LocalCivicData) {
		
		$scope.contactList = [];
		$scope.city = 'Nashville';
		$scope.state = 'TN';
		$scope.zip = '';
			
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
									'email':cInfo.emails,
									'url':cInfo.urls
								});//end pData
								
							});//end foreach(index)
							
						}//end if location match
					});//end foreachOffice
				}//end if(error)
			})
		
		
	});