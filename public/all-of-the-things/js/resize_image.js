var galDiv = document.getElementById("galleryDiv");

var height = galDiv.innerHeight;
var width = galDiv.innerWidth;
var section;
var timeoutIda;
var viewportWidth;

function scrollUp() {
	viewportWidth = $(window).width();
	if (viewportWidth < 767) {
		var gDST = $("#galleryDiv");
		$('body').animate({
			scrollTop : 0
		}, "slow", "easeInOutQuint");
	}
	window.clearTimeout(timeoutIda);
}

function resizeImg() {
	var w = $('#galleryDiv').width();
	var sec;

}


jQuery(document).ready(function($) {

	$(window).resize(function() {
		resizeImg();
	});
	$('.workTypes').click(function() {
		timeoutIda = window.setTimeout(resizeImg, 1000);
	});
});
