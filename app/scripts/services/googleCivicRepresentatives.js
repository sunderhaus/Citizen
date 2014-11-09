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
										//setup the base data
										var pData = {
											'linkId':ofData.name.toLowerCase().replace(/[\W_]+/g,"").trim()+oInfo.name.toLowerCase().replace(/[\W_]+/g,"").trim(),
											'office':oInfo.name,
											'name':ofData.name,
											'party':ofData.party,
											'phone':ofData.phones,
											'email':ofData.emails,
											'urls':ofData.urls,
											'photoURL':ofData.photoUrl,
											'socialMedia':ofData.channels
										};//end pData

										//add the detail
										if(oInfo.levels)
											pData.level = oInfo.levels[0];
										//pop the first one
										if(ofData.address) {
											pData.address = ofData.address[0].line1;
											if(ofData.address[0].line2)
												pData.address2 = ofData.address[0].line2;
											else
												pData.address2 = '';
											if(ofData.address[0].line3)
												pData.address3 = ofData.address[0].line3;
											else
												pData.address3 = '';
											pData.city = ofData.address[0].city;
											pData.state = ofData.address[0].state;
											pData.zip = ofData.address[0].zip;
										}
										//finally push this result on our array()
										officials.push(pData);

									}

								});//end foreach(index)
							}

						});//end foreachOffice

					} else {
						console.log("Nothing to see here... Move along.");
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
