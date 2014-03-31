define (['jquery'], function ($) {
	var utility = {

		/**
		 *
		 * @param $obj  :  jQuery Object
		 * @param property :   property to change
		 * @param val   :   value to change it to.
		 * @returns {*}
		 *
		 *      For the record, I was hesitant to write this because css and js should not mix, but it's meant for properties that change over time.
		 */
		crossBrowserCssValue: function ($obj, property, val) {
			$obj.selector.css ("-webkit-" + property, val);
			$obj.selector.css ("-moz-" + property, val);
			$obj.selector.css ("-ms-" + property, val);
			$obj.selector.css ("-o-" + property, val);
			$obj.selector.css (property, val);
			return $obj;
		}
		/**
		 *
		 * @param $obj  :  jQueryObject.
		 * @param transition   :   is the maximum range of the hsl start value of the gradient to the end hsl value of the gradient. default is 45
		 * @param range :   length in seconds of transition.
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
		,   Pallete : function ($obj, transition, range) {

			/**
			 * @param palleteObject
			 * @param incrementBy
			 * @constructor
			 */
			function Gradient (palleteObject, incrementBy) {
				this.start = palleteObject.pallete + palleteObject.delta + incrementBy;
				this.end = this.start + palleteObject.range;
				console.log ("gradient start is " + this.start + "\ngradeint end  is: " + this.end + " increase by " + incrementBy);
			}

			this.pallete = Math.floor (Math.random () * 360);
			this.selector = $obj;
			this.range = 45 || range;
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
				crossBrowserCssValue ($obj, "transition", val);
			}) (this, transition);
			this.colorShift = function (incrementor, isDrastic, isGradient) {
				var incrementBy;
				if (isDrastic) {
					incrementBy = incrementor * (this.range );
				} else {
					incrementBy = incrementor + (this.range );
				}
				var gradient = new Gradient (this, incrementBy);
				var hsl = function (hue) {
					return 'hsl(' + hue + ',100%,80%)';
				};
				if (isGradient) {
					this.selector.css ("background", "-webkit-linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
					this.selector.css ("background", "-moz-linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
					this.selector.css ("background", "-ms-linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
					this.selector.css ("background", "-o-linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
					this.selector.css ("background", "linear-gradient(45deg, " + hsl (gradient.start) + " 0%," + hsl (gradient.end) + "100%)");
				} else {

					this.selector.css ("background", hsl (gradient.start));
				}
			};
		}
	}
	return utility;
});