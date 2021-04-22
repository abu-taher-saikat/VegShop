function attributeToString(t) {
    return "string" != typeof t && "undefined" === (t += "") && (t = ""), jQuery.trim(t)
}
"undefined" == typeof ShopifyAPI && (ShopifyAPI = {}), ShopifyAPI.onCartUpdate = function(t) {}, ShopifyAPI.updateCartNote = function(t, a) {
    var e = {
        type: "POST",
        url: "/cart/update.js",
        data: "note=" + attributeToString(t),
        dataType: "json",
        success: function(t) {
            "function" == typeof a ? a(t) : ShopifyAPI.onCartUpdate(t)
        },
        error: function(t, a) {
            ShopifyAPI.onError(t, a)
        }
    };
    jQuery.ajax(e)
}, ShopifyAPI.onError = function(XMLHttpRequest, textStatus) {
    var data = eval("(" + XMLHttpRequest.responseText + ")");
    data.message && alert(data.message + "(" + data.status + "): " + data.description)
}, ShopifyAPI.addItemFromForm = function(t, a, e) {
    var r = "velaCartAdding";
    "fly" == window.ajaxcart_type && (r = "");
    var o = {
        type: "POST",
        url: "/cart/add.js",
        data: jQuery(t).serialize(),
        dataType: "json",
        beforeSend: function() {
            $("body").addClass(r)
        },
        success: function(e) {
            $("body").removeClass(r), "modal" == window.ajaxcart_type && (null != e.image ? $(".headerCartModal").find(".cartProductImage img").attr("src", e.image) : $(".headerCartModal").find(".cartProductImage img").attr("src", "//placehold.it/100x100"), $(".headerCartModal").find(".productTitle").html(e.title), $(".headerCartModal").addClass("active")), "function" == typeof a ? a(e, t) : ShopifyAPI.onItemAdded(e, t)
        },
        error: function(a, o) {
            $("body").removeClass(r), "function" == typeof e ? e(t, a, o) : ShopifyAPI.onError(a, o)
        }
    };
    jQuery.ajax(o)
}, ShopifyAPI.getCart = function(t) {
    jQuery.getJSON("/cart.js", function(a, e) {
        "function" == typeof t ? t(a) : ShopifyAPI.onCartUpdate(a)
    })
}, ShopifyAPI.changeItem = function(t, a, e) {
    var r = {
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=" + a + "&line=" + t,
        dataType: "json",
        success: function(t) {
            "function" == typeof e ? e(t) : ShopifyAPI.onCartUpdate(t)
        },
        error: function(t, a) {
            ShopifyAPI.onError(t, a)
        }
    };
    jQuery.ajax(r)
};
var ajaxCart = function(module, $) {
    "use strict";
    var init, loadCart, settings, isUpdating, $body, $formContainer, $addToCart, $cartCountSelector, $cartCostSelector, $cartContainer, $drawerContainer, updateCountPrice, formOverride, itemAddedCallback, itemErrorCallback, cartUpdateCallback, buildCart, cartCallback, adjustCart, adjustCartCallback, createQtySelectors, qtySelectors, validateQty;
    return init = function(t) {
        settings = {
            formSelector: 'form[action^="/cart/add"]',
            cartContainer: "#cartContainer",
            addToCartSelector: 'input[type="submit"]',
            cartCountSelector: null,
            cartCostSelector: null,
            moneyFormat: window.money,
            disableAjaxCart: !1,
            enableQtySelectors: !0
        }, $.extend(settings, t), $formContainer = $(settings.formSelector), $cartContainer = $(settings.cartContainer), $addToCart = $formContainer.find(settings.addToCartSelector), $cartCountSelector = $(settings.cartCountSelector), $cartCostSelector = $(settings.cartCostSelector), $body = $("body"), isUpdating = !1, settings.enableQtySelectors && qtySelectors(), !settings.disableAjaxCart && $addToCart.length && formOverride(), adjustCart()
    }, loadCart = function() {
        $body.addClass("ajaxcartIsLoading"), ShopifyAPI.getCart(cartUpdateCallback)
    }, updateCountPrice = function(t) {
        $cartCountSelector && ($cartCountSelector.html(t.item_count).removeClass("hidden-count"), 0 === t.item_count && $cartCountSelector.addClass("hidden-count")), $cartCostSelector && $cartCostSelector.html(Shopify.formatMoney(t.total_price, settings.moneyFormat))
    }, formOverride = function() {
        "page" != window.ajaxcart_type && $formContainer.on("submit", function(t) {
            t.preventDefault(), $addToCart.removeClass("is-added").addClass("is-adding"), $(".qtyError").remove(), ShopifyAPI.addItemFromForm(t.target, itemAddedCallback, itemErrorCallback), $formContainer.hasClass("formQuickview") && ($("#velaQuickView").fadeOut(500), $(".jsQuickview").html(""), $(".jsQuickview").fadeOut(500))
        })
    }, itemAddedCallback = function(t) {
        $addToCart.removeClass("is-adding").addClass("is-added"), ShopifyAPI.getCart(cartUpdateCallback)
    }, itemErrorCallback = function(form, XMLHttpRequest, textStatus) {
        var data = eval("(" + XMLHttpRequest.responseText + ")");
        $addToCart.removeClass("is-adding is-added"), data.message && 422 == data.status && $(form).after('<div class="alert alert-danger qtyError">' + data.description + "</div>")
    }, cartUpdateCallback = function(t) {
        updateCountPrice(t), buildCart(t)
    }, buildCart = function(t) {
        if ($cartContainer.empty(), "modal" == window.ajaxcart_type) {
            if (0 === t.item_count) return $cartContainer.append('<div class="headerCartEmpty">' + window.cart_empty + "</div>"), void cartCallback(t);
            var a = [],
                e = {},
                r = {},
                o = $("#headerCartTemplate").html(),
                i = Handlebars.compile(o);
            $.each(t.items, function(t, r) {
                if (null != r.image) var o = r.image.replace(/(\.[^.]*)$/, "_200x$1").replace("http:", "");
                else o = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";
                e = {
                    id: r.variant_id,
                    line: t + 1,
                    url: r.url,
                    img: o,
                    name: r.product_title,
                    variation: r.variant_title,
                    properties: r.properties,
                    itemAdd: r.quantity + 1,
                    itemMinus: r.quantity - 1,
                    itemQty: r.quantity,
                    price: Shopify.formatMoney(r.price, settings.moneyFormat),
                    vendor: r.vendor
                }, a.push(e)
            }), r = {
                items: a,
                note: t.note,
                totalPrice: Shopify.formatMoney(t.total_price, settings.moneyFormat)
            }, $cartContainer.append(i(r)), cartCallback(t)
        } else {
            if (0 === t.item_count) return $cartContainer.append('<div class="drawerCartEmpty">' + window.cart_empty + "</div>"), void cartCallback(t);
            a = [], e = {}, r = {}, o = $("#CartTemplate").html(), i = Handlebars.compile(o);
            $.each(t.items, function(t, r) {
                if (null != r.image) var o = r.image.replace(/(\.[^.]*)$/, "_200x$1").replace("http:", "");
                else o = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";
                e = {
                    id: r.variant_id,
                    line: t + 1,
                    url: r.url,
                    img: o,
                    name: r.product_title,
                    variation: r.variant_title,
                    properties: r.properties,
                    itemAdd: r.quantity + 1,
                    itemMinus: r.quantity - 1,
                    itemQty: r.quantity,
                    price: Shopify.formatMoney(r.price, settings.moneyFormat),
                    vendor: r.vendor
                }, a.push(e)
            }), r = {
                items: a,
                note: t.note,
                totalPrice: Shopify.formatMoney(t.total_price, settings.moneyFormat)
            }, $cartContainer.append(i(r)), cartCallback(t)
        }
    }, cartCallback = function(t) {
        $body.removeClass("drawerIsLoading"), $body.trigger("ajaxCart.afterCartLoad", t), window.Shopify && Shopify.StorefrontExpressButtons && Shopify.StorefrontExpressButtons.initialize()
    }, adjustCart = function() {
        function t(t, a) {
            isUpdating = !0;
            var e = $('.ajaxCartRow[data-line="' + t + '"]').addClass("is-loading");
            0 === a && e.parent().addClass("is-removed"), setTimeout(function() {
                ShopifyAPI.changeItem(t, a, adjustCartCallback)
            }, 250)
        }
        $body.on("click", ".qtyAdjust", function() {
            var a = $(this),
                e = a.data("line"),
                r = a.siblings(".qtyNum"),
                o = parseInt(r.val().replace(/\D/g, ""));
            o = validateQty(o);
            a.hasClass("velaQtyPlus") ? o += 1 : (o -= 1) <= 0 && (o = 0), e ? t(e, o) : r.val(o)
        }), $body.on("change", ".qtyNum", function() {
            var a = $(this),
                e = a.data("line"),
                r = parseInt(a.val().replace(/\D/g, ""));
            r = validateQty(r);
            e && t(e, r)
        }), $body.on("submit", "form.ajaxcart", function(t) {
            isUpdating && t.preventDefault()
        }), $body.on("focus", ".qtyAdjust", function() {
            var t = $(this);
            setTimeout(function() {
                t.select()
            }, 50)
        }), $body.on("click", ".cartRemove", function() {
            var a = $(this).data("line");
            a && t(a, 0)
        }), $body.on("change", 'textarea[name="note"]', function() {
            var t = $(this).val();
            ShopifyAPI.updateCartNote(t, function(t) {})
        })
    }, adjustCartCallback = function(t) {
        isUpdating = !1, updateCountPrice(t), setTimeout(function() {
            ShopifyAPI.getCart(buildCart)
        }, 150)
    }, createQtySelectors = function() {
        $('input[type="number"]', $cartContainer).length && $('input[type="number"]', $cartContainer).each(function() {
            var t = $(this),
                a = t.val(),
                e = a + 1,
                r = a - 1,
                o = a,
                i = $("#velaAjaxQty").html(),
                n = Handlebars.compile(i),
                d = {
                    id: t.data("id"),
                    itemQty: o,
                    itemAdd: e,
                    itemMinus: r
                };
            t.after(n(d)).remove()
        })
    }, qtySelectors = function() {
        var t = $('input[type="number"]');
        t.length && (t.each(function() {
            var t = $(this),
                a = t.val(),
                e = t.attr("name"),
                r = t.attr("id"),
                o = a + 1,
                i = a - 1,
                n = a,
                d = $("#velaJsQty").html(),
                c = Handlebars.compile(d),
                s = {
                    id: t.data("id"),
                    itemQty: n,
                    itemAdd: o,
                    itemMinus: i,
                    inputName: e,
                    inputId: r
                };
            t.after(c(s)).remove()
        }), $("body").on("click", ".velaQtyAdjust", function() {
            var t = $(this),
                a = (t.data("id"), t.siblings(".velaQtyNum")),
                e = parseInt(a.val().replace(/\D/g, ""));
            e = validateQty(e);
            t.hasClass("velaQtyPlus") ? e += 1 : (e -= 1) <= 1 && (e = 1), a.val(e)
        }))
    }, validateQty = function(t) {
        return (parseFloat(t) != parseInt(t) || isNaN(t)) && (t = 1), t
    }, module = {
        init: init,
        load: loadCart
    }, module
}(ajaxCart || {}, jQuery);
$(document).ready(function() {
    ajaxCart.init({
        formSelector: ".formAddToCart",
        cartContainer: "#cartContainer",
        addToCartSelector: ".btnAddToCart",
        cartCountSelector: "#CartCount",
        cartCostSelector: "#CartCost",
        moneyFormat: window.money
    })
});