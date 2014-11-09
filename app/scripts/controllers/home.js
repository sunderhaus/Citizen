angular.module('CitizenApp')
.controller('HomeCtrl', function ($cookieStore, Geolocator) {
	var userLocation = $cookieStore.get('storedUserLocation');
	// console.log("Retrieving the user locationdata.");
	// console.log(userLocation);
	if (!userLocation) {
		Geolocator.getBrowserGeolocation()
		.then(function(data) {
			userLocation = data;
			$cookieStore.put('storedUserLocation', data);
			// console.log("Storing the user locationdata.");
			// console.log(data);
		}), function (reason) {
			userLocation = null;
		};
	}
});//end HomeCtrl
