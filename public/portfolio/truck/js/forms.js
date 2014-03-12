/* jshint undef: true */
/* global angular: true, jQuery: true  */

//forms
(function(){
"use strict";
	var test = false;
	jQuery(document).ready(function($){
		$('#d7v1 .subsec:nth-child(odd)').addClass("left");
		$('#d7v1 .subsec:nth-child(even)').addClass("right");
		$("[name='btn_align']").on("click", function(){
			$('.subsec_btn').removeClass('left center right');
			$(".subsec_btn").addClass($(this).attr('data-send'));
		});

		if(!test){
			$(".test").removeClass("test");
		}
	});
	function Btn_Align($scope) {
		$scope.align = 'left';
		$scope.modify= 'false';
	}
})();

