angular.module('CitizenApp')
.controller('HomeCtrl', function ($cookieStore, Geolocator) {
	var userLocation = $cookieStore.get('storedUserLocation');
	if (!userLocation) {
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
