/* jshint undef: true */
/* global  timeoutId: true, populate: true, showGallery: true, populationAnimation: true, Shadowbox: true, worktypes: true, joke: true*/
//TODO when you work on this file, you NEED to remove the global jshint stuff so you can figure out what dependencies u need to fix.
define(['jquery', 'button_populate', 'jqueryui'], function($, buttons){
	"use strict";
	var button = buttons;

	$("#centeringDiv a, a.resume, #centeringDiv a img").click(function(event) {
		event.preventDefault();
		$(event.target).stop(true, true);
		showGallery();
	});
	$('.workTypes').parent().click(function() {
		window.clearTimeout(timeoutId);
		$('#galleryDiv').removeClass("hide").show("blind","slow");
		$("#hint").hide();
		$("#galleryDiv").text();
	});
	$('.workTypes').click(function() {
		showGallery();
		populationAnimation($(this));
		populate();
		Shadowbox.setup($("#galleryDiv a.lb_gal"), {
			gallery : "gallery"
		});
	});
	$('.workTypes').each(function() {
		worktypes.push(this);
	});

	function fadeThemOut(worktypes) {
		if (worktypes.length > 0) {
			var currentWork = worktypes.shift();
			$(currentWork).effect("shake", "easeInOutBack", "slow", function() {
				fadeThemOut(worktypes);
			});
		}
	}
	function clickaBox() {
		if ($(".workTypes").not(".workTypesSelected")) {
			fadeThemOut(worktypes);
			$('#hint')
					.css("visibility", "visible")
					.text( "(if you want to see my work, just click one of these buttons.)")
					.show("fade", 500);
			timeoutId = window.setTimeout(joke, 90000);
		}
	}
});