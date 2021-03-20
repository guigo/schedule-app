var KTApp = function() {
    var t = {},
        e = function(t) {
            var e = t.data("theme") ? "tooltip-" + t.data("theme") : "",
                a = "auto" == t.data("width") ? "tooltop-auto-width" : "",
                n = t.data("trigger") ? t.data("trigger") : "hover";
            $(t).tooltip({
                trigger: n,
                template: '<div class="tooltip ' + e + " " + a + '" role="tooltip">                <div class="arrow"></div>                <div class="tooltip-inner"></div>            </div>'
            })
        },
        a = function() {
            $('[data-toggle="tooltip"]').each((function() {
                e($(this))
            }))
        },
        n = function(t) {
            var e = t.data("skin") ? "popover-" + t.data("skin") : "",
                a = t.data("trigger") ? t.data("trigger") : "hover";
            t.popover({
                trigger: a,
                template: '            <div class="popover ' + e + '" role="tooltip">                <div class="arrow"></div>                <h3 class="popover-header"></h3>                <div class="popover-body"></div>            </div>'
            })
        },
        i = function() {
            $('[data-toggle="popover"]').each((function() {
                n($(this))
            }))
        },
        o = function(t, e) {
            t = $(t), new KTCard(t[0], e)
        },
        l = function() {
            $('[data-card="true"]').each((function() {
                var t = $(this);
                !0 !== t.data("data-card-initialized") && (o(t, {}), t.data("data-card-initialized", !0))
            }))
        };
    return {
        init: function(e) {
            e && (t = e), KTApp.initComponents()
        },
        initComponents: function() {
            $('[data-scroll="true"]').each((function() {
                var t = $(this);
                KTUtil.scrollInit(this, {
                    mobileNativeScroll: !0,
                    handleWindowResize: !0,
                    rememberPosition: "true" == t.data("remember-position")
                })
            })), a(), i(), $("body").on("click", "[data-close=alert]", (function() {
                $(this).closest(".alert").hide()
            })), $(".custom-file-input").on("change", (function() {
                var t = $(this).val();
                $(this).next(".custom-file-label").addClass("selected").html(t)
            })), l(), "undefined" != typeof Sticky && new Sticky('[data-sticky="true"]'), $("body").on("show.bs.dropdown", (function(t) {
                var e = $(t.target).find("[data-attach='body']");
                if (0 !== e.length) {
                    var a = $(t.target).find(".dropdown-menu").detach();
                    e.data("dropdown-menu", a), $("body").append(a), a.css("display", "block"), a.position({
                        my: "right top",
                        at: "right bottom",
                        of: $(t.relatedTarget)
                    })
                }
            })), $("body").on("hide.bs.dropdown", (function(t) {
                var e = $(t.target).find("[data-attach='body']");
                if (0 !== e.length) {
                    var a = e.data("dropdown-menu");
                    $(t.target).append(a.detach()), a.hide()
                }
            }))
        },
        initTooltips: function() {
            a()
        },
        initTooltip: function(t) {
            e(t)
        },
        initPopovers: function() {
            i()
        },
        initPopover: function(t) {
            n(t)
        },
        initCard: function(t, e) {
            o(t, e)
        },
        initCards: function() {
            l()
        },
        initSticky: function() {
            initSticky()
        },
        initAbsoluteDropdown: function(t) {
            ! function(t) {
                var e;
                t && $("body").on("show.bs.dropdown", t, (function(t) {
                    e = $(t.target).find(".dropdown-menu"), $("body").append(e.detach()), e.css("display", "block"), e.position({
                        my: "right top",
                        at: "right bottom",
                        of: $(t.relatedTarget)
                    })
                })).on("hide.bs.dropdown", t, (function(t) {
                    $(t.target).append(e.detach()), e.hide()
                }))
            }(t)
        },
        block: function(t, e) {
            var a, n = $(t),
                i = '<span class="spinner ' + ((e = $.extend(!0, {
                    opacity: .05,
                    overlayColor: "#000000",
                    type: "",
                    size: "",
                    state: "primary",
                    centerX: !0,
                    centerY: !0,
                    message: "",
                    shadow: !0,
                    width: "auto"
                }, e)).type ? "spinner-" + e.type : "") + " " + (e.state ? "spinner-" + e.state : "") + " " + (e.size ? "spinner-" + e.size : "") + '"></span';
            if (e.message && e.message.length > 0) {
                var o = "blockui " + (!1 === e.shadow ? "blockui" : "");
                a = '<div class="' + o + '"><span>' + e.message + "</span>" + i + "</div>";
                n = document.createElement("div");
                $("body").prepend(n), KTUtil.addClass(n, o), n.innerHTML = a, e.width = KTUtil.actualWidth(n) + 10, KTUtil.remove(n), "body" == t && (a = '<div class="' + o + '" style="margin-left:-' + e.width / 2 + 'px;"><span>' + e.message + "</span><span>" + i + "</span></div>")
            } else a = i;
            var l = {
                message: a,
                centerY: e.centerY,
                centerX: e.centerX,
                css: {
                    top: "30%",
                    left: "50%",
                    border: "0",
                    padding: "0",
                    backgroundColor: "none",
                    width: e.width
                },
                overlayCSS: {
                    backgroundColor: e.overlayColor,
                    opacity: e.opacity,
                    cursor: "wait",
                    zIndex: "body" == t ? 1100 : 10
                },
                onUnblock: function() {
                    n && n[0] && (KTUtil.css(n[0], "position", ""), KTUtil.css(n[0], "zoom", ""))
                }
            };
            "body" == t ? (l.css.top = "50%", $.blockUI(l)) : (n = $(t)).block(l)
        },
        unblock: function(t) {
            t && "body" != t ? $(t).unblock() : $.unblockUI()
        },
        blockPage: function(t) {
            return KTApp.block("body", t)
        },
        unblockPage: function() {
            return KTApp.unblock("body")
        },
        getSettings: function() {
            return t
        }
    }
}();
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTApp), $(document).ready((function() {
    KTApp.init(KTAppSettings)
})), window.onload = function() {
    var t = KTUtil.getByTagName("body");
    t && t[0] && KTUtil.removeClass(t[0], "page-loading")
};
var KTCard = function(t, e) {
    var a = this,
        n = KTUtil.getById(t),
        i = KTUtil.getBody();
    if (n) {
        var o = {
                toggleSpeed: 400,
                sticky: {
                    releseOnReverse: !1,
                    offset: 300,
                    zIndex: 101
                }
            },
            l = {
                construct: function(t) {
                    return KTUtil.data(n).has("card") ? a = KTUtil.data(n).get("card") : (l.init(t), l.build(), KTUtil.data(n).set("card", a)), a
                },
                init: function(t) {
                    a.element = n, a.events = [], a.options = KTUtil.deepExtend({}, o, t), a.header = KTUtil.child(n, ".card-header"), a.footer = KTUtil.child(n, ".card-footer"), KTUtil.child(n, ".card-body") ? a.body = KTUtil.child(n, ".card-body") : KTUtil.child(n, ".form") && (a.body = KTUtil.child(n, ".form"))
                },
                build: function() {
                    var t = KTUtil.find(a.header, "[data-card-tool=remove]");
                    t && KTUtil.addEvent(t, "click", (function(t) {
                        t.preventDefault(), l.remove()
                    }));
                    var e = KTUtil.find(a.header, "[data-card-tool=reload]");
                    e && KTUtil.addEvent(e, "click", (function(t) {
                        t.preventDefault(), l.reload()
                    }));
                    var n = KTUtil.find(a.header, "[data-card-tool=toggle]");
                    n && KTUtil.addEvent(n, "click", (function(t) {
                        t.preventDefault(), l.toggle()
                    }))
                },
                initSticky: function() {
                    a.options.sticky.offset;
                    a.header && window.addEventListener("scroll", l.onScrollSticky)
                },
                onScrollSticky: function(t) {
                    var e = a.options.sticky.offset;
                    if (!isNaN(e)) {
                        var n = KTUtil.getScrollTop();
                        n >= e && !1 === KTUtil.hasClass(i, "card-sticky-on") ? (l.eventTrigger("stickyOn"), KTUtil.addClass(i, "card-sticky-on"), l.updateSticky()) : 1.5 * n <= e && KTUtil.hasClass(i, "card-sticky-on") && (l.eventTrigger("stickyOff"), KTUtil.removeClass(i, "card-sticky-on"), l.resetSticky())
                    }
                },
                updateSticky: function() {
                    var t, e, n;
                    a.header && (KTUtil.hasClass(i, "card-sticky-on") && (t = a.options.sticky.position.top instanceof Function ? parseInt(a.options.sticky.position.top.call(this, a)) : parseInt(a.options.sticky.position.top), e = a.options.sticky.position.left instanceof Function ? parseInt(a.options.sticky.position.left.call(this, a)) : parseInt(a.options.sticky.position.left), n = a.options.sticky.position.right instanceof Function ? parseInt(a.options.sticky.position.right.call(this, a)) : parseInt(a.options.sticky.position.right), KTUtil.css(a.header, "z-index", a.options.sticky.zIndex), KTUtil.css(a.header, "top", t + "px"), KTUtil.css(a.header, "left", e + "px"), KTUtil.css(a.header, "right", n + "px")))
                },
                resetSticky: function() {
                    a.header && !1 === KTUtil.hasClass(i, "card-sticky-on") && (KTUtil.css(a.header, "z-index", ""), KTUtil.css(a.header, "top", ""), KTUtil.css(a.header, "left", ""), KTUtil.css(a.header, "right", ""))
                },
                remove: function() {
                    var t;
                    !1 !== l.eventTrigger("beforeRemove") && ((t = document.querySelectorAll(".tooltip.show")) && $(t).tooltip("dispose"), KTUtil.remove(n), l.eventTrigger("afterRemove"))
                },
                setContent: function(t) {
                    t && (a.body.innerHTML = t)
                },
                getBody: function() {
                    return a.body
                },
                getSelf: function() {
                    return n
                },
                reload: function() {
                    l.eventTrigger("reload")
                },
                toggle: function() {
                    KTUtil.hasClass(n, "card-collapse") || KTUtil.hasClass(n, "card-collapsed") ? l.expand() : l.collapse()
                },
                collapse: function() {
                    !1 !== l.eventTrigger("beforeCollapse") && (KTUtil.slideUp(a.body, a.options.toggleSpeed, (function() {
                        l.eventTrigger("afterCollapse")
                    })), KTUtil.addClass(n, "card-collapse"))
                },
                expand: function() {
                    !1 !== l.eventTrigger("beforeExpand") && (KTUtil.slideDown(a.body, a.options.toggleSpeed, (function() {
                        l.eventTrigger("afterExpand")
                    })), KTUtil.removeClass(n, "card-collapse"), KTUtil.removeClass(n, "card-collapsed"))
                },
                eventTrigger: function(t) {
                    for (var e = 0; e < a.events.length; e++) {
                        var n = a.events[e];
                        if (n.name == t) {
                            if (1 != n.one) return n.handler.call(this, a);
                            if (0 == n.fired) return a.events[e].fired = !0, n.handler.call(this, a)
                        }
                    }
                },
                addEvent: function(t, e, n) {
                    return a.events.push({
                        name: t,
                        handler: e,
                        one: n,
                        fired: !1
                    }), a
                }
            };
        return a.setDefaults = function(t) {
            o = t
        }, a.remove = function() {
            return l.remove(html)
        }, a.initSticky = function() {
            return l.initSticky()
        }, a.updateSticky = function() {
            return l.updateSticky()
        }, a.resetSticky = function() {
            return l.resetSticky()
        }, a.destroySticky = function() {
            l.resetSticky(), window.removeEventListener("scroll", l.onScrollSticky)
        }, a.reload = function() {
            return l.reload()
        }, a.setContent = function(t) {
            return l.setContent(t)
        }, a.toggle = function() {
            return l.toggle()
        }, a.collapse = function() {
            return l.collapse()
        }, a.expand = function() {
            return l.expand()
        }, a.getBody = function() {
            return l.getBody()
        }, a.getSelf = function() {
            return l.getSelf()
        }, a.on = function(t, e) {
            return l.addEvent(t, e)
        }, a.one = function(t, e) {
            return l.addEvent(t, e, !0)
        }, l.construct.apply(a, [e]), a
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTCard);
var KTCookie = {
    getCookie: function(t) {
        var e = document.cookie.match(new RegExp("(?:^|; )" + t.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
        return e ? decodeURIComponent(e[1]) : void 0
    },
    setCookie: function(t, e, a) {
        a || (a = {}), (a = Object.assign({}, {
            path: "/"
        }, a)).expires instanceof Date && (a.expires = a.expires.toUTCString());
        var n = encodeURIComponent(t) + "=" + encodeURIComponent(e);
        for (var i in a)
            if (a.hasOwnProperty(i)) {
                n += "; " + i;
                var o = a[i];
                !0 !== o && (n += "=" + o)
            } document.cookie = n
    },
    deleteCookie: function(t) {
        setCookie(t, "", {
            "max-age": -1
        })
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTCookie);
var KTDialog = function(t) {
    var e, a = this,
        n = KTUtil.getBody(),
        i = {
            placement: "top center",
            type: "loader",
            width: 100,
            state: "default",
            message: "Loading..."
        },
        o = {
            construct: function(t) {
                return o.init(t), a
            },
            init: function(t) {
                a.events = [], a.options = KTUtil.deepExtend({}, i, t), a.state = !1
            },
            show: function() {
                return o.eventTrigger("show"), e = document.createElement("DIV"), KTUtil.setHTML(e, a.options.message), KTUtil.addClass(e, "dialog dialog-shown"), KTUtil.addClass(e, "dialog-" + a.options.state), KTUtil.addClass(e, "dialog-" + a.options.type), "top center" == a.options.placement && KTUtil.addClass(e, "dialog-top-center"), n.appendChild(e), a.state = "shown", o.eventTrigger("shown"), a
            },
            hide: function() {
                return e && (o.eventTrigger("hide"), e.remove(), a.state = "hidden", o.eventTrigger("hidden")), a
            },
            eventTrigger: function(t) {
                for (var e = 0; e < a.events.length; e++) {
                    var n = a.events[e];
                    if (n.name == t) {
                        if (1 != n.one) return n.handler.call(this, a);
                        if (0 == n.fired) return a.events[e].fired = !0, n.handler.call(this, a)
                    }
                }
            },
            addEvent: function(t, e, n) {
                return a.events.push({
                    name: t,
                    handler: e,
                    one: n,
                    fired: !1
                }), a
            }
        };
    return a.setDefaults = function(t) {
        i = t
    }, a.shown = function() {
        return "shown" == a.state
    }, a.hidden = function() {
        return "hidden" == a.state
    }, a.show = function() {
        return o.show()
    }, a.hide = function() {
        return o.hide()
    }, a.on = function(t, e) {
        return o.addEvent(t, e)
    }, a.one = function(t, e) {
        return o.addEvent(t, e, !0)
    }, o.construct.apply(a, [t]), a
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTDialog);
var KTHeader = function(t, e) {
    var a = this,
        n = KTUtil.getById(t),
        i = KTUtil.getBody();
    if (void 0 !== n) {
        var o = {
                offset: {
                    desktop: !0,
                    tabletAndMobile: !0
                },
                releseOnReverse: {
                    desktop: !1,
                    tabletAndMobile: !1
                }
            },
            l = {
                construct: function(t) {
                    return KTUtil.data(n).has("header") ? a = KTUtil.data(n).get("header") : (l.init(t), l.build(), KTUtil.data(n).set("header", a)), a
                },
                init: function(t) {
                    a.events = [], a.options = KTUtil.deepExtend({}, o, t)
                },
                build: function() {
                    var t = !0,
                        e = 0;
                    window.addEventListener("scroll", (function() {
                        var n, o = 0;
                        KTUtil.isBreakpointDown("lg") && !1 === a.options.offset.tabletAndMobile || KTUtil.isBreakpointUp("lg") && !1 === a.options.offset.desktop || (KTUtil.isBreakpointUp("lg") ? o = a.options.offset.desktop : KTUtil.isBreakpointDown("lg") && (o = a.options.offset.tabletAndMobile), n = KTUtil.getScrollTop(), KTUtil.isBreakpointDown("lg") && a.options.releseOnReverse.tabletAndMobile || KTUtil.isBreakpointUp("lg") && a.options.releseOnReverse.desktop ? (n > o && e < n ? (!1 === i.hasAttribute("data-header-scroll") && i.setAttribute("data-header-scroll", "on"), t && (l.eventTrigger("scrollOn", a), t = !1)) : (!0 === i.hasAttribute("data-header-scroll") && i.removeAttribute("data-header-scroll"), 0 == t && (l.eventTrigger("scrollOff", a), t = !0)), e = n) : n > o ? (!1 === i.hasAttribute("data-header-scroll") && i.setAttribute("data-header-scroll", "on"), t && (l.eventTrigger("scrollOn", a), t = !1)) : (!0 === i.hasAttribute("data-header-scroll") && i.removeAttribute("data-header-scroll"), 0 == t && (l.eventTrigger("scrollOff", a), t = !0)))
                    }))
                },
                eventTrigger: function(t, e) {
                    for (var n = 0; n < a.events.length; n++) {
                        var i = a.events[n];
                        if (i.name == t) {
                            if (1 != i.one) return i.handler.call(this, a, e);
                            if (0 == i.fired) return a.events[n].fired = !0, i.handler.call(this, a, e)
                        }
                    }
                },
                addEvent: function(t, e, n) {
                    a.events.push({
                        name: t,
                        handler: e,
                        one: n,
                        fired: !1
                    })
                }
            };
        return a.setDefaults = function(t) {
            o = t
        }, a.on = function(t, e) {
            return l.addEvent(t, e)
        }, l.construct.apply(a, [e]), !0, a
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTHeader);
var KTImageInput = function(t, e) {
    var a = this,
        n = KTUtil.getById(t);
    KTUtil.getBody();
    if (n) {
        var i = {
                editMode: !1
            },
            o = {
                construct: function(t) {
                    return KTUtil.data(n).has("imageinput") ? a = KTUtil.data(n).get("imageinput") : (o.init(t), o.build(), KTUtil.data(n).set("imageinput", a)), a
                },
                init: function(t) {
                    a.element = n, a.events = [], a.input = KTUtil.find(n, 'input[type="file"]'), a.wrapper = KTUtil.find(n, ".image-input-wrapper"), a.cancel = KTUtil.find(n, '[data-action="cancel"]'), a.remove = KTUtil.find(n, '[data-action="remove"]'), a.src = KTUtil.css(a.wrapper, "backgroundImage"), a.hidden = KTUtil.find(n, 'input[type="hidden"]'), a.options = KTUtil.deepExtend({}, i, t)
                },
                build: function() {
                    KTUtil.addEvent(a.input, "change", (function(t) {
                        if (t.preventDefault(), a.input && a.input.files && a.input.files[0]) {
                            var e = new FileReader;
                            e.onload = function(t) {
                                KTUtil.css(a.wrapper, "background-image", "url(" + t.target.result + ")")
                            }, e.readAsDataURL(a.input.files[0]), KTUtil.addClass(a.element, "image-input-changed"), KTUtil.removeClass(a.element, "image-input-empty"), o.eventTrigger("change")
                        }
                    })), KTUtil.addEvent(a.cancel, "click", (function(t) {
                        t.preventDefault(), o.eventTrigger("cancel"), KTUtil.removeClass(a.element, "image-input-changed"), KTUtil.removeClass(a.element, "image-input-empty"), KTUtil.css(a.wrapper, "background-image", a.src), a.input.value = "", a.hidden && (a.hidden.value = "0")
                    })), KTUtil.addEvent(a.remove, "click", (function(t) {
                        t.preventDefault(), o.eventTrigger("remove"), KTUtil.removeClass(a.element, "image-input-changed"), KTUtil.addClass(a.element, "image-input-empty"), KTUtil.css(a.wrapper, "background-image", "none"), a.input.value = "", a.hidden && (a.hidden.value = "1")
                    }))
                },
                eventTrigger: function(t) {
                    for (var e = 0; e < a.events.length; e++) {
                        var n = a.events[e];
                        if (n.name == t) {
                            if (1 != n.one) return n.handler.call(this, a);
                            if (0 == n.fired) return a.events[e].fired = !0, n.handler.call(this, a)
                        }
                    }
                },
                addEvent: function(t, e, n) {
                    return a.events.push({
                        name: t,
                        handler: e,
                        one: n,
                        fired: !1
                    }), a
                }
            };
        return a.setDefaults = function(t) {
            i = t
        }, a.on = function(t, e) {
            return o.addEvent(t, e)
        }, a.one = function(t, e) {
            return o.addEvent(t, e, !0)
        }, o.construct.apply(a, [e]), a
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTImageInput);
var KTMenu = function(t, e) {
    var a = this,
        n = !1,
        i = KTUtil.getById(t),
        o = KTUtil.getBody();
    if (i) {
        var l = {
                scroll: {
                    rememberPosition: !1
                },
                accordion: {
                    slideSpeed: 200,
                    autoScroll: !1,
                    autoScrollSpeed: 1200,
                    expandAll: !0
                },
                dropdown: {
                    timeout: 500
                }
            },
            r = {
                construct: function(t) {
                    return KTUtil.data(i).has("menu") ? a = KTUtil.data(i).get("menu") : (r.init(t), r.reset(), r.build(), KTUtil.data(i).set("menu", a)), a
                },
                init: function(t) {
                    a.events = [], a.eventHandlers = {}, a.options = KTUtil.deepExtend({}, l, t), a.pauseDropdownHoverTime = 0, a.uid = KTUtil.getUniqueID()
                },
                update: function(t) {
                    a.options = KTUtil.deepExtend({}, l, t), a.pauseDropdownHoverTime = 0, r.reset(), a.eventHandlers = {}, r.build(), KTUtil.data(i).set("menu", a)
                },
                reload: function() {
                    r.reset(), r.build(), r.resetSubmenuProps()
                },
                build: function() {
                    a.eventHandlers.event_1 = KTUtil.on(i, ".menu-toggle", "click", r.handleSubmenuAccordion), ("dropdown" === r.getSubmenuMode() || r.isConditionalSubmenuDropdown()) && (a.eventHandlers.event_2 = KTUtil.on(i, '[data-menu-toggle="hover"]', "mouseover", r.handleSubmenuDrodownHoverEnter), a.eventHandlers.event_3 = KTUtil.on(i, '[data-menu-toggle="hover"]', "mouseout", r.handleSubmenuDrodownHoverExit), a.eventHandlers.event_4 = KTUtil.on(i, '[data-menu-toggle="click"] > .menu-toggle, [data-menu-toggle="click"] > .menu-link .menu-toggle', "click", r.handleSubmenuDropdownClick), a.eventHandlers.event_5 = KTUtil.on(i, '[data-menu-toggle="tab"] > .menu-toggle, [data-menu-toggle="tab"] > .menu-link .menu-toggle', "click", r.handleSubmenuDropdownTabClick)), a.eventHandlers.event_6 = KTUtil.on(i, ".menu-item > .menu-link:not(.menu-toggle):not(.menu-link-toggle-skip)", "click", r.handleLinkClick), a.options.scroll && a.options.scroll.height && r.scrollInit()
                },
                reset: function() {
                    KTUtil.off(i, "click", a.eventHandlers.event_1), KTUtil.off(i, "mouseover", a.eventHandlers.event_2), KTUtil.off(i, "mouseout", a.eventHandlers.event_3), KTUtil.off(i, "click", a.eventHandlers.event_4), KTUtil.off(i, "click", a.eventHandlers.event_5), KTUtil.off(i, "click", a.eventHandlers.event_6)
                },
                scrollInit: function() {
                    a.options.scroll && a.options.scroll.height ? (KTUtil.scrollDestroy(i, !0), KTUtil.scrollInit(i, {
                        mobileNativeScroll: !0,
                        windowScroll: !1,
                        resetHeightOnDestroy: !0,
                        handleWindowResize: !0,
                        height: a.options.scroll.height,
                        rememberPosition: a.options.scroll.rememberPosition
                    })) : KTUtil.scrollDestroy(i, !0)
                },
                scrollUpdate: function() {
                    a.options.scroll && a.options.scroll.height && KTUtil.scrollUpdate(i)
                },
                scrollTop: function() {
                    a.options.scroll && a.options.scroll.height && KTUtil.scrollTop(i)
                },
                getSubmenuMode: function(t) {
                    return KTUtil.isBreakpointUp("lg") ? t && KTUtil.hasAttr(t, "data-menu-toggle") && "hover" == KTUtil.attr(t, "data-menu-toggle") ? "dropdown" : KTUtil.isset(a.options.submenu, "desktop.state.body") ? KTUtil.hasClasses(o, a.options.submenu.desktop.state.body) ? a.options.submenu.desktop.state.mode : a.options.submenu.desktop.default : KTUtil.isset(a.options.submenu, "desktop") ? a.options.submenu.desktop : void 0 : KTUtil.isBreakpointUp("md") && KTUtil.isBreakpointDown("lg") && KTUtil.isset(a.options.submenu, "tablet") ? a.options.submenu.tablet : !(!KTUtil.isBreakpointDown("md") || !KTUtil.isset(a.options.submenu, "mobile")) && a.options.submenu.mobile
                },
                isConditionalSubmenuDropdown: function() {
                    return !(!KTUtil.isBreakpointUp("lg") || !KTUtil.isset(a.options.submenu, "desktop.state.body"))
                },
                resetSubmenuProps: function(t) {
                    var e = KTUtil.findAll(i, ".menu-submenu");
                    if (e)
                        for (var a = 0, n = e.length; a < n; a++) {
                            var o = e[0];
                            KTUtil.css(o, "display", ""), KTUtil.css(o, "overflow", ""), o.hasAttribute("data-hor-direction") && (KTUtil.removeClass(o, "menu-submenu-left"), KTUtil.removeClass(o, "menu-submenu-right"), KTUtil.addClass(o, o.getAttribute("data-hor-direction")))
                        }
                },
                handleSubmenuDrodownHoverEnter: function(t) {
                    if ("accordion" !== r.getSubmenuMode(this) && !1 !== a.resumeDropdownHover()) {
                        var e = this;
                        "1" == e.getAttribute("data-hover") && (e.removeAttribute("data-hover"), clearTimeout(e.getAttribute("data-timeout")), e.removeAttribute("data-timeout")), r.showSubmenuDropdown(e)
                    }
                },
                handleSubmenuDrodownHoverExit: function(t) {
                    if (!1 !== a.resumeDropdownHover() && "accordion" !== r.getSubmenuMode(this)) {
                        var e = this,
                            n = a.options.dropdown.timeout,
                            i = setTimeout((function() {
                                "1" == e.getAttribute("data-hover") && r.hideSubmenuDropdown(e, !0)
                            }), n);
                        e.setAttribute("data-hover", "1"), e.setAttribute("data-timeout", i)
                    }
                },
                handleSubmenuDropdownClick: function(t) {
                    if ("accordion" !== r.getSubmenuMode(this)) {
                        var e = this.closest(".menu-item");
                        !1 !== r.eventTrigger("submenuToggle", this, t) && "accordion" != e.getAttribute("data-menu-submenu-mode") && (!1 === KTUtil.hasClass(e, "menu-item-hover") ? (KTUtil.addClass(e, "menu-item-open-dropdown"), r.showSubmenuDropdown(e)) : (KTUtil.removeClass(e, "menu-item-open-dropdown"), r.hideSubmenuDropdown(e, !0)), t.preventDefault())
                    }
                },
                handleSubmenuDropdownTabClick: function(t) {
                    if ("accordion" !== r.getSubmenuMode(this)) {
                        var e = this.closest(".menu-item");
                        !1 !== r.eventTrigger("submenuToggle", this, t) && "accordion" != e.getAttribute("data-menu-submenu-mode") && (0 == KTUtil.hasClass(e, "menu-item-hover") && (KTUtil.addClass(e, "menu-item-open-dropdown"), r.showSubmenuDropdown(e)), t.preventDefault())
                    }
                },
                handleLinkClick: function(t) {
                    var e = this.closest(".menu-item.menu-item-submenu");
                    !1 !== r.eventTrigger("linkClick", this, t) && e && "dropdown" === r.getSubmenuMode(e) && r.hideSubmenuDropdowns()
                },
                handleSubmenuDropdownClose: function(t, e) {
                    if ("accordion" !== r.getSubmenuMode(e)) {
                        var a = i.querySelectorAll(".menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)");
                        if (a.length > 0 && !1 === KTUtil.hasClass(e, "menu-toggle") && 0 === e.querySelectorAll(".menu-toggle").length)
                            for (var n = 0, o = a.length; n < o; n++) r.hideSubmenuDropdown(a[0], !0)
                    }
                },
                handleSubmenuAccordion: function(t, e) {
                    var n, i = e || this;
                    if (!1 !== r.eventTrigger("submenuToggle", this, t))
                        if ("dropdown" === r.getSubmenuMode(e) && (n = i.closest(".menu-item")) && "accordion" != n.getAttribute("data-menu-submenu-mode")) t.preventDefault();
                        else {
                            var o = i.closest(".menu-item"),
                                l = KTUtil.child(o, ".menu-submenu, .menu-inner");
                            if (!KTUtil.hasClass(i.closest(".menu-item"), "menu-item-open-always") && o && l) {
                                t.preventDefault();
                                var s = a.options.accordion.slideSpeed;
                                if (!1 === KTUtil.hasClass(o, "menu-item-open")) {
                                    if (!1 === a.options.accordion.expandAll) {
                                        var d = i.closest(".menu-nav, .menu-subnav"),
                                            c = KTUtil.children(d, ".menu-item.menu-item-open.menu-item-submenu:not(.menu-item-here):not(.menu-item-open-always)");
                                        if (d && c)
                                            for (var u = 0, p = c.length; u < p; u++) {
                                                var f = c[0],
                                                    g = KTUtil.child(f, ".menu-submenu");
                                                g && KTUtil.slideUp(g, s, (function() {
                                                    r.scrollUpdate(), KTUtil.removeClass(f, "menu-item-open")
                                                }))
                                            }
                                    }
                                    KTUtil.slideDown(l, s, (function() {
                                        r.scrollToItem(i), r.scrollUpdate(), r.eventTrigger("submenuToggle", l, t)
                                    })), KTUtil.addClass(o, "menu-item-open")
                                } else KTUtil.slideUp(l, s, (function() {
                                    r.scrollToItem(i), r.scrollUpdate(), r.eventTrigger("submenuToggle", l, t)
                                })), KTUtil.removeClass(o, "menu-item-open")
                            }
                        }
                },
                scrollToItem: function(t) {
                    KTUtil.isBreakpointUp("lg") && a.options.accordion.autoScroll && "1" !== i.getAttribute("data-menu-scroll") && KTUtil.scrollTo(t, a.options.accordion.autoScrollSpeed)
                },
                hideSubmenuDropdown: function(t, e) {
                    e && (KTUtil.removeClass(t, "menu-item-hover"), KTUtil.removeClass(t, "menu-item-active-tab")), t.removeAttribute("data-hover"), t.getAttribute("data-menu-toggle-class") && KTUtil.removeClass(o, t.getAttribute("data-menu-toggle-class"));
                    var a = t.getAttribute("data-timeout");
                    t.removeAttribute("data-timeout"), clearTimeout(a)
                },
                hideSubmenuDropdowns: function() {
                    var t;
                    if (t = i.querySelectorAll('.menu-item-submenu.menu-item-hover:not(.menu-item-tabs):not([data-menu-toggle="tab"])'))
                        for (var e = 0, a = t.length; e < a; e++) r.hideSubmenuDropdown(t[e], !0)
                },
                showSubmenuDropdown: function(t) {
                    var e = i.querySelectorAll(".menu-item-submenu.menu-item-hover, .menu-item-submenu.menu-item-active-tab");
                    if (e)
                        for (var a = 0, n = e.length; a < n; a++) {
                            var l = e[a];
                            t !== l && !1 === l.contains(t) && !1 === t.contains(l) && r.hideSubmenuDropdown(l, !0)
                        }
                    KTUtil.addClass(t, "menu-item-hover");
                    var s = KTUtil.find(t, ".menu-submenu");
                    s && !1 === s.hasAttribute("data-hor-direction") && (KTUtil.hasClass(s, "menu-submenu-left") ? s.setAttribute("data-hor-direction", "menu-submenu-left") : KTUtil.hasClass(s, "menu-submenu-right") && s.setAttribute("data-hor-direction", "menu-submenu-right")), s && !0 === KTUtil.isOffscreen(s, "left", 15) ? (KTUtil.removeClass(s, "menu-submenu-left"), KTUtil.addClass(s, "menu-submenu-right")) : s && !0 === KTUtil.isOffscreen(s, "right", 15) && (KTUtil.removeClass(s, "menu-submenu-right"), KTUtil.addClass(s, "menu-submenu-left")), t.getAttribute("data-menu-toggle-class") && KTUtil.addClass(o, t.getAttribute("data-menu-toggle-class"))
                },
                createSubmenuDropdownClickDropoff: function(t) {
                    var e, a = (e = KTUtil.child(t, ".menu-submenu") ? KTUtil.css(e, "z-index") : 0) - 1,
                        n = document.createElement('<div class="menu-dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + a + '"></div>');
                    o.appendChild(n), KTUtil.addEvent(n, "click", (function(e) {
                        e.stopPropagation(), e.preventDefault(), KTUtil.remove(this), r.hideSubmenuDropdown(t, !0)
                    }))
                },
                pauseDropdownHover: function(t) {
                    var e = new Date;
                    a.pauseDropdownHoverTime = e.getTime() + t
                },
                resumeDropdownHover: function() {
                    return (new Date).getTime() > a.pauseDropdownHoverTime
                },
                resetActiveItem: function(t) {
                    for (var e, n, o = 0, l = (e = i.querySelectorAll(".menu-item-active")).length; o < l; o++) {
                        var r = e[0];
                        KTUtil.removeClass(r, "menu-item-active"), KTUtil.hide(KTUtil.child(r, ".menu-submenu"));
                        for (var s = 0, d = (n = KTUtil.parents(r, ".menu-item-submenu") || []).length; s < d; s++) {
                            var c = n[o];
                            KTUtil.removeClass(c, "menu-item-open"), KTUtil.hide(KTUtil.child(c, ".menu-submenu"))
                        }
                    }
                    if (!1 === a.options.accordion.expandAll && (e = i.querySelectorAll(".menu-item-open")))
                        for (o = 0, l = e.length; o < l; o++) KTUtil.removeClass(n[0], "menu-item-open")
                },
                setActiveItem: function(t) {
                    r.resetActiveItem();
                    for (var e = KTUtil.parents(t, ".menu-item-submenu") || [], a = 0, n = e.length; a < n; a++) KTUtil.addClass(e[a], "menu-item-open");
                    KTUtil.addClass(t, "menu-item-active")
                },
                getBreadcrumbs: function(t) {
                    var e, a = [],
                        n = KTUtil.child(t, ".menu-link");
                    a.push({
                        text: e = KTUtil.child(n, ".menu-text") ? e.innerHTML : "",
                        title: n.getAttribute("title"),
                        href: n.getAttribute("href")
                    });
                    for (var i = KTUtil.parents(t, ".menu-item-submenu"), o = 0, l = i.length; o < l; o++) {
                        var r = KTUtil.child(i[o], ".menu-link");
                        a.push({
                            text: e = KTUtil.child(r, ".menu-text") ? e.innerHTML : "",
                            title: r.getAttribute("title"),
                            href: r.getAttribute("href")
                        })
                    }
                    return a.reverse()
                },
                getPageTitle: function(t) {
                    var e;
                    return KTUtil.child(t, ".menu-text") ? e.innerHTML : ""
                },
                eventTrigger: function(t, e, n) {
                    for (var i = 0; i < a.events.length; i++) {
                        var o = a.events[i];
                        if (o.name == t) {
                            if (1 != o.one) return o.handler.call(this, e, n);
                            if (0 == o.fired) return a.events[i].fired = !0, o.handler.call(this, e, n)
                        }
                    }
                },
                addEvent: function(t, e, n) {
                    a.events.push({
                        name: t,
                        handler: e,
                        one: n,
                        fired: !1
                    })
                },
                removeEvent: function(t) {
                    a.events[t] && delete a.events[t]
                }
            };
        return a.setDefaults = function(t) {
            l = t
        }, a.scrollUpdate = function() {
            return r.scrollUpdate()
        }, a.scrollReInit = function() {
            return r.scrollInit()
        }, a.scrollTop = function() {
            return r.scrollTop()
        }, a.setActiveItem = function(t) {
            return r.setActiveItem(t)
        }, a.reload = function() {
            return r.reload()
        }, a.update = function(t) {
            return r.update(t)
        }, a.getBreadcrumbs = function(t) {
            return r.getBreadcrumbs(t)
        }, a.getPageTitle = function(t) {
            return r.getPageTitle(t)
        }, a.getSubmenuMode = function(t) {
            return r.getSubmenuMode(t)
        }, a.hideDropdown = function(t) {
            r.hideSubmenuDropdown(t, !0)
        }, a.hideDropdowns = function() {
            r.hideSubmenuDropdowns()
        }, a.pauseDropdownHover = function(t) {
            r.pauseDropdownHover(t)
        }, a.resumeDropdownHover = function() {
            return r.resumeDropdownHover()
        }, a.on = function(t, e) {
            return r.addEvent(t, e)
        }, a.off = function(t) {
            return r.removeEvent(t)
        }, a.one = function(t, e) {
            return r.addEvent(t, e, !0)
        }, r.construct.apply(a, [e]), KTUtil.addResizeHandler((function() {
            n && a.reload()
        })), n = !0, a
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTMenu), document.addEventListener("click", (function(t) {
    var e;
    if (e = KTUtil.getByTagName("body")[0].querySelectorAll('.menu-nav .menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)[data-menu-toggle="click"]'))
        for (var a = 0, n = e.length; a < n; a++) {
            var i = e[a].closest(".menu-nav").parentNode;
            if (i) {
                var o = KTUtil.data(i).get("menu");
                if (!o) break;
                if (!o || "dropdown" !== o.getSubmenuMode()) break;
                t.target !== i && !1 === i.contains(t.target) && o.hideDropdowns()
            }
        }
}));
var KTOffcanvas = function(t, e) {
    var a = this,
        n = KTUtil.getById(t),
        i = KTUtil.getBody();
    if (n) {
        var o = {
                attrCustom: ""
            },
            l = {
                construct: function(t) {
                    return KTUtil.data(n).has("offcanvas") ? a = KTUtil.data(n).get("offcanvas") : (l.init(t), l.build(), KTUtil.data(n).set("offcanvas", a)), a
                },
                init: function(t) {
                    a.events = [], a.options = KTUtil.deepExtend({}, o, t), a.classBase = a.options.baseClass, a.attrCustom = a.options.attrCustom, a.classShown = a.classBase + "-on", a.classOverlay = a.classBase + "-overlay", a.target, a.state = KTUtil.hasClass(n, a.classShown) ? "shown" : "hidden"
                },
                build: function() {
                    if (a.options.toggleBy)
                        if ("string" == typeof a.options.toggleBy) KTUtil.addEvent(KTUtil.getById(a.options.toggleBy), "click", (function(t) {
                            t.preventDefault(), a.target = this, l.toggle()
                        }));
                        else if (a.options.toggleBy && a.options.toggleBy[0])
                        if (a.options.toggleBy[0].target)
                            for (var t in a.options.toggleBy) KTUtil.addEvent(KTUtil.getById(a.options.toggleBy[t].target), "click", (function(t) {
                                t.preventDefault(), a.target = this, l.toggle()
                            }));
                        else
                            for (var t in a.options.toggleBy) KTUtil.addEvent(KTUtil.getById(a.options.toggleBy[t]), "click", (function(t) {
                                t.preventDefault(), a.target = this, l.toggle()
                            }));
                    else a.options.toggleBy && a.options.toggleBy.target && KTUtil.addEvent(KTUtil.getById(a.options.toggleBy.target), "click", (function(t) {
                        t.preventDefault(), a.target = this, l.toggle()
                    }));
                    var e = KTUtil.getById(a.options.closeBy);
                    e && KTUtil.addEvent(e, "click", (function(t) {
                        t.preventDefault(), a.target = this, l.hide()
                    }))
                },
                isShown: function() {
                    return "shown" == a.state
                },
                toggle: function() {
                    l.eventTrigger("toggle"), "shown" == a.state ? l.hide() : l.show()
                },
                show: function() {
                    "shown" != a.state && (l.eventTrigger("beforeShow"), l.toggleClass("show"), KTUtil.attr(i, "data-offcanvas-" + a.classBase, "on"), KTUtil.addClass(n, a.classShown), a.attrCustom.length > 0 && KTUtil.attr(i, "data-offcanvas-" + a.classCustom, "on"), a.state = "shown", a.options.overlay && (a.overlay = KTUtil.insertAfter(document.createElement("DIV"), n), KTUtil.addClass(a.overlay, a.classOverlay), KTUtil.addEvent(a.overlay, "click", (function(t) {
                        t.preventDefault(), l.hide(a.target)
                    }))), l.eventTrigger("afterShow"))
                },
                hide: function() {
                    "hidden" != a.state && (l.eventTrigger("beforeHide"), l.toggleClass("hide"), KTUtil.removeAttr(i, "data-offcanvas-" + a.classBase), KTUtil.removeClass(n, a.classShown), a.attrCustom.length > 0 && KTUtil.removeAttr(i, "data-offcanvas-" + a.attrCustom), a.state = "hidden", a.options.overlay && a.overlay && KTUtil.remove(a.overlay), l.eventTrigger("afterHide"))
                },
                toggleClass: function(t) {
                    var e, n = KTUtil.attr(a.target, "id");
                    if (a.options.toggleBy && a.options.toggleBy[0] && a.options.toggleBy[0].target)
                        for (var i in a.options.toggleBy) a.options.toggleBy[i].target === n && (e = a.options.toggleBy[i]);
                    else a.options.toggleBy && a.options.toggleBy.target && (e = a.options.toggleBy);
                    if (e) {
                        var o = KTUtil.getById(e.target);
                        "show" === t && KTUtil.addClass(o, e.state), "hide" === t && KTUtil.removeClass(o, e.state)
                    }
                },
                eventTrigger: function(t, e) {
                    for (var n = 0; n < a.events.length; n++) {
                        var i = a.events[n];
                        if (i.name == t) {
                            if (1 != i.one) return i.handler.call(this, a, e);
                            if (0 == i.fired) return a.events[n].fired = !0, i.handler.call(this, a, e)
                        }
                    }
                },
                addEvent: function(t, e, n) {
                    a.events.push({
                        name: t,
                        handler: e,
                        one: n,
                        fired: !1
                    })
                }
            };
        return a.setDefaults = function(t) {
            o = t
        }, a.isShown = function() {
            return l.isShown()
        }, a.hide = function() {
            return l.hide()
        }, a.show = function() {
            return l.show()
        }, a.on = function(t, e) {
            return l.addEvent(t, e)
        }, a.one = function(t, e) {
            return l.addEvent(t, e, !0)
        }, l.construct.apply(a, [e]), !0, a
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTOffcanvas);
var KTScrolltop = function(t, e) {
    var a = this,
        n = KTUtil.getById(t),
        i = KTUtil.getBody();
    if (n) {
        var o = {
                offset: 300,
                speed: 6e3
            },
            l = {
                construct: function(t) {
                    return KTUtil.data(n).has("scrolltop") ? a = KTUtil.data(n).get("scrolltop") : (l.init(t), l.build(), KTUtil.data(n).set("scrolltop", a)), a
                },
                init: function(t) {
                    a.events = [], a.options = KTUtil.deepExtend({}, o, t)
                },
                build: function() {
                    window.addEventListener("scroll", (function() {
                        KTUtil.throttle(undefined, (function() {
                            l.handle()
                        }), 200)
                    })), KTUtil.addEvent(n, "click", l.scroll)
                },
                handle: function() {
                    KTUtil.getScrollTop() > a.options.offset ? !1 === i.hasAttribute("data-scrolltop") && i.setAttribute("data-scrolltop", "on") : !0 === i.hasAttribute("data-scrolltop") && i.removeAttribute("data-scrolltop")
                },
                scroll: function(t) {
                    t.preventDefault(), KTUtil.scrollTop(0, a.options.speed)
                },
                eventTrigger: function(t, e) {
                    for (var n = 0; n < a.events.length; n++) {
                        var i = a.events[n];
                        if (i.name == t) {
                            if (1 != i.one) return i.handler.call(this, a, e);
                            if (0 == i.fired) return a.events[n].fired = !0, i.handler.call(this, a, e)
                        }
                    }
                },
                addEvent: function(t, e, n) {
                    a.events.push({
                        name: t,
                        handler: e,
                        one: n,
                        fired: !1
                    })
                }
            };
        return a.setDefaults = function(t) {
            o = t
        }, a.on = function(t, e) {
            return l.addEvent(t, e)
        }, a.one = function(t, e) {
            return l.addEvent(t, e, !0)
        }, l.construct.apply(a, [e]), !0, a
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTScrolltop);
var KTToggle = function(t, e, a) {
    var n = this,
        i = t,
        o = e;
    if (i) {
        var l = {
                targetToggleMode: "class"
            },
            r = {
                construct: function(t) {
                    return KTUtil.data(i).has("toggle") ? n = KTUtil.data(i).get("toggle") : (r.init(t), r.build(), KTUtil.data(i).set("toggle", n)), n
                },
                init: function(t) {
                    n.element = i, n.events = [], n.options = KTUtil.deepExtend({}, l, t), n.target = o, n.targetState = n.options.targetState, n.toggleState = n.options.toggleState, "class" == n.options.targetToggleMode ? n.state = KTUtil.hasClasses(n.target, n.targetState) ? "on" : "off" : n.state = KTUtil.hasAttr(n.target, "data-" + n.targetState) ? KTUtil.attr(n.target, "data-" + n.targetState) : "off"
                },
                build: function() {
                    KTUtil.addEvent(i, "mouseup", r.toggle)
                },
                toggle: function(t) {
                    return r.eventTrigger("beforeToggle"), "off" == n.state ? r.toggleOn() : r.toggleOff(), r.eventTrigger("afterToggle"), t.preventDefault(), n
                },
                toggleOn: function() {
                    return r.eventTrigger("beforeOn"), "class" == n.options.targetToggleMode ? KTUtil.addClass(n.target, n.targetState) : KTUtil.attr(n.target, "data-" + n.targetState, "on"), n.toggleState && KTUtil.addClass(i, n.toggleState), n.state = "on", r.eventTrigger("afterOn"), r.eventTrigger("toggle"), n
                },
                toggleOff: function() {
                    return r.eventTrigger("beforeOff"), "class" == n.options.targetToggleMode ? KTUtil.removeClass(n.target, n.targetState) : KTUtil.removeAttr(n.target, "data-" + n.targetState), n.toggleState && KTUtil.removeClass(i, n.toggleState), n.state = "off", r.eventTrigger("afterOff"), r.eventTrigger("toggle"), n
                },
                eventTrigger: function(t) {
                    for (var e = 0; e < n.events.length; e++) {
                        var a = n.events[e];
                        if (a.name == t) {
                            if (1 != a.one) return a.handler.call(this, n);
                            if (0 == a.fired) return n.events[e].fired = !0, a.handler.call(this, n)
                        }
                    }
                },
                addEvent: function(t, e, a) {
                    return n.events.push({
                        name: t,
                        handler: e,
                        one: a,
                        fired: !1
                    }), n
                }
            };
        return n.setDefaults = function(t) {
            l = t
        }, n.getState = function() {
            return n.state
        }, n.toggle = function() {
            return r.toggle()
        }, n.toggleOn = function() {
            return r.toggleOn()
        }, n.toggleOff = function() {
            return r.toggleOff()
        }, n.on = function(t, e) {
            return r.addEvent(t, e)
        }, n.one = function(t, e) {
            return r.addEvent(t, e, !0)
        }, r.construct.apply(n, [a]), n
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTToggle), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest = function(t) {
        var e = this;
        if (!document.documentElement.contains(this)) return null;
        do {
            if (e.matches(t)) return e;
            e = e.parentElement
        } while (null !== e);
        return null
    })
    /**
     * ChildNode.remove() polyfill
     * https://gomakethings.com/removing-an-element-from-the-dom-the-es6-way/
     * @author Chris Ferdinandi
     * @license MIT
     */
    ,
    function(t) {
        for (var e = 0; e < t.length; e++) window[t[e]] && !("remove" in window[t[e]].prototype) && (window[t[e]].prototype.remove = function() {
            this.parentNode.removeChild(this)
        })
    }(["Element", "CharacterData", "DocumentType"]),
    function() {
        for (var t = 0, e = ["webkit", "moz"], a = 0; a < e.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[e[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[a] + "CancelAnimationFrame"] || window[e[a] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
            var a = (new Date).getTime(),
                n = Math.max(0, 16 - (a - t)),
                i = window.setTimeout((function() {
                    e(a + n)
                }), n);
            return t = a + n, i
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach((function(t) {
        t.hasOwnProperty("prepend") || Object.defineProperty(t, "prepend", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function() {
                var t = Array.prototype.slice.call(arguments),
                    e = document.createDocumentFragment();
                t.forEach((function(t) {
                    var a = t instanceof Node;
                    e.appendChild(a ? t : document.createTextNode(String(t)))
                })), this.insertBefore(e, this.firstChild)
            }
        })
    })), null == Element.prototype.getAttributeNames && (Element.prototype.getAttributeNames = function() {
        for (var t = this.attributes, e = t.length, a = new Array(e), n = 0; n < e; n++) a[n] = t[n].name;
        return a
    }), window.KTUtilElementDataStore = {}, window.KTUtilElementDataStoreID = 0, window.KTUtilDelegatedEventHandlers = {};
var KTUtil = function() {
    var t = [],
        e = {
            sm: 544,
            md: 768,
            lg: 992,
            xl: 1200
        },
        a = function() {
            window.addEventListener("resize", (function() {
                KTUtil.throttle(undefined, (function() {
                    ! function() {
                        for (var e = 0; e < t.length; e++) t[e].call()
                    }()
                }), 200)
            }))
        };
    return {
        init: function(t) {
            t && t.breakpoints && (e = t.breakpoints), a()
        },
        addResizeHandler: function(e) {
            t.push(e)
        },
        removeResizeHandler: function(e) {
            for (var a = 0; a < t.length; a++) e === t[a] && delete t[a]
        },
        runResizeHandlers: function() {
            _runResizeHandlers()
        },
        resize: function() {
            if ("function" == typeof Event) window.dispatchEvent(new Event("resize"));
            else {
                var t = window.document.createEvent("UIEvents");
                t.initUIEvent("resize", !0, !1, window, 0), window.dispatchEvent(t)
            }
        },
        getURLParam: function(t) {
            var e, a, n = window.location.search.substring(1).split("&");
            for (e = 0; e < n.length; e++)
                if ((a = n[e].split("="))[0] == t) return unescape(a[1]);
            return null
        },
        isMobileDevice: function() {
            var t = this.getViewPort().width < this.getBreakpoint("lg");
            return !1 === t && (t = null != navigator.userAgent.match(/iPad/i)), t
        },
        isDesktopDevice: function() {
            return !KTUtil.isMobileDevice()
        },
        getViewPort: function() {
            var t = window,
                e = "inner";
            return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
                width: t[e + "Width"],
                height: t[e + "Height"]
            }
        },
        isInResponsiveRange: function(t) {
            var e = this.getViewPort().width;
            return "general" == t || ("desktop" == t && e >= this.getBreakpoint("lg") + 1 || ("tablet" == t && e >= this.getBreakpoint("md") + 1 && e < this.getBreakpoint("lg") || ("mobile" == t && e <= this.getBreakpoint("md") || ("desktop-and-tablet" == t && e >= this.getBreakpoint("md") + 1 || ("tablet-and-mobile" == t && e <= this.getBreakpoint("lg") || "minimal-desktop-and-below" == t && e <= this.getBreakpoint("xl"))))))
        },
        isBreakpointUp: function(t) {
            return this.getViewPort().width >= this.getBreakpoint(t)
        },
        isBreakpointDown: function(t) {
            return this.getViewPort().width < this.getBreakpoint(t)
        },
        getUniqueID: function(t) {
            return t + Math.floor(Math.random() * (new Date).getTime())
        },
        getBreakpoint: function(t) {
            return e[t]
        },
        isset: function(t, e) {
            var a;
            if (-1 !== (e = e || "").indexOf("[")) throw new Error("Unsupported object path notation.");
            e = e.split(".");
            do {
                if (void 0 === t) return !1;
                if (a = e.shift(), !t.hasOwnProperty(a)) return !1;
                t = t[a]
            } while (e.length);
            return !0
        },
        getHighestZindex: function(t) {
            for (var e, a; t && t !== document;) {
                if (("absolute" === (e = KTUtil.css(t, "position")) || "relative" === e || "fixed" === e) && (a = parseInt(KTUtil.css(t, "z-index")), !isNaN(a) && 0 !== a)) return a;
                t = t.parentNode
            }
            return null
        },
        hasFixedPositionedParent: function(t) {
            for (; t && t !== document;) {
                if ("fixed" === KTUtil.css(t, "position")) return !0;
                t = t.parentNode
            }
            return !1
        },
        sleep: function(t) {
            for (var e = (new Date).getTime(), a = 0; a < 1e7 && !((new Date).getTime() - e > t); a++);
        },
        getRandomInt: function(t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t
        },
        isAngularVersion: function() {
            return void 0 !== window.Zone
        },
        deepExtend: function(t) {
            t = t || {};
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                if (a)
                    for (var n in a) a.hasOwnProperty(n) && ("[object Object]" !== Object.prototype.toString.call(a[n]) ? t[n] = a[n] : t[n] = KTUtil.deepExtend(t[n], a[n]))
            }
            return t
        },
        extend: function(t) {
            t = t || {};
            for (var e = 1; e < arguments.length; e++)
                if (arguments[e])
                    for (var a in arguments[e]) arguments[e].hasOwnProperty(a) && (t[a] = arguments[e][a]);
            return t
        },
        getById: function(t) {
            return "string" == typeof t ? document.getElementById(t) : t
        },
        getByTag: function(t) {
            return document.getElementsByTagName(t)
        },
        getByTagName: function(t) {
            return document.getElementsByTagName(t)
        },
        getByClass: function(t) {
            return document.getElementsByClassName(t)
        },
        getBody: function() {
            return document.getElementsByTagName("body")[0]
        },
        hasClasses: function(t, e) {
            if (t) {
                for (var a = e.split(" "), n = 0; n < a.length; n++)
                    if (0 == KTUtil.hasClass(t, KTUtil.trim(a[n]))) return !1;
                return !0
            }
        },
        hasClass: function(t, e) {
            if (t) return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
        },
        addClass: function(t, e) {
            if (t && void 0 !== e) {
                var a = e.split(" ");
                if (t.classList)
                    for (var n = 0; n < a.length; n++) a[n] && a[n].length > 0 && t.classList.add(KTUtil.trim(a[n]));
                else if (!KTUtil.hasClass(t, e))
                    for (var i = 0; i < a.length; i++) t.className += " " + KTUtil.trim(a[i])
            }
        },
        removeClass: function(t, e) {
            if (t && void 0 !== e) {
                var a = e.split(" ");
                if (t.classList)
                    for (var n = 0; n < a.length; n++) t.classList.remove(KTUtil.trim(a[n]));
                else if (KTUtil.hasClass(t, e))
                    for (var i = 0; i < a.length; i++) t.className = t.className.replace(new RegExp("\\b" + KTUtil.trim(a[i]) + "\\b", "g"), "")
            }
        },
        triggerCustomEvent: function(t, e, a) {
            var n;
            window.CustomEvent ? n = new CustomEvent(e, {
                detail: a
            }) : (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, a), t.dispatchEvent(n)
        },
        triggerEvent: function(t, e) {
            var a;
            if (t.ownerDocument) a = t.ownerDocument;
            else {
                if (9 != t.nodeType) throw new Error("Invalid node passed to fireEvent: " + t.id);
                a = t
            }
            if (t.dispatchEvent) {
                var n = "";
                switch (e) {
                    case "click":
                    case "mouseenter":
                    case "mouseleave":
                    case "mousedown":
                    case "mouseup":
                        n = "MouseEvents";
                        break;
                    case "focus":
                    case "change":
                    case "blur":
                    case "select":
                        n = "HTMLEvents";
                        break;
                    default:
                        throw "fireEvent: Couldn't find an event class for event '" + e + "'."
                }
                var i = "change" != e;
                (o = a.createEvent(n)).initEvent(e, i, !0), o.synthetic = !0, t.dispatchEvent(o, !0)
            } else if (t.fireEvent) {
                var o;
                (o = a.createEventObject()).synthetic = !0, t.fireEvent("on" + e, o)
            }
        },
        index: function(t) {
            for (var e = t.parentNode.children, a = 0; a < e.length; a++)
                if (e[a] == t) return a
        },
        trim: function(t) {
            return t.trim()
        },
        eventTriggered: function(t) {
            return !!t.currentTarget.dataset.triggered || (t.currentTarget.dataset.triggered = !0, !1)
        },
        remove: function(t) {
            t && t.parentNode && t.parentNode.removeChild(t)
        },
        find: function(t, e) {
            if (t = KTUtil.getById(t)) return t.querySelector(e)
        },
        findAll: function(t, e) {
            if (t = KTUtil.getById(t)) return t.querySelectorAll(e)
        },
        insertAfter: function(t, e) {
            return e.parentNode.insertBefore(t, e.nextSibling)
        },
        parents: function(t, e) {
            Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(t) {
                for (var e = (this.document || this.ownerDocument).querySelectorAll(t), a = e.length; --a >= 0 && e.item(a) !== this;);
                return a > -1
            });
            for (var a = []; t && t !== document; t = t.parentNode) e ? t.matches(e) && a.push(t) : a.push(t);
            return a
        },
        children: function(t, e, a) {
            if (t && t.childNodes) {
                for (var n = [], i = 0, o = t.childNodes.length; i < o; ++i) 1 == t.childNodes[i].nodeType && KTUtil.matches(t.childNodes[i], e, a) && n.push(t.childNodes[i]);
                return n
            }
        },
        child: function(t, e, a) {
            var n = KTUtil.children(t, e, a);
            return n ? n[0] : null
        },
        matches: function(t, e, a) {
            var n = Element.prototype,
                i = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function(t) {
                    return -1 !== [].indexOf.call(document.querySelectorAll(t), this)
                };
            return !(!t || !t.tagName) && i.call(t, e)
        },
        data: function(t) {
            return {
                set: function(e, a) {
                    t && (void 0 === t.customDataTag && (window.KTUtilElementDataStoreID++, t.customDataTag = window.KTUtilElementDataStoreID), void 0 === window.KTUtilElementDataStore[t.customDataTag] && (window.KTUtilElementDataStore[t.customDataTag] = {}), window.KTUtilElementDataStore[t.customDataTag][e] = a)
                },
                get: function(e) {
                    if (t) return void 0 === t.customDataTag ? null : this.has(e) ? window.KTUtilElementDataStore[t.customDataTag][e] : null
                },
                has: function(e) {
                    return !!t && (void 0 !== t.customDataTag && !(!window.KTUtilElementDataStore[t.customDataTag] || !window.KTUtilElementDataStore[t.customDataTag][e]))
                },
                remove: function(e) {
                    t && this.has(e) && delete window.KTUtilElementDataStore[t.customDataTag][e]
                }
            }
        },
        outerWidth: function(t, e) {
            var a;
            return !0 === e ? (a = parseFloat(t.offsetWidth), a += parseFloat(KTUtil.css(t, "margin-left")) + parseFloat(KTUtil.css(t, "margin-right")), parseFloat(a)) : a = parseFloat(t.offsetWidth)
        },
        offset: function(t) {
            var e, a;
            if (t) return t.getClientRects().length ? (e = t.getBoundingClientRect(), a = t.ownerDocument.defaultView, {
                top: e.top + a.pageYOffset,
                left: e.left + a.pageXOffset
            }) : {
                top: 0,
                left: 0
            }
        },
        height: function(t) {
            return KTUtil.css(t, "height")
        },
        outerHeight: function(t, e) {
            var a, n = t.offsetHeight;
            return void 0 !== e && !0 === e ? (a = getComputedStyle(t), n += parseInt(a.marginTop) + parseInt(a.marginBottom)) : n
        },
        visible: function(t) {
            return !(0 === t.offsetWidth && 0 === t.offsetHeight)
        },
        attr: function(t, e, a) {
            if (null != t) return void 0 === a ? t.getAttribute(e) : void t.setAttribute(e, a)
        },
        hasAttr: function(t, e) {
            if (null != t) return !!t.getAttribute(e)
        },
        removeAttr: function(t, e) {
            null != t && t.removeAttribute(e)
        },
        animate: function(t, e, a, n, i, o) {
            var l = {};
            if (l.linear = function(t, e, a, n) {
                    return a * t / n + e
                }, i = l.linear, "number" == typeof t && "number" == typeof e && "number" == typeof a && "function" == typeof n) {
                "function" != typeof o && (o = function() {});
                var r = window.requestAnimationFrame || function(t) {
                        window.setTimeout(t, 20)
                    },
                    s = e - t;
                n(t);
                var d = window.performance && window.performance.now ? window.performance.now() : +new Date;
                r((function l(c) {
                    var u = (c || +new Date) - d;
                    u >= 0 && n(i(u, t, s, a)), u >= 0 && u >= a ? (n(e), o()) : r(l)
                }))
            }
        },
        actualCss: function(t, e, a) {
            var n, i = "";
            if (t instanceof HTMLElement != !1) return t.getAttribute("kt-hidden-" + e) && !1 !== a ? parseFloat(t.getAttribute("kt-hidden-" + e)) : (i = t.style.cssText, t.style.cssText = "position: absolute; visibility: hidden; display: block;", "width" == e ? n = t.offsetWidth : "height" == e && (n = t.offsetHeight), t.style.cssText = i, t.setAttribute("kt-hidden-" + e, n), parseFloat(n))
        },
        actualHeight: function(t, e) {
            return KTUtil.actualCss(t, "height", e)
        },
        actualWidth: function(t, e) {
            return KTUtil.actualCss(t, "width", e)
        },
        getScroll: function(t, e) {
            return e = "scroll" + e, t == window || t == document ? self["scrollTop" == e ? "pageYOffset" : "pageXOffset"] || browserSupportsBoxModel && document.documentElement[e] || document.body[e] : t[e]
        },
        css: function(t, e, a) {
            if (t)
                if (void 0 !== a) t.style[e] = a;
                else {
                    var n = (t.ownerDocument || document).defaultView;
                    if (n && n.getComputedStyle) return e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), n.getComputedStyle(t, null).getPropertyValue(e);
                    if (t.currentStyle) return e = e.replace(/\-(\w)/g, (function(t, e) {
                        return e.toUpperCase()
                    })), a = t.currentStyle[e], /^\d+(em|pt|%|ex)?$/i.test(a) ? function(e) {
                        var a = t.style.left,
                            n = t.runtimeStyle.left;
                        return t.runtimeStyle.left = t.currentStyle.left, t.style.left = e || 0, e = t.style.pixelLeft + "px", t.style.left = a, t.runtimeStyle.left = n, e
                    }(a) : a
                }
        },
        slide: function(t, e, a, n, i) {
            if (!(!t || "up" == e && !1 === KTUtil.visible(t) || "down" == e && !0 === KTUtil.visible(t))) {
                a = a || 600;
                var o = KTUtil.actualHeight(t),
                    l = !1,
                    r = !1;
                KTUtil.css(t, "padding-top") && !0 !== KTUtil.data(t).has("slide-padding-top") && KTUtil.data(t).set("slide-padding-top", KTUtil.css(t, "padding-top")), KTUtil.css(t, "padding-bottom") && !0 !== KTUtil.data(t).has("slide-padding-bottom") && KTUtil.data(t).set("slide-padding-bottom", KTUtil.css(t, "padding-bottom")), KTUtil.data(t).has("slide-padding-top") && (l = parseInt(KTUtil.data(t).get("slide-padding-top"))), KTUtil.data(t).has("slide-padding-bottom") && (r = parseInt(KTUtil.data(t).get("slide-padding-bottom"))), "up" == e ? (t.style.cssText = "display: block; overflow: hidden;", l && KTUtil.animate(0, l, a, (function(e) {
                    t.style.paddingTop = l - e + "px"
                }), "linear"), r && KTUtil.animate(0, r, a, (function(e) {
                    t.style.paddingBottom = r - e + "px"
                }), "linear"), KTUtil.animate(0, o, a, (function(e) {
                    t.style.height = o - e + "px"
                }), "linear", (function() {
                    t.style.height = "", t.style.display = "none", "function" == typeof n && n()
                }))) : "down" == e && (t.style.cssText = "display: block; overflow: hidden;", l && KTUtil.animate(0, l, a, (function(e) {
                    t.style.paddingTop = e + "px"
                }), "linear", (function() {
                    t.style.paddingTop = ""
                })), r && KTUtil.animate(0, r, a, (function(e) {
                    t.style.paddingBottom = e + "px"
                }), "linear", (function() {
                    t.style.paddingBottom = ""
                })), KTUtil.animate(0, o, a, (function(e) {
                    t.style.height = e + "px"
                }), "linear", (function() {
                    t.style.height = "", t.style.display = "", t.style.overflow = "", "function" == typeof n && n()
                })))
            }
        },
        slideUp: function(t, e, a) {
            KTUtil.slide(t, "up", e, a)
        },
        slideDown: function(t, e, a) {
            KTUtil.slide(t, "down", e, a)
        },
        show: function(t, e) {
            void 0 !== t && (t.style.display = e || "block")
        },
        hide: function(t) {
            void 0 !== t && (t.style.display = "none")
        },
        addEvent: function(t, e, a, n) {
            null != t && t.addEventListener(e, a)
        },
        removeEvent: function(t, e, a) {
            null !== t && t.removeEventListener(e, a)
        },
        on: function(t, e, a, n) {
            if (e) {
                var i = KTUtil.getUniqueID("event");
                return window.KTUtilDelegatedEventHandlers[i] = function(a) {
                    for (var i = t.querySelectorAll(e), o = a.target; o && o !== t;) {
                        for (var l = 0, r = i.length; l < r; l++) o === i[l] && n.call(o, a);
                        o = o.parentNode
                    }
                }, KTUtil.addEvent(t, a, window.KTUtilDelegatedEventHandlers[i]), i
            }
        },
        off: function(t, e, a) {
            t && window.KTUtilDelegatedEventHandlers[a] && (KTUtil.removeEvent(t, e, window.KTUtilDelegatedEventHandlers[a]), delete window.KTUtilDelegatedEventHandlers[a])
        },
        one: function(t, e, a) {
            t.addEventListener(e, (function e(n) {
                return n.target && n.target.removeEventListener && n.target.removeEventListener(n.type, e), t && t.removeEventListener && n.currentTarget.removeEventListener(n.type, e), a(n)
            }))
        },
        hash: function(t) {
            var e, a = 0;
            if (0 === t.length) return a;
            for (e = 0; e < t.length; e++) a = (a << 5) - a + t.charCodeAt(e), a |= 0;
            return a
        },
        animateClass: function(t, e, a) {
            var n, i = {
                animation: "animationend",
                OAnimation: "oAnimationEnd",
                MozAnimation: "mozAnimationEnd",
                WebkitAnimation: "webkitAnimationEnd",
                msAnimation: "msAnimationEnd"
            };
            for (var o in i) void 0 !== t.style[o] && (n = i[o]);
            KTUtil.addClass(t, "animated " + e), KTUtil.one(t, n, (function() {
                KTUtil.removeClass(t, "animated " + e)
            })), a && KTUtil.one(t, n, a)
        },
        transitionEnd: function(t, e) {
            var a, n = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "mozTransitionEnd",
                WebkitTransition: "webkitTransitionEnd",
                msTransition: "msTransitionEnd"
            };
            for (var i in n) void 0 !== t.style[i] && (a = n[i]);
            KTUtil.one(t, a, e)
        },
        animationEnd: function(t, e) {
            var a, n = {
                animation: "animationend",
                OAnimation: "oAnimationEnd",
                MozAnimation: "mozAnimationEnd",
                WebkitAnimation: "webkitAnimationEnd",
                msAnimation: "msAnimationEnd"
            };
            for (var i in n) void 0 !== t.style[i] && (a = n[i]);
            KTUtil.one(t, a, e)
        },
        animateDelay: function(t, e) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) KTUtil.css(t, a[n] + "animation-delay", e)
        },
        animateDuration: function(t, e) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) KTUtil.css(t, a[n] + "animation-duration", e)
        },
        scrollTo: function(t, e, a) {
            a = a || 500;
            var n, i, o = t ? KTUtil.offset(t).top : 0,
                l = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            e && (l += e), n = l, i = o, KTUtil.animate(n, i, a, (function(t) {
                document.documentElement.scrollTop = t, document.body.parentNode.scrollTop = t, document.body.scrollTop = t
            }))
        },
        scrollTop: function(t, e) {
            KTUtil.scrollTo(null, t, e)
        },
        isArray: function(t) {
            return t && Array.isArray(t)
        },
        ready: function(t) {
            (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? t(): document.addEventListener("DOMContentLoaded", t)
        },
        isEmpty: function(t) {
            for (var e in t)
                if (t.hasOwnProperty(e)) return !1;
            return !0
        },
        numberString: function(t) {
            for (var e = (t += "").split("."), a = e[0], n = e.length > 1 ? "." + e[1] : "", i = /(\d+)(\d{3})/; i.test(a);) a = a.replace(i, "$1,$2");
            return a + n
        },
        detectIE: function() {
            var t = window.navigator.userAgent,
                e = t.indexOf("MSIE ");
            if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
            if (t.indexOf("Trident/") > 0) {
                var a = t.indexOf("rv:");
                return parseInt(t.substring(a + 3, t.indexOf(".", a)), 10)
            }
            var n = t.indexOf("Edge/");
            return n > 0 && parseInt(t.substring(n + 5, t.indexOf(".", n)), 10)
        },
        isRTL: function() {
            var t = KTUtil.getByTagName("html")[0];
            if (t) return "rtl" == KTUtil.attr(t, "direction")
        },
        scrollInit: function(t, e) {
            if (t) {
                e = KTUtil.deepExtend({}, {
                    wheelSpeed: .5,
                    swipeEasing: !0,
                    wheelPropagation: !1,
                    minScrollbarLength: 40,
                    maxScrollbarLength: 300,
                    suppressScrollX: !0
                }, e), a(), e.handleWindowResize && KTUtil.addResizeHandler((function() {
                    a()
                }))
            }

            function a() {
                var a, n, i = t.getAttributeNames();
                if (i.length > 0 && i.forEach((function(a) {
                        if (/^data-.*/g.test(a) && 0 == ["scroll", "height", "mobile-height"].includes(n)) {
                            var n = a.replace("data-", "").toLowerCase().replace(/(?:[\s-])\w/g, (function(t) {
                                return t.replace("-", "").toUpperCase()
                            }));
                            e[n] = KTUtil.filterBoolean(t.getAttribute(a))
                        }
                    })), !1 !== (n = e.height instanceof Function ? e.height.call() : !0 === KTUtil.isMobileDevice() && e.mobileHeight ? parseInt(e.mobileHeight) : e.height ? parseInt(e.height) : parseInt(KTUtil.css(t, "height"))))
                    if (n = parseInt(n), !e.mobileNativeScroll && !e.disableForMobile || !0 !== KTUtil.isMobileDevice())
                        if (n > 0 && KTUtil.css(t, "height", n + "px"), e.desktopNativeScroll) KTUtil.css(t, "overflow", "auto");
                        else {
                            "true" == KTUtil.attr(t, "data-window-scroll") && (e.windowScroll = !0), (a = KTUtil.data(t).get("ps")) ? a.update() : (KTUtil.css(t, "overflow", "hidden"), KTUtil.addClass(t, "scroll"), a = new PerfectScrollbar(t, e), KTUtil.data(t).set("ps", a));
                            var o = KTUtil.attr(t, "id");
                            if (!0 === e.rememberPosition && KTCookie && o) {
                                if (KTCookie.getCookie(o)) {
                                    var l = parseInt(KTCookie.getCookie(o));
                                    l > 0 && (t.scrollTop = l)
                                }
                                t.addEventListener("ps-scroll-y", (function() {
                                    KTCookie.setCookie(o, t.scrollTop)
                                }))
                            }
                        }
                else(a = KTUtil.data(t).get("ps")) ? (e.resetHeightOnDestroy ? KTUtil.css(t, "height", "auto") : (KTUtil.css(t, "overflow", "auto"), n > 0 && KTUtil.css(t, "height", n + "px")), a.destroy(), a = KTUtil.data(t).remove("ps")) : n > 0 && (KTUtil.css(t, "overflow", "auto"), KTUtil.css(t, "height", n + "px"));
                else KTUtil.scrollDestroy(t, !0)
            }
        },
        scrollUpdate: function(t) {
            var e = KTUtil.data(t).get("ps");
            e && e.update()
        },
        scrollUpdateAll: function(t) {
            for (var e = KTUtil.findAll(t, ".ps"), a = 0, n = e.length; a < n; a++) KTUtil.scrollUpdate(e[a])
        },
        scrollDestroy: function(t, e) {
            var a = KTUtil.data(t).get("ps");
            a && (a.destroy(), a = KTUtil.data(t).remove("ps")), t && e && (t.style.setProperty("overflow", ""), t.style.setProperty("height", ""))
        },
        filterBoolean: function(t) {
            return !0 === t || "true" === t || !1 !== t && "false" !== t && t
        },
        setHTML: function(t, e) {
            t.innerHTML = e
        },
        getHTML: function(t) {
            if (t) return t.innerHTML
        },
        getDocumentHeight: function() {
            var t = document.body,
                e = document.documentElement;
            return Math.max(t.scrollHeight, t.offsetHeight, e.clientHeight, e.scrollHeight, e.offsetHeight)
        },
        getScrollTop: function() {
            return (document.scrollingElement || document.documentElement).scrollTop
        },
        changeColor: function(t, e) {
            var a = !1;
            "#" == t[0] && (t = t.slice(1), a = !0);
            var n = parseInt(t, 16),
                i = (n >> 16) + e;
            i > 255 ? i = 255 : i < 0 && (i = 0);
            var o = (n >> 8 & 255) + e;
            o > 255 ? o = 255 : o < 0 && (o = 0);
            var l = (255 & n) + e;
            return l > 255 ? l = 255 : l < 0 && (l = 0), (a ? "#" : "") + (l | o << 8 | i << 16).toString(16)
        },
        throttle: function(t, e, a) {
            t || (t = setTimeout((function() {
                e(), t = void 0
            }), a))
        },
        debounce: function(t, e, a) {
            clearTimeout(t), t = setTimeout(e, a)
        },
        btnWait: function(t, e, a, n) {
            if (t && (void 0 !== n && !0 === n && KTUtil.attr(t, "disabled", !0), e && (KTUtil.addClass(t, e), KTUtil.attr(t, "wait-class", e)), a)) {
                var i = KTUtil.find(t, ".btn-caption");
                i ? (KTUtil.data(i).set("caption", KTUtil.getHTML(i)), KTUtil.setHTML(i, a)) : (KTUtil.data(t).set("caption", KTUtil.getHTML(t)), KTUtil.setHTML(t, a))
            }
        },
        btnRelease: function(t) {
            if (t) {
                KTUtil.removeAttr(t, "disabled"), KTUtil.hasAttr(t, "wait-class") && KTUtil.removeClass(t, KTUtil.attr(t, "wait-class"));
                var e = KTUtil.find(t, ".btn-caption");
                e && KTUtil.data(e).has("caption") ? KTUtil.setHTML(e, KTUtil.data(e).get("caption")) : KTUtil.data(t).has("caption") && KTUtil.setHTML(t, KTUtil.data(t).get("caption"))
            }
        },
        isOffscreen: function(t, e, a) {
            a = a || 0;
            var n = KTUtil.getViewPort().width,
                i = KTUtil.getViewPort().height,
                o = KTUtil.offset(t).top,
                l = KTUtil.outerHeight(t) + a,
                r = KTUtil.offset(t).left,
                s = KTUtil.outerWidth(t) + a;
            if ("bottom" == e) {
                if (i < o + l) return !0;
                if (i > o + 1.5 * l) return !0
            }
            if ("top" == e) {
                if (o < 0) return !0;
                if (o > l) return !0
            }
            return "left" == e && r < 0 || "right" == e && n < r + s
        }
    }
}();
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTUtil), KTUtil.ready((function() {
    "undefined" != typeof KTAppSettings ? KTUtil.init(KTAppSettings) : KTUtil.init()
}));
var KTWizard = function(t, e) {
    var a = this,
        n = KTUtil.getById(t);
    KTUtil.getBody();
    if (n) {
        var i = {
                startStep: 1,
                clickableSteps: !1
            },
            o = {
                construct: function(t) {
                    return KTUtil.data(n).has("wizard") ? a = KTUtil.data(n).get("wizard") : (o.init(t), o.build(), KTUtil.data(n).set("wizard", a)), a
                },
                init: function(t) {
                    a.element = n, a.events = [], a.options = KTUtil.deepExtend({}, i, t), a.steps = KTUtil.findAll(n, '[data-wizard-type="step"]'), a.btnNext = KTUtil.find(n, '[data-wizard-type="action-next"]'), a.btnPrev = KTUtil.find(n, '[data-wizard-type="action-prev"]'), a.btnSubmit = KTUtil.find(n, '[data-wizard-type="action-submit"]'), a.events = [], a.lastStep = 0, a.currentStep = 1, a.newStep = 0, a.stopped = !1, a.totalSteps = a.steps.length, a.options.startStep > 1 && o.goTo(a.options.startStep), o.updateUI()
                },
                build: function() {
                    KTUtil.addEvent(a.btnNext, "click", (function(t) {
                        t.preventDefault(), o.setNewStep(o.getNextStep()), !1 !== o.eventTrigger("change") && o.goTo(o.getNextStep())
                    })), KTUtil.addEvent(a.btnPrev, "click", (function(t) {
                        t.preventDefault(), o.setNewStep(o.getPrevStep()), !1 !== o.eventTrigger("change") && o.goTo(o.getPrevStep())
                    })), !0 === a.options.clickableSteps && KTUtil.on(n, '[data-wizard-type="step"]', "click", (function() {
                        var t = KTUtil.index(this) + 1;
                        t !== a.currentStep && (o.setNewStep(t), !1 !== o.eventTrigger("change") && o.goTo(t))
                    })), KTUtil.addEvent(a.btnSubmit, "click", (function(t) {
                        t.preventDefault(), o.eventTrigger("submit")
                    }))
                },
                goTo: function(t) {
                    if (!0 !== a.stopped) {
                        if (!(t === a.currentStep || t > a.totalSteps || t < 0)) return t = parseInt(t), a.lastStep = a.currentStep, a.currentStep = t, a.newStep = 0, o.updateUI(), o.eventTrigger("changed"), a
                    } else a.stopped = !1
                },
                stop: function() {
                    a.stopped = !0
                },
                resume: function() {
                    a.stopped = !1
                },
                isLastStep: function() {
                    return a.currentStep === a.totalSteps
                },
                isFirstStep: function() {
                    return 1 === a.currentStep
                },
                isBetweenStep: function() {
                    return !1 === o.isLastStep() && !1 === o.isFirstStep()
                },
                updateUI: function() {
                    var t = "",
                        e = a.currentStep - 1;
                    t = o.isLastStep() ? "last" : o.isFirstStep() ? "first" : "between", KTUtil.attr(a.element, "data-wizard-state", t);
                    var n = KTUtil.findAll(a.element, '[data-wizard-type="step"]');
                    if (n && n.length > 0)
                        for (var i = 0, l = n.length; i < l; i++) i == e ? KTUtil.attr(n[i], "data-wizard-state", "current") : i < e ? KTUtil.attr(n[i], "data-wizard-state", "done") : KTUtil.attr(n[i], "data-wizard-state", "pending");
                    var r = KTUtil.findAll(a.element, '[data-wizard-type="step-info"]');
                    if (r && r.length > 0)
                        for (i = 0, l = r.length; i < l; i++) i == e ? KTUtil.attr(r[i], "data-wizard-state", "current") : KTUtil.removeAttr(r[i], "data-wizard-state");
                    var s = KTUtil.findAll(a.element, '[data-wizard-type="step-content"]');
                    if (s && s.length > 0)
                        for (i = 0, l = s.length; i < l; i++) i == e ? KTUtil.attr(s[i], "data-wizard-state", "current") : KTUtil.removeAttr(s[i], "data-wizard-state")
                },
                getNextStep: function() {
                    return a.totalSteps >= a.currentStep + 1 ? a.currentStep + 1 : a.totalSteps
                },
                getPrevStep: function() {
                    return a.currentStep - 1 >= 1 ? a.currentStep - 1 : 1
                },
                getNewStep: function() {
                    return a.newStep
                },
                setNewStep: function(t) {
                    a.newStep = t
                },
                eventTrigger: function(t, e) {
                    for (var n = 0; n < a.events.length; n++) {
                        var i = a.events[n];
                        if (i.name == t) {
                            if (1 != i.one) return i.handler.call(this, a);
                            if (0 == i.fired) return a.events[n].fired = !0, i.handler.call(this, a)
                        }
                    }
                },
                addEvent: function(t, e, n) {
                    return a.events.push({
                        name: t,
                        handler: e,
                        one: n,
                        fired: !1
                    }), a
                }
            };
        return a.setDefaults = function(t) {
            i = t
        }, a.goNext = function() {
            return o.goTo(o.getNextStep())
        }, a.goPrev = function() {
            return o.goTo(o.getPrevStep())
        }, a.goLast = function() {
            return o.goTo(o.getLastStep())
        }, a.goFirst = function() {
            return o.goTo(o.getFirstStep())
        }, a.goTo = function(t) {
            return o.goTo(t)
        }, a.stop = function() {
            return o.stop()
        }, a.resume = function() {
            return o.resume()
        }, a.getStep = function() {
            return a.currentStep
        }, a.getNewStep = function() {
            return o.getNewStep()
        }, a.setNewStep = function(t) {
            o.setNewStep(t)
        }, a.isLastStep = function() {
            return o.isLastStep()
        }, a.isFirstStep = function() {
            return o.isFirstStep()
        }, a.on = function(t, e) {
            return o.addEvent(t, e)
        }, a.one = function(t, e) {
            return o.addEvent(t, e, !0)
        }, o.construct.apply(a, [e]), a
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTWizard),
    function(t) {
        var e = "KTDatatable",
            a = KTUtil,
            n = KTApp;
        if (void 0 === a) throw new Error("Util class is required and must be included before KTDatatable");
        t.fn.KTDatatable = function(i) {
            if (0 !== t(this).length) {
                var o = this;
                o.debug = !1, o.API = {
                    record: null,
                    value: null,
                    params: null
                };
                var l = {
                    isInit: !1,
                    cellOffset: 110,
                    iconOffset: 15,
                    stateId: "meta",
                    ajaxParams: {},
                    pagingObject: {},
                    init: function(e) {
                        var a, n = !1;
                        null === e.data.source && (l.extractTable(), n = !0), l.setupBaseDOM.call(), l.setupDOM(o.table), t(o).on("datatable-on-layout-updated", l.afterRender), o.debug && l.stateRemove(l.stateId), l.setDataSourceQuery(l.getOption("data.source.read.params.query")), t.each(l.getOption("extensions"), (function(e, a) {
                            "function" == typeof t.fn.KTDatatable[e] && ("object" != typeof a && (a = t.extend({}, a)), new t.fn.KTDatatable[e](o, a))
                        })), l.spinnerCallback(!0), "remote" !== e.data.type && "local" !== e.data.type || (!1 === e.data.saveState && l.stateRemove(l.stateId), "local" === e.data.type && "object" == typeof e.data.source && (o.dataSet = o.originalDataSet = l.dataMapCallback(e.data.source)), l.dataRender()), n && (t(o.tableHead).find("tr").remove(), t(o.tableFoot).find("tr").remove()), l.setHeadTitle(), l.getOption("layout.footer") && l.setHeadTitle(o.tableFoot), void 0 !== e.layout.header && !1 === e.layout.header && t(o.table).find("thead").remove(), void 0 !== e.layout.footer && !1 === e.layout.footer && t(o.table).find("tfoot").remove(), null !== e.data.type && "local" !== e.data.type || (l.setupCellField.call(), l.setupTemplateCell.call(), l.setupSubDatatable.call(), l.setupSystemColumn.call(), l.redraw());
                        var i = !1;
                        t(window).resize((function() {
                            t(this).width() !== a && (a = t(this).width(), l.fullRender()), i || (a = t(this).width(), i = !0)
                        })), t(o).height("");
                        var r = "";
                        return t(l.getOption("search.input")).on("keyup", (function(e) {
                            if (!l.getOption("search.onEnter") || 13 === e.which) {
                                var a = t(this).val();
                                r !== a && (l.search(a), r = a)
                            }
                        })), o
                    },
                    extractTable: function() {
                        var e = [],
                            n = t(o).find("tr:first-child th").get().map((function(a, n) {
                                var o = t(a).data("field"),
                                    l = t(a).data("title");
                                void 0 === o && (o = t(a).text().trim()), void 0 === l && (l = t(a).text().trim());
                                var r = {
                                    field: o,
                                    title: l
                                };
                                for (var s in i.columns) i.columns[s].field === o && (r = t.extend(!0, {}, i.columns[s], r));
                                return e.push(r), o
                            }));
                        i.columns = e;
                        var l = [],
                            r = [];
                        t(o).find("tr").each((function() {
                            t(this).find("td").length && l.push(t(this).prop("attributes"));
                            var e = {};
                            t(this).find("td").each((function(t, a) {
                                e[n[t]] = a.innerHTML.trim()
                            })), a.isEmpty(e) || r.push(e)
                        })), i.data.attr.rowProps = l, i.data.source = r
                    },
                    layoutUpdate: function() {
                        l.setupSubDatatable.call(), l.setupSystemColumn.call(), l.setupHover.call(), void 0 === i.detail && 1 === l.getDepth() && l.lockTable.call(), l.resetScroll(), l.isLocked() || (l.redraw.call(), l.isSubtable() || !0 !== l.getOption("rows.autoHide") || l.autoHide(), t(o.table).find(".datatable-row").css("height", "")), l.columnHide.call(), l.rowEvenOdd.call(), l.sorting.call(), l.scrollbar.call(), l.isInit || (l.dropdownFix(), t(o).trigger("datatable-on-init", {
                            table: t(o.wrap).attr("id"),
                            options: i
                        }), l.isInit = !0), t(o).trigger("datatable-on-layout-updated", {
                            table: t(o.wrap).attr("id")
                        })
                    },
                    dropdownFix: function() {
                        var e;
                        t("body").on("show.bs.dropdown", ".datatable .datatable-body", (function(a) {
                            e = t(a.target).find(".dropdown-menu"), t("body").append(e.detach()), e.css("display", "block"), e.position({
                                my: "right top",
                                at: "right bottom",
                                of: t(a.relatedTarget)
                            }), o.closest(".modal").length && e.css("z-index", "2000")
                        })).on("hide.bs.dropdown", ".datatable .datatable-body", (function(a) {
                            t(a.target).append(e.detach()), e.hide(), e.css("display", "")
                        })), t(window).on("resize", (function(t) {
                            void 0 !== e && e.hide()
                        }))
                    },
                    lockTable: function() {
                        var e = {
                            lockEnabled: !1,
                            init: function() {
                                e.lockEnabled = l.lockEnabledColumns(), 0 === e.lockEnabled.left.length && 0 === e.lockEnabled.right.length || e.enable()
                            },
                            enable: function() {
                                t(o.table).find("thead,tbody,tfoot").each((function() {
                                    var a = this;
                                    0 === t(this).find(".datatable-lock").length && t(this).ready((function() {
                                        ! function(a) {
                                            if (t(a).find(".datatable-lock").length > 0) l.log("Locked container already exist in: ", a);
                                            else if (0 !== t(a).find(".datatable-row").length) {
                                                var n = t("<div/>").addClass("datatable-lock datatable-lock-left"),
                                                    i = t("<div/>").addClass("datatable-lock datatable-lock-scroll"),
                                                    r = t("<div/>").addClass("datatable-lock datatable-lock-right");
                                                t(a).find(".datatable-row").each((function() {
                                                    var e = t("<tr/>").addClass("datatable-row").data("obj", t(this).data("obj")).appendTo(n),
                                                        a = t("<tr/>").addClass("datatable-row").data("obj", t(this).data("obj")).appendTo(i),
                                                        o = t("<tr/>").addClass("datatable-row").data("obj", t(this).data("obj")).appendTo(r);
                                                    t(this).find(".datatable-cell").each((function() {
                                                        var n = t(this).data("locked");
                                                        void 0 !== n ? (void 0 === n.left && !0 !== n || t(this).appendTo(e), void 0 !== n.right && t(this).appendTo(o)) : t(this).appendTo(a)
                                                    })), t(this).remove()
                                                })), e.lockEnabled.left.length > 0 && (t(o.wrap).addClass("datatable-lock"), t(n).appendTo(a)), (e.lockEnabled.left.length > 0 || e.lockEnabled.right.length > 0) && t(i).appendTo(a), e.lockEnabled.right.length > 0 && (t(o.wrap).addClass("datatable-lock"), t(r).appendTo(a))
                                            } else l.log("No row exist in: ", a)
                                        }(a)
                                    }))
                                }))
                            }
                        };
                        return e.init(), e
                    },
                    fullRender: function() {
                        t(o.tableHead).empty(), l.setHeadTitle(), l.getOption("layout.footer") && (t(o.tableFoot).empty(), l.setHeadTitle(o.tableFoot)), l.spinnerCallback(!0), t(o.wrap).removeClass("datatable-loaded"), l.insertData()
                    },
                    lockEnabledColumns: function() {
                        var e = t(window).width(),
                            n = i.columns,
                            o = {
                                left: [],
                                right: []
                            };
                        return t.each(n, (function(t, n) {
                            void 0 !== n.locked && (void 0 !== n.locked.left && a.getBreakpoint(n.locked.left) <= e && o.left.push(n.locked.left), void 0 !== n.locked.right && a.getBreakpoint(n.locked.right) <= e && o.right.push(n.locked.right))
                        })), o
                    },
                    afterRender: function(e, a) {
                        t(o).ready((function() {
                            l.isLocked() && l.redraw(), t(o.tableBody).css("visibility", ""), t(o.wrap).addClass("datatable-loaded"), l.spinnerCallback(!1)
                        }))
                    },
                    hoverTimer: 0,
                    isScrolling: !1,
                    setupHover: function() {
                        t(window).scroll((function(t) {
                            clearTimeout(l.hoverTimer), l.isScrolling = !0
                        })), t(o.tableBody).find(".datatable-cell").off("mouseenter", "mouseleave").on("mouseenter", (function() {
                            if (l.hoverTimer = setTimeout((function() {
                                    l.isScrolling = !1
                                }), 200), !l.isScrolling) {
                                var e = t(this).closest(".datatable-row").addClass("datatable-row-hover"),
                                    a = t(e).index() + 1;
                                t(e).closest(".datatable-lock").parent().find(".datatable-row:nth-child(" + a + ")").addClass("datatable-row-hover")
                            }
                        })).on("mouseleave", (function() {
                            var e = t(this).closest(".datatable-row").removeClass("datatable-row-hover"),
                                a = t(e).index() + 1;
                            t(e).closest(".datatable-lock").parent().find(".datatable-row:nth-child(" + a + ")").removeClass("datatable-row-hover")
                        }))
                    },
                    adjustLockContainer: function() {
                        if (!l.isLocked()) return 0;
                        var e = t(o.tableHead).width(),
                            a = t(o.tableHead).find(".datatable-lock-left").width(),
                            n = t(o.tableHead).find(".datatable-lock-right").width();
                        void 0 === a && (a = 0), void 0 === n && (n = 0);
                        var i = Math.floor(e - a - n);
                        return t(o.table).find(".datatable-lock-scroll").css("width", i), i
                    },
                    dragResize: function() {
                        var e, a, n = !1,
                            i = void 0;
                        t(o.tableHead).find(".datatable-cell").mousedown((function(o) {
                            i = t(this), n = !0, e = o.pageX, a = t(this).width(), t(i).addClass("datatable-cell-resizing")
                        })).mousemove((function(l) {
                            if (n) {
                                var r = t(i).index(),
                                    s = t(o.tableBody),
                                    d = t(i).closest(".datatable-lock");
                                if (d) {
                                    var c = t(d).index();
                                    s = t(o.tableBody).find(".datatable-lock").eq(c)
                                }
                                t(s).find(".datatable-row").each((function(n, i) {
                                    t(i).find(".datatable-cell").eq(r).width(a + (l.pageX - e)).children().width(a + (l.pageX - e))
                                })), t(i).children().css("width", a + (l.pageX - e))
                            }
                        })).mouseup((function() {
                            t(i).removeClass("datatable-cell-resizing"), n = !1
                        })), t(document).mouseup((function() {
                            t(i).removeClass("datatable-cell-resizing"), n = !1
                        }))
                    },
                    initHeight: function() {
                        if (i.layout.height && i.layout.scroll) {
                            var e = t(o.tableHead).find(".datatable-row").outerHeight(),
                                a = t(o.tableFoot).find(".datatable-row").outerHeight(),
                                n = i.layout.height;
                            e > 0 && (n -= e), a > 0 && (n -= a), n -= 2, t(o.tableBody).css("max-height", Math.floor(parseFloat(n)))
                        }
                    },
                    setupBaseDOM: function() {
                        o.initialDatatable = t(o).clone(), "TABLE" === t(o).prop("tagName") ? (o.table = t(o).removeClass("datatable").addClass("datatable-table"), 0 === t(o.table).parents(".datatable").length && (o.table.wrap(t("<div/>").addClass("datatable").addClass("datatable-" + i.layout.theme)), o.wrap = t(o.table).parent())) : (o.wrap = t(o).addClass("datatable").addClass("datatable-" + i.layout.theme), o.table = t("<table/>").addClass("datatable-table").appendTo(o)), void 0 !== i.layout.class && t(o.wrap).addClass(i.layout.class), t(o.table).removeClass("datatable-destroyed").css("display", "block"), void 0 === t(o).attr("id") && (l.setOption("data.saveState", !1), t(o.table).attr("id", a.getUniqueID("datatable-"))), l.getOption("layout.minHeight") && t(o.table).css("min-height", l.getOption("layout.minHeight")), l.getOption("layout.height") && t(o.table).css("max-height", l.getOption("layout.height")), null === i.data.type && t(o.table).css("width", "").css("display", ""), o.tableHead = t(o.table).find("thead"), 0 === t(o.tableHead).length && (o.tableHead = t("<thead/>").prependTo(o.table)), o.tableBody = t(o.table).find("tbody"), 0 === t(o.tableBody).length && (o.tableBody = t("<tbody/>").appendTo(o.table)), void 0 !== i.layout.footer && i.layout.footer && (o.tableFoot = t(o.table).find("tfoot"), 0 === t(o.tableFoot).length && (o.tableFoot = t("<tfoot/>").appendTo(o.table)))
                    },
                    setupCellField: function(e) {
                        void 0 === e && (e = t(o.table).children());
                        var a = i.columns;
                        t.each(e, (function(e, n) {
                            t(n).find(".datatable-row").each((function(e, n) {
                                t(n).find(".datatable-cell").each((function(e, n) {
                                    void 0 !== a[e] && t(n).data(a[e])
                                }))
                            }))
                        }))
                    },
                    setupTemplateCell: function(e) {
                        void 0 === e && (e = o.tableBody);
                        var a = i.columns;
                        t(e).find(".datatable-row").each((function(e, n) {
                            var i = t(n).data("obj");
                            if (void 0 !== i) {
                                var r = l.getOption("rows.callback");
                                "function" == typeof r && r(t(n), i, e);
                                var s = l.getOption("rows.beforeTemplate");
                                "function" == typeof s && s(t(n), i, e), void 0 === i && (i = {}, t(n).find(".datatable-cell").each((function(e, n) {
                                    var o = t.grep(a, (function(e, a) {
                                        return t(n).data("field") === e.field
                                    }))[0];
                                    void 0 !== o && (i[o.field] = t(n).text())
                                }))), t(n).find(".datatable-cell").each((function(n, r) {
                                    var s = t.grep(a, (function(e, a) {
                                        return t(r).data("field") === e.field
                                    }))[0];
                                    if (void 0 !== s && void 0 !== s.template) {
                                        var d = "";
                                        "string" == typeof s.template && (d = l.dataPlaceholder(s.template, i)), "function" == typeof s.template && (d = s.template(i, e, o)), "undefined" != typeof DOMPurify && (d = DOMPurify.sanitize(d));
                                        var c = document.createElement("span");
                                        c.innerHTML = d, t(r).html(c), void 0 !== s.overflow && (t(c).css("overflow", s.overflow), t(c).css("position", "relative"))
                                    }
                                }));
                                var d = l.getOption("rows.afterTemplate");
                                "function" == typeof d && d(t(n), i, e)
                            }
                        }))
                    },
                    setupSystemColumn: function() {
                        if (o.dataSet = o.dataSet || [], 0 !== o.dataSet.length) {
                            var e = i.columns;
                            t(o.tableBody).find(".datatable-row").each((function(a, n) {
                                t(n).find(".datatable-cell").each((function(a, n) {
                                    var i = t.grep(e, (function(e, a) {
                                        return t(n).data("field") === e.field
                                    }))[0];
                                    if (void 0 !== i) {
                                        var o = t(n).text();
                                        if (void 0 !== i.selector && !1 !== i.selector) {
                                            if (t(n).find('.checkbox [type="checkbox"]').length > 0) return;
                                            t(n).addClass("datatable-cell-check");
                                            var r = t("<label/>").addClass("checkbox checkbox-single").append(t("<input/>").attr("type", "checkbox").attr("value", o).on("click", (function() {
                                                t(this).is(":checked") ? l.setActive(this) : l.setInactive(this)
                                            }))).append("&nbsp;<span></span>");
                                            void 0 !== i.selector.class && t(r).addClass(i.selector.class), t(n).children().html(r)
                                        }
                                        if (void 0 !== i.subtable && i.subtable) {
                                            if (t(n).find(".datatable-toggle-subtable").length > 0) return;
                                            t(n).children().html(t("<a/>").addClass("datatable-toggle-subtable").attr("href", "#").attr("data-value", o).append(t("<i/>").addClass(l.getOption("layout.icons.rowDetail.collapse"))))
                                        }
                                    }
                                }))
                            }));
                            var a = function(a) {
                                var n = t.grep(e, (function(t, e) {
                                    return void 0 !== t.selector && !1 !== t.selector
                                }))[0];
                                if (void 0 !== n && void 0 !== n.selector && !1 !== n.selector) {
                                    var i = t(a).find('[data-field="' + n.field + '"]');
                                    if (t(i).find('.checkbox [type="checkbox"]').length > 0) return;
                                    t(i).addClass("datatable-cell-check");
                                    var o = t("<label/>").addClass("checkbox checkbox-single checkbox-all").append(t("<input/>").attr("type", "checkbox").on("click", (function() {
                                        t(this).is(":checked") ? l.setActiveAll(!0) : l.setActiveAll(!1)
                                    }))).append("&nbsp;<span></span>");
                                    void 0 !== n.selector.class && t(o).addClass(n.selector.class), t(i).children().html(o)
                                }
                            };
                            i.layout.header && a(t(o.tableHead).find(".datatable-row").first()), i.layout.footer && a(t(o.tableFoot).find(".datatable-row").first())
                        }
                    },
                    maxWidthList: {},
                    adjustCellsWidth: function() {
                        var e = t(o.tableBody).innerWidth() - l.iconOffset,
                            a = t(o.tableHead).find(".datatable-row:first-child").find(".datatable-cell").not(".datatable-toggle-detail").not(":hidden").length;
                        if (a > 0) {
                            e -= l.iconOffset * a;
                            var n = Math.floor(e / a);
                            n <= l.cellOffset && (n = l.cellOffset), t(o.table).find(".datatable-row").find(".datatable-cell").not(".datatable-toggle-detail").not(":hidden").each((function(e, a) {
                                var i = n,
                                    r = t(a).data("width");
                                if (void 0 !== r)
                                    if ("auto" === r) {
                                        var s = t(a).data("field");
                                        if (l.maxWidthList[s]) i = l.maxWidthList[s];
                                        else {
                                            var d = t(o.table).find('.datatable-cell[data-field="' + s + '"]');
                                            i = l.maxWidthList[s] = Math.max.apply(null, t(d).map((function() {
                                                return t(this).outerWidth()
                                            })).get())
                                        }
                                    } else i = r;
                                t(a).children().css("width", Math.ceil(i))
                            }))
                        }
                        return o
                    },
                    adjustCellsHeight: function() {
                        t.each(t(o.table).children(), (function(e, a) {
                            for (var n = t(a).find(".datatable-row").first().parent().find(".datatable-row").length, i = 1; i <= n; i++) {
                                var o = t(a).find(".datatable-row:nth-child(" + i + ")");
                                if (t(o).length > 0) {
                                    var l = Math.max.apply(null, t(o).map((function() {
                                        return t(this).outerHeight()
                                    })).get());
                                    t(o).css("height", Math.ceil(l))
                                }
                            }
                        }))
                    },
                    setupDOM: function(e) {
                        t(e).find("> thead").addClass("datatable-head"), t(e).find("> tbody").addClass("datatable-body"), t(e).find("> tfoot").addClass("datatable-foot"), t(e).find("tr").addClass("datatable-row"), t(e).find("tr > th, tr > td").addClass("datatable-cell"), t(e).find("tr > th, tr > td").each((function(e, a) {
                            0 === t(a).find("span").length && t(a).wrapInner(t("<span/>").css("width", l.cellOffset))
                        }))
                    },
                    scrollbar: function() {
                        var e = {
                            scrollable: null,
                            tableLocked: null,
                            initPosition: null,
                            init: function() {
                                var n = a.getViewPort().width;
                                if (i.layout.scroll) {
                                    t(o.wrap).addClass("datatable-scroll");
                                    var r = t(o.tableBody).find(".datatable-lock-scroll");
                                    t(r).find(".datatable-row").length > 0 && t(r).length > 0 ? (e.scrollHead = t(o.tableHead).find("> .datatable-lock-scroll > .datatable-row"), e.scrollFoot = t(o.tableFoot).find("> .datatable-lock-scroll > .datatable-row"), e.tableLocked = t(o.tableBody).find(".datatable-lock:not(.datatable-lock-scroll)"), l.getOption("layout.customScrollbar") && 10 != a.detectIE() && n > a.getBreakpoint("lg") ? e.initCustomScrollbar(r[0]) : e.initDefaultScrollbar(r)) : t(o.tableBody).find(".datatable-row").length > 0 && (e.scrollHead = t(o.tableHead).find("> .datatable-row"), e.scrollFoot = t(o.tableFoot).find("> .datatable-row"), l.getOption("layout.customScrollbar") && 10 != a.detectIE() && n > a.getBreakpoint("lg") ? e.initCustomScrollbar(o.tableBody) : e.initDefaultScrollbar(o.tableBody))
                                }
                            },
                            initDefaultScrollbar: function(a) {
                                e.initPosition = t(a).scrollLeft(), t(a).css("overflow-y", "auto").off().on("scroll", e.onScrolling), t(a).css("overflow-x", "auto")
                            },
                            onScrolling: function(n) {
                                var i = t(this).scrollLeft(),
                                    o = t(this).scrollTop();
                                a.isRTL() && (i -= e.initPosition), t(e.scrollHead).css("left", -i), t(e.scrollFoot).css("left", -i), t(e.tableLocked).each((function(e, a) {
                                    l.isLocked() && (o -= 1), t(a).css("top", -o)
                                }))
                            },
                            initCustomScrollbar: function(a) {
                                e.scrollable = a, l.initScrollbar(a), e.initPosition = t(a).scrollLeft(), t(a).off().on("scroll", e.onScrolling)
                            }
                        };
                        return e.init(), e
                    },
                    initScrollbar: function(e, n) {
                        if (e && e.nodeName) {
                            t(o.tableBody).css("overflow", "");
                            var i = t(e).data("ps");
                            a.hasClass(e, "ps") && void 0 !== i ? i.update() : (i = new PerfectScrollbar(e, Object.assign({}, {
                                wheelSpeed: .5,
                                swipeEasing: !0,
                                minScrollbarLength: 40,
                                maxScrollbarLength: 300,
                                suppressScrollX: l.getOption("rows.autoHide") && !l.isLocked()
                            }, n)), t(e).data("ps", i)), t(window).resize((function() {
                                i.update()
                            }))
                        }
                    },
                    setHeadTitle: function(e) {
                        void 0 === e && (e = o.tableHead), e = t(e)[0];
                        var n = i.columns,
                            r = e.getElementsByTagName("tr")[0],
                            s = e.getElementsByTagName("td");
                        void 0 === r && (r = document.createElement("tr"), e.appendChild(r)), t.each(n, (function(e, n) {
                            var i = s[e];
                            if (void 0 === i && (i = document.createElement("th"), r.appendChild(i)), void 0 !== n.title && (i.innerHTML = n.title, i.setAttribute("data-field", n.field), a.addClass(i, n.class), void 0 !== n.autoHide && (!0 !== n.autoHide ? i.setAttribute("data-autohide-disabled", n.autoHide) : i.setAttribute("data-autohide-enabled", n.autoHide)), t(i).data(n)), void 0 !== n.attr && t.each(n.attr, (function(t, e) {
                                    i.setAttribute(t, e)
                                })), void 0 !== n.textAlign) {
                                var l = void 0 !== o.textAlign[n.textAlign] ? o.textAlign[n.textAlign] : "";
                                a.addClass(i, l)
                            }
                        })), l.setupDOM(e)
                    },
                    dataRender: function(e) {
                        t(o.table).siblings(".datatable-pager").removeClass("datatable-paging-loaded");
                        var a = function() {
                                o.dataSet = o.dataSet || [], l.localDataUpdate();
                                var e = l.getDataSourceParam("pagination");
                                0 === e.perpage && (e.perpage = i.data.pageSize || 10), e.total = o.dataSet.length;
                                var a = Math.max(e.perpage * (e.page - 1), 0),
                                    n = Math.min(a + e.perpage, e.total);
                                return o.dataSet = t(o.dataSet).slice(a, n), e
                            },
                            n = function(e) {
                                var n = function(e, a) {
                                    t(e.pager).hasClass("datatable-paging-loaded") || (t(e.pager).remove(), e.init(a)), t(e.pager).off().on("datatable-on-goto-page", (function(n) {
                                        t(e.pager).remove(), e.init(a)
                                    }));
                                    var n = Math.max(a.perpage * (a.page - 1), 0),
                                        i = Math.min(n + a.perpage, a.total);
                                    l.localDataUpdate(), o.dataSet = t(o.dataSet).slice(n, i), l.insertData()
                                };
                                if (t(o.wrap).removeClass("datatable-error"), i.pagination)
                                    if (i.data.serverPaging && "local" !== i.data.type) {
                                        var r = l.getObject("meta", e || null);
                                        l.pagingObject = null !== r ? l.paging(r) : l.paging(a(), n)
                                    } else l.pagingObject = l.paging(a(), n);
                                else l.localDataUpdate();
                                l.insertData()
                            };
                        "local" === i.data.type || !1 === i.data.serverSorting && "sort" === e || !1 === i.data.serverFiltering && "search" === e ? setTimeout((function() {
                            l.setAutoColumns(), n()
                        })) : l.getData().done(n)
                    },
                    insertData: function() {
                        o.dataSet = o.dataSet || [];
                        var e = l.getDataSourceParam(),
                            n = e.pagination,
                            r = (Math.max(n.page, 1) - 1) * n.perpage,
                            s = Math.min(n.page, n.pages) * n.perpage,
                            d = {};
                        void 0 !== i.data.attr.rowProps && i.data.attr.rowProps.length && (d = i.data.attr.rowProps.slice(r, s));
                        var c = document.createElement("tbody");
                        c.style.visibility = "hidden";
                        var u = i.columns.length;
                        if (t.each(o.dataSet, (function(n, r) {
                                var s = document.createElement("tr");
                                s.setAttribute("data-row", n), t(s).data("obj", r), void 0 !== d[n] && t.each(d[n], (function() {
                                    s.setAttribute(this.name, this.value)
                                }));
                                for (var p = 0; p < u; p += 1) {
                                    var f = i.columns[p],
                                        g = [];
                                    if (l.getObject("sort.field", e) === f.field && g.push("datatable-cell-sorted"), void 0 !== f.textAlign) {
                                        var m = void 0 !== o.textAlign[f.textAlign] ? o.textAlign[f.textAlign] : "";
                                        g.push(m)
                                    }
                                    void 0 !== f.class && g.push(f.class);
                                    var h = document.createElement("td");
                                    a.addClass(h, g.join(" ")), h.setAttribute("data-field", f.field), void 0 !== f.autoHide && (!0 !== f.autoHide ? h.setAttribute("data-autohide-disabled", f.autoHide) : h.setAttribute("data-autohide-enabled", f.autoHide)), h.innerHTML = l.getObject(f.field, r), h.setAttribute("aria-label", l.getObject(f.field, r)), s.appendChild(h)
                                }
                                c.appendChild(s)
                            })), 0 === o.dataSet.length) {
                            var p = document.createElement("span");
                            a.addClass(p, "datatable-error"), p.innerHTML = l.getOption("translate.records.noRecords"), c.appendChild(p), t(o.wrap).addClass("datatable-error datatable-loaded"), l.spinnerCallback(!1)
                        }
                        t(o.tableBody).replaceWith(c), o.tableBody = c, l.setupDOM(o.table), l.setupCellField([o.tableBody]), l.setupTemplateCell(o.tableBody), l.layoutUpdate()
                    },
                    updateTableComponents: function() {
                        o.tableHead = t(o.table).children("thead").get(0), o.tableBody = t(o.table).children("tbody").get(0), o.tableFoot = t(o.table).children("tfoot").get(0)
                    },
                    getData: function() {
                        var e = {
                            dataType: "json",
                            method: "POST",
                            data: {},
                            timeout: l.getOption("data.source.read.timeout") || 3e4
                        };
                        if ("local" === i.data.type && (e.url = i.data.source), "remote" === i.data.type) {
                            var a = l.getDataSourceParam();
                            l.getOption("data.serverPaging") || delete a.pagination, l.getOption("data.serverSorting") || delete a.sort, e.data = t.extend({}, e.data, l.getOption("data.source.read.params"), a), "string" != typeof(e = t.extend({}, e, l.getOption("data.source.read"))).url && (e.url = l.getOption("data.source.read")), "string" != typeof e.url && (e.url = l.getOption("data.source"))
                        }
                        return t.ajax(e).done((function(e, a, n) {
                            o.lastResponse = e, o.dataSet = o.originalDataSet = l.dataMapCallback(e), l.setAutoColumns(), t(o).trigger("datatable-on-ajax-done", [o.dataSet])
                        })).fail((function(e, a, n) {
                            t(o).trigger("datatable-on-ajax-fail", [e]), t(o.tableBody).html(t("<span/>").addClass("datatable-error").html(l.getOption("translate.records.noRecords"))), t(o.wrap).addClass("datatable-error datatable-loaded"), l.spinnerCallback(!1)
                        })).always((function() {}))
                    },
                    paging: function(e, n) {
                        var i = {
                            meta: null,
                            pager: null,
                            paginateEvent: null,
                            pagerLayout: {
                                pagination: null,
                                info: null
                            },
                            callback: null,
                            init: function(e) {
                                i.meta = e, i.meta.page = parseInt(i.meta.page), i.meta.pages = parseInt(i.meta.pages), i.meta.perpage = parseInt(i.meta.perpage), i.meta.total = parseInt(i.meta.total), i.meta.pages = Math.max(Math.ceil(i.meta.total / i.meta.perpage), 1), i.meta.page > i.meta.pages && (i.meta.page = i.meta.pages), i.paginateEvent = l.getTablePrefix("paging"), i.pager = t(o.table).siblings(".datatable-pager"), t(i.pager).hasClass("datatable-paging-loaded") || (t(i.pager).remove(), 0 !== i.meta.pages && (l.setDataSourceParam("pagination", {
                                    page: i.meta.page,
                                    pages: i.meta.pages,
                                    perpage: i.meta.perpage,
                                    total: i.meta.total
                                }), i.callback = i.serverCallback, "function" == typeof n && (i.callback = n), i.addPaginateEvent(), i.populate(), i.meta.page = Math.max(i.meta.page || 1, i.meta.page), t(o).trigger(i.paginateEvent, i.meta), i.pagingBreakpoint.call(), t(window).resize(i.pagingBreakpoint)))
                            },
                            serverCallback: function(t, e) {
                                l.dataRender()
                            },
                            populate: function() {
                                if (o.dataSet = o.dataSet || [], 0 !== o.dataSet.length) {
                                    var e = l.getOption("layout.icons.pagination"),
                                        a = l.getOption("translate.toolbar.pagination.items.default");
                                    i.pager = t("<div/>").addClass("datatable-pager datatable-paging-loaded");
                                    var n = t("<ul/>").addClass("datatable-pager-nav my-2 mb-sm-0");
                                    i.pagerLayout.pagination = n, t("<li/>").append(t("<a/>").attr("title", a.first).addClass("datatable-pager-link datatable-pager-link-first").append(t("<i/>").addClass(e.first)).on("click", i.gotoMorePage).attr("data-page", 1)).appendTo(n), t("<li/>").append(t("<a/>").attr("title", a.prev).addClass("datatable-pager-link datatable-pager-link-prev").append(t("<i/>").addClass(e.prev)).on("click", i.gotoMorePage)).appendTo(n), t("<li/>").append(t("<input/>").attr("type", "text").addClass("datatable-pager-input form-control").attr("title", a.input).on("keyup", (function() {
                                        t(this).attr("data-page", Math.abs(t(this).val()))
                                    })).on("keypress", (function(t) {
                                        13 === t.which && i.gotoMorePage(t)
                                    }))).appendTo(n);
                                    var r = l.getOption("toolbar.items.pagination.pages.desktop.pagesNumber"),
                                        s = Math.ceil(i.meta.page / r) * r,
                                        d = s - r;
                                    s > i.meta.pages && (s = i.meta.pages), d < 0 && (d = 0);
                                    for (var c = d; c < (s || 1); c++) {
                                        var u = c + 1;
                                        t("<li/>").append(t("<a/>").addClass("datatable-pager-link datatable-pager-link-number").text(u).attr("data-page", u).attr("title", u).on("click", i.gotoPage)).appendTo(n)
                                    }
                                    t("<li/>").append(t("<a/>").attr("title", a.next).addClass("datatable-pager-link datatable-pager-link-next").append(t("<i/>").addClass(e.next)).on("click", i.gotoMorePage)).appendTo(n), t("<li/>").append(t("<a/>").attr("title", a.last).addClass("datatable-pager-link datatable-pager-link-last").append(t("<i/>").addClass(e.last)).on("click", i.gotoMorePage).attr("data-page", i.meta.pages)).appendTo(n), l.getOption("toolbar.items.info") && (i.pagerLayout.info = t("<div/>").addClass("datatable-pager-info my-2 mb-sm-0").append(t("<span/>").addClass("datatable-pager-detail"))), t.each(l.getOption("toolbar.layout"), (function(e, a) {
                                        t(i.pagerLayout[a]).appendTo(i.pager)
                                    }));
                                    var p = t("<select/>").addClass("selectpicker datatable-pager-size").attr("title", l.getOption("translate.toolbar.pagination.items.default.select")).attr("data-width", "60px").attr("data-container", "body").val(i.meta.perpage).on("change", i.updatePerpage).prependTo(i.pagerLayout.info),
                                        f = l.getOption("toolbar.items.pagination.pageSizeSelect");
                                    0 == f.length && (f = [5, 10, 20, 30, 50, 100]), t.each(f, (function(e, a) {
                                        var n = a; - 1 === a && (n = l.getOption("translate.toolbar.pagination.items.default.all")), t("<option/>").attr("value", a).html(n).appendTo(p)
                                    })), t(o).ready((function() {
                                        t(".selectpicker").selectpicker().on("hide.bs.select", (function() {
                                            t(this).closest(".bootstrap-select").removeClass("dropup")
                                        })).siblings(".dropdown-toggle").attr("title", l.getOption("translate.toolbar.pagination.items.default.select"))
                                    })), i.paste()
                                }
                            },
                            paste: function() {
                                t.each(t.unique(l.getOption("toolbar.placement")), (function(e, a) {
                                    "bottom" === a && t(i.pager).clone(!0).insertAfter(o.table), "top" === a && t(i.pager).clone(!0).addClass("datatable-pager-top").insertBefore(o.table)
                                }))
                            },
                            gotoMorePage: function(e) {
                                if (e.preventDefault(), "disabled" === t(this).attr("disabled")) return !1;
                                var a = t(this).attr("data-page");
                                return void 0 === a && (a = t(e.target).attr("data-page")), i.openPage(parseInt(a)), !1
                            },
                            gotoPage: function(e) {
                                e.preventDefault(), t(this).hasClass("datatable-pager-link-active") || i.openPage(parseInt(t(this).data("page")))
                            },
                            openPage: function(e) {
                                i.meta.page = parseInt(e), t(o).trigger(i.paginateEvent, i.meta), i.callback(i, i.meta), t(i.pager).trigger("datatable-on-goto-page", i.meta)
                            },
                            updatePerpage: function(e) {
                                e.preventDefault(), t(this).selectpicker("toggle"), i.pager = t(o.table).siblings(".datatable-pager").removeClass("datatable-paging-loaded"), e.originalEvent && (i.meta.perpage = parseInt(t(this).val())), t(i.pager).find("select.datatable-pager-size").val(i.meta.perpage).attr("data-selected", i.meta.perpage), l.setDataSourceParam("pagination", {
                                    page: i.meta.page,
                                    pages: i.meta.pages,
                                    perpage: i.meta.perpage,
                                    total: i.meta.total
                                }), t(i.pager).trigger("datatable-on-update-perpage", i.meta), t(o).trigger(i.paginateEvent, i.meta), i.callback(i, i.meta), i.updateInfo.call()
                            },
                            addPaginateEvent: function(e) {
                                t(o).off(i.paginateEvent).on(i.paginateEvent, (function(e, a) {
                                    l.spinnerCallback(!0), i.pager = t(o.table).siblings(".datatable-pager");
                                    var n = t(i.pager).find(".datatable-pager-nav");
                                    t(n).find(".datatable-pager-link-active").removeClass("datatable-pager-link-active"), t(n).find('.datatable-pager-link-number[data-page="' + a.page + '"]').addClass("datatable-pager-link-active"), t(n).find(".datatable-pager-link-prev").attr("data-page", Math.max(a.page - 1, 1)), t(n).find(".datatable-pager-link-next").attr("data-page", Math.min(a.page + 1, a.pages)), t(i.pager).each((function() {
                                        t(this).find('.datatable-pager-input[type="text"]').prop("value", a.page)
                                    })), l.setDataSourceParam("pagination", {
                                        page: i.meta.page,
                                        pages: i.meta.pages,
                                        perpage: i.meta.perpage,
                                        total: i.meta.total
                                    }), t(i.pager).find("select.datatable-pager-size").val(a.perpage).attr("data-selected", a.perpage), t(o.table).find('.checkbox > [type="checkbox"]').prop("checked", !1), t(o.table).find(".datatable-row-active").removeClass("datatable-row-active"), i.updateInfo.call(), i.pagingBreakpoint.call()
                                }))
                            },
                            updateInfo: function() {
                                var e = Math.max(i.meta.perpage * (i.meta.page - 1) + 1, 1),
                                    a = Math.min(e + i.meta.perpage - 1, i.meta.total);
                                t(i.pager).find(".datatable-pager-info").find(".datatable-pager-detail").html(l.dataPlaceholder(l.getOption("translate.toolbar.pagination.items.info"), {
                                    start: 0 === i.meta.total ? 0 : e,
                                    end: -1 === i.meta.perpage ? i.meta.total : a,
                                    pageSize: -1 === i.meta.perpage || i.meta.perpage >= i.meta.total ? i.meta.total : i.meta.perpage,
                                    total: i.meta.total
                                }))
                            },
                            pagingBreakpoint: function() {
                                var e = t(o.table).siblings(".datatable-pager").find(".datatable-pager-nav");
                                if (0 !== t(e).length) {
                                    var n = l.getCurrentPage(),
                                        r = t(e).find(".datatable-pager-input").closest("li");
                                    t(e).find("li").show(), t.each(l.getOption("toolbar.items.pagination.pages"), (function(o, s) {
                                        if (a.isInResponsiveRange(o)) {
                                            switch (o) {
                                                case "desktop":
                                                case "tablet":
                                                    Math.ceil(n / s.pagesNumber), s.pagesNumber, s.pagesNumber;
                                                    t(r).hide(), i.meta = l.getDataSourceParam("pagination"), i.paginationUpdate();
                                                    break;
                                                case "mobile":
                                                    t(r).show(), t(e).find(".datatable-pager-link-more-prev").closest("li").hide(), t(e).find(".datatable-pager-link-more-next").closest("li").hide(), t(e).find(".datatable-pager-link-number").closest("li").hide()
                                            }
                                            return !1
                                        }
                                    }))
                                }
                            },
                            paginationUpdate: function() {
                                var e = t(o.table).siblings(".datatable-pager").find(".datatable-pager-nav"),
                                    a = t(e).find(".datatable-pager-link-more-prev"),
                                    n = t(e).find(".datatable-pager-link-more-next"),
                                    r = t(e).find(".datatable-pager-link-first"),
                                    s = t(e).find(".datatable-pager-link-prev"),
                                    d = t(e).find(".datatable-pager-link-next"),
                                    c = t(e).find(".datatable-pager-link-last"),
                                    u = t(e).find(".datatable-pager-link-number"),
                                    p = Math.max(t(u).first().data("page") - 1, 1);
                                t(a).each((function(e, a) {
                                    t(a).attr("data-page", p)
                                })), 1 === p ? t(a).parent().hide() : t(a).parent().show();
                                var f = Math.min(t(u).last().data("page") + 1, i.meta.pages);
                                t(n).each((function(e, a) {
                                    t(n).attr("data-page", f).show()
                                })), f === i.meta.pages && f === t(u).last().data("page") ? t(n).parent().hide() : t(n).parent().show(), 1 === i.meta.page ? (t(r).attr("disabled", !0).addClass("datatable-pager-link-disabled"), t(s).attr("disabled", !0).addClass("datatable-pager-link-disabled")) : (t(r).removeAttr("disabled").removeClass("datatable-pager-link-disabled"), t(s).removeAttr("disabled").removeClass("datatable-pager-link-disabled")), i.meta.page === i.meta.pages ? (t(d).attr("disabled", !0).addClass("datatable-pager-link-disabled"), t(c).attr("disabled", !0).addClass("datatable-pager-link-disabled")) : (t(d).removeAttr("disabled").removeClass("datatable-pager-link-disabled"), t(c).removeAttr("disabled").removeClass("datatable-pager-link-disabled"));
                                var g = l.getOption("toolbar.items.pagination.navigation");
                                g.first || t(r).remove(), g.prev || t(s).remove(), g.next || t(d).remove(), g.last || t(c).remove(), g.more || (t(a).remove(), t(n).remove())
                            }
                        };
                        return i.init(e), i
                    },
                    columnHide: function() {
                        var e = a.getViewPort().width;
                        t.each(i.columns, (function(n, i) {
                            if (void 0 !== i.responsive || void 0 !== i.visible) {
                                var r = i.field,
                                    s = t.grep(t(o.table).find(".datatable-cell"), (function(e, a) {
                                        return r === t(e).data("field")
                                    }));
                                setTimeout((function() {
                                    !1 === l.getObject("visible", i) ? t(s).hide() : (a.getBreakpoint(l.getObject("responsive.hidden", i)) >= e ? t(s).hide() : t(s).show(), a.getBreakpoint(l.getObject("responsive.visible", i)) <= e ? t(s).show() : t(s).hide())
                                }))
                            }
                        }))
                    },
                    setupSubDatatable: function() {
                        var e = l.getOption("detail.content");
                        if ("function" == typeof e && !(t(o.table).find(".datatable-subtable").length > 0)) {
                            t(o.wrap).addClass("datatable-subtable"), i.columns[0].subtable = !0;
                            var a = function(a) {
                                    a.preventDefault();
                                    var n = t(this).closest(".datatable-row"),
                                        r = t(n).next(".datatable-row-subtable");
                                    0 === t(r).length && (r = t("<tr/>").addClass("datatable-row-subtable datatable-row-loading").hide().append(t("<td/>").addClass("datatable-subtable").attr("colspan", l.getTotalColumns())), t(n).after(r), t(n).hasClass("datatable-row-even") && t(r).addClass("datatable-row-subtable-even")), t(r).toggle();
                                    var s = t(r).find(".datatable-subtable"),
                                        d = t(this).closest("[data-field]:first-child").find(".datatable-toggle-subtable").data("value"),
                                        c = t(this).find("i").removeAttr("class");
                                    t(n).hasClass("datatable-row-subtable-expanded") ? (t(c).addClass(l.getOption("layout.icons.rowDetail.collapse")), t(n).removeClass("datatable-row-subtable-expanded"), t(o).trigger("datatable-on-collapse-subtable", [n])) : (t(c).addClass(l.getOption("layout.icons.rowDetail.expand")), t(n).addClass("datatable-row-subtable-expanded"), t(o).trigger("datatable-on-expand-subtable", [n])), 0 === t(s).find(".datatable").length && (t.map(o.dataSet, (function(t, e) {
                                        return d === t[i.columns[0].field] && (a.data = t, !0)
                                    })), a.detailCell = s, a.parentRow = n, a.subTable = s, e(a), t(s).children(".datatable").on("datatable-on-init", (function(e) {
                                        t(r).removeClass("datatable-row-loading")
                                    })), "local" === l.getOption("data.type") && t(r).removeClass("datatable-row-loading"))
                                },
                                n = i.columns;
                            t(o.tableBody).find(".datatable-row").each((function(e, i) {
                                t(i).find(".datatable-cell").each((function(e, i) {
                                    var o = t.grep(n, (function(e, a) {
                                        return t(i).data("field") === e.field
                                    }))[0];
                                    if (void 0 !== o) {
                                        var r = t(i).text();
                                        if (void 0 !== o.subtable && o.subtable) {
                                            if (t(i).find(".datatable-toggle-subtable").length > 0) return;
                                            t(i).html(t("<a/>").addClass("datatable-toggle-subtable").attr("href", "#").attr("data-value", r).attr("title", l.getOption("detail.title")).on("click", a).append(t("<i/>").css("width", t(i).data("width")).addClass(l.getOption("layout.icons.rowDetail.collapse"))))
                                        }
                                    }
                                }))
                            }))
                        }
                    },
                    dataMapCallback: function(t) {
                        var e = t;
                        return "function" == typeof l.getOption("data.source.read.map") ? l.getOption("data.source.read.map")(t) : (void 0 !== t && void 0 !== t.data && (e = t.data), e)
                    },
                    isSpinning: !1,
                    spinnerCallback: function(t, e) {
                        void 0 === e && (e = o);
                        var a = l.getOption("layout.spinner");
                        void 0 !== a && a && (t ? l.isSpinning || (void 0 !== a.message && !0 === a.message && (a.message = l.getOption("translate.records.processing")), l.isSpinning = !0, void 0 !== n && n.block(e, a)) : (l.isSpinning = !1, void 0 !== n && n.unblock(e)))
                    },
                    sortCallback: function(e, a, n) {
                        var i = n.type || "string",
                            o = n.format || "",
                            l = n.field;
                        return t(e).sort((function(n, r) {
                            var s = n[l],
                                d = r[l];
                            switch (i) {
                                case "date":
                                    if ("undefined" == typeof moment) throw new Error("Moment.js is required.");
                                    var c = moment(s, o).diff(moment(d, o));
                                    return "asc" === a ? c > 0 ? 1 : c < 0 ? -1 : 0 : c < 0 ? 1 : c > 0 ? -1 : 0;
                                case "number":
                                    return isNaN(parseFloat(s)) && null != s && (s = Number(s.replace(/[^0-9\.-]+/g, ""))), isNaN(parseFloat(d)) && null != d && (d = Number(d.replace(/[^0-9\.-]+/g, ""))), s = parseFloat(s), d = parseFloat(d), "asc" === a ? s > d ? 1 : s < d ? -1 : 0 : s < d ? 1 : s > d ? -1 : 0;
                                case "html":
                                    return t(e).sort((function(e, n) {
                                        return s = t(e[l]).text(), d = t(n[l]).text(), "asc" === a ? s > d ? 1 : s < d ? -1 : 0 : s < d ? 1 : s > d ? -1 : 0
                                    }));
                                case "string":
                                default:
                                    return "asc" === a ? s > d ? 1 : s < d ? -1 : 0 : s < d ? 1 : s > d ? -1 : 0
                            }
                        }))
                    },
                    log: function(t, e) {
                        void 0 === e && (e = ""), o.debug && console.log(t, e)
                    },
                    autoHide: function() {
                        var e = !1,
                            a = t(o.table).find("[data-autohide-enabled]");
                        a.length && (e = !0, a.hide());
                        var n = function(e) {
                            e.preventDefault();
                            var a = t(this).closest(".datatable-row"),
                                n = t(a).next();
                            if (t(n).hasClass("datatable-row-detail")) t(this).find("i").removeClass(l.getOption("layout.icons.rowDetail.expand")).addClass(l.getOption("layout.icons.rowDetail.collapse")), t(n).remove();
                            else {
                                t(this).find("i").removeClass(l.getOption("layout.icons.rowDetail.collapse")).addClass(l.getOption("layout.icons.rowDetail.expand"));
                                var o = t(a).find(".datatable-cell:hidden").clone().show();
                                n = t("<tr/>").addClass("datatable-row-detail").insertAfter(a);
                                var r = t("<td/>").addClass("datatable-detail").attr("colspan", l.getTotalColumns()).appendTo(n),
                                    s = t("<table/>");
                                t(o).each((function() {
                                    var e = t(this).data("field"),
                                        a = t.grep(i.columns, (function(t, a) {
                                            return e === t.field
                                        }))[0];
                                    void 0 !== a && !1 === a.visible || t(s).append(t('<tr class="datatable-row"></tr>').append(t('<td class="datatable-cell"></td>').append(t("<span/>").append(a.title))).append(this))
                                })), t(r).append(s)
                            }
                        };
                        setTimeout((function() {
                            t(o.table).find(".datatable-cell").show(), t(o.tableBody).each((function() {
                                for (var a = 0, n = t(this)[0].offsetWidth, r = t(this)[0].scrollWidth; n < r && r - n > l.cellOffset && a < i.columns.length;) t(o.table).find(".datatable-row").each((function(a) {
                                    var n = t(this).find(".datatable-cell:not(:hidden):not([data-autohide-disabled])").last();
                                    n.length && (t(n).hide(), e = !0)
                                })), a++, n = t(this)[0].offsetWidth, r = t(this)[0].scrollWidth
                            })), e && t(o.tableBody).find(".datatable-row").each((function() {
                                0 === t(this).find(".datatable-toggle-detail").length && t(this).prepend(t("<td/>").addClass("datatable-cell datatable-toggle-detail").append(t("<a/>").addClass("datatable-toggle-detail").attr("href", "").on("click", n).append('<i class="' + l.getOption("layout.icons.rowDetail.collapse") + '"></i>'))), 0 === t(o.tableHead).find(".datatable-toggle-detail").length ? (t(o.tableHead).find(".datatable-row").first().prepend('<th class="datatable-cell datatable-toggle-detail"><span></span></th>'), t(o.tableFoot).find(".datatable-row").first().prepend('<th class="datatable-cell datatable-toggle-detail"><span></span></th>')) : t(o.tableHead).find(".datatable-toggle-detail").find("span")
                            }))
                        })), l.adjustCellsWidth.call()
                    },
                    setAutoColumns: function() {
                        l.getOption("data.autoColumns") && (t.each(o.dataSet[0], (function(e, a) {
                            0 === t.grep(i.columns, (function(t, a) {
                                return e === t.field
                            })).length && i.columns.push({
                                field: e,
                                title: e
                            })
                        })), t(o.tableHead).find(".datatable-row").remove(), l.setHeadTitle(), l.getOption("layout.footer") && (t(o.tableFoot).find(".datatable-row").remove(), l.setHeadTitle(o.tableFoot)))
                    },
                    isLocked: function() {
                        var t = l.lockEnabledColumns();
                        return t.left.length > 0 || t.right.length > 0
                    },
                    isSubtable: function() {
                        return a.hasClass(o.wrap[0], "datatable-subtable") || !1
                    },
                    getExtraSpace: function(e) {
                        return parseInt(t(e).css("paddingRight")) + parseInt(t(e).css("paddingLeft")) + (parseInt(t(e).css("marginRight")) + parseInt(t(e).css("marginLeft"))) + Math.ceil(t(e).css("border-right-width").replace("px", ""))
                    },
                    dataPlaceholder: function(e, a) {
                        var n = e;
                        return t.each(a, (function(t, e) {
                            n = n.replace("{{" + t + "}}", e)
                        })), n
                    },
                    getTableId: function(e) {
                        void 0 === e && (e = "");
                        var a = t(o).attr("id");
                        return void 0 === a && (a = t(o).attr("class").split(" ")[0]), a + e
                    },
                    getTablePrefix: function(t) {
                        return void 0 !== t && (t = "-" + t), l.getTableId() + "-" + l.getDepth() + t
                    },
                    getDepth: function() {
                        var e = 0,
                            a = o.table;
                        do {
                            a = t(a).parents(".datatable-table"), e++
                        } while (t(a).length > 0);
                        return e
                    },
                    stateKeep: function(t, e) {
                        t = l.getTablePrefix(t), !1 !== l.getOption("data.saveState") && localStorage && localStorage.setItem(t, JSON.stringify(e))
                    },
                    stateGet: function(t, e) {
                        if (t = l.getTablePrefix(t), !1 !== l.getOption("data.saveState")) {
                            var a = null;
                            return localStorage && (a = localStorage.getItem(t)), null != a ? JSON.parse(a) : void 0
                        }
                    },
                    stateUpdate: function(e, a) {
                        var n = l.stateGet(e);
                        null == n && (n = {}), l.stateKeep(e, t.extend({}, n, a))
                    },
                    stateRemove: function(t) {
                        t = l.getTablePrefix(t), localStorage && localStorage.removeItem(t)
                    },
                    getTotalColumns: function(e) {
                        return void 0 === e && (e = o.tableBody), t(e).find(".datatable-row").first().find(".datatable-cell").length
                    },
                    getOneRow: function(e, a, n) {
                        void 0 === n && (n = !0);
                        var i = t(e).find(".datatable-row:not(.datatable-row-detail):nth-child(" + a + ")");
                        return n && (i = i.find(".datatable-cell")), i
                    },
                    sortColumn: function(e, a, n) {
                        void 0 === a && (a = "asc"), void 0 === n && (n = !1);
                        var i = t(e).index(),
                            l = t(o.tableBody).find(".datatable-row"),
                            r = t(e).closest(".datatable-lock").index(); - 1 !== r && (l = t(o.tableBody).find(".datatable-lock:nth-child(" + (r + 1) + ")").find(".datatable-row"));
                        var s = t(l).parent();
                        t(l).sort((function(e, o) {
                            var l = t(e).find("td:nth-child(" + i + ")").text(),
                                r = t(o).find("td:nth-child(" + i + ")").text();
                            return n && (l = parseInt(l), r = parseInt(r)), "asc" === a ? l > r ? 1 : l < r ? -1 : 0 : l < r ? 1 : l > r ? -1 : 0
                        })).appendTo(s)
                    },
                    sorting: function() {
                        var e = {
                            init: function() {
                                i.sortable && (t(o.tableHead).find(".datatable-cell:not(.datatable-cell-check)").addClass("datatable-cell-sort").off("click").on("click", e.sortClick), e.setIcon())
                            },
                            setIcon: function() {
                                var e = l.getDataSourceParam("sort");
                                if (!t.isEmptyObject(e)) {
                                    var a = l.getColumnByField(e.field);
                                    if (void 0 !== a && !(void 0 !== a.sortable && !1 === a.sortable || void 0 !== a.selector && !0 === a.selector)) {
                                        var n = t(o.tableHead).find('.datatable-cell[data-field="' + e.field + '"]').attr("data-sort", e.sort),
                                            i = t(n).find("span"),
                                            r = t(i).find("i"),
                                            s = l.getOption("layout.icons.sort");
                                        t(r).length > 0 ? t(r).removeAttr("class").addClass(s[e.sort]) : t(i).append(t("<i/>").addClass(s[e.sort])), t(n).addClass("datatable-cell-sorted")
                                    }
                                }
                            },
                            sortClick: function(n) {
                                var r = l.getDataSourceParam("sort"),
                                    s = t(this).data("field"),
                                    d = l.getColumnByField(s);
                                if (void 0 !== d && (void 0 === d.sortable || !1 !== d.sortable) && (void 0 === d.selector || !0 !== d.selector) && (t(o.tableHead).find("th").removeClass("datatable-cell-sorted"), a.addClass(this, "datatable-cell-sorted"), t(o.tableHead).find(".datatable-cell > span > i").remove(), i.sortable)) {
                                    l.spinnerCallback(!0);
                                    var c = "desc";
                                    l.getObject("field", r) === s && (c = l.getObject("sort", r)), r = {
                                        field: s,
                                        sort: c = void 0 === c || "desc" === c ? "asc" : "desc"
                                    }, l.setDataSourceParam("sort", r), e.setIcon(), setTimeout((function() {
                                        l.dataRender("sort"), t(o).trigger("datatable-on-sort", r)
                                    }), 300)
                                }
                            }
                        };
                        e.init()
                    },
                    localDataUpdate: function() {
                        var e = l.getDataSourceParam();
                        void 0 === o.originalDataSet && (o.originalDataSet = o.dataSet);
                        var a = l.getObject("sort.field", e),
                            n = l.getObject("sort.sort", e),
                            i = l.getColumnByField(a);
                        if (void 0 !== i && !0 !== l.getOption("data.serverSorting") ? "function" == typeof i.sortCallback ? o.dataSet = i.sortCallback(o.originalDataSet, n, i) : o.dataSet = l.sortCallback(o.originalDataSet, n, i) : o.dataSet = o.originalDataSet, "object" == typeof e.query && !l.getOption("data.serverFiltering")) {
                            e.query = e.query || {};
                            var r = function(t) {
                                    for (var e in t)
                                        if (t.hasOwnProperty(e))
                                            if ("string" == typeof t[e]) {
                                                if (t[e].toLowerCase() == s || -1 !== t[e].toLowerCase().indexOf(s)) return !0
                                            } else if ("number" == typeof t[e]) {
                                        if (t[e] === s) return !0
                                    } else if ("object" == typeof t[e] && r(t[e])) return !0;
                                    return !1
                                },
                                s = t(l.getOption("search.input")).val();
                            void 0 !== s && "" !== s && (s = s.toLowerCase(), o.dataSet = t.grep(o.dataSet, r), delete e.query[l.getGeneralSearchKey()]), t.each(e.query, (function(t, a) {
                                "" === a && delete e.query[t]
                            })), o.dataSet = l.filterArray(o.dataSet, e.query), o.dataSet = o.dataSet.filter((function() {
                                return !0
                            }))
                        }
                        return o.dataSet
                    },
                    filterArray: function(e, a, n) {
                        if ("object" != typeof e) return [];
                        if (void 0 === n && (n = "AND"), "object" != typeof a) return e;
                        if (n = n.toUpperCase(), -1 === t.inArray(n, ["AND", "OR", "NOT"])) return [];
                        var i = Object.keys(a).length,
                            o = [];
                        return t.each(e, (function(e, r) {
                            var s = r,
                                d = 0;
                            t.each(a, (function(t, e) {
                                e = e instanceof Array ? e : [e];
                                var a = l.getObject(t, s);
                                if (void 0 !== a && a) {
                                    var n = a.toString().toLowerCase();
                                    e.forEach((function(t, e) {
                                        t.toString().toLowerCase() != n && -1 === n.indexOf(t.toString().toLowerCase()) || d++
                                    }))
                                }
                            })), ("AND" == n && d == i || "OR" == n && d > 0 || "NOT" == n && 0 == d) && (o[e] = r)
                        })), e = o
                    },
                    resetScroll: function() {
                        void 0 === i.detail && 1 === l.getDepth() && (t(o.table).find(".datatable-row").css("left", 0), t(o.table).find(".datatable-lock").css("top", 0), t(o.tableBody).scrollTop(0))
                    },
                    getColumnByField: function(e) {
                        var a;
                        if (void 0 !== e) return t.each(i.columns, (function(t, n) {
                            if (e === n.field) return a = n, !1
                        })), a
                    },
                    getDefaultSortColumn: function() {
                        var e;
                        return t.each(i.columns, (function(a, n) {
                            if (void 0 !== n.sortable && -1 !== t.inArray(n.sortable, ["asc", "desc"])) return e = {
                                sort: n.sortable,
                                field: n.field
                            }, !1
                        })), e
                    },
                    getHiddenDimensions: function(e, a) {
                        var n = {
                                position: "absolute",
                                visibility: "hidden",
                                display: "block"
                            },
                            i = {
                                width: 0,
                                height: 0,
                                innerWidth: 0,
                                innerHeight: 0,
                                outerWidth: 0,
                                outerHeight: 0
                            },
                            o = t(e).parents().addBack().not(":visible");
                        a = "boolean" == typeof a && a;
                        var l = [];
                        return o.each((function() {
                            var t = {};
                            for (var e in n) t[e] = this.style[e], this.style[e] = n[e];
                            l.push(t)
                        })), i.width = t(e).width(), i.outerWidth = t(e).outerWidth(a), i.innerWidth = t(e).innerWidth(), i.height = t(e).height(), i.innerHeight = t(e).innerHeight(), i.outerHeight = t(e).outerHeight(a), o.each((function(t) {
                            var e = l[t];
                            for (var a in n) this.style[a] = e[a]
                        })), i
                    },
                    getGeneralSearchKey: function() {
                        var e = t(l.getOption("search.input"));
                        return l.getOption("search.key") || t(e).prop("name")
                    },
                    getObject: function(t, e) {
                        return t.split(".").reduce((function(t, e) {
                            return null !== t && void 0 !== t[e] ? t[e] : null
                        }), e)
                    },
                    extendObj: function(t, e, a) {
                        var n = e.split("."),
                            i = 0;
                        return function t(e) {
                            var o = n[i++];
                            void 0 !== e[o] && null !== e[o] ? "object" != typeof e[o] && "function" != typeof e[o] && (e[o] = {}) : e[o] = {}, i === n.length ? e[o] = a : t(e[o])
                        }(t), t
                    },
                    rowEvenOdd: function() {
                        t(o.tableBody).find(".datatable-row").removeClass("datatable-row-even"), t(o.wrap).hasClass("datatable-subtable") ? t(o.tableBody).find(".datatable-row:not(.datatable-row-detail):even").addClass("datatable-row-even") : t(o.tableBody).find(".datatable-row:nth-child(even)").addClass("datatable-row-even")
                    },
                    timer: 0,
                    redraw: function() {
                        return l.adjustCellsWidth.call(), l.isLocked() && (l.scrollbar(), l.resetScroll(), l.adjustCellsHeight.call()), l.adjustLockContainer.call(), l.initHeight.call(), o
                    },
                    load: function() {
                        return l.reload(), o
                    },
                    reload: function() {
                        return function(t, e) {
                            clearTimeout(l.timer), l.timer = setTimeout(t, e)
                        }((function() {
                            i.data.serverFiltering || l.localDataUpdate(), l.dataRender(), t(o).trigger("datatable-on-reloaded")
                        }), l.getOption("search.delay")), o
                    },
                    getRecord: function(e) {
                        return void 0 === o.tableBody && (o.tableBody = t(o.table).children("tbody")), t(o.tableBody).find(".datatable-cell:first-child").each((function(a, n) {
                            if (e == t(n).text()) {
                                var i = t(n).closest(".datatable-row").index() + 1;
                                return o.API.record = o.API.value = l.getOneRow(o.tableBody, i), o
                            }
                        })), o
                    },
                    getColumn: function(e) {
                        return l.setSelectedRecords(), o.API.value = t(o.API.record).find('[data-field="' + e + '"]'), o
                    },
                    destroy: function() {
                        t(o).parent().find(".datatable-pager").remove();
                        var e = t(o.initialDatatable).addClass("datatable-destroyed").show();
                        return t(o).replaceWith(e), t(o = e).trigger("datatable-on-destroy"), l.isInit = !1, e = null, o.dataSet = null, o.originalDataSet = null, o.tableHead = null, o.tableBody = null, o.table = null, o.wrap = null, o.API = {
                            record: null,
                            value: null,
                            params: null
                        }, l.ajaxParams = {}, l.pagingObject = {}, l.nodeTr = [], l.nodeTd = [], l.nodeCols = [], l.recentNode = [], e
                    },
                    sort: function(e, a) {
                        a = void 0 === a ? "asc" : a, l.spinnerCallback(!0);
                        var n = {
                            field: e,
                            sort: a
                        };
                        return l.setDataSourceParam("sort", n), setTimeout((function() {
                            l.dataRender("sort"), t(o).trigger("datatable-on-sort", n), t(o.tableHead).find(".datatable-cell > span > i").remove()
                        }), 300), o
                    },
                    getValue: function() {
                        return t(o.API.value).text()
                    },
                    setActive: function(e) {
                        "string" == typeof e && (e = t(o.tableBody).find('.checkbox-single > [type="checkbox"][value="' + e + '"]')), t(e).prop("checked", !0);
                        var a = [];
                        t(e).each((function(e, n) {
                            t(n).closest("tr").addClass("datatable-row-active");
                            var i = t(n).attr("value");
                            void 0 !== i && a.push(i)
                        })), t(o).trigger("datatable-on-check", [a])
                    },
                    setInactive: function(e) {
                        "string" == typeof e && (e = t(o.tableBody).find('.checkbox-single > [type="checkbox"][value="' + e + '"]')), t(e).prop("checked", !1);
                        var a = [];
                        t(e).each((function(e, n) {
                            t(n).closest("tr").removeClass("datatable-row-active");
                            var i = t(n).attr("value");
                            void 0 !== i && a.push(i)
                        })), t(o).trigger("datatable-on-uncheck", [a])
                    },
                    setActiveAll: function(e) {
                        var a = t(o.table).find("> tbody, > thead").find("tr").not(".datatable-row-subtable").find('.datatable-cell-check [type="checkbox"]');
                        e ? l.setActive(a) : l.setInactive(a)
                    },
                    setSelectedRecords: function() {
                        return o.API.record = t(o.tableBody).find(".datatable-row-active"), o
                    },
                    getSelectedRecords: function() {
                        return l.setSelectedRecords(), o.API.record = o.rows(".datatable-row-active").nodes(), o.API.record
                    },
                    getOption: function(t) {
                        return l.getObject(t, i)
                    },
                    setOption: function(t, e) {
                        i = l.extendObj(i, t, e)
                    },
                    search: function(e, a) {
                        void 0 !== a && (a = t.makeArray(a)), n = function() {
                            var n = l.getDataSourceQuery();
                            if (void 0 === a && void 0 !== e) {
                                var r = l.getGeneralSearchKey();
                                n[r] = e
                            }
                            "object" == typeof a && (t.each(a, (function(t, a) {
                                n[a] = e
                            })), t.each(n, (function(e, a) {
                                ("" === a || t.isEmptyObject(a)) && delete n[e]
                            }))), l.setDataSourceQuery(n), o.setDataSourceParam("pagination", Object.assign({}, o.getDataSourceParam("pagination"), {
                                page: 1
                            })), i.data.serverFiltering || l.localDataUpdate(), l.dataRender("search")
                        }, r = l.getOption("search.delay"), clearTimeout(l.timer), l.timer = setTimeout(n, r);
                        var n, r
                    },
                    setDataSourceParam: function(e, a) {
                        o.API.params = t.extend({}, {
                            pagination: {
                                page: 1,
                                perpage: l.getOption("data.pageSize")
                            },
                            sort: l.getDefaultSortColumn(),
                            query: {}
                        }, o.API.params, l.stateGet(l.stateId)), o.API.params = l.extendObj(o.API.params, e, a), l.stateKeep(l.stateId, o.API.params)
                    },
                    getDataSourceParam: function(e) {
                        return o.API.params = t.extend({}, {
                            pagination: {
                                page: 1,
                                perpage: l.getOption("data.pageSize")
                            },
                            sort: l.getDefaultSortColumn(),
                            query: {}
                        }, o.API.params, l.stateGet(l.stateId)), "string" == typeof e ? l.getObject(e, o.API.params) : o.API.params
                    },
                    getDataSourceQuery: function() {
                        return l.getDataSourceParam("query") || {}
                    },
                    setDataSourceQuery: function(t) {
                        l.setDataSourceParam("query", t)
                    },
                    getCurrentPage: function() {
                        return t(o.table).siblings(".datatable-pager").last().find(".datatable-pager-nav").find(".datatable-pager-link.datatable-pager-link-active").data("page") || 1
                    },
                    getPageSize: function() {
                        return t(o.table).siblings(".datatable-pager").last().find("select.datatable-pager-size").val() || 10
                    },
                    getTotalRows: function() {
                        return o.API.params.pagination.total
                    },
                    getDataSet: function() {
                        return o.originalDataSet
                    },
                    nodeTr: [],
                    nodeTd: [],
                    nodeCols: [],
                    recentNode: [],
                    table: function() {
                        if (void 0 !== o.table) return o.table
                    },
                    row: function(e) {
                        return l.rows(e), l.nodeTr = l.recentNode = t(l.nodeTr).first(), o
                    },
                    rows: function(e) {
                        return l.isLocked() ? l.nodeTr = l.recentNode = t(o.tableBody).find(e).filter(".datatable-lock-scroll > .datatable-row") : l.nodeTr = l.recentNode = t(o.tableBody).find(e).filter(".datatable-row"), o
                    },
                    column: function(e) {
                        return l.nodeCols = l.recentNode = t(o.tableBody).find(".datatable-cell:nth-child(" + (e + 1) + ")"), o
                    },
                    columns: function(e) {
                        var a = o.table;
                        l.nodeTr === l.recentNode && (a = l.nodeTr);
                        var n = t(a).find('.datatable-cell[data-field="' + e + '"]');
                        return n.length > 0 ? l.nodeCols = l.recentNode = n : l.nodeCols = l.recentNode = t(a).find(e).filter(".datatable-cell"), o
                    },
                    cell: function(e) {
                        return l.cells(e), l.nodeTd = l.recentNode = t(l.nodeTd).first(), o
                    },
                    cells: function(e) {
                        var a = t(o.tableBody).find(".datatable-cell");
                        return void 0 !== e && (a = t(a).filter(e)), l.nodeTd = l.recentNode = a, o
                    },
                    remove: function() {
                        return t(l.nodeTr.length) && l.nodeTr === l.recentNode && t(l.nodeTr).remove(), l.layoutUpdate(), o
                    },
                    visible: function(e) {
                        if (t(l.recentNode.length)) {
                            var a = l.lockEnabledColumns();
                            if (l.recentNode === l.nodeCols) {
                                var n = l.recentNode.index();
                                if (l.isLocked()) {
                                    var o = t(l.recentNode).closest(".datatable-lock-scroll").length;
                                    o ? n += a.left.length + 1 : t(l.recentNode).closest(".datatable-lock-right").length && (n += a.left.length + o + 1)
                                }
                            }
                            e ? (l.recentNode === l.nodeCols && delete i.columns[n].visible, t(l.recentNode).show()) : (l.recentNode === l.nodeCols && l.setOption("columns." + n + ".visible", !1), t(l.recentNode).hide()), l.columnHide(), l.redraw()
                        }
                    },
                    nodes: function() {
                        return l.recentNode
                    },
                    dataset: function() {
                        return o
                    },
                    gotoPage: function(t) {
                        void 0 !== l.pagingObject && (l.isInit = !0, l.pagingObject.openPage(t))
                    }
                };
                if (t.each(l, (function(t, e) {
                        o[t] = e
                    })), void 0 !== i)
                    if ("string" == typeof i) {
                        var r = i;
                        void 0 !== (o = t(this).data(e)) && (i = o.options, l[r].apply(this, Array.prototype.slice.call(arguments, 1)))
                    } else o.data(e) || t(this).hasClass("datatable-loaded") || (o.dataSet = null, o.textAlign = {
                        left: "datatable-cell-left",
                        center: "datatable-cell-center",
                        right: "datatable-cell-right"
                    }, i = t.extend(!0, {}, t.fn.KTDatatable.defaults, i), o.options = i, l.init.apply(this, [i]), t(o.wrap).data(e, o));
                else void 0 === (o = t(this).data(e)) && t.error("KTDatatable not initialized"), i = o.options;
                return o
            }
            console.warn("No KTDatatable element exist.")
        }, t.fn.KTDatatable.defaults = {
            data: {
                type: "local",
                source: null,
                pageSize: 10,
                saveState: !0,
                serverPaging: !1,
                serverFiltering: !1,
                serverSorting: !1,
                autoColumns: !1,
                attr: {
                    rowProps: []
                }
            },
            layout: {
                theme: "default",
                class: "datatable-primary",
                scroll: !1,
                height: null,
                minHeight: null,
                footer: !1,
                header: !0,
                customScrollbar: !0,
                spinner: {
                    overlayColor: "#000000",
                    opacity: 0,
                    type: "loader",
                    state: "primary",
                    message: !0
                },
                icons: {
                    sort: {
                        asc: "flaticon2-arrow-up",
                        desc: "flaticon2-arrow-down"
                    },
                    pagination: {
                        next: "flaticon2-next",
                        prev: "flaticon2-back",
                        first: "flaticon2-fast-back",
                        last: "flaticon2-fast-next",
                        more: "flaticon-more-1"
                    },
                    rowDetail: {
                        expand: "fa fa-caret-down",
                        collapse: "fa fa-caret-right"
                    }
                }
            },
            sortable: !0,
            resizable: !1,
            filterable: !1,
            pagination: !0,
            editable: !1,
            columns: [],
            search: {
                onEnter: !1,
                input: null,
                delay: 400,
                key: null
            },
            rows: {
                callback: function() {},
                beforeTemplate: function() {},
                afterTemplate: function() {},
                autoHide: !0
            },
            toolbar: {
                layout: ["pagination", "info"],
                placement: ["bottom"],
                items: {
                    pagination: {
                        type: "default",
                        pages: {
                            desktop: {
                                layout: "default",
                                pagesNumber: 5
                            },
                            tablet: {
                                layout: "default",
                                pagesNumber: 3
                            },
                            mobile: {
                                layout: "compact"
                            }
                        },
                        navigation: {
                            prev: !0,
                            next: !0,
                            first: !0,
                            last: !0,
                            more: !1
                        },
                        pageSizeSelect: []
                    },
                    info: !0
                }
            },
            translate: {
                records: {
                    processing: "Please wait...",
                    noRecords: "No records found"
                },
                toolbar: {
                    pagination: {
                        items: {
                            default: {
                                first: "First",
                                prev: "Previous",
                                next: "Next",
                                last: "Last",
                                more: "More pages",
                                input: "Page number",
                                select: "Select page size",
                                all: "all"
                            },
                            info: "Showing {{start}} - {{end}} of {{total}}"
                        }
                    }
                }
            },
            extensions: {}
        }
    }(jQuery),
    function(t) {
        t.fn.KTDatatable = t.fn.KTDatatable || {}, t.fn.KTDatatable.checkbox = function(e, a) {
            var n = {
                selectedAllRows: !1,
                selectedRows: [],
                unselectedRows: [],
                init: function() {
                    n.selectorEnabled() && (e.setDataSourceParam(a.vars.selectedAllRows, !1), e.stateRemove("checkbox"), a.vars.requestIds && e.setDataSourceParam(a.vars.requestIds, !0), t(e).on("datatable-on-reloaded", (function() {
                        e.stateRemove("checkbox"), e.setDataSourceParam(a.vars.selectedAllRows, !1), n.selectedAllRows = !1, n.selectedRows = [], n.unselectedRows = []
                    })), n.selectedAllRows = e.getDataSourceParam(a.vars.selectedAllRows), t(e).on("datatable-on-layout-updated", (function(a, i) {
                        i.table == t(e.wrap).attr("id") && e.ready((function() {
                            n.initVars(), n.initEvent(), n.initSelect()
                        }))
                    })), t(e).on("datatable-on-check", (function(t, a) {
                        a.forEach((function(t) {
                            n.selectedRows.push(t), n.unselectedRows = n.remove(n.unselectedRows, t)
                        }));
                        var i = {};
                        i.selectedRows = n.selectedRows.filter(n.unique), i.unselectedRows = n.unselectedRows.filter(n.unique), e.stateKeep("checkbox", i)
                    })), t(e).on("datatable-on-uncheck", (function(t, a) {
                        a.forEach((function(t) {
                            n.unselectedRows.push(t), n.selectedRows = n.remove(n.selectedRows, t)
                        }));
                        var i = {};
                        i.selectedRows = n.selectedRows.filter(n.unique), i.unselectedRows = n.unselectedRows.filter(n.unique), i.unselectedRows = n.unselectedRows.filter(n.unique), e.stateKeep("checkbox", i)
                    })))
                },
                initEvent: function() {
                    t(e.tableHead).find('.checkbox-all > [type="checkbox"]').click((function(i) {
                        if (n.selectedRows = n.unselectedRows = [], e.stateRemove("checkbox"), n.selectedAllRows = !!t(this).is(":checked"), !a.vars.requestIds) {
                            t(this).is(":checked") && (n.selectedRows = t.makeArray(t(e.tableBody).find('.checkbox-single > [type="checkbox"]').map((function(e, a) {
                                return t(a).val()
                            }))));
                            var o = {};
                            o.selectedRows = n.selectedRows.filter(n.unique), e.stateKeep("checkbox", o)
                        }
                        e.setDataSourceParam(a.vars.selectedAllRows, n.selectedAllRows), t(e).trigger("datatable-on-click-checkbox", [t(this)])
                    })), t(e.tableBody).find('.checkbox-single > [type="checkbox"]').click((function(i) {
                        var o = t(this).val();
                        t(this).is(":checked") ? (n.selectedRows.push(o), n.unselectedRows = n.remove(n.unselectedRows, o)) : (n.unselectedRows.push(o), n.selectedRows = n.remove(n.selectedRows, o)), !a.vars.requestIds && n.selectedRows.length < 1 && t(e.tableHead).find('.checkbox-all > [type="checkbox"]').prop("checked", !1);
                        var l = {};
                        l.selectedRows = n.selectedRows.filter(n.unique), l.unselectedRows = n.unselectedRows.filter(n.unique), e.stateKeep("checkbox", l), t(e).trigger("datatable-on-click-checkbox", [t(this)])
                    }))
                },
                unique: function(t, e, a) {
                    return a.indexOf(t) === e
                },
                initSelect: function() {
                    n.selectedAllRows && a.vars.requestIds ? (e.hasClass("datatable-error") || t(e.tableHead).find('.checkbox-all > [type="checkbox"]').prop("checked", !0), e.setActiveAll(!0), n.unselectedRows.forEach((function(t) {
                        e.setInactive(t)
                    }))) : (n.selectedRows.forEach((function(t) {
                        e.setActive(t)
                    })), !e.hasClass("datatable-error") && t(e.tableBody).find('.checkbox-single > [type="checkbox"]').not(":checked").length < 1 && t(e.tableHead).find('.checkbox-all > [type="checkbox"]').prop("checked", !0))
                },
                selectorEnabled: function() {
                    return t.grep(e.options.columns, (function(t, e) {
                        return t.selector || !1
                    }))[0]
                },
                initVars: function() {
                    var t = e.stateGet("checkbox");
                    void 0 !== t && (n.selectedRows = t.selectedRows || [], n.unselectedRows = t.unselectedRows || [])
                },
                getSelectedId: function(t) {
                    if (n.initVars(), n.selectedAllRows && a.vars.requestIds) {
                        void 0 === t && (t = a.vars.rowIds);
                        var i = e.getObject(t, e.lastResponse) || [];
                        return i.length > 0 && n.unselectedRows.forEach((function(t) {
                            i = n.remove(i, parseInt(t))
                        })), i.filter(n.unique)
                    }
                    return n.selectedRows.filter(n.unique)
                },
                remove: function(t, e) {
                    return t.filter((function(t) {
                        return t !== e
                    }))
                }
            };
            return e.checkbox = function() {
                return n
            }, "object" == typeof a && (a = t.extend(!0, {}, t.fn.KTDatatable.checkbox.default, a), n.init.apply(this, [a])), e
        }, t.fn.KTDatatable.checkbox.default = {
            vars: {
                selectedAllRows: "selectedAllRows",
                requestIds: "requestIds",
                rowIds: "meta.rowIds"
            }
        }
    }(jQuery);
var defaults = {
    layout: {
        icons: {
            pagination: {
                next: "flaticon2-next",
                prev: "flaticon2-back",
                first: "flaticon2-fast-back",
                last: "flaticon2-fast-next",
                more: "flaticon-more-1"
            },
            rowDetail: {
                expand: "fa fa-caret-down",
                collapse: "fa fa-caret-right"
            }
        }
    }
};
KTUtil.isRTL() && (defaults = {
    layout: {
        icons: {
            pagination: {
                next: "flaticon2-back",
                prev: "flaticon2-next",
                first: "flaticon2-fast-next",
                last: "flaticon2-fast-back"
            },
            rowDetail: {
                collapse: "fa fa-caret-down",
                expand: "fa fa-caret-right"
            }
        }
    }
}), $.extend(!0, $.fn.KTDatatable.defaults, defaults), KTUtil.ready((function() {
    "undefined" != typeof KTLayoutHeader && KTLayoutHeader.init("kt_header", "kt_header_mobile"), "undefined" != typeof KTLayoutHeaderMenu && KTLayoutHeaderMenu.init("kt_header_menu", "kt_header_menu_wrapper"), "undefined" != typeof KTLayoutHeaderTopbar && KTLayoutHeaderTopbar.init("kt_header_mobile_topbar_toggle"), "undefined" != typeof KTLayoutBrand && KTLayoutBrand.init("kt_brand"), void 0 !== KTLayoutAside && KTLayoutAside.init("kt_aside"), void 0 !== KTLayoutAsideToggle && KTLayoutAsideToggle.init("kt_aside_toggle"), void 0 !== KTLayoutAsideMenu && KTLayoutAsideMenu.init("kt_aside_menu"), void 0 !== KTLayoutSubheader && KTLayoutSubheader.init("kt_subheader"), void 0 !== KTLayoutContent && KTLayoutContent.init("kt_content"), void 0 !== KTLayoutFooter && KTLayoutFooter.init("kt_footer"), void 0 !== KTLayoutScrolltop && KTLayoutScrolltop.init("kt_scrolltop"), void 0 !== KTLayoutStickyCard && KTLayoutStickyCard.init("kt_page_sticky_card"), void 0 !== KTLayoutStretchedCard && KTLayoutStretchedCard.init("kt_page_stretched_card"), void 0 !== KTLayoutExamples && KTLayoutExamples.init(), void 0 !== KTLayoutDemoPanel && KTLayoutDemoPanel.init("kt_demo_panel"), void 0 !== KTLayoutChat && KTLayoutChat.init("kt_chat_modal"), void 0 !== KTLayoutQuickActions && KTLayoutQuickActions.init("kt_quick_actions"), void 0 !== KTLayoutQuickNotifications && KTLayoutQuickNotifications.init("kt_quick_notifications"), void 0 !== KTLayoutQuickPanel && KTLayoutQuickPanel.init("kt_quick_panel"), void 0 !== KTLayoutQuickUser && KTLayoutQuickUser.init("kt_quick_user"), void 0 !== KTLayoutQuickSearch && KTLayoutQuickSearch.init("kt_quick_search"), void 0 !== KTLayoutQuickCartPanel && KTLayoutQuickCartPanel.init("kt_quick_cart"), void 0 !== KTLayoutSearch && KTLayoutSearch().init("kt_quick_search_dropdown"), void 0 !== KTLayoutSearchOffcanvas && KTLayoutSearchOffcanvas().init("kt_quick_search_offcanvas")
}));
var KTLayoutAsideMenu = function() {
    var t, e;
    return {
        init: function(a) {
            (t = KTUtil.getById(a)) && (e = new KTMenu(t, {
                submenu: {
                    desktop: "accordion",
                    tablet: "accordion",
                    mobile: "accordion"
                },
                accordion: {
                    expandAll: !1
                }
            })).on("linkClick", (function(t) {
                KTUtil.isBreakpointDown("lg") && KTLayoutAside.getOffcanvas().hide()
            }))
        },
        getElement: function() {
            return t
        },
        getMenu: function() {
            return e
        },
        pauseDropdownHover: function(t) {
            e && e.pauseDropdownHover(t)
        },
        closeMobileOffcanvas: function() {
            e && KTUtil.isMobileDevice() && e.hide()
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutAsideMenu);
var KTLayoutAsideToggle = function() {
    var t, e, a;
    return {
        init: function(n) {
            e = KTUtil.getById(n), t = KTUtil.getBody(), e && ((a = new KTToggle(e, t, {
                targetState: "aside-minimize",
                toggleState: "aside-toggle-active"
            })).on("toggle", (function(t) {
                void 0 !== KTLayoutStickyCard && setTimeout((function() {
                    KTLayoutStickyCard.update()
                }), 500), "undefined" != typeof KTLayoutHeaderMenu && KTLayoutHeaderMenu.pauseDropdownHover(800), void 0 !== KTLayoutAsideMenu && KTLayoutAsideMenu.pauseDropdownHover(800), KTCookie.setCookie("kt_aside_toggle_state", t.getState())
            })), a.on("beforeToggle", (function(t) {})))
        },
        getElement: function() {
            return e
        },
        getToggle: function() {
            return a
        },
        onToggle: function(t) {
            void 0 !== a.element && a.on("toggle", t)
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutAsideToggle);
var KTLayoutAside = function() {
    var t, e;
    return {
        init: function(a) {
            var n, i, o, l;
            (t = KTUtil.getById(a), KTUtil.getBody(), t) && (n = KTUtil.hasClass(t, "aside-offcanvas-default") ? "aside-offcanvas-default" : "aside", e = new KTOffcanvas(t, {
                baseClass: n,
                overlay: !0,
                closeBy: "kt_aside_close_btn",
                toggleBy: {
                    target: "kt_aside_mobile_toggle",
                    state: "mobile-toggle-active"
                }
            }), (i = KTUtil.find(t, ".aside-primary .aside-nav")) && KTUtil.scrollInit(i, {
                disableForMobile: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    var e = parseInt(KTUtil.getViewPort().height),
                        a = KTUtil.find(t, ".aside-primary .aside-brand"),
                        n = KTUtil.find(t, ".aside-primary .aside-footer");
                    return e -= parseInt(KTUtil.css(a, "height")), e -= parseInt(KTUtil.css(a, "marginBottom")) + parseInt(KTUtil.css(a, "marginTop")), (e -= parseInt(KTUtil.css(n, "height"))) - (parseInt(KTUtil.css(n, "marginBottom")) + parseInt(KTUtil.css(n, "marginTop")))
                }
            }), o = KTUtil.find(t, ".aside-primary .aside-nav .nav"), (l = KTUtil.find(t, ".aside-secondary .aside-workspace")) && (KTUtil.scrollInit(l, {
                disableForMobile: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    var e = parseInt(KTUtil.getViewPort().height),
                        a = KTUtil.find(t, ".aside-secondary");
                    return (e -= parseInt(KTUtil.css(l, "marginBottom")) + parseInt(KTUtil.css(l, "marginTop"))) - (parseInt(KTUtil.css(a, "paddingBottom")) + parseInt(KTUtil.css(a, "paddingTop")))
                }
            }), o && $(o).find('a[data-toggle="tab"]').on("shown.bs.tab", (function(t) {
                KTUtil.scrollUpdate(l)
            }))))
        },
        getElement: function() {
            return t
        },
        getOffcanvas: function() {
            return e
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutAside);
var KTLayoutContent = function() {
    var t;
    return {
        init: function(e) {
            t = KTUtil.getById(e)
        },
        getHeight: function() {
            return e = KTUtil.getViewPort().height, t && (e = e - parseInt(KTUtil.css(t, "paddingTop")) - parseInt(KTUtil.css(t, "paddingBottom"))), (e -= KTLayoutSubheader.getHeight()) - KTLayoutFooter.getHeight();
            var e
        },
        getElement: function() {
            return t
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutContent);
var KTLayoutFooter = function() {
    var t;
    return {
        init: function(e) {
            t = KTUtil.getById(e)
        },
        getHeight: function() {
            return e = 0, t && (e = KTUtil.actualHeight(t)), e;
            var e
        },
        getElement: function() {
            return t
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutFooter);
var KTLayoutHeaderMobile = function() {
    var t;
    return {
        init: function(e) {
            t = KTUtil.getById(e)
        },
        isFixed: function() {
            return KTUtil.hasClass(KTUtil.getBody(), "header-mobile-fixed")
        },
        getElement: function() {
            return t
        },
        getHeader: function() {},
        getHeight: function() {
            return KTUtil.actualHeight(t)
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutHeaderMobile);
var KTLayoutStickyCard = function() {
    var t, e;
    return {
        init: function(a) {
            var n;
            (t = KTUtil.getById(a)) && (n = 300, "undefined" != typeof KTLayoutHeader && (n = KTLayoutHeader.getHeight()), (e = new KTCard(t, {
                sticky: {
                    offset: n,
                    zIndex: 90,
                    position: {
                        top: function() {
                            var t = 0;
                            return KTUtil.getBody(), KTUtil.isBreakpointUp("lg") ? ("undefined" != typeof KTLayoutHeader && KTLayoutHeader.isFixed() && (t += KTLayoutHeader.getHeight()), void 0 !== KTLayoutSubheader && KTLayoutSubheader.isFixed() && (t += KTLayoutSubheader.getHeight())) : "undefined" != typeof KTLayoutHeader && KTLayoutHeader.isFixedForMobile() && (t += KTLayoutHeader.getHeightForMobile()), t - 1
                        },
                        left: function(e) {
                            return KTUtil.offset(t).left
                        },
                        right: function(e) {
                            var a = KTUtil.getBody(),
                                n = parseInt(KTUtil.css(t, "width"));
                            return parseInt(KTUtil.css(a, "width")) - n - KTUtil.offset(t).left
                        }
                    }
                }
            })).initSticky(), KTUtil.addResizeHandler((function() {
                e.updateSticky()
            })))
        },
        update: function() {
            e && e.updateSticky()
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutStickyCard);
var KTLayoutStretchedCard = function() {
    var t, e = function() {
        var e = KTUtil.find(t, ".card-scroll"),
            a = KTUtil.find(t, ".card-body"),
            n = KTUtil.find(t, ".card-header"),
            i = KTLayoutContent.getHeight();
        i = (i = (i = (i = (i -= parseInt(KTUtil.actualHeight(n))) - parseInt(KTUtil.css(t, "marginTop")) - parseInt(KTUtil.css(t, "marginBottom"))) - parseInt(KTUtil.css(t, "paddingTop")) - parseInt(KTUtil.css(t, "paddingBottom"))) - parseInt(KTUtil.css(a, "paddingTop")) - parseInt(KTUtil.css(a, "paddingBottom"))) - parseInt(KTUtil.css(a, "marginTop")) - parseInt(KTUtil.css(a, "marginBottom")), i -= 3, KTUtil.css(e, "height", i + "px")
    };
    return {
        init: function(a) {
            (t = KTUtil.getById(a)) && (e(), KTUtil.addResizeHandler((function() {
                e()
            })))
        },
        update: function() {
            e()
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutStretchedCard);
var KTLayoutSubheader = function() {
    var t;
    return {
        init: function(e) {
            t = KTUtil.getById(e)
        },
        isFixed: function() {
            return KTUtil.hasClass(KTUtil.getBody(), "subheader-fixed")
        },
        getElement: function() {
            return t
        },
        getHeight: function() {
            return e = 0, t && (e = KTUtil.actualHeight(t)), e;
            var e
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutSubheader);
var KTLayoutChat = function() {
    var t = function(t) {
            var a = KTUtil.find(t, ".scroll"),
                n = KTUtil.find(t, ".card-body"),
                i = KTUtil.find(t, ".card-header"),
                o = KTUtil.find(t, ".card-footer");
            a && (KTUtil.scrollInit(a, {
                windowScroll: !1,
                mobileNativeScroll: !0,
                desktopNativeScroll: !1,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                rememberPosition: !0,
                height: function() {
                    var t;
                    return KTUtil.isBreakpointDown("lg") ? KTUtil.hasAttr(a, "data-mobile-height") ? parseInt(KTUtil.attr(a, "data-mobile-height")) : 400 : KTUtil.isBreakpointUp("lg") && KTUtil.hasAttr(a, "data-height") ? parseInt(KTUtil.attr(a, "data-height")) : (t = KTLayoutContent.getHeight(), a && (t = t - parseInt(KTUtil.css(a, "margin-top")) - parseInt(KTUtil.css(a, "margin-bottom"))), i && (t = (t -= parseInt(KTUtil.css(i, "height"))) - parseInt(KTUtil.css(i, "margin-top")) - parseInt(KTUtil.css(i, "margin-bottom"))), n && (t = t - parseInt(KTUtil.css(n, "padding-top")) - parseInt(KTUtil.css(n, "padding-bottom"))), o && (t = (t -= parseInt(KTUtil.css(o, "height"))) - parseInt(KTUtil.css(o, "margin-top")) - parseInt(KTUtil.css(o, "margin-bottom"))), t -= 2)
                }
            }), KTUtil.on(t, ".card-footer textarea", "keydown", (function(a) {
                if (13 == a.keyCode) return e(t), a.preventDefault(), !1
            })), KTUtil.on(t, ".card-footer .chat-send", "click", (function(a) {
                e(t)
            })))
        },
        e = function(t) {
            var e = KTUtil.find(t, ".messages"),
                a = KTUtil.find(t, ".scroll"),
                n = KTUtil.find(t, "textarea");
            if (0 !== n.value.length) {
                var i = document.createElement("DIV");
                KTUtil.addClass(i, "d-flex flex-column mb-5 align-items-end");
                var o, l = "";
                l += '<div class="d-flex align-items-center">', l += "\t<div>", l += '\t\t<span class="text-muted font-size-sm">2 Hours</span>', l += '\t\t<a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-h6">You</a>', l += "\t</div>", l += '\t<div class="symbol symbol-circle symbol-40 ml-3">', l += '\t\t<img alt="Pic" src="assets/media/users/300_12.jpg"/>', l += "\t</div>", l += "</div>", l += '<div class="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">' + n.value + "</div>", KTUtil.setHTML(i, l), e.appendChild(i), n.value = "", a.scrollTop = parseInt(KTUtil.css(e, "height")), (o = KTUtil.data(a).get("ps")) && o.update(), setTimeout((function() {
                    var t = document.createElement("DIV");
                    KTUtil.addClass(t, "d-flex flex-column mb-5 align-items-start");
                    var i;
                    KTUtil.setHTML(t, '<div class="d-flex align-items-center">\t<div class="symbol symbol-circle symbol-40 mr-3">\t\t<img alt="Pic" src="assets/media/users/300_12.jpg"/>\t</div>\t<div>\t\t<a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-h6">Matt Pears</a>\t\t<span class="text-muted font-size-sm">Just now</span>\t</div></div><div class="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">Right before vacation season we have the next Big Deal for you.</div>'), e.appendChild(t), n.value = "", a.scrollTop = parseInt(KTUtil.css(e, "height")), (i = KTUtil.data(a).get("ps")) && i.update()
                }), 2e3)
            }
        };
    return {
        init: function(e) {
            t(KTUtil.getById(e)), "keenthemes.com" != encodeURI(window.location.hostname) && "www.keenthemes.com" != encodeURI(window.location.hostname) || setTimeout((function() {
                if (!KTCookie.getCookie("kt_app_chat_shown")) {
                    var t = new Date((new Date).getTime() + 36e5);
                    KTCookie.setCookie("kt_app_chat_shown", 1, {
                        expires: t
                    }), KTUtil.getById("kt_app_chat_launch_btn") && KTUtil.getById("kt_app_chat_launch_btn").click()
                }
            }), 2e3)
        },
        setup: function(e) {
            t(e)
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutChat);
var KTLayoutDemoPanel = function() {
    var t, e;
    return {
        init: function(a) {
            (t = KTUtil.getById(a)) && (! function() {
                e = new KTOffcanvas(t, {
                    overlay: !0,
                    baseClass: "offcanvas",
                    placement: "right",
                    closeBy: "kt_demo_panel_close",
                    toggleBy: "kt_demo_panel_toggle"
                });
                var a = KTUtil.find(t, ".offcanvas-header"),
                    n = KTUtil.find(t, ".offcanvas-content"),
                    i = KTUtil.find(t, ".offcanvas-wrapper"),
                    o = KTUtil.find(t, ".offcanvas-footer");
                KTUtil.scrollInit(i, {
                    disableForMobile: !0,
                    resetHeightOnDestroy: !0,
                    handleWindowResize: !0,
                    height: function() {
                        var e = parseInt(KTUtil.getViewPort().height);
                        return a && (e -= parseInt(KTUtil.actualHeight(a)), e -= parseInt(KTUtil.css(a, "marginTop")), e -= parseInt(KTUtil.css(a, "marginBottom"))), n && (e -= parseInt(KTUtil.css(n, "marginTop")), e -= parseInt(KTUtil.css(n, "marginBottom"))), i && (e -= parseInt(KTUtil.css(i, "marginTop")), e -= parseInt(KTUtil.css(i, "marginBottom"))), o && (e -= parseInt(KTUtil.actualHeight(o)), e -= parseInt(KTUtil.css(o, "marginTop")), e -= parseInt(KTUtil.css(o, "marginBottom"))), e -= parseInt(KTUtil.css(t, "paddingTop")), (e -= parseInt(KTUtil.css(t, "paddingBottom"))) - 2
                    }
                }), "undefined" != typeof offcanvas && 0 === offcanvas.length && offcanvas.on("hide", (function() {
                    var t = new Date((new Date).getTime() + 36e5);
                    KTCookie.setCookie("kt_demo_panel_shown", 1, {
                        expires: t
                    })
                }))
            }(), "keenthemes.com" != encodeURI(window.location.hostname) && "www.keenthemes.com" != encodeURI(window.location.hostname) || setTimeout((function() {
                if (!KTCookie.getCookie("kt_demo_panel_shown")) {
                    var t = new Date((new Date).getTime() + 9e5);
                    KTCookie.setCookie("kt_demo_panel_shown", 1, {
                        expires: t
                    }), void 0 !== e && e.show()
                }
            }), 4e3))
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutDemoPanel);
var KTLayoutExamples = {
    init: function(t, e) {
        ! function(t) {
            var e = t;
            if (void 0 === e && (e = document.querySelectorAll(".example:not(.example-compact):not(.example-hover):not(.example-basic)")), e && e.length > 0)
                for (var a = 0; a < e.length; ++a) {
                    var n = e[a],
                        i = KTUtil.find(n, ".example-copy");
                    i && new ClipboardJS(i, {
                        target: function(t) {
                            var e = t.closest(".example"),
                                a = KTUtil.find(e, ".example-code .tab-pane.active");
                            return a || (a = KTUtil.find(e, ".example-code")), a
                        }
                    }).on("success", (function(t) {
                        KTUtil.addClass(t.trigger, "example-copied"), t.clearSelection(), setTimeout((function() {
                            KTUtil.removeClass(t.trigger, "example-copied")
                        }), 2e3)
                    }))
                }
        }(t),
        function(t) {
            if (void 0 === (e = t)) var e = document.querySelectorAll(".example.example-compact");
            if (e && e.length > 0)
                for (var a = 0; a < e.length; ++a) {
                    var n = e[a],
                        i = KTUtil.find(n, ".example-toggle"),
                        o = KTUtil.find(n, ".example-copy");
                    KTUtil.addEvent(i, "click", (function() {
                        var t = this.closest(".example"),
                            e = KTUtil.find(t, ".example-code"),
                            a = this;
                        KTUtil.hasClass(this, "example-toggled") ? KTUtil.slideUp(e, 300, (function() {
                            KTUtil.removeClass(a, "example-toggled"), KTUtil.removeClass(e, "example-code-on"), KTUtil.hide(e)
                        })) : (KTUtil.addClass(e, "example-code-on"), KTUtil.addClass(this, "example-toggled"), KTUtil.slideDown(e, 300, (function() {
                            KTUtil.show(e)
                        })))
                    })), o && new ClipboardJS(o, {
                        target: function(t) {
                            var e = t.closest(".example"),
                                a = KTUtil.find(e, ".example-code .tab-pane.active");
                            return a || (a = KTUtil.find(e, ".example-code")), a
                        }
                    }).on("success", (function(t) {
                        KTUtil.addClass(t.trigger, "example-copied"), t.clearSelection(), setTimeout((function() {
                            KTUtil.removeClass(t.trigger, "example-copied")
                        }), 2e3)
                    }))
                }
        }(t)
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTLayoutExamples);
var KTLayoutQuickActions = function() {
    var t;
    return {
        init: function(e) {
            var a, n;
            (t = KTUtil.getById(e)) && (a = KTUtil.find(t, ".offcanvas-header"), n = KTUtil.find(t, ".offcanvas-content"), new KTOffcanvas(t, {
                overlay: !0,
                baseClass: "offcanvas",
                placement: "right",
                closeBy: "kt_quick_actions_close",
                toggleBy: "kt_quick_actions_toggle"
            }), KTUtil.scrollInit(n, {
                disableForMobile: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    var e = parseInt(KTUtil.getViewPort().height);
                    return a && (e -= parseInt(KTUtil.actualHeight(a)), e -= parseInt(KTUtil.css(a, "marginTop")), e -= parseInt(KTUtil.css(a, "marginBottom"))), n && (e -= parseInt(KTUtil.css(n, "marginTop")), e -= parseInt(KTUtil.css(n, "marginBottom"))), e -= parseInt(KTUtil.css(t, "paddingTop")), (e -= parseInt(KTUtil.css(t, "paddingBottom"))) - 2
                }
            }))
        },
        getElement: function() {
            return t
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutQuickActions);
var KTLayoutQuickCartPanel = function() {
    var t;
    return {
        init: function(e) {
            (t = KTUtil.getById(e)) && function() {
                new KTOffcanvas(t, {
                    overlay: !0,
                    baseClass: "offcanvas",
                    placement: "right",
                    closeBy: "kt_quick_cart_close",
                    toggleBy: "kt_quick_cart_toggle"
                });
                var e = KTUtil.find(t, ".offcanvas-header"),
                    a = KTUtil.find(t, ".offcanvas-content"),
                    n = KTUtil.find(t, ".offcanvas-wrapper"),
                    i = KTUtil.find(t, ".offcanvas-footer");
                KTUtil.scrollInit(n, {
                    disableForMobile: !0,
                    resetHeightOnDestroy: !0,
                    handleWindowResize: !0,
                    height: function() {
                        var o = parseInt(KTUtil.getViewPort().height);
                        return e && (o -= parseInt(KTUtil.actualHeight(e)), o -= parseInt(KTUtil.css(e, "marginTop")), o -= parseInt(KTUtil.css(e, "marginBottom"))), a && (o -= parseInt(KTUtil.css(a, "marginTop")), o -= parseInt(KTUtil.css(a, "marginBottom"))), n && (o -= parseInt(KTUtil.css(n, "marginTop")), o -= parseInt(KTUtil.css(n, "marginBottom"))), i && (o -= parseInt(KTUtil.actualHeight(i)), o -= parseInt(KTUtil.css(i, "marginTop")), o -= parseInt(KTUtil.css(i, "marginBottom"))), o -= parseInt(KTUtil.css(t, "paddingTop")), (o -= parseInt(KTUtil.css(t, "paddingBottom"))) - 2
                    }
                })
            }()
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutQuickCartPanel);
var KTLayoutQuickNotifications = function() {
    var t;
    return {
        init: function(e) {
            var a, n;
            (t = KTUtil.getById(e)) && (a = KTUtil.find(t, ".offcanvas-header"), n = KTUtil.find(t, ".offcanvas-content"), new KTOffcanvas(t, {
                overlay: !0,
                baseClass: "offcanvas",
                placement: "right",
                closeBy: "kt_quick_notifications_close",
                toggleBy: "kt_quick_notifications_toggle"
            }), KTUtil.scrollInit(n, {
                disableForMobile: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    var e = parseInt(KTUtil.getViewPort().height);
                    return a && (e -= parseInt(KTUtil.actualHeight(a)), e -= parseInt(KTUtil.css(a, "marginTop")), e -= parseInt(KTUtil.css(a, "marginBottom"))), n && (e -= parseInt(KTUtil.css(n, "marginTop")), e -= parseInt(KTUtil.css(n, "marginBottom"))), e -= parseInt(KTUtil.css(t, "paddingTop")), (e -= parseInt(KTUtil.css(t, "paddingBottom"))) - 2
                }
            }))
        },
        getElement: function() {
            return t
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutQuickNotifications);
var KTLayoutQuickPanel = function() {
    var t, e, a, n, i = function() {
        var e = KTUtil.find(t, ".offcanvas-header"),
            a = KTUtil.find(t, ".offcanvas-content"),
            n = parseInt(KTUtil.getViewPort().height);
        return e && (n -= parseInt(KTUtil.actualHeight(e)), n -= parseInt(KTUtil.css(e, "marginTop")), n -= parseInt(KTUtil.css(e, "marginBottom"))), a && (n -= parseInt(KTUtil.css(a, "marginTop")), n -= parseInt(KTUtil.css(a, "marginBottom"))), n -= parseInt(KTUtil.css(t, "paddingTop")), n -= parseInt(KTUtil.css(t, "paddingBottom")), n -= 2
    };
    return {
        init: function(o) {
            t = KTUtil.getById(o), e = KTUtil.getById("kt_quick_panel_notifications"), a = KTUtil.getById("kt_quick_panel_logs"), n = KTUtil.getById("kt_quick_panel_settings"), new KTOffcanvas(t, {
                overlay: !0,
                baseClass: "offcanvas",
                placement: "right",
                closeBy: "kt_quick_panel_close",
                toggleBy: "kt_quick_panel_toggle"
            }), KTUtil.scrollInit(e, {
                mobileNativeScroll: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    return i()
                }
            }), KTUtil.scrollInit(a, {
                mobileNativeScroll: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    return i()
                }
            }), KTUtil.scrollInit(n, {
                mobileNativeScroll: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    return i()
                }
            }), $(t).find('a[data-toggle="tab"]').on("shown.bs.tab", (function(t) {
                KTUtil.scrollUpdate(e), KTUtil.scrollUpdate(a), KTUtil.scrollUpdate(n)
            }))
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutQuickPanel);
var KTLayoutQuickSearch = function() {
    var t;
    return {
        init: function(e) {
            var a, n, i, o;
            (t = KTUtil.getById(e)) && (a = KTUtil.find(t, ".offcanvas-header"), n = KTUtil.find(t, ".offcanvas-content"), i = KTUtil.find(t, ".quick-search-form"), o = KTUtil.find(t, ".quick-search-wrapper"), new KTOffcanvas(t, {
                overlay: !0,
                baseClass: "offcanvas",
                placement: "right",
                closeBy: "kt_quick_search_close",
                toggleBy: "kt_quick_search_toggle"
            }), KTUtil.scrollInit(o, {
                disableForMobile: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    var e = parseInt(KTUtil.getViewPort().height);
                    return a && (e -= parseInt(KTUtil.actualHeight(a)), e -= parseInt(KTUtil.css(a, "marginTop")), e -= parseInt(KTUtil.css(a, "marginBottom"))), n && (e -= parseInt(KTUtil.css(n, "marginTop")), e -= parseInt(KTUtil.css(n, "marginBottom"))), o && (e -= parseInt(KTUtil.actualHeight(i)), e -= parseInt(KTUtil.css(i, "marginTop")), e -= parseInt(KTUtil.css(i, "marginBottom")), e -= parseInt(KTUtil.css(o, "marginTop")), e -= parseInt(KTUtil.css(o, "marginBottom"))), e -= parseInt(KTUtil.css(t, "paddingTop")), (e -= parseInt(KTUtil.css(t, "paddingBottom"))) - 2
                }
            }))
        },
        getElement: function() {
            return t
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutQuickSearch);
var KTLayoutQuickUser = function() {
    var t;
    return {
        init: function(e) {
            var a, n;
            (t = KTUtil.getById(e)) && (a = KTUtil.find(t, ".offcanvas-header"), n = KTUtil.find(t, ".offcanvas-content"), new KTOffcanvas(t, {
                overlay: !0,
                baseClass: "offcanvas",
                placement: "right",
                closeBy: "kt_quick_user_close",
                toggleBy: "kt_quick_user_toggle"
            }), KTUtil.scrollInit(n, {
                disableForMobile: !0,
                resetHeightOnDestroy: !0,
                handleWindowResize: !0,
                height: function() {
                    var e = parseInt(KTUtil.getViewPort().height);
                    return a && (e -= parseInt(KTUtil.actualHeight(a)), e -= parseInt(KTUtil.css(a, "marginTop")), e -= parseInt(KTUtil.css(a, "marginBottom"))), n && (e -= parseInt(KTUtil.css(n, "marginTop")), e -= parseInt(KTUtil.css(n, "marginBottom"))), e -= parseInt(KTUtil.css(t, "paddingTop")), (e -= parseInt(KTUtil.css(t, "paddingBottom"))) - 2
                }
            }))
        },
        getElement: function() {
            return t
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutQuickUser);
var KTLayoutScrolltop = function() {
    var t;
    return {
        init: function(e) {
            (t = KTUtil.getById(e)) && new KTScrolltop(t, {
                offset: 300,
                speed: 600
            })
        },
        getElement: function() {
            return t
        }
    }
}();
"undefined" != typeof module && (module.exports = KTLayoutScrolltop);
var KTLayoutSearch = function() {
    var t, e, a, n, i, o, l, r, s = "",
        d = !1,
        c = !1,
        u = !1,
        p = "spinner spinner-sm spinner-primary",
        f = "quick-search-has-result",
        g = function() {
            u = !1, KTUtil.removeClass(r, p), n && (a.value.length < 2 ? KTUtil.hide(n) : KTUtil.show(n, "flex"))
        },
        m = function() {
            l && !KTUtil.hasClass(o, "show") && ($(l).dropdown("toggle"), $(l).dropdown("update"))
        },
        h = function() {
            l && KTUtil.hasClass(o, "show") && $(l).dropdown("toggle")
        },
        v = function() {
            if (d && s === a.value) return g(), KTUtil.addClass(t, f), m(), void KTUtil.scrollUpdate(i);
            s = a.value, KTUtil.removeClass(t, f), u = !0, KTUtil.addClass(r, p), n && KTUtil.hide(n), h(), setTimeout((function() {
                $.ajax({
                    url: HOST_URL + "/api/quick_search.php",
                    data: {
                        query: s
                    },
                    dataType: "html",
                    success: function(e) {
                        d = !0, g(), KTUtil.addClass(t, f), KTUtil.setHTML(i, e), m(), KTUtil.scrollUpdate(i)
                    },
                    error: function(e) {
                        d = !1, g(), KTUtil.addClass(t, f), KTUtil.setHTML(i, '<span class="font-weight-bold text-muted">Connection error. Please try again later..</div>'), m(), KTUtil.scrollUpdate(i)
                    }
                })
            }), 1e3)
        },
        b = function(e) {
            a.value = "", s = "", d = !1, KTUtil.hide(n), KTUtil.removeClass(t, f), h()
        },
        T = function() {
            if (a.value.length < 2) return g(), void h();
            1 != u && (c && clearTimeout(c), c = setTimeout((function() {
                v()
            }), 200))
        };
    return {
        init: function(s) {
            (t = KTUtil.getById(s)) && (e = KTUtil.find(t, ".quick-search-form"), a = KTUtil.find(t, ".form-control"), n = KTUtil.find(t, ".quick-search-close"), i = KTUtil.find(t, ".quick-search-wrapper"), o = KTUtil.find(t, ".dropdown-menu"), l = KTUtil.find(t, '[data-toggle="dropdown"]'), KTUtil.find(t, ".input-group"), r = KTUtil.find(t, ".input-group .input-group-append"), KTUtil.addEvent(a, "keyup", T), KTUtil.addEvent(a, "focus", T), e.onkeypress = function(t) {
                13 == (t.charCode || t.keyCode || 0) && t.preventDefault()
            }, KTUtil.addEvent(n, "click", b))
        }
    }
};
"undefined" != typeof module && (module.exports = KTLayoutSearch);
var KTLayoutSearchInline = KTLayoutSearch,
    KTLayoutSearchOffcanvas = KTLayoutSearch;