/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, window: true, define: true*/
"use strict";

describe([
	'jquery'
,   'animateShadow'
,   'shadowbox'
,   'jqueryui'
	],  function($, animateShadow, Shadowbox){

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


//  Function crossBrowserCssValue($obj, property, value){
//  requires:
//  *   jQuery Object
//  *   property                        :   property to change
//  *   value                              :   value to change it to.
//
//  For the record, I was hesitant to write this because css and js should not mix, but it's meant for properties that change over time.
//
//
function crossBrowserCssValue($obj, property, val){
	$obj.selector.css("-webkit-" + property, val);
	$obj.selector.css("-moz-" + property, val);
	$obj.selector.css("-ms-" + property, val);
	$obj.selector.css("-o-" + property, val);
	$obj.selector.css(property, val);
}

//     Object Pallete( jQueryObject, range, transitionTime )
//      requires:
//      *   jQueryObject.
//		*   range                   :   is the maximum range of start gradient to end gradient. default is 45
//     *   transitionTime    :   length in seconds of transition.
//
//      Properties:
//
//		.pallete               hsl hue value (between 0 and 360) ===>   default is randomly generated,
//		.selector             value of the jQueryObject used in instantiation.
//		.worklength      default is the number of objects returned by .selector ;
//		.delta                 the difference between the start gradient hsl value and end gradient hsl value ====> default is range value divided by worklength value.
//
//      Methods:
//
//     .transition()    method that sets the length in sections the transition should last. default is transitionTime passed at instantiation.
//     .colorShift(i)     requires incrementor amount. the incrementor amount means that whatever you call this method with should have its own iterator and timing sequence.
//
//
function Pallete( $obj, transition, range ){
	function Gradient (palleteObject, incrementBy) {
		this.start  = palleteObject.pallete + palleteObject.delta + incrementBy;
		this.end = this.start + palleteObject.range;
		console.log("gradient start is " + this.start + "\ngradeint end  is: " + this.end + " increase by " +  incrementBy);
	}
	this.pallete = Math.floor(Math.random() * 360);
	this.selector = $obj;
	this.range = 45 || range;
	this.worklength = $obj.length;
	this.delta = (function(range, worklength){
		if(range >= 0 && worklength >= 0 ){
			return range / worklength;
		} else {
			return 1;
		}
	})(this.range, this.worklength);
	this.transition = (function($obj, value){
		var val;
		if(value){
			val = value;
		} else {
			val = "all 5s";
		}
		crossBrowserCssValue($obj, "transition", val);
	})(this, transition);
	this.colorShift = function(incrementor, isDrastic, isGradient){
		var incrementBy;
		if(isDrastic){
			incrementBy = incrementor  * (this.range );
		} else {
			incrementBy = incrementor  +  (this.range );
		}
		var gradient = new Gradient(this , incrementBy );
		var hsl = function(hue){
			return 'hsl(' + hue + ',100%,80%)';
		};
		if(isGradient){
			this.selector.css( "background", "-webkit-linear-gradient(45deg, " + hsl(gradient.start) + " 0%," +  hsl(gradient.end) + "100%)") ;
			this.selector.css("background","-moz-linear-gradient(45deg, " + hsl(gradient.start) + " 0%," +  hsl(gradient.end) + "100%)");
			this.selector.css("background", "-ms-linear-gradient(45deg, " + hsl(gradient.start) + " 0%," +  hsl(gradient.end) + "100%)");
			this.selector.css("background", "-o-linear-gradient(45deg, " + hsl(gradient.start) + " 0%," +  hsl(gradient.end) + "100%)");
			this.selector.css("background", "linear-gradient(45deg, " + hsl(gradient.start) + " 0%," +  hsl(gradient.end) + "100%)");
		} else {

			this.selector.css("background",  hsl(gradient.start));
		}
	};
}

function bodyColorShift(){
	var bodyPallete = new Pallete($('html'), "all 5s", 45);
	keysAndValues(bodyPallete, 2);
	var j= 1;
	bodyPallete.colorShift(j, true, false);
	var bodyShifter = setInterval(function(){
		bodyPallete.colorShift(j, true, false);
		j = j+1;
	}, 15000);
}
$(document).ready(function() {
		var obj = {};

	//$http.get('phones/phones.json').success(function(data) {
	//	$scope.phones = data;
	//});
		$.getJSON("models/websites.json").done(function(data){
				obj.resp = data;
				obj.work = obj.resp.work;
			for( var m = 0; m < obj.work.length; m++) {
				var className = obj.work[m].id;
				content[className] = $('.' + className);
			}
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
});
