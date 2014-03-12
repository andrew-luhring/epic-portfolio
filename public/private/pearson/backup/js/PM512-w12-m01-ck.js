function init() {}

var lkOptions = {
    title: "Identifying Strategic Implications in Accounting Data",
    school: "usc",
    course: "ACCT6273",
    module: "ACCT6273-w02-m02",
    developer: "Andrew",
    showSlide: "drop",
    slideNumbers: !0,
    development: !0,
    currentPosition: 2
};

$(document).ready(function(e) {
    var t = e.makeArray(e(".slide")), n = e.makeArray(e(".slide input:text")), r, i, s = /\d+/i;
    for (var o = 0; o < n.length; o++) {
        r = e(n[o]);
        i = r.parents(".slide");
        i.children(".next").addClass("calculate");
    }
    e(".calculate").click(function() {
        for (var t = 0; t < n.length; t++) {
            var r = e(n[t]).val();
            r.match(s) ? console.log(r) : console.log("invalid " + r);
        }
    });
    e("body").lilkev(lkOptions);
});