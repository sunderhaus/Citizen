angular.module('CitizenApp')
	.factory('GoogleCivicRepresentatives', function ($http, $q, GoogleAPI) {

		var civicAPI = {};

		civicAPI.getReps = function(address, city, state, zip) {

			var deferred = $q.defer();

			if((city && state && city!='' && state!='') || (zip && zip!='') ) {
				var addr = '';

				if(address && address!='')
					addr = address + ',';
				if(city && state && city!='' && state!='')
					addr += city + ',' + state;
				if(zip && zip!='')
					addr += zip;

				//try to look up by full address
				var siteKey = GoogleAPI.GOOGLE_API_KEY;
				$http.get( 'https://www.googleapis.com/civicinfo/v2/representatives?address='+addr+'&key='+siteKey )
				.success(function(data) {
					//we successfully called and will now analyze the return
					var officials = [];
					if(data.offices) {
						//loop over each office, and then get the officials for each
						angular.forEach(data.offices, function(oInfo,key) {
							if(oInfo.officialIndices) {
								//get the officials at these indicies

								angular.forEach(oInfo.officialIndices, function(ofInfo,ok) {

									if(data.officials[ofInfo]) {
										var ofData = data.officials[ofInfo];
										officials.push( {
												'office':oInfo.name,
												'name':ofData.name,
												'party':ofData.party,
												'phone':ofData.phone,
												'email':ofData.emails,
												'urls':ofData.urls,
												'photoURL':ofData.photoUrl,
												'socialMedia':ofData.channels
										});//end scope.officials

									}

								});//end foreach(index)
							}

						});//end foreachOffice

					}//end if(offices)

					deferred.resolve(officials);

				})
				.error(function(data) {
					deferred.resolve( {'error':'Cannot find information for your area'} );
				});


			}
			else
				deferred.resolve( {'error':'Cannot find information for your area'} );

			return deferred.promise;
		}//end getReps

		return civicAPI;

	});//end factory
