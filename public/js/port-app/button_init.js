/**
 * @deprecated
 *  use button_populate instead.
 */
/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, window: true, define: true*/
/*
define('jquery', function(jquery){
	"use strict";
	var PublicModule = (function () {
		var $ = jquery;

		var Module = function(){

			this.getWork = function () {
				var obj = $.getJSON ("models/websites.json")
					.done (function (data) {
						obj.resp = data;
						obj.work = obj.resp.work;
						return obj;
					})
					.fail (function () {
						console.error ("failed");
						return false;
					})
					.always (function () {
						console.log ("complete");
					});
				return obj;
			};

			this.populateClasses =  (function (obj) {
				for (var m = 0; m < obj.work.length; m++) {
					var className = obj.work[m].id;
					content[className] = $ ('.' + className);
				}
			})(this.getWork);
		};
		var content = {}, contentArray = [];
		for (var i = 0; i < contentArray.length; i++) {
			var className = contentArray[i];
			content[className] = $ ('.' + className);
		}
		return Module;
	}) ();
});

*/
