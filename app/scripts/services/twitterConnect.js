angular.module('CitizenApp')
	.factory('TwitterConnect', function($http, $q, $rootScope){

		var twitter = {};
		var baseUrl = 'https://api.twitter.com/';
		var scope = null;
		var bearerToken = function(){
		    var consumerKey = encodeURIComponent('IsGc0UXcdmoLbCz91Ro9kiaAA');
		    var consumerSecret = encodeURIComponent('epEsqswQ10DilXmuW4v1WpLVuXFXkTWUzEpezhZ4GscmnF6kqM');
		    var tokenCredentials = btoa(consumerKey + ':' + consumerSecret);
		
		    return tokenCredentials;
		};
		
		twitter.fetchAccessToken = function(){
		    var oAuthurl = baseUrl + "oauth2/token";
		    var headers = {
		            'Authorization': 'Basic ' + bearerToken(),
		            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		        };
		    $http.defaults.useXDomain = true;
		    delete $http.defaults.headers.common['X-Requested-With'];
		    $http({method: 'POST', url: oAuthurl, headers: headers, data: 'grant_type=client_credentials'}).
		        success(function(data, status){
		            
		            return data;
		        }).
		        error(function(data, status){
		            
		            return {'error':'Cannot connect'};
		        });
		};
		
		twitter.fetchTimeLine = function(){
		    twitter.fetchAccessToken();
		    //the 
		    console.log('get twitter token');
		};
		return twitter;
});