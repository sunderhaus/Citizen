angular.module('CitizenApp')
.factory('CookieJar', function ($cookieStore) {

  var cookieJar = {};

  cookieJar.getUserLocation = function() {
    var cookieToReturn = {},
    cookieFromStore = $cookieStore.get('storedUserLocation');
    if(cookieFromStore) {
      cookieToReturn = {
        "address": cookieFromStore.street_number + " " + cookieFromStore.route,
        "city": cookieFromStore.locality,
        "state": cookieFromStore.administrative_area_level_1.short_name,
        "zip":cookieFromStore.postal_code,
        "city_state": cookieFromStore.locality + ", " + cookieFromStore.administrative_area_level_1.short_name
      }
    } else {
      cookieToReturn = null;
    }
    return cookieToReturn;
  };

  cookieJar.setUserLocation = function(data) {
    $cookieStore.put('storedUserLocation', data);
  };

  cookieJar.removeUserLocation = function() {
    $cookieStore.remove('storedUserLocation');
  }

  return cookieJar;
});
