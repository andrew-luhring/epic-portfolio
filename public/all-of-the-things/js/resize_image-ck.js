function scrollUp() {
    viewportWidth = $(window).width();
    if (viewportWidth < 767) {
        var e = $("#galleryDiv");
        $("body").animate({
            scrollTop: 0
        }, "slow", "easeInOutQuint");
    }
    window.clearTimeout(timeoutIda);
}

function resizeImg() {
    var e = $("#galleryDiv").width(), t;
    for (var n = 0; n < imgArray.length; n++) {
        t = imgArray[n].width = e / imgs.length - 5;
        $("#galleryDiv a img").css({
            width: t + "px",
            height: "auto",
            "max-width": "315px"
        }, "slow");
    }
    viewportWidth = $(window).width();
    if (viewportWidth >= 767 && viewportWidth <= 1024) {
        if ((e / imgs.length - 5) * imgs.length <= e) {
            var r = parseFloat($("#galleryDiv img").css("min-width")) * imgs.length;
            $("#galleryDiv").css("min-width", r);
        }
    } else if (viewportWidth < 767) {
        $("#galleryDiv").css("min-width", 240);
        timeoutIda = window.setTimeout(scrollUp, 2e3);
    }
}

var galDiv = document.getElementById("galleryDiv"), height = galDiv.innerHeight, width = galDiv.innerWidth, imgArray = [], imgs = document.getElementsByTagName("img"), section, timeoutIda, viewportWidth;

jQuery(document).ready(function(e) {
    for (var t = 0; t < imgs.length; t++) imgArray.push(imgs[t]);
    e(window).resize(function() {
        resizeImg();
    });
    e(".workTypes").click(function() {
        timeoutIda = window.setTimeout(resizeImg, 1e3);
    });
});