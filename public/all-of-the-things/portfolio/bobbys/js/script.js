$(document).ready(function() {
	$('#content section table').hide();

	
	$('#content section table, menuItems').prev("header").click(function() {
		$(this).next('table').toggle("fold", "slow", function() {
			$(this).parent().siblings("section").children("table").hide("fold", "slow");
			// $('html,body').animate({"scrollTop" : "700px"});

		});


	});

});

//testing



/*
$(document).ready(function() {
	$('#content section table').hide();
	$('#content section header:first-of-type').addClass("scrollTo");
	var scrollToPos = $('.scrollTo').makeArray();
	var originalPos;
	for(i = 0; i < scrollToPos.length; i++){
		originalPos = scrollToPos[i] ;
		originalPos
		
	}

	$('#content section table').prev("header").click(function() {
		
		$(this).next('table').toggle("fold", "slow", function() {
			$(this).parent().siblings("section").children("table").hide("fold", "slow");
		});
		
		$('html,body').animate({
			scrollTop : this.offset()
		}, 'slow');

	});

});

//testing
*/
