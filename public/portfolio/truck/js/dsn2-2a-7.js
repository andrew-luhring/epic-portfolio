var jQuery = require('../lib/jquery.js');

var $ = jQuery;


function Obj(selector){
	"use strict";
	this.prototype = Object.create(jQuery.prototype);
	jQuery.call(this, selector);
	function jqTest (thingToTest){
		if(thingToTest.selector instanceof jQuery){
			return true;
		} else {
			return  false;
		}
	}
	function listProp (objectToListPropertiesOf){
		var arr = [];
		for (var i in objectToListPropertiesOf){
			if (objectToListPropertiesOf.hasOwnProperty(objectToListPropertiesOf[i])) {
			} else {
				var keys = i ;
				var props = objectToListPropertiesOf[i];
				arr.push(keys, props);
			}
		}
		return arr;
	}
	this.testString = "string";
	this.wasjQuery = jqTest(this);
	this.numberOfProperties = listProp(this).length + 1;
	this.listProperties = listProp(this);
}

function Button(selector){
	"use strict";
	Obj.call(this, selector);
	var thing = $(selector);
	this.jq = thing;
	this.width =  thing.width();
	this.height =  thing.height();
	this.href = thing.attr("href");
	this.isRelative = thing.attr("data-relationship");
	this.action = thing.attr("data-action");
}

function developerError($elem){
	"use strict";
	var error
		, stackTraceText
		, stackTraceHtml;
	if($elem instanceof jQuery === false){
		error = $($elem);
	} else {
		error = $elem;
	}
	stackTraceText = error.text();
	stackTraceHtml = error.html();
	console.log(stackTraceHtml + " " + stackTraceText );
}




jQuery(document).ready(function($){
	"use strict";
	var buttons = $("button").toArray();
	$.each(buttons, function(index){
		var instance = $(buttons).eq(index)
			, button = new Button(instance);
		if (button.action !== "link" && button.action !== "dialog"){
			button.jq.removeAttr("href").removeAttr("data-relationship");
		} else {
			if(button.isRelative !== "true"){
				button.jq.attr("rel", "nofollow").attr("target", "_blank");
			} else {
				console.log(button.action + " is  a relative link");
			}
		}
		
	});
	var devErrors = $(".developerError").toArray();
	if(devErrors.length > 0){
		developerError(devErrors);
	}
});
	
