/* jshint undef: true */
/* global angular: true, jQuery: true  */

//var jQuery = require('jquery');

(function($) {
	"use strict";
    var advPlaceholder;
    var baWrapper;
	var Frame = function(frame){
		function getCurrentSize(frame){
			var size = {};
			size.width = $(frame).width();
			size.height = $(frame).height();
			return size;
		}	
		this.frame = frame;
		this.width = getCurrentSize(this.frame).width;
		this.height = getCurrentSize(this.frame).height;
	};
    function canShowAdvert(theFrame, size) {
	    if (theFrame.width > size){
		    return true;
	    } else{
		    return false;
	    }
    }
    function checkForDisplay(theFrame) {
		var newFrame = new Frame(theFrame);
        if (canShowAdvert(newFrame, 1000)) {
            advPlaceholder.show();
            baWrapper.css("width", "980px");
        } else {
            advPlaceholder.hide();
            baWrapper.css("width", "804px");
        }
    }
    function handleResize(obj) {
	
        if(obj.resizeTO) {
            clearTimeout(obj.resizeTO);
        }
        obj.resizeTO = setTimeout(function() {
	        $(obj).trigger('resizeEnd');
        }, 500);
    }
	$(document).ready(function() {
		baWrapper = $("#BAWrapper");
		advPlaceholder = $("#adv-place");
		var frame4 = $(parent.frame4.window); 
		if (!advPlaceholder.length) {
			return; 
		} else {
			//$(window).resize(handleResize);
			$(window).resize(handleResize(frame4));
			$(window).bind('resizeEnd', function(){
				checkForDisplay(frame4);
			});
			checkForDisplay(frame4);
		}            
    });
})(jQuery);
