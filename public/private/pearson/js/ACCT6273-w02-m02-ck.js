function init() {}

var lkOptions = {
    development: !0,
    title: "Identifying Strategic Implications in Accounting Data",
    height: "auto",
    school: "neu",
    course: "ACCT6273",
    module: "ACCT6273-w02-m02",
    developer: "Andrew Luhring",
    slideNumbers: !0,
    fadeSlides: !0,
    hideControls: !0
};

$(document).ready(function(e) {
    function y() {
        e("#lk-intro").removeClass("hide");
        e("#lk-header").after(e("#lk-intro"));
        e("#lk-footer").addClass("hide");
    }
    function b(t, n) {
        var r = t.find("tr:has(td)"), i = String.fromCharCode(11), s = String.fromCharCode(0), o = '","', u = '"\r\n"', a = '"' + r.map(function(t, n) {
            var r = e(n), s = r.find("td");
            return s.map(function(t, n) {
                var r = e(n), i = r.text();
                return i.replace('"', '""');
            }).get().join(i);
        }).get().join(s).split(s).join(u).split(i).join(o) + '"', f = "data:application/csv;charset=utf-8," + encodeURIComponent(a);
        e(this).attr({
            download: n,
            href: f,
            target: "_blank"
        });
    }
    var t = 15, n = 20, r = 6.8, i = 10, s = 0, o = 7e5, u, a, f = e.makeArray(e(".slide")), l = e.makeArray(e(".slide input:text")), c, h, p = /\d+/i, d = [], v, m;
    hide_preloader();
    for (var g = 0; g < l.length; g++) {
        c = l[g];
        h = e(c).parents(".slide");
        e(h).addClass("hasInput");
        d.push(h);
        e(h).children(".next").addClass("calculate");
    }
    for (var g = 0; g < f.length; g++) {
        h = f[g];
        e(h).hasClass("hasInput") || e(h).children(".next").addClass("nextSlide");
    }
    e(".eq1Var1").text(t);
    e(".eq1Var2").text(n);
    e("#lk-intro").addClass("hide");
    setTimeout(y, 1);
    e(".slidesContainer").click(function() {
        e("#lk-footer").hasClass("hide") && e("#lk-footer").removeClass("hide");
    });
    e("input").keydown(numbersOnly);
    e(".calculate").click(function() {
        e("#limitLow").text(r);
        e("#limitHigh").text(i);
        var f = e(this).parents(".slide").attr("id");
        for (var h = 0; h < l.length; h++) {
            c = e(l[h]);
            var d = c.val(), g = c.parents(".slide").attr("id");
            if (g === f) switch (h) {
              case 0:
                if (d >= r && d <= i && d.match(p)) {
                    e(".inputVar1, .eq1Var1a, .eq1Var2a").text(d);
                    u = t - d;
                    a = n - d;
                    e(".eq1Output1").text(u);
                    e(".eq1Output2").text(a);
                    e(this).addClass("nextSlide");
                } else {
                    e(this).hasClass("nextSlide") && e(this).removeClass("nextSlide");
                    e(".eq1Output1").text("error");
                    e(".eq1Output2").text("error");
                    e("#dialog").dialog({
                        modal: !0,
                        dialogClass: "dialog",
                        closeOnEscape: !0,
                        closeText: "click to close",
                        hide: "slide",
                        show: "slide"
                    }).text("Please enter a number between 6.80 and 10.00;");
                }
                break;
              case 1:
                if (d >= s && d <= o && d.match(p)) {
                    e(".inputVar2").text(d);
                    var y = d * u;
                    e(".eq2Output1").text(y);
                    v = !0;
                    v === !0 && m === !0 ? e(this).addClass("nextSlide") : e(this).removeClass("nextSlide");
                } else {
                    e(".eq2Output1").text("error");
                    e("#dialog").dialog({
                        modal: !0,
                        dialogClass: "dialog",
                        closeOnEscape: !0,
                        closeText: "click to close",
                        hide: "slide",
                        show: "slide"
                    }).text("You have to enter in your estimate for the Volume for Competitors if Lillie Tissages is at FF 20, and the competitors are at FF 15!");
                    v = !1;
                }
                break;
              case 2:
                if (d >= s && d <= o && d.match(p)) {
                    e(".inputVar3").text(d);
                    var b = d * a;
                    e(".eq2Output2").text(b);
                    m = !0;
                    v === !0 && m === !0 ? e(this).addClass("nextSlide") : e(this).removeClass("nextSlide");
                } else {
                    e(".eq2Output2").text("error");
                    v = !1;
                    m = !1;
                    e(".eq2Output1").text("error");
                    e("#dialog").dialog({
                        modal: !0,
                        dialogClass: "dialog",
                        closeOnEscape: !0,
                        closeText: "click to close",
                        hide: "slide",
                        show: "slide"
                    }).text("You have to enter in your estimate for the Volume for Competitors if Lillie Tissages is at FF 20, and the competitors are at FF 20!");
                    e(this).removeClass("nextSlide");
                }
                break;
              default:
                e(this).hasClass("nextSlide") && e(this).removeClass("nextSlide");
            }
        }
    });
});

$(document).ready(function() {
    $(".export").on("click", function(e) {
        exportTableToCSV.apply(this, [ $("#slide5 .clipboard > table"), "tables.csv" ]);
    });
});