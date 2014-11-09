angular.module('CitizenApp')
.factory('Geolocator', function ($rootScope, $window, $http, $q, GoogleAPI) {

  var geolocationFactory = {};

  geolocationFactory.getBrowserGeolocation = function () {
    var userLocation = {};
    var deferred = $q.defer();

    if($window.navigator.geolocation) {
      $window.navigator.geolocation.getCurrentPosition(function (position) {
        //To Google!
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                   position.coords.latitude +
                   ',' +
                   position.coords.longitude +
                   '&key='
                   + GoogleAPI.GOOGLE_API_KEY)
        .success(function(data) {
          //Check out results array for data
          if (data.results.length > 0) {
            angular.forEach(data.results[0].address_components, function(component, key) {
              switch(component.types[0]){
                case "administrative_area_level_1":
                  userLocation[component.types[0]] = {"short_name":component.short_name, "long_name":component.long_name};
                  break;
                default:
                  userLocation[component.types[0]] = component.long_name;
                };
            });
          } else {
            //No results!! Freak out!!
          }
          deferred.resolve(userLocation);
        })
        .error(function(error) {
          deferred.reject(error);
        });
      },function() {
        deferred.reject(new Error("Geolocation is not supported"));
      },{timeout: 10000});
    }
    return deferred.promise
  };

  return geolocationFactory;
});
