
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
