/*
 Shadow animation 20120928
 http://www.bitstorm.org/jquery/shadow-animation/
 Copyright 2011, 2012 Edwin Martin <edwin@bitstorm.org>
 Contributors: Mark Carver, Xavier Lepretre
 Released under the MIT and GPL licenses.
*/
jQuery(function (d, y) {
    function w(d) {
        var g, k, u = {};
        if (g = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(d)) k = [parseInt(g[1], 16), parseInt(g[2], 16), parseInt(g[3], 16), 1];
        else if (g = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(d)) k = [17 * parseInt(g[1], 16), 17 * parseInt(g[2], 16), 17 * parseInt(g[3], 16), 1];
        else if (g = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(d)) k = [parseInt(g[1], 10), parseInt(g[2], 10), parseInt(g[3], 10), 1];
        else if (g = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(d)) k = [parseInt(g[1], 10), parseInt(g[2], 10), parseInt(g[3], 10), parseFloat(g[4])];
        u = (g = /(-?[0-9]+)(?:px)?\s+(-?[0-9]+)(?:px)?(?:\s+(-?[0-9]+)(?:px)?)?(?:\s+(-?[0-9]+)(?:px)?)?/.exec(d)) ? {
            left: parseInt(g[1], 10),
            top: parseInt(g[2], 10),
            blur: g[3] ? parseInt(g[3], 10) : 0,
            spread: g[4] ? parseInt(g[4], 10) : 0
        } : {
            left: 0,
            top: 0,
            blur: 0,
            spread: 0
        };
        u.inset = /inset/.test(d);
        u.color = k;
        return u
    }
    d.extend(!0, d, {
        support: {
            rgba: function () {
                var n = d("script:first"),
                    g = n.css("color"),
                    k = !1;
                if (/^rgba/.test(g)) k = !0;
                else try {
                        k = g != n.css("color", "rgba(0, 0, 0, 0.5)").css("color"),
                        n.css("color", g)
                } catch (u) {}
                return k
            }()
        }
    });
    var x;
    d.each(["boxShadow", "MozBoxShadow", "WebkitBoxShadow"], function (n, g) {
        var k = d("html").css(g);
        if ("string" == typeof k && "" != k) return x = g, !1
    });
    x && (d.Tween.propHooks.boxShadow = {
        get: function (n) {
            return d(n.elem).css(x)
        },
        set: function (n) {
            var g = n.elem.style,
                k = w(d(n.elem).get(0).style[x] || d(n.elem).css(x)),
                u = d.extend({}, k, w(n.end));
            k.color == y && (k.color = u.color || [0, 0, 0]);
            n.run = function (n) {
                var y = x,
                    w = [];
                k.inset && w.push("inset");
                "undefined" != typeof u.left && w.push(parseInt(k.left +
                    n * (u.left - k.left), 10) + "px " + parseInt(k.top + n * (u.top - k.top), 10) + "px");
                "undefined" != typeof u.blur && w.push(parseInt(k.blur + n * (u.blur - k.blur), 10) + "px");
                "undefined" != typeof u.spread && w.push(parseInt(k.spread + n * (u.spread - k.spread), 10) + "px");
                if ("undefined" != typeof u.color) {
                    var W = "rgb" + (d.support.rgba ? "a" : "") + "(" + parseInt(k.color[0] + n * (u.color[0] - k.color[0]), 10) + "," + parseInt(k.color[1] + n * (u.color[1] - k.color[1]), 10) + "," + parseInt(k.color[2] + n * (u.color[2] - k.color[2]), 10);
                    d.support.rgba && (W += "," + parseFloat(k.color[3] +
                        n * (u.color[3] - k.color[3])));
                    w.push(W + ")")
                }
                n = w.join(" ");
                g[y] = n
            }
        }
    })
});
(function (d, y) {
    var w, x, n, g;

    function k(a) {
        c.options.enableKeys && (a ? R : X)(document, "keydown", u)
    }
    function u(a) {
        if (!a.metaKey && !a.shiftKey && !a.altKey && !a.ctrlKey) {
            var b;
            switch (a.keyCode) {
            case 81:
            case 88:
            case 27:
                b = c.close;
                break;
            case 37:
                b = c.previous;
                break;
            case 39:
                b = c.next;
                break;
            case 32:
                b = "number" == typeof D ? c.pause : c.play
            }
            b && (a.preventDefault(), b())
        }
    }
    function ua(a) {
        k(!1);
        var b = c.getCurrent(),
            e = "inline" == b.player ? "html" : b.player;
        if ("function" != typeof c[e]) throw "unknown player " + e;
        a && (c.player.remove(), c.revertOptions(),
            c.applyOptions(b.options || {}));
        c.player = new c[e](b, c.playerId);
        1 < c.gallery.length && (b = c.gallery[c.current + 1] || c.gallery[0], "img" == b.player && ((new Image).src = b.content), b = c.gallery[c.current - 1] || c.gallery[c.gallery.length - 1], "img" == b.player && ((new Image).src = b.content));
        c.skin.onLoad(a, Oa)
    }
    function Oa() {
        if (E) if ("undefined" != typeof c.player.ready) var a = setInterval(function () {
                    E ? c.player.ready && (clearInterval(a), a = null, c.skin.onReady(va)) : (clearInterval(a), a = null)
                }, 10);
            else c.skin.onReady(va)
    }
    function va() {
        E &&
            (c.player.append(c.skin.body, c.dimensions), c.skin.onShow(W))
    }
    function W() {
        if (E) {
            if (c.player.onLoad) c.player.onLoad();
            c.options.onFinish(c.getCurrent());
            c.isPaused() || c.play();
            k(!0)
        }
    }
    function Y() {
        return (new Date).getTime()
    }
    function F(a, b) {
        for (var e in b) a[e] = b[e];
        return a
    }
    function A(a, b) {
        for (var e = 0, c = a.length, f = a[0]; e < c && !1 !== b.call(f, e, f); f = a[++e]);
    }
    function wa(a, b) {
        return a.replace(/\{(\w+?)\}/g, function (a, c) {
            return b[c]
        })
    }
    function Z() {}
    function t(a) {
        return document.getElementById(a)
    }
    function aa(a) {
        a.parentNode.removeChild(a)
    }

    function R(a, b, e) {
        jQuery(a).bind(b, e)
    }
    function X(a, b, e) {
        jQuery(a).unbind(b, e)
    }
    function db() {
        if (!Pa) {
            try {
                document.documentElement.doScroll("left")
            } catch (a) {
                setTimeout(db, 1);
                return
            }
            c.load()
        }
    }
    function eb(a) {
        c.open(this);
        c.gallery.length && a.preventDefault()
    }
    function fb() {
        var a = c.dimensions;
        F(L.style, {
            height: a.innerHeight + "px",
            width: a.innerWidth + "px"
        })
    }
    function gb(a) {
        a.preventDefault();
        a = [a.pageX, a.pageY];
        n = a[0];
        g = a[1];
        S = t(c.player.id);
        R(document, "mousemove", hb);
        R(document, "mouseup", ib);
        c.isGecko && (L.style.cursor =
            "-moz-grabbing")
    }
    function hb(a) {
        var b = c.player,
            e = c.dimensions;
        a = [a.pageX, a.pageY];
        var r = a[0] - n;
        n += r;
        w = Math.max(Math.min(0, w + r), e.innerWidth - b.width);
        a = a[1] - g;
        g += a;
        x = Math.max(Math.min(0, x + a), e.innerHeight - b.height);
        F(S.style, {
            left: w + "px",
            top: x + "px"
        })
    }
    function ib() {
        X(document, "mousemove", hb);
        X(document, "mouseup", ib);
        c.isGecko && (L.style.cursor = "-moz-grab")
    }
    function G(a, b, e, r, f) {
        var h = "opacity" == b,
            d = h ? c.setOpacity : function (a, e) {
                a.style[b] = "" + e + "px"
            };
        if (0 == r || !h && !c.options.animate || h && !c.options.animateFade) d(a,
                e), f && f();
        else {
            var l = parseFloat(c.getStyle(a, b)) || 0,
                p = e - l;
            if (0 == p) f && f();
            else {
                r *= 1E3;
                var g = Y(),
                    m = c.ease,
                    k = g + r,
                    n, q = setInterval(function () {
                        n = Y();
                        n >= k ? (clearInterval(q), q = null, d(a, e), f && f()) : d(a, l + m((n - g) / r) * p)
                    }, 10)
            }
        }
    }
    function jb() {
        J.style.height = c.getWindowSize("Height") + "px";
        J.style.width = c.getWindowSize("Width") + "px"
    }
    function Qa() {
        J.style.top = document.documentElement.scrollTop + "px";
        J.style.left = document.documentElement.scrollLeft + "px"
    }
    function kb(a) {
        a ? A(Ra, function (a, e) {
            e[0].style.visibility = e[1] ||
                ""
        }) : (Ra = [], A(c.options.troubleElements, function (a, e) {
            A(document.getElementsByTagName(e), function (a, b) {
                Ra.push([b, b.style.visibility]);
                b.style.visibility = "hidden"
            })
        }))
    }
    function M(a, b) {
        var e = t("sb-nav-" + a);
        e && (e.style.display = b ? "" : "none")
    }
    function lb(a, b) {
        var e = t("sb-loading"),
            r = c.getCurrent().player,
            r = "img" == r || "html" == r;
        if (a) {
            c.setOpacity(e, 0);
            e.style.display = "block";
            var f = function () {
                c.clearOpacity(e);
                b && b()
            };
            r ? G(e, "opacity", 1, c.options.fadeDuration, f) : f()
        } else f = function () {
                e.style.display = "none";
                c.clearOpacity(e);
                b && b()
        }, r ? G(e, "opacity", 0, c.options.fadeDuration, f) : f()
    }
    function ma(a, b, e, r) {
        var f = t("sb-wrapper-inner");
        e = e ? c.options.resizeDuration : 0;
        G(T, "top", b, e);
        G(f, "height", a, e, r)
    }
    function na(a, b, e, r) {
        e = e ? c.options.resizeDuration : 0;
        G(T, "left", b, e);
        G(T, "width", a, e, r)
    }
    function Sa(a, b) {
        var e = t("sb-body-inner");
        a = parseInt(a);
        b = parseInt(b);
        var r = T.offsetHeight - e.offsetHeight,
            e = T.offsetWidth - e.offsetWidth,
            f = N.offsetHeight,
            h = N.offsetWidth,
            d = parseInt(c.options.viewportPadding) || 20;
        return c.setDimensions(a,
            b, f, h, r, e, d, c.player && "drag" != c.options.handleOversize)
    }
    var c = {
        version: "3.0.3"
    }, I = navigator.userAgent.toLowerCase(); - 1 < I.indexOf("windows") || -1 < I.indexOf("win32") ? c.isWindows = !0 : -1 < I.indexOf("macintosh") || -1 < I.indexOf("mac os x") ? c.isMac = !0 : -1 < I.indexOf("linux") && (c.isLinux = !0);
    c.isIE = -1 < I.indexOf("msie");
    c.isIE6 = -1 < I.indexOf("msie 6");
    c.isIE7 = -1 < I.indexOf("msie 7");
    c.isGecko = -1 < I.indexOf("gecko") && -1 == I.indexOf("safari");
    c.isWebKit = -1 < I.indexOf("applewebkit/");
    var Eb = /#(.+)$/,
        Fb = /^(light|shadow)box\[(.*?)\]/i,
        Gb = /\s*([a-z_]*?)\s*=\s*(.+)\s*/,
        Hb = /[0-9a-z]+$/i,
        Ib = /(.+\/)shadowbox\.js/i,
        E = !1,
        mb = !1,
        nb = {}, O = 0,
        xa, D;
    c.current = -1;
    c.dimensions = null;
    c.ease = function (a) {
        return 1 + Math.pow(a - 1, 3)
    };
    c.errorInfo = {
        fla: {
            name: "Flash",
            url: "http://www.adobe.com/products/flashplayer/"
        },
        qt: {
            name: "QuickTime",
            url: "http://www.apple.com/quicktime/download/"
        },
        wmp: {
            name: "Windows Media Player",
            url: "http://www.microsoft.com/windows/windowsmedia/"
        },
        f4m: {
            name: "Flip4Mac",
            url: "http://www.flip4mac.com/wmv_download.htm"
        }
    };
    c.gallery = [];
    c.onReady =
        Z;
    c.path = null;
    c.player = null;
    c.playerId = "sb-player";
    c.options = {
        animate: !0,
        animateFade: !0,
        autoplayMovies: !0,
        continuous: !1,
        enableKeys: !0,
        flashParams: {
            bgcolor: "#000000",
            allowfullscreen: !0
        },
        flashVars: {},
        flashVersion: "9.0.115",
        handleOversize: "resize",
        handleUnsupported: "link",
        onChange: Z,
        onClose: Z,
        onFinish: Z,
        onOpen: Z,
        showMovieControls: !0,
        skipSetup: !1,
        slideshowDelay: 0,
        viewportPadding: 20
    };
    c.getCurrent = function () {
        return -1 < c.current ? c.gallery[c.current] : null
    };
    c.hasNext = function () {
        return 1 < c.gallery.length && (c.current !=
            c.gallery.length - 1 || c.options.continuous)
    };
    c.isOpen = function () {
        return E
    };
    c.isPaused = function () {
        return "pause" == D
    };
    c.applyOptions = function (a) {
        nb = F({}, c.options);
        F(c.options, a)
    };
    c.revertOptions = function () {
        F(c.options, nb)
    };
    c.init = function (a, b) {
        if (!mb) {
            mb = !0;
            c.skin.options && F(c.options, c.skin.options);
            a && F(c.options, a);
            if (!c.path) for (var e, r = document.getElementsByTagName("script"), f = 0, h = r.length; f < h; ++f) if (e = Ib.exec(r[f].src)) {
                        c.path = e[1];
                        break
                    }
            b && (c.onReady = b);
            if ("complete" === document.readyState) c.load();
            else if (document.addEventListener) document.addEventListener("DOMContentLoaded", fa, !1), d.addEventListener("load", c.load, !1);
            else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", fa);
                d.attachEvent("onload", c.load);
                e = !1;
                try {
                    e = null === d.frameElement
                } catch (j) {}
                document.documentElement.doScroll && e && db()
            }
        }
    };
    c.open = function (a) {
        if (!E && (a = c.makeGallery(a), c.gallery = a[0], c.current = a[1], a = c.getCurrent(), null != a)) {
            c.applyOptions(a.options || {});
            a = c.errorInfo;
            for (var b = c.plugins, e, r, f, h, d = 0; d < c.gallery.length; ++d) {
                e =
                    c.gallery[d];
                r = !1;
                f = null;
                switch (e.player) {
                case "flv":
                case "swf":
                    b.fla || (f = "fla");
                    break;
                case "qt":
                    b.qt || (f = "qt");
                    break;
                case "wmp":
                    c.isMac ? b.qt && b.f4m ? e.player = "qt" : f = "qtf4m" : b.wmp || (f = "wmp");
                    break;
                case "qtwmp":
                    b.qt ? e.player = "qt" : b.wmp ? e.player = "wmp" : f = "qtwmp"
                }
                if (f) if ("link" == c.options.handleUnsupported) {
                        switch (f) {
                        case "qtf4m":
                            h = "shared";
                            f = [a.qt.url, a.qt.name, a.f4m.url, a.f4m.name];
                            break;
                        case "qtwmp":
                            h = "either";
                            f = [a.qt.url, a.qt.name, a.wmp.url, a.wmp.name];
                            break;
                        default:
                            h = "single", f = [a[f].url, a[f].name]
                        }
                        e.player =
                            "html";
                        e.content = '<div class="sb-message">' + wa(c.lang.errors[h], f) + "</div>"
                    } else r = !0;
                    else if ("inline" == e.player)(h = Eb.exec(e.content)) ? (h = t(h[1])) ? e.content = h.innerHTML : r = !0 : r = !0;
                else if ("swf" == e.player || "flv" == e.player) h = e.options && e.options.flashVersion || c.options.flashVersion, c.flash && !c.flash.hasFlashPlayerVersion(h) && (e.width = 310, e.height = 177);
                r && (c.gallery.splice(d, 1), d < c.current ? --c.current : d == c.current && (c.current = 0 < d ? d - 1 : d), --d)
            }
            c.gallery.length && (a = c.getCurrent(), !1 !== c.options.onOpen(a) &&
                (E = !0, c.skin.onOpen(a, ua)))
        }
    };
    c.close = function () {
        E && (E = !1, c.player && (c.player.remove(), c.player = null), "number" == typeof D && (clearTimeout(D), D = null), O = 0, k(!1), c.options.onClose(c.getCurrent()), c.skin.onClose(), c.revertOptions())
    };
    c.play = function () {
        if (c.hasNext() && (O || (O = 1E3 * c.options.slideshowDelay), O && (xa = Y(), D = setTimeout(function () {
            O = xa = 0;
            c.next()
        }, O), c.skin.onPlay))) c.skin.onPlay()
    };
    c.pause = function () {
        if ("number" == typeof D && (O = Math.max(0, O - (Y() - xa)))) if (clearTimeout(D), D = "pause", c.skin.onPause) c.skin.onPause()
    };
    c.change = function (a) {
        if (!(a in c.gallery)) if (c.options.continuous) {
                if (a = 0 > a ? c.gallery.length + a : 0, !(a in c.gallery)) return
            } else return;
        c.current = a;
        "number" == typeof D && (clearTimeout(D), D = null, O = xa = 0);
        c.options.onChange(c.getCurrent());
        ua(!0)
    };
    c.next = function () {
        c.change(c.current + 1)
    };
    c.previous = function () {
        c.change(c.current - 1)
    };
    c.setDimensions = function (a, b, e, r, f, h, d, l) {
        var p = a,
            g = b,
            m = 2 * d + f;
        a + m > e && (a = e - m);
        var k = 2 * d + h;
        b + k > r && (b = r - k);
        var n = (p - a) / p,
            q = (g - b) / g,
            s = 0 < n || 0 < q;
        l && s && (n > q ? b = Math.round(g / p * a) : q > n &&
            (a = Math.round(p / g * b)));
        c.dimensions = {
            height: a + f,
            width: b + h,
            innerHeight: a,
            innerWidth: b,
            top: Math.floor((e - (a + m)) / 2 + d),
            left: Math.floor((r - (b + k)) / 2 + d),
            oversized: s
        };
        return c.dimensions
    };
    c.makeGallery = function (a) {
        var b = [],
            e = -1;
        "string" == typeof a && (a = [a]);
        if ("number" == typeof a.length) A(a, function (a, e) {
                b[a] = e.content ? e : {
                    content: e
                }
            }), e = 0;
        else {
            if (a.tagName) {
                var r = c.getCache(a);
                a = r ? r : c.makeObject(a)
            }
            if (a.gallery) {
                var b = [],
                    f;
                for (f in c.cache) r = c.cache[f], r.gallery && r.gallery == a.gallery && (-1 == e && r.content == a.content &&
                        (e = b.length), b.push(r)); - 1 == e && (b.unshift(a), e = 0)
            } else b = [a], e = 0
        }
        A(b, function (a, e) {
            b[a] = F({}, e)
        });
        return [b, e]
    };
    c.makeObject = function (a, b) {
        var e = {
            content: a.href,
            title: a.getAttribute("title") || "",
            link: a
        };
        b ? (b = F({}, b), A(["player", "title", "height", "width", "gallery"], function (a, c) {
            "undefined" != typeof b[c] && (e[c] = b[c], delete b[c])
        }), e.options = b) : e.options = {};
        e.player || (e.player = c.getPlayer(e.content));
        var r = a.getAttribute("rel");
        if (r) {
            var f = r.match(Fb);
            f && (e.gallery = escape(f[2]));
            A(r.split(";"), function (a,
                b) {
                (f = b.match(Gb)) && (e[f[1]] = f[2])
            })
        }
        return e
    };
    c.getPlayer = function (a) {
        if (-1 < a.indexOf("#") && 0 == a.indexOf(document.location.href)) return "inline";
        var b = a.indexOf("?"); - 1 < b && (a = a.substring(0, b));
        var e;
        (a = a.match(Hb)) && (e = a[0].toLowerCase());
        if (e) {
            if (c.img && -1 < c.img.ext.indexOf(e)) return "img";
            if (c.swf && -1 < c.swf.ext.indexOf(e)) return "swf";
            if (c.flv && -1 < c.flv.ext.indexOf(e)) return "flv";
            if (c.qt && -1 < c.qt.ext.indexOf(e)) return c.wmp && -1 < c.wmp.ext.indexOf(e) ? "qtwmp" : "qt";
            if (c.wmp && -1 < c.wmp.ext.indexOf(e)) return "wmp"
        }
        return "iframe"
    };
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
        var e = this.length >>> 0;
        b = b || 0;
        for (0 > b && (b += e); b < e; ++b) if (b in this && this[b] === a) return b;
        return -1
    });
    var ya = !0,
        za = !0,
        Jb = /opacity=([^)]*)/,
        ob = document.defaultView && document.defaultView.getComputedStyle;
    c.getStyle = function (a, b) {
        var e;
        if (!ya && "opacity" == b && a.currentStyle) return e = Jb.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "", "" === e ? "1" : e;
        if (ob) {
            var c = ob(a, null);
            c && (e = c[b]);
            "opacity" == b && "" == e && (e = "1")
        } else e = a.currentStyle[b];
        return e
    };
    c.appendHTML = function (a, b) {
        if (a.insertAdjacentHTML) a.insertAdjacentHTML("BeforeEnd", b);
        else if (a.lastChild) {
            var e = a.ownerDocument.createRange();
            e.setStartAfter(a.lastChild);
            e = e.createContextualFragment(b);
            a.appendChild(e)
        } else a.innerHTML = b
    };
    c.getWindowSize = function (a) {
        return "CSS1Compat" === document.compatMode ? document.documentElement["client" + a] : document.body["client" + a]
    };
    c.setOpacity = function (a, b) {
        var e = a.style;
        ya ? e.opacity = 1 == b ? "" : b : (e.zoom = 1, 1 == b ? "string" == typeof e.filter && /alpha/i.test(e.filter) &&
            (e.filter = e.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi, "")) : e.filter = (e.filter || "").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi, "") + " alpha(opacity=" + 100 * b + ")")
    };
    c.clearOpacity = function (a) {
        c.setOpacity(a, 1)
    };
    jQuery.fn.shadowbox = function (a) {
        return this.each(function () {
            var b = jQuery(this),
                e = jQuery.extend({}, a || {}, jQuery.metadata ? b.metadata() : jQuery.meta ? b.data() : {}),
                c = this.className || "";
            e.width = parseInt((c.match(/w:(\d+)/) || [])[1]) || e.width;
            e.height = parseInt((c.match(/h:(\d+)/) || [])[1]) || e.height;
            Shadowbox.setup(b,
                e)
        })
    };
    var Pa = !1,
        fa;
    document.addEventListener ? fa = function () {
        document.removeEventListener("DOMContentLoaded", fa, !1);
        c.load()
    } : document.attachEvent && (fa = function () {
        "complete" === document.readyState && (document.detachEvent("onreadystatechange", fa), c.load())
    });
    c.load = function () {
        if (!Pa) {
            if (!document.body) return setTimeout(c.load, 13);
            Pa = !0;
            var a = document.body,
                b = document.createElement("div");
            ya = "string" === typeof b.style.opacity;
            b.style.position = "fixed";
            b.style.margin = 0;
            b.style.top = "20px";
            a.appendChild(b, a.firstChild);
            za = 20 == b.offsetTop;
            a.removeChild(b);
            c.onReady();
            c.options.skipSetup || c.setup();
            c.skin.init()
        }
    };
    c.plugins = {};
    if (navigator.plugins && navigator.plugins.length) {
        var ba = [];
        A(navigator.plugins, function (a, b) {
            ba.push(b.name)
        });
        var ba = ba.join(","),
            pb = -1 < ba.indexOf("Flip4Mac");
        c.plugins = {
            fla: -1 < ba.indexOf("Shockwave Flash"),
            qt: -1 < ba.indexOf("QuickTime"),
            wmp: !pb && -1 < ba.indexOf("Windows Media"),
            f4m: pb
        }
    } else {
        var Ta = function (a) {
            var b;
            try {
                b = new ActiveXObject(a)
            } catch (e) {}
            return !!b
        };
        c.plugins = {
            fla: Ta("ShockwaveFlash.ShockwaveFlash"),
            qt: Ta("QuickTime.QuickTime"),
            wmp: Ta("wmplayer.ocx"),
            f4m: !1
        }
    }
    var Kb = /^(light|shadow)box/i,
        Lb = 1;
    c.cache = {};
    c.select = function (a) {
        var b = [];
        if (a) {
            var e = a.length;
            if (e) if ("string" == typeof a) c.find && (b = c.find(a));
                else if (2 == e && "string" == typeof a[0] && a[1].nodeType) c.find && (b = c.find(a[0], a[1]));
            else for (var r = 0; r < e; ++r) b[r] = a[r];
            else b.push(a)
        } else {
            var f;
            A(document.getElementsByTagName("a"), function (a, e) {
                (f = e.getAttribute("rel")) && Kb.test(f) && b.push(e)
            })
        }
        return b
    };
    c.setup = function (a, b) {
        A(c.select(a), function (a,
            r) {
            c.addCache(r, b)
        })
    };
    c.teardown = function (a) {
        A(c.select(a), function (a, e) {
            c.removeCache(e)
        })
    };
    c.addCache = function (a, b) {
        var e = a.shadowboxCacheKey;
        e == y && (e = Lb++, a.shadowboxCacheKey = e, R(a, "click", eb));
        c.cache[e] = c.makeObject(a, b)
    };
    c.removeCache = function (a) {
        X(a, "click", eb);
        delete c.cache[a.shadowboxCacheKey];
        a.shadowboxCacheKey = null
    };
    c.getCache = function (a) {
        a = a.shadowboxCacheKey;
        return a in c.cache && c.cache[a]
    };
    c.clearCache = function () {
        for (var a in c.cache) c.removeCache(c.cache[a].link);
        c.cache = {}
    };
    var Mb =
        c,
        qb = function (a) {
            for (var b = "", e, c = 0; a[c]; c++) e = a[c], 3 === e.nodeType || 4 === e.nodeType ? b += e.nodeValue : 8 !== e.nodeType && (b += qb(e.childNodes));
            return b
        }, rb = function (a, b, e, c, f, d) {
            f = 0;
            for (var j = c.length; f < j; f++) {
                var l = c[f];
                if (l) {
                    for (var l = l[a], p = !1; l;) {
                        if (l.sizcache === e) {
                            p = c[l.sizset];
                            break
                        }
                        1 === l.nodeType && !d && (l.sizcache = e, l.sizset = f);
                        if (l.nodeName.toLowerCase() === b) {
                            p = l;
                            break
                        }
                        l = l[a]
                    }
                    c[f] = p
                }
            }
        }, sb = function (a, b, e, c, f, d) {
            f = 0;
            for (var j = c.length; f < j; f++) {
                var l = c[f];
                if (l) {
                    for (var l = l[a], p = !1; l;) {
                        if (l.sizcache ===
                            e) {
                            p = c[l.sizset];
                            break
                        }
                        if (1 === l.nodeType) if (d || (l.sizcache = e, l.sizset = f), "string" !== typeof b) {
                                if (l === b) {
                                    p = !0;
                                    break
                                }
                            } else if (0 < v.filter(b, [l]).length) {
                            p = l;
                            break
                        }
                        l = l[a]
                    }
                    c[f] = p
                }
            }
        }, Ua = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        Va = 0,
        tb = Object.prototype.toString,
        U = !1,
        ub = !0;
    [0, 0].sort(function () {
        ub = !1;
        return 0
    });
    var v = function (a, b, e, c) {
        e = e || [];
        var f = b = b || document;
        if (1 !== b.nodeType && 9 !== b.nodeType) return [];
        if (!a || "string" !==
            typeof a) return e;
        for (var d = [], j, l, p, g, m = !0, k = Wa(b), n = a; null !== (Ua.exec(""), j = Ua.exec(n));) if (n = j[3], d.push(j[1]), j[2]) {
                g = j[3];
                break
            }
        if (1 < d.length && Nb.exec(a)) if (2 === d.length && q.relative[d[0]]) l = vb(d[0] + d[1], b);
            else for (l = q.relative[d[0]] ? [b] : v(d.shift(), b); d.length;) a = d.shift(), q.relative[a] && (a += d.shift()), l = vb(a, l);
            else if (!c && (1 < d.length && 9 === b.nodeType && !k && q.match.ID.test(d[0]) && !q.match.ID.test(d[d.length - 1])) && (j = v.find(d.shift(), b, k), b = j.expr ? v.filter(j.expr, j.set)[0] : j.set[0]), b) {
            j = c ? {
                expr: d.pop(),
                set: oa(c)
            } : v.find(d.pop(), 1 === d.length && ("~" === d[0] || "+" === d[0]) && b.parentNode ? b.parentNode : b, k);
            l = j.expr ? v.filter(j.expr, j.set) : j.set;
            for (0 < d.length ? p = oa(l) : m = !1; d.length;) {
                var s = d.pop();
                j = s;
                q.relative[s] ? j = d.pop() : s = "";
                null == j && (j = b);
                q.relative[s](p, j, k)
            }
        } else p = [];
        p || (p = l);
        if (!p) throw "Syntax error, unrecognized expression: " + (s || a);
        if ("[object Array]" === tb.call(p)) if (m) if (b && 1 === b.nodeType) for (a = 0; null != p[a]; a++) p[a] && (!0 === p[a] || 1 === p[a].nodeType && Ob(b, p[a])) && e.push(l[a]);
                else for (a = 0; null !=
                        p[a]; a++) p[a] && 1 === p[a].nodeType && e.push(l[a]);
                else e.push.apply(e, p);
                else oa(p, e);
        g && (v(g, f, e, c), v.uniqueSort(e));
        return e
    };
    v.uniqueSort = function (a) {
        if (pa && (U = ub, a.sort(pa), U)) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
        return a
    };
    v.matches = function (a, b) {
        return v(a, null, null, b)
    };
    v.find = function (a, b, e) {
        var c, f;
        if (!a) return [];
        for (var d = 0, j = q.order.length; d < j; d++) {
            var l = q.order[d];
            if (f = q.leftMatch[l].exec(a)) {
                var p = f[1];
                f.splice(1, 1);
                if ("\\" !== p.substr(p.length - 1) && (f[1] = (f[1] || "").replace(/\\/g,
                    ""), c = q.find[l](f, b, e), null != c)) {
                    a = a.replace(q.match[l], "");
                    break
                }
            }
        }
        c || (c = b.getElementsByTagName("*"));
        return {
            set: c,
            expr: a
        }
    };
    v.filter = function (a, b, e, c) {
        for (var d = a, h = [], j = b, l, p, g = b && b[0] && Wa(b[0]); a && b.length;) {
            for (var m in q.filter) if (null != (l = q.match[m].exec(a))) {
                    var k = q.filter[m],
                        n, s;
                    p = !1;
                    j === h && (h = []);
                    if (q.preFilter[m]) if (l = q.preFilter[m](l, j, e, h, c, g)) {
                            if (!0 === l) continue
                        } else p = n = !0;
                    if (l) for (var t = 0; null != (s = j[t]); t++) if (s) {
                                n = k(s, l, t, j);
                                var u = c ^ !! n;
                                e && null != n ? u ? p = !0 : j[t] = !1 : u && (h.push(s), p = !0)
                            }
                    if (n !==
                        y) {
                        e || (j = h);
                        a = a.replace(q.match[m], "");
                        if (!p) return [];
                        break
                    }
                }
            if (a === d) {
                if (null == p) throw "Syntax error, unrecognized expression: " + a;
                break
            }
            d = a
        }
        return j
    };
    var q = v.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: function (a) {
                return a.getAttribute("href")
            }
        },
        relative: {
            "+": function (a, b) {
                var e = "string" === typeof b,
                    c = e && !/\W/.test(b),
                    e = e && !c;
                c && (b = b.toLowerCase());
                for (var c = 0, d = a.length, h; c < d; c++) if (h = a[c]) {
                        for (;
                        (h = h.previousSibling) && 1 !== h.nodeType;);
                        a[c] = e || h && h.nodeName.toLowerCase() ===
                            b ? h || !1 : h === b
                    }
                e && v.filter(b, a, !0)
            },
            ">": function (a, b) {
                var e = "string" === typeof b;
                if (e && !/\W/.test(b)) {
                    b = b.toLowerCase();
                    for (var c = 0, d = a.length; c < d; c++) {
                        var h = a[c];
                        h && (e = h.parentNode, a[c] = e.nodeName.toLowerCase() === b ? e : !1)
                    }
                } else {
                    c = 0;
                    for (d = a.length; c < d; c++)(h = a[c]) && (a[c] = e ? h.parentNode : h.parentNode === b);
                    e && v.filter(b, a, !0)
                }
            },
            "": function (a, b, e) {
                var c = Va++,
                    d = sb;
                if ("string" === typeof b && !/\W/.test(b)) var h = b = b.toLowerCase(),
                d = rb;
                d("parentNode", b, c, a, h, e)
            },
            "~": function (a, b, e) {
                var c = Va++,
                    d = sb;
                if ("string" ===
                    typeof b && !/\W/.test(b)) var h = b = b.toLowerCase(),
                d = rb;
                d("previousSibling", b, c, a, h, e)
            }
        },
        find: {
            ID: function (a, b, e) {
                if ("undefined" !== typeof b.getElementById && !e) return (a = b.getElementById(a[1])) ? [a] : []
            },
            NAME: function (a, b) {
                if ("undefined" !== typeof b.getElementsByName) {
                    for (var e = [], c = b.getElementsByName(a[1]), d = 0, h = c.length; d < h; d++) c[d].getAttribute("name") === a[1] && e.push(c[d]);
                    return 0 === e.length ? null : e
                }
            },
            TAG: function (a, b) {
                return b.getElementsByTagName(a[1])
            }
        },
        preFilter: {
            CLASS: function (a, b, e, c, d, h) {
                a = " " +
                    a[1].replace(/\\/g, "") + " ";
                if (h) return a;
                h = 0;
                for (var j; null != (j = b[h]); h++) j && (d ^ (j.className && 0 <= (" " + j.className + " ").replace(/[\t\n]/g, " ").indexOf(a)) ? e || c.push(j) : e && (b[h] = !1));
                return !1
            },
            ID: function (a) {
                return a[1].replace(/\\/g, "")
            },
            TAG: function (a) {
                return a[1].toLowerCase()
            },
            CHILD: function (a) {
                if ("nth" === a[1]) {
                    var b = /(-?)(\d*)n((?:\+|-)?\d*)/.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                    a[2] = b[1] + (b[2] || 1) - 0;
                    a[3] = b[3] - 0
                }
                a[0] = Va++;
                return a
            },
            ATTR: function (a,
                b, e, c, d, h) {
                b = a[1].replace(/\\/g, "");
                !h && q.attrMap[b] && (a[1] = q.attrMap[b]);
                "~=" === a[2] && (a[4] = " " + a[4] + " ");
                return a
            },
            PSEUDO: function (a, b, e, c, d) {
                if ("not" === a[1]) if (1 < (Ua.exec(a[3]) || "").length || /^\w/.test(a[3])) a[3] = v(a[3], null, null, b);
                    else return a = v.filter(a[3], b, e, 1 ^ d), e || c.push.apply(c, a), !1;
                    else if (q.match.POS.test(a[0]) || q.match.CHILD.test(a[0])) return !0;
                return a
            },
            POS: function (a) {
                a.unshift(!0);
                return a
            }
        },
        filters: {
            enabled: function (a) {
                return !1 === a.disabled && "hidden" !== a.type
            },
            disabled: function (a) {
                return !0 ===
                    a.disabled
            },
            checked: function (a) {
                return !0 === a.checked
            },
            selected: function (a) {
                a.parentNode.selectedIndex;
                return !0 === a.selected
            },
            parent: function (a) {
                return !!a.firstChild
            },
            empty: function (a) {
                return !a.firstChild
            },
            has: function (a, b, e) {
                return !!v(e[3], a).length
            },
            header: function (a) {
                return /h\d/i.test(a.nodeName)
            },
            text: function (a) {
                return "text" === a.type
            },
            radio: function (a) {
                return "radio" === a.type
            },
            checkbox: function (a) {
                return "checkbox" === a.type
            },
            file: function (a) {
                return "file" === a.type
            },
            password: function (a) {
                return "password" ===
                    a.type
            },
            submit: function (a) {
                return "submit" === a.type
            },
            image: function (a) {
                return "image" === a.type
            },
            reset: function (a) {
                return "reset" === a.type
            },
            button: function (a) {
                return "button" === a.type || "button" === a.nodeName.toLowerCase()
            },
            input: function (a) {
                return /input|select|textarea|button/i.test(a.nodeName)
            }
        },
        setFilters: {
            first: function (a, b) {
                return 0 === b
            },
            last: function (a, b, e, c) {
                return b === c.length - 1
            },
            even: function (a, b) {
                return 0 === b % 2
            },
            odd: function (a, b) {
                return 1 === b % 2
            },
            lt: function (a, b, e) {
                return b < e[3] - 0
            },
            gt: function (a,
                b, e) {
                return b > e[3] - 0
            },
            nth: function (a, b, e) {
                return e[3] - 0 === b
            },
            eq: function (a, b, e) {
                return e[3] - 0 === b
            }
        },
        filter: {
            PSEUDO: function (a, b, e, c) {
                var d = b[1],
                    h = q.filters[d];
                if (h) return h(a, e, b, c);
                if ("contains" === d) return 0 <= (a.textContent || a.innerText || qb([a]) || "").indexOf(b[3]);
                if ("not" === d) {
                    b = b[3];
                    e = 0;
                    for (c = b.length; e < c; e++) if (b[e] === a) return !1;
                    return !0
                }
                throw "Syntax error, unrecognized expression: " + d;
            },
            CHILD: function (a, b) {
                var c = b[1],
                    d = a;
                switch (c) {
                case "only":
                case "first":
                    for (; d = d.previousSibling;) if (1 === d.nodeType) return !1;
                    if ("first" === c) return !0;
                    d = a;
                case "last":
                    for (; d = d.nextSibling;) if (1 === d.nodeType) return !1;
                    return !0;
                case "nth":
                    var c = b[2],
                        f = b[3];
                    if (1 === c && 0 === f) return !0;
                    var h = b[0],
                        j = a.parentNode;
                    if (j && (j.sizcache !== h || !a.nodeIndex)) {
                        for (var l = 0, d = j.firstChild; d; d = d.nextSibling) 1 === d.nodeType && (d.nodeIndex = ++l);
                        j.sizcache = h
                    }
                    d = a.nodeIndex - f;
                    return 0 === c ? 0 === d : 0 === d % c && 0 <= d / c
                }
            },
            ID: function (a, b) {
                return 1 === a.nodeType && a.getAttribute("id") === b
            },
            TAG: function (a, b) {
                return "*" === b && 1 === a.nodeType || a.nodeName.toLowerCase() ===
                    b
            },
            CLASS: function (a, b) {
                return -1 < (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b)
            },
            ATTR: function (a, b) {
                var c = b[1],
                    c = q.attrHandle[c] ? q.attrHandle[c](a) : null != a[c] ? a[c] : a.getAttribute(c),
                    d = c + "",
                    f = b[2],
                    h = b[4];
                return null == c ? "!=" === f : "=" === f ? d === h : "*=" === f ? 0 <= d.indexOf(h) : "~=" === f ? 0 <= (" " + d + " ").indexOf(h) : !h ? d && !1 !== c : "!=" === f ? d !== h : "^=" === f ? 0 === d.indexOf(h) : "$=" === f ? d.substr(d.length - h.length) === h : "|=" === f ? d === h || d.substr(0, h.length + 1) === h + "-" : !1
            },
            POS: function (a, b, c, d) {
                var f = q.setFilters[b[2]];
                if (f) return f(a, c, b, d)
            }
        }
    }, Nb = q.match.POS,
        qa;
    for (qa in q.match) q.match[qa] = RegExp(q.match[qa].source + /(?![^\[]*\])(?![^\(]*\))/.source), q.leftMatch[qa] = RegExp(/(^(?:.|\r|\n)*?)/.source + q.match[qa].source);
    var oa = function (a, b) {
        a = Array.prototype.slice.call(a, 0);
        return b ? (b.push.apply(b, a), b) : a
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)
    } catch (Zb) {
        oa = function (a, b) {
            var c = b || [];
            if ("[object Array]" === tb.call(a)) Array.prototype.push.apply(c, a);
            else if ("number" === typeof a.length) for (var d =
                    0, f = a.length; d < f; d++) c.push(a[d]);
            else for (d = 0; a[d]; d++) c.push(a[d]);
            return c
        }
    }
    var pa;
    document.documentElement.compareDocumentPosition ? pa = function (a, b) {
        if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a == b && (U = !0), a.compareDocumentPosition ? -1 : 1;
        var c = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
        0 === c && (U = !0);
        return c
    } : "sourceIndex" in document.documentElement ? pa = function (a, b) {
        if (!a.sourceIndex || !b.sourceIndex) return a == b && (U = !0), a.sourceIndex ? -1 : 1;
        var c = a.sourceIndex - b.sourceIndex;
        0 ===
            c && (U = !0);
        return c
    } : document.createRange && (pa = function (a, b) {
        if (!a.ownerDocument || !b.ownerDocument) return a == b && (U = !0), a.ownerDocument ? -1 : 1;
        var c = a.ownerDocument.createRange(),
            d = b.ownerDocument.createRange();
        c.setStart(a, 0);
        c.setEnd(a, 0);
        d.setStart(b, 0);
        d.setEnd(b, 0);
        c = c.compareBoundaryPoints(Range.START_TO_END, d);
        0 === c && (U = !0);
        return c
    });
    var Aa = document.createElement("div"),
        wb = "script" + (new Date).getTime();
    Aa.innerHTML = "<a name='" + wb + "'/>";
    var Ba = document.documentElement;
    Ba.insertBefore(Aa, Ba.firstChild);
    document.getElementById(wb) && (q.find.ID = function (a, b, c) {
        if ("undefined" !== typeof b.getElementById && !c) return (b = b.getElementById(a[1])) ? b.id === a[1] || "undefined" !== typeof b.getAttributeNode && b.getAttributeNode("id").nodeValue === a[1] ? [b] : y : []
    }, q.filter.ID = function (a, b) {
        var c = "undefined" !== typeof a.getAttributeNode && a.getAttributeNode("id");
        return 1 === a.nodeType && c && c.nodeValue === b
    });
    Ba.removeChild(Aa);
    var Ba = Aa = null,
        ca = document.createElement("div");
    ca.appendChild(document.createComment(""));
    0 < ca.getElementsByTagName("*").length &&
        (q.find.TAG = function (a, b) {
        var c = b.getElementsByTagName(a[1]);
        if ("*" === a[1]) {
            for (var d = [], f = 0; c[f]; f++) 1 === c[f].nodeType && d.push(c[f]);
            c = d
        }
        return c
    });
    ca.innerHTML = "<a href='#'></a>";
    ca.firstChild && ("undefined" !== typeof ca.firstChild.getAttribute && "#" !== ca.firstChild.getAttribute("href")) && (q.attrHandle.href = function (a) {
        return a.getAttribute("href", 2)
    });
    ca = null;
    if (document.querySelectorAll) {
        var Xa = v,
            Ca = document.createElement("div");
        Ca.innerHTML = "<p class='TEST'></p>";
        if (!(Ca.querySelectorAll && 0 === Ca.querySelectorAll(".TEST").length)) {
            var v = function (a, b, c, d) {
                b = b || document;
                if (!d && 9 === b.nodeType && !Wa(b)) try {
                        return oa(b.querySelectorAll(a), c)
                } catch (f) {}
                return Xa(a, b, c, d)
            }, Ya;
            for (Ya in Xa) v[Ya] = Xa[Ya];
            Ca = null
        }
    }
    var ga = document.createElement("div");
    ga.innerHTML = "<div class='test e'></div><div class='test'></div>";
    ga.getElementsByClassName && 0 !== ga.getElementsByClassName("e").length && (ga.lastChild.className = "e", 1 !== ga.getElementsByClassName("e").length && (q.order.splice(1, 0, "CLASS"), q.find.CLASS = function (a, b, c) {
        if ("undefined" !== typeof b.getElementsByClassName && !c) return b.getElementsByClassName(a[1])
    }, ga = null));
    var Ob = document.compareDocumentPosition ? function (a, b) {
            return a.compareDocumentPosition(b) & 16
        } : function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        }, Wa = function (a) {
            return (a = (a ? a.ownerDocument || a : 0).documentElement) ? "HTML" !== a.nodeName : !1
        }, vb = function (a, b) {
            for (var c = [], d = "", f, h = b.nodeType ? [b] : b; f = q.match.PSEUDO.exec(a);) d += f[0], a = a.replace(q.match.PSEUDO, "");
            a = q.relative[a] ? a + "*" : a;
            f = 0;
            for (var j = h.length; f < j; f++) v(a, h[f], c);
            return v.filter(d,
                c)
        };
    Mb.find = v;
    var Pb = c,
        ra, Qb = function () {
            "complete" == sa.readyState && (sa.parentNode.removeChild(sa), Da())
        }, Da = function () {
            if (!Ea) {
                if (m.ie && m.win) {
                    var a = s.createElement("span");
                    try {
                        var b = s.getElementsByTagName("body")[0].appendChild(a);
                        b.parentNode.removeChild(b)
                    } catch (c) {
                        return
                    }
                }
                Ea = !0;
                Fa && (clearInterval(Fa), Fa = null);
                a = Ga.length;
                for (b = 0; b < a; b++) Ga[b]()
            }
        }, Ha = function (a) {
            Ea ? a() : Ga[Ga.length] = a
        }, xb = function (a) {
            if (typeof B.addEventListener != z) B.addEventListener("load", a, !1);
            else if (typeof s.addEventListener !=
                z) s.addEventListener("load", a, !1);
            else if (typeof B.attachEvent != z) Ia(B, "onload", a);
            else if ("function" == typeof B.onload) {
                var b = B.onload;
                B.onload = function () {
                    b();
                    a()
                }
            } else B.onload = a
        }, Sb = function () {
            for (var a = P.length, b = 0; b < a; b++) {
                var c = P[b].id;
                if (0 < m.pv[0]) {
                    var d = H(c);
                    if (d) if (P[b].width = d.getAttribute("width") ? d.getAttribute("width") : "0", P[b].height = d.getAttribute("height") ? d.getAttribute("height") : "0", ta(P[b].swfVersion)) {
                            if (m.webkit && 312 > m.webkit) {
                                var f = d.getElementsByTagName(Q)[0];
                                if (f) {
                                    var h = s.createElement("embed"),
                                        j = f.attributes;
                                    if (j) for (var l = j.length, p = 0; p < l; p++) "DATA" == j[p].nodeName ? h.setAttribute("src", j[p].nodeValue) : h.setAttribute(j[p].nodeName, j[p].nodeValue);
                                    if (f = f.childNodes) {
                                        j = f.length;
                                        for (l = 0; l < j; l++) 1 == f[l].nodeType && "PARAM" == f[l].nodeName && h.setAttribute(f[l].getAttribute("name"), f[l].getAttribute("value"))
                                    }
                                    d.parentNode.replaceChild(h, d)
                                }
                            }
                            da(c, !0)
                        } else P[b].expressInstall && !ha && ta("6.0.65") && (m.win || m.mac) ? yb(P[b]) : Rb(d)
                } else da(c, !0)
            }
        }, yb = function (a) {
            ha = !0;
            var b = H(a.id);
            if (b) {
                if (a.altContentId) {
                    var c =
                        H(a.altContentId);
                    c && (ia = c, Ja = a.altContentId)
                } else ia = Za(b);
                !/%$/.test(a.width) && 310 > parseInt(a.width, 10) && (a.width = "310");
                !/%$/.test(a.height) && 137 > parseInt(a.height, 10) && (a.height = "137");
                s.title = s.title.slice(0, 47) + " - Flash Player Installation";
                var c = "MMredirectURL=" + B.location + "&MMplayerType=" + (m.ie && m.win ? "ActiveX" : "PlugIn") + "&MMdoctitle=" + s.title,
                    d = a.id;
                if (m.ie && m.win && 4 != b.readyState) {
                    var f = s.createElement("div"),
                        d = d + "SWFObjectNew";
                    f.setAttribute("id", d);
                    b.parentNode.insertBefore(f, b);
                    b.style.display =
                        "none";
                    Ia(B, "onload", function () {
                        b.parentNode.removeChild(b)
                    })
                }
                $a({
                    data: a.expressInstall,
                    id: zb,
                    width: a.width,
                    height: a.height
                }, {
                    flashvars: c
                }, d)
            }
        }, Rb = function (a) {
            if (m.ie && m.win && 4 != a.readyState) {
                var b = s.createElement("div");
                a.parentNode.insertBefore(b, a);
                b.parentNode.replaceChild(Za(a), b);
                a.style.display = "none";
                Ia(B, "onload", function () {
                    a.parentNode.removeChild(a)
                })
            } else a.parentNode.replaceChild(Za(a), a)
        }, Za = function (a) {
            var b = s.createElement("div");
            if (m.win && m.ie) b.innerHTML = a.innerHTML;
            else if (a = a.getElementsByTagName(Q)[0]) if (a =
                    a.childNodes) for (var c = a.length, d = 0; d < c; d++)!(1 == a[d].nodeType && "PARAM" == a[d].nodeName) && 8 != a[d].nodeType && b.appendChild(a[d].cloneNode(!0));
            return b
        }, $a = function (a, b, c) {
            var d, f = H(c);
            if (f) if (typeof a.id == z && (a.id = c), m.ie && m.win) {
                    var h = "",
                        j;
                    for (j in a) a[j] != Object.prototype[j] && ("data" == j.toLowerCase() ? b.movie = a[j] : "styleclass" == j.toLowerCase() ? h += ' class="' + a[j] + '"' : "classid" != j.toLowerCase() && (h += " " + j + '="' + a[j] + '"'));
                    j = "";
                    for (var l in b) b[l] != Object.prototype[l] && (j += '<param name="' + l + '" value="' +
                            b[l] + '" />');
                    f.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + h + ">" + j + "</object>";
                    Ka[Ka.length] = a.id;
                    d = H(a.id)
                } else if (m.webkit && 312 > m.webkit) {
                h = s.createElement("embed");
                h.setAttribute("type", La);
                for (var p in a) a[p] != Object.prototype[p] && ("data" == p.toLowerCase() ? h.setAttribute("src", a[p]) : "styleclass" == p.toLowerCase() ? h.setAttribute("class", a[p]) : "classid" != p.toLowerCase() && h.setAttribute(p, a[p]));
                for (var g in b) b[g] != Object.prototype[g] && "movie" != g.toLowerCase() && h.setAttribute(g,
                        b[g]);
                f.parentNode.replaceChild(h, f);
                d = h
            } else {
                l = s.createElement(Q);
                l.setAttribute("type", La);
                for (var k in a) a[k] != Object.prototype[k] && ("styleclass" == k.toLowerCase() ? l.setAttribute("class", a[k]) : "classid" != k.toLowerCase() && l.setAttribute(k, a[k]));
                for (h in b) b[h] != Object.prototype[h] && "movie" != h.toLowerCase() && (a = l, j = h, p = b[h], g = s.createElement("param"), g.setAttribute("name", j), g.setAttribute("value", p), a.appendChild(g));
                f.parentNode.replaceChild(l, f);
                d = l
            }
            return d
        }, Bb = function (a) {
            var b = H(a);
            if (b && ("OBJECT" ==
                b.nodeName || "EMBED" == b.nodeName)) m.ie && m.win ? 4 == b.readyState ? Ab(a) : B.attachEvent("onload", function () {
                    Ab(a)
                }) : b.parentNode.removeChild(b)
        }, Ab = function (a) {
            if (a = H(a)) {
                for (var b in a) "function" == typeof a[b] && (a[b] = null);
                a.parentNode.removeChild(a)
            }
        }, H = function (a) {
            var b = null;
            try {
                b = s.getElementById(a)
            } catch (c) {}
            return b
        }, Ia = function (a, b, c) {
            a.attachEvent(b, c);
            ja[ja.length] = [a, b, c]
        }, ta = function (a) {
            var b = m.pv;
            a = a.split(".");
            a[0] = parseInt(a[0], 10);
            a[1] = parseInt(a[1], 10) || 0;
            a[2] = parseInt(a[2], 10) || 0;
            return b[0] >
                a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1
        }, Cb = function (a, b) {
            if (!m.ie || !m.mac) {
                var c = s.getElementsByTagName("head")[0],
                    d = s.createElement("style");
                d.setAttribute("type", "text/css");
                d.setAttribute("media", "screen");
                (!m.ie || !m.win) && typeof s.createTextNode != z && d.appendChild(s.createTextNode(a + " {" + b + "}"));
                c.appendChild(d);
                m.ie && (m.win && typeof s.styleSheets != z && 0 < s.styleSheets.length) && (c = s.styleSheets[s.styleSheets.length - 1], typeof c.addRule == Q && c.addRule(a, b))
            }
        }, da = function (a,
            b) {
            var c = b ? "visible" : "hidden";
            Ea && H(a) ? H(a).style.visibility = c : Cb("#" + a, "visibility:" + c)
        }, Db = function (a) {
            return null != /[\\\"<>\.;]/.exec(a) ? encodeURIComponent(a) : a
        }, z = "undefined",
        Q = "object",
        La = "application/x-shockwave-flash",
        zb = "SWFObjectExprInst",
        B = d,
        s = document,
        V = navigator,
        Ga = [],
        P = [],
        Ka = [],
        ja = [],
        sa, Fa = null,
        ia = null,
        Ja = null,
        Ea = !1,
        ha = !1,
        m, Tb = typeof s.getElementById != z && typeof s.getElementsByTagName != z && typeof s.createElement != z,
        ea = [0, 0, 0],
        C = null;
    if (typeof V.plugins != z && typeof V.plugins["Shockwave Flash"] ==
        Q) {
        if ((C = V.plugins["Shockwave Flash"].description) && !(typeof V.mimeTypes != z && V.mimeTypes[La] && !V.mimeTypes[La].enabledPlugin)) C = C.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), ea[0] = parseInt(C.replace(/^(.*)\..*$/, "$1"), 10), ea[1] = parseInt(C.replace(/^.*\.(.*)\s.*$/, "$1"), 10), ea[2] = /r/.test(C) ? parseInt(C.replace(/^.*r(.*)$/, "$1"), 10) : 0
    } else if (typeof B.ActiveXObject != z) {
        var ka = null,
            ab = !1;
        try {
            ka = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
        } catch ($b) {
            try {
                ka = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
                ea = [6, 0, 21], ka.AllowScriptAccess = "always"
            } catch (ac) {
                6 == ea[0] && (ab = !0)
            }
            if (!ab) try {
                    ka = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
            } catch (bc) {}
        }
        if (!ab && ka) try {
                if (C = ka.GetVariable("$version")) C = C.split(" ")[1].split(","), ea = [parseInt(C[0], 10), parseInt(C[1], 10), parseInt(C[2], 10)]
        } catch (cc) {}
    }
    var Ma = V.userAgent.toLowerCase(),
        Na = V.platform.toLowerCase(),
        Ub = /webkit/.test(Ma) ? parseFloat(Ma.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
        Vb = Na ? /win/.test(Na) : /win/.test(Ma),
        Wb = Na ? /mac/.test(Na) : /mac/.test(Ma);
    m = {
        w3cdom: Tb,
        pv: ea,
        webkit: Ub,
        ie: !1,
        win: Vb,
        mac: Wb
    };
    if (m.w3cdom) {
        Ha(Sb);
        if (m.ie && m.win) try {
                s.write("<script id=__ie_ondomload defer=true src=//:>\x3c/script>"), (sa = H("__ie_ondomload")) && Ia(sa, "onreadystatechange", Qb)
        } catch (dc) {}
        m.webkit && typeof s.readyState != z && (Fa = setInterval(function () {
            /loaded|complete/.test(s.readyState) && Da()
        }, 10));
        typeof s.addEventListener != z && s.addEventListener("DOMContentLoaded", Da, null);
        xb(Da)
    }
    m.ie && m.win && d.attachEvent("onunload", function () {
        for (var a = ja.length, b = 0; b < a; b++) ja[b][0].detachEvent(ja[b][1],
                ja[b][2]);
        a = Ka.length;
        for (b = 0; b < a; b++) Bb(Ka[b]);
        for (var c in m) m[c] = null;
        m = null;
        for (var d in ra) ra[d] = null;
        ra = null
    });
    ra = {
        registerObject: function (a, b, c) {
            if (m.w3cdom && a && b) {
                var d = {};
                d.id = a;
                d.swfVersion = b;
                d.expressInstall = c ? c : !1;
                P[P.length] = d;
                da(a, !1)
            }
        },
        getObjectById: function (a) {
            var b = null;
            if (m.w3cdom && (a = H(a))) {
                var c = a.getElementsByTagName(Q)[0];
                !c || c && typeof a.SetVariable != z ? b = a : typeof c.SetVariable != z && (b = c)
            }
            return b
        },
        embedSWF: function (a, b, c, d, f, h, j, l, g) {
            if (m.w3cdom && a && b && c && d && f) if (c += "", d += "",
                    ta(f)) {
                    da(b, !1);
                    var k = {};
                    if (g && typeof g === Q) for (var n in g) g[n] != Object.prototype[n] && (k[n] = g[n]);
                    k.data = a;
                    k.width = c;
                    k.height = d;
                    var q = {};
                    if (l && typeof l === Q) for (var s in l) l[s] != Object.prototype[s] && (q[s] = l[s]);
                    if (j && typeof j === Q) for (var t in j) j[t] != Object.prototype[t] && (q.flashvars = typeof q.flashvars != z ? q.flashvars + ("&" + t + "=" + j[t]) : t + "=" + j[t]);
                    Ha(function () {
                        $a(k, q, b);
                        k.id == b && da(b, !0)
                    })
                } else if (h && !ha && ta("6.0.65") && (m.win || m.mac)) ha = !0, da(b, !1), Ha(function () {
                    var a = {};
                    a.id = a.altContentId = b;
                    a.width =
                        c;
                    a.height = d;
                    a.expressInstall = h;
                    yb(a)
                })
        },
        getFlashPlayerVersion: function () {
            return {
                major: m.pv[0],
                minor: m.pv[1],
                release: m.pv[2]
            }
        },
        hasFlashPlayerVersion: ta,
        createSWF: function (a, b, c) {
            return m.w3cdom ? $a(a, b, c) : y
        },
        removeSWF: function (a) {
            m.w3cdom && Bb(a)
        },
        createCSS: function (a, b) {
            m.w3cdom && Cb(a, b)
        },
        addDomLoadEvent: Ha,
        addLoadEvent: xb,
        getQueryParamValue: function (a) {
            var b = s.location.search || s.location.hash;
            if (null == a) return Db(b);
            if (b) for (var b = b.substring(1).split("&"), c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf("=")) ==
                        a) return Db(b[c].substring(b[c].indexOf("=") + 1));
            return ""
        },
        expressInstallCallback: function () {
            if (ha && ia) {
                var a = H(zb);
                a && (a.parentNode.replaceChild(ia, a), Ja && (da(Ja, !0), m.ie && m.win && (ia.style.display = "block")), Ja = ia = null, ha = !1)
            }
        }
    };
    Pb.flash = ra;
    c.lang = {
        code: "en",
        of: "of",
        loading: "loading",
        cancel: "Cancel",
        next: "Next",
        previous: "Previous",
        play: "Play",
        pause: "Pause",
        close: "Close",
        errors: {
            single: 'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',
            shared: 'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',
            either: 'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'
        }
    };
    var K, L, S;
    c.img = function (a, b) {
        this.obj = a;
        this.id = b;
        this.ready = !1;
        var c = this;
        K = new Image;
        K.onload = function () {
            c.height = a.height ? parseInt(a.height, 10) : K.height;
            c.width = a.width ? parseInt(a.width, 10) : K.width;
            c.ready = !0;
            K = K.onload = null
        };
        K.src = a.content
    };
    c.img.ext = ["bmp", "gif", "jpg", "jpeg", "png"];
    c.img.prototype = {
        append: function (a, b) {
            var d = document.createElement("img");
            d.id = this.id;
            d.src = this.obj.content;
            d.style.position = "absolute";
            var g, f;
            b.oversized && "resize" == c.options.handleOversize ? (g = b.innerHeight, f = b.innerWidth) : (g = this.height, f = this.width);
            d.setAttribute("height", g);
            d.setAttribute("width", f);
            a.appendChild(d)
        },
        remove: function () {
            var a = t(this.id);
            a && aa(a);
            L && (X(L, "mousedown", gb), aa(L), L = null);
            S = null;
            K && (K = K.onload = null)
        },
        onLoad: function () {
            if (c.dimensions.oversized && "drag" == c.options.handleOversize) {
                x = w = 0;
                g = n = null;
                var a = ["position:absolute", "cursor:" + (c.isGecko ? "-moz-grab" :
                        "move"), "background-color:" + (c.isIE ? "#fff;filter:alpha(opacity=0)" : "transparent")].join(";");
                c.appendHTML(c.skin.body, '<div id="sb-drag-proxy" style="' + a + '"></div>');
                L = t("sb-drag-proxy");
                fb();
                R(L, "mousedown", gb)
            }
        },
        onWindowResize: function () {
            var a = c.dimensions;
            switch (c.options.handleOversize) {
            case "resize":
                var b = t(this.id);
                b.height = a.innerHeight;
                b.width = a.innerWidth;
                break;
            case "drag":
                if (S) {
                    var b = parseInt(c.getStyle(S, "top")),
                        d = parseInt(c.getStyle(S, "left"));
                    b + this.height < a.innerHeight && (S.style.top =
                        a.innerHeight - this.height + "px");
                    d + this.width < a.innerWidth && (S.style.left = a.innerWidth - this.width + "px");
                    fb()
                }
            }
        }
    };
    c.iframe = function (a, b) {
        this.obj = a;
        this.id = b;
        var c = t("sb-overlay");
        this.height = a.height ? parseInt(a.height, 10) : c.offsetHeight;
        this.width = a.width ? parseInt(a.width, 10) : c.offsetWidth
    };
    c.iframe.prototype = {
        append: function (a) {
            var b = '<iframe id="' + this.id + '" name="' + this.id + '" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" style="visibility:hidden" onload="this.style.visibility=\'visible\'" scrolling="auto"';
            c.isIE && (b += ' allowtransparency="true"', c.isIE6 && (b += " src=\"javascript:false;document.write('');\""));
            a.innerHTML = b + "></iframe>"
        },
        remove: function () {
            var a = t(this.id);
            a && (aa(a), c.isGecko && delete d.frames[this.id])
        },
        onLoad: function () {
            (c.isIE ? t(this.id).contentWindow : d.frames[this.id]).location.href = this.obj.content
        }
    };
    c.html = function (a, b) {
        this.obj = a;
        this.id = b;
        this.height = a.height ? parseInt(a.height, 10) : 300;
        this.width = a.width ? parseInt(a.width, 10) : 500
    };
    c.html.prototype = {
        append: function (a) {
            var b = document.createElement("div");
            b.id = this.id;
            b.className = "html";
            b.innerHTML = this.obj.content;
            a.appendChild(b)
        },
        remove: function () {
            var a = t(this.id);
            a && aa(a)
        }
    };
    c.swf = function (a, b) {
        this.obj = a;
        this.id = b;
        this.height = a.height ? parseInt(a.height, 10) : 300;
        this.width = a.width ? parseInt(a.width, 10) : 300
    };
    c.swf.ext = ["swf"];
    c.swf.prototype = {
        append: function (a, b) {
            var d = document.createElement("div");
            d.id = this.id;
            a.appendChild(d);
            c.flash.embedSWF(this.obj.content, this.id, b.innerWidth, b.innerHeight, c.options.flashVersion, c.path + "expressInstall.swf", c.options.flashVars,
                c.options.flashParams)
        },
        remove: function () {
            c.flash.expressInstallCallback();
            c.flash.removeSWF(this.id)
        },
        onWindowResize: function () {
            var a = c.dimensions,
                b = t(this.id);
            b.height = a.innerHeight;
            b.width = a.innerWidth
        }
    };
    c.flv = function (a, b) {
        this.obj = a;
        this.id = b;
        this.height = a.height ? parseInt(a.height, 10) : 300;
        c.options.showMovieControls && (this.height += 20);
        this.width = a.width ? parseInt(a.width, 10) : 300
    };
    c.flv.ext = ["flv", "m4v"];
    c.flv.prototype = {
        append: function (a, b) {
            var d = document.createElement("div");
            d.id = this.id;
            a.appendChild(d);
            var d = b.innerHeight,
                g = b.innerWidth,
                f = c.path + "player.swf",
                h = c.options.flashVersion,
                j = c.path + "expressInstall.swf",
                l = F({
                    file: this.obj.content,
                    height: d,
                    width: g,
                    autostart: c.options.autoplayMovies ? "true" : "false",
                    controlbar: c.options.showMovieControls ? "bottom" : "none",
                    backcolor: "0x000000",
                    frontcolor: "0xCCCCCC",
                    lightcolor: "0x557722"
                }, c.options.flashVars);
            c.flash.embedSWF(f, this.id, g, d, h, j, l, c.options.flashParams)
        },
        remove: function () {
            c.flash.expressInstallCallback();
            c.flash.removeSWF(this.id)
        },
        onWindowResize: function () {
            var a =
                c.dimensions,
                b = t(this.id);
            b.height = a.innerHeight;
            b.width = a.innerWidth
        }
    };
    c.qt = function (a, b) {
        this.obj = a;
        this.id = b;
        this.height = a.height ? parseInt(a.height, 10) : 300;
        c.options.showMovieControls && (this.height += 16);
        this.width = a.width ? parseInt(a.width, 10) : 300
    };
    c.qt.ext = "dv mov moov movie mp4 avi mpg mpeg".split(" ");
    c.qt.prototype = {
        append: function (a) {
            var b = c.options,
                d = String(b.autoplayMovies),
                g = String(b.showMovieControls),
                b = "<object",
                f = {
                    id: this.id,
                    name: this.id,
                    height: this.height,
                    width: this.width,
                    kioskmode: "true"
                };
            c.isIE ? (f.classid = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B", f.codebase = "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0") : (f.type = "video/quicktime", f.data = this.obj.content);
            for (var h in f) b += " " + h + '="' + f[h] + '"';
            var b = b + ">",
                d = {
                    src: this.obj.content,
                    scale: "aspect",
                    controller: g,
                    autoplay: d
                }, j;
            for (j in d) b += '<param name="' + j + '" value="' + d[j] + '">';
            a.innerHTML = b + "</object>"
        },
        remove: function () {
            try {
                document[this.id].Stop()
            } catch (a) {}
            var b = t(this.id);
            b && aa(b)
        }
    };
    var Xb = c.isIE ? 70 : 45;
    c.wmp = function (a,
        b) {
        this.obj = a;
        this.id = b;
        this.height = a.height ? parseInt(a.height, 10) : 300;
        c.options.showMovieControls && (this.height += Xb);
        this.width = a.width ? parseInt(a.width, 10) : 300
    };
    c.wmp.ext = "asf avi mpg mpeg wm wmv".split(" ");
    c.wmp.prototype = {
        append: function (a) {
            var b = c.options,
                d = '<object id="' + this.id + '" name="' + this.id + '" height="' + this.height + '" width="' + this.width + '"',
                g = {
                    autostart: b.autoplayMovies ? 1 : 0
                };
            c.isIE ? (d += ' classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6"', g.url = this.obj.content, g.uimode = b.showMovieControls ?
                "full" : "none") : (d = d + ' type="video/x-ms-wmv"' + (' data="' + this.obj.content + '"'), g.showcontrols = b.showMovieControls ? 1 : 0);
            var d = d + ">",
                f;
            for (f in g) d += '<param name="' + f + '" value="' + g[f] + '">';
            d += "</object>";
            a.innerHTML = d
        },
        remove: function () {
            if (c.isIE) try {
                    d[this.id].controls.stop(), d[this.id].URL = "movie" + Y() + ".wmv", d[this.id] = function () {}
            } catch (a) {}
            var b = t(this.id);
            b && setTimeout(function () {
                aa(b)
            }, 10)
        }
    };
    var bb = !1,
        Ra = [],
        Yb = ["sb-nav-close", "sb-nav-next", "sb-nav-play", "sb-nav-pause", "sb-nav-previous"],
        J, N, T,
        cb = !0,
        la = {
            markup: '<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()"></a><a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a></div></div></div></div></div>',
            options: {
                animSequence: "sync",
                counterLimit: 10,
                counterType: "default",
                displayCounter: !0,
                displayNav: !0,
                fadeDuration: 0.35,
                initialHeight: 160,
                initialWidth: 320,
                modal: !1,
                overlayColor: "#000",
                overlayOpacity: 0.5,
                resizeDuration: 0.35,
                showOverlay: !0,
                troubleElements: ["select", "object", "embed", "canvas"]
            },
            init: function () {
                c.appendHTML(document.body, wa(la.markup, c.lang));
                la.body = t("sb-body-inner");
                J = t("sb-container");
                N = t("sb-overlay");
                T = t("sb-wrapper");
                za || (J.style.position = "absolute");
                if (!ya) {
                    var a, b, e = /url\("(.*\.png)"\)/;
                    A(Yb, function (d, h) {
                        if (a = t(h)) if (b = c.getStyle(a, "backgroundImage").match(e)) a.style.backgroundImage = "none", a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=" + b[1] + ",sizingMethod=scale);"
                    })
                }
                var g;
                R(d, "resize", function () {
                    g && (clearTimeout(g), g = null);
                    E && (g = setTimeout(la.onWindowResize, 10))
                })
            },
            onOpen: function (a, b) {
                cb = !1;
                J.style.display = "block";
                jb();
                var e = Sa(c.options.initialHeight, c.options.initialWidth);
                ma(e.innerHeight, e.top);
                na(e.width, e.left);
                c.options.showOverlay &&
                    (N.style.backgroundColor = c.options.overlayColor, c.setOpacity(N, 0), c.options.modal || R(N, "click", c.close), bb = !0);
                za || (Qa(), R(d, "scroll", Qa));
                kb();
                J.style.visibility = "visible";
                bb ? G(N, "opacity", c.options.overlayOpacity, c.options.fadeDuration, b) : b()
            },
            onLoad: function (a, b) {
                for (lb(!0); la.body.firstChild;) aa(la.body.firstChild);
                var d = t("sb-title"),
                    g = t("sb-info"),
                    d = d.offsetHeight,
                    g = g.offsetHeight,
                    f = t("sb-title-inner"),
                    h = t("sb-info-inner"),
                    j = a ? 0.35 : 0;
                G(f, "marginTop", d, j);
                G(h, "marginTop", -1 * g, j, function () {
                    f.style.visibility =
                        h.style.visibility = "hidden";
                    if (E) {
                        a || (T.style.visibility = "visible");
                        var d = c.getCurrent();
                        t("sb-title-inner").innerHTML = d.title || "";
                        var e, g, j, k, m;
                        c.options.displayNav ? (e = !0, d = c.gallery.length, 1 < d && (c.options.continuous ? g = m = !0 : (g = d - 1 > c.current, m = 0 < c.current)), 0 < c.options.slideshowDelay && c.hasNext() && (k = !c.isPaused(), j = !k)) : e = g = j = k = m = !1;
                        M("close", e);
                        M("next", g);
                        M("play", j);
                        M("pause", k);
                        M("previous", m);
                        g = "";
                        if (c.options.displayCounter && 1 < c.gallery.length) if (d = c.gallery.length, "skip" == c.options.counterType) {
                                j =
                                    0;
                                m = d;
                                k = parseInt(c.options.counterLimit) || 0;
                                k < d && 2 < k && (m = Math.floor(k / 2), j = c.current - m, 0 > j && (j += d), m = c.current + (k - m), m > d && (m -= d));
                                for (; j != m;) j == d && (j = 0), g += '<a onclick="Shadowbox.change(' + j + ');"', j == c.current && (g += ' class="sb-counter-current"'), g += ">" + ++j + "</a>"
                            } else g = [c.current + 1, c.lang.of, d].join(" ");
                        t("sb-counter").innerHTML = g;
                        b()
                    }
                })
            },
            onReady: function (a) {
                if (E) {
                    var b = c.player,
                        d = Sa(b.height, b.width),
                        g = function () {
                            var b = t("sb-title-inner"),
                                c = t("sb-info-inner");
                            b.style.visibility = c.style.visibility =
                                "";
                            "" != b.innerHTML && G(b, "marginTop", 0, 0.35);
                            G(c, "marginTop", 0, 0.35, a)
                        };
                    switch (c.options.animSequence) {
                    case "hw":
                        ma(d.innerHeight, d.top, !0, function () {
                            na(d.width, d.left, !0, g)
                        });
                        break;
                    case "wh":
                        na(d.width, d.left, !0, function () {
                            ma(d.innerHeight, d.top, !0, g)
                        });
                        break;
                    default:
                        na(d.width, d.left, !0), ma(d.innerHeight, d.top, !0, g)
                    }
                }
            },
            onShow: function (a) {
                lb(!1, a);
                cb = !0
            },
            onClose: function () {
                za || X(d, "scroll", Qa);
                X(N, "click", c.close);
                T.style.visibility = "hidden";
                var a = function () {
                    J.style.visibility = "hidden";
                    J.style.display =
                        "none";
                    kb(!0)
                };
                bb ? G(N, "opacity", 0, c.options.fadeDuration, a) : a()
            },
            onPlay: function () {
                M("play", !1);
                M("pause", !0)
            },
            onPause: function () {
                M("pause", !1);
                M("play", !0)
            },
            onWindowResize: function () {
                if (cb) {
                    jb();
                    var a = c.player,
                        b = Sa(a.height, a.width);
                    na(b.width, b.left);
                    ma(b.innerHeight, b.top);
                    if (a.onWindowResize) a.onWindowResize()
                }
            }
        };
    c.skin = la;
    d.Shadowbox = c
})(window);
Shadowbox.init({
    skipSetup: !0
});



var boxShadowDown = {
    boxShadow: "2 3 9 -1 #400339"
}, boxShadowUp = {
        boxShadow: "10 15 30 -5 #400339"
    }, timeoutId, worktypes = [],
    paragraphs = [];
jQuery.extend(jQuery.fn, {
    hasParent: function (d) {
        return this.filter(function () {
            return $(d).find(this).length
        })
    }
});
jQuery(document).ready(function (d) {
    function y(g) {
        if (0 < g.length) {
            var k = g.shift();
            d(k).effect("shake", "easeInOutBack", "slow", function () {
                y(g)
            })
        }
    }
    function w() {
        d("#hint").text("I mean...if you don't want to you don't have to- just keep doing what you're doing.").show("fade", 500);
        timeoutId = window.setTimeout(x, 1E4)
    }
    function x() {
        d("#hint").text("(which is nothing).").show("fade", 500);
        timeoutId = window.setTimeout(n, 5E3)
    }
    function n() {
        d("#hint").text("...so...how are things?").show("fade", 500);
        timeoutId = window.setTimeout(g,
            1E4)
    }
    function g() {
        d("#hint").text("did you really respond to that question in your head?").show("fade", 500);
        timeoutId = window.setTimeout(k, 1E4)
    }
    function k() {
        d("#hint").text("if you did, just a heads up- next time i ask you a question, you don't have to answer it...i'm not real").show("fade", 500);
        timeoutId = window.setTimeout(u, 1E4)
    }
    function u() {
        d("#hint").text("...or am i?").show("fade", 500);
        timeoutId = window.setTimeout(ua, 5E3)
    }
    function ua() {
        d("#hint").text("uh oh...").show("fade", 500);
        timeoutId = window.setTimeout(Oa,
            5E3)
    }
    function Oa() {
        d("#hint").text("have you ever been on a website while it's having an existential crisis?").show("fade", 500);
        timeoutId = window.setTimeout(va, 1E4)
    }
    function va() {
        d("#hint").text("now you're just being cruel. i'm just trying to do my job.").show("fade", 500);
        timeoutId = window.setTimeout(W, 1E4)
    }
    function W() {
        d("#hint").text("come on. do me a solid and click one of the buttons. i'm getting anxious because you're just sitting there.").show("fade", 500);
        timeoutId = window.setTimeout(Y, 1E4)
    }
    function Y() {
        d("#hint").text("ok, i can't take it anymore. i refuse to play your mind games, visitor. here's some content.").show("fade",
            500);
        timeoutId = window.setTimeout(F, 1E4)
    }
    function F() {
        d("galleryDiv, header h1, #portfolio, footer").show("slow").removeClass("hide");
        d("#hint").hide();
        resizeImg();
        timeoutId = window.setTimeout(A, 1E4)
    }
    function A() {
        d("#galleryDiv").text("BAM. now, in case you want to see some stuff, there's a box here to put that stuff in. (no pressure).");
        timeoutId = window.setTimeout(wa, 1E4)
    }
    function wa() {
        d("#galleryDiv").text("hey. thanks for letting me do stuff for you.");
        timeoutId = window.setTimeout(Z, 1E4)
    }
    function Z() {
        d("#galleryDiv").text("oh. and server wanted me to tell you he said it has been a pleasure to almost serve you, so far.");
        timeoutId = window.setTimeout(t, 1E4)
    }
    function t() {}
    timeoutId = window.setTimeout(function () {
        d(".workTypes").not(".workTypesSelected") && (y(worktypes), d("#hint").css("visibility", "visible").text("(if you want to see my work, just click one of these buttons.)").show("fade", 500), timeoutId = window.setTimeout(w, 9E4))
    }, 6E3);
    d(".workTypes").each(function () {
        worktypes.push(this)
    });
    d("article, footer").hide();
    d("header h1").replaceWith("<h1> :-) </h1>");
    d("header h1").delay(500).effect("fade", "easeOutQuart", 1E3, function () {
        d(this).hide().text("Andrew Luhring").show("slow");
        d("header h1").switchClass("hide", "unhide").show();
        d("#hint").css("visibility", "hidden")
    });
    d("#galleryDiv").addClass("hide");
    d(".workTypes").animate(boxShadowDown, 100);
    d("article").delay(2E3).show(1500, function () {
        d("footer").show(1500)
    });
    d(".workTypes").delay(3500).animate(boxShadowUp, 500);
    d(".workTypes").parent().click(function () {
        window.clearTimeout(timeoutId);
        d("#galleryDiv").removeClass("hide").show("blind", "slow");
        d("#hint").hide();
        d("#galleryDiv").text()
    })
});
var galDiv = document.getElementById("galleryDiv"),
    height = galDiv.innerHeight,
    width = galDiv.innerWidth,
    imgArray = [],
    imgs = document.getElementsByTagName("img"),
    section, timeoutIda, viewportWidth;
jQuery(document).ready(function (d) {
    function y() {
        viewportWidth = d(window).width();
        767 > viewportWidth && (d("#galleryDiv"), d("body").animate({
            scrollTop: 0
        }, "slow", "easeInOutQuint"));
        window.clearTimeout(timeoutIda)
    }
    function w() {
        for (var n = d("#galleryDiv").width(), g, k = 0; k < imgArray.length; k++) g = imgArray[k].width = n / imgs.length - 5, d("#galleryDiv a img").css({
                width: g + "px",
                height: "auto",
                "max-width": "315px"
            }, "slow");
        viewportWidth = d(window).width();
        767 <= viewportWidth && 1024 >= viewportWidth ? (n / imgs.length - 5) * imgs.length <=
            n && (n = parseFloat(d("#galleryDiv img").css("min-width")) * imgs.length, d("#galleryDiv").css("min-width", n)) : 767 > viewportWidth && (d("#galleryDiv").css("min-width", 240), timeoutIda = window.setTimeout(y, 2E3))
    }
    for (var x = 0; x < imgs.length; x++) imgArray.push(imgs[x]);
    d(window).resize(function () {
        w()
    });
    d(".workTypes").click(function () {
        timeoutIda = window.setTimeout(w, 1E3)
    })
});
boxShadowDown = {
    boxShadow: "2 3 9 -1 #400339"
};
boxShadowUp = {
    boxShadow: "10 15 30 -5 #400339"
};
jQuery(document).ready(function (d) {
    function y() {
        d("#temp, #clickToClose").hide("fade", 200);
        jQuery.each(d("img.gallery, #galleryDiv a"), function () {
            d(this).show("slide", "down", "500").switchClass("hide", "unhide", 1500)
        });
        window.clearTimeout(timeoutId)
    }
    var w = ["albumArt", "logoDesign", "UX", "other"],
        x = {}, n, g;
    for (g = 0; g < w.length; g++) {
        var k = w[g];
        x[k] = d("." + k)
    }
    d("#centeringDiv a, a.resume, #centeringDiv a img").click(function (d) {
        d.preventDefault()
    });
    var u;
    function wzz() {
        for (var n = d("#galleryDiv").width(), g, k = 0; k < imgArray.length; k++) g = imgArray[k].width = n / imgs.length - 5, d("#galleryDiv a img").css({
                width: g + "px",
                height: "auto",
                "max-width": "315px"
            }, "slow");
        viewportWidth = d(window).width();
        767 <= viewportWidth && 1024 >= viewportWidth ? (n / imgs.length - 5) * imgs.length <=
            n && (n = parseFloat(d("#galleryDiv img").css("min-width")) * imgs.length, d("#galleryDiv").css("min-width", n)) : 767 > viewportWidth && (d("#galleryDiv").css("min-width", 240), timeoutIda = window.setTimeout(y, 2E3))
    }

    d(".workTypes").click(function () {
        window.clearTimeout(timeoutId);
        d(this).stop(!0, !0).animate(boxShadowDown, 300);
        d(this).addClass("workTypesSelected", "fast");
        u = d(this).attr("id");
        n = x[u];
        d(".workTypes").not(this).hasClass("workTypesSelected") && (d(".workTypes").not(this).animate(boxShadowUp, 400), d(".workTypes").not(this).removeClass("workTypesSelected", " fast"));
        d("#galleryDiv").empty().addClass("flexy");
        for (g = 0; g < n.length; g++) {
            var k = n.eq(g);
            d("<a>").attr({
                href: k.attr("href"),
                title: k.attr("title"),
                "class": "lb_gal"
            }).append(d("<img>").attr({
                id: "largeGallery" + g,
                src: k.attr("href"),
                "class": "gallery cf",
                rel: "shadowbox[gallery]",
                width: "0px",
                height: "0px"
            })).show("fade", 2E3, wzz()).appendTo("#galleryDiv")
            
        }
        d(this).is("#other") ? (jQuery.each(d("img.gallery, #galleryDiv a"), function () {
            d(this).hide().addClass("hide");
            d("img.gallery").toArray();
            d("#galleryDiv a").toArray()
        }), d("#galleryDiv").append('<div><p id="temp" style="text-align:center">Click the pic to play with the code</p> <p id="clickToClose">Show</p></div>').show(500),
		        timeoutId = window.setTimeout(y, 2E3), d("#temp, #clickToClose").click(function () {
            timeoutId = window.setTimeout(y, 200)
        }), d("#galleryDiv a").addClass("iframed"), d("#galleryDiv a").hasClass("iframed") && (d("#galleryDiv a img").removeAttr("rel"), d("#largeGallery0").parent().attr({
            href: "http://jsfiddle.net/Luhring/jVsfx/"
        }), d("#largeGallery1").parent().attr({
            href: "http://jsfiddle.net/Luhring/SBPWw/"
        }), d("#largeGallery2").parent().attr({
            href: "http://jsfiddle.net/Luhring/qSKsJ/"
        }), d("#largeGallery3").parent().attr({
            href: "http://jsfiddle.net/Luhring/3qPaE/"
        }), timeoutId = window.setTimeout(y, 2E3))) : d(this).is("#UX") ? (jQuery.each(d("img.gallery, #galleryDiv a"), function () {
            d(this).hide().addClass("hide")
        }),
            d("#largeGallery0").parent().attr({
            href: "http://www.androo.pro/TemporaryLandingIndex.html"
        }), d("#largeGallery1").parent().attr({
            href: "http://www.plasticsurgeryresource.com/wordpress/"
        }), d("#largeGallery2").parent().attr({
            href: "http://androo.pro/portfolio/corptax/"
        }), d("#largeGallery3").parent().attr({
            href: "http://www.androo.pro/portfolio/milyli/"
        }), d("#largeGallery4").parent().attr({
            href: "http://www.androo.pro/portfolio/quinn/"
        }), d("#largeGallery5").parent().attr({
            href: "http://www.androo.pro/portfolio/bobbys/"
        }), d("#largeGallery6").parent().attr({
			href: "http://www.androo.pro/portfolio/danaco/"
        }),
		d("#galleryDiv").append('<div><p id="temp">Important point: <br /> This website is also a portfolio piece.</p><p id="clickToClose">Show</p></div>').show(1000),
		        setTimeout(y, 3E3)) : d(this).is("#albumArt") ? (function(){d("#largeGallery0").parent().attr({href: "http://www.androo.pro/portfolio/bythehand/"})
		        d("#largeGallery1").parent().attr({href: "http://www.androo.pro/truck/truck.html"})})() : (d("#galleryDiv").text(), window.clearTimeout(timeoutId));
        Shadowbox.setup(d("#galleryDiv a.lb_gal"), {
            gallery: "gallery"
        })
    });
    d(".resume").click(function () {
        Shadowbox.setup(d(this))
    });
});