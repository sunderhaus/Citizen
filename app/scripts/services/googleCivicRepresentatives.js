angular.module('CitizenApp')
	.factory('googleCivicRepresentatives', function () {
		
		var returnData = {};
		
		googleCivicRepresentatives.getData = function(address, city, state, zip) {
			//at minimum we have to have a city/state or zip
			if((city && state && city!='' && state!='') || (zip && zip!='') ) {
				var addr = '';
				
				if(address && address!='')
					addr = address + ',';
				if(city && state && city!='' && state!='')
					addr += city + ',' + state;
				if(zip && zip!='')
					addr += zip;
				
				//try to look up by full address
				var ajaxRet = $http.get( 'https://www.googleapis.com/civicinfo/v2/representatives?address='+addr+'&key='+siteKey )
					success(function(data) {
						//we successfully called and will now analyze the return
						alert('got good resposne');
						parseData(data);
					})
					error(function(data) {
						alert('getRepsByAddress - failed return - WTF Google?');
						parseData(data);
					});
			
				//if fail, come back to city state
				if(1==2 && address && address!='') {
					return getData(null, city, state, zip);
				}//end if()
			}
		}//end getData
		
		googleCivicRepresentatives.parseData = function(data) {
			//format the return
			returnData = data;
		}//end parseData
		
		googleCivicRepresentatives.getMyReps = function() {
			if(returnData)
				return returnData;
			else
				return getData(address, city, state, zip);
		}//end getMyReps
		
	});//end factory