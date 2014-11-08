angular.module('CitizenApp')
.factory('Geolocator', function ($rootScope, $window, $http, $q) {

  var geolocationFactory = {};

  geolocationFactory.getBrowserGeolocation = function () {
    var latlong;
    var deferred = $q.defer();

    if($window.navigator) {
      $window.navigator.geolocation.getCurrentPosition(function (position) {
        $rootScope.$apply(function() {
          deferred.resolve(position);
        });
      }, function (error) {
        $rootScope.$apply(function() {
          deferred.reject(error);
        });
      });
    } else {
      $rootScope.$apply(function() {
        deferred.reject(new Error("Geolocation is not supported"));
      });
    }



    return deferred.promise
  };

  // geolocationFactory.reverseLookup = function (position) {
  //   console.log("Hello from inside reverseLookup.");
  // };

  return geolocationFactory;
});
