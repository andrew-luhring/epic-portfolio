(function() {
  var $, Accordion, ComplexityGraphic, SlideShow;

  $ = jQuery;

  $(document).ready(function() {
    var toggleNews, toggleLogin;
    toggleNews = $('#newsletter-signup').children('h1');
	toggleLogin = $('#login').children('h1');

    toggleNews.click(function() {
		$('#label-bar').html("");
        $('#signup_response').html("");
		$(this).next().fadeToggle('slow');	  
		return false;
    }).next().hide();

    toggleLogin.click(function() {
	  $('#signup_response').html("");
      $(this).next().fadeToggle('slow');	  
      return false;
    }).next().hide();


	function submitNewsletter() {

		console.log("submitNewsletter()");

        /*
		$.ajax({
			type : 'POST',
			url : '/forms/newsletter.php',
			data : $('#newsletter-signup-form').serialize(),
			success : function(response) {
				$('#response_container').find('#signup_response').html(response);
			}
		});
		//$('#label-bar').fadeToggle('slow');
		$('#newsletter-signup-form').fadeToggle('slow');
        */

		return false;
	}


    if (!($('#slideshow').length < 1)) SlideShow.init();
    Accordion.init();
    if (!($('#perishable-supply').length < 1)) ComplexityGraphic.init();
    return $('[href^="http"]:not([href*="' + window.location.host + '"])').attr('target', '_blank');
  });


  Accordion = (function() {
    var content, createSections, init, setupClickEvent;
    content = [];
    createSections = function() {
      var toggles;
	  content = $('.colleft');
      toggles = $('.col1').find('h2').not('#children h2, .perishable-supply h2');
      toggles.addClass('toggle');
      toggles.each(function() {
        $(this).nextUntil($('h1, h2, h3, h4')).wrapAll('<div class="accordion">');
      });
	  content.find('.toggle').next().hide(); 
    };
    setupClickEvent = function() {
      content = $('.colleft');
      content.on('click', '.toggle', function() {
        $(this).toggleClass('active').next().toggle('slow');
		$(this).siblings('.toggle').next().hide('slow');
      });
      //return content.find('.toggle').next().hide();   //hides content under all headers!
    };
    init = function() {
      createSections();
      return setupClickEvent();
    };
    return {
      init: init
    };
  })();


  SlideShow = (function() {
    var defineTransitionFunction, initializeSlideShow, setupWindowBlurAndFocusEvents;
    defineTransitionFunction = function() {
        return $.rf.slideshow.defineTransition('fadeWithArrow', function(params) {
        params.previous.fadeOut(params.duration);
        return $('#background-arrow').animate({
          'opacity': 0
        }, params.duration, function() {
          params.next.css('z-index', -1);
          params.previous.css('z-index', -1);
          return $('#background-arrow').animate({
            'opacity': 1
          }, params.duration);
        });
      });
    };
    initializeSlideShow = function() {
      return $('#slideshow').slideshownav({
        duration: '600',
        delay: '5000',
        transition: 'fadeWithArrow',
        autoPlay: true,
        selector: 'section',
        navSelector: '#slideshow-nav li'
      });
    };
    setupWindowBlurAndFocusEvents = function() {
      $(window).bind('blur', function() {
        return $('#slideshow').slideshownav('stop');
      });
      return $(window).bind('focus', function() {
        return $('#slideshow').slideshownav('play');
      });
    };
    return {
      init: function() {
        defineTransitionFunction();
        initializeSlideShow();
        return setupWindowBlurAndFocusEvents();
      }
    };
  })();

  ComplexityGraphic = (function() {
    var buildNavAndFigureClickEvent, buildNavAndFigureHoverEvent, container, ensureCorrectImageRendering, hideSectionBox, initializeVariables, nav;
    container = $();
    nav = $();
    initializeVariables = function() {
      container = $('#perishable-supply');
      return nav = $('#complexity-nav');
    };
    hideSectionBox = function() {
      return container.find('section').removeClass('selected');
    };
    ensureCorrectImageRendering = function() {
      return container.find('figure').each(function() {
        var image;
        image = $(this).find('img').first();
        $(this).css('background-image', "url(" + (image.attr('src')) + ")");
        return image.css('opacity', 0);
      });
    };
    buildNavAndFigureClickEvent = function() {
      return container.find('#complexity-nav a, figure a').click(function(event) {
        var hash;
        event.preventDefault();
        container.find('.selected').removeClass('selected');
        hash = event.currentTarget.hash;
        $(hash).addClass('selected');
        $(hash).next().addClass('selected');
        $('[href="' + hash + '"]').addClass('selected');
        $('.connecting-line').remove();
        return $('<div class="connecting-line"></div>').insertAfter(nav.find('[href="' + hash + '"]'));
      });
    };
    buildNavAndFigureHoverEvent = function() {
      return container.find('#complexity-nav a, figure a').hover(function(eventIn) {
        var hash;
        container.find('.hover').removeClass('hover');
        hash = eventIn.currentTarget.hash;
        $(hash).next().addClass('hover');
        $('[href="' + hash + '"]').addClass('hover');
        return $('#background').addClass(hash.substring(1));
      }, function(eventOut) {
        return $('#background').removeClass();
      });
    };
    return {
      init: function() {
        initializeVariables();
        hideSectionBox();
        ensureCorrectImageRendering();
        buildNavAndFigureClickEvent();
        return buildNavAndFigureHoverEvent();
      }
    };
  })();


}).call(this);













function getInternetExplorerVersion() {
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).

	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
    	var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
		}
  	return rv;
}


document.onload = function(e) { 
    var version =  getInternetExplorerVersion();
	//console.log( "IE version: " + version );
}



// retrieve value of GET variable specified:

function getQueryVariable(variable) { 
    var query = window.location.search.substring(1); 
	var vars = query.split("&"); 
	for (var i = 0; i < vars.length; i++) { 
	    var pair = vars[i].split("="); 
		if (pair[0] == variable) { 
		return unescape(pair[1]); 
	    } 
	} 
	return false; 
} 


// expand news story accordion if story ID passed in URL:

function expandNews() {

    story = getQueryVariable('story');

    if ( story ) {
	    if ( document.getElementById(story) ) {
		    element = document.getElementById(story);
		    element.className += " " + "active";
		    element.nextSibling.style.display = "block";
	    }
	} else {
            console.log("Error: no news item found with id: '" + story + "'");
    }
}	


	







