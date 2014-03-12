function showGallery() {
    $("#temp, #clickToClose").hide("fade", 200);
    jQuery.each($("img.gallery, #galleryDiv a"), function() {
        $(this).show("slide", "down", "500").switchClass("hide", "unhide", 1500);
    });
    window.clearTimeout(timeoutId);
}

function populationAnimation(e) {
    window.clearTimeout(timeoutId);
    var t = $(e);
    t.stop(!0, !0).animate(boxShadowDown, 300);
    t.addClass("workTypesSelected", "fast");
    selected = t.attr("id");
    $selectedArray = content[selected];
    if ($(".workTypes").not(t).hasClass("workTypesSelected")) {
        $(".workTypes").not(t).animate(boxShadowUp, 400);
        $(".workTypes").not(t).removeClass("workTypesSelected", " fast");
    }
    $("#galleryDiv").empty().addClass("flexy");
}

function populate() {
    for (i = 0; i < $selectedArray.length; i++) {
        var e = $selectedArray.eq(i);
        $("<a>").attr({
            href: e.attr("href"),
            title: e.attr("title"),
            "class": "lb_gal"
        }).append($("<img>").attr({
            id: "largeGallery" + i,
            src: e.attr("href"),
            "class": "gallery cf",
            rel: "shadowbox[gallery]"
        })).show("fade", 2e3).appendTo("#galleryDiv");
    }
}

function otherSpecific() {
    jQuery.each($("img.gallery, #galleryDiv a"), function() {
        $(this).hide().addClass("hide");
        imgGallery = $("img.gallery").toArray();
        galleryDivA = $("#galleryDiv a").toArray();
    });
    $("#galleryDiv").append('<div><p id="temp" style="text-align:center">Click the pic to play with the code</p> <p id="clickToClose">Show</p></div>').show(500);
    timeoutId = window.setTimeout(showGallery, 2e3);
    $("#temp, #clickToClose").click(function() {
        timeoutId = window.setTimeout(showGallery, 200);
    });
    $("#galleryDiv a").addClass("iframed");
    if ($("#galleryDiv a").hasClass("iframed")) {
        $("#galleryDiv a img").removeAttr("rel");
        $("#largeGallery0").parent().attr({
            href: "http://jsfiddle.net/Luhring/jVsfx/"
        });
        $("#largeGallery1").parent().attr({
            href: "http://jsfiddle.net/Luhring/SBPWw/"
        });
        $("#largeGallery2").parent().attr({
            href: "http://jsfiddle.net/Luhring/qSKsJ/"
        });
        timeoutId = window.setTimeout(showGallery, 2e3);
    }
}

function uxSpecific() {
    jQuery.each($("img.gallery, #galleryDiv a"), function() {
        $(this).hide().addClass("hide");
    });
    $("#largeGallery0").parent().attr({
        href: "http://www.bisforbounce.com/TemporaryLandingIndex.html"
    });
    $("#largeGallery1").parent().attr({
        href: "http://www.plasticsurgeryresource.com/wordpress/"
    });
    $("#largeGallery2").parent().attr({
        href: "http://bisforbounce.com/portfolio/portfolio/corptax/"
    });
    $("#largeGallery3").parent().attr({
        href: "http://www.bisforbounce.com/portfolio/portfolio/milyli/"
    });
    $("#largeGallery4").parent().attr({
        href: "http://www.bisforbounce.com/portfolio/portfolio/quinn/"
    });
    $("#largeGallery5").parent().attr({
        href: "http://www.bisforbounce.com/portfolio/portfolio/bobbys/"
    });
    $("#largeGallery6").parent().attr({
        href: "http://www.bisforbounce.com/portfolio/portfolio/danaco/"
    });
    $("#galleryDiv").append('<div><p id="temp">Important point: <br /> This website is also a portfolio piece.</p><p id="clickToClose">Show</p></div>').show(1e3);
    setTimeout(showGallery, 3e3);
}

function albumArtSpecific() {
    $("#largeGallery0").parent().attr({
        href: "http://www.bisforbounce.com/portfolio/portfolio/bythehand/"
    });
}

function categoryActions(e) {
    var t = $(e);
    switch (t) {
      case t.is("#other"):
        otherSpecific();
        break;
      case t.is("#UX"):
        uxSpecific();
        break;
      case t.is("#albumArt"):
        albumArtSpecific();
        break;
      case t.is("#logoDesign"):
        $("#galleryDiv").text();
        window.clearTimeout(timeoutId);
        break;
      default:
        $("#galleryDiv").text();
        window.clearTimeout(timeoutId);
    }
}

var boxShadowDown = {
    boxShadow: "2 3 9 -1 #400339"
}, boxShadowUp = {
    boxShadow: "10 15 30 -5 #400339"
}, selected, contentArray = [ "albumArt", "logoDesign", "UX", "other" ], content = {}, newClassName, $selectedArray, i, imgGallery, galleryDivA, timeoutId;

$("body,html").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e) {
    (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") && $("html,body").stop(!0, !0);
});

jQuery(document).ready(function(e) {
    for (i = 0; i < contentArray.length; i++) {
        var t = contentArray[i];
        content[t] = e("." + t);
    }
    e("#centeringDiv a, a.resume, #centeringDiv a img").click(function(t) {
        t.preventDefault();
        e(t.target).stop(!0, !0);
    });
    showGallery();
    e(".workTypes").parent().click(function() {
        window.clearTimeout(timeoutId);
        e("#galleryDiv").removeClass("hide").show("blind", "slow");
        e("#hint").hide();
        e("#galleryDiv").text();
        e("#centeringDiv a, a.resume, #centeringDiv a img").click(function(t) {
            t.preventDefault();
            e(t.target).stop(!0, !0);
        });
    });
    e(".workTypes").click(function() {
        showGallery();
        populationAnimation(e(this));
        populate();
        Shadowbox.setup(e("#galleryDiv a.lb_gal"), {
            gallery: "gallery"
        });
    });
    e(".resume").click(function() {
        Shadowbox.setup(e(this));
    });
});