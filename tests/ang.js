/* jshint undef: true *//*

*/
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, it: true, shadow: true, angular: true, $: true*//*


'use strict';
angular.element(document).ready(function() {
	var portfolio = angular.module('portfolio', [])
		.config(function($interpolateProvider){
			$interpolateProvider.startSymbol('[[').endSymbol(']]');
		})
		.controller('Buttons', function($scope){
			$scope.iv = "this is a new thing";
		})
		.directive('werk', function(){
				var obj = {};
				jQuery.getJSON("models/websites.json")
						.done(function(data){
							obj.resp = data;
							obj.work = obj.resp.work;
						}).fail(function(){
							console.log("failed");
						}).always();

				return {
					restrict : 'E'
				,   templateUrl: 'ang/button.html'
				,   scope: {}
				,   link: function(scope){
						scope.work = obj.work;
					}
				};
			});
	angular.bootstrap(document, ['portfolio']);
	// TODO use angular's get instead of jquery's:  $http.get('phones/phones.json').success(function(data) {
	//	$scope.phones = data;
	//});
});
*/
