/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, window: true, define: true*/
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


	// Calculate and apply incremental hsl colors to the flex-items
	// To make life easier later and always have a 3 digit number
function colorChangyDoodad(){

	var calculations = {
		pallete :  Math.floor(Math.random() * 360)
	,   range : 45
	,   worklength : $('.workTypes').length
	}
	calculations.end = calculations.pallete + calculations.range;
	calculations.increment = calculations.range / calculations.worklength;

	$('.workTypes').each(function(i) {

		var min = i+1;
		var gradient = {}
			gradient.beginning = calculations.pallete + calculations.increment * min
			gradient.end = gradient.beginning + calculations.range;
		var hsl = function(hue){
			return 'hsl(' + hue + ',50%,75%)';
		}
		var background_gradient =  "linear-gradient(45deg, " + hsl(gradient.beginning) + " 0%," +  hsl(gradient.end) + "100%)";
		console.log(background_gradient);
		//var beginning = 'background:hsl(' + hue + ',50%,75%)';
		$(this).css("background", background_gradient );
		//$(this).attr("style", background_color);

	});
}
/*

idea time:
-------
why not have each one of the worktypes be a ball. like a 3d ball. like a marble. page loads the balls roll out and scatter across the page.
moving your mouse over a ball without clicking it will move the ball in the direction your mouse leaves. the balls clank into eachother like marbles.

***

each one of the worktypes is like those cut out shape toys---
ex. a triangle can only fit in a triangle spot, a star only fits in a star spot, etc... it's like a puzzle but with bigger, slightly more 3d shapes.
the gallery thing could be the thing you move a shape into... so it's like a key. each worktype is like a key to the gallery.
...which makes conceptual sense because what i my goal is for the gallery is to make the experience the best part of it.

***

 right now, the site is simple. you push a button you get the content.
 without messing with the interaction a lot, i could make it more interesting by giving it a different context

 like... a science lab environment.
  i could have little mice wander around in the background. i could make a mouse on a wheel!!!
  the worktypes could be styled to look like blocks of cheese. you click a block of cheese, a mouse comes up and starts eating the block of cheese
  until you click a different block of cheese... in which case he moves over to that one and the old one respawns. whichever block of cheese currently
   being eaten is the type of work being displayed.

   or

 a vending machine.  push a button, the gallery gives you a packet of work.

 or

 a science environment vending machine. you push a button, it drops some cheese in the mice cage. a mouse pulls the work over by its mouth.
 oooor the work is on a little wagon thing thats strung to the mouse's tail.

 or

 you're inside of a mousewheel.
 you push the category button and the next rung in the mousewheel is the first piece.
 scrolling to the next item moves into view but it looks like the old item is being moved away from you...
 it would look like the "price is right wheel" but what it would look like the inside of the wheel rather than the outside.
 the inside would be cooler to animate because it's skewing stuff into your perspective rather than away from you.






*/

$(document).ready(function() {
		var obj = {};
		$.getJSON("models/websites.json").done(function(data){
				obj.resp = data;
				obj.work = obj.resp.work;
			for( var m = 0; m < obj.work.length; m++) {
				var className = obj.work[m].id;
				content[className] = $('.' + className);
			}
			colorChangyDoodad();
			}).fail(function(){
					console.log("failed");
			}).always();

	/*for ( i = 0; i < obj.work.length; i++) {
		var className = obj.work[i].id;
		content[className] = $('.' + className);
	}*/

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
