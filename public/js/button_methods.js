var obj = {};

for ( i = 0; i < contentArray.length; i++) {
	var className = contentArray[i];
	content[className] = $('.' + className);
}
$("#centeringDiv a, a.resume, #centeringDiv a img").click(function(event) {
	event.preventDefault();
	$(event.target).stop(true, true);
	showGallery();
});
$('.workTypes').parent().click(function() {
	window.clearTimeout(timeoutId);
	$('#galleryDiv').removeClass("hide").show("blind","slow");
	$("#hint").hide();
	$("#galleryDiv").text();
});
$('.workTypes').click(function() {
	showGallery();
	populationAnimation($(this));
	populate();
	Shadowbox.setup($("#galleryDiv a.lb_gal"), {
		gallery : "gallery"
	});
});