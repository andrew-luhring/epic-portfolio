/**
 * @author Andrew Luhring
 * bisforbounce.com
 */var boxShadowDown = {
    boxShadow: "2 3 9 -1 #400339"
}, boxShadowUp = {
    boxShadow: "10 15 30 -5 #400339"
}, timeoutId, worktypes = [], paragraphs = [];

jQuery.extend(jQuery.fn, {
    hasParent: function(e) {
        return this.filter(function() {
            return $(e).find(this).length;
        });
    }
});

jQuery(document).ready(function(e) {
    function t(n) {
        if (n.length > 0) {
            var r = n.shift();
            e(r).effect("shake", "easeInOutBack", "slow", function() {
                t(n);
            });
        }
    }
    function n() {
        if (e(".workTypes").not(".workTypesSelected")) {
            t(worktypes);
            e("#hint").css("visibility", "visible").text("(if you want to see my work, just click one of these buttons.)").show("fade", 500);
            timeoutId = window.setTimeout(r, 9e4);
        }
    }
    function r() {
        e("#hint").text("I mean...if you don't want to you don't have to- just keep doing what you're doing.").show("fade", 500);
        timeoutId = window.setTimeout(i, 1e4);
    }
    function i() {
        e("#hint").text("(which is nothing).").show("fade", 500);
        timeoutId = window.setTimeout(s, 5e3);
    }
    function s() {
        e("#hint").text("...so...how are things?").show("fade", 500);
        timeoutId = window.setTimeout(o, 1e4);
    }
    function o() {
        e("#hint").text("did you really respond to that question in your head?").show("fade", 500);
        timeoutId = window.setTimeout(u, 1e4);
    }
    function u() {
        e("#hint").text("if you did, just a heads up- next time i ask you a question, you don't have to answer it...i'm not real").show("fade", 500);
        timeoutId = window.setTimeout(a, 1e4);
    }
    function a() {
        e("#hint").text("...or am i?").show("fade", 500);
        timeoutId = window.setTimeout(f, 5e3);
    }
    function f() {
        e("#hint").text("uh oh...").show("fade", 500);
        timeoutId = window.setTimeout(l, 5e3);
    }
    function l() {
        e("#hint").text("have you ever been on a website while it's having an existential crisis?").show("fade", 500);
        timeoutId = window.setTimeout(c, 1e4);
    }
    function c() {
        e("#hint").text("now you're just being cruel. i'm just trying to do my job.").show("fade", 500);
        timeoutId = window.setTimeout(h, 1e4);
    }
    function h() {
        e("#hint").text("come on. do me a solid and click one of the buttons. i'm getting anxious because you're just sitting there.").show("fade", 500);
        timeoutId = window.setTimeout(p, 1e4);
    }
    function p() {
        e("#hint").text("ok, i can't take it anymore. i refuse to play your mind games, visitor. here's some content.").show("fade", 500);
        timeoutId = window.setTimeout(d, 1e4);
    }
    function d() {
        e("galleryDiv, header h1, #portfolio, footer").show("slow").removeClass("hide");
        e("#hint").hide();
        resizeImg();
        timeoutId = window.setTimeout(v, 1e4);
    }
    function v() {
        e("#galleryDiv").text("BAM. now, in case you want to see some stuff, there's a box here to put that stuff in. (no pressure).");
        timeoutId = window.setTimeout(m, 1e4);
    }
    function m() {
        e("#galleryDiv").text("hey. thanks for letting me do stuff for you.");
        timeoutId = window.setTimeout(g, 1e4);
    }
    function g() {
        e("#galleryDiv").text("oh. and server wanted me to tell you he said it has been a pleasure to almost serve you, so far.");
        timeoutId = window.setTimeout(y, 1e4);
    }
    function y() {}
    timeoutId = window.setTimeout(n, 6e3);
    e(".workTypes").each(function() {
        worktypes.push(this);
    });
    e("article, footer").hide();
    e("header h1").replaceWith("<h1> :-) </h1>");
    e("header h1").delay(500).effect("fade", "easeOutQuart", 1e3, function() {
        e(this).hide().text("Andrew Luhring").show("slow");
        e("header h1").switchClass("hide", "unhide").show();
        e("#hint").css("visibility", "hidden");
    });
    e("#galleryDiv").addClass("hide");
    e(".workTypes").animate(boxShadowDown, 100);
    e("article").delay(2e3).show(1500, function() {
        e("footer").show(1500);
    });
    e(".workTypes").delay(3500).animate(boxShadowUp, 500);
    e(".workTypes").parent().click(function() {
        window.clearTimeout(timeoutId);
        e("#galleryDiv").removeClass("hide").show("blind", "slow");
        e("#hint").hide();
        e("#galleryDiv").text();
    });
});