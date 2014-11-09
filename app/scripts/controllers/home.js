angular.module('CitizenApp')
.controller('HomeCtrl', function ($rootScope, $scope, $cookieStore, $location, $route, Geolocator) {

	$scope.startDone = false;

	$scope.startClick = function() {
		$scope.spin = true;
		$scope.askForLocationAndAct();
	};//end startClick

$scope.submitClick = function() {
	$scope.setCookieFromForm();
	$location.path('/reps');
};//end startClick

	$scope.clearAll = function() {
		$scope.userAddress = null;
		$scope.userCity = null;
		$scope.userState = null;
		$scope.userZip = null;
		$cookieStore.remove('storedUserLocation');
	}//end clearAll

	$scope.setCookieFromForm = function() {
		var userLocation = {},
		    splitUserAddress,
				formStreetNumber,
				formRoute;
		splitUserAddress = $scope.userAddress.split(/([0-9]+\-?[0-9]+)/);
		formStreetNumber = splitUserAddress[1];
		if(splitUserAddress[2] != null) {
		  formRoute = splitUserAddress[2].trim();
		}
		userLocation.street_number = formStreetNumber;
		userLocation.route = formRoute;
		userLocation.locality = $scope.userCity;
		userLocation.administrative_area_level_1 = $scope.userState;
		userLocation.postal_code = $scope.userZip;
		$cookieStore.put('storedUserLocation', userLocation);
	}//end setCookieFromForm

	$scope.setUserLocationFromCookie = function() {
		var userLocation = $cookieStore.get('storedUserLocation');
		$scope.userAddress = "" + userLocation.street_number + " " + userLocation.route;
		$scope.userCity = userLocation.locality;
		$scope.userState = userLocation.administrative_area_level_1.short_name;
		$scope.userZip = userLocation.postal_code;
		$rootScope.userAddressLabel = $scope.userCity + ", " + $scope.userState;
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
				alert("Oops! It looks like you've denied us access to your location. Please fill out the form or re-enable location permission for our website in your browser settings and reload this page. Thanks!");
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
	};//end askForLocationAndAct
});//end HomeCtrl
