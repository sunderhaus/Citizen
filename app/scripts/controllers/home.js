angular.module('CitizenApp')
.controller('HomeCtrl', function ($scope, $cookieStore, Geolocator) {

	$scope.started = false;

	$scope.startClick = function() {
		$scope.started = true;
	};

	$scope.userLocation = $cookieStore.get('storedUserLocation');
	// console.log("Retrieving the user locationdata.");
	// console.log(userLocation);
	if (!$scope.userLocation) {
		Geolocator.getBrowserGeolocation()
		.then(function(data) {
			$scope.userLocation = data;
			$cookieStore.put('storedUserLocation', data);
			// console.log("Storing the user locationdata.");
			// console.log(data);
		}), function (reason) {
			$scope.userLocation = null;
		};
	}
});//end HomeCtrl
