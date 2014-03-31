function populationAnimation(thing) {
	window.clearTimeout(timeoutId);
	var $thing = $(thing);
	$thing.stop(true, true).animate(shadow.down, 300);
	$thing.addClass("workTypesSelected", "fast");
	selected = $thing.attr('id');
	$selectedArray = content[selected];
	if ($('.workTypes').not($thing).hasClass("workTypesSelected")) {
		$('.workTypes').not($thing).animate(shadow.up, 400);
		$('.workTypes').not($thing).removeClass('workTypesSelected', " fast");
	}
	$('#galleryDiv').empty().addClass("flexy");
}

function populate() {
	for ( i = 0; i < $selectedArray.length; i++) {
		var $selected = $selectedArray.eq(i);
		$('<a>').attr({
			href : $selected.attr('href'),
			title : $selected.attr('title'),
			"class" : "lb_gal"
		}).append($('<img>').attr({
					id : "largeGallery" + i,
					src : $selected.attr('href'),
					"class" : "gallery cf",
					rel : "shadowbox[gallery]"
				})).show("fade", 2000).appendTo('#galleryDiv');
	}
}


function showGallery() {
	$('#temp, #clickToClose').hide("fade", 200);
	jQuery.each($('img.gallery, #galleryDiv a'), function() {
		$(this).show("slide", "down", "500").switchClass("hide", "unhide", 1500);
	});
	window.clearTimeout(timeoutId);
}
