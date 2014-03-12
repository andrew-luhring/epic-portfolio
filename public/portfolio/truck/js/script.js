/* jshint undef: true */
/* global angular: true, jQuery: true  */

"use strict";
function printer(message){
	console.log(message);
	if(jQuery('#printer')){
		jQuery("#printer").append("<div>" + message + "</div>");
	}
}
//angular

	var app = angular.module('truck', []).config(function($interpolateProvider){
		console.log("interpolate");
		$interpolateProvider.startSymbol('[[').endSymbol(']]');
	});


	function Truck($scope){
		console.log("truck");
		$scope.rotation = {
				x: 0
			,   y: 0
			,   z: 0
		}
		$scope.translation = {
			x: 0
		,   y: 0
		,   z: 0
		}
		$scope.animation = {
			speed: 4
		}
	}