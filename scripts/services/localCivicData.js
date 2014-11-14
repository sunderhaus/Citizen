angular.module('CitizenApp')
	.factory('LocalCivicData', function ($http, $q, $rootScope, CookieJar) {
		var localCivic = {};

		//we'll call a local json database for now
		localCivic.getInfo = function( address, city, state, zip ) {
			
			var deferred = $q.defer();

			if((city && state && city!='' && state!='') || (zip && zip!='') ) {

				//try to look up by full address
				$http.get( 'data/localCivic.json' )
				.success(function(data) {
					if(data) {
						$rootScope.currentLocalCivicData = data;
						deferred.resolve(data);
					}//end if(data)
					else {
						deferred.reject( {'error':'Cannot find information for your area'} );
					}
				})
				.error(function(data) {
					deferred.reject( {'error':'Cannot find information for your area'} );
				});
			}
			else {
				deferred.reject( {'error':'Cannot find information for your area'} );
			}

			return deferred.promise;
		}//end getReps

		return localCivic;
	});//end factory
