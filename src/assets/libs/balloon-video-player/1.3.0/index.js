define("balloon-video-player/1.3.0/index", [], function (t) {
    t("balloon-video-player/1.3.0/src/video-js/video.dev"), videojs.options.flash.swf = t.resolve("./src/video-js/video-js.swf#"), t("balloon-video-player/1.3.0/src/video-js/lang/zh-CN"), t("balloon-video-player/1.3.0/src/plugins/fingerprint/fingerprint"), t("balloon-video-player/1.3.0/src/plugins/quality-selector/video-quality-selector"), t("balloon-video-player/1.3.0/src/plugins/watermark/watermark"), t("balloon-video-player/1.3.0/src/plugins/marker/marker"), t("balloon-video-player/1.3.0/src/plugins/pluck/pluck"), t("balloon-video-player/1.3.0/src/plugins/hotkeys/hotkeys"), t("balloon-video-player/1.3.0/src/plugins/progressTips/progressTips")
}), define("balloon-video-player/1.3.0/src/video-js/video.dev", [], function (require, exports, module) {
    function _handleMultipleEvents(t, e, o, s) {
        vjs.arr.forEach(o, function (o) {
            t(e, o, s)
        })
    }

    function _logType(t, e) {
        var o, s, n;
        o = Array.prototype.slice.call(e), s = function () {}, n = window.console || {
            log: s,
            warn: s,
            error: s
        }, t ? o.unshift(t.toUpperCase() + ":") : t = "log", vjs.log.history.push(o), o.unshift("VIDEOJS:"), n[t].apply ? n[t].apply(n, o) : n[t](o.join(" "))
    }
    document.createElement("video"), document.createElement("audio"), document.createElement("track");
    var vjs = function (t, e, o) {
            var s;
            if ("string" == typeof t) {
                if (0 === t.indexOf("#") && (t = t.slice(1)), vjs.players[t]) return e && vjs.log.warn('Player "' + t + '" is already initialised. Options will not be applied.'), o && vjs.players[t].ready(o), vjs.players[t];
                s = vjs.el(t)
            } else s = t;
            if (!s || !s.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
            return s.player || new vjs.Player(s, e, o)
        },
        videojs = window.videojs = vjs;
    vjs.CDN_VERSION = "4.12", vjs.ACCESS_PROTOCOL = "https:" == document.location.protocol ? "https://" : "http://", vjs.VERSION = "4.12.10", vjs.options = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {},
        width: 300,
        height: 150,
        defaultVolume: 0,
        playbackRates: [],
        inactivityTimeout: 2e3,
        children: {
            mediaLoader: {},
            posterImage: {},
            loadingSpinner: {},
            textTrackDisplay: {},
            bigPlayButton: {},
            controlBar: {},
            errorDisplay: {},
            textTrackSettings: {}
        },
        language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.languages && navigator.languages[0] || navigator.userLanguage || navigator.language || "en",
        languages: {},
        notSupportedMessage: "No compatible source was found for this video."
    }, "GENERATED_CDN_VSN" !== vjs.CDN_VERSION && (videojs.options.flash.swf = vjs.ACCESS_PROTOCOL + "vjs.zencdn.net/" + vjs.CDN_VERSION + "/video-js.swf"), vjs.addLanguage = function (t, e) {
        return vjs.options.languages[t] = void 0 !== vjs.options.languages[t] ? vjs.util.mergeOptions(vjs.options.languages[t], e) : e, vjs.options.languages
    }, vjs.players = {}, vjs.CoreObject = vjs.CoreObject = function () {}, vjs.CoreObject.extend = function (t) {
        var e, o;
        t = t || {}, e = t.init || t.init || this.prototype.init || this.prototype.init || function () {}, o = function () {
            e.apply(this, arguments)
        }, o.prototype = vjs.obj.create(this.prototype), o.prototype.constructor = o, o.extend = vjs.CoreObject.extend, o.create = vjs.CoreObject.create;
        for (var s in t) t.hasOwnProperty(s) && (o.prototype[s] = t[s]);
        return o
    }, vjs.CoreObject.create = function () {
        var t = vjs.obj.create(this.prototype);
        return this.apply(t, arguments), t
    }, vjs.on = function (t, e, o) {
        if (vjs.obj.isArray(e)) return _handleMultipleEvents(vjs.on, t, e, o);
        var s = vjs.getData(t);
        s.handlers || (s.handlers = {}), s.handlers[e] || (s.handlers[e] = []), o.guid || (o.guid = vjs.guid++), s.handlers[e].push(o), s.dispatcher || (s.disabled = !1, s.dispatcher = function (e) {
            if (!s.disabled) {
                e = vjs.fixEvent(e);
                var o = s.handlers[e.type];
                if (o)
                    for (var n = o.slice(0), r = 0, i = n.length; i > r && !e.isImmediatePropagationStopped(); r++) n[r].call(t, e)
            }
        }), 1 == s.handlers[e].length && (t.addEventListener ? t.addEventListener(e, s.dispatcher, !1) : t.attachEvent && t.attachEvent("on" + e, s.dispatcher))
    }, vjs.off = function (t, e, o) {
        if (vjs.hasData(t)) {
            var s = vjs.getData(t);
            if (s.handlers) {
                if (vjs.obj.isArray(e)) return _handleMultipleEvents(vjs.off, t, e, o);
                var n = function (e) {
                    s.handlers[e] = [], vjs.cleanUpEvents(t, e)
                };
                if (e) {
                    var r = s.handlers[e];
                    if (r) {
                        if (!o) return void n(e);
                        if (o.guid)
                            for (var i = 0; i < r.length; i++) r[i].guid === o.guid && r.splice(i--, 1);
                        vjs.cleanUpEvents(t, e)
                    }
                } else
                    for (var a in s.handlers) n(a)
            }
        }
    }, vjs.cleanUpEvents = function (t, e) {
        var o = vjs.getData(t);
        0 === o.handlers[e].length && (delete o.handlers[e], t.removeEventListener ? t.removeEventListener(e, o.dispatcher, !1) : t.detachEvent && t.detachEvent("on" + e, o.dispatcher)), vjs.isEmpty(o.handlers) && (delete o.handlers, delete o.dispatcher, delete o.disabled), vjs.isEmpty(o) && vjs.removeData(t)
    }, vjs.fixEvent = function (t) {
        function e() {
            return !0
        }

        function o() {
            return !1
        }
        if (!t || !t.isPropagationStopped) {
            var s = t || window.event;
            t = {};
            for (var n in s) "layerX" !== n && "layerY" !== n && "keyLocation" !== n && ("returnValue" == n && s.preventDefault || (t[n] = s[n]));
            if (t.target || (t.target = t.srcElement || document), t.relatedTarget = t.fromElement === t.target ? t.toElement : t.fromElement, t.preventDefault = function () {
                    s.preventDefault && s.preventDefault(), t.returnValue = !1, t.isDefaultPrevented = e, t.defaultPrevented = !0
                }, t.isDefaultPrevented = o, t.defaultPrevented = !1, t.stopPropagation = function () {
                    s.stopPropagation && s.stopPropagation(), t.cancelBubble = !0, t.isPropagationStopped = e
                }, t.isPropagationStopped = o, t.stopImmediatePropagation = function () {
                    s.stopImmediatePropagation && s.stopImmediatePropagation(), t.isImmediatePropagationStopped = e, t.stopPropagation()
                }, t.isImmediatePropagationStopped = o, null != t.clientX) {
                var r = document.documentElement,
                    i = document.body;
                t.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), t.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)
            }
            t.which = t.charCode || t.keyCode, null != t.button && (t.button = 1 & t.button ? 0 : 4 & t.button ? 1 : 2 & t.button ? 2 : 0)
        }
        return t
    }, vjs.trigger = function (t, e) {
        var o = vjs.hasData(t) ? vjs.getData(t) : {},
            s = t.parentNode || t.ownerDocument;
        if ("string" == typeof e && (e = {
                type: e,
                target: t
            }), e = vjs.fixEvent(e), o.dispatcher && o.dispatcher.call(t, e), s && !e.isPropagationStopped() && e.bubbles !== !1) vjs.trigger(s, e);
        else if (!s && !e.defaultPrevented) {
            var n = vjs.getData(e.target);
            e.target[e.type] && (n.disabled = !0, "function" == typeof e.target[e.type] && e.target[e.type](), n.disabled = !1)
        }
        return !e.defaultPrevented
    }, vjs.one = function (t, e, o) {
        if (vjs.obj.isArray(e)) return _handleMultipleEvents(vjs.one, t, e, o);
        var s = function () {
            vjs.off(t, e, s), o.apply(this, arguments)
        };
        s.guid = o.guid = o.guid || vjs.guid++, vjs.on(t, e, s)
    };
    var hasOwnProp = Object.prototype.hasOwnProperty;
    vjs.createEl = function (t, e) {
            var o;
            return t = t || "div", e = e || {}, o = document.createElement(t), vjs.obj.each(e, function (t, e) {
                -1 !== t.indexOf("aria-") || "role" == t ? o.setAttribute(t, e) : o[t] = e
            }), o
        }, vjs.capitalize = function (t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        }, vjs.obj = {}, vjs.obj.create = Object.create || function (t) {
            function e() {}
            return e.prototype = t, new e
        }, vjs.obj.each = function (t, e, o) {
            for (var s in t) hasOwnProp.call(t, s) && e.call(o || this, s, t[s])
        }, vjs.obj.merge = function (t, e) {
            if (!e) return t;
            for (var o in e) hasOwnProp.call(e, o) && (t[o] = e[o]);
            return t
        }, vjs.obj.deepMerge = function (t, e) {
            var o, s, n;
            t = vjs.obj.copy(t);
            for (o in e) hasOwnProp.call(e, o) && (s = t[o], n = e[o], t[o] = vjs.obj.isPlain(s) && vjs.obj.isPlain(n) ? vjs.obj.deepMerge(s, n) : e[o]);
            return t
        }, vjs.obj.copy = function (t) {
            return vjs.obj.merge({}, t)
        }, vjs.obj.isPlain = function (t) {
            return !!t && "object" == typeof t && "[object Object]" === t.toString() && t.constructor === Object
        }, vjs.obj.isArray = Array.isArray || function (t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }, vjs.isNaN = function (t) {
            return t !== t
        }, vjs.bind = function (t, e, o) {
            e.guid || (e.guid = vjs.guid++);
            var s = function () {
                return e.apply(t, arguments)
            };
            return s.guid = o ? o + "_" + e.guid : e.guid, s
        }, vjs.cache = {}, vjs.guid = 1, vjs.expando = "vdata" + (new Date).getTime(), vjs.getData = function (t) {
            var e = t[vjs.expando];
            return e || (e = t[vjs.expando] = vjs.guid++), vjs.cache[e] || (vjs.cache[e] = {}), vjs.cache[e]
        }, vjs.hasData = function (t) {
            var e = t[vjs.expando];
            return !(!e || vjs.isEmpty(vjs.cache[e]))
        }, vjs.removeData = function (t) {
            var e = t[vjs.expando];
            if (e) {
                delete vjs.cache[e];
                try {
                    delete t[vjs.expando]
                } catch (o) {
                    t.removeAttribute ? t.removeAttribute(vjs.expando) : t[vjs.expando] = null
                }
            }
        }, vjs.isEmpty = function (t) {
            for (var e in t)
                if (null !== t[e]) return !1;
            return !0
        }, vjs.hasClass = function (t, e) {
            return -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
        }, vjs.addClass = function (t, e) {
            vjs.hasClass(t, e) || (t.className = "" === t.className ? e : t.className + " " + e)
        }, vjs.removeClass = function (t, e) {
            var o, s;
            if (vjs.hasClass(t, e)) {
                for (o = t.className.split(" "), s = o.length - 1; s >= 0; s--) o[s] === e && o.splice(s, 1);
                t.className = o.join(" ")
            }
        }, vjs.TEST_VID = vjs.createEl("video"),
        function () {
            var t = document.createElement("track");
            t.kind = "captions", t.srclang = "en", t.label = "English", vjs.TEST_VID.appendChild(t)
        }(), vjs.USER_AGENT = navigator.userAgent, vjs.IS_IPHONE = /iPhone/i.test(vjs.USER_AGENT), vjs.IS_IPAD = /iPad/i.test(vjs.USER_AGENT), vjs.IS_IPOD = /iPod/i.test(vjs.USER_AGENT), vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD, vjs.IOS_VERSION = function () {
            var t = vjs.USER_AGENT.match(/OS (\d+)_/i);
            return t && t[1] ? t[1] : void 0
        }(), vjs.IS_ANDROID = /Android/i.test(vjs.USER_AGENT), vjs.ANDROID_VERSION = function () {
            var t, e, o = vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
            return o ? (t = o[1] && parseFloat(o[1]), e = o[2] && parseFloat(o[2]), t && e ? parseFloat(o[1] + "." + o[2]) : t ? t : null) : null
        }(), vjs.IS_OLD_ANDROID = vjs.IS_ANDROID && /webkit/i.test(vjs.USER_AGENT) && vjs.ANDROID_VERSION < 2.3, vjs.IS_FIREFOX = /Firefox/i.test(vjs.USER_AGENT), vjs.IS_CHROME = /Chrome/i.test(vjs.USER_AGENT), vjs.IS_IE8 = /MSIE\s8\.0/.test(vjs.USER_AGENT), vjs.TOUCH_ENABLED = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch), vjs.BACKGROUND_SIZE_SUPPORTED = "backgroundSize" in vjs.TEST_VID.style, vjs.setElementAttributes = function (t, e) {
            vjs.obj.each(e, function (e, o) {
                null === o || "undefined" == typeof o || o === !1 ? t.removeAttribute(e) : t.setAttribute(e, o === !0 ? "" : o)
            })
        }, vjs.getElementAttributes = function (t) {
            var e, o, s, n, r;
            if (e = {}, o = ",autoplay,controls,loop,muted,default,", t && t.attributes && t.attributes.length > 0) {
                s = t.attributes;
                for (var i = s.length - 1; i >= 0; i--) n = s[i].name, r = s[i].value, ("boolean" == typeof t[n] || -1 !== o.indexOf("," + n + ",")) && (r = null !== r ? !0 : !1), e[n] = r
            }
            return e
        }, vjs.getComputedDimension = function (t, e) {
            var o = "";
            return document.defaultView && document.defaultView.getComputedStyle ? o = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (o = t["client" + e.substr(0, 1).toUpperCase() + e.substr(1)] + "px"), o
        }, vjs.insertFirst = function (t, e) {
            e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t)
        }, vjs.browser = {}, vjs.el = function (t) {
            return 0 === t.indexOf("#") && (t = t.slice(1)), document.getElementById(t)
        }, vjs.formatTime = function (t, e) {
            e = e || t;
            var o = Math.floor(t % 60),
                s = Math.floor(t / 60 % 60),
                n = Math.floor(t / 3600),
                r = Math.floor(e / 60 % 60),
                i = Math.floor(e / 3600);
            return (isNaN(t) || 1 / 0 === t) && (n = s = o = "-"), n = n > 0 || i > 0 ? n + ":" : "", s = ((n || r >= 10) && 10 > s ? "0" + s : s) + ":", o = 10 > o ? "0" + o : o, n + s + o
        }, vjs.blockTextSelection = function () {
            document.body.focus(), document.onselectstart = function () {
                return !1
            }
        }, vjs.unblockTextSelection = function () {
            document.onselectstart = function () {
                return !0
            }
        }, vjs.trim = function (t) {
            return (t + "").replace(/^\s+|\s+$/g, "")
        }, vjs.round = function (t, e) {
            return e || (e = 0), Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
        }, vjs.createTimeRange = function (t, e) {
            return void 0 === t && void 0 === e ? {
                length: 0,
                start: function () {
                    throw new Error("This TimeRanges object is empty")
                },
                end: function () {
                    throw new Error("This TimeRanges object is empty")
                }
            } : {
                length: 1,
                start: function () {
                    return t
                },
                end: function () {
                    return e
                }
            }
        }, vjs.setLocalStorage = function (t, e) {
            try {
                var o = window.localStorage || !1;
                if (!o) return;
                o[t] = e
            } catch (s) {
                22 == s.code || 1014 == s.code ? vjs.log("LocalStorage Full (VideoJS)", s) : 18 == s.code ? vjs.log("LocalStorage not allowed (VideoJS)", s) : vjs.log("LocalStorage Error (VideoJS)", s)
            }
        }, vjs.getAbsoluteURL = function (t) {
            return t.match(/^https?:\/\//) || (t = vjs.createEl("div", {
                innerHTML: '<a href="' + t + '">x</a>'
            }).firstChild.href), t
        }, vjs.parseUrl = function (t) {
            var e, o, s, n, r;
            n = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"], o = vjs.createEl("a", {
                href: t
            }), s = "" === o.host && "file:" !== o.protocol, s && (e = vjs.createEl("div"), e.innerHTML = '<a href="' + t + '"></a>', o = e.firstChild, e.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(e)), r = {};
            for (var i = 0; i < n.length; i++) r[n[i]] = o[n[i]];
            return "http:" === r.protocol && (r.host = r.host.replace(/:80$/, "")), "https:" === r.protocol && (r.host = r.host.replace(/:443$/, "")), s && document.body.removeChild(e), r
        }, vjs.log = function () {
            _logType(null, arguments)
        }, vjs.log.history = [], vjs.log.error = function () {
            _logType("error", arguments)
        }, vjs.log.warn = function () {
            _logType("warn", arguments)
        }, vjs.findPosition = function (t) {
            var e, o, s, n, r, i, a, l, c;
            return t.getBoundingClientRect && t.parentNode && (e = t.getBoundingClientRect()), e ? (o = document.documentElement, s = document.body, n = o.clientLeft || s.clientLeft || 0, r = window.pageXOffset || s.scrollLeft, i = e.left + r - n, a = o.clientTop || s.clientTop || 0, l = window.pageYOffset || s.scrollTop, c = e.top + l - a, {
                left: vjs.round(i),
                top: vjs.round(c)
            }) : {
                left: 0,
                top: 0
            }
        }, vjs.arr = {}, vjs.arr.forEach = function (t, e, o) {
            if (vjs.obj.isArray(t) && e instanceof Function)
                for (var s = 0, n = t.length; n > s; ++s) e.call(o || vjs, t[s], s, t);
            return t
        }, vjs.xhr = function (t, e) {
            var o, s, n, r, i, a, l, c, u;
            "string" == typeof t && (t = {
                uri: t
            }), videojs.util.mergeOptions({
                method: "GET",
                timeout: 45e3
            }, t), e = e || function () {}, c = function () {
                window.clearTimeout(l), e(null, s, s.response || s.responseText)
            }, u = function (t) {
                window.clearTimeout(l), t && "string" != typeof t || (t = new Error(t)), e(t, s)
            }, o = window.XMLHttpRequest, "undefined" == typeof o && (o = function () {
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
                } catch (t) {}
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
                } catch (e) {}
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP")
                } catch (o) {}
                throw new Error("This browser does not support XMLHttpRequest.")
            }), s = new o, s.uri = t.uri, n = vjs.parseUrl(t.uri), r = window.location, a = n.protocol + n.host !== r.protocol + r.host, !a || !window.XDomainRequest || "withCredentials" in s ? (i = "file:" == n.protocol || "file:" == r.protocol, s.onreadystatechange = function () {
                if (4 === s.readyState) {
                    if (s.timedout) return u("timeout");
                    200 === s.status || i && 0 === s.status ? c() : u()
                }
            }, t.timeout && (l = window.setTimeout(function () {
                4 !== s.readyState && (s.timedout = !0, s.abort())
            }, t.timeout))) : (s = new window.XDomainRequest, s.onload = c, s.onerror = u, s.onprogress = function () {}, s.ontimeout = function () {});
            try {
                s.open(t.method || "GET", t.uri, !0)
            } catch (p) {
                return u(p)
            }
            t.withCredentials && (s.withCredentials = !0), t.responseType && (s.responseType = t.responseType);
            try {
                s.send()
            } catch (p) {
                return u(p)
            }
            return s
        }, vjs.util = {}, vjs.util.mergeOptions = function (t, e) {
            var o, s, n;
            t = vjs.obj.copy(t);
            for (o in e) e.hasOwnProperty(o) && (s = t[o], n = e[o], t[o] = vjs.obj.isPlain(s) && vjs.obj.isPlain(n) ? vjs.util.mergeOptions(s, n) : e[o]);
            return t
        }, vjs.EventEmitter = function () {}, vjs.EventEmitter.prototype.allowedEvents_ = {}, vjs.EventEmitter.prototype.on = function (t, e) {
            var o = this.addEventListener;
            this.addEventListener = Function.prototype, vjs.on(this, t, e), this.addEventListener = o
        }, vjs.EventEmitter.prototype.addEventListener = vjs.EventEmitter.prototype.on, vjs.EventEmitter.prototype.off = function (t, e) {
            vjs.off(this, t, e)
        }, vjs.EventEmitter.prototype.removeEventListener = vjs.EventEmitter.prototype.off, vjs.EventEmitter.prototype.one = function (t, e) {
            vjs.one(this, t, e)
        }, vjs.EventEmitter.prototype.trigger = function (t) {
            var e = t.type || t;
            "string" == typeof t && (t = {
                type: e
            }), t = vjs.fixEvent(t), this.allowedEvents_[e] && this["on" + e] && this["on" + e](t), vjs.trigger(this, t)
        }, vjs.EventEmitter.prototype.dispatchEvent = vjs.EventEmitter.prototype.trigger, vjs.Component = vjs.CoreObject.extend({
            init: function (t, e, o) {
                this.player_ = t, this.options_ = vjs.obj.copy(this.options_), e = this.options(e), this.id_ = e.id || e.el && e.el.id, this.id_ || (this.id_ = (t.id && t.id() || "no_player") + "_component_" + vjs.guid++), this.name_ = e.name || null, this.el_ = e.el || this.createEl(), this.children_ = [], this.childIndex_ = {}, this.childNameIndex_ = {}, this.initChildren(), this.ready(o), e.reportTouchActivity !== !1 && this.enableTouchActivity()
            }
        }), vjs.Component.prototype.dispose = function () {
            if (this.trigger({
                    type: "dispose",
                    bubbles: !1
                }), this.children_)
                for (var t = this.children_.length - 1; t >= 0; t--) this.children_[t].dispose && this.children_[t].dispose();
            this.children_ = null, this.childIndex_ = null, this.childNameIndex_ = null, this.off(), this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), vjs.removeData(this.el_), this.el_ = null
        }, vjs.Component.prototype.player_ = !0, vjs.Component.prototype.player = function () {
            return this.player_
        }, vjs.Component.prototype.options_, vjs.Component.prototype.options = function (t) {
            return void 0 === t ? this.options_ : this.options_ = vjs.util.mergeOptions(this.options_, t)
        }, vjs.Component.prototype.el_, vjs.Component.prototype.createEl = function (t, e) {
            return vjs.createEl(t, e)
        }, vjs.Component.prototype.localize = function (t) {
            var e = this.player_.language(),
                o = this.player_.languages();
            return o && o[e] && o[e][t] ? o[e][t] : t
        }, vjs.Component.prototype.el = function () {
            return this.el_
        }, vjs.Component.prototype.contentEl_, vjs.Component.prototype.contentEl = function () {
            return this.contentEl_ || this.el_
        }, vjs.Component.prototype.id_, vjs.Component.prototype.id = function () {
            return this.id_
        }, vjs.Component.prototype.name_, vjs.Component.prototype.name = function () {
            return this.name_
        }, vjs.Component.prototype.children_, vjs.Component.prototype.children = function () {
            return this.children_
        }, vjs.Component.prototype.childIndex_, vjs.Component.prototype.getChildById = function (t) {
            return this.childIndex_[t]
        }, vjs.Component.prototype.childNameIndex_, vjs.Component.prototype.getChild = function (t) {
            return this.childNameIndex_[t]
        }, vjs.Component.prototype.addChild = function (t, e) {
            var o, s, n;
            return "string" == typeof t ? (n = t, e = e || {}, s = e.componentClass || vjs.capitalize(n), e.name = n, o = new window.videojs[s](this.player_ || this, e)) : o = t, this.children_.push(o), "function" == typeof o.id && (this.childIndex_[o.id()] = o), n = n || o.name && o.name(), n && (this.childNameIndex_[n] = o), "function" == typeof o.el && o.el() && this.contentEl().appendChild(o.el()), o
        }, vjs.Component.prototype.removeChild = function (t) {
            if ("string" == typeof t && (t = this.getChild(t)), t && this.children_) {
                for (var e = !1, o = this.children_.length - 1; o >= 0; o--)
                    if (this.children_[o] === t) {
                        e = !0, this.children_.splice(o, 1);
                        break
                    }
                if (e) {
                    this.childIndex_[t.id()] = null, this.childNameIndex_[t.name()] = null;
                    var s = t.el();
                    s && s.parentNode === this.contentEl() && this.contentEl().removeChild(t.el())
                }
            }
        }, vjs.Component.prototype.initChildren = function () {
            var t, e, o, s, n, r, i;
            if (t = this, e = t.options(), o = e.children)
                if (i = function (o, s) {
                        void 0 !== e[o] && (s = e[o]), s !== !1 && (t[o] = t.addChild(o, s))
                    }, vjs.obj.isArray(o))
                    for (var a = 0; a < o.length; a++) s = o[a], "string" == typeof s ? (n = s, r = {}) : (n = s.name, r = s), i(n, r);
                else vjs.obj.each(o, i)
        }, vjs.Component.prototype.buildCSSClass = function () {
            return ""
        }, vjs.Component.prototype.on = function (t, e, o) {
            var s, n, r, i, a, l;
            return "string" == typeof t || vjs.obj.isArray(t) ? vjs.on(this.el_, t, vjs.bind(this, e)) : (s = t, n = e, r = vjs.bind(this, o), l = this, i = function () {
                l.off(s, n, r)
            }, i.guid = r.guid, this.on("dispose", i), a = function () {
                l.off("dispose", i)
            }, a.guid = r.guid, t.nodeName ? (vjs.on(s, n, r), vjs.on(s, "dispose", a)) : "function" == typeof t.on && (s.on(n, r), s.on("dispose", a))), this
        }, vjs.Component.prototype.off = function (t, e, o) {
            var s, n, r;
            return !t || "string" == typeof t || vjs.obj.isArray(t) ? vjs.off(this.el_, t, e) : (s = t, n = e, r = vjs.bind(this, o), this.off("dispose", r), t.nodeName ? (vjs.off(s, n, r), vjs.off(s, "dispose", r)) : (s.off(n, r), s.off("dispose", r))), this
        }, vjs.Component.prototype.one = function (t, e, o) {
            var s, n, r, i, a;
            return "string" == typeof t || vjs.obj.isArray(t) ? vjs.one(this.el_, t, vjs.bind(this, e)) : (s = t, n = e, r = vjs.bind(this, o), i = this, a = function () {
                i.off(s, n, a), r.apply(this, arguments)
            }, a.guid = r.guid, this.on(s, n, a)), this
        }, vjs.Component.prototype.trigger = function (t) {
            return vjs.trigger(this.el_, t), this
        }, vjs.Component.prototype.isReady_, vjs.Component.prototype.isReadyOnInitFinish_ = !0, vjs.Component.prototype.readyQueue_, vjs.Component.prototype.ready = function (t) {
            return t && (this.isReady_ ? t.call(this) : (void 0 === this.readyQueue_ && (this.readyQueue_ = []), this.readyQueue_.push(t))), this
        }, vjs.Component.prototype.triggerReady = function () {
            this.isReady_ = !0;
            var t = this.readyQueue_;
            if (t && t.length > 0) {
                for (var e = 0, o = t.length; o > e; e++) t[e].call(this);
                this.readyQueue_ = [], this.trigger("ready")
            }
        }, vjs.Component.prototype.hasClass = function (t) {
            return vjs.hasClass(this.el_, t)
        }, vjs.Component.prototype.addClass = function (t) {
            return vjs.addClass(this.el_, t), this
        }, vjs.Component.prototype.removeClass = function (t) {
            return vjs.removeClass(this.el_, t), this
        }, vjs.Component.prototype.show = function () {
            return this.removeClass("vjs-hidden"), this
        }, vjs.Component.prototype.hide = function () {
            return this.addClass("vjs-hidden"), this
        }, vjs.Component.prototype.lockShowing = function () {
            return this.addClass("vjs-lock-showing"), this
        }, vjs.Component.prototype.unlockShowing = function () {
            return this.removeClass("vjs-lock-showing"), this
        }, vjs.Component.prototype.disable = function () {
            this.hide(), this.show = function () {}
        }, vjs.Component.prototype.width = function (t, e) {
            return this.dimension("width", t, e)
        }, vjs.Component.prototype.height = function (t, e) {
            return this.dimension("height", t, e)
        }, vjs.Component.prototype.dimensions = function (t, e) {
            return this.width(t, !0).height(e)
        }, vjs.Component.prototype.dimension = function (t, e, o) {
            if (void 0 !== e) return (null === e || vjs.isNaN(e)) && (e = 0), this.el_.style[t] = -1 !== ("" + e).indexOf("%") || -1 !== ("" + e).indexOf("px") ? e : "auto" === e ? "" : e + "px", o || this.trigger("resize"), this;
            if (!this.el_) return 0;
            var s = this.el_.style[t],
                n = s.indexOf("px");
            return -1 !== n ? parseInt(s.slice(0, n), 10) : parseInt(this.el_["offset" + vjs.capitalize(t)], 10)
        }, vjs.Component.prototype.onResize, vjs.Component.prototype.emitTapEvents = function () {
            var t, e, o, s, n, r, i, a, l, c;
            t = 0, e = null, l = 10, c = 200, this.on("touchstart", function (o) {
                1 === o.touches.length && (e = vjs.obj.copy(o.touches[0]), t = (new Date).getTime(), s = !0)
            }), this.on("touchmove", function (t) {
                t.touches.length > 1 ? s = !1 : e && (r = t.touches[0].pageX - e.pageX, i = t.touches[0].pageY - e.pageY, a = Math.sqrt(r * r + i * i), a > l && (s = !1))
            }), n = function () {
                s = !1
            }, this.on("touchleave", n), this.on("touchcancel", n), this.on("touchend", function (n) {
                e = null, s === !0 && (o = (new Date).getTime() - t, c > o && (n.preventDefault(), this.trigger("tap")))
            })
        }, vjs.Component.prototype.enableTouchActivity = function () {
            var t, e, o;
            this.player().reportUserActivity && (t = vjs.bind(this.player(), this.player().reportUserActivity), this.on("touchstart", function () {
                t(), this.clearInterval(e), e = this.setInterval(t, 250)
            }), o = function () {
                t(), this.clearInterval(e)
            }, this.on("touchmove", t), this.on("touchend", o), this.on("touchcancel", o))
        }, vjs.Component.prototype.setTimeout = function (t, e) {
            t = vjs.bind(this, t);
            var o = setTimeout(t, e),
                s = function () {
                    this.clearTimeout(o)
                };
            return s.guid = "vjs-timeout-" + o, this.on("dispose", s), o
        }, vjs.Component.prototype.clearTimeout = function (t) {
            clearTimeout(t);
            var e = function () {};
            return e.guid = "vjs-timeout-" + t, this.off("dispose", e), t
        }, vjs.Component.prototype.setInterval = function (t, e) {
            t = vjs.bind(this, t);
            var o = setInterval(t, e),
                s = function () {
                    this.clearInterval(o)
                };
            return s.guid = "vjs-interval-" + o, this.on("dispose", s), o
        }, vjs.Component.prototype.clearInterval = function (t) {
            clearInterval(t);
            var e = function () {};
            return e.guid = "vjs-interval-" + t, this.off("dispose", e), t
        }, vjs.Button = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e), this.emitTapEvents(), this.on("tap", this.onClick), this.on("click", this.onClick), this.on("focus", this.onFocus), this.on("blur", this.onBlur)
            }
        }), vjs.Button.prototype.createEl = function (t, e) {
            var o;
            return e = vjs.obj.merge({
                className: this.buildCSSClass(),
                role: "button",
                "aria-live": "polite",
                tabIndex: 0
            }, e), o = vjs.Component.prototype.createEl.call(this, t, e), e.innerHTML || (this.contentEl_ = vjs.createEl("div", {
                className: "vjs-control-content"
            }), this.controlText_ = vjs.createEl("span", {
                className: "vjs-control-text",
                innerHTML: this.localize(this.buttonText) || "Need Text"
            }), this.contentEl_.appendChild(this.controlText_), o.appendChild(this.contentEl_)), o
        }, vjs.Button.prototype.buildCSSClass = function () {
            return "vjs-control " + vjs.Component.prototype.buildCSSClass.call(this)
        }, vjs.Button.prototype.onClick = function () {}, vjs.Button.prototype.onFocus = function () {
            vjs.on(document, "keydown", vjs.bind(this, this.onKeyPress))
        }, vjs.Button.prototype.onKeyPress = function (t) {
            (32 == t.which || 13 == t.which) && (t.preventDefault(), this.onClick())
        }, vjs.Button.prototype.onBlur = function () {
            vjs.off(document, "keydown", vjs.bind(this, this.onKeyPress))
        }, vjs.Slider = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e), this.bar = this.getChild(this.options_.barName), this.handle = this.getChild(this.options_.handleName), this.on("mousedown", this.onMouseDown), this.on("touchstart", this.onMouseDown), this.on("focus", this.onFocus), this.on("blur", this.onBlur), this.on("click", this.onClick), this.on(t, "controlsvisible", this.update), this.on(t, this.playerEvent, this.update)
            }
        }), vjs.Slider.prototype.createEl = function (t, e) {
            return e = e || {}, e.className = e.className + " vjs-slider", e = vjs.obj.merge({
                role: "slider",
                "aria-valuenow": 0,
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                tabIndex: 0
            }, e), vjs.Component.prototype.createEl.call(this, t, e)
        }, vjs.Slider.prototype.onMouseDown = function (t) {
            t.preventDefault(), vjs.blockTextSelection(), this.addClass("vjs-sliding"), this.on(document, "mousemove", this.onMouseMove), this.on(document, "mouseup", this.onMouseUp), this.on(document, "touchmove", this.onMouseMove), this.on(document, "touchend", this.onMouseUp), this.onMouseMove(t)
        }, vjs.Slider.prototype.onMouseMove = function () {}, vjs.Slider.prototype.onMouseUp = function () {
            vjs.unblockTextSelection(), this.removeClass("vjs-sliding"), this.off(document, "mousemove", this.onMouseMove), this.off(document, "mouseup", this.onMouseUp), this.off(document, "touchmove", this.onMouseMove), this.off(document, "touchend", this.onMouseUp), this.update()
        }, vjs.Slider.prototype.update = function () {
            if (this.el_) {
                var t, e = this.getPercent(),
                    o = this.handle,
                    s = this.bar;
                if (("number" != typeof e || e !== e || 0 > e || 1 / 0 === e) && (e = 0), t = e, o) {
                    var n = this.el_,
                        r = n.offsetWidth,
                        i = o.el().offsetWidth,
                        a = i ? i / r : 0,
                        l = 1 - a,
                        c = e * l;
                    t = c + a / 2, o.el().style.left = vjs.round(100 * c, 2) + "%"
                }
                s && (s.el().style.width = vjs.round(100 * t, 2) + "%")
            }
        }, vjs.Slider.prototype.calculateDistance = function (t) {
            var e, o, s, n, r, i, a, l, c;
            if (e = this.el_, o = vjs.findPosition(e), r = i = e.offsetWidth, a = this.handle, this.options().vertical) {
                if (n = o.top, c = t.changedTouches ? t.changedTouches[0].pageY : t.pageY, a) {
                    var u = a.el().offsetHeight;
                    n += u / 2, i -= u
                }
                return Math.max(0, Math.min(1, (n - c + i) / i))
            }
            if (s = o.left, l = t.changedTouches ? t.changedTouches[0].pageX : t.pageX, a) {
                var p = a.el().offsetWidth;
                s += p / 2, r -= p
            }
            return Math.max(0, Math.min(1, (l - s) / r))
        }, vjs.Slider.prototype.onFocus = function () {
            this.on(document, "keydown", this.onKeyPress)
        }, vjs.Slider.prototype.onKeyPress = function (t) {
            37 == t.which || 40 == t.which ? (t.preventDefault(), this.stepBack()) : (38 == t.which || 39 == t.which) && (t.preventDefault(), this.stepForward())
        }, vjs.Slider.prototype.onBlur = function () {
            this.off(document, "keydown", this.onKeyPress)
        }, vjs.Slider.prototype.onClick = function (t) {
            t.stopImmediatePropagation(), t.preventDefault()
        }, vjs.SliderHandle = vjs.Component.extend(), vjs.SliderHandle.prototype.defaultValue = 0, vjs.SliderHandle.prototype.createEl = function (t, e) {
            return e = e || {}, e.className = e.className + " vjs-slider-handle", e = vjs.obj.merge({
                innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
            }, e), vjs.Component.prototype.createEl.call(this, "div", e)
        }, vjs.Menu = vjs.Component.extend(), vjs.Menu.prototype.addItem = function (t) {
            this.addChild(t), t.on("click", vjs.bind(this, function () {
                this.unlockShowing()
            }))
        }, vjs.Menu.prototype.createEl = function () {
            var t = this.options().contentElType || "ul";
            this.contentEl_ = vjs.createEl(t, {
                className: "vjs-menu-content"
            });
            var e = vjs.Component.prototype.createEl.call(this, "div", {
                append: this.contentEl_,
                className: "vjs-menu"
            });
            return e.appendChild(this.contentEl_), vjs.on(e, "click", function (t) {
                t.preventDefault(), t.stopImmediatePropagation()
            }), e
        }, vjs.MenuItem = vjs.Button.extend({
            init: function (t, e) {
                vjs.Button.call(this, t, e), this.selected(e.selected)
            }
        }), vjs.MenuItem.prototype.createEl = function (t, e) {
            return vjs.Button.prototype.createEl.call(this, "li", vjs.obj.merge({
                className: "vjs-menu-item",
                innerHTML: this.localize(this.options_.label)
            }, e))
        }, vjs.MenuItem.prototype.onClick = function () {
            this.selected(!0)
        }, vjs.MenuItem.prototype.selected = function (t) {
            t ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-selected", !0)) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-selected", !1))
        }, vjs.MenuButton = vjs.Button.extend({
            init: function (t, e) {
                vjs.Button.call(this, t, e), this.update(), this.on("keydown", this.onKeyPress), this.el_.setAttribute("aria-haspopup", !0), this.el_.setAttribute("role", "button")
            }
        }), vjs.MenuButton.prototype.update = function () {
            var t = this.createMenu();
            this.menu && this.removeChild(this.menu), this.menu = t, this.addChild(t), this.items && 0 === this.items.length ? this.hide() : this.items && this.items.length > 1 && this.show()
        }, vjs.MenuButton.prototype.buttonPressed_ = !1, vjs.MenuButton.prototype.createMenu = function () {
            var t = new vjs.Menu(this.player_);
            if (this.options().title && t.contentEl().appendChild(vjs.createEl("li", {
                    className: "vjs-menu-title",
                    innerHTML: vjs.capitalize(this.options().title),
                    tabindex: -1
                })), this.items = this.createItems(), this.items)
                for (var e = 0; e < this.items.length; e++) t.addItem(this.items[e]);
            return t
        }, vjs.MenuButton.prototype.createItems = function () {}, vjs.MenuButton.prototype.buildCSSClass = function () {
            return this.className + " vjs-menu-button " + vjs.Button.prototype.buildCSSClass.call(this)
        }, vjs.MenuButton.prototype.onFocus = function () {}, vjs.MenuButton.prototype.onBlur = function () {}, vjs.MenuButton.prototype.onClick = function () {
            this.one("mouseout", vjs.bind(this, function () {
                this.menu.unlockShowing(), this.el_.blur()
            })), this.buttonPressed_ ? this.unpressButton() : this.pressButton()
        }, vjs.MenuButton.prototype.onKeyPress = function (t) {
            32 == t.which || 13 == t.which ? (this.buttonPressed_ ? this.unpressButton() : this.pressButton(), t.preventDefault()) : 27 == t.which && (this.buttonPressed_ && this.unpressButton(), t.preventDefault())
        }, vjs.MenuButton.prototype.pressButton = function () {
            this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-pressed", !0), this.items && this.items.length > 0 && this.items[0].el().focus()
        }, vjs.MenuButton.prototype.unpressButton = function () {
            this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-pressed", !1)
        }, vjs.MediaError = function (t) {
            "number" == typeof t ? this.code = t : "string" == typeof t ? this.message = t : "object" == typeof t && vjs.obj.merge(this, t), this.message || (this.message = vjs.MediaError.defaultMessages[this.code] || "")
        }, vjs.MediaError.prototype.code = 0, vjs.MediaError.prototype.message = "", vjs.MediaError.prototype.status = null, vjs.MediaError.errorTypes = ["MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_ERR_ENCRYPTED"], vjs.MediaError.defaultMessages = {
            1: "You aborted the video playback",
            2: "A network error caused the video download to fail part-way.",
            3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
            4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
            5: "The video is encrypted and we do not have the keys to decrypt it."
        };
    for (var errNum = 0; errNum < vjs.MediaError.errorTypes.length; errNum++) vjs.MediaError[vjs.MediaError.errorTypes[errNum]] = errNum, vjs.MediaError.prototype[vjs.MediaError.errorTypes[errNum]] = errNum;
    if (function () {
            var t, e, o, s;
            for (vjs.browser.fullscreenAPI, t = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], e = t[0], s = 0; s < t.length; s++)
                if (t[s][1] in document) {
                    o = t[s];
                    break
                }
            if (o)
                for (vjs.browser.fullscreenAPI = {}, s = 0; s < o.length; s++) vjs.browser.fullscreenAPI[e[s]] = o[s]
        }(), vjs.Player = vjs.Component.extend({
            init: function (t, e, o) {
                this.tag = t, t.id = t.id || "vjs_video_" + vjs.guid++, this.tagAttributes = t && vjs.getElementAttributes(t), e = vjs.obj.merge(this.getTagSettings(t), e), this.language_ = e.language || vjs.options.language, this.languages_ = e.languages || vjs.options.languages, this.cache_ = {}, this.poster_ = e.poster || "", this.controls_ = !!e.controls, t.controls = !1, e.reportTouchActivity = !1, this.isAudio("audio" === this.tag.nodeName.toLowerCase()), vjs.Component.call(this, this, e, o), this.addClass(this.controls() ? "vjs-controls-enabled" : "vjs-controls-disabled"), this.isAudio() && this.addClass("vjs-audio"), vjs.players[this.id_] = this, e.plugins && vjs.obj.each(e.plugins, function (t, e) {
                    this[t](e)
                }, this), this.listenForUserActivity()
            }
        }), vjs.Player.prototype.language_, vjs.Player.prototype.language = function (t) {
            return void 0 === t ? this.language_ : (this.language_ = t, this)
        }, vjs.Player.prototype.languages_, vjs.Player.prototype.languages = function () {
            return this.languages_
        }, vjs.Player.prototype.options_ = vjs.options, vjs.Player.prototype.dispose = function () {
            this.trigger("dispose"), this.off("dispose"), vjs.players[this.id_] = null, this.tag && this.tag.player && (this.tag.player = null), this.el_ && this.el_.player && (this.el_.player = null), this.tech && this.tech.dispose(), vjs.Component.prototype.dispose.call(this)
        }, vjs.Player.prototype.getTagSettings = function (t) {
            var e, o, s = {
                sources: [],
                tracks: []
            };
            if (e = vjs.getElementAttributes(t), o = e["data-setup"], null !== o && vjs.obj.merge(e, vjs.JSON.parse(o || "{}")), vjs.obj.merge(s, e), t.hasChildNodes()) {
                var n, r, i, a, l;
                for (n = t.childNodes, a = 0, l = n.length; l > a; a++) r = n[a], i = r.nodeName.toLowerCase(), "source" === i ? s.sources.push(vjs.getElementAttributes(r)) : "track" === i && s.tracks.push(vjs.getElementAttributes(r))
            }
            return s
        }, vjs.Player.prototype.createEl = function () {
            var t, e = this.el_ = vjs.Component.prototype.createEl.call(this, "div"),
                o = this.tag;
            return o.removeAttribute("width"), o.removeAttribute("height"), t = vjs.getElementAttributes(o), vjs.obj.each(t, function (o) {
                "class" == o ? e.className = t[o] : e.setAttribute(o, t[o])
            }), o.id += "_html5_api", o.className = "vjs-tech", o.player = e.player = this, this.addClass("vjs-paused"), this.width(this.options_.width, !0), this.height(this.options_.height, !0), o.initNetworkState_ = o.networkState, o.parentNode && o.parentNode.insertBefore(e, o), vjs.insertFirst(o, e), this.el_ = e, this.on("loadstart", this.onLoadStart), this.on("waiting", this.onWaiting), this.on(["canplay", "canplaythrough", "playing", "ended"], this.onWaitEnd), this.on("seeking", this.onSeeking), this.on("seeked", this.onSeeked), this.on("ended", this.onEnded), this.on("play", this.onPlay), this.on("firstplay", this.onFirstPlay), this.on("pause", this.onPause), this.on("progress", this.onProgress), this.on("durationchange", this.onDurationChange), this.on("fullscreenchange", this.onFullscreenChange), e
        }, vjs.Player.prototype.loadTech = function (t, e) {
            this.tech && this.unloadTech(), "Html5" !== t && this.tag && (vjs.Html5.disposeMediaElement(this.tag), this.tag = null), this.techName = t, this.isReady_ = !1;
            var o = function () {
                    this.player_.triggerReady()
                },
                s = vjs.obj.merge({
                    source: e,
                    parentEl: this.el_
                }, this.options_[t.toLowerCase()]);
            e && (this.currentType_ = e.type, e.src == this.cache_.src && this.cache_.currentTime > 0 && (s.startTime = this.cache_.currentTime), this.cache_.src = e.src), this.tech = new window.videojs[t](this, s), this.tech.ready(o)
        }, vjs.Player.prototype.unloadTech = function () {
            this.isReady_ = !1, this.tech.dispose(), this.tech = !1
        }, vjs.Player.prototype.onLoadStart = function () {
            this.removeClass("vjs-ended"), this.error(null), this.paused() ? this.hasStarted(!1) : this.trigger("firstplay")
        }, vjs.Player.prototype.hasStarted_ = !1, vjs.Player.prototype.hasStarted = function (t) {
            return void 0 !== t ? (this.hasStarted_ !== t && (this.hasStarted_ = t, t ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started")), this) : this.hasStarted_
        }, vjs.Player.prototype.onLoadedMetaData, vjs.Player.prototype.onLoadedData, vjs.Player.prototype.onLoadedAllData, vjs.Player.prototype.onPlay = function () {
            this.removeClass("vjs-ended"), this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.hasStarted(!0)
        }, vjs.Player.prototype.onWaiting = function () {
            this.addClass("vjs-waiting")
        }, vjs.Player.prototype.onWaitEnd = function () {
            this.removeClass("vjs-waiting")
        }, vjs.Player.prototype.onSeeking = function () {
            this.addClass("vjs-seeking")
        }, vjs.Player.prototype.onSeeked = function () {
            this.removeClass("vjs-seeking")
        }, vjs.Player.prototype.onFirstPlay = function () {
            this.options_.starttime && this.currentTime(this.options_.starttime), this.addClass("vjs-has-started")
        }, vjs.Player.prototype.onPause = function () {
            this.removeClass("vjs-playing"), this.addClass("vjs-paused")
        }, vjs.Player.prototype.onTimeUpdate, vjs.Player.prototype.onProgress = function () {
            1 == this.bufferedPercent() && this.trigger("loadedalldata")
        }, vjs.Player.prototype.onEnded = function () {
            this.addClass("vjs-ended"), this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause()
        }, vjs.Player.prototype.onDurationChange = function () {
            var t = this.techGet("duration");
            t && (0 > t && (t = 1 / 0), this.duration(t), 1 / 0 === t ? this.addClass("vjs-live") : this.removeClass("vjs-live"))
        }, vjs.Player.prototype.onVolumeChange, vjs.Player.prototype.onFullscreenChange = function () {
            this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen")
        }, vjs.Player.prototype.onError, vjs.Player.prototype.cache_, vjs.Player.prototype.getCache = function () {
            return this.cache_
        }, vjs.Player.prototype.techCall = function (t, e) {
            if (this.tech && !this.tech.isReady_) this.tech.ready(function () {
                this[t](e)
            });
            else try {
                this.tech[t](e)
            } catch (o) {
                throw vjs.log(o), o
            }
        }, vjs.Player.prototype.techGet = function (t) {
            if (this.tech && this.tech.isReady_) try {
                return this.tech[t]()
            } catch (e) {
                throw void 0 === this.tech[t] ? vjs.log("Video.js: " + t + " method not defined for " + this.techName + " playback technology.", e) : "TypeError" == e.name ? (vjs.log("Video.js: " + t + " unavailable on " + this.techName + " playback technology element.", e), this.tech.isReady_ = !1) : vjs.log(e), e
            }
        }, vjs.Player.prototype.play = function () {
            return this.techCall("play"), this
        }, vjs.Player.prototype.pause = function () {
            return this.techCall("pause"), this
        }, vjs.Player.prototype.paused = function () {
            return this.techGet("paused") === !1 ? !1 : !0
        }, vjs.Player.prototype.currentTime = function (t) {
            return void 0 !== t ? (this.techCall("setCurrentTime", t), this) : this.cache_.currentTime = this.techGet("currentTime") || 0
        }, vjs.Player.prototype.duration = function (t) {
            return void 0 !== t ? (this.cache_.duration = parseFloat(t), this) : (void 0 === this.cache_.duration && this.onDurationChange(), this.cache_.duration || 0)
        }, vjs.Player.prototype.remainingTime = function () {
            return this.duration() - this.currentTime()
        }, vjs.Player.prototype.buffered = function () {
            var t = this.techGet("buffered");
            return t && t.length || (t = vjs.createTimeRange(0, 0)), t
        }, vjs.Player.prototype.bufferedPercent = function () {
            var t, e, o = this.duration(),
                s = this.buffered(),
                n = 0;
            if (!o) return 0;
            for (var r = 0; r < s.length; r++) t = s.start(r), e = s.end(r), e > o && (e = o), n += e - t;
            return n / o
        }, vjs.Player.prototype.bufferedEnd = function () {
            var t = this.buffered(),
                e = this.duration(),
                o = t.end(t.length - 1);
            return o > e && (o = e), o
        }, vjs.Player.prototype.volume = function (t) {
            var e;
            return void 0 !== t ? (e = Math.max(0, Math.min(1, parseFloat(t))), this.cache_.volume = e, this.techCall("setVolume", e), vjs.setLocalStorage("volume", e), this) : (e = parseFloat(this.techGet("volume")), isNaN(e) ? 1 : e)
        }, vjs.Player.prototype.muted = function (t) {
            return void 0 !== t ? (this.techCall("setMuted", t), this) : this.techGet("muted") || !1
        }, vjs.Player.prototype.supportsFullScreen = function () {
            return this.techGet("supportsFullScreen") || !1
        }, vjs.Player.prototype.isFullscreen_ = !1, vjs.Player.prototype.isFullscreen = function (t) {
            return void 0 !== t ? (this.isFullscreen_ = !!t, this) : this.isFullscreen_
        }, vjs.Player.prototype.isFullScreen = function (t) {
            return vjs.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'), this.isFullscreen(t)
        }, vjs.Player.prototype.requestFullscreen = function () {
            var t = vjs.browser.fullscreenAPI;
            return this.isFullscreen(!0), t ? (vjs.on(document, t.fullscreenchange, vjs.bind(this, function () {
                this.isFullscreen(document[t.fullscreenElement]), this.isFullscreen() === !1 && vjs.off(document, t.fullscreenchange, arguments.callee), this.trigger("fullscreenchange")
            })), this.el_[t.requestFullscreen]()) : this.tech.supportsFullScreen() ? this.techCall("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange")), this
        }, vjs.Player.prototype.requestFullScreen = function () {
            return vjs.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")'), this.requestFullscreen()
        }, vjs.Player.prototype.exitFullscreen = function () {
            var t = vjs.browser.fullscreenAPI;
            return this.isFullscreen(!1), t ? document[t.exitFullscreen]() : this.tech.supportsFullScreen() ? this.techCall("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange")), this
        }, vjs.Player.prototype.cancelFullScreen = function () {
            return vjs.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()"), this.exitFullscreen()
        }, vjs.Player.prototype.enterFullWindow = function () {
            this.isFullWindow = !0, this.docOrigOverflow = document.documentElement.style.overflow, vjs.on(document, "keydown", vjs.bind(this, this.fullWindowOnEscKey)), document.documentElement.style.overflow = "hidden", vjs.addClass(document.body, "vjs-full-window"), this.trigger("enterFullWindow")
        }, vjs.Player.prototype.fullWindowOnEscKey = function (t) {
            27 === t.keyCode && (this.isFullscreen() === !0 ? this.exitFullscreen() : this.exitFullWindow())
        }, vjs.Player.prototype.exitFullWindow = function () {
            this.isFullWindow = !1, vjs.off(document, "keydown", this.fullWindowOnEscKey), document.documentElement.style.overflow = this.docOrigOverflow, vjs.removeClass(document.body, "vjs-full-window"), this.trigger("exitFullWindow")
        }, vjs.Player.prototype.selectSource = function (t) {
            for (var e = 0, o = this.options_.techOrder; e < o.length; e++) {
                var s = vjs.capitalize(o[e]),
                    n = window.videojs[s];
                if (n) {
                    if (n.isSupported())
                        for (var r = 0, i = t; r < i.length; r++) {
                            var a = i[r];
                            if (n.canPlaySource(a)) return {
                                source: a,
                                tech: s
                            }
                        }
                } else vjs.log.error('The "' + s + '" tech is undefined. Skipped browser support check for that tech.')
            }
            return !1
        }, vjs.Player.prototype.src = function (t) {
            return void 0 === t ? this.techGet("src") : (vjs.obj.isArray(t) ? this.sourceList_(t) : "string" == typeof t ? this.src({
                src: t
            }) : t instanceof Object && (t.type && !window.videojs[this.techName].canPlaySource(t) ? this.sourceList_([t]) : (this.cache_.src = t.src, this.currentType_ = t.type || "", this.ready(function () {
                window.videojs[this.techName].prototype.hasOwnProperty("setSource") ? this.techCall("setSource", t) : this.techCall("src", t.src), "auto" == this.options_.preload && this.load(), this.options_.autoplay && this.play()
            }))), this)
        }, vjs.Player.prototype.sourceList_ = function (t) {
            var e = this.selectSource(t);
            e ? e.tech === this.techName ? this.src(e.source) : this.loadTech(e.tech, e.source) : (this.setTimeout(function () {
                this.error({
                    code: 4,
                    message: this.localize(this.options().notSupportedMessage)
                })
            }, 0), this.triggerReady())
        }, vjs.Player.prototype.load = function () {
            return this.techCall("load"), this
        }, vjs.Player.prototype.currentSrc = function () {
            return this.techGet("currentSrc") || this.cache_.src || ""
        }, vjs.Player.prototype.currentType = function () {
            return this.currentType_ || ""
        }, vjs.Player.prototype.preload = function (t) {
            return void 0 !== t ? (this.techCall("setPreload", t), this.options_.preload = t, this) : this.techGet("preload")
        }, vjs.Player.prototype.autoplay = function (t) {
            return void 0 !== t ? (this.techCall("setAutoplay", t), this.options_.autoplay = t, this) : this.techGet("autoplay", t)
        }, vjs.Player.prototype.loop = function (t) {
            return void 0 !== t ? (this.techCall("setLoop", t), this.options_.loop = t, this) : this.techGet("loop")
        }, vjs.Player.prototype.poster_, vjs.Player.prototype.poster = function (t) {
            return void 0 === t ? this.poster_ : (t || (t = ""), this.poster_ = t, this.techCall("setPoster", t), this.trigger("posterchange"), this)
        }, vjs.Player.prototype.controls_, vjs.Player.prototype.controls = function (t) {
            return void 0 !== t ? (t = !!t, this.controls_ !== t && (this.controls_ = t, t ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled")) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"))), this) : this.controls_
        }, vjs.Player.prototype.usingNativeControls_, vjs.Player.prototype.usingNativeControls = function (t) {
            return void 0 !== t ? (t = !!t, this.usingNativeControls_ !== t && (this.usingNativeControls_ = t, t ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols"))), this) : this.usingNativeControls_
        }, vjs.Player.prototype.error_ = null, vjs.Player.prototype.error = function (t) {
            return void 0 === t ? this.error_ : null === t ? (this.error_ = t, this.removeClass("vjs-error"), this) : (this.error_ = t instanceof vjs.MediaError ? t : new vjs.MediaError(t), this.trigger("error"), this.addClass("vjs-error"), vjs.log.error("(CODE:" + this.error_.code + " " + vjs.MediaError.errorTypes[this.error_.code] + ")", this.error_.message, this.error_), this)
        }, vjs.Player.prototype.ended = function () {
            return this.techGet("ended")
        }, vjs.Player.prototype.seeking = function () {
            return this.techGet("seeking")
        }, vjs.Player.prototype.seekable = function () {
            return this.techGet("seekable")
        }, vjs.Player.prototype.userActivity_ = !0, vjs.Player.prototype.reportUserActivity = function () {
            this.userActivity_ = !0
        }, vjs.Player.prototype.userActive_ = !0, vjs.Player.prototype.userActive = function (t) {
            return void 0 !== t ? (t = !!t, t !== this.userActive_ && (this.userActive_ = t, t ? (this.userActivity_ = !0, this.removeClass("vjs-user-inactive"), this.addClass("vjs-user-active"), this.trigger("useractive")) : (this.userActivity_ = !1, this.tech && this.tech.one("mousemove", function (t) {
                t.stopPropagation(), t.preventDefault()
            }), this.removeClass("vjs-user-active"), this.addClass("vjs-user-inactive"), this.trigger("userinactive"))), this) : this.userActive_
        }, vjs.Player.prototype.listenForUserActivity = function () {
            var t, e, o, s, n, r, i, a, l;
            t = vjs.bind(this, this.reportUserActivity), e = function (e) {
                (e.screenX != a || e.screenY != l) && (a = e.screenX, l = e.screenY, t())
            }, o = function () {
                t(), this.clearInterval(s), s = this.setInterval(t, 250)
            }, n = function () {
                t(), this.clearInterval(s)
            }, this.on("mousedown", o), this.on("mousemove", e), this.on("mouseup", n), this.on("keydown", t), this.on("keyup", t), r = this.setInterval(function () {
                if (this.userActivity_) {
                    this.userActivity_ = !1, this.userActive(!0), this.clearTimeout(i);
                    var t = this.options().inactivityTimeout;
                    t > 0 && (i = this.setTimeout(function () {
                        this.userActivity_ || this.userActive(!1)
                    }, t))
                }
            }, 250)
        }, vjs.Player.prototype.playbackRate = function (t) {
            return void 0 !== t ? (this.techCall("setPlaybackRate", t), this) : this.tech && this.tech.featuresPlaybackRate ? this.techGet("playbackRate") : 1
        }, vjs.Player.prototype.isAudio_ = !1, vjs.Player.prototype.isAudio = function (t) {
            return void 0 !== t ? (this.isAudio_ = !!t, this) : this.isAudio_
        }, vjs.Player.prototype.networkState = function () {
            return this.techGet("networkState")
        }, vjs.Player.prototype.readyState = function () {
            return this.techGet("readyState")
        }, vjs.Player.prototype.textTracks = function () {
            return this.tech && this.tech.textTracks()
        }, vjs.Player.prototype.remoteTextTracks = function () {
            return this.tech && this.tech.remoteTextTracks()
        }, vjs.Player.prototype.addTextTrack = function (t, e, o) {
            return this.tech && this.tech.addTextTrack(t, e, o)
        }, vjs.Player.prototype.addRemoteTextTrack = function (t) {
            return this.tech && this.tech.addRemoteTextTrack(t)
        }, vjs.Player.prototype.removeRemoteTextTrack = function (t) {
            this.tech && this.tech.removeRemoteTextTrack(t)
        }, vjs.ControlBar = vjs.Component.extend(), vjs.ControlBar.prototype.options_ = {
            loadEvent: "play",
            children: {
                playToggle: {},
                currentTimeDisplay: {},
                timeDivider: {},
                durationDisplay: {},
                remainingTimeDisplay: {},
                liveDisplay: {},
                progressControl: {},
                fullscreenToggle: {},
                volumeControl: {},
                muteToggle: {},
                playbackRateMenuButton: {},
                subtitlesButton: {},
                captionsButton: {},
                chaptersButton: {}
            }
        }, vjs.ControlBar.prototype.createEl = function () {
            return vjs.createEl("div", {
                className: "vjs-control-bar"
            })
        }, vjs.LiveDisplay = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e)
            }
        }), vjs.LiveDisplay.prototype.createEl = function () {
            var t = vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-live-controls vjs-control"
            });
            return this.contentEl_ = vjs.createEl("div", {
                className: "vjs-live-display",
                innerHTML: '<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE"),
                "aria-live": "off"
            }), t.appendChild(this.contentEl_), t
        }, vjs.PlayToggle = vjs.Button.extend({
            init: function (t, e) {
                vjs.Button.call(this, t, e), this.on(t, "play", this.onPlay), this.on(t, "pause", this.onPause)
            }
        }), vjs.PlayToggle.prototype.buttonText = "Play", vjs.PlayToggle.prototype.buildCSSClass = function () {
            return "vjs-play-control " + vjs.Button.prototype.buildCSSClass.call(this)
        }, vjs.PlayToggle.prototype.onClick = function () {
            this.player_.paused() ? this.player_.play() : this.player_.pause()
        }, vjs.PlayToggle.prototype.onPlay = function () {
            this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.el_.children[0].children[0].innerHTML = this.localize("Pause")
        }, vjs.PlayToggle.prototype.onPause = function () {
            this.removeClass("vjs-playing"), this.addClass("vjs-paused"), this.el_.children[0].children[0].innerHTML = this.localize("Play")
        }, vjs.CurrentTimeDisplay = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e), this.on(t, "timeupdate", this.updateContent)
            }
        }), vjs.CurrentTimeDisplay.prototype.createEl = function () {
            var t = vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-current-time vjs-time-controls vjs-control"
            });
            return this.contentEl_ = vjs.createEl("div", {
                className: "vjs-current-time-display",
                innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
                "aria-live": "off"
            }), t.appendChild(this.contentEl_), t
        }, vjs.CurrentTimeDisplay.prototype.updateContent = function () {
            var t = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
            this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Current Time") + "</span> " + vjs.formatTime(t, this.player_.duration())
        }, vjs.DurationDisplay = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e), this.on(t, "timeupdate", this.updateContent), this.on(t, "loadedmetadata", this.updateContent)
            }
        }), vjs.DurationDisplay.prototype.createEl = function () {
            var t = vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-duration vjs-time-controls vjs-control"
            });
            return this.contentEl_ = vjs.createEl("div", {
                className: "vjs-duration-display",
                innerHTML: '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> 0:00",
                "aria-live": "off"
            }), t.appendChild(this.contentEl_), t
        }, vjs.DurationDisplay.prototype.updateContent = function () {
            var t = this.player_.duration();
            t && (this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> " + vjs.formatTime(t))
        }, vjs.TimeDivider = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e)
            }
        }), vjs.TimeDivider.prototype.createEl = function () {
            return vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-time-divider",
                innerHTML: "<div><span>/</span></div>"
            })
        }, vjs.RemainingTimeDisplay = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e), this.on(t, "timeupdate", this.updateContent)
            }
        }), vjs.RemainingTimeDisplay.prototype.createEl = function () {
            var t = vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-remaining-time vjs-time-controls vjs-control"
            });
            return this.contentEl_ = vjs.createEl("div", {
                className: "vjs-remaining-time-display",
                innerHTML: '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -0:00",
                "aria-live": "off"
            }), t.appendChild(this.contentEl_), t
        }, vjs.RemainingTimeDisplay.prototype.updateContent = function () {
            this.player_.duration() && (this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -" + vjs.formatTime(this.player_.remainingTime()))
        }, vjs.FullscreenToggle = vjs.Button.extend({
            init: function (t, e) {
                vjs.Button.call(this, t, e)
            }
        }), vjs.FullscreenToggle.prototype.buttonText = "Fullscreen", vjs.FullscreenToggle.prototype.buildCSSClass = function () {
            return "vjs-fullscreen-control " + vjs.Button.prototype.buildCSSClass.call(this)
        }, vjs.FullscreenToggle.prototype.onClick = function () {
            this.player_.isFullscreen() ? (this.player_.exitFullscreen(), this.controlText_.innerHTML = this.localize("Fullscreen")) : (this.player_.requestFullscreen(), this.controlText_.innerHTML = this.localize("Non-Fullscreen"))
        }, vjs.ProgressControl = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e)
            }
        }), vjs.ProgressControl.prototype.options_ = {
            children: {
                seekBar: {}
            }
        }, vjs.ProgressControl.prototype.createEl = function () {
            return vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-progress-control vjs-control"
            })
        }, vjs.SeekBar = vjs.Slider.extend({
            init: function (t, e) {
                vjs.Slider.call(this, t, e), this.on(t, "timeupdate", this.updateARIAAttributes), t.ready(vjs.bind(this, this.updateARIAAttributes))
            }
        }), vjs.SeekBar.prototype.options_ = {
            children: {
                loadProgressBar: {},
                playProgressBar: {},
                seekHandle: {}
            },
            barName: "playProgressBar",
            handleName: "seekHandle"
        }, vjs.SeekBar.prototype.playerEvent = "timeupdate", vjs.SeekBar.prototype.createEl = function () {
            return vjs.Slider.prototype.createEl.call(this, "div", {
                className: "vjs-progress-holder",
                "aria-label": "video progress bar"
            })
        }, vjs.SeekBar.prototype.updateARIAAttributes = function () {
            var t = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
            this.el_.setAttribute("aria-valuenow", vjs.round(100 * this.getPercent(), 2)), this.el_.setAttribute("aria-valuetext", vjs.formatTime(t, this.player_.duration()))
        }, vjs.SeekBar.prototype.getPercent = function () {
            return this.player_.currentTime() / this.player_.duration()
        }, vjs.SeekBar.prototype.onMouseDown = function (t) {
            vjs.Slider.prototype.onMouseDown.call(this, t), this.player_.scrubbing = !0, this.player_.addClass("vjs-scrubbing"), this.videoWasPlaying = !this.player_.paused(), this.player_.pause()
        }, vjs.SeekBar.prototype.onMouseMove = function (t) {
            var e = this.calculateDistance(t) * this.player_.duration();
            e == this.player_.duration() && (e -= .1), this.player_.currentTime(e)
        }, vjs.SeekBar.prototype.onMouseUp = function (t) {
            vjs.Slider.prototype.onMouseUp.call(this, t), this.player_.scrubbing = !1, this.player_.removeClass("vjs-scrubbing"), this.videoWasPlaying && this.player_.play()
        }, vjs.SeekBar.prototype.stepForward = function () {
            this.player_.currentTime(this.player_.currentTime() + 5)
        }, vjs.SeekBar.prototype.stepBack = function () {
            this.player_.currentTime(this.player_.currentTime() - 5)
        }, vjs.LoadProgressBar = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e), this.on(t, "progress", this.update)
            }
        }), vjs.LoadProgressBar.prototype.createEl = function () {
            return vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-load-progress",
                innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"
            })
        }, vjs.LoadProgressBar.prototype.update = function () {
            var t, e, o, s, n = this.player_.buffered(),
                r = this.player_.duration(),
                i = this.player_.bufferedEnd(),
                a = this.el_.children,
                l = function (t, e) {
                    var o = t / e || 0;
                    return 100 * o + "%"
                };
            for (this.el_.style.width = l(i, r), t = 0; t < n.length; t++) e = n.start(t), o = n.end(t), s = a[t], s || (s = this.el_.appendChild(vjs.createEl())), s.style.left = l(e, i), s.style.width = l(o - e, i);
            for (t = a.length; t > n.length; t--) this.el_.removeChild(a[t - 1])
        }, vjs.PlayProgressBar = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e)
            }
        }), vjs.PlayProgressBar.prototype.createEl = function () {
            return vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-play-progress",
                innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"
            })
        }, vjs.SeekHandle = vjs.SliderHandle.extend({
            init: function (t, e) {
                vjs.SliderHandle.call(this, t, e), this.on(t, "timeupdate", this.updateContent)
            }
        }), vjs.SeekHandle.prototype.defaultValue = "00:00", vjs.SeekHandle.prototype.createEl = function () {
            return vjs.SliderHandle.prototype.createEl.call(this, "div", {
                className: "vjs-seek-handle",
                "aria-live": "off"
            })
        }, vjs.SeekHandle.prototype.updateContent = function () {
            var t = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
            this.el_.innerHTML = '<span class="vjs-control-text">' + vjs.formatTime(t, this.player_.duration()) + "</span>"
        }, vjs.VolumeControl = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e), t.tech && t.tech.featuresVolumeControl === !1 && this.addClass("vjs-hidden"), this.on(t, "loadstart", function () {
                    t.tech.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                })
            }
        }), vjs.VolumeControl.prototype.options_ = {
            children: {
                volumeBar: {}
            }
        }, vjs.VolumeControl.prototype.createEl = function () {
            return vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-volume-control vjs-control"
            })
        }, vjs.VolumeBar = vjs.Slider.extend({
            init: function (t, e) {
                vjs.Slider.call(this, t, e), this.on(t, "volumechange", this.updateARIAAttributes), t.ready(vjs.bind(this, this.updateARIAAttributes))
            }
        }), vjs.VolumeBar.prototype.updateARIAAttributes = function () {
            this.el_.setAttribute("aria-valuenow", vjs.round(100 * this.player_.volume(), 2)), this.el_.setAttribute("aria-valuetext", vjs.round(100 * this.player_.volume(), 2) + "%")
        }, vjs.VolumeBar.prototype.options_ = {
            children: {
                volumeLevel: {},
                volumeHandle: {}
            },
            barName: "volumeLevel",
            handleName: "volumeHandle"
        }, vjs.VolumeBar.prototype.playerEvent = "volumechange", vjs.VolumeBar.prototype.createEl = function () {
            return vjs.Slider.prototype.createEl.call(this, "div", {
                className: "vjs-volume-bar",
                "aria-label": "volume level"
            })
        }, vjs.VolumeBar.prototype.onMouseMove = function (t) {
            this.player_.muted() && this.player_.muted(!1), this.player_.volume(this.calculateDistance(t))
        }, vjs.VolumeBar.prototype.getPercent = function () {
            return this.player_.muted() ? 0 : this.player_.volume()
        }, vjs.VolumeBar.prototype.stepForward = function () {
            this.player_.volume(this.player_.volume() + .1)
        }, vjs.VolumeBar.prototype.stepBack = function () {
            this.player_.volume(this.player_.volume() - .1)
        }, vjs.VolumeLevel = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e)
            }
        }), vjs.VolumeLevel.prototype.createEl = function () {
            return vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-volume-level",
                innerHTML: '<span class="vjs-control-text"></span>'
            })
        }, vjs.VolumeHandle = vjs.SliderHandle.extend(), vjs.VolumeHandle.prototype.defaultValue = "00:00", vjs.VolumeHandle.prototype.createEl = function () {
            return vjs.SliderHandle.prototype.createEl.call(this, "div", {
                className: "vjs-volume-handle"
            })
        }, vjs.MuteToggle = vjs.Button.extend({
            init: function (t, e) {
                vjs.Button.call(this, t, e), this.on(t, "volumechange", this.update), t.tech && t.tech.featuresVolumeControl === !1 && this.addClass("vjs-hidden"), this.on(t, "loadstart", function () {
                    t.tech.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                })
            }
        }), vjs.MuteToggle.prototype.createEl = function () {
            return vjs.Button.prototype.createEl.call(this, "div", {
                className: "vjs-mute-control vjs-control",
                innerHTML: '<div><span class="vjs-control-text">' + this.localize("Mute") + "</span></div>"
            })
        }, vjs.MuteToggle.prototype.onClick = function () {
            this.player_.muted(this.player_.muted() ? !1 : !0)
        }, vjs.MuteToggle.prototype.update = function () {
            var t = this.player_.volume(),
                e = 3;
            0 === t || this.player_.muted() ? e = 0 : .33 > t ? e = 1 : .67 > t && (e = 2), this.player_.muted() ? this.el_.children[0].children[0].innerHTML != this.localize("Unmute") && (this.el_.children[0].children[0].innerHTML = this.localize("Unmute")) : this.el_.children[0].children[0].innerHTML != this.localize("Mute") && (this.el_.children[0].children[0].innerHTML = this.localize("Mute"));
            for (var o = 0; 4 > o; o++) vjs.removeClass(this.el_, "vjs-vol-" + o);
            vjs.addClass(this.el_, "vjs-vol-" + e)
        }, vjs.VolumeMenuButton = vjs.MenuButton.extend({
            init: function (t, e) {
                vjs.MenuButton.call(this, t, e), this.on(t, "volumechange", this.volumeUpdate), t.tech && t.tech.featuresVolumeControl === !1 && this.addClass("vjs-hidden"), this.on(t, "loadstart", function () {
                    t.tech.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                }), this.addClass("vjs-menu-button")
            }
        }), vjs.VolumeMenuButton.prototype.createMenu = function () {
            var t = new vjs.Menu(this.player_, {
                    contentElType: "div"
                }),
                e = new vjs.VolumeBar(this.player_, this.options_.volumeBar);
            return e.on("focus", function () {
                t.lockShowing()
            }), e.on("blur", function () {
                t.unlockShowing()
            }), t.addChild(e), t
        }, vjs.VolumeMenuButton.prototype.onClick = function () {
            vjs.MuteToggle.prototype.onClick.call(this), vjs.MenuButton.prototype.onClick.call(this)
        }, vjs.VolumeMenuButton.prototype.createEl = function () {
            return vjs.Button.prototype.createEl.call(this, "div", {
                className: "vjs-volume-menu-button vjs-menu-button vjs-control",
                innerHTML: '<div><span class="vjs-control-text">' + this.localize("Mute") + "</span></div>"
            })
        }, vjs.VolumeMenuButton.prototype.volumeUpdate = vjs.MuteToggle.prototype.update, vjs.PlaybackRateMenuButton = vjs.MenuButton.extend({
            init: function (t, e) {
                vjs.MenuButton.call(this, t, e), this.updateVisibility(), this.updateLabel(), this.on(t, "loadstart", this.updateVisibility), this.on(t, "ratechange", this.updateLabel)
            }
        }), vjs.PlaybackRateMenuButton.prototype.buttonText = "Playback Rate", vjs.PlaybackRateMenuButton.prototype.className = "vjs-playback-rate", vjs.PlaybackRateMenuButton.prototype.createEl = function () {
            var t = vjs.MenuButton.prototype.createEl.call(this);
            return this.labelEl_ = vjs.createEl("div", {
                className: "vjs-playback-rate-value",
                innerHTML: 1
            }), t.appendChild(this.labelEl_), t
        }, vjs.PlaybackRateMenuButton.prototype.createMenu = function () {
            var t = new vjs.Menu(this.player()),
                e = this.player().options().playbackRates;
            if (e)
                for (var o = e.length - 1; o >= 0; o--) t.addChild(new vjs.PlaybackRateMenuItem(this.player(), {
                    rate: e[o] + "x"
                }));
            return t
        }, vjs.PlaybackRateMenuButton.prototype.updateARIAAttributes = function () {
            this.el().setAttribute("aria-valuenow", this.player().playbackRate())
        }, vjs.PlaybackRateMenuButton.prototype.onClick = function () {
            for (var t = this.player().playbackRate(), e = this.player().options().playbackRates, o = e[0], s = 0; s < e.length; s++)
                if (e[s] > t) {
                    o = e[s];
                    break
                }
            this.player().playbackRate(o)
        }, vjs.PlaybackRateMenuButton.prototype.playbackRateSupported = function () {
            return this.player().tech && this.player().tech.featuresPlaybackRate && this.player().options().playbackRates && this.player().options().playbackRates.length > 0
        }, vjs.PlaybackRateMenuButton.prototype.updateVisibility = function () {
            this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden")
        }, vjs.PlaybackRateMenuButton.prototype.updateLabel = function () {
            this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x")
        }, vjs.PlaybackRateMenuItem = vjs.MenuItem.extend({
            contentElType: "button",
            init: function (t, e) {
                var o = this.label = e.rate,
                    s = this.rate = parseFloat(o, 10);
                e.label = o, e.selected = 1 === s, vjs.MenuItem.call(this, t, e), this.on(t, "ratechange", this.update)
            }
        }), vjs.PlaybackRateMenuItem.prototype.onClick = function () {
            vjs.MenuItem.prototype.onClick.call(this), this.player().playbackRate(this.rate)
        }, vjs.PlaybackRateMenuItem.prototype.update = function () {
            this.selected(this.player().playbackRate() == this.rate)
        }, vjs.PosterImage = vjs.Button.extend({
            init: function (t, e) {
                vjs.Button.call(this, t, e), this.update(), t.on("posterchange", vjs.bind(this, this.update))
            }
        }), vjs.PosterImage.prototype.dispose = function () {
            this.player().off("posterchange", this.update), vjs.Button.prototype.dispose.call(this)
        }, vjs.PosterImage.prototype.createEl = function () {
            var t = vjs.createEl("div", {
                className: "vjs-poster",
                tabIndex: -1
            });
            return vjs.BACKGROUND_SIZE_SUPPORTED || (this.fallbackImg_ = vjs.createEl("img"), t.appendChild(this.fallbackImg_)), t
        }, vjs.PosterImage.prototype.update = function () {
            var t = this.player().poster();
            this.setSrc(t), t ? this.show() : this.hide()
        }, vjs.PosterImage.prototype.setSrc = function (t) {
            var e;
            this.fallbackImg_ ? this.fallbackImg_.src = t : (e = "", t && (e = 'url("' + t + '")'), this.el_.style.backgroundImage = e)
        }, vjs.PosterImage.prototype.onClick = function () {
            this.player_.play()
        }, vjs.LoadingSpinner = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e)
            }
        }), vjs.LoadingSpinner.prototype.createEl = function () {
            return vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-loading-spinner"
            })
        }, vjs.BigPlayButton = vjs.Button.extend(), vjs.BigPlayButton.prototype.createEl = function () {
            return vjs.Button.prototype.createEl.call(this, "div", {
                className: "vjs-big-play-button",
                innerHTML: '<span aria-hidden="true"></span>',
                "aria-label": "play video"
            })
        }, vjs.BigPlayButton.prototype.onClick = function () {
            this.player_.play()
        }, vjs.ErrorDisplay = vjs.Component.extend({
            init: function (t, e) {
                vjs.Component.call(this, t, e), this.update(), this.on(t, "error", this.update)
            }
        }), vjs.ErrorDisplay.prototype.createEl = function () {
            var t = vjs.Component.prototype.createEl.call(this, "div", {
                className: "vjs-error-display"
            });
            return this.contentEl_ = vjs.createEl("div"), t.appendChild(this.contentEl_), t
        }, vjs.ErrorDisplay.prototype.update = function () {
            this.player().error() && (this.contentEl_.innerHTML = this.localize(this.player().error().message))
        }, function () {
            var t;
            vjs.MediaTechController = vjs.Component.extend({
                init: function (t, e, o) {
                    e = e || {}, e.reportTouchActivity = !1, vjs.Component.call(this, t, e, o), this.featuresProgressEvents || this.manualProgressOn(), this.featuresTimeupdateEvents || this.manualTimeUpdatesOn(), this.initControlsListeners(), this.featuresNativeTextTracks || this.emulateTextTracks(), this.initTextTrackListeners()
                }
            }), vjs.MediaTechController.prototype.initControlsListeners = function () {
                var t, e;
                t = this.player(), e = function () {
                    t.controls() && !t.usingNativeControls() && this.addControlsListeners()
                }, this.ready(e), this.on(t, "controlsenabled", e), this.on(t, "controlsdisabled", this.removeControlsListeners), this.ready(function () {
                    this.networkState && this.networkState() > 0 && this.player().trigger("loadstart")
                })
            }, vjs.MediaTechController.prototype.addControlsListeners = function () {
                var t;
                this.on("mousedown", this.onClick), this.on("touchstart", function () {
                    t = this.player_.userActive()
                }), this.on("touchmove", function () {
                    t && this.player().reportUserActivity()
                }), this.on("touchend", function (t) {
                    t.preventDefault()
                }), this.emitTapEvents(), this.on("tap", this.onTap)
            }, vjs.MediaTechController.prototype.removeControlsListeners = function () {
                this.off("tap"), this.off("touchstart"), this.off("touchmove"), this.off("touchleave"), this.off("touchcancel"), this.off("touchend"), this.off("click"), this.off("mousedown")
            }, vjs.MediaTechController.prototype.onClick = function (t) {
                0 === t.button && this.player().controls() && (this.player().paused() ? this.player().play() : this.player().pause())
            }, vjs.MediaTechController.prototype.onTap = function () {
                this.player().userActive(!this.player().userActive())
            }, vjs.MediaTechController.prototype.manualProgressOn = function () {
                this.manualProgress = !0, this.trackProgress()
            }, vjs.MediaTechController.prototype.manualProgressOff = function () {
                this.manualProgress = !1, this.stopTrackingProgress()
            }, vjs.MediaTechController.prototype.trackProgress = function () {
                this.progressInterval = this.setInterval(function () {
                    var t = this.player().bufferedPercent();
                    this.bufferedPercent_ != t && this.player().trigger("progress"), this.bufferedPercent_ = t, 1 === t && this.stopTrackingProgress()
                }, 500)
            }, vjs.MediaTechController.prototype.stopTrackingProgress = function () {
                this.clearInterval(this.progressInterval)
            }, vjs.MediaTechController.prototype.manualTimeUpdatesOn = function () {
                var t = this.player_;
                this.manualTimeUpdates = !0, this.on(t, "play", this.trackCurrentTime), this.on(t, "pause", this.stopTrackingCurrentTime), this.one("timeupdate", function () {
                    this.featuresTimeupdateEvents = !0, this.manualTimeUpdatesOff()
                })
            }, vjs.MediaTechController.prototype.manualTimeUpdatesOff = function () {
                var t = this.player_;
                this.manualTimeUpdates = !1, this.stopTrackingCurrentTime(), this.off(t, "play", this.trackCurrentTime), this.off(t, "pause", this.stopTrackingCurrentTime)
            }, vjs.MediaTechController.prototype.trackCurrentTime = function () {
                this.currentTimeInterval && this.stopTrackingCurrentTime(), this.currentTimeInterval = this.setInterval(function () {
                    this.player().trigger("timeupdate")
                }, 250)
            }, vjs.MediaTechController.prototype.stopTrackingCurrentTime = function () {
                this.clearInterval(this.currentTimeInterval), this.player().trigger("timeupdate")
            }, vjs.MediaTechController.prototype.dispose = function () {
                this.manualProgress && this.manualProgressOff(), this.manualTimeUpdates && this.manualTimeUpdatesOff(), vjs.Component.prototype.dispose.call(this)
            }, vjs.MediaTechController.prototype.setCurrentTime = function () {
                this.manualTimeUpdates && this.player().trigger("timeupdate")
            }, vjs.MediaTechController.prototype.initTextTrackListeners = function () {
                var t, e = this.player_,
                    o = function () {
                        var t = e.getChild("textTrackDisplay");
                        t && t.updateDisplay()
                    };
                t = this.textTracks(), t && (t.addEventListener("removetrack", o), t.addEventListener("addtrack", o), this.on("dispose", vjs.bind(this, function () {
                    t.removeEventListener("removetrack", o), t.removeEventListener("addtrack", o)
                })))
            }, vjs.MediaTechController.prototype.emulateTextTracks = function () {
                var t, e, o, s = this.player_;
                window.WebVTT || (o = document.createElement("script"), o.src = s.options()["vtt.js"] || "../node_modules/vtt.js/dist/vtt.js", s.el().appendChild(o), window.WebVTT = !0), e = this.textTracks(), e && (t = function () {
                    var t, e, o;
                    for (o = s.getChild("textTrackDisplay"), o.updateDisplay(), t = 0; t < this.length; t++) e = this[t], e.removeEventListener("cuechange", vjs.bind(o, o.updateDisplay)), "showing" === e.mode && e.addEventListener("cuechange", vjs.bind(o, o.updateDisplay))
                }, e.addEventListener("change", t), this.on("dispose", vjs.bind(this, function () {
                    e.removeEventListener("change", t)
                })))
            }, vjs.MediaTechController.prototype.textTracks_, vjs.MediaTechController.prototype.textTracks = function () {
                return this.player_.textTracks_ = this.player_.textTracks_ || new vjs.TextTrackList, this.player_.textTracks_
            }, vjs.MediaTechController.prototype.remoteTextTracks = function () {
                return this.player_.remoteTextTracks_ = this.player_.remoteTextTracks_ || new vjs.TextTrackList, this.player_.remoteTextTracks_
            }, t = function (t, e, o, s, n) {
                var r, i = t.textTracks();
                return n = n || {}, n.kind = e, o && (n.label = o), s && (n.language = s), n.player = t.player_, r = new vjs.TextTrack(n), i.addTrack_(r), r
            }, vjs.MediaTechController.prototype.addTextTrack = function (e, o, s) {
                if (!e) throw new Error("TextTrack kind is required but was not provided");
                return t(this, e, o, s)
            }, vjs.MediaTechController.prototype.addRemoteTextTrack = function (e) {
                var o = t(this, e.kind, e.label, e.language, e);
                return this.remoteTextTracks().addTrack_(o), {
                    track: o
                }
            }, vjs.MediaTechController.prototype.removeRemoteTextTrack = function (t) {
                this.textTracks().removeTrack_(t), this.remoteTextTracks().removeTrack_(t)
            }, vjs.MediaTechController.prototype.setPoster = function () {}, vjs.MediaTechController.prototype.featuresVolumeControl = !0, vjs.MediaTechController.prototype.featuresFullscreenResize = !1, vjs.MediaTechController.prototype.featuresPlaybackRate = !1, vjs.MediaTechController.prototype.featuresProgressEvents = !1, vjs.MediaTechController.prototype.featuresTimeupdateEvents = !1, vjs.MediaTechController.prototype.featuresNativeTextTracks = !1, vjs.MediaTechController.withSourceHandlers = function (t) {
                t.registerSourceHandler = function (e, o) {
                    var s = t.sourceHandlers;
                    s || (s = t.sourceHandlers = []), void 0 === o && (o = s.length), s.splice(o, 0, e)
                }, t.selectSourceHandler = function (e) {
                    for (var o, s = t.sourceHandlers || [], n = 0; n < s.length; n++)
                        if (o = s[n].canHandleSource(e)) return s[n];
                    return null
                }, t.canPlaySource = function (e) {
                    var o = t.selectSourceHandler(e);
                    return o ? o.canHandleSource(e) : ""
                }, t.prototype.setSource = function (e) {
                    var o = t.selectSourceHandler(e);
                    return o || (t.nativeSourceHandler ? o = t.nativeSourceHandler : vjs.log.error("No source hander found for the current source.")), this.disposeSourceHandler(), this.off("dispose", this.disposeSourceHandler), this.currentSource_ = e, this.sourceHandler_ = o.handleSource(e, this), this.on("dispose", this.disposeSourceHandler), this
                }, t.prototype.disposeSourceHandler = function () {
                    this.sourceHandler_ && this.sourceHandler_.dispose && this.sourceHandler_.dispose()
                }
            }, vjs.media = {}
        }(), vjs.Html5 = vjs.MediaTechController.extend({
            init: function (t, e, o) {
                var s, n, r, i, a, l;
                (e.nativeCaptions === !1 || e.nativeTextTracks === !1) && (this.featuresNativeTextTracks = !1), vjs.MediaTechController.call(this, t, e, o), this.setupTriggers();
                var c = e.source;
                if (c && (this.el_.currentSrc !== c.src || t.tag && 3 === t.tag.initNetworkState_) && this.setSource(c), this.el_.hasChildNodes()) {
                    for (s = this.el_.childNodes, n = s.length, l = []; n--;) i = s[n], a = i.nodeName.toLowerCase(), "track" === a && (this.featuresNativeTextTracks ? this.remoteTextTracks().addTrack_(i.track) : l.push(i));
                    for (r = 0; r < l.length; r++) this.el_.removeChild(l[r])
                }
                this.featuresNativeTextTracks && this.on("loadstart", vjs.bind(this, this.hideCaptions)), vjs.TOUCH_ENABLED && t.options().nativeControlsForTouch === !0 && this.useNativeControls(), t.ready(function () {
                    this.src() && this.tag && this.options_.autoplay && this.paused() && (delete this.tag.poster, this.play())
                }), this.triggerReady()
            }
        }), vjs.Html5.prototype.dispose = function () {
            vjs.Html5.disposeMediaElement(this.el_), vjs.MediaTechController.prototype.dispose.call(this)
        }, vjs.Html5.prototype.createEl = function () {
            var t, e, o, s, n, r = this.player_,
                i = r.tag;
            if (!i || this.movingMediaElementInDOM === !1) {
                if (i ? (n = i.cloneNode(!1), vjs.Html5.disposeMediaElement(i), i = n, r.tag = null) : (i = vjs.createEl("video"), s = videojs.util.mergeOptions({}, r.tagAttributes), vjs.TOUCH_ENABLED && r.options().nativeControlsForTouch === !0 || delete s.controls, vjs.setElementAttributes(i, vjs.obj.merge(s, {
                        id: r.id() + "_html5_api",
                        "class": "vjs-tech"
                    }))), i.player = r, r.options_.tracks)
                    for (o = 0; o < r.options_.tracks.length; o++) t = r.options_.tracks[o], e = document.createElement("track"), e.kind = t.kind, e.label = t.label, e.srclang = t.srclang, e.src = t.src, "default" in t && e.setAttribute("default", "default"), i.appendChild(e);
                vjs.insertFirst(i, r.el())
            }
            var a = ["autoplay", "preload", "loop", "muted"];
            for (o = a.length - 1; o >= 0; o--) {
                var l = a[o],
                    c = {};
                "undefined" != typeof r.options_[l] && (c[l] = r.options_[l]), vjs.setElementAttributes(i, c)
            }
            return i
        }, vjs.Html5.prototype.hideCaptions = function () {
            for (var t, e = this.el_.querySelectorAll("track"), o = e.length, s = {
                    captions: 1,
                    subtitles: 1
                }; o--;) t = e[o].track, t && t.kind in s && !e[o]["default"] && (t.mode = "disabled")
        }, vjs.Html5.prototype.setupTriggers = function () {
            for (var t = vjs.Html5.Events.length - 1; t >= 0; t--) this.on(vjs.Html5.Events[t], this.eventHandler)
        }, vjs.Html5.prototype.eventHandler = function (t) {
            "error" == t.type && this.error() ? this.player().error(this.error().code) : (t.bubbles = !1, this.player().trigger(t))
        }, vjs.Html5.prototype.useNativeControls = function () {
            var t, e, o, s, n;
            t = this, e = this.player(), t.setControls(e.controls()), o = function () {
                t.setControls(!0)
            }, s = function () {
                t.setControls(!1)
            }, e.on("controlsenabled", o), e.on("controlsdisabled", s), n = function () {
                e.off("controlsenabled", o), e.off("controlsdisabled", s)
            }, t.on("dispose", n), e.on("usingcustomcontrols", n), e.usingNativeControls(!0)
        }, vjs.Html5.prototype.play = function () {
            this.el_.play()
        }, vjs.Html5.prototype.pause = function () {
            this.el_.pause()
        }, vjs.Html5.prototype.paused = function () {
            return this.el_.paused
        }, vjs.Html5.prototype.currentTime = function () {
            return this.el_.currentTime
        }, vjs.Html5.prototype.setCurrentTime = function (t) {
            try {
                this.el_.currentTime = t
            } catch (e) {
                vjs.log(e, "Video is not ready. (Video.js)")
            }
        }, vjs.Html5.prototype.duration = function () {
            return this.el_.duration || 0
        }, vjs.Html5.prototype.buffered = function () {
            return this.el_.buffered
        }, vjs.Html5.prototype.volume = function () {
            return this.el_.volume
        }, vjs.Html5.prototype.setVolume = function (t) {
            this.el_.volume = t
        }, vjs.Html5.prototype.muted = function () {
            return this.el_.muted
        }, vjs.Html5.prototype.setMuted = function (t) {
            this.el_.muted = t
        }, vjs.Html5.prototype.width = function () {
            return this.el_.offsetWidth
        }, vjs.Html5.prototype.height = function () {
            return this.el_.offsetHeight
        }, vjs.Html5.prototype.supportsFullScreen = function () {
            return "function" != typeof this.el_.webkitEnterFullScreen || !/Android/.test(vjs.USER_AGENT) && /Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT) ? !1 : !0
        }, vjs.Html5.prototype.enterFullScreen = function () {
            var t = this.el_;
            "webkitDisplayingFullscreen" in t && this.one("webkitbeginfullscreen", function () {
                this.player_.isFullscreen(!0), this.one("webkitendfullscreen", function () {
                    this.player_.isFullscreen(!1), this.player_.trigger("fullscreenchange")
                }), this.player_.trigger("fullscreenchange")
            }), t.paused && t.networkState <= t.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function () {
                t.pause(), t.webkitEnterFullScreen()
            }, 0)) : t.webkitEnterFullScreen()
        }, vjs.Html5.prototype.exitFullScreen = function () {
            this.el_.webkitExitFullScreen()
        }, vjs.Html5.prototype.returnOriginalIfBlobURI_ = function (t, e) {
            var o = /^blob\:/i;
            return e && t && o.test(t) ? e : t
        }, vjs.Html5.prototype.src = function (t) {
            var e = this.el_.src;
            return void 0 === t ? this.returnOriginalIfBlobURI_(e, this.source_) : void this.setSrc(t)
        }, vjs.Html5.prototype.setSrc = function (t) {
            this.el_.src = t
        }, vjs.Html5.prototype.load = function () {
            this.el_.load()
        }, vjs.Html5.prototype.currentSrc = function () {
            var t = this.el_.currentSrc;
            return this.currentSource_ ? this.returnOriginalIfBlobURI_(t, this.currentSource_.src) : t
        }, vjs.Html5.prototype.poster = function () {
            return this.el_.poster
        }, vjs.Html5.prototype.setPoster = function (t) {
            this.el_.poster = t
        }, vjs.Html5.prototype.preload = function () {
            return this.el_.preload
        }, vjs.Html5.prototype.setPreload = function (t) {
            this.el_.preload = t
        }, vjs.Html5.prototype.autoplay = function () {
            return this.el_.autoplay
        }, vjs.Html5.prototype.setAutoplay = function (t) {
            this.el_.autoplay = t
        }, vjs.Html5.prototype.controls = function () {
            return this.el_.controls
        }, vjs.Html5.prototype.setControls = function (t) {
            this.el_.controls = !!t
        }, vjs.Html5.prototype.loop = function () {
            return this.el_.loop
        }, vjs.Html5.prototype.setLoop = function (t) {
            this.el_.loop = t
        }, vjs.Html5.prototype.error = function () {
            return this.el_.error
        }, vjs.Html5.prototype.seeking = function () {
            return this.el_.seeking
        }, vjs.Html5.prototype.seekable = function () {
            return this.el_.seekable
        }, vjs.Html5.prototype.ended = function () {
            return this.el_.ended
        }, vjs.Html5.prototype.defaultMuted = function () {
            return this.el_.defaultMuted
        }, vjs.Html5.prototype.playbackRate = function () {
            return this.el_.playbackRate
        }, vjs.Html5.prototype.setPlaybackRate = function (t) {
            this.el_.playbackRate = t
        }, vjs.Html5.prototype.networkState = function () {
            return this.el_.networkState
        }, vjs.Html5.prototype.readyState = function () {
            return this.el_.readyState
        }, vjs.Html5.prototype.textTracks = function () {
            return this.featuresNativeTextTracks ? this.el_.textTracks : vjs.MediaTechController.prototype.textTracks.call(this)
        }, vjs.Html5.prototype.addTextTrack = function (t, e, o) {
            return this.featuresNativeTextTracks ? this.el_.addTextTrack(t, e, o) : vjs.MediaTechController.prototype.addTextTrack.call(this, t, e, o)
        }, vjs.Html5.prototype.addRemoteTextTrack = function (t) {
            if (!this.featuresNativeTextTracks) return vjs.MediaTechController.prototype.addRemoteTextTrack.call(this, t);
            var e = document.createElement("track");
            return t = t || {}, t.kind && (e.kind = t.kind), t.label && (e.label = t.label), (t.language || t.srclang) && (e.srclang = t.language || t.srclang), t["default"] && (e["default"] = t["default"]), t.id && (e.id = t.id), t.src && (e.src = t.src), this.el().appendChild(e), e.track.mode = "metadata" === e.track.kind ? "hidden" : "disabled", e.onload = function () {
                var t = e.track;
                e.readyState >= 2 && ("metadata" === t.kind && "hidden" !== t.mode ? t.mode = "hidden" : "metadata" !== t.kind && "disabled" !== t.mode && (t.mode = "disabled"), e.onload = null)
            }, this.remoteTextTracks().addTrack_(e.track), e
        }, vjs.Html5.prototype.removeRemoteTextTrack = function (t) {
            if (!this.featuresNativeTextTracks) return vjs.MediaTechController.prototype.removeRemoteTextTrack.call(this, t);
            var e, o;
            for (this.remoteTextTracks().removeTrack_(t), e = this.el().querySelectorAll("track"), o = 0; o < e.length; o++)
                if (e[o] === t || e[o].track === t) {
                    e[o].parentNode.removeChild(e[o]);
                    break
                }
        }, vjs.Html5.isSupported = function () {
            try {
                vjs.TEST_VID.volume = .5
            } catch (t) {
                return !1
            }
            return !!vjs.TEST_VID.canPlayType
        }, vjs.MediaTechController.withSourceHandlers(vjs.Html5), function () {
            var t = vjs.Html5.prototype.setSource,
                e = vjs.Html5.prototype.disposeSourceHandler;
            vjs.Html5.prototype.setSource = function (e) {
                var o = t.call(this, e);
                return this.source_ = e.src, o
            }, vjs.Html5.prototype.disposeSourceHandler = function () {
                return this.source_ = void 0, e.call(this)
            }
        }(), vjs.Html5.nativeSourceHandler = {}, vjs.Html5.nativeSourceHandler.canHandleSource = function (t) {
            function e(t) {
                try {
                    return vjs.TEST_VID.canPlayType(t)
                } catch (e) {
                    return ""
                }
            }
            var o, s;
            return t.type ? e(t.type) : t.src ? (o = t.src.match(/\.([^.\/\?]+)(\?[^\/]+)?$/i), s = o && o[1], e("video/" + s)) : ""
        }, vjs.Html5.nativeSourceHandler.handleSource = function (t, e) {
            e.setSrc(t.src)
        }, vjs.Html5.nativeSourceHandler.dispose = function () {}, vjs.Html5.registerSourceHandler(vjs.Html5.nativeSourceHandler), vjs.Html5.canControlVolume = function () {
            var t = vjs.TEST_VID.volume;
            return vjs.TEST_VID.volume = t / 2 + .1, t !== vjs.TEST_VID.volume
        }, vjs.Html5.canControlPlaybackRate = function () {
            var t = vjs.TEST_VID.playbackRate;
            return vjs.TEST_VID.playbackRate = t / 2 + .1, t !== vjs.TEST_VID.playbackRate
        }, vjs.Html5.supportsNativeTextTracks = function () {
            var t;
            return t = !!vjs.TEST_VID.textTracks, t && vjs.TEST_VID.textTracks.length > 0 && (t = "number" != typeof vjs.TEST_VID.textTracks[0].mode), t && vjs.IS_FIREFOX && (t = !1), t
        }, vjs.Html5.prototype.featuresVolumeControl = vjs.Html5.canControlVolume(), vjs.Html5.prototype.featuresPlaybackRate = vjs.Html5.canControlPlaybackRate(), vjs.Html5.prototype.movingMediaElementInDOM = !vjs.IS_IOS, vjs.Html5.prototype.featuresFullscreenResize = !0, vjs.Html5.prototype.featuresProgressEvents = !0, vjs.Html5.prototype.featuresNativeTextTracks = vjs.Html5.supportsNativeTextTracks(), function () {
            var t, e = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
                o = /^video\/mp4/i;
            vjs.Html5.patchCanPlayType = function () {
                vjs.ANDROID_VERSION >= 4 && (t || (t = vjs.TEST_VID.constructor.prototype.canPlayType), vjs.TEST_VID.constructor.prototype.canPlayType = function (o) {
                    return o && e.test(o) ? "maybe" : t.call(this, o)
                }), vjs.IS_OLD_ANDROID && (t || (t = vjs.TEST_VID.constructor.prototype.canPlayType), vjs.TEST_VID.constructor.prototype.canPlayType = function (e) {
                    return e && o.test(e) ? "maybe" : t.call(this, e)
                })
            }, vjs.Html5.unpatchCanPlayType = function () {
                var e = vjs.TEST_VID.constructor.prototype.canPlayType;
                return vjs.TEST_VID.constructor.prototype.canPlayType = t, t = null, e
            }, vjs.Html5.patchCanPlayType()
        }(), vjs.Html5.Events = "loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(","), vjs.Html5.disposeMediaElement = function (t) {
            if (t) {
                for (t.player = null, t.parentNode && t.parentNode.removeChild(t); t.hasChildNodes();) t.removeChild(t.firstChild);
                t.removeAttribute("src"), "function" == typeof t.load && ! function () {
                    try {
                        t.load()
                    } catch (e) {}
                }()
            }
        }, vjs.Flash = vjs.MediaTechController.extend({
            init: function (t, e, o) {
                vjs.MediaTechController.call(this, t, e, o);
                var s = e.source,
                    n = t.id() + "_flash_api",
                    r = t.options_,
                    i = vjs.obj.merge({
                        readyFunction: "videojs.Flash.onReady",
                        eventProxyFunction: "videojs.Flash.onEvent",
                        errorEventProxyFunction: "videojs.Flash.onError",
                        autoplay: r.autoplay,
                        preload: r.preload,
                        loop: r.loop,
                        muted: r.muted
                    }, e.flashVars),
                    a = vjs.obj.merge({
                        wmode: "opaque",
                        bgcolor: "#000000"
                    }, e.params),
                    l = vjs.obj.merge({
                        id: n,
                        name: n,
                        "class": "vjs-tech"
                    }, e.attributes);
                s && this.ready(function () {
                    this.setSource(s)
                }), vjs.insertFirst(this.el_, e.parentEl), e.startTime && this.ready(function () {
                    this.load(), this.play(), this.currentTime(e.startTime)
                }), vjs.IS_FIREFOX && this.ready(function () {
                    this.on("mousemove", function () {
                        this.player().trigger({
                            type: "mousemove",
                            bubbles: !1
                        })
                    })
                }), t.on("stageclick", t.reportUserActivity), this.el_ = vjs.Flash.embed(e.swf, this.el_, i, a, l)
            }
        }), vjs.Flash.prototype.dispose = function () {
            vjs.MediaTechController.prototype.dispose.call(this)
        }, vjs.Flash.prototype.play = function () {
            this.el_.vjs_play()
        }, vjs.Flash.prototype.pause = function () {
            this.el_.vjs_pause()
        }, vjs.Flash.prototype.src = function (t) {
            return void 0 === t ? this.currentSrc() : this.setSrc(t)
        }, vjs.Flash.prototype.setSrc = function (t) {
            if (t = vjs.getAbsoluteURL(t), this.el_.vjs_src(t), this.player_.autoplay()) {
                var e = this;
                this.setTimeout(function () {
                    e.play()
                }, 0)
            }
        }, vjs.Flash.prototype.setCurrentTime = function (t) {
            this.lastSeekTarget_ = t, this.el_.vjs_setProperty("currentTime", t), vjs.MediaTechController.prototype.setCurrentTime.call(this)
        }, vjs.Flash.prototype.currentTime = function () {
            return this.seeking() ? this.lastSeekTarget_ || 0 : this.el_.vjs_getProperty("currentTime")
        }, vjs.Flash.prototype.currentSrc = function () {
            return this.currentSource_ ? this.currentSource_.src : this.el_.vjs_getProperty("currentSrc")
        }, vjs.Flash.prototype.load = function () {
            this.el_.vjs_load()
        }, vjs.Flash.prototype.poster = function () {
            this.el_.vjs_getProperty("poster")
        }, vjs.Flash.prototype.setPoster = function () {}, vjs.Flash.prototype.seekable = function () {
            var t = this.duration();
            return 0 === t ? vjs.createTimeRange() : vjs.createTimeRange(0, this.duration())
        }, vjs.Flash.prototype.buffered = function () {
            return vjs.createTimeRange(0, this.el_.vjs_getProperty("buffered"))
        }, vjs.Flash.prototype.supportsFullScreen = function () {
            return !1
        }, vjs.Flash.prototype.enterFullScreen = function () {
            return !1
        }, function () {
            function t(t) {
                var e = t.charAt(0).toUpperCase() + t.slice(1);
                s["set" + e] = function (e) {
                    return this.el_.vjs_setProperty(t, e)
                }
            }

            function e(t) {
                s[t] = function () {
                    return this.el_.vjs_getProperty(t)
                }
            }
            var o, s = vjs.Flash.prototype,
                n = "rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),
                r = "error,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,ended,videoTracks,audioTracks,videoWidth,videoHeight".split(",");
            for (o = 0; o < n.length; o++) e(n[o]), t(n[o]);
            for (o = 0; o < r.length; o++) e(r[o])
        }(), vjs.Flash.isSupported = function () {
            return vjs.Flash.version()[0] >= 10
        }, vjs.MediaTechController.withSourceHandlers(vjs.Flash), vjs.Flash.nativeSourceHandler = {}, vjs.Flash.nativeSourceHandler.canHandleSource = function (t) {
            var e;
            return t.type ? (e = t.type.replace(/;.*/, "").toLowerCase(), e in vjs.Flash.formats ? "maybe" : "") : ""
        }, vjs.Flash.nativeSourceHandler.handleSource = function (t, e) {
            e.setSrc(t.src)
        }, vjs.Flash.nativeSourceHandler.dispose = function () {}, vjs.Flash.registerSourceHandler(vjs.Flash.nativeSourceHandler), vjs.Flash.formats = {
            "video/flv": "FLV",
            "video/x-flv": "FLV",
            "video/mp4": "MP4",
            "video/m4v": "MP4"
        }, vjs.Flash.onReady = function (t) {
            var e, o;
            e = vjs.el(t), o = e && e.parentNode && e.parentNode.player, o && (e.player = o, vjs.Flash.checkReady(o.tech))
        }, vjs.Flash.checkReady = function (t) {
            t.el() && (t.el().vjs_getProperty ? t.triggerReady() : this.setTimeout(function () {
                vjs.Flash.checkReady(t)
            }, 50))
        }, vjs.Flash.onEvent = function (t, e) {
            var o = vjs.el(t).player;
            o.trigger(e)
        }, vjs.Flash.onError = function (t, e) {
            var o = vjs.el(t).player,
                s = "FLASH: " + e;
            o.error("srcnotfound" == e ? {
                code: 4,
                message: s
            } : s)
        }, vjs.Flash.version = function () {
            var t = "0,0,0";
            try {
                t = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
            } catch (e) {
                try {
                    navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (t = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                } catch (o) {}
            }
            return t.split(",")
        }, vjs.Flash.embed = function (t, e, o, s, n) {
            var r = vjs.Flash.getEmbedCode(t, o, s, n),
                i = vjs.createEl("div", {
                    innerHTML: r
                }).childNodes[0],
                a = e.parentNode;
            e.parentNode.replaceChild(i, e), i[vjs.expando] = e[vjs.expando];
            var l = a.childNodes[0];
            return setTimeout(function () {
                l.style.display = "block"
            }, 1e3), i
        }, vjs.Flash.getEmbedCode = function (t, e, o, s) {
            var n = '<object type="application/x-shockwave-flash" ',
                r = "",
                i = "",
                a = "";
            return e && vjs.obj.each(e, function (t, e) {
                r += t + "=" + e + "&amp;"
            }), o = vjs.obj.merge({
                movie: t,
                flashvars: r,
                allowScriptAccess: "always",
                allowNetworking: "all"
            }, o), vjs.obj.each(o, function (t, e) {
                i += '<param name="' + t + '" value="' + e + '" />'
            }), s = vjs.obj.merge({
                data: t,
                width: "100%",
                height: "100%"
            }, s), vjs.obj.each(s, function (t, e) {
                a += t + '="' + e + '" '
            }), n + a + ">" + i + "</object>"
        }, vjs.Flash.streamingFormats = {
            "rtmp/mp4": "MP4",
            "rtmp/flv": "FLV"
        }, vjs.Flash.streamFromParts = function (t, e) {
            return t + "&" + e
        }, vjs.Flash.streamToParts = function (t) {
            var e = {
                connection: "",
                stream: ""
            };
            if (!t) return e;
            var o, s = t.indexOf("&");
            return -1 !== s ? o = s + 1 : (s = o = t.lastIndexOf("/") + 1, 0 === s && (s = o = t.length)), e.connection = t.substring(0, s), e.stream = t.substring(o, t.length), e
        }, vjs.Flash.isStreamingType = function (t) {
            return t in vjs.Flash.streamingFormats
        }, vjs.Flash.RTMP_RE = /^rtmp[set]?:\/\//i, vjs.Flash.isStreamingSrc = function (t) {
            return vjs.Flash.RTMP_RE.test(t)
        }, vjs.Flash.rtmpSourceHandler = {}, vjs.Flash.rtmpSourceHandler.canHandleSource = function (t) {
            return vjs.Flash.isStreamingType(t.type) || vjs.Flash.isStreamingSrc(t.src) ? "maybe" : ""
        }, vjs.Flash.rtmpSourceHandler.handleSource = function (t, e) {
            var o = vjs.Flash.streamToParts(t.src);
            e.setRtmpConnection(o.connection), e.setRtmpStream(o.stream)
        }, vjs.Flash.registerSourceHandler(vjs.Flash.rtmpSourceHandler), vjs.MediaLoader = vjs.Component.extend({
            init: function (t, e, o) {
                if (vjs.Component.call(this, t, e, o), t.options_.sources && 0 !== t.options_.sources.length) t.src(t.options_.sources);
                else
                    for (var s = 0, n = t.options_.techOrder; s < n.length; s++) {
                        var r = vjs.capitalize(n[s]),
                            i = window.videojs[r];
                        if (i && i.isSupported()) {
                            t.loadTech(r);
                            break
                        }
                    }
            }
        }), vjs.TextTrackMode = {
            disabled: "disabled",
            hidden: "hidden",
            showing: "showing"
        }, vjs.TextTrackKind = {
            subtitles: "subtitles",
            captions: "captions",
            descriptions: "descriptions",
            chapters: "chapters",
            metadata: "metadata"
        }, function () {
            vjs.TextTrack = function (e) {
                var s, n, r, i, a, l, c, u, p, h, v;
                if (e = e || {}, !e.player) throw new Error("A player was not provided.");
                if (s = this, vjs.IS_IE8) {
                    s = document.createElement("custom");
                    for (v in vjs.TextTrack.prototype) s[v] = vjs.TextTrack.prototype[v]
                }
                return s.player_ = e.player, r = vjs.TextTrackMode[e.mode] || "disabled", i = vjs.TextTrackKind[e.kind] || "subtitles", a = e.label || "", l = e.language || e.srclang || "", n = e.id || "vjs_text_track_" + vjs.guid++, ("metadata" === i || "chapters" === i) && (r = "hidden"), s.cues_ = [], s.activeCues_ = [], c = new vjs.TextTrackCueList(s.cues_), u = new vjs.TextTrackCueList(s.activeCues_), h = !1, p = vjs.bind(s, function () {
                    this.activeCues, h && (this.trigger("cuechange"), h = !1)
                }), "disabled" !== r && s.player_.on("timeupdate", p), Object.defineProperty(s, "kind", {
                    get: function () {
                        return i
                    },
                    set: Function.prototype
                }), Object.defineProperty(s, "label", {
                    get: function () {
                        return a
                    },
                    set: Function.prototype
                }), Object.defineProperty(s, "language", {
                    get: function () {
                        return l
                    },
                    set: Function.prototype
                }), Object.defineProperty(s, "id", {
                    get: function () {
                        return n
                    },
                    set: Function.prototype
                }), Object.defineProperty(s, "mode", {
                    get: function () {
                        return r
                    },
                    set: function (t) {
                        vjs.TextTrackMode[t] && (r = t, "showing" === r && this.player_.on("timeupdate", p), this.trigger("modechange"))
                    }
                }), Object.defineProperty(s, "cues", {
                    get: function () {
                        return this.loaded_ ? c : null
                    },
                    set: Function.prototype
                }), Object.defineProperty(s, "activeCues", {
                    get: function () {
                        var t, e, s, n, r;
                        if (!this.loaded_) return null;
                        if (0 === this.cues.length) return u;
                        for (n = this.player_.currentTime(), t = 0, e = this.cues.length, s = []; e > t; t++) r = this.cues[t], r.startTime <= n && r.endTime >= n ? s.push(r) : r.startTime === r.endTime && r.startTime <= n && r.startTime + .5 >= n && s.push(r);
                        if (h = !1, s.length !== this.activeCues_.length) h = !0;
                        else
                            for (t = 0; t < s.length; t++) - 1 === o.call(this.activeCues_, s[t]) && (h = !0);
                        return this.activeCues_ = s, u.setCues_(this.activeCues_), u
                    },
                    set: Function.prototype
                }), e.src ? t(e.src, s) : s.loaded_ = !0, vjs.IS_IE8 ? s : void 0
            }, vjs.TextTrack.prototype = vjs.obj.create(vjs.EventEmitter.prototype), vjs.TextTrack.prototype.constructor = vjs.TextTrack, vjs.TextTrack.prototype.allowedEvents_ = {
                cuechange: "cuechange"
            }, vjs.TextTrack.prototype.addCue = function (t) {
                var e = this.player_.textTracks(),
                    o = 0;
                if (e)
                    for (; o < e.length; o++) e[o] !== this && e[o].removeCue(t);
                this.cues_.push(t), this.cues.setCues_(this.cues_)
            }, vjs.TextTrack.prototype.removeCue = function (t) {
                for (var e, o = 0, s = this.cues_.length, n = !1; s > o; o++) e = this.cues_[o], e === t && (this.cues_.splice(o, 1), n = !0);
                n && this.cues.setCues_(this.cues_)
            };
            var t, e, o;
            t = function (t, o) {
                vjs.xhr(t, vjs.bind(this, function (t, s, n) {
                    return t ? vjs.log.error(t) : (o.loaded_ = !0, void e(n, o))
                }))
            }, e = function (t, o) {
                if ("function" != typeof window.WebVTT) return window.setTimeout(function () {
                    e(t, o)
                }, 25);
                var s = new window.WebVTT.Parser(window, window.vttjs, window.WebVTT.StringDecoder());
                s.oncue = function (t) {
                    o.addCue(t)
                }, s.onparsingerror = function (t) {
                    vjs.log.error(t)
                }, s.parse(t), s.flush()
            }, o = function (t, e) {
                var o;
                if (null == this) throw new TypeError('"this" is null or not defined');
                var s = Object(this),
                    n = s.length >>> 0;
                if (0 === n) return -1;
                var r = +e || 0;
                if (1 / 0 === Math.abs(r) && (r = 0), r >= n) return -1;
                for (o = Math.max(r >= 0 ? r : n - Math.abs(r), 0); n > o;) {
                    if (o in s && s[o] === t) return o;
                    o++
                }
                return -1
            }
        }(), vjs.TextTrackList = function (t) {
            var e, o = this,
                s = 0;
            if (vjs.IS_IE8) {
                o = document.createElement("custom");
                for (e in vjs.TextTrackList.prototype) o[e] = vjs.TextTrackList.prototype[e]
            }
            for (t = t || [], o.tracks_ = [], Object.defineProperty(o, "length", {
                    get: function () {
                        return this.tracks_.length
                    }
                }); s < t.length; s++) o.addTrack_(t[s]);
            return vjs.IS_IE8 ? o : void 0
        }, vjs.TextTrackList.prototype = vjs.obj.create(vjs.EventEmitter.prototype), vjs.TextTrackList.prototype.constructor = vjs.TextTrackList, vjs.TextTrackList.prototype.allowedEvents_ = {
            change: "change",
            addtrack: "addtrack",
            removetrack: "removetrack"
        }, function () {
            var t;
            for (t in vjs.TextTrackList.prototype.allowedEvents_) vjs.TextTrackList.prototype["on" + t] = null
        }(), vjs.TextTrackList.prototype.addTrack_ = function (t) {
            var e = this.tracks_.length;
            "" + e in this || Object.defineProperty(this, e, {
                get: function () {
                    return this.tracks_[e]
                }
            }), t.addEventListener("modechange", vjs.bind(this, function () {
                this.trigger("change")
            })), this.tracks_.push(t), this.trigger({
                type: "addtrack",
                track: t
            })
        }, vjs.TextTrackList.prototype.removeTrack_ = function (t) {
            for (var e, o = 0, s = this.length; s > o; o++)
                if (e = this[o], e === t) {
                    this.tracks_.splice(o, 1);
                    break
                }
            this.trigger({
                type: "removetrack",
                track: t
            })
        }, vjs.TextTrackList.prototype.getTrackById = function (t) {
            for (var e, o = 0, s = this.length, n = null; s > o; o++)
                if (e = this[o], e.id === t) {
                    n = e;
                    break
                }
            return n
        }, vjs.TextTrackCueList = function (t) {
            var e, o = this;
            if (vjs.IS_IE8) {
                o = document.createElement("custom");
                for (e in vjs.TextTrackCueList.prototype) o[e] = vjs.TextTrackCueList.prototype[e]
            }
            return vjs.TextTrackCueList.prototype.setCues_.call(o, t), Object.defineProperty(o, "length", {
                get: function () {
                    return this.length_
                }
            }), vjs.IS_IE8 ? o : void 0
        }, vjs.TextTrackCueList.prototype.setCues_ = function (t) {
            var e, o = this.length || 0,
                s = 0,
                n = t.length;
            if (this.cues_ = t, this.length_ = t.length, e = function (t) {
                    "" + t in this || Object.defineProperty(this, "" + t, {
                        get: function () {
                            return this.cues_[t]
                        }
                    })
                }, n > o)
                for (s = o; n > s; s++) e.call(this, s)
        }, vjs.TextTrackCueList.prototype.getCueById = function (t) {
            for (var e, o = 0, s = this.length, n = null; s > o; o++)
                if (e = this[o], e.id === t) {
                    n = e;
                    break
                }
            return n
        }, function () {
            "use strict";
            vjs.TextTrackDisplay = vjs.Component.extend({
                init: function (t, e, o) {
                    vjs.Component.call(this, t, e, o), t.on("loadstart", vjs.bind(this, this.toggleDisplay)), t.ready(vjs.bind(this, function () {
                        if (t.tech && t.tech.featuresNativeTextTracks) return void this.hide();
                        var e, o, s;
                        for (t.on("fullscreenchange", vjs.bind(this, this.updateDisplay)), o = t.options_.tracks || [], e = 0; e < o.length; e++) s = o[e], this.player_.addRemoteTextTrack(s)
                    }))
                }
            }), vjs.TextTrackDisplay.prototype.toggleDisplay = function () {
                this.player_.tech && this.player_.tech.featuresNativeTextTracks ? this.hide() : this.show()
            }, vjs.TextTrackDisplay.prototype.createEl = function () {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-text-track-display"
                })
            }, vjs.TextTrackDisplay.prototype.clearDisplay = function () {
                "function" == typeof window.WebVTT && window.WebVTT.processCues(window, [], this.el_)
            };
            var t = function (t, e) {
                    return "rgba(" + parseInt(t[1] + t[1], 16) + "," + parseInt(t[2] + t[2], 16) + "," + parseInt(t[3] + t[3], 16) + "," + e + ")"
                },
                e = "#222",
                o = "#ccc",
                s = {
                    monospace: "monospace",
                    sansSerif: "sans-serif",
                    serif: "serif",
                    monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
                    monospaceSerif: '"Courier New", monospace',
                    proportionalSansSerif: "sans-serif",
                    proportionalSerif: "serif",
                    casual: '"Comic Sans MS", Impact, fantasy',
                    script: '"Monotype Corsiva", cursive',
                    smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
                },
                n = function (t, e, o) {
                    try {
                        t.style[e] = o
                    } catch (s) {}
                };
            vjs.TextTrackDisplay.prototype.updateDisplay = function () {
                var t, e = this.player_.textTracks(),
                    o = 0;
                if (this.clearDisplay(), e)
                    for (; o < e.length; o++) t = e[o], "showing" === t.mode && this.updateForTrack(t)
            }, vjs.TextTrackDisplay.prototype.updateForTrack = function (r) {
                if ("function" == typeof window.WebVTT && r.activeCues) {
                    for (var i, a, l = 0, c = this.player_.textTrackSettings.getValues(), u = []; l < r.activeCues.length; l++) u.push(r.activeCues[l]);
                    for (window.WebVTT.processCues(window, r.activeCues, this.el_), l = u.length; l--;) i = u[l].displayState, c.color && (i.firstChild.style.color = c.color), c.textOpacity && n(i.firstChild, "color", t(c.color || "#fff", c.textOpacity)), c.backgroundColor && (i.firstChild.style.backgroundColor = c.backgroundColor), c.backgroundOpacity && n(i.firstChild, "backgroundColor", t(c.backgroundColor || "#000", c.backgroundOpacity)), c.windowColor && (c.windowOpacity ? n(i, "backgroundColor", t(c.windowColor, c.windowOpacity)) : i.style.backgroundColor = c.windowColor), c.edgeStyle && ("dropshadow" === c.edgeStyle ? i.firstChild.style.textShadow = "2px 2px 3px " + e + ", 2px 2px 4px " + e + ", 2px 2px 5px " + e : "raised" === c.edgeStyle ? i.firstChild.style.textShadow = "1px 1px " + e + ", 2px 2px " + e + ", 3px 3px " + e : "depressed" === c.edgeStyle ? i.firstChild.style.textShadow = "1px 1px " + o + ", 0 1px " + o + ", -1px -1px " + e + ", 0 -1px " + e : "uniform" === c.edgeStyle && (i.firstChild.style.textShadow = "0 0 4px " + e + ", 0 0 4px " + e + ", 0 0 4px " + e + ", 0 0 4px " + e)), c.fontPercent && 1 !== c.fontPercent && (a = window.parseFloat(i.style.fontSize), i.style.fontSize = a * c.fontPercent + "px", i.style.height = "auto", i.style.top = "auto", i.style.bottom = "2px"), c.fontFamily && "default" !== c.fontFamily && ("small-caps" === c.fontFamily ? i.firstChild.style.fontVariant = "small-caps" : i.firstChild.style.fontFamily = s[c.fontFamily])
                }
            }, vjs.TextTrackMenuItem = vjs.MenuItem.extend({
                init: function (t, e) {
                    var o, s, n = this.track = e.track,
                        r = t.textTracks();
                    r && (o = vjs.bind(this, function () {
                        var t, e, o, s = "showing" === this.track.mode;
                        if (this instanceof vjs.OffTextTrackMenuItem)
                            for (s = !0, e = 0, o = r.length; o > e; e++)
                                if (t = r[e], t.kind === this.track.kind && "showing" === t.mode) {
                                    s = !1;
                                    break
                                }
                        this.selected(s)
                    }), r.addEventListener("change", o), t.on("dispose", function () {
                        r.removeEventListener("change", o)
                    })), e.label = n.label || n.language || "Unknown", e.selected = n["default"] || "showing" === n.mode, vjs.MenuItem.call(this, t, e), r && void 0 === r.onchange && this.on(["tap", "click"], function () {
                        if ("object" != typeof window.Event) try {
                            s = new window.Event("change")
                        } catch (t) {}
                        s || (s = document.createEvent("Event"), s.initEvent("change", !0, !0)), r.dispatchEvent(s)
                    })
                }
            }), vjs.TextTrackMenuItem.prototype.onClick = function () {
                var t, e = this.track.kind,
                    o = this.player_.textTracks(),
                    s = 0;
                if (vjs.MenuItem.prototype.onClick.call(this), o)
                    for (; s < o.length; s++) t = o[s], t.kind === e && (t.mode = t === this.track ? "showing" : "disabled")
            }, vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
                init: function (t, e) {
                    e.track = {
                        kind: e.kind,
                        player: t,
                        label: e.kind + " off",
                        "default": !1,
                        mode: "disabled"
                    }, vjs.TextTrackMenuItem.call(this, t, e), this.selected(!0)
                }
            }), vjs.CaptionSettingsMenuItem = vjs.TextTrackMenuItem.extend({
                init: function (t, e) {
                    e.track = {
                        kind: e.kind,
                        player: t,
                        label: e.kind + " settings",
                        "default": !1,
                        mode: "disabled"
                    }, vjs.TextTrackMenuItem.call(this, t, e), this.addClass("vjs-texttrack-settings")
                }
            }), vjs.CaptionSettingsMenuItem.prototype.onClick = function () {
                this.player().getChild("textTrackSettings").show()
            }, vjs.TextTrackButton = vjs.MenuButton.extend({
                init: function (t, e) {
                    var o, s;
                    vjs.MenuButton.call(this, t, e), o = this.player_.textTracks(), this.items.length <= 1 && this.hide(), o && (s = vjs.bind(this, this.update), o.addEventListener("removetrack", s), o.addEventListener("addtrack", s), this.player_.on("dispose", function () {
                        o.removeEventListener("removetrack", s), o.removeEventListener("addtrack", s)
                    }))
                }
            }), vjs.TextTrackButton.prototype.createItems = function () {
                var t, e, o = [];
                if (!(this instanceof vjs.CaptionsButton) || this.player().tech && this.player().tech.featuresNativeTextTracks || o.push(new vjs.CaptionSettingsMenuItem(this.player_, {
                        kind: this.kind_
                    })), o.push(new vjs.OffTextTrackMenuItem(this.player_, {
                        kind: this.kind_
                    })), e = this.player_.textTracks(), !e) return o;
                for (var s = 0; s < e.length; s++) t = e[s], t.kind === this.kind_ && o.push(new vjs.TextTrackMenuItem(this.player_, {
                    track: t
                }));
                return o
            }, vjs.CaptionsButton = vjs.TextTrackButton.extend({
                init: function (t, e, o) {
                    vjs.TextTrackButton.call(this, t, e, o), this.el_.setAttribute("aria-label", "Captions Menu")
                }
            }), vjs.CaptionsButton.prototype.kind_ = "captions", vjs.CaptionsButton.prototype.buttonText = "Captions", vjs.CaptionsButton.prototype.className = "vjs-captions-button", vjs.CaptionsButton.prototype.update = function () {
                var t = 2;
                vjs.TextTrackButton.prototype.update.call(this), this.player().tech && this.player().tech.featuresNativeTextTracks && (t = 1), this.items && this.items.length > t ? this.show() : this.hide()
            }, vjs.SubtitlesButton = vjs.TextTrackButton.extend({
                init: function (t, e, o) {
                    vjs.TextTrackButton.call(this, t, e, o), this.el_.setAttribute("aria-label", "Subtitles Menu")
                }
            }), vjs.SubtitlesButton.prototype.kind_ = "subtitles", vjs.SubtitlesButton.prototype.buttonText = "Subtitles", vjs.SubtitlesButton.prototype.className = "vjs-subtitles-button", vjs.ChaptersButton = vjs.TextTrackButton.extend({
                init: function (t, e, o) {
                    vjs.TextTrackButton.call(this, t, e, o), this.el_.setAttribute("aria-label", "Chapters Menu")
                }
            }), vjs.ChaptersButton.prototype.kind_ = "chapters", vjs.ChaptersButton.prototype.buttonText = "Chapters", vjs.ChaptersButton.prototype.className = "vjs-chapters-button", vjs.ChaptersButton.prototype.createItems = function () {
                var t, e, o = [];
                if (e = this.player_.textTracks(), !e) return o;
                for (var s = 0; s < e.length; s++) t = e[s], t.kind === this.kind_ && o.push(new vjs.TextTrackMenuItem(this.player_, {
                    track: t
                }));
                return o
            }, vjs.ChaptersButton.prototype.createMenu = function () {
                for (var t, e, o = this.player_.textTracks() || [], s = 0, n = o.length, r = this.items = []; n > s; s++)
                    if (t = o[s], t.kind == this.kind_) {
                        if (t.cues) {
                            e = t;
                            break
                        }
                        t.mode = "hidden", window.setTimeout(vjs.bind(this, function () {
                            this.createMenu()
                        }), 100)
                    }
                var i = this.menu;
                if (void 0 === i && (i = new vjs.Menu(this.player_), i.contentEl().appendChild(vjs.createEl("li", {
                        className: "vjs-menu-title",
                        innerHTML: vjs.capitalize(this.kind_),
                        tabindex: -1
                    }))), e) {
                    var a, l, c = e.cues;
                    for (s = 0, n = c.length; n > s; s++) a = c[s], l = new vjs.ChaptersTrackMenuItem(this.player_, {
                        track: e,
                        cue: a
                    }), r.push(l), i.addChild(l);
                    this.addChild(i)
                }
                return this.items.length > 0 && this.show(), i
            }, vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({
                init: function (t, e) {
                    var o = this.track = e.track,
                        s = this.cue = e.cue,
                        n = t.currentTime();
                    e.label = s.text, e.selected = s.startTime <= n && n < s.endTime, vjs.MenuItem.call(this, t, e), o.addEventListener("cuechange", vjs.bind(this, this.update))
                }
            }), vjs.ChaptersTrackMenuItem.prototype.onClick = function () {
                vjs.MenuItem.prototype.onClick.call(this), this.player_.currentTime(this.cue.startTime), this.update(this.cue.startTime)
            }, vjs.ChaptersTrackMenuItem.prototype.update = function () {
                var t = this.cue,
                    e = this.player_.currentTime();
                this.selected(t.startTime <= e && e < t.endTime)
            }
        }(), function () {
            "use strict";

            function t(t) {
                var e;
                return t.selectedOptions ? e = t.selectedOptions[0] : t.options && (e = t.options[t.options.selectedIndex]), e.value
            }

            function e(t, e) {
                var o, s;
                if (e) {
                    for (o = 0; o < t.options.length && (s = t.options[o], s.value !== e); o++);
                    t.selectedIndex = o
                }
            }

            function o() {
                return '<div class="vjs-tracksettings"><div class="vjs-tracksettings-colors"><div class="vjs-fg-color vjs-tracksetting"><label class="vjs-label">Foreground</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-text-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Opaque</option></select></span></div><div class="vjs-bg-color vjs-tracksetting"><label class="vjs-label">Background</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-bg-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div><div class="window-color vjs-tracksetting"><label class="vjs-label">Window</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-window-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div></div><div class="vjs-tracksettings-font"><div class="vjs-font-percent vjs-tracksetting"><label class="vjs-label">Font Size</label><select><option value="0.50">50%</option><option value="0.75">75%</option><option value="1.00" selected>100%</option><option value="1.25">125%</option><option value="1.50">150%</option><option value="1.75">175%</option><option value="2.00">200%</option><option value="3.00">300%</option><option value="4.00">400%</option></select></div><div class="vjs-edge-style vjs-tracksetting"><label class="vjs-label">Text Edge Style</label><select><option value="none">None</option><option value="raised">Raised</option><option value="depressed">Depressed</option><option value="uniform">Uniform</option><option value="dropshadow">Dropshadow</option></select></div><div class="vjs-font-family vjs-tracksetting"><label class="vjs-label">Font Family</label><select><option value="">Default</option><option value="monospaceSerif">Monospace Serif</option><option value="proportionalSerif">Proportional Serif</option><option value="monospaceSansSerif">Monospace Sans-Serif</option><option value="proportionalSansSerif">Proportional Sans-Serif</option><option value="casual">Casual</option><option value="script">Script</option><option value="small-caps">Small Caps</option></select></div></div></div><div class="vjs-tracksettings-controls"><button class="vjs-default-button">Defaults</button><button class="vjs-done-button">Done</button></div>'
            }
            vjs.TextTrackSettings = vjs.Component.extend({
                init: function (t, e) {
                    vjs.Component.call(this, t, e), this.hide(), vjs.on(this.el().querySelector(".vjs-done-button"), "click", vjs.bind(this, function () {
                        this.saveSettings(), this.hide()
                    })), vjs.on(this.el().querySelector(".vjs-default-button"), "click", vjs.bind(this, function () {
                        this.el().querySelector(".vjs-fg-color > select").selectedIndex = 0, this.el().querySelector(".vjs-bg-color > select").selectedIndex = 0, this.el().querySelector(".window-color > select").selectedIndex = 0, this.el().querySelector(".vjs-text-opacity > select").selectedIndex = 0, this.el().querySelector(".vjs-bg-opacity > select").selectedIndex = 0, this.el().querySelector(".vjs-window-opacity > select").selectedIndex = 0, this.el().querySelector(".vjs-edge-style select").selectedIndex = 0, this.el().querySelector(".vjs-font-family select").selectedIndex = 0, this.el().querySelector(".vjs-font-percent select").selectedIndex = 2, this.updateDisplay()
                    })), vjs.on(this.el().querySelector(".vjs-fg-color > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-bg-color > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".window-color > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-text-opacity > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-bg-opacity > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-window-opacity > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-font-percent select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-edge-style select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-font-family select"), "change", vjs.bind(this, this.updateDisplay)), t.options().persistTextTrackSettings && this.restoreSettings()
                }
            }), vjs.TextTrackSettings.prototype.createEl = function () {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-caption-settings vjs-modal-overlay",
                    innerHTML: o()
                })
            }, vjs.TextTrackSettings.prototype.getValues = function () {
                var e, o, s, n, r, i, a, l, c, u, p, h;
                e = this.el(), r = t(e.querySelector(".vjs-edge-style select")), i = t(e.querySelector(".vjs-font-family select")), a = t(e.querySelector(".vjs-fg-color > select")), s = t(e.querySelector(".vjs-text-opacity > select")), l = t(e.querySelector(".vjs-bg-color > select")), o = t(e.querySelector(".vjs-bg-opacity > select")), c = t(e.querySelector(".window-color > select")), n = t(e.querySelector(".vjs-window-opacity > select")), h = window.parseFloat(t(e.querySelector(".vjs-font-percent > select"))), u = {
                    backgroundOpacity: o,
                    textOpacity: s,
                    windowOpacity: n,
                    edgeStyle: r,
                    fontFamily: i,
                    color: a,
                    backgroundColor: l,
                    windowColor: c,
                    fontPercent: h
                };
                for (p in u)("" === u[p] || "none" === u[p] || "fontPercent" === p && 1 === u[p]) && delete u[p];
                return u
            }, vjs.TextTrackSettings.prototype.setValues = function (t) {
                var o, s = this.el();
                e(s.querySelector(".vjs-edge-style select"), t.edgeStyle), e(s.querySelector(".vjs-font-family select"), t.fontFamily), e(s.querySelector(".vjs-fg-color > select"), t.color), e(s.querySelector(".vjs-text-opacity > select"), t.textOpacity), e(s.querySelector(".vjs-bg-color > select"), t.backgroundColor), e(s.querySelector(".vjs-bg-opacity > select"), t.backgroundOpacity), e(s.querySelector(".window-color > select"), t.windowColor), e(s.querySelector(".vjs-window-opacity > select"), t.windowOpacity), o = t.fontPercent, o && (o = o.toFixed(2)), e(s.querySelector(".vjs-font-percent > select"), o)
            }, vjs.TextTrackSettings.prototype.restoreSettings = function () {
                var t;
                try {
                    t = JSON.parse(window.localStorage.getItem("vjs-text-track-settings"))
                } catch (e) {}
                t && this.setValues(t)
            }, vjs.TextTrackSettings.prototype.saveSettings = function () {
                var t;
                if (this.player_.options().persistTextTrackSettings) {
                    t = this.getValues();
                    try {
                        vjs.isEmpty(t) ? window.localStorage.removeItem("vjs-text-track-settings") : window.localStorage.setItem("vjs-text-track-settings", JSON.stringify(t))
                    } catch (e) {}
                }
            }, vjs.TextTrackSettings.prototype.updateDisplay = function () {
                var t = this.player_.getChild("textTrackDisplay");
                t && t.updateDisplay()
            }
        }(), vjs.JSON, "undefined" != typeof window.JSON && "function" == typeof window.JSON.parse) vjs.JSON = window.JSON;
    else {
        vjs.JSON = {};
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        vjs.JSON.parse = function (text, reviver) {
            function walk(t, e) {
                var o, s, n = t[e];
                if (n && "object" == typeof n)
                    for (o in n) Object.prototype.hasOwnProperty.call(n, o) && (s = walk(n, o), void 0 !== s ? n[o] = s : delete n[o]);
                return reviver.call(t, e, n)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (t) {
                    return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
        }
    }
    vjs.autoSetup = function () {
            var t, e, o, s, n, r = document.getElementsByTagName("video"),
                i = document.getElementsByTagName("audio"),
                a = [];
            if (r && r.length > 0)
                for (s = 0, n = r.length; n > s; s++) a.push(r[s]);
            if (i && i.length > 0)
                for (s = 0, n = i.length; n > s; s++) a.push(i[s]);
            if (a && a.length > 0)
                for (s = 0, n = a.length; n > s; s++) {
                    if (e = a[s], !e || !e.getAttribute) {
                        vjs.autoSetupTimeout(1);
                        break
                    }
                    void 0 === e.player && (t = e.getAttribute("data-setup"), null !== t && (o = videojs(e)))
                } else vjs.windowLoaded || vjs.autoSetupTimeout(1)
        }, vjs.autoSetupTimeout = function (t) {
            setTimeout(vjs.autoSetup, t)
        }, "complete" === document.readyState ? vjs.windowLoaded = !0 : vjs.one(window, "load", function () {
            vjs.windowLoaded = !0
        }), vjs.autoSetupTimeout(1), vjs.plugin = function (t, e) {
            vjs.Player.prototype[t] = e
        },
        function (t) {
            var e = t.vttjs = {},
                o = e.VTTCue,
                s = e.VTTRegion,
                n = t.VTTCue,
                r = t.VTTRegion;
            e.shim = function () {
                e.VTTCue = o, e.VTTRegion = s
            }, e.restore = function () {
                e.VTTCue = n, e.VTTRegion = r
            }
        }(this),
        function (t, e) {
            function o(t) {
                if ("string" != typeof t) return !1;
                var e = a[t.toLowerCase()];
                return e ? t.toLowerCase() : !1
            }

            function s(t) {
                if ("string" != typeof t) return !1;
                var e = l[t.toLowerCase()];
                return e ? t.toLowerCase() : !1
            }

            function n(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var o = arguments[e];
                    for (var s in o) t[s] = o[s]
                }
                return t
            }

            function r(t, e, r) {
                var a = this,
                    l = /MSIE\s8\.0/.test(navigator.userAgent),
                    c = {};
                l ? a = document.createElement("custom") : c.enumerable = !0, a.hasBeenReset = !1;
                var u = "",
                    p = !1,
                    h = t,
                    v = e,
                    d = r,
                    f = null,
                    y = "",
                    m = !0,
                    j = "auto",
                    g = "start",
                    T = 50,
                    b = "middle",
                    k = 50,
                    C = "middle";
                return Object.defineProperty(a, "id", n({}, c, {
                    get: function () {
                        return u
                    },
                    set: function (t) {
                        u = "" + t
                    }
                })), Object.defineProperty(a, "pauseOnExit", n({}, c, {
                    get: function () {
                        return p
                    },
                    set: function (t) {
                        p = !!t
                    }
                })), Object.defineProperty(a, "startTime", n({}, c, {
                    get: function () {
                        return h
                    },
                    set: function (t) {
                        if ("number" != typeof t) throw new TypeError("Start time must be set to a number.");
                        h = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "endTime", n({}, c, {
                    get: function () {
                        return v
                    },
                    set: function (t) {
                        if ("number" != typeof t) throw new TypeError("End time must be set to a number.");
                        v = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "text", n({}, c, {
                    get: function () {
                        return d
                    },
                    set: function (t) {
                        d = "" + t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "region", n({}, c, {
                    get: function () {
                        return f
                    },
                    set: function (t) {
                        f = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "vertical", n({}, c, {
                    get: function () {
                        return y
                    },
                    set: function (t) {
                        var e = o(t);
                        if (e === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                        y = e, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "snapToLines", n({}, c, {
                    get: function () {
                        return m
                    },
                    set: function (t) {
                        m = !!t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "line", n({}, c, {
                    get: function () {
                        return j
                    },
                    set: function (t) {
                        if ("number" != typeof t && t !== i) throw new SyntaxError("An invalid number or illegal string was specified.");
                        j = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "lineAlign", n({}, c, {
                    get: function () {
                        return g
                    },
                    set: function (t) {
                        var e = s(t);
                        if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                        g = e, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "position", n({}, c, {
                    get: function () {
                        return T
                    },
                    set: function (t) {
                        if (0 > t || t > 100) throw new Error("Position must be between 0 and 100.");
                        T = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "positionAlign", n({}, c, {
                    get: function () {
                        return b
                    },
                    set: function (t) {
                        var e = s(t);
                        if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                        b = e, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "size", n({}, c, {
                    get: function () {
                        return k
                    },
                    set: function (t) {
                        if (0 > t || t > 100) throw new Error("Size must be between 0 and 100.");
                        k = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "align", n({}, c, {
                    get: function () {
                        return C
                    },
                    set: function (t) {
                        var e = s(t);
                        if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                        C = e, this.hasBeenReset = !0
                    }
                })), a.displayState = void 0, l ? a : void 0
            }
            var i = "auto",
                a = {
                    "": !0,
                    lr: !0,
                    rl: !0
                },
                l = {
                    start: !0,
                    middle: !0,
                    end: !0,
                    left: !0,
                    right: !0
                };
            r.prototype.getCueAsHTML = function () {
                return WebVTT.convertCueToDOMTree(window, this.text)
            }, t.VTTCue = t.VTTCue || r, e.VTTCue = r
        }(this, this.vttjs || {}),
        function (t, e) {
            function o(t) {
                if ("string" != typeof t) return !1;
                var e = r[t.toLowerCase()];
                return e ? t.toLowerCase() : !1
            }

            function s(t) {
                return "number" == typeof t && t >= 0 && 100 >= t
            }

            function n() {
                var t = 100,
                    e = 3,
                    n = 0,
                    r = 100,
                    i = 0,
                    a = 100,
                    l = "";
                Object.defineProperties(this, {
                    width: {
                        enumerable: !0,
                        get: function () {
                            return t
                        },
                        set: function (e) {
                            if (!s(e)) throw new Error("Width must be between 0 and 100.");
                            t = e
                        }
                    },
                    lines: {
                        enumerable: !0,
                        get: function () {
                            return e
                        },
                        set: function (t) {
                            if ("number" != typeof t) throw new TypeError("Lines must be set to a number.");
                            e = t
                        }
                    },
                    regionAnchorY: {
                        enumerable: !0,
                        get: function () {
                            return r
                        },
                        set: function (t) {
                            if (!s(t)) throw new Error("RegionAnchorX must be between 0 and 100.");
                            r = t
                        }
                    },
                    regionAnchorX: {
                        enumerable: !0,
                        get: function () {
                            return n
                        },
                        set: function (t) {
                            if (!s(t)) throw new Error("RegionAnchorY must be between 0 and 100.");
                            n = t
                        }
                    },
                    viewportAnchorY: {
                        enumerable: !0,
                        get: function () {
                            return a
                        },
                        set: function (t) {
                            if (!s(t)) throw new Error("ViewportAnchorY must be between 0 and 100.");
                            a = t
                        }
                    },
                    viewportAnchorX: {
                        enumerable: !0,
                        get: function () {
                            return i
                        },
                        set: function (t) {
                            if (!s(t)) throw new Error("ViewportAnchorX must be between 0 and 100.");
                            i = t
                        }
                    },
                    scroll: {
                        enumerable: !0,
                        get: function () {
                            return l
                        },
                        set: function (t) {
                            var e = o(t);
                            if (e === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                            l = e
                        }
                    }
                })
            }
            var r = {
                "": !0,
                up: !0
            };
            t.VTTRegion = t.VTTRegion || n, e.VTTRegion = n
        }(this, this.vttjs || {}),
        function (t) {
            function e(t, e) {
                this.name = "ParsingError", this.code = t.code, this.message = e || t.message
            }

            function o(t) {
                function e(t, e, o, s) {
                    return 3600 * (0 | t) + 60 * (0 | e) + (0 | o) + (0 | s) / 1e3
                }
                var o = t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
                return o ? o[3] ? e(o[1], o[2], o[3].replace(":", ""), o[4]) : o[1] > 59 ? e(o[1], o[2], 0, o[4]) : e(0, o[1], o[2], o[4]) : null
            }

            function s() {
                this.values = d(null)
            }

            function n(t, e, o, s) {
                var n = s ? t.split(s) : [t];
                for (var r in n)
                    if ("string" == typeof n[r]) {
                        var i = n[r].split(o);
                        if (2 === i.length) {
                            var a = i[0],
                                l = i[1];
                            e(a, l)
                        }
                    }
            }

            function r(t, r, i) {
                function a() {
                    var s = o(t);
                    if (null === s) throw new e(e.Errors.BadTimeStamp, "Malformed timestamp: " + u);
                    return t = t.replace(/^[^\sa-zA-Z-]+/, ""), s
                }

                function l(t, e) {
                    var o = new s;
                    n(t, function (t, e) {
                        switch (t) {
                        case "region":
                            for (var s = i.length - 1; s >= 0; s--)
                                if (i[s].id === e) {
                                    o.set(t, i[s].region);
                                    break
                                }
                            break;
                        case "vertical":
                            o.alt(t, e, ["rl", "lr"]);
                            break;
                        case "line":
                            var n = e.split(","),
                                r = n[0];
                            o.integer(t, r), o.percent(t, r) ? o.set("snapToLines", !1) : null, o.alt(t, r, ["auto"]), 2 === n.length && o.alt("lineAlign", n[1], ["start", "middle", "end"]);
                            break;
                        case "position":
                            n = e.split(","), o.percent(t, n[0]), 2 === n.length && o.alt("positionAlign", n[1], ["start", "middle", "end"]);
                            break;
                        case "size":
                            o.percent(t, e);
                            break;
                        case "align":
                            o.alt(t, e, ["start", "middle", "end", "left", "right"])
                        }
                    }, /:/, /\s/), e.region = o.get("region", null), e.vertical = o.get("vertical", ""), e.line = o.get("line", "auto"), e.lineAlign = o.get("lineAlign", "start"), e.snapToLines = o.get("snapToLines", !0), e.size = o.get("size", 100), e.align = o.get("align", "middle"), e.position = o.get("position", {
                        start: 0,
                        left: 0,
                        middle: 50,
                        end: 100,
                        right: 100
                    }, e.align), e.positionAlign = o.get("positionAlign", {
                        start: "start",
                        left: "start",
                        middle: "middle",
                        end: "end",
                        right: "end"
                    }, e.align)
                }

                function c() {
                    t = t.replace(/^\s+/, "")
                }
                var u = t;
                if (c(), r.startTime = a(), c(), "-->" !== t.substr(0, 3)) throw new e(e.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " + u);
                t = t.substr(3), c(), r.endTime = a(), c(), l(t, r)
            }

            function i(t, e) {
                function s() {
                    function t(t) {
                        return e = e.substr(t.length), t
                    }
                    if (!e) return null;
                    var o = e.match(/^([^<]*)(<[^>]+>?)?/);
                    return t(o[1] ? o[1] : o[2])
                }

                function n(t) {
                    return f[t]
                }

                function r(t) {
                    for (; d = t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) t = t.replace(d[0], n);
                    return t
                }

                function i(t, e) {
                    return !j[e.localName] || j[e.localName] === t.localName
                }

                function a(e, o) {
                    var s = y[e];
                    if (!s) return null;
                    var n = t.document.createElement(s);
                    n.localName = s;
                    var r = m[e];
                    return r && o && (n[r] = o.trim()), n
                }
                for (var l, c = t.document.createElement("div"), u = c, p = []; null !== (l = s());)
                    if ("<" !== l[0]) u.appendChild(t.document.createTextNode(r(l)));
                    else {
                        if ("/" === l[1]) {
                            p.length && p[p.length - 1] === l.substr(2).replace(">", "") && (p.pop(), u = u.parentNode);
                            continue
                        }
                        var h, v = o(l.substr(1, l.length - 2));
                        if (v) {
                            h = t.document.createProcessingInstruction("timestamp", v), u.appendChild(h);
                            continue
                        }
                        var d = l.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
                        if (!d) continue;
                        if (h = a(d[1], d[3]), !h) continue;
                        if (!i(u, h)) continue;
                        d[2] && (h.className = d[2].substr(1).replace(".", " ")), p.push(d[1]), u.appendChild(h), u = h
                    }
                return c
            }

            function a(t) {
                function e(t, e) {
                    for (var o = e.childNodes.length - 1; o >= 0; o--) t.push(e.childNodes[o])
                }

                function o(t) {
                    if (!t || !t.length) return null;
                    var s = t.pop(),
                        n = s.textContent || s.innerText;
                    if (n) {
                        var r = n.match(/^.*(\n|\r)/);
                        return r ? (t.length = 0, r[0]) : n
                    }
                    return "ruby" === s.tagName ? o(t) : s.childNodes ? (e(t, s), o(t)) : void 0
                }
                var s, n = [],
                    r = "";
                if (!t || !t.childNodes) return "ltr";
                for (e(n, t); r = o(n);)
                    for (var i = 0; i < r.length; i++) {
                        s = r.charCodeAt(i);
                        for (var a = 0; a < g.length; a++)
                            if (g[a] === s) return "rtl"
                    }
                return "ltr"
            }

            function l(t) {
                if ("number" == typeof t.line && (t.snapToLines || t.line >= 0 && t.line <= 100)) return t.line;
                if (!t.track || !t.track.textTrackList || !t.track.textTrackList.mediaElement) return -1;
                for (var e = t.track, o = e.textTrackList, s = 0, n = 0; n < o.length && o[n] !== e; n++) "showing" === o[n].mode && s++;
                return -1 * ++s
            }

            function c() {}

            function u(t, e, o) {
                var s = /MSIE\s8\.0/.test(navigator.userAgent),
                    n = "rgba(255, 255, 255, 1)",
                    r = "rgba(0, 0, 0, 0.8)";
                s && (n = "rgb(255, 255, 255)", r = "rgb(0, 0, 0)"), c.call(this), this.cue = e, this.cueDiv = i(t, e.text);
                var l = {
                    color: n,
                    backgroundColor: r,
                    position: "relative",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: "inline"
                };
                s || (l.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl", l.unicodeBidi = "plaintext"), this.applyStyles(l, this.cueDiv), this.div = t.document.createElement("div"), l = {
                    textAlign: "middle" === e.align ? "center" : e.align,
                    font: o.font,
                    whiteSpace: "pre-line",
                    position: "absolute"
                }, s || (l.direction = a(this.cueDiv), l.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext"), this.applyStyles(l), this.div.appendChild(this.cueDiv);
                var u = 0;
                switch (e.positionAlign) {
                case "start":
                    u = e.position;
                    break;
                case "middle":
                    u = e.position - e.size / 2;
                    break;
                case "end":
                    u = e.position - e.size
                }
                this.applyStyles("" === e.vertical ? {
                    left: this.formatStyle(u, "%"),
                    width: this.formatStyle(e.size, "%")
                } : {
                    top: this.formatStyle(u, "%"),
                    height: this.formatStyle(e.size, "%")
                }), this.move = function (t) {
                    this.applyStyles({
                        top: this.formatStyle(t.top, "px"),
                        bottom: this.formatStyle(t.bottom, "px"),
                        left: this.formatStyle(t.left, "px"),
                        right: this.formatStyle(t.right, "px"),
                        height: this.formatStyle(t.height, "px"),
                        width: this.formatStyle(t.width, "px")
                    })
                }
            }

            function p(t) {
                var e, o, s, n, r = /MSIE\s8\.0/.test(navigator.userAgent);
                if (t.div) {
                    o = t.div.offsetHeight, s = t.div.offsetWidth, n = t.div.offsetTop;
                    var i = (i = t.div.childNodes) && (i = i[0]) && i.getClientRects && i.getClientRects();
                    t = t.div.getBoundingClientRect(), e = i ? Math.max(i[0] && i[0].height || 0, t.height / i.length) : 0
                }
                this.left = t.left, this.right = t.right, this.top = t.top || n, this.height = t.height || o, this.bottom = t.bottom || n + (t.height || o), this.width = t.width || s, this.lineHeight = void 0 !== e ? e : t.lineHeight, r && !this.lineHeight && (this.lineHeight = 13)
            }

            function h(t, e, o, s) {
                function n(t, e) {
                    for (var n, r = new p(t), i = 1, a = 0; a < e.length; a++) {
                        for (; t.overlapsOppositeAxis(o, e[a]) || t.within(o) && t.overlapsAny(s);) t.move(e[a]);
                        if (t.within(o)) return t;
                        var l = t.intersectPercentage(o);
                        i > l && (n = new p(t), i = l), t = new p(r)
                    }
                    return n || r
                }
                var r = new p(e),
                    i = e.cue,
                    a = l(i),
                    c = [];
                if (i.snapToLines) {
                    var u;
                    switch (i.vertical) {
                    case "":
                        c = ["+y", "-y"], u = "height";
                        break;
                    case "rl":
                        c = ["+x", "-x"], u = "width";
                        break;
                    case "lr":
                        c = ["-x", "+x"], u = "width"
                    }
                    var h = r.lineHeight,
                        v = h * Math.round(a),
                        d = o[u] + h,
                        f = c[0];
                    Math.abs(v) > d && (v = 0 > v ? -1 : 1, v *= Math.ceil(d / h) * h), 0 > a && (v += "" === i.vertical ? o.height : o.width, c = c.reverse()), r.move(f, v)
                } else {
                    var y = r.lineHeight / o.height * 100;
                    switch (i.lineAlign) {
                    case "middle":
                        a -= y / 2;
                        break;
                    case "end":
                        a -= y
                    }
                    switch (i.vertical) {
                    case "":
                        e.applyStyles({
                            top: e.formatStyle(a, "%")
                        });
                        break;
                    case "rl":
                        e.applyStyles({
                            left: e.formatStyle(a, "%")
                        });
                        break;
                    case "lr":
                        e.applyStyles({
                            right: e.formatStyle(a, "%")
                        })
                    }
                    c = ["+y", "-x", "+x", "-y"], r = new p(e)
                }
                var m = n(r, c);
                e.move(m.toCSSCompatValues(o))
            }

            function v() {}
            var d = Object.create || function () {
                function t() {}
                return function (e) {
                    if (1 !== arguments.length) throw new Error("Object.create shim only accepts one parameter.");
                    return t.prototype = e, new t
                }
            }();
            e.prototype = d(Error.prototype), e.prototype.constructor = e, e.Errors = {
                BadSignature: {
                    code: 0,
                    message: "Malformed WebVTT signature."
                },
                BadTimeStamp: {
                    code: 1,
                    message: "Malformed time stamp."
                }
            }, s.prototype = {
                set: function (t, e) {
                    this.get(t) || "" === e || (this.values[t] = e)
                },
                get: function (t, e, o) {
                    return o ? this.has(t) ? this.values[t] : e[o] : this.has(t) ? this.values[t] : e
                },
                has: function (t) {
                    return t in this.values
                },
                alt: function (t, e, o) {
                    for (var s = 0; s < o.length; ++s)
                        if (e === o[s]) {
                            this.set(t, e);
                            break
                        }
                },
                integer: function (t, e) {
                    /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
                },
                percent: function (t, e) {
                    var o;
                    return (o = e.match(/^([\d]{1,3})(\.[\d]*)?%$/)) && (e = parseFloat(e), e >= 0 && 100 >= e) ? (this.set(t, e), !0) : !1
                }
            };
            var f = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&lrm;": "\u200e",
                    "&rlm;": "\u200f",
                    "&nbsp;": "\xa0"
                },
                y = {
                    c: "span",
                    i: "i",
                    b: "b",
                    u: "u",
                    ruby: "ruby",
                    rt: "rt",
                    v: "span",
                    lang: "span"
                },
                m = {
                    v: "title",
                    lang: "lang"
                },
                j = {
                    rt: "ruby"
                },
                g = [1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1645, 1646, 1647, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1765, 1766, 1774, 1775, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1807, 1808, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1969, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2e3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2036, 2037, 2042, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2074, 2084, 2088, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2142, 2208, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 8207, 64285, 64287, 64288, 64289, 64290, 64291, 64292, 64293, 64294, 64295, 64296, 64298, 64299, 64300, 64301, 64302, 64303, 64304, 64305, 64306, 64307, 64308, 64309, 64310, 64312, 64313, 64314, 64315, 64316, 64318, 64320, 64321, 64323, 64324, 64326, 64327, 64328, 64329, 64330, 64331, 64332, 64333, 64334, 64335, 64336, 64337, 64338, 64339, 64340, 64341, 64342, 64343, 64344, 64345, 64346, 64347, 64348, 64349, 64350, 64351, 64352, 64353, 64354, 64355, 64356, 64357, 64358, 64359, 64360, 64361, 64362, 64363, 64364, 64365, 64366, 64367, 64368, 64369, 64370, 64371, 64372, 64373, 64374, 64375, 64376, 64377, 64378, 64379, 64380, 64381, 64382, 64383, 64384, 64385, 64386, 64387, 64388, 64389, 64390, 64391, 64392, 64393, 64394, 64395, 64396, 64397, 64398, 64399, 64400, 64401, 64402, 64403, 64404, 64405, 64406, 64407, 64408, 64409, 64410, 64411, 64412, 64413, 64414, 64415, 64416, 64417, 64418, 64419, 64420, 64421, 64422, 64423, 64424, 64425, 64426, 64427, 64428, 64429, 64430, 64431, 64432, 64433, 64434, 64435, 64436, 64437, 64438, 64439, 64440, 64441, 64442, 64443, 64444, 64445, 64446, 64447, 64448, 64449, 64467, 64468, 64469, 64470, 64471, 64472, 64473, 64474, 64475, 64476, 64477, 64478, 64479, 64480, 64481, 64482, 64483, 64484, 64485, 64486, 64487, 64488, 64489, 64490, 64491, 64492, 64493, 64494, 64495, 64496, 64497, 64498, 64499, 64500, 64501, 64502, 64503, 64504, 64505, 64506, 64507, 64508, 64509, 64510, 64511, 64512, 64513, 64514, 64515, 64516, 64517, 64518, 64519, 64520, 64521, 64522, 64523, 64524, 64525, 64526, 64527, 64528, 64529, 64530, 64531, 64532, 64533, 64534, 64535, 64536, 64537, 64538, 64539, 64540, 64541, 64542, 64543, 64544, 64545, 64546, 64547, 64548, 64549, 64550, 64551, 64552, 64553, 64554, 64555, 64556, 64557, 64558, 64559, 64560, 64561, 64562, 64563, 64564, 64565, 64566, 64567, 64568, 64569, 64570, 64571, 64572, 64573, 64574, 64575, 64576, 64577, 64578, 64579, 64580, 64581, 64582, 64583, 64584, 64585, 64586, 64587, 64588, 64589, 64590, 64591, 64592, 64593, 64594, 64595, 64596, 64597, 64598, 64599, 64600, 64601, 64602, 64603, 64604, 64605, 64606, 64607, 64608, 64609, 64610, 64611, 64612, 64613, 64614, 64615, 64616, 64617, 64618, 64619, 64620, 64621, 64622, 64623, 64624, 64625, 64626, 64627, 64628, 64629, 64630, 64631, 64632, 64633, 64634, 64635, 64636, 64637, 64638, 64639, 64640, 64641, 64642, 64643, 64644, 64645, 64646, 64647, 64648, 64649, 64650, 64651, 64652, 64653, 64654, 64655, 64656, 64657, 64658, 64659, 64660, 64661, 64662, 64663, 64664, 64665, 64666, 64667, 64668, 64669, 64670, 64671, 64672, 64673, 64674, 64675, 64676, 64677, 64678, 64679, 64680, 64681, 64682, 64683, 64684, 64685, 64686, 64687, 64688, 64689, 64690, 64691, 64692, 64693, 64694, 64695, 64696, 64697, 64698, 64699, 64700, 64701, 64702, 64703, 64704, 64705, 64706, 64707, 64708, 64709, 64710, 64711, 64712, 64713, 64714, 64715, 64716, 64717, 64718, 64719, 64720, 64721, 64722, 64723, 64724, 64725, 64726, 64727, 64728, 64729, 64730, 64731, 64732, 64733, 64734, 64735, 64736, 64737, 64738, 64739, 64740, 64741, 64742, 64743, 64744, 64745, 64746, 64747, 64748, 64749, 64750, 64751, 64752, 64753, 64754, 64755, 64756, 64757, 64758, 64759, 64760, 64761, 64762, 64763, 64764, 64765, 64766, 64767, 64768, 64769, 64770, 64771, 64772, 64773, 64774, 64775, 64776, 64777, 64778, 64779, 64780, 64781, 64782, 64783, 64784, 64785, 64786, 64787, 64788, 64789, 64790, 64791, 64792, 64793, 64794, 64795, 64796, 64797, 64798, 64799, 64800, 64801, 64802, 64803, 64804, 64805, 64806, 64807, 64808, 64809, 64810, 64811, 64812, 64813, 64814, 64815, 64816, 64817, 64818, 64819, 64820, 64821, 64822, 64823, 64824, 64825, 64826, 64827, 64828, 64829, 64848, 64849, 64850, 64851, 64852, 64853, 64854, 64855, 64856, 64857, 64858, 64859, 64860, 64861, 64862, 64863, 64864, 64865, 64866, 64867, 64868, 64869, 64870, 64871, 64872, 64873, 64874, 64875, 64876, 64877, 64878, 64879, 64880, 64881, 64882, 64883, 64884, 64885, 64886, 64887, 64888, 64889, 64890, 64891, 64892, 64893, 64894, 64895, 64896, 64897, 64898, 64899, 64900, 64901, 64902, 64903, 64904, 64905, 64906, 64907, 64908, 64909, 64910, 64911, 64914, 64915, 64916, 64917, 64918, 64919, 64920, 64921, 64922, 64923, 64924, 64925, 64926, 64927, 64928, 64929, 64930, 64931, 64932, 64933, 64934, 64935, 64936, 64937, 64938, 64939, 64940, 64941, 64942, 64943, 64944, 64945, 64946, 64947, 64948, 64949, 64950, 64951, 64952, 64953, 64954, 64955, 64956, 64957, 64958, 64959, 64960, 64961, 64962, 64963, 64964, 64965, 64966, 64967, 65008, 65009, 65010, 65011, 65012, 65013, 65014, 65015, 65016, 65017, 65018, 65019, 65020, 65136, 65137, 65138, 65139, 65140, 65142, 65143, 65144, 65145, 65146, 65147, 65148, 65149, 65150, 65151, 65152, 65153, 65154, 65155, 65156, 65157, 65158, 65159, 65160, 65161, 65162, 65163, 65164, 65165, 65166, 65167, 65168, 65169, 65170, 65171, 65172, 65173, 65174, 65175, 65176, 65177, 65178, 65179, 65180, 65181, 65182, 65183, 65184, 65185, 65186, 65187, 65188, 65189, 65190, 65191, 65192, 65193, 65194, 65195, 65196, 65197, 65198, 65199, 65200, 65201, 65202, 65203, 65204, 65205, 65206, 65207, 65208, 65209, 65210, 65211, 65212, 65213, 65214, 65215, 65216, 65217, 65218, 65219, 65220, 65221, 65222, 65223, 65224, 65225, 65226, 65227, 65228, 65229, 65230, 65231, 65232, 65233, 65234, 65235, 65236, 65237, 65238, 65239, 65240, 65241, 65242, 65243, 65244, 65245, 65246, 65247, 65248, 65249, 65250, 65251, 65252, 65253, 65254, 65255, 65256, 65257, 65258, 65259, 65260, 65261, 65262, 65263, 65264, 65265, 65266, 65267, 65268, 65269, 65270, 65271, 65272, 65273, 65274, 65275, 65276, 67584, 67585, 67586, 67587, 67588, 67589, 67592, 67594, 67595, 67596, 67597, 67598, 67599, 67600, 67601, 67602, 67603, 67604, 67605, 67606, 67607, 67608, 67609, 67610, 67611, 67612, 67613, 67614, 67615, 67616, 67617, 67618, 67619, 67620, 67621, 67622, 67623, 67624, 67625, 67626, 67627, 67628, 67629, 67630, 67631, 67632, 67633, 67634, 67635, 67636, 67637, 67639, 67640, 67644, 67647, 67648, 67649, 67650, 67651, 67652, 67653, 67654, 67655, 67656, 67657, 67658, 67659, 67660, 67661, 67662, 67663, 67664, 67665, 67666, 67667, 67668, 67669, 67671, 67672, 67673, 67674, 67675, 67676, 67677, 67678, 67679, 67840, 67841, 67842, 67843, 67844, 67845, 67846, 67847, 67848, 67849, 67850, 67851, 67852, 67853, 67854, 67855, 67856, 67857, 67858, 67859, 67860, 67861, 67862, 67863, 67864, 67865, 67866, 67867, 67872, 67873, 67874, 67875, 67876, 67877, 67878, 67879, 67880, 67881, 67882, 67883, 67884, 67885, 67886, 67887, 67888, 67889, 67890, 67891, 67892, 67893, 67894, 67895, 67896, 67897, 67903, 67968, 67969, 67970, 67971, 67972, 67973, 67974, 67975, 67976, 67977, 67978, 67979, 67980, 67981, 67982, 67983, 67984, 67985, 67986, 67987, 67988, 67989, 67990, 67991, 67992, 67993, 67994, 67995, 67996, 67997, 67998, 67999, 68e3, 68001, 68002, 68003, 68004, 68005, 68006, 68007, 68008, 68009, 68010, 68011, 68012, 68013, 68014, 68015, 68016, 68017, 68018, 68019, 68020, 68021, 68022, 68023, 68030, 68031, 68096, 68112, 68113, 68114, 68115, 68117, 68118, 68119, 68121, 68122, 68123, 68124, 68125, 68126, 68127, 68128, 68129, 68130, 68131, 68132, 68133, 68134, 68135, 68136, 68137, 68138, 68139, 68140, 68141, 68142, 68143, 68144, 68145, 68146, 68147, 68160, 68161, 68162, 68163, 68164, 68165, 68166, 68167, 68176, 68177, 68178, 68179, 68180, 68181, 68182, 68183, 68184, 68192, 68193, 68194, 68195, 68196, 68197, 68198, 68199, 68200, 68201, 68202, 68203, 68204, 68205, 68206, 68207, 68208, 68209, 68210, 68211, 68212, 68213, 68214, 68215, 68216, 68217, 68218, 68219, 68220, 68221, 68222, 68223, 68352, 68353, 68354, 68355, 68356, 68357, 68358, 68359, 68360, 68361, 68362, 68363, 68364, 68365, 68366, 68367, 68368, 68369, 68370, 68371, 68372, 68373, 68374, 68375, 68376, 68377, 68378, 68379, 68380, 68381, 68382, 68383, 68384, 68385, 68386, 68387, 68388, 68389, 68390, 68391, 68392, 68393, 68394, 68395, 68396, 68397, 68398, 68399, 68400, 68401, 68402, 68403, 68404, 68405, 68416, 68417, 68418, 68419, 68420, 68421, 68422, 68423, 68424, 68425, 68426, 68427, 68428, 68429, 68430, 68431, 68432, 68433, 68434, 68435, 68436, 68437, 68440, 68441, 68442, 68443, 68444, 68445, 68446, 68447, 68448, 68449, 68450, 68451, 68452, 68453, 68454, 68455, 68456, 68457, 68458, 68459, 68460, 68461, 68462, 68463, 68464, 68465, 68466, 68472, 68473, 68474, 68475, 68476, 68477, 68478, 68479, 68608, 68609, 68610, 68611, 68612, 68613, 68614, 68615, 68616, 68617, 68618, 68619, 68620, 68621, 68622, 68623, 68624, 68625, 68626, 68627, 68628, 68629, 68630, 68631, 68632, 68633, 68634, 68635, 68636, 68637, 68638, 68639, 68640, 68641, 68642, 68643, 68644, 68645, 68646, 68647, 68648, 68649, 68650, 68651, 68652, 68653, 68654, 68655, 68656, 68657, 68658, 68659, 68660, 68661, 68662, 68663, 68664, 68665, 68666, 68667, 68668, 68669, 68670, 68671, 68672, 68673, 68674, 68675, 68676, 68677, 68678, 68679, 68680, 126464, 126465, 126466, 126467, 126469, 126470, 126471, 126472, 126473, 126474, 126475, 126476, 126477, 126478, 126479, 126480, 126481, 126482, 126483, 126484, 126485, 126486, 126487, 126488, 126489, 126490, 126491, 126492, 126493, 126494, 126495, 126497, 126498, 126500, 126503, 126505, 126506, 126507, 126508, 126509, 126510, 126511, 126512, 126513, 126514, 126516, 126517, 126518, 126519, 126521, 126523, 126530, 126535, 126537, 126539, 126541, 126542, 126543, 126545, 126546, 126548, 126551, 126553, 126555, 126557, 126559, 126561, 126562, 126564, 126567, 126568, 126569, 126570, 126572, 126573, 126574, 126575, 126576, 126577, 126578, 126580, 126581, 126582, 126583, 126585, 126586, 126587, 126588, 126590, 126592, 126593, 126594, 126595, 126596, 126597, 126598, 126599, 126600, 126601, 126603, 126604, 126605, 126606, 126607, 126608, 126609, 126610, 126611, 126612, 126613, 126614, 126615, 126616, 126617, 126618, 126619, 126625, 126626, 126627, 126629, 126630, 126631, 126632, 126633, 126635, 126636, 126637, 126638, 126639, 126640, 126641, 126642, 126643, 126644, 126645, 126646, 126647, 126648, 126649, 126650, 126651, 1114109];
            c.prototype.applyStyles = function (t, e) {
                e = e || this.div;
                for (var o in t) t.hasOwnProperty(o) && (e.style[o] = t[o])
            }, c.prototype.formatStyle = function (t, e) {
                return 0 === t ? 0 : t + e
            }, u.prototype = d(c.prototype), u.prototype.constructor = u, p.prototype.move = function (t, e) {
                switch (e = void 0 !== e ? e : this.lineHeight, t) {
                case "+x":
                    this.left += e, this.right += e;
                    break;
                case "-x":
                    this.left -= e, this.right -= e;
                    break;
                case "+y":
                    this.top += e, this.bottom += e;
                    break;
                case "-y":
                    this.top -= e, this.bottom -= e
                }
            }, p.prototype.overlaps = function (t) {
                return this.left < t.right && this.right > t.left && this.top < t.bottom && this.bottom > t.top
            }, p.prototype.overlapsAny = function (t) {
                for (var e = 0; e < t.length; e++)
                    if (this.overlaps(t[e])) return !0;
                return !1
            }, p.prototype.within = function (t) {
                return this.top >= t.top && this.bottom <= t.bottom && this.left >= t.left && this.right <= t.right
            }, p.prototype.overlapsOppositeAxis = function (t, e) {
                switch (e) {
                case "+x":
                    return this.left < t.left;
                case "-x":
                    return this.right > t.right;
                case "+y":
                    return this.top < t.top;
                case "-y":
                    return this.bottom > t.bottom
                }
            }, p.prototype.intersectPercentage = function (t) {
                var e = Math.max(0, Math.min(this.right, t.right) - Math.max(this.left, t.left)),
                    o = Math.max(0, Math.min(this.bottom, t.bottom) - Math.max(this.top, t.top)),
                    s = e * o;
                return s / (this.height * this.width)
            }, p.prototype.toCSSCompatValues = function (t) {
                return {
                    top: this.top - t.top,
                    bottom: t.bottom - this.bottom,
                    left: this.left - t.left,
                    right: t.right - this.right,
                    height: this.height,
                    width: this.width
                }
            }, p.getSimpleBoxPosition = function (t) {
                var e = t.div ? t.div.offsetHeight : t.tagName ? t.offsetHeight : 0,
                    o = t.div ? t.div.offsetWidth : t.tagName ? t.offsetWidth : 0,
                    s = t.div ? t.div.offsetTop : t.tagName ? t.offsetTop : 0;
                t = t.div ? t.div.getBoundingClientRect() : t.tagName ? t.getBoundingClientRect() : t;
                var n = {
                    left: t.left,
                    right: t.right,
                    top: t.top || s,
                    height: t.height || e,
                    bottom: t.bottom || s + (t.height || e),
                    width: t.width || o
                };
                return n
            }, v.StringDecoder = function () {
                return {
                    decode: function (t) {
                        if (!t) return "";
                        if ("string" != typeof t) throw new Error("Error - expected string data.");
                        return decodeURIComponent(encodeURIComponent(t))
                    }
                }
            }, v.convertCueToDOMTree = function (t, e) {
                return t && e ? i(t, e) : null
            };
            var T = .05,
                b = "sans-serif",
                k = "1.5%";
            v.processCues = function (t, e, o) {
                function s(t) {
                    for (var e = 0; e < t.length; e++)
                        if (t[e].hasBeenReset || !t[e].displayState) return !0;
                    return !1
                }
                if (!t || !e || !o) return null;
                for (; o.firstChild;) o.removeChild(o.firstChild);
                var n = t.document.createElement("div");
                if (n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0", n.style.margin = k, o.appendChild(n), s(e)) {
                    var r = [],
                        i = p.getSimpleBoxPosition(n),
                        a = Math.round(i.height * T * 100) / 100,
                        l = {
                            font: a + "px " + b
                        };
                    ! function () {
                        for (var o, s, a = 0; a < e.length; a++) s = e[a], o = new u(t, s, l), n.appendChild(o.div), h(t, o, i, r), s.displayState = o.div, r.push(p.getSimpleBoxPosition(o))
                    }()
                } else
                    for (var c = 0; c < e.length; c++) n.appendChild(e[c].displayState)
            }, v.Parser = function (t, e, o) {
                o || (o = e, e = {}), e || (e = {}), this.window = t, this.vttjs = e, this.state = "INITIAL", this.buffer = "", this.decoder = o || new TextDecoder("utf8"), this.regionList = []
            }, v.Parser.prototype = {
                reportOrThrowError: function (t) {
                    if (!(t instanceof e)) throw t;
                    this.onparsingerror && this.onparsingerror(t)
                },
                parse: function (t) {
                    function o() {
                        for (var t = l.buffer, e = 0; e < t.length && "\r" !== t[e] && "\n" !== t[e];) ++e;
                        var o = t.substr(0, e);
                        return "\r" === t[e] && ++e, "\n" === t[e] && ++e, l.buffer = t.substr(e), o
                    }

                    function i(t) {
                        var e = new s;
                        if (n(t, function (t, o) {
                                switch (t) {
                                case "id":
                                    e.set(t, o);
                                    break;
                                case "width":
                                    e.percent(t, o);
                                    break;
                                case "lines":
                                    e.integer(t, o);
                                    break;
                                case "regionanchor":
                                case "viewportanchor":
                                    var n = o.split(",");
                                    if (2 !== n.length) break;
                                    var r = new s;
                                    if (r.percent("x", n[0]), r.percent("y", n[1]), !r.has("x") || !r.has("y")) break;
                                    e.set(t + "X", r.get("x")), e.set(t + "Y", r.get("y"));
                                    break;
                                case "scroll":
                                    e.alt(t, o, ["up"])
                                }
                            }, /=/, /\s/), e.has("id")) {
                            var o = new(l.vttjs.VTTRegion || l.window.VTTRegion);
                            o.width = e.get("width", 100), o.lines = e.get("lines", 3), o.regionAnchorX = e.get("regionanchorX", 0), o.regionAnchorY = e.get("regionanchorY", 100), o.viewportAnchorX = e.get("viewportanchorX", 0), o.viewportAnchorY = e.get("viewportanchorY", 100), o.scroll = e.get("scroll", ""), l.onregion && l.onregion(o), l.regionList.push({
                                id: e.get("id"),
                                region: o
                            })
                        }
                    }

                    function a(t) {
                        n(t, function (t, e) {
                            switch (t) {
                            case "Region":
                                i(e)
                            }
                        }, /:/)
                    }
                    var l = this;
                    t && (l.buffer += l.decoder.decode(t, {
                        stream: !0
                    }));
                    try {
                        var c;
                        if ("INITIAL" === l.state) {
                            if (!/\r\n|\n/.test(l.buffer)) return this;
                            c = o();
                            var u = c.match(/^WEBVTT([ \t].*)?$/);
                            if (!u || !u[0]) throw new e(e.Errors.BadSignature);
                            l.state = "HEADER"
                        }
                        for (var p = !1; l.buffer;) {
                            if (!/\r\n|\n/.test(l.buffer)) return this;
                            switch (p ? p = !1 : c = o(), l.state) {
                            case "HEADER":
                                /:/.test(c) ? a(c) : c || (l.state = "ID");
                                continue;
                            case "NOTE":
                                c || (l.state = "ID");
                                continue;
                            case "ID":
                                if (/^NOTE($|[ \t])/.test(c)) {
                                    l.state = "NOTE";
                                    break
                                }
                                if (!c) continue;
                                if (l.cue = new(l.vttjs.VTTCue || l.window.VTTCue)(0, 0, ""), l.state = "CUE", -1 === c.indexOf("-->")) {
                                    l.cue.id = c;
                                    continue
                                }
                            case "CUE":
                                try {
                                    r(c, l.cue, l.regionList)
                                } catch (h) {
                                    l.reportOrThrowError(h), l.cue = null, l.state = "BADCUE";
                                    continue
                                }
                                l.state = "CUETEXT";
                                continue;
                            case "CUETEXT":
                                var v = -1 !== c.indexOf("-->");
                                if (!c || v && (p = !0)) {
                                    l.oncue && l.oncue(l.cue), l.cue = null, l.state = "ID";
                                    continue
                                }
                                l.cue.text && (l.cue.text += "\n"), l.cue.text += c;
                                continue;
                            case "BADCUE":
                                c || (l.state = "ID");
                                continue
                            }
                        }
                    } catch (h) {
                        l.reportOrThrowError(h), "CUETEXT" === l.state && l.cue && l.oncue && l.oncue(l.cue), l.cue = null, l.state = "INITIAL" === l.state ? "BADWEBVTT" : "BADCUE"
                    }
                    return this
                },
                flush: function () {
                    var t = this;
                    try {
                        if (t.buffer += t.decoder.decode(), (t.cue || "HEADER" === t.state) && (t.buffer += "\n\n", t.parse()), "INITIAL" === t.state) throw new e(e.Errors.BadSignature)
                    } catch (o) {
                        t.reportOrThrowError(o)
                    }
                    return t.onflush && t.onflush(), this
                }
            }, t.WebVTT = v
        }(this, this.vttjs || {})
}), define("balloon-video-player/1.3.0/src/video-js/lang/zh-CN", [], function () {
    videojs.addLanguage("zh-CN", {
        Play: "\u64ad\u653e",
        Pause: "\u6682\u505c",
        "Current Time": "\u5f53\u524d\u65f6\u95f4",
        "Duration Time": "\u65f6\u957f",
        "Remaining Time": "\u5269\u4f59\u65f6\u95f4",
        "Stream Type": "\u5a92\u4f53\u6d41\u7c7b\u578b",
        LIVE: " ",
        Loaded: "\u52a0\u8f7d\u5b8c\u6bd5",
        Progress: "\u8fdb\u5ea6",
        Fullscreen: "\u5168\u5c4f",
        "Non-Fullscreen": "\u9000\u51fa\u5168\u5c4f",
        Mute: "\u9759\u97f3",
        Unmuted: "\u53d6\u6d88\u9759\u97f3",
        "Playback Rate": "\u64ad\u653e\u7801\u7387",
        Subtitles: "\u5b57\u5e55",
        "subtitles off": "\u5b57\u5e55\u5173\u95ed",
        Captions: "\u5185\u5d4c\u5b57\u5e55",
        "captions off": "\u5185\u5d4c\u5b57\u5e55\u5173\u95ed",
        Chapters: "\u8282\u76ee\u6bb5\u843d",
        "You aborted the video playback": "\u89c6\u9891\u64ad\u653e\u88ab\u7ec8\u6b62",
        "A network error caused the video download to fail part-way.": "\u7f51\u7edc\u9519\u8bef\u5bfc\u81f4\u89c6\u9891\u4e0b\u8f7d\u4e2d\u9014\u5931\u8d25\u3002",
        "The video could not be loaded, either because the server or network failed or because the format is not supported.": "\u89c6\u9891\u56e0\u683c\u5f0f\u4e0d\u652f\u6301\u6216\u8005\u670d\u52a1\u5668\u6216\u7f51\u7edc\u7684\u95ee\u9898\u65e0\u6cd5\u52a0\u8f7d\u3002",
        "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.": "\u7531\u4e8e\u89c6\u9891\u6587\u4ef6\u635f\u574f\u6216\u662f\u8be5\u89c6\u9891\u4f7f\u7528\u4e86\u4f60\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u7684\u529f\u80fd\uff0c\u64ad\u653e\u7ec8\u6b62\u3002",
        "No compatible source was found for this video.": "\u65e0\u6cd5\u627e\u5230\u6b64\u89c6\u9891\u517c\u5bb9\u7684\u6e90\u3002",
        "The video is encrypted and we do not have the keys to decrypt it.": "\u89c6\u9891\u5df2\u52a0\u5bc6\uff0c\u65e0\u6cd5\u89e3\u5bc6\u3002",
        SD: "\u6807\u6e05",
        HD: "\u9ad8\u6e05",
        SHD: "\u8d85\u6e05"
    })
}), define("balloon-video-player/1.3.0/src/plugins/fingerprint/fingerprint", [], function () {
    videojs.plugin("fingerprint", function (t) {
        var e = {
                html: "Fingerprint",
                frequency: 3e3,
                duration: 2e3
            },
            o = this,
            s = videojs.util.mergeOptions(e, t),
            n = document.createElement("div");
        n.className = "vjs-fingerprint", n.innerHTML = s.html, n.onselectstart = n.ondrag = function () {
            return !1
        }, o.el().appendChild(n);
        var r = !0,
            i = function () {
                n.style.visibility = "hidden", setTimeout(function () {
                    a()
                }, s.frequency)
            },
            a = function () {
                r && (l(o, n), n.style.visibility = "visible"), setTimeout(function () {
                    i()
                }, s.duration)
            },
            l = function (t, e) {
                var o = parseInt(t.el().offsetWidth * Math.random());
                o + e.offsetWidth > t.el().offsetWidth && (o = t.el().offsetWidth - e.offsetWidth);
                var s = parseInt(t.el().offsetHeight * Math.random());
                s + e.offsetHeight > t.el().offsetHeight && (s = t.el().offsetHeight - e.offsetHeight), e.style.left = o + "px", e.style.top = s + "px"
            };
        o.on("play", function () {
            r = !0
        }), o.on("pause", function () {
            r = !1
        }), o.on("ended", function () {
            r = !1
        }), o.on("fullscreenchange", function () {
            n.style.visibility = "hidden"
        }), o.on("resize", function () {
            n.style.visibility = "hidden"
        }), o.on("seeking", function () {
            r = !1
        }), o.on("seeked", function () {
            r = !0
        }), o.on("error", function () {
            r = !1
        }), o.on("dispose", function () {
            r = !1
        }), i()
    })
}), define("balloon-video-player/1.3.0/src/plugins/quality-selector/video-quality-selector", [], function () {
    ! function (t) {
        var e = {
            res_label: function (t) {
                return /^\d+$/.test(t) ? t + "p" : t
            }
        };
        t.ResolutionMenuItem = t.MenuItem.extend({
            call_count: 0,
            init: function (o, s) {
                s.label = e.res_label(s.res), s.selected = s.res.toString() === o.getCurrentRes().toString(), t.MenuItem.call(this, o, s), this.resolution = s.res, this.on(["click", "tap"], this.onClick), o.on("changeRes", t.bind(this, function () {
                    this.selected(this.resolution == o.getCurrentRes() ? !0 : !1), this.call_count = 0
                }))
            }
        }), t.ResolutionMenuItem.prototype.onClick = function () {
            this.call_count > 0 || (this.player().changeRes(this.resolution), this.call_count++)
        }, t.ResolutionTitleMenuItem = t.MenuItem.extend({
            init: function (e, o) {
                t.MenuItem.call(this, e, o), this.off("click")
            }
        }), t.ResolutionSelector = t.MenuButton.extend({
            init: function (e, o) {
                e.availableRes = o.available_res, t.MenuButton.call(this, e, o), this.el().firstChild.firstChild.innerHTML = o.buttonText
            }
        }), t.ResolutionSelector.prototype.className = "vjs-res-button", t.ResolutionSelector.prototype.createItems = function () {
            var e, o = this.player(),
                s = [];
            for (e in o.availableRes) "length" != e && s.push(new t.ResolutionMenuItem(o, {
                res: e
            }));
            return s.sort(function (t, e) {
                return "undefined" == typeof t.resolution ? -1 : parseInt(e.resolution) - parseInt(t.resolution)
            }), s
        }, t.plugin("resolutionSelector", function (o) {
            for (var s, n, r, i = this, a = i.options().sources, l = a.length, c = t.util.mergeOptions({
                    default_res: "",
                    force_types: !1
                }, o || {}), u = {
                    length: 0
                }, p = c.default_res && "string" == typeof c.default_res ? c.default_res.split(",") : []; l > 0;) l--, a[l]["data-res"] && (n = a[l]["data-res"], "object" != typeof u[n] && (u[n] = [], u.length++), u[n].push(a[l]));
            if (c.force_types)
                for (n in u)
                    if ("length" != n) {
                        for (l = c.force_types.length, found_types = 0; l > 0;)
                            for (l--, s = u[n].length; s > 0;)
                                if (s--, c.force_types[l] === u[n][s].type) {
                                    found_types++;
                                    break
                                }
                        found_types < c.force_types.length && (delete u[n], u.length--)
                    }
            if (!(u.length < 1)) {
                for (l = 0; l < p.length; l++)
                    if (u[p[l]]) {
                        i.src(u[p[l]]), i.currentRes = p[l];
                        break
                    }
                    "function" != typeof i.localize && (i.localize = function (t) {
                    return t
                }), i.getCurrentRes = function () {
                    if ("undefined" != typeof i.currentRes) return i.currentRes;
                    try {
                        return res = i.options().sources[0]["data-res"]
                    } catch (t) {
                        return ""
                    }
                }, i.changeRes = function (e) {
                    var o, s, n = i.el().firstChild,
                        r = i.paused(),
                        a = i.currentTime();
                    if (i.getCurrentRes() != e && i.availableRes && i.availableRes[e]) {
                        if ("none" == n.preload && (n.preload = "metadata"), c.dynamic_source) {
                            var l = c.dynamic_source + "?level=" + e;
                            t.xhr(l, function (t, o, s) {
                                if (!t) {
                                    var n, l = {},
                                        o = JSON.parse(s);
                                    for (n in o) l[o[n].level] = o[n];
                                    for (n in i.availableRes)
                                        if ("length" != n)
                                            for (var c in i.availableRes[n]) l[i.availableRes[n][c]["data-level"]] && (i.availableRes[n][c].src = l[i.availableRes[n][c]["data-level"]].src);
                                    i.src(i.availableRes[e]).one("loadedmetadata", function () {
                                        i.currentTime(a), i.addClass("vjs-has-started"), r || i.play()
                                    })
                                }
                            })
                        } else i.src(i.availableRes[e]).one("loadedmetadata", function () {
                            i.currentTime(a), i.addClass("vjs-has-started"), r || i.play()
                        });
                        if (i.currentRes = e, i.controlBar.resolutionSelector)
                            for (o = i.controlBar.resolutionSelector.el().firstChild.children, s = o.length; s > 0;)
                                if (s--, "vjs-control-text" == o[s].className) {
                                    o[s].innerHTML = i.localize(e);
                                    break
                                }
                        i.trigger("changeRes")
                    }
                }, n = i.getCurrentRes(), n && (n = e.res_label(n)), r = new t.ResolutionSelector(i, {
                    buttonText: i.localize(n || "Quality"),
                    available_res: u
                }), i.controlBar.resolutionSelector = i.controlBar.addChild(r)
            }
        })
    }(videojs)
}), define("balloon-video-player/1.3.0/src/plugins/watermark/watermark", [], function () {
    ! function () {
        var t = {
                file: "Owned_Stamp.png",
                xpos: 0,
                ypos: 0,
                xrepeat: 0,
                opacity: 100
            },
            e = function () {
                var t, o, s, n, r;
                t = Array.prototype.slice.call(arguments), o = t.shift() || {};
                for (s in t) {
                    n = t[s];
                    for (r in n) n.hasOwnProperty(r) && (o[r] = "object" == typeof n[r] ? e(o[r], n[r]) : n[r])
                }
                return o
            };
        videojs.plugin("watermark", function (o) {
            var s, n, r, i;
            s = e(t, o), n = this.el(), r = document.createElement("div"), i = document.createElement("img"), r.appendChild(i), i.className = "vjs-watermark", i.src = o.file, 0 == o.ypos && 0 == o.xpos ? (i.style.top = "0", i.style.left = "0") : 0 == o.ypos && 100 == o.xpos ? (i.style.top = "0", i.style.right = "0") : 100 == o.ypos && 100 == o.xpos ? (i.style.bottom = "0", i.style.right = "0") : 100 == o.ypos && 0 == o.xpos ? (i.style.bottom = "0", i.style.left = "0") : 50 == o.ypos && 50 == o.xpos && (i.style.top = this.height() / 2 + "px", i.style.left = this.width() / 2 + "px"), r.style.opacity = o.opacity, n.appendChild(r)
        })
    }()
}), define("balloon-video-player/1.3.0/src/plugins/marker/marker", [], function () {
    ! function () {
        function t() {
            var t = (new Date).getTime(),
                e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                    var o = (t + 16 * Math.random()) % 16 | 0;
                    return t = Math.floor(t / 16), ("x" == e ? o : 3 & o | 8).toString(16)
                });
            return e
        }

        function e(e) {
            function s() {
                j.sort(function (t, e) {
                    return y.markerTip.time(t) - y.markerTip.time(e)
                })
            }

            function n(e) {
                $.each(e, function (e, o) {
                    o.key = t(), g.find(".vjs-progress-control").append(a(o)), m[o.key] = o, j.push(o)
                }), s()
            }

            function r(t) {
                return y.markerTip.time(t) / b.duration() * 100
            }

            function i(t) {
                return y.markerEscape = t
            }

            function a(t) {
                var e = $("<div class='vjs-marker'></div>");
                return e.css(y.markerStyle).css({
                    left: r(t) + "%"
                }).attr("data-marker-key", t.key).attr("data-marker-time", y.markerTip.time(t)), void 0 != t.finished && 1 == t.finished && e.addClass("bg-primary"), e.on("click", function () {
                    var e = !1;
                    if ("function" == typeof y.onMarkerClick && (e = 0 == y.onMarkerClick(t)), !e) {
                        var o = $(this).data("marker-key");
                        b.currentTime(y.markerTip.time(m[o]))
                    }
                }), y.markerTip.display && u(e), e
            }

            function l() {
                for (var t = 0; t < j.length; t++) {
                    var e = j[t],
                        o = g.find(".vjs-marker[data-marker-key='" + e.key + "']"),
                        n = y.markerTip.time(e);
                    o.data("marker-time") != n && (o.css({
                        left: r(e) + "%"
                    }).attr("data-marker-time", n), void 0 != e.finished && 1 == e.finished && o.addClass("bg-primary"))
                }
                s()
            }

            function c(t) {
                C && (_ = -1, C.css("visibility", "hidden")), T = -1;
                for (var e = 0; e < t.length; e++) {
                    var o = t[e],
                        n = j[o];
                    n && (delete m[n.key], j[o] = null, g.find(".vjs-marker[data-marker-key='" + n.key + "']").remove())
                }
                for (var e = j.length - 1; e >= 0; e--) null === j[e] && j.splice(e, 1);
                s()
            }

            function u(t) {
                t.on("mouseover", function () {
                    var t = m[$(this).data("marker-key")];
                    k.find(".vjs-tip-inner").text(y.markerTip.text(t)), k.css({
                        left: r(t) + "%",
                        "margin-left": -parseFloat(k.css("width")) / 2 - 1 + "px",
                        visibility: "visible"
                    })
                }).on("mouseout", function () {
                    k.css("visibility", "hidden")
                })
            }

            function p() {
                k = $("<div class='vjs-tip'><div class='vjs-tip-arrow'></div><div class='vjs-tip-inner'></div></div>"), g.find(".vjs-progress-control").append(k)
            }

            function h(t) {
                if (!(0 > T)) {
                    var e = j[T],
                        o = y.markerTip.time(e);
                    (void 0 == e.finished || 1 != e.finished) && (t >= o && t <= o + y.breakOverlay.displayTime ? (_ != T && (_ = T, C.find(".vjs-break-overlay-text").text(y.breakOverlay.text(e))), C.css("visibility", "visible")) : (_ = -1, C.css("visibility", "hidden")))
                }
            }

            function v() {
                C = $("<div class='vjs-break-overlay'><div class='vjs-break-overlay-text'></div></div>").css(y.breakOverlay.style), g.append(C), _ = -1
            }

            function d() {
                var t, o = function (t) {
                        return t < j.length - 1 ? y.markerTip.time(j[t + 1]) : b.duration()
                    },
                    s = function () {
                        for (var t = 0; t < j.length; t++) {
                            var e = j[t];
                            if (void 0 == e.finished || 0 == e.finished) return e.time
                        }
                        return -1
                    },
                    n = s(),
                    r = b.currentTime();
                if (n > 0 && r > n && y.markerEscape) return void b.currentTime(n);
                if (-1 != T) {
                    var i = o(T);
                    if (r >= y.markerTip.time(j[T]) && i > r) return
                }
                if (j.length > 0 && r < y.markerTip.time(j[0])) t = -1;
                else
                    for (var a = 0; a < j.length; a++)
                        if (i = o(a), r >= y.markerTip.time(j[a]) && i > r) {
                            t = a;
                            break
                        }
                t != T && (-1 != t && Math.round(r, 0) == y.markerTip.time(j[t]) && e.onMarkerReached && e.onMarkerReached(j[t], b), T = t), y.breakOverlay.display && h(r)
            }

            function f() {
                y.markerTip.display && p(), b.markers.removeAll(), n(e.markers), y.breakOverlay.display && v(), d(), b.on("timeupdate", d)
            }
            var y = $.extend(!0, {}, o, e),
                m = {},
                j = [],
                g = $(this.el()),
                T = -1,
                b = this,
                k = null,
                C = null,
                _ = -1;
            b.on("loadedmetadata", function () {
                f()
            }), b.markers = {
                getMarkers: function () {
                    return j
                },
                next: function () {
                    for (var t = b.currentTime(), e = 0; e < j.length; e++) {
                        var o = y.markerTip.time(j[e]);
                        if (o > t) {
                            b.currentTime(o);
                            break
                        }
                    }
                },
                prev: function () {
                    for (var t = b.currentTime(), e = j.length - 1; e >= 0; e--) {
                        var o = y.markerTip.time(j[e]);
                        if (t > o + .5) {
                            b.currentTime(o);
                            break
                        }
                    }
                },
                add: function (t) {
                    n(t)
                },
                remove: function (t) {
                    c(t)
                },
                removeAll: function () {
                    for (var t = [], e = 0; e < j.length; e++) t.push(e);
                    c(t)
                },
                updateTime: function () {
                    l()
                },
                reset: function (t) {
                    b.markers.removeAll(), n(t)
                },
                destroy: function () {
                    b.markers.removeAll(), C.remove(), k.remove(), b.off("timeupdate", h), delete b.markers
                },
                setMarkerEscape: function (t) {
                    i(t)
                }
            }
        }
        var o = {
            markerStyle: {
                width: "4px",
                "border-radius": "10%"
            },
            markerTip: {
                display: !0,
                text: function (t) {
                    return "Break: " + t.text
                },
                time: function (t) {
                    return t.time
                }
            },
            breakOverlay: {
                display: !1,
                displayTime: 3,
                text: function (t) {
                    return "Break overlay: " + t.overlayText
                },
                style: {
                    width: "100%",
                    bottom: "80px",
                    "background-color": "rgba(0,0,0,0.7)",
                    color: "white",
                    "font-size": "17px"
                }
            },
            markerEscape: !0,
            onMarkerClick: function () {},
            onMarkerReached: function () {},
            markers: []
        };
        videojs.plugin("markers", e)
    }(videojs)
}), define("balloon-video-player/1.2.0/src/plugins/pluck/pluck-debug", [], function () {
    ! function () {
        var t = {
                text: "Owned_Stamp.png",
                opacity: 100,
                display: !0
            },
            e = function () {
                var t, o, s, n, r;
                t = Array.prototype.slice.call(arguments), o = t.shift() || {};
                for (s in t) {
                    n = t[s];
                    for (r in n) n.hasOwnProperty(r) && (o[r] = "object" == typeof n[r] ? e(o[r], n[r]) : n[r])
                }
                return o
            };
        createDom = function (t, e) {
            return div = document.createElement("div"), div.className = "vjs-pluck", div.id = "vjs-pluck", span = document.createElement("span"), span.innerHTML = e, span.className = "vjs-pluck-text", div.appendChild(span), t.appendChild(div), div
        }, videojs.plugin("pluck", function (o) {
            var s, n, r;
            s = e(t, o), n = this.el(), r = document.getElementById("vjs-pluck"), 0 == s.display ? void 0 != r && (r.style.visibility = "hidden") : (r = void 0 == r ? createDom(n, s.text) : r, r.style.visibility = "visible")
        })
    }(videojs)
}), define("balloon-video-player/1.3.0/src/plugins/pluck/pluck", [], function () {
    ! function () {
        var t = {
                text: "Owned_Stamp.png",
                opacity: 100,
                display: !0
            },
            e = function () {
                var t, o, s, n, r;
                t = Array.prototype.slice.call(arguments), o = t.shift() || {};
                for (s in t) {
                    n = t[s];
                    for (r in n) n.hasOwnProperty(r) && (o[r] = "object" == typeof n[r] ? e(o[r], n[r]) : n[r])
                }
                return o
            };
        createDom = function (t, e) {
            return div = document.createElement("div"), div.className = "vjs-pluck", div.id = "vjs-pluck", span = document.createElement("span"), span.innerHTML = e, span.className = "vjs-pluck-text", div.appendChild(span), t.appendChild(div), div
        }, videojs.plugin("pluck", function (o) {
            var s, n, r;
            s = e(t, o), n = this.el(), r = document.getElementById("vjs-pluck"), 0 == s.display ? void 0 != r && (r.style.visibility = "hidden") : (r = void 0 == r ? createDom(n, s.text) : r, r.style.visibility = "visible")
        })
    }(videojs)
}), define("balloon-video-player/1.3.0/src/plugins/hotkeys/hotkeys", [], function (t, e, o) {
    ! function (t, e) {
        "function" == typeof define && define.amd ? define([], e.bind(this, t, t.videojs)) : "undefined" != typeof o && o.exports ? o.exports = e(t, t.videojs) : e(t, t.videojs)
    }(window, function (t, e) {
        "use strict";
        t.videojs_hotkeys = {
            version: "0.2.13"
        };
        var o = function (o) {
            function s(t) {
                return 32 === t.which
            }

            function n(t) {
                return 37 === t.which
            }

            function r(t) {
                return 39 === t.which
            }

            function i(t) {
                return 38 === t.which
            }

            function a(t) {
                return 40 === t.which
            }

            function l(t) {
                return 77 === t.which
            }

            function c(t) {
                return 70 === t.which
            }
            var u = this,
                p = u.el(),
                h = document,
                v = {
                    volumeStep: .1,
                    seekStep: 5,
                    enableMute: !0,
                    enableVolumeScroll: !0,
                    enableFullscreen: !0,
                    enableNumbers: !0,
                    enableJogStyle: !1,
                    alwaysCaptureHotkeys: !1,
                    playPauseKey: s,
                    rewindKey: n,
                    forwardKey: r,
                    volumeUpKey: i,
                    volumeDownKey: a,
                    muteKey: l,
                    fullscreenKey: c,
                    customKeys: {}
                },
                d = 1,
                f = 2,
                y = 3,
                m = 4,
                j = 5,
                g = 6,
                T = 7,
                b = e.mergeOptions || e.util.mergeOptions;
            o = b(v, o || {});
            var k = o.volumeStep,
                C = o.seekStep,
                _ = o.enableMute,
                w = o.enableVolumeScroll,
                S = o.enableFullscreen,
                x = o.enableNumbers,
                E = o.enableJogStyle,
                P = o.alwaysCaptureHotkeys;
            p.hasAttribute("tabIndex") || p.setAttribute("tabIndex", "-1"), P && u.one("play", function () {
                p.focus()
            }), u.on("userinactive", function () {
                var t = function () {
                        clearTimeout(e)
                    },
                    e = setTimeout(function () {
                        u.off("useractive", t), h.activeElement.parentElement == p.querySelector(".vjs-control-bar") && p.focus()
                    }, 10);
                u.one("useractive", t)
            }), u.on("play", function () {
                var t = p.querySelector(".iframeblocker");
                t && "" === t.style.display && (t.style.display = "block", t.style.bottom = "39px")
            });
            var M = function (t) {
                    var e, s = t.which,
                        n = t.preventDefault;
                    if (u.controls()) {
                        var r = h.activeElement;
                        if (P || r == p || r == p.querySelector(".vjs-tech") || r == p.querySelector(".vjs-control-bar") || r == p.querySelector(".iframeblocker")) switch (R(t, u)) {
                        case d:
                            n(), P && t.stopPropagation(), u.paused() ? u.play() : u.pause();
                            break;
                        case f:
                            n(), e = u.currentTime() - C, u.currentTime() <= C && (e = 0), u.currentTime(e);
                            break;
                        case y:
                            n();
                            var i = u.currentTime() + C;
                            u.currentTime(i > u.duration() ? Math.floor(u.duration()) : u.currentTime() + C);
                            break;
                        case j:
                            n(), E ? (e = u.currentTime() - 1, u.currentTime() <= 1 && (e = 0), u.currentTime(e)) : u.volume(u.volume() - k);
                            break;
                        case m:
                            n(), E ? u.currentTime(u.currentTime() + 1) : u.volume(u.volume() + k);
                            break;
                        case g:
                            _ && u.muted(!u.muted());
                            break;
                        case T:
                            S && (u.isFullscreen() ? u.exitFullscreen() : u.requestFullscreen());
                            break;
                        default:
                            if ((s > 47 && 59 > s || s > 95 && 106 > s) && x) {
                                var a = 48;
                                s > 95 && (a = 96);
                                var l = s - a;
                                n(), u.currentTime(u.duration() * l * .1)
                            }
                            for (var c in o.customKeys) {
                                var v = o.customKeys[c];
                                v && v.key && v.handler && v.key(t) && (n(), v.handler(u, o))
                            }
                        }
                    }
                },
                I = function (t) {
                    if (u.controls()) {
                        var e = t.relatedTarget || t.toElement || h.activeElement;
                        (e == p || e == p.querySelector(".vjs-tech") || e == p.querySelector(".iframeblocker")) && S && (u.isFullscreen() ? u.exitFullscreen() : u.requestFullscreen())
                    }
                },
                F = function (e) {
                    if (u.controls()) {
                        var o = e.relatedTarget || e.toElement || h.activeElement;
                        if ((P || o == p || o == p.querySelector(".vjs-tech") || o == p.querySelector(".iframeblocker") || o == p.querySelector(".vjs-control-bar")) && w) {
                            e = t.event || e;
                            var s = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
                            e.preventDefault(), 1 == s ? u.volume(u.volume() + k) : -1 == s && u.volume(u.volume() - k)
                        }
                    }
                },
                R = function (t, e) {
                    return o.playPauseKey(t, e) ? d : o.rewindKey(t, e) ? f : o.forwardKey(t, e) ? y : o.volumeUpKey(t, e) ? m : o.volumeDownKey(t, e) ? j : o.muteKey(t, e) ? g : o.fullscreenKey(t, e) ? T : void 0
                };
            return u.on("keydown", M), u.on("dblclick", I), u.on("mousewheel", F), u.on("DOMMouseScroll", F), this
        };
        e.plugin("hotkeys", o)
    })
}), define("balloon-video-player/1.3.0/src/plugins/progressTips/progressTips", [], function () {
    (function () {
        videojs.plugin("progressTips", function () {
            var t;
            t = function () {
                var t;
                t = this, $(".vjs-progress-control").after($("      <div id='vjs-tip'>      <div id='vjs-tip-arrow'></div>      <div id='vjs-tip-inner'></div>      </div>    ")), $(".vjs-progress-control").on("mousemove", function (e) {
                    var o, s, n, r, i;
                    r = t.controlBar.progressControl.seekBar;
                    var a = (e.pageX - $(r.el()).offset().left) / r.width();
                    i = a * t.duration(), i === t.duration() && (i -= .1), s = Math.floor(i / 60), n = Math.floor(i - 60 * s), 10 > n && (n = "0" + n), $("#vjs-tip-inner").html("" + s + ":" + n), o = $(".vjs-control-bar").height(), $("#vjs-tip").css("top", "" + (e.pageY - $(this).offset().top - o - 20) + "px").css("left", "" + (e.pageX - $(this).offset().left - 20) + "px").css("visibility", "visible")
                }), $(".vjs-progress-control, .vjs-play-control").on("mouseout", function () {
                    $("#vjs-tip").css("visibility", "hidden")
                })
            }, this.on("loadedmetadata", t)
        })
    }).call(this)
});