var boxShadowDown = {
    boxShadow: "2 3 9 -1 #400339"
}, boxShadowUp = {
    boxShadow: "10 15 30 -5 #400339"
}, timeoutId;

jQuery(document).ready(function(e) {
    function a() {
        e("#temp, #clickToClose").hide("fade", 200);
        jQuery.each(e("img.gallery, #galleryDiv a"), function() {
            e(this).show("slide", "down", "500").switchClass("hide", "unhide", 1500);
        });
        window.clearTimeout(timeoutId);
    }
    var t = [ "albumArt", "logoDesign", "UX", "other" ], n = {}, r, i, s, o, u;
    for (s = 0; s < t.length; s++) {
        var f = t[s];
        n[f] = e("." + f);
    }
    e("#centeringDiv a, a.resume, #centeringDiv a img").click(function(e) {
        e.preventDefault();
    });
    var l;
    e(".workTypes").click(function() {
        window.clearTimeout(timeoutId);
        e(this).stop(!0, !0).animate(boxShadowDown, 300);
        e(this).addClass("workTypesSelected", "fast");
        l = e(this).attr("id");
        i = n[l];
        if (e(".workTypes").not(this).hasClass("workTypesSelected")) {
            e(".workTypes").not(this).animate(boxShadowUp, 400);
            e(".workTypes").not(this).removeClass("workTypesSelected", " fast");
        }
        e("#galleryDiv").empty();
        for (s = 0; s < i.length; s++) {
            var t = i.eq(s);
            e("<a>").attr({
                href: t.attr("href"),
                title: t.attr("title"),
                "class": "lb_gal"
            }).append(e("<img>").attr({
                id: "largeGallery" + s,
                src: t.attr("href"),
                "class": "gallery cf",
                rel: "shadowbox[gallery]"
            })).show("fade", 2e3).appendTo("#galleryDiv");
        }
        if (e(this).is("#other")) {
            jQuery.each(e("img.gallery, #galleryDiv a"), function() {
                e(this).hide().addClass("hide");
                o = e("img.gallery").toArray();
                u = e("#galleryDiv a").toArray();
            });
            e("#galleryDiv").append('<div><p id="temp" style="text-align:center">Click the pic to play with the code</p> <p id="clickToClose">Show</p></div>').show(500);
            timeoutId = window.setTimeout(a, 2e3);
            e("#temp, #clickToClose").click(function() {
                timeoutId = window.setTimeout(a, 200);
            });
            e("#galleryDiv a").addClass("iframed");
            if (e("#galleryDiv a").hasClass("iframed")) {
                e("#galleryDiv a img").removeAttr("rel");
                e("#largeGallery0").parent().attr({
                    href: "http://jsfiddle.net/Luhring/jVsfx/"
                });
                e("#largeGallery1").parent().attr({
                    href: "http://jsfiddle.net/Luhring/SBPWw/"
                });
                e("#largeGallery2").parent().attr({
                    href: "http://jsfiddle.net/Luhring/qSKsJ/"
                });
                timeoutId = window.setTimeout(a, 2e3);
            }
        } else if (e(this).is("#UX")) {
            jQuery.each(e("img.gallery, #galleryDiv a"), function() {
                e(this).hide().addClass("hide");
            });
            e("#largeGallery0").parent().attr({
                href: "http://www.bisforbounce.com/TemporaryLandingIndex.html"
            });
            e("#largeGallery1").parent().attr({
                href: "http://www.plasticsurgeryresource.com/wordpress/"
            });
            e("#largeGallery2").parent().attr({
                href: "http://bisforbounce.com/portfolio/portfolio/corptax/"
            });
            e("#largeGallery3").parent().attr({
                href: "http://www.bisforbounce.com/portfolio/portfolio/milyli/"
            });
            e("#largeGallery4").parent().attr({
                href: "http://www.bisforbounce.com/portfolio/portfolio/quinn/"
            });
            e("#largeGallery5").parent().attr({
                href: "http://www.bisforbounce.com/portfolio/portfolio/bobbys/"
            });
            e("#largeGallery6").parent().attr({
                href: "http://www.bisforbounce.com/portfolio/portfolio/danaco/"
            });
            e("#galleryDiv").append('<div><p id="temp">My most important portfolio piece is everything on bisforbounce. <a href="awesome.html" >Check the source.</a></p><p id="clickToClose">Show</p></div>').show(500);
            setTimeout(a, 3e3);
        } else if (e(this).is("#albumArt")) e("#largeGallery0").parent().attr({
            href: "http://www.bisforbounce.com/portfolio/portfolio/bythehand/"
        }); else {
            e("#galleryDiv").text();
            window.clearTimeout(timeoutId);
        }
        Shadowbox.setup(e("#galleryDiv a.lb_gal"), {
            gallery: "gallery"
        });
    });
    e(".resume").click(function() {
        Shadowbox.setup(e(this));
    });
    e("#galleryDiv").addClass("flexy");
});