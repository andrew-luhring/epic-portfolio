
'use strict';
/*
	var portfolio =  angular.module('portfolio', [])
			.config(function($interpolateProvider){
				$interpolateProvider.startSymbol('[[').endSymbol(']]');
			});

	portfolio.controller('Buttons', ['$scope' ,function($scope){
		$scope.thing = "this is a thing";
	}]);
	angular.bootstrap(document, ['portfolio']);

*/
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

});
/*

function Buttons($scope){
//	$scope.thing = "this is a thing";
}*/
