function init() {}

var lkOptions = {
    development: !0,
    title: "Identifying Strategic Implications in Accounting Data",
    school: "neu",
    course: "w02-m02",
    module: "ACCT6273-w02-m02",
    developer: "Andrew Luhring",
    showSlide: "drop",
    slideNumbers: !0,
    development: !0,
    currentPosition: 1
};

$(document).ready(function(e) {
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
                    }).text("Answer must be between 6.80 and 10.00;\nMaybe check your decimel? \nIt happens to the best of us ;-) ");
                }
                break;
              case 1:
                if (d >= s && d <= o && d.match(p)) {
                    e(".inputVar2").text(d);
                    var y = d * u;
                    e(".eq2Output1").text(y);
                    v = !0;
                    if (v === !0 && m === !0) {
                        e(this).addClass("nextSlide");
                        console.log(v + " " + m);
                    } else {
                        e(this).removeClass("nextSlide");
                        console.log(v + " " + m + " ano");
                    }
                } else {
                    e(".eq2Output1").text("error");
                    console.log("errora");
                    v = !1;
                }
                break;
              case 2:
                if (d >= s && d <= o && d.match(p)) {
                    e(".inputVar3").text(d);
                    var w = d * a;
                    e(".eq2Output2").text(w);
                    console.log("trueb");
                    m = !0;
                    if (v === !0 && m === !0) {
                        e(this).addClass("nextSlide");
                        console.log(v + " " + m);
                    } else {
                        e(this).removeClass("nextSlide");
                        console.log(v + " " + m + " bno");
                    }
                } else {
                    e(".eq2Output2").text("error");
                    console.log("errorb");
                    v = !1;
                    m = !1;
                    console.log(v + " " + m + " ab no");
                    e(this).removeClass("nextSlide");
                }
                break;
              default:
                console.log("error");
                e(this).hasClass("nextSlide") && e(this).removeClass("nextSlide");
            }
        }
    });
    e("body").lilkev(lkOptions);
});