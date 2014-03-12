/*

 ========= Notes ==========

 *- changed how lilkev options are set
 - lilkev automatically adds the draggable fix for touch devices
 - functions for hCenter and vCenter have been improved, shouldn't be as finicky
 - added a class to replace adding both hCenter and vCenter to a single element ( .center )
 - lilkev controls now control delve videos
 *- complete overhaul of hubs (see notes below)
 *- RE-added captions :/
 - added new functions (see notes below)
 - added new classes (see notes below)
 - restyled playbar using school colors
 - added popup bubble functionality
 - added hub flow diagram

 ========= Available Classes ==========
 $('.resetSlide') - given to a button to perform a single slide 'reset'.  Will reset html only, for resetting javascript, see the 'slideReset' trigger

 $('.hCenter') - will center the element horizontally in it's parent
 $('.vCenter') - will center the element vertically in it's parent
 $('.center') - will center both horizontally and vertically

 $('.gradient') - will apply a gradient using the school's main color

 ========= Available Functions ==========

 lkGradient( selector, color, starting point(0-1), ending point(0-1) )
 ex. lkGradient($('.button'), 'FFFFFF', 1, .5)
 applies a gradient to element, allowing more customization than simply assigning it the gradient class
 color and starting/ending point are optional, if not entered, will just default to school color

 getID( selector )
 ex. var id = getID($(this))
 finds the last one or two digits of an element's id to give only a number value
 useful for click and reveals, different slide navigation.

 centerMe( selector)
 ex. centerMe($('.center'))
 horizontally and vertically centers an element
 useful when the size of the element is dynamic

 lkBalloon($('#lk-btn-next img'), 'Click the next<br> arrow to continue')

 numbersOnly
 Allows only numbers to be entered in text input
 word
 *use on keydown*
 $('.myinput').keydown(numbersOnly)

 ========= Available Triggers ==========

 showSlide - occurs on every slide change, including slide1
 videoComplete - occurs after the current video has finished playing
 resetSlide - occurs after the reset button has been clicked ( used when resetting a single slide, must put all 'init' type javascript inside this function )

 *///////////////////////////////////////////////////////////////
///// End PluginDetect and begin BrowserDetect ///////////////
//////////////////////////////////////////////////////////////
function sendErrors(e) {
    function u(e) {
        return;
        var t, s, o;
    }
    return;
    var t, n, r, i, s, o;
}

function checkDate_Time(e) {
    return e < 10 ? "0" + e : e;
}

function reportBack(e) {}

function mmLog() {
    return;
    var e, t, n, r, i, s, o, u, a, f, l, c;
}

function lkInit(e) {
    slide = $(".slide");
    numberOfSlides = slide.length;
    settings = e;
    currentPosition = settings.currentPosition;
    currentSlide = $("#slide" + currentPosition);
    showSlide = settings.showSlide;
    hideSlide = settings.hideSlide;
    nextBtn = $("#lk-btn-next");
    prevBtn = $("#lk-btn-prev");
    returnBtn = $("#lk-btn-return");
    captionBtn = $("#lk-btn-caption");
    captionBox = $("#lk-caption-box");
    lkhubchart = $("#lk-hub-chart");
    theVideoControls = $(".lk-video-controls-container");
    resetBtn = $(".resetSlide");
    $(".jp-jplayer").each(function() {
        var e = $(this).attr("id").substr(15);
        $("#jquery_jplayer_" + e).jPlayer({
            ready: function() {
                $(this).jPlayer("setMedia", {
                    mp3: "audio/" + module + "-audio" + e + ".mp3",
                    oga: "audio/" + module + "-audio" + e + ".ogg"
                });
            },
            cssSelectorAncestor: "#jp_container_" + e + "",
            verticalVolume: !0
        });
    });
    Modernizr.touch && sweetCaroline();
    $("#slideNumbers").html("Slide: " + currentPosition + "/" + numberOfSlides);
    $("#lk-intro .begin").click(function() {
        $(this).animate({
            right: "-175"
        });
        $("#lk-intro .redBar").animate({
            left: "-600"
        }, hideIntro);
    });
    $("#lk-replay-icon").click(function() {
        location.reload();
    });
    $(".slide").hide();
    lkOptions.development == 1 && $("#slide" + currentPosition).show();
    $("#lk-btn-prev").hide();
    $("#lk-btn-return").hide();
    $(".lkAlert").hide();
    $("#lk-btn-hub-next").hide();
    $(".jp-audio").hide();
    $("#slide" + currentPosition).hasClass("audio") && $("#jp_container_" + currentPosition).show();
    currentPosition >= 2 ? prevBtn.show() : prevBtn.hide();
    $(".volume-slider-container").hide();
    $(".lk-video-controls-container").hide();
    $("#lk-caption-box").hide();
    $("#lk-balloon").hide();
    $("#lk-hub-chart").hide();
    $(".jp-jplayer").bind($.jPlayer.event.volumechange, volumeControl);
    $(".jp-jplayer").bind($.jPlayer.event.error, audioError);
    $(".volume-container").mouseenter(showVolumeSlider).mouseleave(hideVolumeSlider);
    $(".control").live("click", slideNavigation);
    $(".nextSlide").live("click", slideNavigation);
    $(".prevSlide").live("click", slideNavigation);
    $(".returnBtn").click(slideNavigation);
    $(".hub .button").click(hubNavigation);
    $(".lkAlert").click(closelkAlert);
    $("#lk-btn-caption").click(showCaptions);
    $("#lk-balloon").click(hideThis);
    $(".video-pause").hide();
    $(".video-volume-unmute").hide();
    $(".video-control").click(videoControls);
    $(".video-volume-bar").click(videoVolume);
    $(".video-progress").click(videoSeek);
    resetBtn.live("click", resetSlide);
    lkOptions.development == 1 && slideNavigation(currentPosition);
    $(".presentation").each(lkAnimate);
    init();
}

function setCenterFunctions() {
    $(".slide").show();
    $(".center").addClass("hCenter vCenter");
    $(".hCenter").each(hCenter);
    $(".vCenter").each(vCenter);
    $(".gradient").length > 0 && lkGradient($(".gradient"));
    $(".slide").hide();
    lkOptions.development == 1 && $("#slide" + currentPosition).show();
}

function hideIntro() {
    $("#lk-intro").delay(250).fadeOut(400, changeSlide);
    currentSlide.delay(200).fadeIn();
}

function slideNavigation(e) {
    if ($(".slide").is(":animated")) return;
    $(".jp-jplayer").jPlayer("pause");
    var t = currentPosition;
    $.isNumeric(e) && (currentPosition = e);
    if ($(this).is(".nextSlide")) if (currentSlide.is(".hubComplete")) {
        var n = currentSlide.parent(".hubContainer").next();
        n.is(".hubContainer") && (n = n.children(".hub"));
        currentPosition = getID(n);
    } else currentPosition++; else if ($(this).is(".prevSlide")) if (currentSlide.is(".hubSingle, .hubStart")) {
        var r = currentSlide.siblings(".hub");
        currentPosition = getID(r);
    } else if (currentSlide.prev().is(".hubContainer")) {
        var r = currentSlide.prev(".hubContainer").children(".hub");
        currentPosition = getID(r);
    } else if (currentSlide.parent(".hubContainer").prev().is(".hubContainer")) {
        var r = currentSlide.parent(".hubContainer").prev(".hubContainer").children(".hub");
        currentPosition = getID(r);
    } else currentPosition--; else if ($(this).is(".returnBtn")) {
        var r = currentSlide.siblings(".hub");
        currentPosition = getID(r);
    }
    var i = $("#slide" + currentPosition);
    if (showSlide == "bounce") {
        hideSlide == "" && (hideSlide = "fade");
        var s = {
            direction: "left",
            times: 3,
            distance: 10
        }, o = {
            direction: "right",
            times: 3,
            distance: 10
        };
    }
    if (showSlide == "clip") {
        hideSlide == "" && (hideSlide = "fade");
        var s = {
            direction: "horizontal"
        }, o = {
            direction: "horizontal"
        };
    }
    if (showSlide == "fade") {
        hideSlide == "" && (hideSlide = "fade");
        var s = {}, o = {};
    }
    if (showSlide == "slide" || showSlide == "drop") {
        hideSlide == "" && (hideSlide = showSlide);
        var s = {
            direction: "left"
        }, o = {
            direction: "right"
        };
    }
    if (t < currentPosition) var u = o, a = s; else var u = s, a = o;
    if (i.is(".fadeSlide")) {
        currentSlide.fadeOut().removeClass("currentSlide").addClass("unFresh");
        i.fadeIn(400, changeSlide);
    } else {
        currentSlide.hide(hideSlide, a, 400).removeClass("currentSlide").addClass("unFresh");
        i.show(showSlide, u, 450, changeSlide);
    }
    $("#lk-balloon").hide();
}

function hubNavigation() {
    var e = getID($(this));
    $(this).addClass("unFresh");
    slideNavigation(e);
}

function changeSlide() {
    currentSlide = $("#slide" + currentPosition);
    currentSlide.addClass("currentSlide");
    $(".slide").not(".currentSlide").hide();
    var e = currentSlide.attr("title") != null ? " - " + currentSlide.attr("title") : "";
    $("#lk-header").html(lkOptions.title + e);
    currentSlide.trigger("showSlide");
    showAudio(currentPosition);
    currentPosition == 1 ? prevBtn.hide() : prevBtn.show();
    currentSlide.is(".replaySlide") || currentSlide.is(".hideNext, .hub, .hubSingle, .hubReturn") ? nextBtn.hide() : nextBtn.show();
    currentSlide.is(".hubSingle, .hubReturn") && !currentSlide.is(".hideNext") ? returnBtn.show() : returnBtn.hide();
    if (currentSlide.is(".hub") && $(".currentSlide.hub .button").length == $(".currentSlide.hub .button.unFresh").length) {
        if (currentSlide.is(".hubComplete")) nextBtn.show(); else {
            nextBtn.show("pulsate", {
                times: 3
            });
            lkBalloon($("#lk-btn-next img"), "Click the next<br> arrow to continue");
        }
        currentSlide.addClass("hubComplete");
    }
    if (settings.hubChart != 0) {
        $(".lk-hub-chart").hide();
        var t = $(".hubContainer").children(".slide").length;
        lkhubchart.html("");
        if (currentSlide.is(".hubSingle")) lkhubchart.append('<div class="lkhc active"></div>').show(); else if (currentSlide.is(".hubStart")) {
            lkhubchart.append('<div class="lkhc active"></div>');
            currentSlide.nextUntil(".hubReturn").each(function() {
                lkhubchart.append('<div class="lkhc"></div>');
            });
            lkhubchart.append('<div class="lkhc"></div>').show();
        } else if (currentSlide.is(".hubReturn")) {
            lkhubchart.append('<div class="lkhc active"></div>');
            currentSlide.prevUntil(".hubStart").each(function() {
                lkhubchart.prepend('<div class="lkhc"></div>');
            });
            lkhubchart.prepend('<div class="lkhc"></div>').show();
        } else if (currentSlide.parent().is(".hubContainer") && currentSlide.is(":not(.hub)")) {
            currentSlide.prevUntil(".hubStart").each(function() {
                lkhubchart.append('<div class="lkhc"></div>');
            });
            lkhubchart.append('<div class="lkhc"></div>').append('<div class="lkhc active"></div>');
            currentSlide.nextUntil(".hubReturn").each(function() {
                lkhubchart.append('<div class="lkhc"></div>');
            });
            lkhubchart.append('<div class="lkhc"></div>').show();
        }
        currentSlide.parent().is(".hubContainer") && currentSlide.is(":not(.hub)") ? $("#slideNumbers").hide() : $("#slideNumbers").html("Slide: " + currentPosition + "/" + numberOfSlides).show();
    } else $("#slideNumbers").html("Slide: " + currentPosition + "/" + numberOfSlides);
    $(".videoSlide").html("");
    currentSlide.is(".videoSlide") ? Modernizr.touch ? currentSlide.html('<iframe frameborder="0" width="800" height="420" name="inlineframe" scrolling="no" src="http://link.delvenetworks.com/media/?mediaId=' + $("#slide" + currentPosition).data("media") + '&width=800&height=420&playerForm=298cb0709e6e4c928e3c465240f88fef" ></iframe>') : currentSlide.html('<object width="800" height="420" id="limelight_player_919144o" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="https://assets.delvenetworks.com/player/loader.swf"/><param name="wmode" value="opaque"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="flashvars" value="playerForm=298cb0709e6e4c928e3c465240f88fef&amp;mediaId=' + $("#slide" + currentPosition).data("media") + '"/><embed src="https://assets.delvenetworks.com/player/loader.swf" name="limelight_player_919144e" wmode="opaque" width="800" height="420" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" flashvars="playerForm=298cb0709e6e4c928e3c465240f88fef&amp;mediaId=' + $("#slide" + currentPosition).data("media") + '"></embed></object>') : theVideoControls.hide();
    delvePlayerCallback();
}

function showAudio(e) {
    $(".jp-jplayer").jPlayer("pause");
    $(".jp-audio").hide();
    $("#jp_container_" + e).show();
    $("#jquery_jplayer_" + e).hasClass("fresh") && $("#jquery_jplayer_" + e).jPlayer("play").removeClass("fresh");
    if ($("#jp_container_" + e).data("caption") != undefined) {
        captionBtn.show();
        captionBox.html($("#jp_container_" + e).data("caption"));
    } else if ($("#slide" + e).data("caption") != undefined) {
        captionBtn.show();
        captionBox.html($("#slide" + e).data("caption"));
    } else {
        captionBtn.hide();
        captionBox.filter(":visible").hide("slide", {
            direction: "down"
        }, 500);
    }
    $(".lk-volume-slider-container").hide();
}

function showCaptions() {
    if ($(".jp-audio:visible").length >= 1) {
        var e = $(".jp-audio:visible").attr("id").slice(13);
        captionBox.html($("#jp_container_" + e).data("caption")).toggle("slide", {
            direction: "down"
        }, 500);
    } else {
        var e = currentSlide.attr("id");
        captionBox.html($("#" + e).data("caption")).toggle("slide", {
            direction: "down"
        }, 500);
    }
}

function showVolumeSlider() {
    $(this).children(".volume-slider-container").stop(!0, !1).delay(100).fadeIn(100);
}

function hideVolumeSlider() {
    $(this).children(".volume-slider-container").stop(!0, !1).fadeOut(200);
}

function volumeControl() {
    var e = $(this).attr("id").slice(15);
    if ($("#jp_container_" + e).is(":hidden")) return;
    var t = $("#jp_container_" + e + " .jp-volume-bar-value").height();
    t /= 100;
    t == 0 && $(".jp-jplayer").jPlayer("mute");
    t == 1 && $(".jp-jplayer").jPlayer("unmute");
    t != 0 && t != 1 && $(".jp-jplayer").jPlayer("volume", t);
}

function audioError(e) {
    var t = $(this).attr("id").slice(15);
    if (userbrowser.indexOf("Firefox") >= 0) var n = ".ogg"; else var n = ".mp3";
    if (e.jPlayer.error.type == "e_url") var r = {
        error: "audio" + t + n + " is not found.",
        browser: userbrowser
    }; else var r = {
        error: "audio" + t + " " + e.jPlayer.error.type,
        browser: userbrowser
    };
    sendErrors(r);
}

function resetSlide(e) {
    e.preventDefault();
    var t = window.location.href + "?ID=" + Math.random();
    setTimeout(function() {
        currentSlide.load(t + " #slide" + currentPosition + ">*", "", function() {
            currentSlide.trigger("resetSlide");
            currentSlide.children(".hCenter").each(hCenter);
            currentSlide.children(".vCenter").each(vCenter);
            centerMe(currentSlide.children(".center"));
        });
    }, 100);
}

function getID(e) {
    var e = parseInt(e.attr("id").slice(-2).replace(/[a-zA-Z]+/g, ""));
    return e;
}

function centerMe(e) {
    var e = $(this);
    hCenter($(this));
    vCenter($(this));
}

function hCenter(e) {
    if (jQuery.type(e) == "number") e = $(this); else if (jQuery.type(e) != "object") return;
    var t = e.width(), n = parseInt(e.css("padding-left").slice(0, -2)) + parseInt(e.css("padding-right").slice(0, -2)), r = e.parent().width(), i = (r - (t + n)) / 2 + "px";
    e.css({
        left: i
    });
}

function vCenter(e) {
    if (jQuery.type(e) == "number") e = $(this); else if (jQuery.type(e) != "object") return;
    var t = e.height(), n = parseInt(e.css("padding-top").slice(0, -2)) + parseInt(e.css("padding-bottom").slice(0, -2)), r = e.parent().height(), i = (r - (t + n)) / 2 + "px";
    e.css({
        top: i
    });
}

function hideThis() {
    $(this).fadeOut();
}

function lkBalloon(e, t) {
    var n = $("#lk-balloon"), r = {}, i = e.width(), s = e.height(), o = e.offset(), u = o.top, a = o.left;
    i > 200 && (a += i / 2);
    n.fadeIn().removeClass().addClass("gradient").html("").html(t);
    var f = n.outerWidth(!0), l = n.outerHeight(!0);
    if (a > 600) {
        var c = a - f - 20;
        r.hor = "right";
    } else if (a > 200) {
        var c = a - f / 2;
        r.hor = "mid";
    } else {
        var c = a + i + 24;
        r.hor = "left";
    }
    if (u > 210) {
        var h = u - l;
        r.vert = "bot";
    } else {
        var h = u + s;
        r.vert = "top";
    }
    n.append('<img src="skin/balloon-' + r.vert + "-" + r.hor + '.png" id="lk-balloon-arrow" class="' + r.vert + "-" + r.hor + '" />');
    r.hor == "mid" && $("#lk-balloon-arrow").css({
        left: f / 2 - 9
    });
    n.css({
        left: c,
        top: h
    });
}

function lkAlert(e) {
    $(".lkAlert.message").html(e);
    $(".lkAlert.modal").css({
        opacity: ".5"
    });
    $(".lkAlert").show();
}

function closelkAlert() {
    $(".lkAlert").fadeOut(400);
}

function centerText() {
    var e = "#" + $(this).attr("id");
    $(".slide").show();
    var t = $(e).html();
    t = '<div class="ctxt">' + t + "</div>";
    $(e).html(t);
    var n = $(e + " .ctxt").height(), r = $(e).height(), i = (r - n) / 2 + "px", s = r - i.slice(0, -2) + "px";
    $(e).css({
        "padding-top": i,
        height: s
    });
    t = $(e + " .ctxt").html();
    $(e).html(t);
    $(".slide").not(".currentSlide").hide();
}

function lkAnimate() {
    var e = {
        timing: {},
        hideEm: !1,
        animation: "fade",
        showOptions: {},
        hideOptions: {},
        duration: 600,
        startHidden: !0,
        setReturn: !1,
        fixMultiples: !1
    }, t = $(this).data();
    if (t.timing == null) return;
    var t = $.extend(e, t), n = $(this).attr("id"), r = e.timing, s = e.duration, o = e.animation, u = e.showOptions, a = e.hideOptions, f = e.hideEm, l = e.startHidden, c = Object.size(r), h = e.onEnded, p = e.onReplay, d = e.fixMultiples;
    $(this).hasClass("slide") ? i = n.slice(-2).replace(/[a-zA-Z]+/g, "") : i = n;
    var v = [], m = [];
    $.each(r, function(e, t) {
        v.push(e);
        m.push(t);
        l == 1 && $("#" + e).hide();
        if (d == 0) return;
        if ($("#" + e).length == 0) {
            var r = e.slice(0, -2), i = document.getElementById(r).className;
            $("#" + n).append('<div id="' + e + '" class="' + i + '" style=" display: none; "></div>');
        }
    });
    h && $("#jquery_jplayer_" + i).bind($.jPlayer.event.ended, h);
    $("#jquery_jplayer_" + i).bind($.jPlayer.event.timeupdate, function(t) {
        $.each(v, function(n, r) {
            function S(e) {
                $.each(e, function(e, t) {
                    $("#" + t).hide();
                });
            }
            function x(e) {
                $.each(e, function(e, t) {
                    $("#" + t).show();
                });
            }
            var l = $("#" + r), c = m[n], h = v[n + 1], d = m[n + 1], g = v[n - 1], y = [], b = [];
            $.each(v, function(e, t) {
                e < n ? y.push(t) : e > n && b.push(t);
            });
            var w = {
                me: l,
                beforeMe: y,
                afterMe: b
            };
            if (p && t.jPlayer.status.currentTime == 0) p(); else if ($.type(h) == "undefined") var E = t.jPlayer.status.currentTime >= c; else if ($.type(h) != "undefined") var E = t.jPlayer.status.currentTime >= c && t.jPlayer.status.currentTime <= d;
            if (E) {
                l.trigger("audioTrigger", [ w ]);
                if (e.setReturn == 1) return;
                S(b);
                l.parents().show();
                if (f != 1) {
                    x(y);
                    $("#" + g).show();
                    !$("#jquery_jplayer_" + i).is("unFresh");
                }
                if (o == "fade") {
                    if (f == 1) {
                        S(y);
                        $("#" + g + ":visible").fadeOut(s);
                    }
                    !l.is(":animated") && !l.is(":visible") && l.fadeIn(s);
                } else {
                    if (f == 1) {
                        S(y);
                        $("#" + g + ":visible").hide(o, a, s);
                    }
                    !l.is(":animated") && !l.is(":visible") && $(l).show(o, u, s);
                }
            }
        });
    });
}

function lkGradient(e, t, n, r) {
    var t = schoolColors[lkOptions.school.toLowerCase()] || !0, n = 1, r = .5;
    parseInt(t, 16);
    t.toString(16);
    if (e.is(".lk-ac")) {
        n = 1;
        r = .75;
    }
    var i = rgbit(t, n), s = rgbit(t, r), o = rgbToHex(s.slice(4, -1));
    e.css({
        background: i
    });
    e.css({
        background: "-moz-linear-gradient(top," + i + " 0%," + s + " 100%)"
    });
    e.css({
        background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%, " + i + "), color-stop(100%, " + s + "))"
    });
    e.css({
        background: "-webkit-linear-gradient(top, " + i + " 0%, " + s + " 100%)"
    });
    e.css({
        background: "-ms-linear-gradient(top, " + i + " 0%, " + s + " 100%)"
    });
    e.css({
        background: "linear-gradient(to bottom, " + i + " 0%, " + s + " 100%)"
    });
    e.css({
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr= #" + t + ", endColorstr=" + o + ", GradientType=0 )"
    });
}

function componentToHex(e) {
    var t = e.toString(16);
    return t.length == 1 ? "0" + t : t;
}

function rgbToHex(e) {
    e = e.split(", ");
    var t = e[0], n = e[1], r = e[2];
    return "#" + componentToHex(t) + componentToHex(n) + componentToHex(r);
}

function rgbit(e, t) {
    var n = e.substring(0, 2), r = e.substring(2, 4), i = e.substring(4, 6), s = Math.round(parseInt(n, 16) * t), o = Math.round(parseInt(r, 16) * t), u = Math.round(parseInt(i, 16) * t), a = "rgb(" + s + ", " + o + ", " + u + ")";
    return a;
}

function videoSeek(e) {
    var t = $(this).width(), n = $(this).offset(), r = n.left, i = e.pageX, s = i - r, o = s / t;
    DelvePlayer.doSeekToRatio(o);
    $(".video-play-bar").width(s);
}

function videoVolume(e) {
    var t = $(this).height(), n = $(this).offset(), r = n.top, i = e.pageY, s = t - (i - r), o = s / t;
    $(".video-volume-bar-value").height(s);
    DelvePlayer.doSetVolume(o);
    vidVol = o;
}

function videoControls() {
    $(this).is(".video-play") && DelvePlayer.doPlay();
    $(this).is(".video-pause") && DelvePlayer.doPause();
    if ($(this).is(".video-volume-mute")) {
        $(this).hide();
        $(".video-volume-unmute").show();
        DelvePlayer.doSetVolume(0);
        $(".video-volume-bar-value").height(0);
    }
    if ($(this).is(".video-volume-unmute")) {
        $(this).hide();
        $(".video-volume-mute").show();
        DelvePlayer.doSetVolume(vidVol);
        $(".video-volume-bar-value").height(vidVol * 100);
    }
}

function delvePlayerCallback(e, t, n) {
    var r = "limelight_player_919144o";
    t == "onPlayerLoad" && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0) && DelvePlayer.registerPlayer(r);
    switch (t) {
      case "onPlayheadUpdate":
        var i = Math.round(n.positionInMilliseconds / 1e3), s = Math.round(n.durationInMilliseconds / 1e3), o = n.positionInMilliseconds / n.durationInMilliseconds * 100;
        $(".video-current-time").html(convertTime(i));
        $(".video-duration").html(convertTime(s));
        $(".video-play-bar").css({
            width: o + "%"
        });
        videoStop[currentPosition] = o;
        break;
      case "onPlayStateChanged":
        if (n.isPlaying == 1) {
            $(".video-play").hide();
            $(".video-pause").show();
        } else {
            $(".video-play").show();
            $(".video-pause").hide();
        }
        break;
      case "onError":
        if ($("body").is(".development")) return;
        var u = {
            error: "Video" + currentPosition + ": " + n.message,
            browser: userbrowser
        };
        sendErrors(u);
        break;
      case "onMediaLoad":
        $(".video-play").show();
        $(".video-pause").hide();
        theVideoControls.show();
        var o = videoStop[currentPosition], a = o * .01;
        DelvePlayer.doSeekToRatio(a);
        DelvePlayer.doPause();
        $(".video-play-bar").css({
            width: o + "%"
        });
        var f = DelvePlayer.doGetVolume();
        $(".video-volume-bar-value").height(f * 100);
        break;
      case "onMediaComplete":
        currentSlide.trigger("videoComplete");
    }
}

function convertTime(e) {
    minutes = parseInt(e / 60) % 60;
    seconds = e % 60;
    result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
}

function touchHandler(e) {
    var t = e.changedTouches, n = t[0], r = "";
    switch (e.type) {
      case "touchstart":
        r = "mousedown";
        break;
      case "touchmove":
        r = "mousemove";
        break;
      case "touchend":
        r = "mouseup";
        break;
      default:
        return;
    }
    var i = document.createEvent("MouseEvent");
    i.initMouseEvent(r, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null);
    n.target.dispatchEvent(i);
    var s = $(e.target);
    s.hasClass("ui-draggable") && e.preventDefault();
}

function sweetCaroline() {
    document.addEventListener("touchstart", touchHandler, !0);
    document.addEventListener("touchmove", touchHandler, !0);
    document.addEventListener("touchend", touchHandler, !0);
    document.addEventListener("touchcancel", touchHandler, !0);
}

function hide_preloader() {
    $("#lk-preloader").delay(1e3).fadeOut();
}

function getUrlVars() {
    var e = {}, t = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(t, n, r) {
        e[n] = r;
    });
    return e;
}

function numbersOnly(e) {
    var t = e.keyCode;
    (t < 48 || t > 57) && (t < 96 || t > 105) && t != 8 && t != 190 && t != 110 && t != 46 && e.preventDefault();
}

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e[t].string, r = e[t].prop;
            this.versionSearchString = e[t].versionSearch || e[t].identity;
            if (n) {
                if (n.indexOf(e[t].subString) != -1) return e[t].identity;
            } else if (r) return e[t].identity;
        }
    },
    searchVersion: function(e) {
        var t = e.indexOf(this.versionSearchString);
        if (t == -1) return;
        return parseFloat(e.substring(t + this.versionSearchString.length + 1));
    },
    dataBrowser: [ {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Internet Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    } ],
    dataOS: [ {
        string: navigator.platform,
        subString: "Win",
        identity: "PC"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.userAgent,
        subString: "iPad",
        identity: "iPad"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    } ]
};

BrowserDetect.init();

OS = BrowserDetect.OS;

browserName = BrowserDetect.browser;

browserVersion = parseInt(BrowserDetect.version);

var userbrowser = browserName + " " + browserVersion + " for " + OS, errorlist = {}, errorcount = 1, url = window.location.href;

window.onerror = function(e, t, n) {
    if ($("body").is(".development")) return;
    var r = t.replace("https://lmscontent.embanet.com/Multimedia/", ""), i = {
        error: e + " (" + r + ", line " + n + ")",
        browser: userbrowser
    };
    sendErrors(i);
};

var lastError = 1, errorCount = 1, currentList = {}, dbDriven = !1;

$(function() {
    $("body").lilkev(lkOptions);
});

(function(e) {
    e.fn.lilkev = function(t) {
        var n = navigator.userAgent.match(/iPad/i) != null, r = navigator.userAgent.match(/android/i) != null;
        url = e(document).attr("href");
        var i = {
            development: !1,
            height: "480",
            title: "TITLE",
            course: "COURSE",
            module: "MODULE",
            fadeSlides: !1,
            school: "hk",
            slideNumbers: !0,
            developer: "",
            showSlide: "drop",
            hideSlide: "",
            hubChart: !0,
            currentPosition: 1
        }, t = e.extend(i, t);
        return this.each(function() {
            function l(e) {
                var e = parseInt(e.attr("id").slice(-2).replace(/[a-zA-Z]+/g, ""));
                return e;
            }
            var n = e(this);
            introTitle = e("#lk-intro .redBar");
            var r = e("#lk-intro");
            footer = e("#lk-footer");
            header = e("#lk-header");
            slide = e(".slide");
            slideLength = slide.length;
            audioSlide = e(".audioSlide");
            audioSlideLength = audioSlide.length;
            currentPosition = i.currentPosition;
            theTitle = i.title;
            school = i.school.toLowerCase();
            course = i.course;
            module = i.module;
            developer = i.developer;
            slidesContainer = e(".slidesContainer");
            actHeight = i.height;
            skinFolder = "https://lmscontent.embanet.com/Multimedia/LK_Assets/skin/";
            prev = '<div class="control prevSlide" id="lk-btn-prev"><div class="lk-control-container lk-ac gradient"><img src="skin/prev.png"  /></div></div>';
            next = '<div class="control nextSlide" id="lk-btn-next"><div class="lk-control-container lk-ac gradient"><img src="skin/next.png"  /></div></div>';
            hubReturn = '<div class="control returnBtn" id="lk-btn-return"><div class="lk-control-container lk-ac gradient"><img src="skin/return.png"  /></div></div>';
            hubNext = '<div class="control nextSlide" id="lk-btn-hub-next"></div>';
            caption = '<div id="lk-btn-caption" class="button lk-ac gradient" ><img src="skin/caption.png"  /></div><div id="lk-caption-box"></div>';
            audioControls = '<div class="jp-type-single">								<div class="jp-gui jp-interface">									<ul class="jp-controls">										<li> <a href="javascript:;" class="jp-play unselectable gradient lk-ac" tabindex="1"> <img src="skin/play.png" /> </a>	</li>										<li> <a href="javascript:;" class="jp-pause unselectable gradient lk-ac" tabindex="1"> <img src="skin/pause.png" /> </a> </li>										<li> <a href="javascript:;" class="jp-mute lk-ac" tabindex="1" title="mute"> </a> </li>										<li> <a href="javascript:;" class="jp-unmute lk-ac" tabindex="1" title="unmute"> </a> </li>									</ul>									<div class="jp-progress">										<div class="jp-seek-bar">											<div class="jp-play-bar">												<div class="gradient lk-ac"></div>											</div>										</div>									</div>									<div class="lk-volume-container volume-container">										<div class="lk-volume jp-mute gradient lk-ac">											<img src="skin/volume.png" />										</div>										<div class="jp-unmute gradient lk-ac">											<img src="skin/volume-muted.png" />										</div>										<div class="lk-volume-slider-container volume-slider-container">											<div class="jp-volume-bar">												<div class="jp-volume-bar-value gradient lk-ac"><!--<img src="skin/volume-slider.png" />--></div>											</div>										</div>									</div>									<div class="jp-time-holder">										<div class="jp-current-time"></div>										<div class="jp-duration"></div>									</div>								</div>								<div class="jp-no-solution"> <span>Update Required</span> To play the media you will need to either update your browser to a recent version or update your <a href="https://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a> </div>							</div>';
            videoControlsContainer = '<div class="lk-video-controls-container">										<div class="gradient lk-ac video-control video-play"> <img src="skin/play.png" /> </div>										<div class="gradient lk-ac video-control video-pause"> <img src="skin/pause.png" /> </div>										<div class="video-progress">											<div class="video-play-bar">												<div class="gradient lk-ac"></div>											</div>										</div>										<div class="video-volume-container volume-container">											<div class="gradient lk-ac video-control video-volume-mute"> <img src="skin/volume.png" /> </div>											<div class="gradient lk-ac video-control video-volume-unmute"> <img src="skin/volume-muted.png" /> </div>											<div class="video-volume-slider-container volume-slider-container">												<div class="video-volume-bar">													<div class="video-volume-bar-value gradient lk-ac"></div>												</div>											</div>										</div>										<div class="video-time-holder">											<div class="video-current-time"></div>											<div class="video-duration"></div>										</div>									</div>';
            replayScreen = '<div id="lk-replay-box">If you would like to go through this activity again, simply click the Replay button, and you will be returned to the beginning.</div><div id="lk-replay-icon" class="button"><img src="skin/btn-replay-front.png" id="lk-replay-spin" alt="replay" height="91px" width="91px" /></div>';
            if (developer != "") {
                var s = e("#styleCSS");
                e("#skinCSS").after("<link rel='stylesheet' href='" + skinFolder + developer + ".css' type='text/css'>");
                setTimeout(setCenterFunctions, 1e3);
            } else setCenterFunctions();
            e(document).attr({
                title: i.title
            });
            if (i.development == 0) {
                n.prepend('<div id="lk-intro"><div class="redBar"><span>' + i.title + '</span></div><img src="' + skinFolder + 'begin_btn.jpg" class="begin button" /></div>');
                e("#lk-intro .redBar").css({
                    background: "url(" + skinFolder + "intro_title_" + school + ".png) no-repeat"
                });
                var o = e("#lk-intro").css("background-image");
                if (o == "none") {
                    var u = new Image;
                    u.onload = function() {
                        e("#lk-intro").css({
                            background: "url(" + skinFolder + "intro_bg_" + school + "_" + course + ".jpg) no-repeat center center"
                        });
                    };
                    u.onerror = function() {
                        e("#lk-intro").css({
                            background: "url(" + skinFolder + "intro_bg_" + school + ".jpg) no-repeat center center"
                        });
                    };
                    u.src = "" + skinFolder + "intro_bg_" + school + "_" + course + ".jpg";
                }
            }
            header.html(i.title);
            header.css({
                background: "url(" + skinFolder + "header_" + school + ".png) no-repeat"
            });
            footer.append(caption).append(next).append(prev).append(hubReturn).append(hubNext).append(videoControlsContainer).append('<div id="lk-hub-chart" ></div>');
            i.slideNumbers == 1 && footer.append('<div id="slideNumbers"></div>');
            var a = slidesContainer.css("background-image");
            if (a == "none" || a == "none ") {
                var f = new Image;
                f.onload = function() {
                    slidesContainer.css({
                        background: "url(" + skinFolder + "bg_" + school + "_" + course + ".jpg) no-repeat center center"
                    });
                };
                f.onerror = function() {
                    slidesContainer.css({
                        background: "url(" + skinFolder + "bg_" + school + ".jpg) no-repeat center center"
                    });
                };
            }
            slidesContainer.append('<div class="slide replaySlide" id="slide' + (slideLength + 1) + '">' + replayScreen + "</div>");
            e(".presentation").each(function() {
                e(this).addClass("audio");
            });
            e(".audio").each(function() {
                var t;
                e(this).hasClass("slide") ? t = e(this).attr("id").substr(5, 2) : t = e(this).attr("id");
                footer.append('<div id="jp_container_' + t + '" class="jp-audio"></div>').append('<div id="jquery_jplayer_' + t + '" class="jp-jplayer fresh"></div>');
            });
            e(".hubContainer").each(function() {
                e(this).children(".slide:first").addClass("hub");
                e(".hub .button").each(function() {
                    var t = parseInt(e(this).attr("id").slice(-2).replace(/[a-zA-Z]+/g, ""));
                    e("#slide" + t).addClass("hubStart");
                });
                e(".slide").each(function() {
                    var t = l(e(this));
                    if (e(this).is(".hubStart")) {
                        var n = e(this).nextAll(".hubStart").filter(":first");
                        if (n.length != 0) {
                            n = l(n);
                            n - t == 1 ? e(this).removeClass("hubStart").addClass("hubSingle") : e("#slide" + (n - 1)).addClass("hubReturn");
                        } else {
                            var n = e(this).nextAll(".slide").filter(":last");
                            n.length != 0 ? n.addClass("hubReturn") : e(this).removeClass("hubStart").addClass("hubSingle");
                        }
                    }
                });
            });
            e("#lk-preloader").css({
                height: actHeight + "px"
            });
            e("#lk-intro").css({
                height: actHeight + "px"
            });
            e(".slidesContainer").css({
                height: actHeight - 60 + "px"
            });
            e(".slide").css({
                height: actHeight - 60 + "px"
            });
            e("#lk-footer").css({
                top: actHeight - 30 + "px"
            });
            e("body").append('<div id="lk-balloon" class="gradient"></div>');
            e(".jp-audio").append(audioControls);
            e("#slide" + currentPosition).addClass("currentSlide");
            lkInit(t);
            return t;
        });
    };
})(jQuery);

var mouseStatus = "up", firstDigit = 0, secondDigit = 0, slide = $(".slide");

schoolColors = {
    usc: "990000",
    mvu: "AD0202",
    hu: "000066",
    usf: "006633",
    cc: "005693",
    cwru: "0a304e",
    gw: "002147",
    nu: "CC0001",
    neu: "CC0001",
    ou: "00694E",
    pep: "024E8A",
    ua: "CC0033",
    uf: "0021A5",
    vu: "997F3D",
    wfu: "987E39",
    wne: "0048AB",
    wsu: "981F32"
};

$("#lk-header").mousedown(function() {
    mouseStatus = "down";
}).mouseup(function() {
    mouseStatus = "up";
    if (secondDigit == 0 && firstDigit == 0) return !1;
    var e = parseInt(secondDigit + "" + firstDigit);
    secondDigit == 0 && (e = parseInt(firstDigit));
    slideNavigation(e);
    firstDigit = 0;
    secondDigit = 0;
}).mouseleave(function() {
    mouseStatus = "up";
    firstDigit = 0;
    secondDigit = 0;
});

$(document).keydown(function(e) {
    if (mouseStatus == "down") {
        secondDigit = firstDigit;
        firstDigit = e.keyCode - 48;
    }
});

videoStop = {};

vidVol = 1;

Object.size = function(e) {
    var t = 0, n;
    for (n in e) e.hasOwnProperty(n) && t++;
    return t;
};