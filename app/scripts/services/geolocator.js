angular.module('CitizenApp')
.factory('Geolocator', function ($rootScope, $window, $http, $q, GoogleAPI) {

  var geolocationFactory = {};

  geolocationFactory.createUserLocation = function(element, index, array) {
    return userLocation[this.type] = this.long_name;
  }

  geolocationFactory.getBrowserGeolocation = function () {
    var userLocation = {};
    var deferred = $q.defer();

    if($window.navigator) {
      $window.navigator.geolocation.getCurrentPosition(function (position) {
        //To Google!
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude + ',' + position.coords.longitude +'&key=' + GoogleAPI.GOOGLE_API_KEY)
        .success(function(data) {
          //Check out results array for data
          if (data.results.length > 0) {
            angular.forEach(data.results[0].address_components, function(component, key) {
              userLocation[component.types[0]] = component.long_name;
            });
          } else {
            //No results!! Freak out!!
          }
          deferred.resolve(userLocation);
        },
        function (error) {
          deferred.reject(error);
        });
      });
    } else {
      deferred.reject(new Error("Geolocation is not supported"));
    }
    return deferred.promise
  };

  return geolocationFactory;
});
