angular.module('CitizenApp')
.controller('HomeCtrl', function ($scope, $cookieStore, Geolocator) {

	$scope.started = false;

	$scope.startClick = function() {
		$scope.started = true;
		$scope.lfcClass = "location-form-container-expanded";

		$scope.askForLocationAndAct();
	};

	$scope.setUserLocationFromCookie = function() {
		var userLocation = $cookieStore.get('storedUserLocation');
		$scope.userAddress = userLocation.street_number + " " + userLocation.route;
		$scope.userCity = userLocation.locality;
		$scope.userState = userLocation.administrative_area_level_1;
		$scope.userZip = userLocation.postal_code;
	};

	$scope.askForLocationAndAct = function() {
		$scope.userLocation = $cookieStore.get('storedUserLocation');
		// console.log("Retrieving the user locationdata.");
		// console.log(userLocation);
		if (!$scope.userLocation) {
			Geolocator.getBrowserGeolocation()
			.then(function(data) {
				$scope.userLocation = data;
				$cookieStore.put('storedUserLocation', data);
				$scope.setUserLocationFromCookie();
			}), function (reason) {
				$scope.userLocation = null;
			};
		} else {
			$scope.setUserLocationFromCookie();
		}
	};
});//end HomeCtrl
