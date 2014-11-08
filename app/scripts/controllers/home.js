angular.module('CitizenApp')
.controller('HomeCtrl', function ($cookieStore, Geolocator) {
	var userLocation = $cookieStore.get('storedUserLocation');
	if (userLocation) {
		alert("I see your cookies.");
		console.log($cookieStore.get('storedUserLocation'));
	} else {
		Geolocator.getBrowserGeolocation()
		.then(function(data) {
			console.log(data);
			userLocation = data;
			$cookieStore.put('storedUserLocation', data);
			console.log($cookieStore.get('storedUserLocation'));
		}), function (reason) {
			console.log(reason);
			userLocation = null;
		};
	}
});//end HomeCtrl
