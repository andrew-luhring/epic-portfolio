/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, window: true, define: true*/



//module pattern.

define('jquery', function(jQuery){
	"use strict";
	var PublicModule = (function () {
	var $ = jQuery;
	function privateFunction () {
		return "this can be but only via testing api.";
	}
	var Module = {
		getWork: function () {
			var obj = {};
			$.getJSON ("models/websites.json").done (function (data) {
				obj.resp = data;
				obj.work = obj.resp.work;
				return obj;
			}).fail (function () {
						console.error ("failed");
						return false;
					}).always (function () {
						console.log ("complete");
					});

		}, populateClasses: (function (obj) {
			for (var m = 0; m < obj.work.length; m++) {
				var className = obj.work[m].id;
				content[className] = $ ('.' + className);
			}
		}) ()
		//test api
		, privateFunction : privateFunction
	};

	var content = {}, contentArray = [];
	for (var i = 0; i < contentArray.length; i++) {
		var className = contentArray[i];
		content[className] = $ ('.' + className);
	}
	return Module;
}) ();


});

