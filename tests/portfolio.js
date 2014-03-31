/* jshint undef: true, shadow: true *//*

*/
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, window: true, define: true*//*

"use strict";
var shadow = {}
	,   selected
	,   contentArray = ['albumArt', 'logoDesign', 'UX', 'other']
	,   content = {}
	,   $selectedArray
	,   i
	,   imgGallery
	,   galleryDivA
	,   timeoutId;
shadow.down = { boxShadow : '2 3 9 -1 #400339' };
shadow.up = { boxShadow : '10 15 30 -5 #400339' };
$("body,html").bind ("scroll mousedown DOMMouseScroll mousewheel keyup", function(e) {
		if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
			$("html,body").stop(true,true);
		}
	});

function keysAndValues(object, depth){
	for(var i in object){
		if(object.hasOwnProperty(i)){
			if(depth > 1){
				console.log(i + " :  " + object[i]);
				for(var j in object[ i ]){
					if(object.hasOwnProperty(j)){
						console.log("      "+ j + " : " + object[ i ][ j ]);
					}
				}
				console.log("");
			} else{
				console.log(i + " :  " + object[i]);
			}
		}
	}
}

function showGallery() {
	$('#temp, #clickToClose').hide("fade", 200);
	jQuery.each($('img.gallery, #galleryDiv a'), function() {
		$(this).show("slide", "down", "500").switchClass("hide", "unhide", 1500);
	});
	window.clearTimeout(timeoutId);
}

function populationAnimation(thing) {
	window.clearTimeout(timeoutId);
	var $thing = $(thing);
	$thing.stop(true, true).animate(shadow.down, 300);
	$thing.addClass("workTypesSelected", "fast");
	selected = $thing.attr('id');
	$selectedArray = content[selected];
	if ($('.workTypes').not($thing).hasClass("workTypesSelected")) {
		$('.workTypes').not($thing).animate(shadow.up, 400);
		$('.workTypes').not($thing).removeClass('workTypesSelected', " fast");
	}
	$('#galleryDiv').empty().addClass("flexy");
}

function populate() {
	for ( i = 0; i < $selectedArray.length; i++) {
		var $selected = $selectedArray.eq(i);
		$('<a>').attr({
			href : $selected.attr('href'),
			title : $selected.attr('title'),
			"class" : "lb_gal"
		}).append($('<img>').attr({
			id : "largeGallery" + i,
			src : $selected.attr('href'),
			"class" : "gallery cf",
			rel : "shadowbox[gallery]"
		})).show("fade", 2000).appendTo('#galleryDiv');
	}
}

function otherSpecific() {
	jQuery.each($('img.gallery, #galleryDiv a'), function() {
		$(this).hide().addClass("hide");
		imgGallery = $('img.gallery').toArray();
		galleryDivA = $('#galleryDiv a').toArray();
	});
	$('#galleryDiv').append('<div><p id="temp" style="text-align:center">Click the pic to play with the code</p> <p id="clickToClose">Show</p></div>').show(500);
	timeoutId = window.setTimeout(showGallery, 2000);
	$('#temp, #clickToClose').click(function() {
		timeoutId = window.setTimeout(showGallery, 200);
	});
	$('#galleryDiv a').addClass("iframed");
	if ($('#galleryDiv a').hasClass('iframed')) {
		$('#galleryDiv a img').removeAttr("rel");
		$('#largeGallery0').parent().attr({
			href : "http://jsfiddle.net/Luhring/jVsfx/"
		});
		$('#largeGallery1').parent().attr({
			href : "http://jsfiddle.net/Luhring/SBPWw/"
		});
		$('#largeGallery2').parent().attr({
			href : "http://jsfiddle.net/Luhring/qSKsJ/"
		});
		timeoutId = window.setTimeout(showGallery, 2000);
	}
}

function uxSpecific() {

	jQuery.each($('img.gallery, #galleryDiv a'), function() {
		$(this).hide().addClass("hide");
	});
	$('#largeGallery0').parent().attr({
		href : "http://www.bisforbounce.com/TemporaryLandingIndex.html"
	});
	$('#largeGallery1').parent().attr({
		href : "http://www.plasticsurgeryresource.com/wordpress/"
	});
	$('#largeGallery2').parent().attr({
		href : "http://bisforbounce.com/portfolio/portfolio/corptax/"
	});
	$('#largeGallery3').parent().attr({
		href : "http://www.bisforbounce.com/portfolio/portfolio/milyli/"
	});
	$('#largeGallery4').parent().attr({
		href : "http://www.bisforbounce.com/portfolio/portfolio/quinn/"
	});
	$('#largeGallery5').parent().attr({
		href : "http://www.bisforbounce.com/portfolio/portfolio/bobbys/"
	});
	$('#largeGallery6').parent().attr({
		href : "http://www.bisforbounce.com/portfolio/portfolio/danaco/"
	});

	$('#galleryDiv').append('<div><p id="temp">Important point: <br /> This website is also a portfolio piece.</p><p id="clickToClose">Show</p></div>').show(1000);
	setTimeout(showGallery, 3000);

}

function albumArtSpecific() {
	$('#largeGallery0').parent().attr({
		href : "http://www.bisforbounce.com/portfolio/portfolio/bythehand/"
	});
	$('#largeGallery1').parent().attr({
		href : "http://www.androo.pro/truck/truck.html"
	});

}

function categoryActions(thing) {
	var $thing = $(thing);
	switch($thing) {
		case $thing.is('#other'):
			otherSpecific();
			break;
		case $thing.is('#UX'):
			uxSpecific();
			break;
		case $thing.is('#albumArt'):
			albumArtSpecific();
			break;
		case $thing.is('#logoDesign'):
			$('#galleryDiv').text();
			window.clearTimeout(timeoutId);
			break;
		default:
			$('#galleryDiv').text();
			window.clearTimeout(timeoutId);
			break;
	}
}



$(document).ready(function() {
		var obj = {};
*/
/*
		$.getJSON("websites.json")
			.done(function(data){
				obj.resp = data;
				obj.work = obj.resp.work;
			}).fail(function(){
					console.log("failed");
			}).always();
			for ( i = 0; i < obj.work.length; i++) {
				var className = obj.work[i].id;
				content[className] = $('.' + className);
			}
*//*


		for ( i = 0; i < contentArray.length; i++) {
			var className = contentArray[i];
			content[className] = $('.' + className);
		}
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
		Shadowbox.setup($('.resume'));
	});
*/
