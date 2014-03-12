jQuery(document).ready(function($) {

	$(function() {
		$("#solutionsAccordion").accordion({
			header : 'div.accordionHeader',
			active : false,
			collapsible : true,
			heightStyle : "content"
		});
	});

	$('.accordionHeader p').trunk8({
		lines : 0,
		fill : ''
	});
	
	
	// accordion header truncating behavior modified from original to hide header paragraph on accordion close:
	$('div.accordionHeader').click(function() {
		
		// truncate all other headers and remove clicked class from them:
		if ($('div.accordionHeader').not(this).hasClass('clicked')) {
				
				$('div.accordionHeader').not(this).children('p, div').trunk8({
				     lines : 0,
				     fill : ''				
				});
			    $('div.accordionHeader').not(this).removeClass('clicked');
		}
		
		// toggle clicked class of current header and toggle display of its paragraph:
		if ($(this).hasClass('clicked')) {
		
		       $(this).removeClass('clicked');
		       $(this).children('p, div').trunk8({
			       lines : 0,
			       fill : ""
		       });
		       
		} else {
			
		       $(this).addClass('clicked');
		       $(this).children('p, div').trunk8({
			       lines : 9,
			       fill : ""
		       });
		}
		
	});

	
	// accordion header truncating behavior modified from original to hide header paragraph on accordion close:
	/*
	$('div.accordionHeader').click(function() {
		$(this).children('p, div').trunk8({
			lines : 8,
			fill : ""
		});
		if ($('div.accordionHeader').not(this).hasClass('clicked')) {
				
				$('div.accordionHeader').not(this).children('p, div').trunk8({
				     lines : 0,
				     fill : ''				
				});
			    $('div.accordionHeader').not(this).removeClass('clicked');
		} else if ($(this).hasClass('clicked')) {
			$(this).children('p, div').trunk8({
				lines : 0,
				fill : ''
			});
			$(this).removeClass('clicked');
		} else {
			$(this).addClass('clicked');
		}
	});
	*/

});


