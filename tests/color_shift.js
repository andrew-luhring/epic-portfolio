/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, it: true, shadow: true*/



"use strict";
var $ = jQuery;



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
//  TODO: put bodyColorShift in a jsfiddle and include it in the code section.
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