/* jshint undef: true */
/* global  imgGallery: true, galleryDivA: true, timeoutId: true, populate: true, showGallery: true, populationAnimation: true, Shadowbox: true, worktypes: true, joke: true*/
define(['jquery', 'button_populate', 'jqueryui'], function($, buttons){
	"use strict";


jQuery.extend( jQuery.fn, {
	hasParent: function(p) {
		return this.filter(function(){
			return $(p).find(this).length;
		});
	}
});

$('.workTypes').each(function() {
	worktypes.push(this);
});


//intro animation.
var boxShadowDown = {boxShadow : '2 3 9 -1 #400339'}
		,   boxShadowUp = {boxShadow : '10 15 30 -5 #400339'};
$('article, footer').hide();
$('header h1').replaceWith('<h1> :-) </h1>').removeClass('hide').show("fast");
$('header h1').delay(500).effect("fade", "easeOutQuart", 1000, function() {
	$(this).hide().text('Andrew Luhring').show("slow");
	$('header h1').switchClass('hide', 'unhide').show();
	$('#hint').css("visibility", "hidden");
});
$('#galleryDiv').addClass('hide');

$('.workTypes').animate(boxShadowDown, 100);
$('article').removeClass('hide').delay(2000).show(1500, function(){
	$('footer').removeClass('hide').show(1500);
});
$('.workTypes').delay(3500).animate(boxShadowUp, 500);
$('.workTypes').parent().click(function() {
	window.clearTimeout(timeoutId);
	$('#galleryDiv').show("blind","slow").removeClass("hide");
	$("#hint").hide();
	$("#galleryDiv").text();
});

});