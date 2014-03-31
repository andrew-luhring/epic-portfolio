/* jshint undef: true */
/* global jQuery: true */

define (['utility', 'jquery', 'jqueryui'], function (utility, jQuery) {
	"use strict";

	var $viewport = jQuery('body, html');

	jquery(document).ready(function($){
		$viewport.bind ("scroll mousedown DOMMouseScroll mousewheel keyup", function(e) {
		if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
			$("html,body").stop(true,true);
		}
	});


		/**
		 *  @method
		 *      makes the body slowly drift through colors.
		 */
		$viewport.prototype.bodyColorShift = function(){
			var Pallete = utility.Pallete;
			var bodyPallete = new Pallete ($ ('html'), "all 5s", 45);
			var j = 1;
			bodyPallete.colorShift (j, true, false);
			var bodyShifter = setInterval (function () {
				bodyPallete.colorShift (j, true, false);
				j = j + 1;
			}, 15000);
		}
	});
	return $viewport;
});