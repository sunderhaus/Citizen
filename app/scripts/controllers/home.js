angular.module('CitizenApp')
.controller('HomeCtrl', function ($scope, $cookieStore, Geolocator) {

	$scope.startDone = false;

	$scope.startClick = function() {
		$scope.spin = true;
		$scope.askForLocationAndAct();
	};//end startClick

	$scope.clearAll = function() {
		$scope.userAddress = null;
		$scope.userCity = null;
		$scope.userState = null;
		$scope.userZip = null;
		$cookieStore.remove('storedUserLocation');
	}

	$scope.setUserLocationFromCookie = function() {
		var userLocation = $cookieStore.get('storedUserLocation');
		$scope.userAddress = userLocation.street_number + " " + userLocation.route;
		$scope.userCity = userLocation.locality;
		$scope.userState = userLocation.administrative_area_level_1;
		$scope.userZip = userLocation.postal_code;
	};//end setUserLocationFromCookie

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
				$scope.spin = false;
				$scope.browserLookupFailed = false;
				$scope.startDone = true;
				$scope.lfcClass = "location-form-container-expanded";
			}, function (reason) {
				console.log("HEY");
				$scope.userLocation = null;
				$scope.spin = false;
				$scope.browserLookupFailed = true;
				$scope.startDone = true;
				$scope.lfcClass = "location-form-container-expanded";
			});
		} else {
			$scope.setUserLocationFromCookie();
			$scope.spin = false;
			$scope.startDone = true;
			$scope.lfcClass = "location-form-container-expanded";
		}
	};
});//end HomeCtrl
