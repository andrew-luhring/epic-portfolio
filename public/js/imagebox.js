//right here' I'm just displaying a larger image that's already loaded into the DOM, normally I'd use an ajax request to get the picture dynamically.





define(['jquery'], function($){
	"use strict";

//  ================================
//  gets current window dimensions
//  returns an object with the window dimensions
//
//
//
//

function windowDimensions(){
	var win = window;
	win.height = $(window).height();
	win.width = $(window).width();
	return win;
}


//  ================================
//  creates the image object before inserting it into the dom
//  returns the image object
//
//
//

function createImg(){

	var imgSrc =  $('#lightbox').attr("data-img"),
			win = windowDimensions(),
			img = document.createElement('img');

	img.id = "lightboxImg";
	img.src = imgSrc;
	img.alt = "This is a bigger image :-)";
	img.style.maxHeight = win.height + "px";
	img.style.maxWidth = win.width + "px";
	return img;
}

//  ================================
//  Takes the thing to append and
//  the location to append the thing to (elem) as parameters
//  Removes hide class from the elem
//
//
//
function showAndDisplay(thing, elem){
	$(elem).append(thing).addClass("show", function(){
		$(this).removeClass("hide");
	});

}
//  ================================
//  Takes an element, removes/adds show and hide classes
//  removes the elements' children from dom.
//
//
function hideAndRemove(elem){
	$(elem).removeClass("show").addClass("hide");
	$(elem).children().remove();
}


//  ================================
//  Stuff to do on click.
//
//

$(".thumb").click(function(){
	var theImage = createImg();
	showAndDisplay(theImage, $("#lightbox"));


});

$("#lightbox").click(function(){
	hideAndRemove(this);

});



//
// use example:
//  http://codepen.io/andrew-luhring/pen/HGyKe
//
//
//
//

});