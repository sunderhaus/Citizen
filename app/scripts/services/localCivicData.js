angular.module('CitizenApp')
	.factory('LocalCivicData', function ($http, $q) {

		var localCivic = {};

		//we'll call a local json database for now
		localCivic.getInfo = function( city, state, zip ) {

			var deferred = $q.defer();

			if((city && state && city!='' && state!='') || (zip && zip!='') ) {

				//try to look up by full address
				$http.get( '/data/localCivic.json' )
				.success(function(data) {
					if(data) {
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
