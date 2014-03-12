/**
 * @author Andrew
 */

jQuery(document).ready(function($) {

	$('footer li a, aside li a').addClass("nahbro");
	$('ul li ul').css({"margin-left": "-10px", "padding" : "0px", "margin-top" : "-45px"});
	$('footer li, aside li').hover(function(){
		$(this).stop(true, true).switchClass("nahbro", "prepare", 200);
		$('#subNizzle', this).stop(true, true).fadeIn().switchClass("nahbro", "prepare", 100);
		$('.subNav').hover(function(){
			$(this).switchClass("prepare", "liSelected", 200);
		},function(){
			$(this).switchClass("liSelected", "prepare", 200);
		});

	}, function(){
		$(this).switchClass("prepare", "nahbro", 400);
		$('#subNizzle', this).fadeOut().switchClass("liSelected", "nahbro", 500);

	});

});

