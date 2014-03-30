/* jshint undef: true *//*

*/
/* global jQuery: true, resizeImg: true*//*


"use strict";
(function($){


	$("body,html").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e) {
		if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
			$("html,body").stop(true,true);
		}
	});

})(jQuery);*/
