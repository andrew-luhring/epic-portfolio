
define (['jquery'], function ($) {
	"use strict";
	function Utility(){
		var utility = this;
		/**
		 *  generates vender prefixes
		 * @param $obj  :  jQuery Object
		 * @param property :   property to change
		 * @param val   :   value to change it to.
		 * @returns {*}
		 *
		 *      For the record, I was hesitant to write this because css and js should not mix, but it's meant for properties that change over time.
		 */
		this.crossBrowserCssValue = function ($obj, property, val) {
			var jqO;

			if ($obj instanceof $) {
				jqO = $obj;
			} else {
				jqO = $ ($obj);
			}
			jqO.css ("-webkit-" + property, val);
			jqO.css ("-moz-" + property, val);
			jqO.css ("-ms-" + property, val);
			jqO.css ("-o-" + property, val);
			jqO.css (property, val);
			return jqO;
		};
		/**
		 *  logs out keys and values of an object.
		 * @param object
		 */
		this.keysVals = function (object, isSilent) {
			var obj = object
				,   mode = isSilent;

			function log (thing, _mode ) {
				if (_mode === true ) { console.log (thing); }
			}
			for (var i in object) {
				if (obj.hasOwnProperty (i)) {
					var str = i + " :  " + obj[i];
					log (str, mode);
					for (var j in object[ i ]) {
						if (obj.hasOwnProperty (j)) {
							var str2 = "      " + j + " : " + object[ i ][ j ];
							log (str2, mode);
							obj.toString ("\n" + j + " : " + object[ i ][ j ]);
						}
					}
				}
			}
			return obj.toString();
		};
		/**
		 *  creates a Pallete object- which can be color shifted over a period of time
		 * @param $obj  :  jQueryObject.
		 * @param transition: default: 'all 5s'
		 * @param range : difference between hsl color value 1 and hsl color value 2.
		 * @constructor
		 *
		 *
		 * @Properties:
		 .pallete               hsl hue value (between 0 and 360) ===>   default is randomly generated,
		 .selector             value of the jQueryObject used in instantiation.
		 .worklength      default is the number of objects returned by .selector ;
		 .delta                 the difference between the start gradient hsl value and end gradient hsl value ====> default is range value divided by worklength value.

		 Methods:

		 .transition()    method that sets the length in sections the transition should last. default is transitionTime passed at instantiation.
		 .colorShift(i)     requires incrementor amount. the incrementor amount means that whatever you call this method with should have its own iterator and timing sequence.
		 *
		 */
		this.Pallete = function ($obj, transition, range) {
			/**
			 * @param palleteObject
			 * @param incrementBy
			 * @constructor
			 */
			function Gradient (palleteObject, incrementBy) {
				this.start = palleteObject.pallete + palleteObject.delta + incrementBy;
				this.end = this.start + palleteObject.range;
			}
			this.pallete = Math.floor (Math.random () * 360);
			this.selector = $obj;
			this.range = range || 45;
			this.worklength = $obj.length;
			this.delta = (function (range, worklength) {
				if (range >= 0 && worklength >= 0) {
					return range / worklength;
				} else {
					return 1;
				}
			}) (this.range, this.worklength);
			this.transition = (function ($obj, value) {
				var val;
				if (value) {
					val = value;
				} else {
					val = "all 5s";
				}
				utility.crossBrowserCssValue ($obj, "transition", val);
			}) (this, transition);
			this.colorShift = function (incrementor, isDrastic, isGradient) {
				var incrementBy = (isDrastic) ? incrementor * (this.range ) : incrementor + (this.range )      //if (isDrastic) { incrementBy = incrementor * (this.range );} else {incrementBy = incrementor + (this.range );}
						,   gradient = new Gradient (this, incrementBy)
						,   hsl = function (hue) {  return 'hsl(' + hue + ',100%,80%)'; };
				if (isGradient) {
					this.selector.css ("background", "-webkit-linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
					this.selector.css ("background", "-moz-linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
					this.selector.css ("background", "-ms-linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
					this.selector.css ("background", "-o-linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
					this.selector.css ("background", "linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
				} else {
					this.selector.css ("background", hsl (gradient.start));
				}
				return this.selector.css;
			};
		};
	}



	return new Utility();
});
