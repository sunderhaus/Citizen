angular.module('CitizenApp')
.controller('HomeCtrl', function ($rootScope, $scope, $location, $route, Geolocator, CookieJar, Map) {

	$scope.startDone = false;
	$scope.formError = '';
	$scope.paper;
	$scope.default_viewbox;

	$scope.startClick = function() {
		$scope.spin = true;
		$scope.askForLocation(false);
	};//end startClick

	$scope.submitClick = function() {
		if($scope.userLocationIsValid($scope.userLocation)) {
			$scope.setCookieFromForm();
			$location.path('/reps');
		}
	};//end startClick

	$scope.clearAll = function() {
		$scope.userLocation = null;
		$rootScope.userAddressLabel = null;
		CookieJar.removeUserLocation();
	}//end clearAll

	$scope.refreshLocation = function() {
		$scope.spin = true;
		$scope.askForLocation(true);
	};//end startClick

	$scope.setCookieFromForm = function() {
		var userLocation = {},
		splitUserAddress,
		formStreetNumber,
		formRoute;
		if($scope.userLocation.address && !$scope.userLocation.address != '') {
			splitUserAddress = $scope.userLocation.address.split(/([0-9]+\-?[0-9]+)/);
			formStreetNumber = splitUserAddress[1];
			if(splitUserAddress[2] != null) {
				formRoute = splitUserAddress[2].trim();
			}
		}
		userLocation.street_number = formStreetNumber;
		userLocation.route = formRoute;

		userLocation.locality = $scope.userLocation.city;
		userLocation.administrative_area_level_1 = { "short_name": $scope.userLocation.state };
		userLocation.postal_code = $scope.userLocation.zip;

		CookieJar.setUserLocation(userLocation);
                $scope.setUserLocationFromCookie();
	}//end setCookieFromForm

	$scope.userLocationIsValid = function(userLocation) {
		if(!userLocation) {
			// console.log("Invalid userLocation");
			$scope.formError = 'Please enter a City and State, or Zip Code.';
			return false;
		}
		var city = userLocation.city,
		state = userLocation.state,
		zip = userLocation.zip;

		if((city && state && city!='' && state!='') || (zip && zip!='')) {
			return true;
		}
		// console.log("Invalid userLocation: no City and State, or Zip.");
		$scope.formError = 'Please enter a City and State, or Zip Code.';
		return false;
	};

	$scope.setUserLocationFromCookie = function() {
		$scope.userLocation = CookieJar.getUserLocation();
		if($scope.userLocation) {
			$rootScope.userAddressLabel = $scope.userLocation.city_state;
		}
	};//end setUserLocationFromCookie

	$scope.askForLocation = function(complain) {
		$scope.userLocation = CookieJar.getUserLocation();
		// console.log("Retrieving the user locationdata.");
		// console.log(userLocation);
                Geolocator.getBrowserGeolocation()
                .then(function(data) {
                        CookieJar.setUserLocation(data);
                        $scope.setUserLocationFromCookie();
                        $scope.focusOnMap();
                        $scope.spin = false;
                        $scope.browserLookupFailed = false;
                        $scope.startDone = true;
                        $scope.lfcClass = "location-form-container-expanded";
                }, function (reason) {
                        if(complain) {
                          alert("Oops! It looks like you've denied us access to your location. Please fill out the form or re-enable location permission for our website in your browser settings and reload this page. Thanks!");
                        }
                        $scope.userLocation = null;
                        $scope.spin = false;
                        $scope.browserLookupFailed = true;
                        $scope.startDone = true;
                        $scope.lfcClass = "location-form-container-expanded";
                });
	};//end askForLocation

	$scope.focusOnMap = function() {
		Map.focus($scope.userLocation.state, $scope.paper, $scope.default_viewbox);
	}

	//Update the label on the home page
	$scope.setUserLocationFromCookie();



});//end HomeCtrl
