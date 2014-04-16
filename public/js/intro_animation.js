/* jshint undef: true */
/* global  imgGallery: true, galleryDivA: true, timeoutId: true, populate: true, showGallery: true, populationAnimation: true, Shadowbox: true, worktypes: true, joke: true*/
define (['jquery', 'button_populate', 'jqueryui'], function ($, buttons) {
	"use strict";

	jQuery.extend (jQuery.fn, {
		hasParent: function (p) {
			return this.filter (function () {
				return $ (p).find (this).length;
			});
		}
	});
	$ ("article, footer, .gallery, .portfolio").hide ().addClass ("hide");

//intro animation.
	var boxShadowDown = {boxShadow: '2 3 9 -1 #400339'}
			, boxShadowUp = {boxShadow: '10 15 30 -5 #400339'};


	$ ('.portfolio').removeClass ('hide').delay (2000).show (1500, function () {
		$ ('.page_footer').removeClass ('hide').show (1500);
	});

	function Obj(selector) {
		this.obj = $ (selector);
		this.content = {
			html: this.obj.html (), text: this.obj.text ()
		};
		return this;
	}

	function animateModal() {
		var title = new Obj ('.page_title')
				, titlejq = title.obj;
		titlejq.addClass ('smile')
				.text (":-)")
				.show ('fast', function () {
					$(this).animate({
						'opacity': '1.0'
					}, 500, function(){
						$(this).removeClass('hide hidden');
					});
					$ (this).delay (500)
							.effect ("fade", "easeOutQuart", 1000, function () {
								$ (this).hide ().text ('Andrew Luhring')
										.show ("slow")
										.removeClass ('smile')
										.switchClass ('hide', 'unhide')
										.show ();
								$ ('#hint').css ("visibility", "hidden");
								$('#portfolio').show('slow').removeClass("hide");
								$ ('.workTypes').animate (boxShadowDown, 100).animate(boxShadowUp, 500);

							});
				});

		/*
		 $('header h1').replaceWith('<h1> :-) </h1>').removeClass('hide').show("fast");
		 $('header h1').delay(500).effect("fade", "easeOutQuart", 1000, function() {
		 $(this).hide().text('Andrew Luhring').show("slow");
		 $('header h1').switchClass('hide', 'unhide').show();
		 $('#hint').css("visibility", "hidden");
		 });*/

	}

	animateModal ();

	$ ('.workTypes').delay (3500).animate (boxShadowUp, 500);
	$ ('.workTypes').parent ().click (function () {
		window.clearTimeout (timeoutId);
		$ ('.gallery').show ("blind", "slow").removeClass ("hide");
		$ ("#hint").hide ();
		$ ("#galleryDiv").text ();
	});


});



