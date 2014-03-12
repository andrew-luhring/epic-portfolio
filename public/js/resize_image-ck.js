var galDiv = document.getElementById("galleryDiv"), height = galDiv.innerHeight, width = galDiv.innerWidth, imgArray = [], imgs = document.getElementsByTagName("img"), section, timeoutIda, viewportWidth;

jQuery(document).ready(function(e) {
    function n() {
        viewportWidth = e(window).width();
        if (viewportWidth < 767) {
            var t = e("#galleryDiv");
            e("body").animate({
                scrollTop: 0
            }, "slow", "easeInOutQuint");
        }
        window.clearTimeout(timeoutIda);
    }
    function r() {
        var t = e("#galleryDiv").width(), r;
        for (var i = 0; i < imgArray.length; i++) {
            r = imgArray[i].width = t / imgs.length - 5;
            e("#galleryDiv a img").css({
                width: r + "px",
                height: "auto",
                "max-width": "315px"
            }, "slow");
        }
        viewportWidth = e(window).width();
        if (viewportWidth >= 767 && viewportWidth <= 1024) {
            if ((t / imgs.length - 5) * imgs.length <= t) {
                var s = parseFloat(e("#galleryDiv img").css("min-width")) * imgs.length;
                e("#galleryDiv").css("min-width", s);
            }
        } else if (viewportWidth < 767) {
            e("#galleryDiv").css("min-width", 240);
            timeoutIda = window.setTimeout(n, 2e3);
        }
    }
    for (var t = 0; t < imgs.length; t++) imgArray.push(imgs[t]);
    e(window).resize(function() {
        r();
    });
    e(".workTypes").click(function() {
        timeoutIda = window.setTimeout(r, 1e3);
    });
});