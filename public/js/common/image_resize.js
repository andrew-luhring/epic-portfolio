/* jshint undef: true */
/* global jQuery: true, resizeImg: true*/


define(['jquery', 'jqueryui'], function($){

"use strict";
var galDiv = $('.gallery')
	,   height = galDiv.height()
	,   width = galDiv.width()
	,   imgArray = []
	,   imgs = document.getElementsByTagName("img")
	,   section
	,   timeoutIda
	,   viewportWidth;
	function scrollUp() {
		viewportWidth = $(window).width();
		if (viewportWidth < 767) {
			var gDST = $("#galleryDiv");
			$('body').animate({
				scrollTop : 0
			}, "slow", "easeInOutQuint");
		}
		window.clearTimeout(timeoutIda);
	}
	function resizeImg() {
		var w = $('#galleryDiv').width();
		var sec;
		for (var i = 0; i < imgArray.length; i++) {
			sec = imgArray[i].width = (w / imgs.length) - 5;

			$("#galleryDiv a img").css({
				width : sec + "px",
				height : "auto",
				"max-width" : 315 + "px"
			}, "slow");
		}
		viewportWidth = $(window).width();

		if (viewportWidth >= 767 && viewportWidth <= 1024) {
			if (((w / imgs.length) - 5) * imgs.length <= w) {
				var blah = parseFloat($('#galleryDiv img').css("min-width")) * imgs.length;
				$("#galleryDiv").css("min-width", blah);
			}
		} else if (viewportWidth < 767) {
			$("#galleryDiv").css("min-width", 240);
			timeoutIda = window.setTimeout(scrollUp, 2000);
		}

	}
	$("body,html").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e) {
		if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
			$("html,body").stop(true,true);
		}
	});
	jQuery(document).ready(function($) {

		for (var i = 0; i < imgs.length; i++) {
			imgArray.push(imgs[i]);
		}
		$(window).resize(function() {
			resizeImg();
		});
		$('.workTypes').click(function() {
			timeoutIda = window.setTimeout(resizeImg, 1000);
		});
	});


});