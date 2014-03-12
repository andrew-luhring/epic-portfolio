/*

 _______                .---.
 _..._         __.....__            \  ___ `'.             |   |.--.               __.....__
 .'     '.   .-''         '.           ' |--.\  \            |   ||__|     _.._  .-''         '.
 .   .-.   . /     .-''"'-.  `. .-,.--. | |    \  '           |   |.--.   .' .._|/     .-''"'-.  `.
 |  '   '  |/     /________\   \|  .-. || |     |  '          |   ||  |   | '   /     /________\   \
 |  |   |  ||                  || |  | || |     |  |          |   ||  | __| |__ |                  |
 |  |   |  |\    .-------------'| |  | || |     ' .'          |   ||  ||__   __|\    .-------------'
 |  |   |  | \    '-.____...---.| |  '- | |___.' /'           |   ||  |   | |    \    '-.____...---.
 |  |   |  |  `.             .' | |    /_______.'/            |   ||__|   | |     `.             .'
 |  |   |  |    `''-...... -'   | |    \_______|/             '---'       | |       `''-...... -'
 |  |   |  |                    |_|                                       | |
 '--'   '--'                                                              |_|

 Code by Andwee.
 */
jQuery(document).ready(function($) {
	
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	var x, z, bw, bh, m, md;
	var hexVals = ["a", "b", "c", "d", "e", "f"];
	var scrollTopValue, scrollLeftValue;
	var sections = $.makeArray($("article.post"));
	var modalDivs = $.makeArray($('#modal h1 div'));
	var scrollTimeout;

	function checkCookie(){
		if ($.cookie("first-view") !== "yes") {
			$(modalDivs).addClass("hide");
			$('#modal').addClass("initial");
			modalAnimation();
		} else {
			scrollitize();
			
		}
	}

	function whichGenre(whichArticle) {
		var classes = {};
		$($(this).attr('class').split(' ')).each(function() {
			if (this !== '') {
				classes[this] = this;
			} else {
				classes[this] = "none";
			}
		});
	}
	
	function displayProgress(){
		var max = $(document).height();
		var current = window.pageYOffset;
		var total = (current / (max - winHeight))*100;
		total = Math.round(total);
		total = total * 3;
		$('#current').css("height", total);
	}

	function movePosts() {
		$(this).removeClass("initialCollapsed");
		var st = $('article.post:first-of-type').offset();
		$('html,body').animate({
			scrollTop : st.top
		}, "slow", function(){
			displayProgress();
		});
	}
	
	function scrollitize() {
		for (var i = 0; i <= sections.length; i++) {
			x = $(sections[i]);
			$(x).animate({
				"height" : winHeight
			}, 2500, "easeOutBounce", function(){
				movePosts();
			});
		}
	}

	function modalAnimation() {
		var i = 0;
		function myLoop() {
			var a = modalDivs[i];
			setTimeout(function() {
				$(a).switchClass("hide", "show", 500).delay(500).switchClass("show", "hide", 500);
				i++;
				if (i <= 3) {
					myLoop();
				} else if (i === 4) {
					$(a).switchClass("hide", "show", 500);
					window.setTimeout(function() {
						$("#modal").removeClass("initial", "slow");
					}, 1000);
					window.setTimeout(scrollitize, 2000);
				} else {
				}
			}, 1000);
		}
		myLoop();
		$.cookie("first-view", "yes", {
			path : '/'
		});
	}

				
	function onScroll() {
		
	}



	$("#progress-posts a").click(function(event) {
		event.preventDefault();
		var scrollToPost = $(this).attr("href");
		var scrollPosition  = $(scrollToPost).offset().top;
		$('body, html').animate({
			scrollTop : scrollPosition + "px"
		}, "slow");
	});

	$(sections).each(function(index) {
		$(this).addClass("initialCollapsed");
		scrollTopValue = $(sections[0]).scrollTop();
		scrollLeftValue = $(sections[0]).scrollLeft();
		$("#progress-posts a").eq(index).attr("href", "#"+ $(this).attr("id"));
		$("#progress-posts a").eq(index).text( $(this).find(".entry-title a").text() );
	});
	
	checkCookie();
	
		$(window).scroll( function(){
			// clear the timeout, if one is pending
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
				scrollTimeout = null;
			}
			scrollTimeout = setTimeout(displayProgress, 350);
		});




	
	
	
	//TODO add the jquery TouchSwipe stuff for sidebars,
	//TODO finish the genre style colorizing thing http://stackoverflow.com/questions/2787291/use-jquery-to-get-a-list-of-classes
	//TODO add the NEW search magnifying glass icon to the search box.
	//TODO make responsive
	//TODO add if lte ie bullshit.
	//TODO solve the jerky thing that happens if you try to scroll before the scroll down thing finishes completely.
	
});
