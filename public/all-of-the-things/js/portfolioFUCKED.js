var boxShadowDown = {
	boxShadow : '2 3 9 -1 #400339'
};
var boxShadowUp = {
	boxShadow : '10 15 30 -5 #400339'
};
var timeoutId;
jQuery(document).ready(function($) {

		var contentArray = [ 'albumArt', 'logoDesign', 'UX', 'other' ], 
		content = {}, newClassName, $selectedArray, i, imgGallery, galleryDivA;
	    
		function showGallery(){
			$('#temp, #clickToClose').hide("fade", 200);
			jQuery.each($('img.gallery, #galleryDiv a'), function() {
				$(this).show("slide", "down", "500").switchClass("hide", "unhide", 1500);
			});
						window.clearTimeout(timeoutId);

	    }
		
		for (i = 0; i < contentArray.length; i++) {
			var className = contentArray[i];
			content[className] = $('.' + className);
		}
		$("#centeringDiv a, a.resume, #centeringDiv a img").click(function(event) {
			event.preventDefault();
		});

		var selected;
		$('.workTypes').click(function() {
			
				window.clearTimeout(timeoutId);
					$(this).parent().stop(true, true).animate(boxShadowDown, 300);
					$(this).addClass("workTypesSelected", "fast");
					
					selected = $(this).attr('id');
					
							console.log(selected);
							$selectedArray = content[selected];
			
					if ($('.workTypes').not(this).hasClass("workTypesSelected")) {
						
						$('.workTypes').not(this).parent().animate(boxShadowUp, 400);
						$('.workTypes').not(this).removeClass('workTypesSelected', " fast");
					}
					 
					$('#galleryDiv').empty();
					
					
					for (i = 0; i < $selectedArray.length; i++) {
						
						var $selected = $selectedArray.eq(i);
						$('<a>').attr({
							href : $selected.attr('href'),
							title : $selected.attr('title'),
							"class" : "lb_gal"
						}).append(
							$('<img>').attr({
								id : "largeGallery" + i,
								src : $selected.attr('href'),
								"class" : "gallery cf",
								rel : "shadowbox[gallery]"
								})
						).show("fade", 2000).appendTo('#galleryDiv');

					}

				
				if ($(this).is('#other')) {
					jQuery.each($('img.gallery, #galleryDiv a'), function() {
						$(this).hide().addClass("hide");
						imgGallery = $('img.gallery').toArray();
						galleryDivA = $('#galleryDiv a').toArray();
					});
					$('#galleryDiv').append(
					'<div><p id="temp" style="text-align:center">Click the pic to play with the code</p> <p id="clickToClose">Show</p></div>')
					.show(500); 
					timeoutId = window.setTimeout(showGallery, 2000);
					$('#temp, #clickToClose').click(function(){
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
				}} else if ($(this).is('#UX')) {
					
					//$('img.gallery').css("float","left");
					//$('img.gallery').parent("a").css("float", "left");

					jQuery.each($('img.gallery, #galleryDiv a'), function() {
						$(this).hide().addClass("hide");
						//$(this).css("width","230px");
						//$(this).css("height","auto");
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
					
					$('#galleryDiv').append(
						'<div><p id="temp">My most important portfolio piece is everything on bisforbounce- I wrote all of the code on here except the plugins (shadowbox, modernizr, animate shadow css).</p><p id="clickToClose">Show</p></div>')
					.show(500);
					setTimeout(showGallery,3000);


				} else {
					$('#galleryDiv').text();
					window.clearTimeout(timeoutId);

				}
				Shadowbox.setup($("#galleryDiv a.lb_gal"), {
					gallery : "gallery"
				});

			}); // end click handler
	$('.resume').click(function() {
		Shadowbox.setup($(this));
	});
$('#galleryDiv').addClass("flexy");
}); // end the document ready jquery function
