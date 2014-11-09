angular.module('CitizenApp')
.factory('CookieJar', function ($cookieStore) {

  var cookieJar = {};

  cookieJar.getUserLocation = function() {
    var cookieToReturn = {},
    cookieFromStore = $cookieStore.get('storedUserLocation');
    if(cookieFromStore) {
      if(!cookieFromStore.street_number || cookieFromStore.street_number === '' || !cookieFromStore.route || !cookieFromStore.route === ''){
        cookieToReturn.address = null;
      } else {
        cookieToReturn.address = cookieFromStore.street_number + " " + cookieFromStore.route;
      }
      if (!cookieFromStore.locality || cookieFromStore.locality === '' || !cookieFromStore.administrative_area_level_1.short_name || !cookieFromStore.administrative_area_level_1.short_name === ''){
        cookieToReturn.city_state = null;
      } else {
        cookieToReturn.city_state = cookieFromStore.locality + ", " + cookieFromStore.administrative_area_level_1.short_name;
      }
      cookieToReturn.city = cookieFromStore.locality;
      cookieToReturn.state = cookieFromStore.administrative_area_level_1.short_name;
      cookieToReturn.zip = cookieFromStore.postal_code;
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
  
  cookieJar.setCurrentCivicData = function(data) {
	  $cookieStore.put('currentCivicData', data);
  }
  cookieJar.getCurrentCivicData = function () {
	  return $cookieStore.get('currentCivicData');
  }

  return cookieJar;
});
