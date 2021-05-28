/** @license
 DHTML Snowstorm! JavaScript-based snow for web pages
 Making it snow on the internets since 2003. You're welcome.
 -----------------------------------------------------------
 Version 1.44.20131208 (Previous rev: 1.44.20131125)
 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License
 http://schillmania.com/projects/snowstorm/license.txt
*/
var snowStorm = (function (g, f) {
    // --- common properties ---
    this.excludeMobile = this.autoStart = !0; // Whether the snow should start automatically or not.
    this.flakesMax = 192; // Limit total amount of snow made (falling + sticking)
    this.flakesMaxActive = 64; // Limit amount of snow falling at once (less = lower CPU use)
    this.animationInterval = 33; // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
    this.useGPU = !0; // Enable transform-based hardware acceleration, reduce CPU load.
    this.className = null; // CSS class name for further customization on snow elements
    this.excludeMobile = !0; // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
    this.flakeBottom = null; // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
    this.followMouse = !0; // Snow movement can respond to the user's mouse
    this.snowColor = "#fff"; // Don't eat (or use?) yellow snow.
    this.flakeHeight = this.flakeWidth = 20; // Max pixel width & height reserved for snow element
    // • = bullet, · is square on some systems etc. (i use cherry blossom)
    var currTime = new Date;
    if (currTime.getMonth() >= 3 && currTime.getMonth() < 6)
        this.snowCharacter =
        '<img src="https://png2.cleanpng.com/sh/73d6b8875af23ff0e07c7754d56797c6/L0KzQYm3VcMyN5ZwfZH0aYP2gLBuTfRzaahuhtk2b3PrfrK0if51bZhqiuRybXGwgLb7gfwubJZ4gAZ4cD36cb3zkPFxbaMygNHqLX3keX68gsExP5c4TdVqNEi4RXA4UcU1OmY6TKMAMke7QIiAWcc5Omk7RuJ3Zx==/kisspng-drawing-ochna-integerrima-petal-desktop-wallpaper-hoa-mai-5b107f35ca4855.1154255415278077978286.png" style="width:100%; height:auto;">';
    else if (currTime.getMonth() >= 6 && currTime.getMonth() < 8)
        this.snowCharacter =
        '<img src="https://i.pinimg.com/originals/42/1b/a2/421ba2c5f0dacf23777c9cd2e92da906.png" style="width:100%; height:auto;">';
    else if (currTime.getMonth() >= 9 && currTime.getMonth() < 11)
        this.snowCharacter =
        '<img src="https://www.asuzac-acm.com.vn/themes/acm-2020/images/hoaanhdao/hoadao.png" style="width:100%; height:auto;">';
    else {
        this.snowCharacter = "&bull;";
        this.flakeHeight = this.flakeWidth = 8;
    }
    this.snowStick = !0; // Whether or not snow should "stick" at the bottom. When off, will never collect.
    this.targetElement = null; // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
    this.useMeltEffect = !0; // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
    this.usePixelPosition = this.usePositionFixed = this.useTwinkleEffect = !1; // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported

    // --- less-used bits ---
    this.freezeOnBlur = !0; // Only snow when the window is in focus (foreground.) Saves CPU.
    this.flakeRightOffset = this.flakeLeftOffset = 0; // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars. Right margin/gutter space on edge of container
    this.vMaxX = 2; // Maximum X velocity range for snow
    this.vMaxY = 3; // Maximum Y velocity range for snow
    this.zIndex = 99999; // CSS stacking order applied to each snowflake

    // --- "No user-serviceable parts inside" past this point ---
    var a = this, // UA sniffing and backCompat rendering mode checks for fixed position, etc.
        q,
        m = navigator.userAgent.match(/msie/i),
        E = navigator.userAgent.match(/msie 6/i),
        D = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
        r = (m && "BackCompat" === f.compatMode) || E,
        h = null,
        n = null,
        l = null,
        p = null,
        s = null,
        z = null,
        A = null,
        v = 1,
        t = !1,
        w = !1,
        u;
    a: {
        try {
            f.createElement("div").style.opacity = "0.5";
        } catch (F) {
            u = !1;
            break a;
        }
        u = !0;
    }
    var B = !1,
        C = f.createDocumentFragment();
    q = (function () {
        function c(b) {
            g.setTimeout(b, 1e3 / (a.animationInterval || 20));
        }

        function d(a) {
            return void 0 !== h.style[a] ? a : null;
        }
        var e,
            b =
            g.requestAnimationFrame ||
            g.webkitRequestAnimationFrame ||
            g.mozRequestAnimationFrame ||
            g.oRequestAnimationFrame ||
            g.msRequestAnimationFrame ||
            c;
        e = b ?
            function () {
                return b.apply(g, arguments);
            } :
            null;
        var h;
        h = f.createElement("div");
        e = {
            transform: {
                ie: d("-ms-transform"),
                moz: d("MozTransform"),
                opera: d("OTransform"),
                webkit: d("webkitTransform"),
                w3: d("transform"),
                prop: null,
            },
            getAnimationFrame: e,
        };
        e.transform.prop =
            e.transform.w3 ||
            e.transform.moz ||
            e.transform.webkit ||
            e.transform.ie ||
            e.transform.opera;
        h = null;
        return e;
    })();

    function k(a, d) {
        isNaN(d) && (d = 0);
        return Math.random() * a + d;
    }

    function x() {
        g.setTimeout(function () {
            a.start(!0);
        }, 20);
        a.events.remove(m ? f : g, "mousemove", x);
    }

    function y() {
        (!a.excludeMobile || !D) && x();
        a.events.remove(g, "load", y);
    }
    this.timer = null;
    this.flakes = [];
    this.active = this.disabled = !1;
    this.meltFrameCount = 20;
    this.meltFrames = [];
    this.setXY = function (c, d, e) {
        if (!c) return !1;
        a.usePixelPosition || w ?
            ((c.style.left = d - a.flakeWidth + "px"),
                (c.style.top = e - a.flakeHeight + "px")) :
            r ?
            ((c.style.right = 100 - 100 * (d / h) + "%"),
                (c.style.top = Math.min(e, s - a.flakeHeight) + "px")) :
            a.flakeBottom ?
            ((c.style.right = 100 - 100 * (d / h) + "%"),
                (c.style.top = Math.min(e, s - a.flakeHeight) + "px")) :
            ((c.style.right = 100 - 100 * (d / h) + "%"),
                (c.style.bottom = 100 - 100 * (e / l) + "%"));
    };
    this.events = (function () {
        function a(c) {
            c = b.call(c);
            var d = c.length;
            e ? ((c[1] = "on" + c[1]), 3 < d && c.pop()) : 3 === d && c.push(!1);
            return c;
        }

        function d(a, b) {
            var c = a.shift(),
                d = [f[b]];
            if (e) c[d](a[0], a[1]);
            else c[d].apply(c, a);
        }
        var e = !g.addEventListener && g.attachEvent,
            b = Array.prototype.slice,
            f = {
                add: e ? "attachEvent" : "addEventListener",
                remove: e ? "detachEvent" : "removeEventListener",
            };
        return {
            add: function () {
                d(a(arguments), "add");
            },
            remove: function () {
                d(a(arguments), "remove");
            },
        };
    })();
    this.randomizeWind = function () {
        var c;
        c = k(a.vMaxX, 0.2);
        z = 1 === parseInt(k(2), 10) ? -1 * c : c;
        A = k(a.vMaxY, 0.2);
        if (this.flakes)
            for (c = 0; c < this.flakes.length; c++)
                this.flakes[c].active && this.flakes[c].setVelocities();
    };
    this.scrollHandler = function () {
        var c;
        p = a.flakeBottom ?
            0 :
            parseInt(
                g.scrollY ||
                f.documentElement.scrollTop ||
                (r ? f.body.scrollTop : 0),
                10
            );
        isNaN(p) && (p = 0);
        if (!t && !a.flakeBottom && a.flakes)
            for (c = 0; c < a.flakes.length; c++)
                0 === a.flakes[c].active && a.flakes[c].stick();
    };
    this.resizeHandler = function () {
        g.innerWidth || g.innerHeight ?
            ((h = g.innerWidth - 16 - a.flakeRightOffset),
                (l = a.flakeBottom || g.innerHeight)) :
            ((h =
                    (f.documentElement.clientWidth ||
                        f.body.clientWidth ||
                        f.body.scrollWidth) -
                    (!m ? 8 : 0) -
                    a.flakeRightOffset),
                (l =
                    a.flakeBottom ||
                    f.documentElement.clientHeight ||
                    f.body.clientHeight ||
                    f.body.scrollHeight));
        s = f.body.offsetHeight;
        n = parseInt(h / 2, 10);
    };
    this.resizeHandlerAlt = function () {
        h = a.targetElement.offsetWidth - a.flakeRightOffset;
        l = a.flakeBottom || a.targetElement.offsetHeight;
        n = parseInt(h / 2, 10);
        s = f.body.offsetHeight;
    };
    this.freeze = function () {
        if (a.disabled) return !1;
        a.disabled = 1;
        a.timer = null;
    };
    this.resume = function () {
        if (a.disabled) a.disabled = 0;
        else return !1;
        a.timerInit();
    };
    this.toggleSnow = function () {
        a.flakes.length ?
            ((a.active = !a.active),
                a.active ? (a.show(), a.resume()) : (a.stop(), a.freeze())) :
            a.start();
    };
    this.stop = function () {
        var c;
        this.freeze();
        for (c = 0; c < this.flakes.length; c++)
            this.flakes[c].o.style.display = "none";
        a.events.remove(g, "scroll", a.scrollHandler);
        a.events.remove(g, "resize", a.resizeHandler);
        a.freezeOnBlur &&
            (m ?
                (a.events.remove(f, "focusout", a.freeze),
                    a.events.remove(f, "focusin", a.resume)) :
                (a.events.remove(g, "blur", a.freeze),
                    a.events.remove(g, "focus", a.resume)));
    };
    this.show = function () {
        var a;
        for (a = 0; a < this.flakes.length; a++)
            this.flakes[a].o.style.display = "block";
    };
    this.SnowFlake = function (c, d, e) {
        var b = this;
        this.type = c;
        this.x = d || parseInt(k(h - 20), 10);
        this.y = !isNaN(e) ? e : -k(l) - 12;
        this.vY = this.vX = null;
        this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8];
        this.vAmp = this.vAmpTypes[this.type] || 1;
        this.melting = !1;
        this.meltFrameCount = a.meltFrameCount;
        this.meltFrames = a.meltFrames;
        this.twinkleFrame = this.meltFrame = 0;
        this.active = 1;
        this.fontSize = 10 + 10 * (this.type / 5);
        this.o = f.createElement("div");
        this.o.innerHTML = a.snowCharacter;
        a.className && this.o.setAttribute("class", a.className);
        this.o.style.color = a.snowColor;
        this.o.style.position = t ? "fixed" : "absolute";
        a.useGPU &&
            q.transform.prop &&
            (this.o.style[q.transform.prop] = "translate3d(0px, 0px, 0px)");
        this.o.style.width = a.flakeWidth + "px";
        this.o.style.height = a.flakeHeight + "px";
        this.o.style.fontFamily = "arial,verdana";
        this.o.style.cursor = "default";
        this.o.style.overflow = "hidden";
        this.o.style.fontWeight = "normal";
        this.o.style.zIndex = a.zIndex;
        C.appendChild(this.o);
        this.refresh = function () {
            if (isNaN(b.x) || isNaN(b.y)) return !1;
            a.setXY(b.o, b.x, b.y);
        };
        this.stick = function () {
            r || (a.targetElement !== f.documentElement && a.targetElement !== f.body) ?
                (b.o.style.top = l + p - a.flakeHeight + "px") :
                a.flakeBottom ?
                (b.o.style.top = a.flakeBottom + "px") :
                ((b.o.style.display = "none"),
                    (b.o.style.bottom = "0%"),
                    (b.o.style.position = "fixed"),
                    (b.o.style.display = "block"));
        };
        this.vCheck = function () {
            0 <= b.vX && 0.2 > b.vX ?
                (b.vX = 0.2) :
                0 > b.vX && -0.2 < b.vX && (b.vX = -0.2);
            0 <= b.vY && 0.2 > b.vY && (b.vY = 0.2);
        };
        this.move = function () {
            var c = b.vX * v;
            b.x += c;
            b.y += b.vY * b.vAmp;
            b.x >= h || h - b.x < a.flakeWidth ?
                (b.x = 0) :
                0 > c &&
                b.x - a.flakeLeftOffset < -a.flakeWidth &&
                (b.x = h - a.flakeWidth - 1);
            b.refresh();
            l + p - b.y + a.flakeHeight < a.flakeHeight ?
                ((b.active = 0), a.snowStick ? b.stick() : b.recycle()) :
                (a.useMeltEffect &&
                    b.active &&
                    3 > b.type &&
                    !b.melting &&
                    0.998 < Math.random() &&
                    ((b.melting = !0), b.melt()),
                    a.useTwinkleEffect &&
                    (0 > b.twinkleFrame ?
                        0.97 < Math.random() &&
                        (b.twinkleFrame = parseInt(8 * Math.random(), 10)) :
                        (b.twinkleFrame--,
                            u ?
                            (b.o.style.opacity =
                                b.twinkleFrame && 0 === b.twinkleFrame % 2 ? 0 : 1) :
                            (b.o.style.visibility =
                                b.twinkleFrame && 0 === b.twinkleFrame % 2 ?
                                "hidden" :
                                "visible"))));
        };
        this.animate = function () {
            b.move();
        };
        this.setVelocities = function () {
            b.vX = z + k(0.12 * a.vMaxX, 0.1);
            b.vY = A + k(0.12 * a.vMaxY, 0.1);
        };
        this.setOpacity = function (a, b) {
            if (!u) return !1;
            a.style.opacity = b;
        };
        this.melt = function () {
            !a.useMeltEffect || !b.melting ?
                b.recycle() :
                b.meltFrame < b.meltFrameCount ?
                (b.setOpacity(b.o, b.meltFrames[b.meltFrame]),
                    (b.o.style.fontSize =
                        b.fontSize - b.fontSize * (b.meltFrame / b.meltFrameCount) + "px"),
                    (b.o.style.lineHeight =
                        a.flakeHeight +
                        2 +
                        0.75 * a.flakeHeight * (b.meltFrame / b.meltFrameCount) +
                        "px"),
                    b.meltFrame++) :
                b.recycle();
        };
        this.recycle = function () {
            b.o.style.display = "none";
            b.o.style.position = t ? "fixed" : "absolute";
            b.o.style.bottom = "auto";
            b.setVelocities();
            b.vCheck();
            b.meltFrame = 0;
            b.melting = !1;
            b.setOpacity(b.o, 1);
            b.o.style.padding = "0px";
            b.o.style.margin = "0px";
            b.o.style.fontSize = b.fontSize + "px";
            b.o.style.lineHeight = a.flakeHeight + 2 + "px";
            b.o.style.textAlign = "center";
            b.o.style.verticalAlign = "baseline";
            b.x = parseInt(k(h - a.flakeWidth - 20), 10);
            b.y = parseInt(-1 * k(l), 10) - a.flakeHeight;
            b.refresh();
            b.o.style.display = "block";
            b.active = 1;
        };
        this.recycle();
        this.refresh();
    };
    this.snow = function () {
        var c = 0,
            d = null,
            e,
            d = 0;
        for (e = a.flakes.length; d < e; d++)
            1 === a.flakes[d].active && (a.flakes[d].move(), c++),
            a.flakes[d].melting && a.flakes[d].melt();
        c < a.flakesMaxActive &&
            ((d = a.flakes[parseInt(k(a.flakes.length), 10)]),
                0 === d.active && (d.melting = !0));
        a.timer && q.getAnimationFrame(a.snow);
    };
    this.mouseMove = function (c) {
        if (!a.followMouse) return !0;
        c = parseInt(c.clientX, 10);
        c < n ? (v = -2 + 2 * (c / n)) : ((c -= n), (v = 2 * (c / n)));
    };
    this.createSnow = function (c, d) {
        var e;
        for (e = 0; e < c; e++)
            if (
                ((a.flakes[a.flakes.length] = new a.SnowFlake(parseInt(k(6), 10))),
                    d || e > a.flakesMaxActive)
            )
                a.flakes[a.flakes.length - 1].active = -1;
        a.targetElement.appendChild(C);
    };
    this.timerInit = function () {
        a.timer = !0;
        a.snow();
    };
    this.init = function () {
        var c;
        for (c = 0; c < a.meltFrameCount; c++)
            a.meltFrames.push(1 - c / a.meltFrameCount);
        a.randomizeWind();
        a.createSnow(a.flakesMax);
        a.events.add(g, "resize", a.resizeHandler);
        a.events.add(g, "scroll", a.scrollHandler);
        a.freezeOnBlur &&
            (m ?
                (a.events.add(f, "focusout", a.freeze),
                    a.events.add(f, "focusin", a.resume)) :
                (a.events.add(g, "blur", a.freeze),
                    a.events.add(g, "focus", a.resume)));
        a.resizeHandler();
        a.scrollHandler();
        a.followMouse && a.events.add(m ? f : g, "mousemove", a.mouseMove);
        a.animationInterval = Math.max(20, a.animationInterval);
        a.timerInit();
    };
    this.start = function (c) {
        if (B) {
            if (c) return !0;
        } else B = !0;
        if (
            "string" === typeof a.targetElement &&
            ((c = a.targetElement),
                (a.targetElement = f.getElementById(c)),
                !a.targetElement)
        )
            throw Error('Snowstorm: Unable to get targetElement "' + c + '"');
        a.targetElement || (a.targetElement = f.body || f.documentElement);
        a.targetElement !== f.documentElement &&
            a.targetElement !== f.body &&
            ((a.resizeHandler = a.resizeHandlerAlt), (a.usePixelPosition = !0));
        a.resizeHandler();
        a.usePositionFixed = a.usePositionFixed && !r && !a.flakeBottom;
        if (g.getComputedStyle)
            try {
                w =
                    "relative" ===
                    g
                    .getComputedStyle(a.targetElement, null)
                    .getPropertyValue("position");
            } catch (d) {
                w = !1;
            }
        t = a.usePositionFixed;
        h && l && !a.disabled && (a.init(), (a.active = !0));
    };
    a.autoStart && a.events.add(g, "load", y, !1);
    return this;
})(window, document);