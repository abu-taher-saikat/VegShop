function replaceUrlParam(e, r, a) {
    var n = new RegExp("(" + r + "=).*?(&|$)"),
        c = e;
    return c = e.search(n) >= 0 ? e.replace(n, "$1" + a + "$2") : c + (c.indexOf("?") > 0 ? "&" : "?") + r + "=" + a
};
if ((typeof Shopify) === 'undefined') {
    Shopify = {};
}
if (!Shopify.formatMoney) {
    Shopify.formatMoney = function(cents, format) {
        var value = '',
            placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
            formatString = (format || this.money_format);
        if (typeof cents == 'string') {
            cents = cents.replace('.', '');
        }

        function defaultOption(opt, def) {
            return (typeof opt == 'undefined' ? def : opt);
        }

        function formatWithDelimiters(number, precision, thousands, decimal) {
            precision = defaultOption(precision, 2);
            thousands = defaultOption(thousands, ',');
            decimal = defaultOption(decimal, '.');
            if (isNaN(number) || number == null) {
                return 0;
            }
            number = (number / 100.0).toFixed(precision);
            var parts = number.split('.'),
                dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
                cents = parts[1] ? (decimal + parts[1]) : '';
            return dollars + cents;
        }
        switch (formatString.match(placeholderRegex)[1]) {
            case 'amount':
                value = formatWithDelimiters(cents, 2);
                break;
            case 'amount_no_decimals':
                value = formatWithDelimiters(cents, 0);
                break;
            case 'amount_with_comma_separator':
                value = formatWithDelimiters(cents, 2, '.', ',');
                break;
            case 'amount_no_decimals_with_comma_separator':
                value = formatWithDelimiters(cents, 0, '.', ',');
                break;
        }
        return formatString.replace(placeholderRegex, value);
    };
}
Shopify.optionsMap = {};
Shopify.updateOptionsInSelector = function(selectorIndex) {
    switch (selectorIndex) {
        case 0:
            var key = 'root';
            var selector = jQuery('.single-option-selector:eq(0)');
            break;
        case 1:
            var key = jQuery('.single-option-selector:eq(0)').val();
            var selector = jQuery('.single-option-selector:eq(1)');
            break;
        case 2:
            var key = jQuery('.single-option-selector:eq(0)').val();
            key += ' / ' + jQuery('.single-option-selector:eq(1)').val();
            var selector = jQuery('.single-option-selector:eq(2)');
    }
    var initialValue = selector.val();
    selector.empty();
    var availableOptions = Shopify.optionsMap[key];
    for (var i = 0; i < availableOptions.length; i++) {
        var option = availableOptions[i];
        var newOption = jQuery('<option></option>').val(option).html(option);
        selector.append(newOption);
    }
    jQuery('.swatch[data-option-index="' + selectorIndex + '"] .swatch-element').each(function() {
        if (jQuery.inArray($(this).attr('data-value'), availableOptions) !== -1) {
            $(this).removeClass('soldout').show().find(':radio').removeAttr('disabled', 'disabled').removeAttr('checked');
        } else {
            if (window.swatch_show_unvailable == true) {
                $(this).addClass('soldout').find(':radio').removeAttr('checked').attr('disabled', 'disabled');
            } else {
                $(this).addClass('soldout').hide().find(':radio').removeAttr('checked').attr('disabled', 'disabled');
            }
        }
    });
    if (jQuery.inArray(initialValue, availableOptions) !== -1) {
        selector.val(initialValue);
    }
    selector.trigger('change');
};
Shopify.linkOptionSelectors = function(product) {
    // Building our mapping object.
    for (var i = 0; i < product.variants.length; i++) {
        var variant = product.variants[i];
        if (variant.available) {
            // Gathering values for the 1st drop-down.
            Shopify.optionsMap['root'] = Shopify.optionsMap['root'] || [];
            Shopify.optionsMap['root'].push(variant.option1);
            Shopify.optionsMap['root'] = Shopify.uniq(Shopify.optionsMap['root']);
            // Gathering values for the 2nd drop-down.
            if (product.options.length > 1) {
                var key = variant.option1;
                Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
                Shopify.optionsMap[key].push(variant.option2);
                Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
            }
            // Gathering values for the 3rd drop-down.
            if (product.options.length === 3) {
                var key = variant.option1 + ' / ' + variant.option2;
                Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
                Shopify.optionsMap[key].push(variant.option3);
                Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
            }
        }
    }
    // Update options right away.
    Shopify.updateOptionsInSelector(0);
    if (product.options.length > 1) Shopify.updateOptionsInSelector(1);
    if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
    // When there is an update in the first dropdown.
    jQuery(".single-option-selector:eq(0)").change(function() {
        Shopify.updateOptionsInSelector(1);
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
        return true;
    });
    // When there is an update in the second dropdown.
    jQuery(".single-option-selector:eq(1)").change(function() {
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
        return true;
    });
};
window.vela = window.vela || {};
vela.cacheSelectors = function() {
    vela.cache = {
        $html: $('html'),
        $body: $('body'),
        $velaProductImage: $('#ProductPhotoImg'),
        $velaLoading: $('#loading'),
        $velaNewletterModal: $('#velaNewsletterModal')
    };
};
vela.init = function() {
    vela.cacheSelectors();
    vela.preLoading();
    vela.startTheme();
    vela.drawersInit();
    vela.swatchProduct();
    vela.productThumbImage();
    vela.ajaxSearch();
    vela.ajaxFilter();
    vela.accordion();
    vela.responsiveVideos();
    vela.floatHeader();
    vela.menuMobile();
    vela.productCountdown();
    vela.owlOneCarousel();
    vela.quickview();
    vela.lookbook();
    vela.flytocart();
    vela.goToTop();
    vela.newsletter();
    vela.productLoadMore();
    vela.velaAccountPage();
    vela.velaBannerTop();
    vela.filterByPrice();
    vela.disclosure();
    if (window.ajaxcart_type == "modal") {
        ajaxCart.load();
    }
};
vela.flytocart = function() {
    function flyToElement(flyer, flyingTo) {
        var divider = 3;
        var flyerClone = $(flyer).clone();
        //console.log($(flyerClone));
        $(flyerClone).css({
            position: 'absolute',
            top: $(flyer).offset().top + "px",
            left: $(flyer).offset().left + "px",
            opacity: 1,
            'z-index': 1000
        });
        $('body').append($(flyerClone));
        var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width() / divider) / 2;
        var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height() / divider) / 2;

        $(flyerClone).animate({
                opacity: 0.4,
                left: gotoX,
                top: gotoY,
                width: $(flyer).width() / divider,
                height: $(flyer).height() / divider
            }, 700,
            function() {

                $(flyerClone).fadeOut('fast', function() {
                    $(flyerClone).remove();
                });
            });
    }
    if (window.ajaxcart_type == 'fly') {
        $('.formAddToCart button.btnAddToCart').on('click', function(e) {
            //e.preventDefault();
            $('html, body').animate({
                'scrollTop': $(".velaCartTop").position().top
            });
            var itemImg = $(this).parents('.proFlyBlock').find('.imgFlyCart');
            flyToElement($(itemImg), $('.velaCartTop'));
        });
    }
};
vela.disclosure = function() {
    var $disclosure = $('.js-disclosure');
    $disclosure.each(function() {
        var $disclosureOptions = $(this).find('.js-disclosure-item'),
            $disclosureInput = $(this).find('.js-disclosure-input');

        $disclosureOptions.on('click', function(evt) {
            evt.preventDefault();
            var value = $(this).data('value');
            $disclosureInput.val(value);
            $(this).closest('form').submit();
        });
    });
};
vela.filterByPrice = function() {
    var $range = $("#rangePrice");
    var $btnFilter = $(".btnFilterPrice");
    var minPrice = 0;
    var maxPrice = 0;

    function processFilterPrice(minPrice, maxPrice) {
        $('#loading').show();
        $("#velaProList .rowFlexMargin .velaProBlock").hide().filter(function() {
            var bprice = $(this).data("price").toString().replace(/,/g, "");
            var price = parseInt(bprice, 10);
            console.log('Min: ' + minPrice);
            console.log('Max: ' + maxPrice);
            console.log('Price: ' + price);
            return price >= minPrice && price <= maxPrice;
        }).show();
        $('body,html').animate({
            scrollTop: 400
        }, 600);
        setTimeout(function() {
            $('#loading').hide();
        }, 200);

    };
    $btnFilter.on("click", function() {
        minPrice = $range.data("from"),
            maxPrice = $range.data("to");
        processFilterPrice(minPrice, maxPrice);
    });
    $range.ionRangeSlider({
        onFinish: function(data) {
            //processFilterPrice(minPrice,maxPrice);
        }
    });
};
vela.getHash = function() {
    return window.location.hash;
};
vela.productPage = function(options) {
    var moneyFormat = options.money_format,
        variant = options.variant,
        selector = options.selector;
    var $addToCart = $('#AddToCart'),
        $productPrice = $('#ProductPrice'),
        $comparePrice = $('#ComparePrice'),
        $quantityElements = $('.qtySelector, .qtySelector + .velaQty'),
        $addToCartText = $('#AddToCartText');
    if (variant) {
        if (variant.available) {
            $addToCart.removeClass('disabled').prop('disabled', false);
            $addToCartText.html("Add to Cart");
            $quantityElements.show();
        } else {
            $addToCart.addClass('disabled').prop('disabled', true);
            $addToCartText.html("Sold Out");
            $quantityElements.hide();
        }
        $productPrice.html(Shopify.formatMoney(variant.price, moneyFormat));
        if (variant.compare_at_price > variant.price) {
            $comparePrice
                .html(Shopify.formatMoney(variant.compare_at_price, moneyFormat))
                .show();
        } else {
            $comparePrice.hide();
        }
        if (window.swatch_enable) {
            var form = $('#' + selector.domIdPrefix).closest('form');
            for (var i = 0, length = variant.options.length; i < length; i++) {
                form.find('.swatch[data-option-index="' + i + '"] :radio').each(function() {
                    if (_.isEqual(variant.options[i], $(this).val())) {
                        $(this).prop('checked', true);
                        var headerValue = form.find('.swatch[data-option-index="' + i + '"] .js-swatch-display');
                        headerValue.text(variant.options[i]);
                    }
                });
            }

        }
        var proSKU = variant.sku;
        if (variant.sku == '') {
            proSKU = "N/A";
        }
        $('.productSKU').html('<label>' + "SKU" + ':</label> ' + proSKU);
        if (variant.available) {
            $('.productAvailability').removeClass('outstock');
            $('.productAvailability').addClass('instock');
            $('.productAvailability')
                .html('<label>' + "Availability" + ':</label> ' + "In stock");
        } else {
            $('.productAvailability').removeClass('instock');
            $('.productAvailability').addClass('outstock');
            $('.productAvailability').html('<label>' + "Availability" + ':</label> ' + "Out Of Stock");
        }
        if (window.currencies) {
            Currency.convertAll(window.currency, $('.jsvela-currency__item.active').data('value'), 'span.money', 'money_format');
        }
    } else {
        $addToCart.addClass('disabled').prop('disabled', true);
        $addToCartText.html("Out Of Stock");
        $quantityElements.hide();
    }
    if (variant && variant.featured_media) {
        var currentMediaID = variant.featured_media.id;
        var mediaID,
            slideIndex = 0;
        $('#productThumbs .product-single__thumbnail').removeClass('active-thumb');
        $('#productThumbs .product-single__thumbnail').each(function() {
            var $self = $(this);
            mediaID = $self.data('imageid');
            if (mediaID === currentMediaID) {
                var currentSlide = $self.closest('.product-single__thumbnails-item');
                slideIndex = currentSlide.data('slick-index') ? currentSlide.data('slick-index') : 0;
                $self.addClass('active-thumb');
                $('#ProductPhotoImg').attr('src', $self.data('image')).attr('data-zoom-image', $self.data('zoom-image'));
                $self.trigger('click');
                return false;
            }
        });
        if (slideIndex != 'undefined') {
            $('#productThumbs .product-single__thumbnails').slick('slickGoTo', slideIndex);
        }
    }
};
vela.preLoading = function() {
    var counter = 0,
        preLoading = $('#velaPreLoading'),
        preLoadingBar = $('#velaPreLoading > span'),
        items = new Array();
    preLoading.css({
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    });
    $('body').removeClass('bodyPreLoading');

    function getImages(element) {
        $(element).find('*:not(script)').each(function() {
            var url = "";
            if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
                url = $(this).css('background-image');
                if (url.indexOf('url') != -1) {
                    var temp = url.match(/url\((.*?)\)/);
                    url = temp[1].replace(/\"/g, '');
                }
            } else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
                url = $(this).attr('src');
            }
            if (url.length > 0) {
                items.push(url);
            }
        });
    }

    function preLoadingImage(url) {
        var imgPreLoading = new Image();
        $(imgPreLoading)
            .load(function() {
                runPreLoading();
            })
            .error(function() {
                runPreLoading();
            })
            .attr('src', url);
    }

    function preLoadingStart() {
        for (var i = 0; i < items.length; i++) {
            if (preLoadingImage(items[i]));
        }
    }

    function runPreLoading() {
        counter++;
        var per = Math.round((counter / items.length) * 100);
        $(preLoadingBar).stop().animate({
            width: per + '%'
        }, 500, 'linear');
        if (counter >= items.length) {
            counter = items.length;
            $(preLoadingBar).stop().animate({
                width: '100%'
            }, 500, 'linear', function() {
                $(preLoading).fadeOut(200, function() {
                    $(preLoading).remove();
                });
            });
        }
    }
    getImages($('body'));
    preLoadingStart();
};
vela.startTheme = function() {
    $(".swatch :radio").change(function() {
        var t = $(this).closest(".swatch").attr("data-option-index");
        var n = $(this).val();
        $(this).closest("form").find(".single-option-selector").eq(t).val(n).trigger("change");
    });
    $('.headerCartModal .overlayCart, .headerCartModal .closeCartModal').on('click', function() {
        $('.headerCartModal').removeClass('active');
    });
    $('body').on('click', '.velaCartModal', function() {
        $(this).parent().toggleClass('active');
    });
    $('body').click(function(e) {
        var target = $(e.target);
        if (target.parents('.velaCartTop').length === 0) {
            $('.velaCartTop').removeClass('active');
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
    $('.googleOverPlay').on('click', function() {
        $(this).fadeOut();
    });
    $('.velaGoogleMap').on('mouseleave', function() {
        $(this).find('.googleOverPlay').fadeIn();
    });
};
vela.drawersInit = function() {
    //vela.LeftDrawer = new vela.Drawers('menuDrawer', 'Left', false);
    vela.RightDrawer = new vela.Drawers('cartDrawer', 'Right', true, {
        'onDrawerOpen': ajaxCart.load
    });
};
vela.swatchProduct = function() {
    $(".velaSwatchProduct > li").each(function() {
        var eImage = $(this).parents('.velaProBlock').find('.proSwatch .product-card__image > img');
        var eImgSrc = eImage.attr('src');


        $(this).mouseover(function() {
            var newImage = $(this).find('.hidden a').attr('href');
            if (newImage != '#') {

                eImage.attr({
                    src: newImage,
                    srcset: ""
                });
            }
        });
        $(this).mouseout(function() {
            var eImgsrcset = eImage.data('srcset');
            eImage.attr({
                srcset: eImgsrcset
            });
            eImage.removeAttr('src');
        });
    });

};
vela.productThumbImage = function() {
    if ($("#productThumbs").length > 0) {
        $("#productThumbs .owl-carousel").each(function() {
            var owlCarousel = $(this);
            var item = owlCarousel.data("item");

            if (item === undefined || item == null) {
                item = 5;
            }
            var vertical = owlCarousel.data("vertical");
            if (vertical === undefined || vertical == null) {
                vertical = false;
            }
            var mItem = item;
            if (vertical) {
                mItem = 4;
            }
            var config = {
                slidesToShow: item,
                slidesToScroll: 1,
                dots: false,
                mouseDrag: false,
                nav: true,
                centerMode: false,
                adaptiveHeight: true,
                rows: 1,
                infinite: false,
                vertical: vertical,
                responsive: [{
                        breakpoint: 768,
                        settings: {
                            slidesToShow: mItem
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: item,
                            slidesToScroll: item
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: mItem
                        }
                    },
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: mItem
                        }
                    }
                ]
            };
            owlCarousel.slick(config);
        });
    }
};
vela.ajaxSearch = function() {
    var currentAjaxRequest = null;
    var searchForms = $('form[action="/search"]').each(function() {
        var inputSearch = $(this).find('input[name="q"]');
        var inputProduct = $(this).find('input[name="type"]');
        var offSet = inputSearch.position().top + inputSearch.innerHeight();
        $('<ul class="velaAjaxSearch"></ul>')
            .appendTo($(this)).hide();
        if (inputProduct.val() == 'product') {
            inputSearch.attr('autocomplete', 'off').bind('keyup change', function() {
                var term = $(this).val();
                var form = $(this).closest('form');
                var searchURL = '/search?type=product&q=' + term;
                var resultsList = form.find('.velaAjaxSearch');
                if (term.length > 1 && term != $(this).attr('data-old-term')) {
                    $(this).attr('data-old-term', term);
                    if (currentAjaxRequest != null) currentAjaxRequest.abort();
                    currentAjaxRequest = $.getJSON(searchURL + '&view=json', function(data) {
                        resultsList.empty();
                        if (data.results_count == 0) {
                            // resultsList.html('<li><span class="title">No results.</span></li>');
                            // resultsList.fadeIn(200);
                            resultsList.hide();
                        } else {
                            $.each(data.results, function(index, item) {
                                var link = $('<a></a>').attr('href', item.url);
                                link.append('<div class="searchProductImage"><img src="' + item.thumbnail + '" /></div>');
                                link.append('<div class="searchContent"><span class="searchProductTitle">' + item.title + '</span><span class="searchPrice">' + item.price + '</span></div>');
                                link.wrap('<li></li>');
                                resultsList.append(link.parent());
                            });
                            if (data.results_count > 10) {
                                resultsList.append('<li><a class="searchViewAll" href="' + searchURL + '">See all results (' + data.results_count + ')</a></li>');
                            }
                            resultsList.fadeIn(200);
                        }
                    });
                }
            });
        }
    });
    $('body').bind('click', function() {
        $('.velaAjaxSearch').hide();
    });
    //SEACH TOP
    $('.searchBoxTop').hover(function() {
        $('.velaSearchbox .velaSearch').focus();
    });
    vela.cache.$body.on('click', '.velaSearchIcon', function() {
        $('.searchBoxTop').toggleClass('active');
        $('.searchClose').toggleClass('active');
        $('.searchOverLayer').toggleClass('active');
    });
    vela.cache.$body.on('click', '.searchClose, .searchOverLayer', function() {
        var hasClass = $(this).hasClass('active');
        if (hasClass) {
            $('.searchBoxTop').removeClass('active');
            $('.searchClose').removeClass('active');
            $('.searchOverLayer').removeClass('active');
        }
    });
};
vela.ajaxFilter = function() {
    var btnOpenFilter = $('.filterTagFullwidthButton');
    var filterContent = $('.filterTagFullwidthContent');
    vela.cache.$body.on('click', '.filterTagFullwidthButton', function() {
        if (filterContent.hasClass('active')) {
            btnOpenFilter.removeClass('active');
            filterContent.removeClass('active');
            $('.filterTagFullwidthOverlay').each(function() {
                $(this).remove();
            });
        } else {
            $('<div class="filterTagFullwidthOverlay"></div>')
                .css('display', 'none')
                .insertAfter(filterContent);
            $('.filterTagFullwidthOverlay').fadeIn(300);
            btnOpenFilter.addClass('active');
            filterContent.addClass('active');
        }
    });
    vela.cache.$body.on('click', '.filterTagFullwidthOverlay, .filterTagFullwidthClose', function() {
        $('.filterTagFullwidthOverlay').each(function() {
            $(this).remove();
        });
        btnOpenFilter.removeClass('active');
        filterContent.removeClass('active');
    });
    var isAjaxFilterClick = false;
    if ($(".template-collection")) {
        History.Adapter.bind(window, 'statechange', function() {
            var State = History.getState();
            if (!isAjaxFilterClick) {
                ajaxFilterParams();
                var newurl = ajaxFilterCreateUrl();
                ajaxFilterGetContent(newurl);
                reActivateSidebar();
            }
            vela.isSidebarAjaxClick = false;
        });
    }
    ajaxFilterParams = function() {
        Shopify.queryParams = {};
        if (location.search.length) {
            for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
                aKeyValue = aCouples[i].split('=');
                if (aKeyValue.length > 1) {
                    Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
                }
            }
        }
    }
    ajaxFilterCreateUrl = function(baseLink) {
        var newQuery = $.param(Shopify.queryParams).replace(/%2B/g, '+');
        if (baseLink) {
            if (newQuery != "")
                return baseLink + "?" + newQuery;
            else
                return baseLink;
        }
        return location.pathname + "?" + newQuery;
    }
    ajaxFilterClick = function(baseLink) {
        delete Shopify.queryParams.page;
        var newurl = ajaxFilterCreateUrl(baseLink);
        isAjaxFilterClick = true;
        History.pushState({
            param: Shopify.queryParams
        }, newurl, newurl);
        ajaxFilterGetContent(newurl);
    }
    ajaxFilterSortby = function() {
        if (Shopify.queryParams.sort_by) {
            var sortby = Shopify.queryParams.sort_by;
            $("#SortBy").val(sortby);
        }
        vela.cache.$body.on('change', "#SortBy", function(event) {
            Shopify.queryParams.sort_by = $(this).val();
            ajaxFilterClick();
        });
    }
    ajaxFilterView = function() {
        vela.cache.$body.on('click', '.changeView', function(event) {
            event.preventDefault();
            if (!$(this).hasClass("changeViewActive")) {
                Shopify.queryParams.view = $(this).data('view');
                $(".changeView").removeClass('changeViewActive');
                $(this).addClass('changeViewActive');
                ajaxFilterClick();
            }
        });
    }
    ajaxFilterTags = function() {
        vela.cache.$body.on('click', '.ajaxFilter li > a', function(event) {
            event.preventDefault();
            var currentTags = [];
            if (Shopify.queryParams.constraint) {
                currentTags = Shopify.queryParams.constraint.split('+');
            }
            if (!window.sidebar_multichoise && !$(this).parent().hasClass("active")) {
                var otherTag = $(this).parents('.listFilter').find("li.active");
                if (otherTag.length > 0) {
                    var tagName = otherTag.data("filter");
                    if (tagName) {
                        var tagPos = currentTags.indexOf(tagName);
                        if (tagPos >= 0) {
                            currentTags.splice(tagPos, 1);
                        }
                    }
                }
            }
            var dataHandle = $(this).parent().data("filter");
            if (dataHandle) {
                var tagPos = currentTags.indexOf(dataHandle);
                if (tagPos >= 0) {
                    currentTags.splice(tagPos, 1);
                } else {
                    currentTags.push(dataHandle);
                }
            }
            if (currentTags.length) {
                Shopify.queryParams.constraint = currentTags.join('+');
            } else {
                delete Shopify.queryParams.constraint;
            }
            ajaxFilterClick();
        });
    }
    ajaxFilterPaging = function() {
        vela.cache.$body.on('click', '#collPagination .pagination a', function(event) {
            event.preventDefault();
            var linkPage = $(this).attr("href").match(/page=\d+/g);
            if (linkPage) {
                Shopify.queryParams.page = parseInt(linkPage[0].match(/\d+/g));
                if (Shopify.queryParams.page) {
                    var newurl = ajaxFilterCreateUrl();
                    isAjaxFilterClick = true;
                    History.pushState({
                        param: Shopify.queryParams
                    }, newurl, newurl);
                    ajaxFilterGetContent(newurl);
                    $('body,html').animate({
                        scrollTop: 300
                    }, 600);
                }
            }
        });
    }
    ajaxFilterReview = function() {
        if (window.review) {
            if ($(".shopify-product-reviews-badge").length > 0) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
            };
        }
    }
    ajaxFilterClear = function() {
        $(".ajaxFilter").each(function() {
            var sidebarTag = $(this);
            if (sidebarTag.find(".listFilter > li.active").length > 0) {
                sidebarTag.find(".velaClear").show().click(function(e) {
                    var currentTags = [];
                    if (Shopify.queryParams.constraint) {
                        currentTags = Shopify.queryParams.constraint.split('+');
                    }
                    sidebarTag.find(".listFilter > li.active").each(function() {
                        var selectedTag = $(this);
                        var tagName = selectedTag.data("filter");
                        if (tagName) {
                            var tagPos = currentTags.indexOf(tagName);
                            if (tagPos >= 0) {
                                currentTags.splice(tagPos, 1);
                            }
                        }
                    });
                    if (currentTags.length) {
                        Shopify.queryParams.constraint = currentTags.join('+');
                    } else {
                        delete Shopify.queryParams.constraint;
                    }
                    ajaxFilterClick();
                    e.preventDefault();
                });
            }
        });
    }
    ajaxFilterClearAll = function() {
        vela.cache.$body.on('click', 'a.velaClearAll', function(e) {
            delete Shopify.queryParams.constraint;
            delete Shopify.queryParams.q;
            ajaxFilterClick();
            e.preventDefault();
        });
    }
    ajaxFilterAddToCart = function() {
        if (window.ajaxcart_type != "page") {
            ajaxCart.init({
                formSelector: '.formAddToCart',
                cartContainer: '#cartContainer',
                addToCartSelector: '.btnAddToCart',
                cartCountSelector: '#CartCount',
                cartCostSelector: '#CartCost',
                moneyFormat: null
            });
        }
    }
    ajaxAccordionMobile = function() {
        if ($('.velaSidebar').hasClass('accordion')) {
            $('#sidebarAjaxFilter .titleSidebar').on('click', function(e) {
                $(this).toggleClass('active').parent().find('.velaContent').stop().slideToggle('medium');
                e.preventDefault();
            });
        }
    }
    ajaxFilterData = function(data) {
        var currentList = $("#proListCollection .proList");
        var dataList = $(data).find("#proListCollection .proList");
        currentList.replaceWith(dataList);
        if ($("#collPagination").length > 0) {
            $("#collPagination").replaceWith($(data).find("#collPagination"));
        } else {
            $("#shopify-section-vela-template-collection").append($(data).find("#collPagination"));
        }
        var currentSidebarFilter = $("#sidebarAjaxFilter");
        var dataSidebarFilter = $(data).find("#sidebarAjaxFilter");
        currentSidebarFilter.replaceWith(dataSidebarFilter);
    }
    ajaxFilterGetContent = function(newurl) {
        $.ajax({
            type: 'get',
            url: newurl,
            beforeSend: function() {
                vela.cache.$velaLoading.show();
            },
            success: function(data) {
                var newTitle = $(data).filter('title').text();
                document.title = newTitle;
                ajaxFilterData(data);
                ajaxFilterSortby();
                ajaxFilterReview();
                ajaxFilterClear();
                ajaxFilterAddToCart();
                ajaxAccordionMobile();
                vela.flytocart();
                vela.cache.$velaLoading.hide();
                vela.swatchProduct();
            },
            error: function(xhr, text) {
                vela.cache.$velaLoading.hide();


            }
        });
    }
    ajaxFilterParams();
    ajaxFilterSortby();
    ajaxFilterView();
    ajaxFilterTags();
    ajaxFilterPaging();
    ajaxFilterClear();
    ajaxFilterClearAll();
};
vela.accordion = function() {
    function accordionSidebar() {
        if ($(window).width() <= 767) {
            if (!$('.velaBlogSidebar').hasClass('accordion')) {
                $('.velaBlogSidebar .titleSidebar').on('click', function(e) {
                    $(this).toggleClass('active').parent().find('.velaContent').stop().slideToggle('medium');
                    e.preventDefault();
                });
                $('.velaBlogSidebar').addClass('accordion').find('.velaContent').slideUp('fast');
            }
        } else {
            $('.velaBlogSidebar .titleSidebar').removeClass('active').off().parent().find('.velaContent').removeAttr('style').slideDown('fast');
            $('.velaBlogSidebar').removeClass('accordion');
        }
    }

    function accordionFooter() {
        if ($(window).width() <= 767) {
            if (!$('.velaFooterMenu').hasClass('accordion')) {
                $('.velaFooterMenu .velaFooterTitle').on('click', function(e) {
                    $(this).toggleClass('active').parent().find('.velaContent').stop().slideToggle('medium');
                    e.preventDefault();
                });
                $('.velaFooterMenu').addClass('accordion').find('.velaContent').slideUp('fast');
            }
        } else {
            $('.velaFooterMenu .velaFooterTitle').removeClass('active').off().parent().find('.velaContent').removeAttr('style').slideDown('fast');
            $('.velaFooterMenu').removeClass('accordion');
        }
    }
    accordionSidebar();
    accordionFooter();
    $(window).resize(accordionSidebar);
    $(window).resize(accordionFooter);
};
vela.responsiveVideos = function() {
    var $iframeVideo = $('.proDetailInfo iframe[src*="youtube.com/embed"], .proDetailInfo iframe[src*="player.vimeo"]');
    var $iframeReset = $iframeVideo.add('iframe#admin_bar_iframe');
    $iframeVideo.each(function() {
        $(this).wrap('<div class="videoContainer"></div>');
    });
    $iframeReset.each(function() {
        this.src = this.src;
    });
};
vela.floatHeader = function() {
    function doFloatHeader(status) {
        if (status) {
            $('#velaHeader').addClass('headerFixed');
            var hideheight = $('#velaHeader').height() + 120;
            var pos = $(window).scrollTop();
            //var h=  $('#velaHeader').height();
            //$('.velaBreadcrumbWrap').css('padding-top',h);
            if (pos >= hideheight) {
                $('.headerMenu').addClass('velaHeaderFixed');
            } else {
                $('.headerMenu').removeClass('velaHeaderFixed');
            }
        } else {
            $('#velaHeader').removeClass('headerFixed');
            $('.headerMenu').removeClass('velaHeaderFixed');
        }
    }

    function velaFloatHeader() {
        if (window.float_header) {
            if (($(window).width()) >= 992) {
                doFloatHeader(true);
            } else if (($(window).width()) <= 991) {
                doFloatHeader(false)
            }
        }
    }

    function velaFloatHeaderChange() {
        if (window.float_header) {
            if (($(window).width()) >= 992) {
                var hideheight = $('#velaHeader').height() + 120;
                var pos = $(window).scrollTop();
                if (pos >= hideheight) {
                    $('.headerMenu').addClass('velaHeaderFixed');
                } else {
                    $('.headerMenu').removeClass('velaHeaderFixed');
                }
            } else if (($(window).width()) <= 991) {
                $('#velaMegamenu').removeClass('velaHeaderFixed');
            }
        }
    }
    velaFloatHeader();
    $(window).resize(velaFloatHeader);
    $(window).scroll(velaFloatHeaderChange);
};
vela.menuMobile = function() {
    vela.cache.$body.on("click", "#btnMenuMobile", function(e) {
        e.preventDefault();
        $('body').toggleClass("menuMobileActive");
    });
    vela.cache.$body.on("click", ".btnMenuClose, .menuMobileOverlay", function(e) {
        e.preventDefault();
        $('body').removeClass("menuMobileActive");
    });
};
vela.productCountdown = function() {
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime(window.countdown_format));
        });
    });
};
vela.owlOneCarousel = function() {
    $(".owlCarouselPlay .owl-carousel").each(function() {
        var owlCarousel = $(this);
        var nav = owlCarousel.data("nav"),
            navText = owlCarousel.data("navText"),
            dots = owlCarousel.data("dots"),
            autoplay = owlCarousel.data("autoplay"),
            autoplayTimeout = owlCarousel.data("autoplaytimeout"),
            loop = owlCarousel.data("loop"),
            margin = owlCarousel.data("margin"),
            center = owlCarousel.data("center"),
            columnOne = owlCarousel.data("columnone"),
            columnTwo = owlCarousel.data("columntwo"),
            columnThree = owlCarousel.data("columnthree"),
            columnFour = owlCarousel.data("columnfour"),
            columnFive = owlCarousel.data("columnfive");
        if (margin === undefined || margin == null) {
            margin = 30;
        }
        var config = {
            margin: margin,
            nav: nav,
            responsive: {
                0: {
                    items: columnFive
                },
                480: {
                    items: columnFour
                },
                768: {
                    items: columnThree
                },
                992: {
                    items: columnTwo
                },
                1200: {
                    items: columnOne
                }
            }
        };
        (dots === undefined || dots == null || dots.length <= 0 || dots != true) ? config.dots = false: config.dots = true;
        (navText === undefined || navText == null || navText.length <= 0) ? true: config.navText = navText;
        (loop === undefined || loop == null || loop.length <= 0) ? true: config.loop = loop;
        (center === undefined || center == null || loop.center <= 0) ? true: config.center = center;
        if (autoplay) {
            config.autoplay = autoplay;
            config.autoplayTimeout = autoplayTimeout;
            config.autoplayHoverPause = true;
        }
        if (columnOne != undefined) {
            owlCarousel.owlCarousel(config);
        }
    });
};
vela.lookbook = function() {
    vela.cache.$body.on('click', '.lookbItemButton', function() {
        var boxLookBook = $(this).parents('.velaBoxLookbook'),
            itemLookBook = boxLookBook.find('.lookbItem'),
            itemLookBookContent = boxLookBook.find('.lookbItemContent');
        if (!boxLookBook.hasClass('active')) {
            boxLookBook.addClass('active');
            itemLookBook.prepend('<div class="velaBoxLookbookOverlay"></div>');
            itemLookBookContent.prepend('<div class="velaBoxLookbookClose"></div>');
            itemLookBookContent.fadeIn(500);
        } else {
            boxLookBook.removeClass('active');
            $('.velaBoxLookbookOverlay').remove();
            $('.velaBoxLookbookClose').remove();
        }
    });
    vela.cache.$body.on('click', '.velaBoxLookbookOverlay, .velaBoxLookbookClose', function() {
        $('.velaBoxLookbook').removeClass('active');
        $('.velaBoxLookbookOverlay').remove();
        $('.velaBoxLookbookClose').remove();
        $('.lookbItemContent').fadeOut(500);
    });
};
vela.quickview = function() {
    var product = {};
    var option1 = '';
    var option2 = '';
    Shopify.doNotTriggerClickOnThumb = false;
    selectCallbackQuickView = function(variant, selector) {
        var productItem = jQuery('.jsQuickview .proBoxInfo'),
            addToCart = productItem.find('.btnAddToCart'),
            productQty = productItem.find('.proQuantity'),
            productPrice = productItem.find('.pricePrimary'),
            comparePrice = productItem.find('.priceCompare');
        if (variant) {
            if (variant.sku == '') {
                var variantSku = "N/A";
            } else {
                var variantSku = variant.sku;
            }
            productItem.find(".quickViewSKU").html("<label>SKU:</label>" + variantSku);
            if (variant.available) {
                addToCart.removeClass('disabled').removeAttr('disabled');
                addToCart.html("Add to Cart");
                productQty.show();
                productItem.find(".proBoxInfo .quickviewAvailability").removeClass('outstock').addClass('instock');
                productItem.find(".proBoxInfo .quickviewAvailability").append("<label>Availability</label>In stock");
            } else {
                addToCart.addClass('disabled').attr('disabled', 'disabled');
                addToCart.html("Sold Out");
                productQty.hide();
                productItem.find(".proBoxInfo .quickviewAvailability").removeClass('instock').addClass('outstock');
                productItem.find(".proBoxInfo .quickviewAvailability").append("<label>Availability</label>Out Of Stock");
            }
            productPrice.html(Shopify.formatMoney(variant.price, window.money));
            if (variant.compare_at_price > variant.price) {
                comparePrice
                    .html(Shopify.formatMoney(variant.compare_at_price, window.money)).show();
            } else {
                comparePrice.hide();
            }
            if (window.swatch_enable) {
                productItem.find(".selector-wrapper").addClass("hiddenVariant");
                var form = jQuery('#' + selector.domIdPrefix).closest('form');
                for (var i = 0, length = variant.options.length; i < length; i++) {
                    form.find('.swatch[data-option-index="' + i + '"] .js-qv-variant-value').each(function() {
                        if (_.isEqual(variant.options[i], $(this).text())) {
                            $(this).next('input[type=radio]').prop('checked', true);
                            var headerValue = form.find('.swatch[data-option-index="' + i + '"] .js-swatch-display');
                            headerValue.text(variant.options[i]);
                        }
                    });
                }
            }
            if (variant && variant.featured_image) {
                var originalImage = $(".proImageQuickview");
                var newImage = variant.featured_image;
                var newImage1 = variant.featured_media;
                var element = originalImage[0];
                Shopify.Image.switchImage(newImage, element, function(newImageSizedSrc, newImage, element) {
                    $('.proThumbnails img').each(function() {
                        var parentThumbImg = $(this).parent();
                        var productImage = $(this).parent().data("imageid");
                        if (productImage == newImage1.id) {
                            $(this).parent().trigger('click');
                            var itemid = $(this).parent().data("index");;
                            var owl = ".proThumbnailsQuickview .owl-carousel";
                            $(owl).trigger("to.owl.carousel", [itemid, [300], true])
                            return false;
                        }
                    });
                });
            }
            if (window.currencies) {
                Currency.convertAll(window.currency, Currency.cookie.read());
            }
        } else {
            addToCart.addClass('disabled').attr('disabled', 'disabled');
            addToCart.html("Out Of Stock");
            productQty.hide();
        }
    }
    changeImageQuickView = function(img, selector) {
        var src = $(img).attr("src");
        src = src.replace("_compact", "");
        $(selector).attr("src", src);
    }
    velaUpdateOptionsInSelector = function(t) {
        switch (t) {
            case 0:
                var n = "root";
                var r = $(".jsQuickview .single-option-selector:eq(0)");
                break;
            case 1:
                var n = $(".jsQuickview .single-option-selector:eq(0)").val();
                var r = $(".jsQuickview .single-option-selector:eq(1)");
                break;
            case 2:
                var n = $(".jsQuickview .single-option-selector:eq(0)").val();
                n += " / " + $(".jsQuickview .single-option-selector:eq(1)").val();
                var r = $(".jsQuickview .single-option-selector:eq(2)")
        }
        var i = r.val();
        r.empty();
        var s = Shopify.optionsMapQuickview[n];
        if (typeof s != "undefined") {
            for (var o = 0; o < s.length; o++) {
                var u = s[o];
                var a = $("<option></option>").val(u).html(u);
                r.append(a)
            }
        }
        $('.jsQuickview .swatch[data-option-index="' + t + '"] .swatch-element').each(function() {
            var variantValue = $(this).find('.js-qv-variant-value').text();
            if ($.inArray(variantValue, s) !== -1) {
                $(this).removeClass('soldout').show().find(':radio').removeAttr('disabled', 'disabled');
            } else {
                if (window.swatch_show_unvailable == true) {
                    $(this).addClass('soldout').find(':radio').removeAttr('checked').attr('disabled", "disabled')
                } else {
                    $(this).addClass('soldout').hide().find(':radio').removeAttr('checked').attr('disabled', 'disabled')
                }
            }
        });
        if ($.inArray(i, s) !== -1) {
            r.val(i)
        }
        r.trigger("change")
    }
    velaLinkOptionSelectors = function(t) {
        for (var n = 0; n < t.variants.length; n++) {
            var r = t.variants[n];
            if (r.available) {
                Shopify.optionsMapQuickview["root"] = Shopify.optionsMapQuickview["root"] || [];
                Shopify.optionsMapQuickview["root"].push(r.option1);
                Shopify.optionsMapQuickview["root"] = Shopify.uniq(Shopify.optionsMapQuickview["root"]);
                if (t.options.length > 1) {
                    var i = r.option1;
                    Shopify.optionsMapQuickview[i] = Shopify.optionsMapQuickview[i] || [];
                    Shopify.optionsMapQuickview[i].push(r.option2);
                    Shopify.optionsMapQuickview[i] = Shopify.uniq(Shopify.optionsMapQuickview[i])
                }
                if (t.options.length === 3) {
                    var i = r.option1 + " / " + r.option2;
                    Shopify.optionsMapQuickview[i] = Shopify.optionsMapQuickview[i] || [];
                    Shopify.optionsMapQuickview[i].push(r.option3);
                    Shopify.optionsMapQuickview[i] = Shopify.uniq(Shopify.optionsMapQuickview[i])
                }
            }
        }
        velaUpdateOptionsInSelector(0);
        if (t.options.length > 1)
            velaUpdateOptionsInSelector(1);
        if (t.options.length === 3)
            velaUpdateOptionsInSelector(2);
        $("#productSelectQuickview-option-0").change(function() {
            velaUpdateOptionsInSelector(1);
            if (t.options.length === 3)
                velaUpdateOptionsInSelector(2);
            return true
        });
        $("#productSelectQuickview-option-1").change(function() {
            if (t.options.length === 3)
                velaUpdateOptionsInSelector(2);
            return true
        });
    }
    loadQuickViewSlider = function(n, r) {
        var loadingImgQuickView = $('.loadingImage');
        var s = Shopify.resizeImage(n.featured_image, "grande");
        loadingImgQuickView.hide();
        var activeClass = "";
        if (n.media.length > 0) {
            var o = r.find(".proThumbnailsQuickview .owl-carousel");
            for (i in n.media) {
                if (i == 0) {
                    activeClass = "active";
                } else {
                    activeClass = "";
                }
                var f = '<div class="thumbItem"><a href="javascript:void(0)" class="' + activeClass + '"  data-index="' + i + '" data-imageid="' + n.media[i].id + '" data-image="' + n.media[i].preview_image.src + '" data-zoom-image="' + n.media[i].preview_image.src + '" ><img src="' + n.media[i].preview_image.src + '" alt="' + n.media[i].preview_image.alt + '" /></a></div>';
                o.append(f)
            }
            o.find("a").click(function() {
                var t = r.find(".proImageQuickview");
                if (t.attr("src") != $(this).attr("data-image")) {
                    for (i in n.media) {
                        if (o.find("a").hasClass("active")) {
                            o.find("a").removeClass("active");
                        }
                    }
                    t.attr("src", $(this).attr("data-image"));
                    $(this).addClass("active");

                    loadingImgQuickView.show();
                    t.load(function(t) {
                        $(this).unbind("load");
                        loadingImgQuickView.hide()
                    })
                }
            });
            o.owlCarousel({
                items: 4,
                nav: true,
                mouseDrag: false,
                dots: false
            }).css("visibility", "visible")
        } else {
            r.find(".jsQuickview .proThumbnailsQuickview").remove();
        }
    }
    convertToSlug = function(e) {
        return e.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
    }
    addCheckedSwatch = function() {
        vela.cache.$body.on('click', '.swatch .color label', function() {
            $('.swatch .color').each(function() {
                $(this).find('label').removeClass('checkedBox');
            });
            $(this).addClass('checkedBox');
        });
    }
    quickViewVariants = function(t, quickview) {
        if (t.variants.length > 1) {
            for (var r = 0; r < t.variants.length; r++) {
                var i = t.variants[r];
                var s = '<option value="' + i.id + '">' + i.title + "</option>";
                quickview.find("form.formQuickview .proVariantsQuickview > select").append(s)
            }
            new Shopify.OptionSelectors('productSelectQuickview', {
                product: t,
                onVariantSelected: selectCallbackQuickView
            });
            if (t.options.length == 1) {
                $("form.formQuickview .selector-wrapper:eq(0)").prepend("<label>" + t.options[0].name + "</label>")
            }
            quickview.find("form.formQuickview .selector-wrapper label").each(function(n, r) {
                $(this).html(t.options[n].name)
            });
            if (window.swatch_enable) {
                var o = window.file_url.substring(0, window.file_url.lastIndexOf("?"));
                var u = window.asset_url.substring(0, window.asset_url.lastIndexOf("?"));
                var a = "";
                for (var r = 0; r < t.options.length; r++) {
                    a += '<div class="swatch clearfix" data-option-index="' + r + '">';
                    a += '<div class="header">' + t.options[r].name + ": <span class='js-swatch-display text'>&nbsp;</span></div>";
                    var f = false;
                    if (/Color|Colour/i.test(t.options[r].name)) {
                        f = true
                    }
                    var l = new Array;
                    for (var c = 0; c < t.variants.length; c++) {
                        var i = t.variants[c];
                        var h = i.options[r];
                        var p = this.convertToSlug(h);
                        var d = "quickview-swatch-" + r + "-" + p;
                        if (l.indexOf(h) < 0) {
                            var bgImage = o + p + '.png';
                            if (i.featured_image) {
                                bgImage = i.featured_image.src;
                            }
                            a += '<div data-value="' + h + '" class="swatch-element ' + (f ? "color " : "") + p + (i.available ? " available " : " soldout ") + '">';
                            if (f) {
                                a += '<div class="tooltip">' + h + "</div>"
                            }
                            a += '<span class="js-qv-variant-value hidden">' + h + '</span>'
                            a += '<input id="' + d + '" type="radio" name="option-' + r + '" value="' + h + '" ' + (c == 0 ? " checked " : "") + (i.available ? "" : " disabled") + " />";
                            if (f) {
                                a += '<label class="' + p + '" for="' + d + '" style="background-color: ' + p + '; background-image: url(' + bgImage + '.png)"><img class="crossed-out" src="' + u + 'soldout.png" /><i></i></label>'
                            } else {
                                a += '<label class="' + p + '" for="' + d + '">' + h + '<img class="crossed-out" src="' + u + 'soldout.png" /></label>'
                            }
                            a += "</div>";
                            if (i.available) {
                                $('.jsQuickview .swatch[data-option-index="' + r + '"] .' + p).removeClass("soldout").addClass("available").find(":radio").removeAttr("disabled")
                            }
                            l.push(h)
                        }
                    }
                    a += "</div>"
                }
                quickview.find("form.formQuickview .proVariantsQuickview > select").after(a);
                quickview.find(".swatch :radio").change(function() {
                    var t = $(this).closest(".swatch").attr("data-option-index");
                    var q = $(this).prev('.js-qv-variant-value').text();
                    $(this).closest("form").find(".single-option-selector").eq(t).val(q).trigger("change");

                });
                addCheckedSwatch();
            }
            if (t.available) {
                Shopify.optionsMapQuickview = {};
                if (!window.swatch_show_unvailable) {
                    velaLinkOptionSelectors(t);
                } else if (window.swatch_enable) {
                    velaLinkOptionSelectors(t);
                }
            }
        } else {
            quickview.find("form.formQuickview .proVariantsQuickview > select").remove();
            var v = '<input type="hidden" name="id" value="' + t.variants[0].id + '">';
            quickview.find("form.formQuickview").append(v)
        }
    }
    validateQty = function(qty) {
        if ((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {

        } else {
            qty = 1;
        }
        return qty;
    };
    qvAddToCart = function() {
        if (window.ajaxcart_type != "page") {
            ajaxCart.init({
                formSelector: '.formQuickview',
                cartContainer: '#cartContainer',
                addToCartSelector: '.btnAddToCart',
                cartCountSelector: '#CartCount',
                cartCostSelector: '#CartCost',
                moneyFormat: null
            });
        }
    }
    $(document).on("click", ".proThumbnailsQuickview li", function() {
        changeImageQuickView($(this).find("img:first-child"), ".proImageQuickview");
    });
    $(document).on('click', '.quickviewClose, .quickviewOverlay', function(e) {
        $("#velaQuickView").fadeOut(0);
        $(".jsQuickview").html("");
        $(".jsQuickview").removeClass('velaFadeOut');
    });
    $(document).on('click', '.btnProductQuickview', function(e) {
        vela.cache.$velaLoading.show();
        var producthandle = $(this).data("handle");
        Shopify.getProduct(producthandle, function(product) {
            var qvhtml = $("#quickviewModal").html();
            $(".jsQuickview").html(qvhtml);
            var quickview = $(".jsQuickview");
            var productdes = product.description.replace(/(<([^>]+)>)/ig, "");
            var shortProductDesc = "";
            var featured_image = product.media[0].preview_image.src;
            if (product.description.indexOf("[SHORTDESCRIPTION]") != -1) {
                shortProductDesc = product.description.split("[SHORTDESCRIPTION]")[0];
                quickview.find(".proShortDescription").html(shortProductDesc);
            } else {
                shortProductDesc = productdes.split(" ").splice(0, 30).join(" ") + "...";
                quickview.find(".proShortDescription").text(shortProductDesc);
            }
            quickview.find(".proImageQuickview").attr("src", featured_image);
            quickview.find(".proImage").attr("href", product.url);
            quickview.find(".pricePrimary").html(Shopify.formatMoney(product.price, window.money));
            quickview.find(".proBoxInfo").attr("id", "product-" + product.id);
            quickview.find(".formQuickview").attr("id", "product-actions-" + product.id);
            quickview.find(".formQuickview select").attr("id", "productSelectQuickview");
            quickview.find(".proBoxInfo .quickviewName").html("<a href='" + product.url + "'>" + product.title + "</a>");
            quickview.find(".proBoxInfo .quickViewVendor").append("<label>Vendor:</label> " + product.vendor);
            //quickview.find(".proBoxInfo .quickViewType").append(product.type);
            if (product.variants[0].sku == '') {
                var variantSku = "N/A";
            } else {
                var variantSku = product.variants[0].sku;
            }
            quickview.find(".proBoxInfo .quickViewSKU").append("<label>SKU:</label> " + variantSku);
            if (product.available) {
                quickview.find(".proBoxInfo .quickviewAvailability").removeClass('outstock').addClass('instock');
                quickview.find(".proBoxInfo .quickviewAvailability").append("<label>Availability:</label> In stock");
            } else {
                quickview.find(".proBoxInfo .quickviewAvailability").removeClass('instock').addClass('outstock');
                quickview.find(".proBoxInfo .quickviewAvailability").append("<label>Availability:</label> Out Of Stock");
            }
            if (product.compare_at_price > product.price) {
                quickview.find(".priceCompare").html(Shopify.formatMoney(product.compare_at_price_max, window.money)).show();
                quickview.find(".pricePrimary").addClass("priceSale");
            } else {
                quickview.find(".priceCompare").html("");
            }
            if (!product.available) {
                quickview.find("select, input").hide();
                quickview.find(".btnAddToCart").html("Sold Out").addClass("disabled").attr("disabled", "disabled");
                quickview.find(".proQuantity").hide();
            } else {
                quickViewVariants(product, quickview);
            }
            loadQuickViewSlider(product, quickview);
            $('#velaQuickView').fadeIn(500);
            $('.jsQuickview').fadeIn(500);
            $('.jsQuickview').addClass('velaFadeOut');

            vela.cache.$velaLoading.hide();
            qvAddToCart();
            if (window.currencies) {
                Currency.convertAll(window.currency, Currency.cookie.read());
            }
        });
        return false;
    });
};
vela.goToTop = function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 200) {
            $('#goToTop').fadeIn();
        } else {
            $('#goToTop').fadeOut();
        }
    });
    $("#goToTop").click(function() {
        $("body,html").animate({
            scrollTop: 0
        }, "normal");
        $("#pageContainer").animate({
            scrollTop: 0
        }, "normal");
        return !1
    });
};
vela.newsletter = function() {
    var alertNewsletter;
    $('.js-vela-newsletter').each(function() {
        var $form = $(this);
        $form.on('submit', function(event) {
            event.preventDefault();
            $('.js-alert-newsletter').remove();
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
                cache: false,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(data) {
                    if (data.result === 'success') {
                        $form.prepend(alertNewsletter(window.newsletter_success, 'success'));
                        $('.js-input-newsletter').val('');
                    } else {
                        $form.prepend(alertNewsletter(data.msg.replace('0 - ', ''), 'error'));
                    }
                },
                error: function(err) {
                    $form.prepend(alertNewsletter(err, 'error'));
                }
            });
        });
    });
    alertNewsletter = function(message, type) {
        var alert = '<div class="js-alert-newsletter alert-dismissible  alert alert-' + type + '">' + message + '<button type="button" data-dismiss="alert" aria-hidden="true" aria-label="Close" class="btnClose">x</button></div>';
        return alert;
    };
};
vela.productLoadMore = function() {
    function loadmoreExecute() {
        var velaLoadNode = $('.productLoadMore .btnLoadMore');
        var velaLoadUrl = $('.productLoadMore .btnLoadMore').attr("href");
        $.ajax({
            type: 'GET',
            url: velaLoadUrl,
            beforeSend: function() {
                vela.cache.$velaLoading.show();
            },
            success: function(data) {
                velaLoadNode.remove();
                vela.cache.$velaLoading.hide();
                var filteredData = $(data).find(".producsLoadMore");
                filteredData.insertBefore($(".proLoadMoreBottom"));
                btnMoreEvent();
            },
            dataType: "html"
        });
    }

    function btnMoreEvent() {
        $('.productLoadMore .btnLoadMore').click(function(e) {
            if ($(this).hasClass('disableLoadMore')) {
                e.stopPropagation();
                return false;
            } else {
                loadmoreExecute();
                e.stopPropagation();
                return false;
            }
        });
    }
    btnMoreEvent();
};
vela.velaAccountPage = function() {
    $('body').on('click', '.velaRecoverPassword', function(evt) {
        evt.preventDefault();
        $('#RecoverPasswordForm').removeClass('hidden');
        $('#CustomerLoginForm').addClass('hidden');
    });
    $('body').on('click', '.velaHideRecoverPasswordLink', function(evt) {
        evt.preventDefault();
        $('#RecoverPasswordForm').addClass('hidden');
        $('#CustomerLoginForm').removeClass('hidden');
    });
    if (vela.getHash() == '#recover') {
        $('#RecoverPasswordForm').removeClass('hidden');
        $('#CustomerLoginForm').addClass('hidden');
    }
    $('body').on('click', '.velaShowPassword', function(event) {
        var btnPassword = $(this),
            passwordField = btnPassword.prev('input');
        if (passwordField.attr('type') == 'password') {
            passwordField.attr('type', 'text');
            btnPassword.text("Hide");
        } else {
            passwordField.attr('type', 'password');
            btnPassword.text("Show");
        }
    });
};
vela.productImage = function() {
    if (vela.cache.$velaProductImage.length > 0) {
        if (($(window).width()) >= 992) {
            //DESKTOP
            var zoomYN = vela.cache.$velaProductImage.data('zoom-enable'),
                zoomScroll = vela.cache.$velaProductImage.data('zoom-scroll'),
                zoomType = vela.cache.$velaProductImage.data('zoom-type'),
                zoomWindowWidth = vela.cache.$velaProductImage.data('zoom-width'),
                zoomWindowHeight = vela.cache.$velaProductImage.data('zoom-height'),
                zoomLensSize = vela.cache.$velaProductImage.data('zoom-lens'),
                zoomLensShape = vela.cache.$velaProductImage.data('lens-shape'),
                zoomLensBorderColor = vela.cache.$velaProductImage.data('lens-border');
            vela.cache.$velaProductImage.elevateZoom({
                zoomEnabled: zoomYN,
                gallery: 'productThumbs',
                galleryActiveClass: 'active',
                cursor: 'pointer',
                zoomType: zoomType,
                scrollZoom: zoomScroll,
                zoomWindowWidth: zoomWindowWidth,
                zoomWindowHeight: zoomWindowHeight,
                lensSize: zoomLensSize,
                lensShape: zoomLensShape,
                onImageSwapComplete: function() {
                    $(".zoomWrapper div").hide();
                }
            });
            vela.cache.$velaProductImage.bind('click', function(e) {
                var ez1 = $('#ProductPhotoImg').data('elevateZoom');
                var imageGallery1 = [];
                $.each(ez1.getGalleryList(), function(index, value) {
                    imageGallery1.push({
                        "src": value.href
                    });
                });
                $.fancybox.open(imageGallery1);
                return false;
            });
            $("#velaViewImage").bind('click', function(e) {
                var ez1 = $('#ProductPhotoImg').data('elevateZoom');
                var imageGallery1 = [];
                $.each(ez1.getGalleryList(), function(index, value) {
                    imageGallery1.push({
                        "src": value.href
                    });
                });
                $.fancybox.open(imageGallery1);
                return false;
            });
        } else if (($(window).width()) <= 991) {
            //MOBILE
            vela.cache.$velaProductImage.elevateZoom({
                zoomEnabled: false,
                gallery: 'productThumbs'
            });
            var imageGallery = [];
            var ez = vela.cache.$velaProductImage.data('elevateZoom');
            $.each(ez.getGalleryList(), function(index, value) {
                imageGallery.push({
                    "src": value.href
                });
            });
            // vela.cache.$velaProductImage.unbind('click');
            // $('#proFeaturedImage').bind('click', function(e) {
            //     $.fancybox.open(imageGallery);
            //     return false;
            // });
        }
    }
};
vela.Drawers = (function() {
    var Drawer = function(id, position, iscart, options) {
        var defaults = {
            close: '.jsDrawerClose',
            open: '.jsDrawerOpen' + position,
            openClass: 'jsDrawerOpen',
            dirOpenClass: 'jsDrawerOpen' + position
        };
        this.$nodes = {
            parent: $('body, html'),
            page: $('#pageContainer'),
            moved: $('.isMoved')
        };
        this.config = $.extend(defaults, options);
        this.position = position;
        this.iscart = iscart;
        this.$drawer = $('#' + id);
        if (!this.$drawer.length) {
            return false;
        }
        this.drawerIsOpen = false;
        this.init();
    };
    Drawer.prototype.init = function() {
        $(this.config.open).on('click', $.proxy(this.open, this));
        this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));
    };
    Drawer.prototype.open = function(evt) {
        if (window.ajaxcart_type == 'modal' && this.iscart) {
            var externalCall = false;
            this.$drawer.modal(); //Use modal Bootstrap
            if (evt) {
                evt.preventDefault();
            } else {
                externalCall = true;
            }
            if (evt && evt.stopPropagation) {
                evt.stopPropagation();
                this.$activeSource = $(evt.currentTarget);
            }
            if (this.config.onDrawerOpen && typeof(this.config.onDrawerOpen) == 'function') {
                if (!externalCall) {
                    this.config.onDrawerOpen();
                }
            }
        } else {
            var externalCall = false;
            if (evt) {
                evt.preventDefault();
            } else {
                externalCall = true;
            }
            if (evt && evt.stopPropagation) {
                evt.stopPropagation();
                this.$activeSource = $(evt.currentTarget);
            }
            if (this.drawerIsOpen && !externalCall) {
                return this.close();
            }
            this.$nodes.moved.addClass('is-transitioning');
            this.$drawer.prepareTransition();
            this.$nodes.parent.addClass(this.config.openClass + ' ' + this.config.dirOpenClass);
            this.drawerIsOpen = true;
            this.trapFocus(this.$drawer, 'drawer_focus');
            if (this.config.onDrawerOpen && typeof(this.config.onDrawerOpen) == 'function') {
                if (!externalCall) {
                    this.config.onDrawerOpen();
                }
            }
            if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
                this.$activeSource.attr('aria-expanded', 'true');
            }
            this.$nodes.page.on('touchmove.drawer', function() {
                return false;
            });
            this.$nodes.page.on('click.drawer', $.proxy(function() {
                this.close();
                return false;
            }, this));
        }
    };
    Drawer.prototype.close = function() {
        if (!this.drawerIsOpen) { // don't close a closed drawer
            return;
        }
        $(document.activeElement).trigger('blur');
        this.$nodes.moved.prepareTransition({
            disableExisting: true
        });
        this.$drawer.prepareTransition({
            disableExisting: true
        });
        this.$nodes.parent.removeClass(this.config.dirOpenClass + ' ' + this.config.openClass);
        this.drawerIsOpen = false;
        this.removeTrapFocus(this.$drawer, 'drawer_focus');
        this.$nodes.page.off('.drawer');
    };
    Drawer.prototype.trapFocus = function($container, eventNamespace) {
        var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';
        $container.attr('tabindex', '-1');
        $container.focus();
        $(document).on(eventName, function(evt) {
            if ($container[0] !== evt.target && !$container.has(evt.target).length) {
                $container.focus();
            }
        });
    };
    Drawer.prototype.removeTrapFocus = function($container, eventNamespace) {
        var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';
        $container.removeAttr('tabindex');
        $(document).off(eventName);
    };
    return Drawer;
})();
/* ================ SHOPIFY DEBUT - VELA CUSTOMIZE ================ */
window.velatheme = window.velatheme || {};
velatheme.Sections = function Sections() {
    this.constructors = {};
    this.instances = [];
};
velatheme.Sections.prototype = _.assignIn({}, velatheme.Sections.prototype, {
    _createInstance: function(container, constructor) {
        var $container = $(container);
        var id = $container.attr('data-section-id');
        var type = $container.attr('data-section-type');
        constructor = constructor || this.constructors[type];
        if (_.isUndefined(constructor)) {
            return;
        }
        var instance = _.assignIn(new constructor(container), {
            id: id,
            type: type,
            container: container
        });
        this.instances.push(instance);
    },
    register: function(type, constructor) {
        this.constructors[type] = constructor;
        $('[data-section-type=' + type + ']').each(function(index, container) {
            this._createInstance(container, constructor);
        }.bind(this));
    }
});
vela.velaBannerTop = function() {
    var date = new Date();
    var minutes = 5;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    if ($.cookie('velaBannerTop') == 'closed') {
        $('#bannerTop').removeClass('active');
    } else {
        $('#bannerTop').addClass('active');
    }
    $('#bannerTop .btn-bannerTop').click(function() {
        if ($('#bannerTop').hasClass('active')) {
            $.cookie('velaBannerTop', 'closed', date);
            $('#bannerTop').removeClass('active');
        } else {
            $.cookie('velaBannerTop', 'opened', date);
            $('#bannerTop').addClass('active');
        }

    });
};
velatheme.Slideshow = (function() {
    this.$slideshow = null;
    var classes = {
        wrapper: 'velaSlideshowWrapper',
        slideshow: 'vela--slideshow',
        currentSlide: 'slick-current',
        video: 'velassVideo',
        videoBackground: 'velassVideoBackground',
        closeVideoBtn: 'btnssVideoControlClose',
        pauseButton: 'btnssPause',
        isPaused: 'is-paused'
    };

    function slideshow(el) {
        this.$slideshow = $(el);
        this.$wrapper = this.$slideshow.closest('.' + classes.wrapper);
        this.$pause = this.$wrapper.find('.' + classes.pauseButton);
        this.settings = {
            accessibility: true,
            arrows: this.$slideshow.data('navigation'),
            dots: this.$slideshow.data('pagination'),
            fade: true,
            pauseOnHover: true,
            draggable: true,
            touchThreshold: 20,
            autoplay: this.$slideshow.data('autoplay'),
            autoplaySpeed: this.$slideshow.data('speed')
        };
        this.$slideshow.on('beforeChange', beforeChange.bind(this));
        this.$slideshow.on('init', slideshowA11y.bind(this));
        this.$slideshow.slick(this.settings);
        this.$pause.on('click', this.togglePause.bind(this));
    }

    function slideshowA11y(event, obj) {
        var $slider = obj.$slider;
        var $list = obj.$list;
        var $wrapper = this.$wrapper;
        var autoplay = this.settings.autoplay;
        $slider.removeClass('velaSliderLoading');
        // Remove default Slick aria-live attr until slider is focused
        $list.removeAttr('aria-live');
        // When an element in the slider is focused
        // pause slideshow and set aria-live.
        $wrapper.on('focusin', function(evt) {
            if (!$wrapper.has(evt.target).length) {
                return;
            }
            $list.attr('aria-live', 'polite');
            if (autoplay) {
                $slider.slick('slickPause');
            }
        });
        //Resume autoplay
        $wrapper.on('focusout', function(evt) {
            if (!$wrapper.has(evt.target).length) {
                return;
            }
            $list.removeAttr('aria-live');
            if (autoplay) {
                // Manual check if the focused element was the video close button
                // to ensure autoplay does not resume when focus goes inside YouTube iframe
                if ($(evt.target).hasClass(classes.closeVideoBtn)) {
                    return;
                }
                $slider.slick('slickPlay');
            }
        });
        // Add arrow key support when focused
        if (obj.$dots) {
            obj.$dots.on('keydown', function(evt) {
                if (evt.which === 37) {
                    $slider.slick('slickPrev');
                }
                if (evt.which === 39) {
                    $slider.slick('slickNext');
                }
                // Update focus on newly selected tab
                if ((evt.which === 37) || (evt.which === 39)) {
                    obj.$dots.find('.slick-active button').focus();
                }
            });
        }
    };

    function beforeChange(event, slick, currentSlide, nextSlide) {
        var $slider = slick.$slider;
        var $currentSlide = $slider.find('.' + classes.currentSlide);
        var $nextSlide = $slider.find('.velassSlide[data-slick-index="' + nextSlide + '"]');
        if (isVideoInSlide($currentSlide)) {
            var $currentVideo = $currentSlide.find('.' + classes.video);
            var currentVideoId = $currentVideo.attr('id');
            velatheme.SlideshowVideo.pauseVideo(currentVideoId);
            $currentVideo.attr('tabindex', '-1');
        }
        if (isVideoInSlide($nextSlide)) {
            var $video = $nextSlide.find('.' + classes.video);
            var videoId = $video.attr('id');
            var isBackground = $video.hasClass(classes.videoBackground);
            if (isBackground) {
                velatheme.SlideshowVideo.playVideo(videoId);
            } else {
                $video.attr('tabindex', '0');
            }
        }
    }

    function isVideoInSlide($slide) {
        return $slide.find('.' + classes.video).length;
    }
    slideshow.prototype.togglePause = function() {
        var slideshowSelector = getSlideshowId(this.$pause);
        if (this.$pause.hasClass(classes.isPaused)) {
            this.$pause.removeClass(classes.isPaused);
            $(slideshowSelector).slick('slickPlay');
        } else {
            this.$pause.addClass(classes.isPaused);
            $(slideshowSelector).slick('slickPause');
        }
    };

    function getSlideshowId($el) {
        return '#velaSlideshows' + $el.data('id');
    }
    return slideshow;
})();

velatheme.SlideshowVideo = (function() {
    var autoplayCheckComplete = false;
    var autoplayAvailable = false;
    var playOnClickChecked = false;
    var playOnClick = false;
    var youtubeLoaded = false;
    var videos = {};
    var videoPlayers = [];
    var videoOptions = {
        ratio: 16 / 9,
        playerVars: {
            // eslint-disable-next-line camelcase
            iv_load_policy: 3,
            modestbranding: 1,
            autoplay: 0,
            controls: 0,
            showinfo: 0,
            wmode: 'opaque',
            branding: 0,
            autohide: 0,
            rel: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerChange
        }
    };
    var classes = {
        playing: 'video-is-playing',
        paused: 'video-is-paused',
        loading: 'video-is-loading',
        loaded: 'video-is-loaded',
        slideshowWrapper: 'velaSlideshowWrapper',
        slide: 'velassSlide',
        slideBackgroundVideo: 'velassSlideBackgroundVideo',
        slideDots: 'slick-dots',
        videoChrome: 'velassVideo-chrome',
        videoBackground: 'velassVideoBackground',
        playVideoBtn: 'btnssVideoControlPlay',
        closeVideoBtn: 'btnssVideoControlClose',
        currentSlide: 'slick-current',
        slickClone: 'slick-cloned',
        supportsAutoplay: 'autoplay',
        supportsNoAutoplay: 'no-autoplay'
    };

    function init($video) {
        if (!$video.length) {
            return;

        }

        videos[$video.attr('id')] = {
            id: $video.attr('id'),
            videoId: $video.data('id'),
            type: $video.data('type'),
            status: $video.data('type') === 'chrome' ? 'closed' : 'background', // closed, open, background
            videoSelector: $video.attr('id'),
            $parentSlide: $video.closest('.' + classes.slide),
            $parentSlideshowWrapper: $video.closest('.' + classes.slideshowWrapper),
            controls: $video.data('type') === 'background' ? 0 : 1,
            slideshow: $video.data('slideshow')
        };

        if (!youtubeLoaded) {
            // This code loads the IFrame Player API code asynchronously.
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }

    function customPlayVideo(playerId) {
        if (!playOnClickChecked && !playOnClick) {
            return;
        }
        if (playerId && typeof videoPlayers[playerId].playVideo === 'function') {
            privatePlayVideo(playerId);
        }
    }

    function pauseVideo(playerId) {
        if (videoPlayers[playerId] && typeof videoPlayers[playerId].pauseVideo === 'function') {
            videoPlayers[playerId].pauseVideo();
        }
    }

    function loadVideos() {
        for (var key in videos) {
            if (videos.hasOwnProperty(key)) {
                var args = $.extend({}, videoOptions, videos[key]);
                args.playerVars.controls = args.controls;
                videoPlayers[key] = new YT.Player(key, args);
            }
        }
        initEvents();
        youtubeLoaded = true;
    }

    function loadVideo(key) {
        if (!youtubeLoaded) {
            return;
        }
        var args = $.extend({}, videoOptions, videos[key]);
        args.playerVars.controls = args.controls;
        videoPlayers[key] = new YT.Player(key, args);
        initEvents();
    }

    function privatePlayVideo(id, clicked) {
        var videoData = videos[id];
        var player = videoPlayers[id];
        var $slide = videos[id].$parentSlide;

        if (playOnClick) {
            // playOnClick means we are probably on mobile (no autoplay).
            // setAsPlaying will show the iframe, requiring another click
            // to play the video.
            setAsPlaying(videoData);
        } else if (clicked || (autoplayCheckComplete && autoplayAvailable)) {
            // Play if autoplay is available or clicked to play
            $slide.removeClass(classes.loading);
            setAsPlaying(videoData);
            player.playVideo();
            return;
        }
        // Check for autoplay if not already done
        if (!autoplayCheckComplete) {
            autoplayCheckFunction(player, $slide);
        }
    }

    function setAutoplaySupport(supported) {
        var supportClass = supported ? classes.supportsAutoplay : classes.supportsNoAutoplay;
        $(document.documentElement).addClass(supportClass);
        if (!supported) {
            playOnClick = true;
        }
        autoplayCheckComplete = true;
    }

    function autoplayCheckFunction(player, $slide) {
        // attempt to play video
        player.playVideo();
        autoplayTest(player)
            .then(function() {
                setAutoplaySupport(true);
            })
            .fail(function() {
                // No autoplay available (or took too long to start playing).
                // Show fallback image. Stop video for safety.
                setAutoplaySupport(false);
                player.stopVideo();
            })
            .always(function() {
                autoplayCheckComplete = true;
                $slide.removeClass(classes.loading);
            });
    }

    function autoplayTest(player) {
        var deferred = $.Deferred();
        var wait;
        var timeout;
        wait = setInterval(function() {
            if (player.getCurrentTime() <= 0) {
                return;
            }
            autoplayAvailable = true;
            clearInterval(wait);
            clearTimeout(timeout);
            deferred.resolve();
        }, 500);
        timeout = setTimeout(function() {
            clearInterval(wait);
            deferred.reject();
        }, 4000); // subjective. test up to 8 times over 4 seconds
        return deferred;
    }

    function playOnClickCheck() {
        // Bail early for a few instances:
        // - small screen
        // - device sniff mobile browser
        if (playOnClickChecked) {
            return;
        }
        if ($(window).width() < 767) {
            playOnClick = true;
        }
        if (playOnClick) {
            // No need to also do the autoplay check
            setAutoplaySupport(false);
        }
        playOnClickChecked = true;
    }
    // The API will call this function when each video player is ready
    function onPlayerReady(evt) {
        evt.target.setPlaybackQuality('hd1080');
        var videoData = getVideoOptions(evt);
        playOnClickCheck();
        // Prevent tabbing through YouTube player controls until visible
        $('#' + videoData.id).attr('tabindex', '-1');
        sizeBackgroundVideos();
        // Customize based on options from the video ID
        switch (videoData.type) {
            case 'background-chrome':
            case 'background':
                evt.target.mute();
                // Only play the video if it is in the active slide
                if (videoData.$parentSlide.hasClass(classes.currentSlide)) {
                    privatePlayVideo(videoData.id);
                }
                break;
        }
        videoData.$parentSlide.addClass(classes.loaded);
    }

    function onPlayerChange(evt) {
        var videoData = getVideoOptions(evt);
        switch (evt.data) {
            case 0: // ended
                setAsFinished(videoData);
                break;
            case 1: // playing
                setAsPlaying(videoData);
                break;
            case 2: // paused
                setAsPaused(videoData);
                break;
        }
    }

    function setAsFinished(videoData) {
        switch (videoData.type) {
            case 'background':
                videoPlayers[videoData.id].seekTo(0);
                break;
            case 'background-chrome':
                videoPlayers[videoData.id].seekTo(0);
                closeVideo(videoData.id);
                break;
            case 'chrome':
                closeVideo(videoData.id);
                break;
        }
    }

    function setAsPlaying(videoData) {
        var $slideshow = videoData.$parentSlideshowWrapper;
        var $slide = videoData.$parentSlide;
        $slide.removeClass(classes.loading);
        // Do not change element visibility if it is a background video
        if (videoData.status === 'background') {
            return;
        }
        $('#' + videoData.id).attr('tabindex', '0');
        switch (videoData.type) {
            case 'chrome':
            case 'background-chrome':
                $slideshow
                    .removeClass(classes.paused)
                    .addClass(classes.playing);
                //privatePlayVideo(videoData.id, true);
                $slide
                    .removeClass(classes.paused)
                    .addClass(classes.playing);
                //privatePlayVideo(videoData.id, true);
                break;
        }
        // Update focus to the close button so we stay within the slide
        $slide.find('.' + classes.closeVideoBtn).focus();
    }

    function setAsPaused(videoData) {
        var $slideshow = videoData.$parentSlideshowWrapper;
        var $slide = videoData.$parentSlide;
        if (videoData.type === 'background-chrome') {
            closeVideo(videoData.id);
            return;
        }
        // YT's events fire after our click event. This status flag ensures
        // we don't interact with a closed or background video.
        if (videoData.status !== 'closed' && videoData.type !== 'background') {
            $slideshow.addClass(classes.paused);
            $slide.addClass(classes.paused);
        }
        if (videoData.type === 'chrome' && videoData.status === 'closed') {
            $slideshow.removeClass(classes.paused);
            $slide.removeClass(classes.paused);
        }
        $slideshow.removeClass(classes.playing);
        $slide.removeClass(classes.playing);
    }

    function closeVideo(playerId) {
        var videoData = videos[playerId];
        var $slideshow = videoData.$parentSlideshowWrapper;
        var $slide = videoData.$parentSlide;
        var classesToRemove = [classes.pause, classes.playing].join(' ');
        $('#' + videoData.id).attr('tabindex', '-1');
        videoData.status = 'closed';
        switch (videoData.type) {
            case 'background-chrome':
                videoPlayers[playerId].mute();
                setBackgroundVideo(playerId);
                break;
            case 'chrome':
                videoPlayers[playerId].stopVideo();
                setAsPaused(videoData); // in case the video is already paused
                break;
        }
        $slideshow.removeClass(classesToRemove);
        $slide.removeClass(classesToRemove);
    }

    function getVideoOptions(evt) {
        var videosid = $(".slideShowVela .slick-active .velassVideo").attr('id');
        if (videosid == undefined) {
            videosid = evt.target.l.id;
        }
        return videos[videosid];
        //return videos[evt.target.m.id];
    }

    function startVideoOnClick(playerId) {
        var videoData = videos[playerId];
        // add loading class to slide
        videoData.$parentSlide.addClass(classes.loading);
        videoData.status = 'open';
        switch (videoData.type) {
            case 'background-chrome':
                unsetBackgroundVideo(playerId, videoData);
                videoPlayers[playerId].unMute();
                privatePlayVideo(playerId, true);
                break;
            case 'chrome':
                privatePlayVideo(playerId, true);
                break;
        }
        // esc to close video player
        $(document).on('keydown.videoPlayer', function(evt) {
            if (evt.keyCode === 27) {
                closeVideo(playerId);
            }
        });
    }

    function sizeBackgroundVideos() {
        $('.' + classes.videoBackground).each(function(index, el) {
            sizeBackgroundVideo($(el));
        });
    }

    function sizeBackgroundVideo($player) {
        var $slide = $player.closest('.' + classes.slide);
        // Ignore cloned slides
        if ($slide.hasClass(classes.slickClone)) {
            return;
        }
        var slideWidth = $slide.width();
        var playerWidth = $player.width();
        var playerHeight = $player.height();
        // when screen aspect ratio differs from video, video must center and underlay one dimension
        if (slideWidth / videoOptions.ratio < playerHeight) {
            playerWidth = Math.ceil(playerHeight * videoOptions.ratio); // get new player width
            $player.width(playerWidth).height(playerHeight).css({
                left: (slideWidth - playerWidth) / 2,
                top: 0
            }); // player width is greater, offset left; reset top
        } else { // new video width < window width (gap to right)
            playerHeight = Math.ceil(slideWidth / videoOptions.ratio); // get new player height
            $player.width(slideWidth).height(playerHeight).css({
                left: 0,
                top: (playerHeight - playerHeight) / 2
            }); // player height is greater, offset top; reset left
        }
        $player
            .prepareTransition()
            .addClass(classes.loaded);
    }

    function unsetBackgroundVideo(playerId) {
        // Switch the background-chrome to a chrome-only player once played
        $('#' + playerId)
            .removeAttr('style')
            .removeClass(classes.videoBackground)
            .addClass(classes.videoChrome);
        videos[playerId].$parentSlideshowWrapper
            .removeClass(classes.slideBackgroundVideo)
            .addClass(classes.playing);
        videos[playerId].$parentSlide
            .removeClass(classes.slideBackgroundVideo)
            .addClass(classes.playing);
        videos[playerId].status = 'open';
    }

    function setBackgroundVideo(playerId) {
        // Switch back to background-chrome when closed
        var $player = $('#' + playerId)
            .addClass(classes.videoBackground)
            .removeClass(classes.videoChrome);
        videos[playerId].$parentSlide
            .addClass(classes.slideBackgroundVideo);
        videos[playerId].status = 'background';
        privatePlayVideo(playerId, true);
        sizeBackgroundVideo($player);
    }

    function initEvents() {
        $(document).on('click.videoPlayer', '.' + classes.playVideoBtn, function(evt) {
            var playerId = $(evt.currentTarget).data('controls');
            startVideoOnClick(playerId);
        });
        $(document).on('click.videoPlayer', '.' + classes.closeVideoBtn, function(evt) {
            var playerId = $(evt.currentTarget).data('controls');
            closeVideo(playerId);
        });
        // Listen to resize to keep a background-size:cover-like layout
        $(window).on('resize.videoPlayer', $.debounce(250, function(evt) {
            var playerId = $(evt.currentTarget).data('controls');
            if (youtubeLoaded) {
                sizeBackgroundVideos();
                privatePlayVideo(playerId, true);
            }
        }));
    }

    function removeEvents() {
        $(document).off('.videoPlayer');
        $(window).off('.videoPlayer');
    }
    return {
        init: init,
        loadVideos: loadVideos,
        loadVideo: loadVideo,
        playVideo: customPlayVideo,
        pauseVideo: pauseVideo,
        removeEvents: removeEvents
    };
})();
velatheme.slideshows = {};
velatheme.SlideshowSection = (function() {
    function SlideshowSection(container) {
        var $container = this.$container = $(container);
        var sectionId = $container.attr('data-section-id');
        var slideshow = this.slideshow = '#velaSlideshows' + sectionId;
        $('.velassVideo', slideshow).each(function() {
            var $el = $(this);
            velatheme.SlideshowVideo.init($el);
            velatheme.SlideshowVideo.loadVideo($el.attr('id'));
        });
        velatheme.slideshows[slideshow] = new velatheme.Slideshow(slideshow);
    }
    return SlideshowSection;
})();
velatheme.SlideshowSection.prototype = _.assignIn({}, velatheme.SlideshowSection.prototype, {
    onUnload: function() {
        delete velatheme.slideshows[this.slideshow];
    },
    onBlockSelect: function(evt) {
        var $slideshow = $(this.slideshow);
        // Ignore the cloned version
        var $slide = $('.velassSlide' + evt.detail.blockId + ':not(.slick-cloned)');
        var slideIndex = $slide.data('slick-index');
        // Go to selected slide, pause autoplay
        $slideshow.slick('slickGoTo', slideIndex).slick('slickPause');
    },
    onBlockDeselect: function() {
        // Resume autoplay
        $(this.slideshow).slick('slickPlay');
    }
});
velatheme.Video = (function() {
    var autoplayCheckComplete = false;
    var playOnClickChecked = false;
    var playOnClick = false;
    var youtubeLoaded = false;
    var videos = {};
    var videoPlayers = [];
    var videoOptions = {
        ratio: 16 / 9,
        scrollAnimationDuration: 400,
        playerVars: {
            // eslint-disable-next-line camelcase
            iv_load_policy: 3,
            modestbranding: 1,
            autoplay: 0,
            controls: 0,
            wmode: 'opaque',
            branding: 0,
            autohide: 0,
            rel: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerChange
        }
    };
    var classes = {
        playing: 'video-is-playing',
        paused: 'video-is-paused',
        loading: 'video-is-loading',
        loaded: 'video-is-loaded',
        backgroundVideoWrapper: 'video-background-wrapper',
        videoWithImage: 'video--image_with_play',
        backgroundVideo: 'video--background',
        userPaused: 'is-paused',
        supportsAutoplay: 'autoplay',
        supportsNoAutoplay: 'no-autoplay',
        wrapperMinHeight: 'video-section-wrapper--min-height'
    };

    var selectors = {
        section: '.video-section',
        videoWrapper: '.video-section-wrapper',
        playVideoBtn: '.video-control__play',
        closeVideoBtn: '.video-control__close-wrapper',
        pauseVideoBtn: '.video__pause',
        pauseVideoStop: '.video__pause-stop',
        pauseVideoResume: '.video__pause-resume',
        fallbackText: '.icon__fallback-text'
    };

    /**
     * Public functions
     */
    function init($video) {
        if (!$video.length) {
            return;
        }

        videos[$video.attr('id')] = {
            id: $video.attr('id'),
            videoId: $video.data('id'),
            type: $video.data('type'),
            status: $video.data('type') === 'image_with_play' ? 'closed' : 'background', // closed, open, background
            $video: $video,
            $videoWrapper: $video.closest(selectors.videoWrapper),
            $section: $video.closest(selectors.section),
            controls: $video.data('type') === 'background' ? 0 : 1
        };

        if (!youtubeLoaded) {
            // This code loads the IFrame Player API code asynchronously.
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        playOnClickCheck();
    }

    function customPlayVideo(playerId) {
        // Make sure we have carried out the playOnClick check first
        if (!playOnClickChecked && !playOnClick) {
            return;
        }

        if (playerId && typeof videoPlayers[playerId].playVideo === 'function') {
            privatePlayVideo(playerId);
        }
    }

    function pauseVideo(playerId) {
        if (
            videoPlayers[playerId] &&
            typeof videoPlayers[playerId].pauseVideo === 'function'
        ) {
            videoPlayers[playerId].pauseVideo();
        }
    }

    function loadVideos() {
        for (var key in videos) {
            if (videos.hasOwnProperty(key)) {
                createPlayer(key);
            }
        }

        initEvents();
        youtubeLoaded = true;
    }

    function editorLoadVideo(key) {
        if (!youtubeLoaded) {
            return;
        }
        createPlayer(key);

        initEvents();
    }

    /**
     * Private functions
     */

    function privatePlayVideo(id, clicked) {
        var videoData = videos[id];
        var player = videoPlayers[id];
        var $videoWrapper = videoData.$videoWrapper;

        if (playOnClick) {
            // playOnClick means we are probably on mobile (no autoplay).
            // setAsPlaying will show the iframe, requiring another click
            // to play the video.
            setAsPlaying(videoData);
        } else if (clicked || autoplayCheckComplete) {
            // Play if autoplay is available or clicked to play
            $videoWrapper.removeClass(classes.loading);
            setAsPlaying(videoData);
            player.playVideo();
            return;
        } else {
            player.playVideo();
        }
    }

    function setAutoplaySupport(supported) {
        var supportClass = supported ?
            classes.supportsAutoplay :
            classes.supportsNoAutoplay;
        $(document.documentElement)
            .removeClass(classes.supportsAutoplay)
            .removeClass(classes.supportsNoAutoplay)
            .addClass(supportClass);

        if (!supported) {
            playOnClick = true;
        }

        autoplayCheckComplete = true;
    }

    function playOnClickCheck() {
        // Bail early for a few instances:
        // - small screen
        // - device sniff mobile browser

        if (playOnClickChecked) {
            return;
        }

        if (isMobile()) {
            playOnClick = true;
        }

        if (playOnClick) {
            // No need to also do the autoplay check
            setAutoplaySupport(false);
        }

        playOnClickChecked = true;
    }

    // The API will call this function when each video player is ready
    function onPlayerReady(evt) {
        evt.target.setPlaybackQuality('hd1080');
        var videoData = getVideoOptions(evt);
        var videoTitle = evt.target.getVideoData().title;
        playOnClickCheck();

        // Prevent tabbing through YouTube player controls until visible
        $('#' + videoData.id).attr('tabindex', '-1');

        sizeBackgroundVideos();
        setButtonLabels(videoData.$videoWrapper, videoTitle);

        // Customize based on options from the video ID
        if (videoData.type === 'background') {
            evt.target.mute();
            privatePlayVideo(videoData.id);
        }

        videoData.$videoWrapper.addClass(classes.loaded);
    }

    function onPlayerChange(evt) {
        var videoData = getVideoOptions(evt);
        if (
            videoData.status === 'background' &&
            !isMobile() &&
            !autoplayCheckComplete &&
            (evt.data === YT.PlayerState.PLAYING ||
                evt.data === YT.PlayerState.BUFFERING)
        ) {
            setAutoplaySupport(true);
            autoplayCheckComplete = true;
            videoData.$videoWrapper.removeClass(classes.loading);
        }
        switch (evt.data) {
            case YT.PlayerState.ENDED:
                setAsFinished(videoData);
                break;
            case YT.PlayerState.PAUSED:
                // Seeking on a YouTube video also fires a PAUSED state change,
                // checking the state after a delay prevents us pausing the video when
                // the user is seeking instead of pausing
                setTimeout(function() {
                    if (evt.target.getPlayerState() === YT.PlayerState.PAUSED) {
                        setAsPaused(videoData);
                    }
                }, 200);
                break;
        }
    }

    function setAsFinished(videoData) {
        switch (videoData.type) {
            case 'background':
                videoPlayers[videoData.id].seekTo(0);
                break;
            case 'image_with_play':
                closeVideo(videoData.id);
                toggleExpandVideo(videoData.id, false);
                break;
        }
    }

    function setAsPlaying(videoData) {
        var $videoWrapper = videoData.$videoWrapper;
        var $pauseButton = $videoWrapper.find(selectors.pauseVideoBtn);

        $videoWrapper.removeClass(classes.loading);

        if ($pauseButton.hasClass(classes.userPaused)) {
            $pauseButton.removeClass(classes.userPaused);
        }

        // Do not change element visibility if it is a background video
        if (videoData.status === 'background') {
            return;
        }

        $('#' + videoData.id).attr('tabindex', '0');

        if (videoData.type === 'image_with_play') {
            $videoWrapper.removeClass(classes.paused).addClass(classes.playing);
        }

        // Update focus to the close button so we stay within the video wrapper,
        // allowing time for the scroll animation
        setTimeout(function() {
            $videoWrapper.find(selectors.closeVideoBtn).focus();
        }, videoOptions.scrollAnimationDuration);
    }

    function setAsPaused(videoData) {
        var $videoWrapper = videoData.$videoWrapper;

        // YT's events fire after our click event. This status flag ensures
        // we don't interact with a closed or background video.
        if (videoData.type === 'image_with_play') {
            if (videoData.status === 'closed') {
                $videoWrapper.removeClass(classes.paused);
            } else {
                $videoWrapper.addClass(classes.paused);
            }
        }

        $videoWrapper.removeClass(classes.playing);
    }

    function closeVideo(playerId) {
        var videoData = videos[playerId];
        var $videoWrapper = videoData.$videoWrapper;
        var classesToRemove = [classes.paused, classes.playing].join(' ');

        if (isMobile()) {
            $videoWrapper.removeAttr('style');
        }

        $('#' + videoData.id).attr('tabindex', '-1');

        videoData.status = 'closed';

        switch (videoData.type) {
            case 'image_with_play':
                videoPlayers[playerId].stopVideo();
                setAsPaused(videoData); // in case the video is already paused
                break;
            case 'background':
                videoPlayers[playerId].mute();
                setBackgroundVideo(playerId);
                break;
        }

        $videoWrapper.removeClass(classesToRemove);
    }

    function getVideoOptions(evt) {
        var id = evt.target.getIframe().id;
        return videos[id];
    }

    function toggleExpandVideo(playerId, expand) {
        var video = videos[playerId];
        var elementTop = video.$videoWrapper.offset().top;
        var $playButton = video.$videoWrapper.find(selectors.playVideoBtn);
        var offset = 0;
        var newHeight = 0;

        if (isMobile()) {
            video.$videoWrapper.parent().toggleClass('page-width', !expand);
        }

        if (expand) {
            if (isMobile()) {
                newHeight = $(window).width() / videoOptions.ratio;
            } else {
                newHeight = video.$videoWrapper.width() / videoOptions.ratio;
            }
            offset = ($(window).height() - newHeight) / 2;

            video.$videoWrapper
                .removeClass(classes.wrapperMinHeight)
                .animate({
                    height: newHeight
                }, 600);

            // Animate doesn't work in mobile editor, so we don't use it
            if (!(isMobile() && Shopify.designMode)) {
                $('html, body').animate({
                        scrollTop: elementTop - offset
                    },
                    videoOptions.scrollAnimationDuration
                );
            }
        } else {
            if (isMobile()) {
                newHeight = video.$videoWrapper.data('mobile-height');
            } else {
                newHeight = video.$videoWrapper.data('desktop-height');
            }

            video.$videoWrapper
                .height(video.$videoWrapper.width() / videoOptions.ratio)
                .animate({
                    height: newHeight
                }, 600);
            setTimeout(function() {
                video.$videoWrapper.addClass(classes.wrapperMinHeight);
            }, 600);
            $playButton.focus();
        }
    }

    function togglePause(playerId) {
        var $pauseButton = videos[playerId].$videoWrapper.find(
            selectors.pauseVideoBtn
        );
        var paused = $pauseButton.hasClass(classes.userPaused);
        if (paused) {
            $pauseButton.removeClass(classes.userPaused);
            customPlayVideo(playerId);
        } else {
            $pauseButton.addClass(classes.userPaused);
            pauseVideo(playerId);
        }
        $pauseButton.attr('aria-pressed', !paused);
    }

    function startVideoOnClick(playerId) {
        var video = videos[playerId];

        // add loading class to wrapper
        video.$videoWrapper.addClass(classes.loading);

        // Explicity set the video wrapper height (needed for height transition)
        video.$videoWrapper.attr(
            'style',
            'height: ' + video.$videoWrapper.height() + 'px'
        );

        video.status = 'open';

        switch (video.type) {
            case 'image_with_play':
                privatePlayVideo(playerId, true);
                break;
            case 'background':
                unsetBackgroundVideo(playerId, video);
                videoPlayers[playerId].unMute();
                privatePlayVideo(playerId, true);
                break;
        }

        toggleExpandVideo(playerId, true);

        // esc to close video player
        $(document).on('keydown.videoPlayer', function(evt) {
            var playerId = $(document.activeElement).data('controls');
            if (evt.keyCode !== slate.utils.keyboardKeys.ESCAPE || !playerId) {
                return;
            }

            closeVideo(playerId);
            toggleExpandVideo(playerId, false);
        });
    }

    function sizeBackgroundVideos() {
        $('.' + classes.backgroundVideo).each(function(index, el) {
            sizeBackgroundVideo($(el));
        });
    }

    function sizeBackgroundVideo($videoPlayer) {
        if (!youtubeLoaded) {
            return;
        }

        if (isMobile()) {
            $videoPlayer.removeAttr('style');
        } else {
            var $videoWrapper = $videoPlayer.closest(selectors.videoWrapper);
            var videoWidth = $videoWrapper.width();
            var playerWidth = $videoPlayer.width();
            var desktopHeight = $videoWrapper.data('desktop-height');

            // when screen aspect ratio differs from video, video must center and underlay one dimension
            if (videoWidth / videoOptions.ratio < desktopHeight) {
                playerWidth = Math.ceil(desktopHeight * videoOptions.ratio); // get new player width
                $videoPlayer
                    .width(playerWidth)
                    .height(desktopHeight)
                    .css({
                        left: (videoWidth - playerWidth) / 2,
                        top: 0
                    }); // player width is greater, offset left; reset top
            } else {
                // new video width < window width (gap to right)
                desktopHeight = Math.ceil(videoWidth / videoOptions.ratio); // get new player height
                $videoPlayer
                    .width(videoWidth)
                    .height(desktopHeight)
                    .css({
                        left: 0,
                        top: (desktopHeight - desktopHeight) / 2
                    }); // player height is greater, offset top; reset left
            }

            $videoPlayer.prepareTransition();
            $videoWrapper.addClass(classes.loaded);
        }
    }

    function unsetBackgroundVideo(playerId) {
        // Switch the background video to a chrome-only player once played
        $('#' + playerId)
            .removeClass(classes.backgroundVideo)
            .addClass(classes.videoWithImage);

        setTimeout(function() {
            $('#' + playerId).removeAttr('style');
        }, 600);

        videos[playerId].$videoWrapper
            .removeClass(classes.backgroundVideoWrapper)
            .addClass(classes.playing);

        videos[playerId].status = 'open';
    }

    function setBackgroundVideo(playerId) {
        $('#' + playerId)
            .removeClass(classes.videoWithImage)
            .addClass(classes.backgroundVideo);

        videos[playerId].$videoWrapper.addClass(classes.backgroundVideoWrapper);

        videos[playerId].status = 'background';
        sizeBackgroundVideo($('#' + playerId));
    }

    function isMobile() {
        return $(window).width() < 767 || window.mobileCheck();
    }

    function initEvents() {
        $(document).on('click.videoPlayer', selectors.playVideoBtn, function(evt) {
            var playerId = $(evt.currentTarget).data('controls');

            startVideoOnClick(playerId);
        });

        $(document).on('click.videoPlayer', selectors.closeVideoBtn, function(evt) {
            var playerId = $(evt.currentTarget).data('controls');

            $(evt.currentTarget).blur();
            closeVideo(playerId);
            toggleExpandVideo(playerId, false);
        });

        $(document).on('click.videoPlayer', selectors.pauseVideoBtn, function(evt) {
            var playerId = $(evt.currentTarget).data('controls');
            togglePause(playerId);
        });

        // Listen to resize to keep a background-size:cover-like layout
        $(window).on(
            'resize.videoPlayer',
            $.debounce(200, function() {
                if (!youtubeLoaded) return;
                var key;
                var fullscreen = window.innerHeight === screen.height;

                sizeBackgroundVideos();

                if (isMobile()) {
                    for (key in videos) {
                        if (videos.hasOwnProperty(key)) {
                            if (videos[key].$videoWrapper.hasClass(classes.playing)) {
                                if (!fullscreen) {
                                    pauseVideo(key);
                                    setAsPaused(videos[key]);
                                }
                            }
                            videos[key].$videoWrapper.height(
                                $(document).width() / videoOptions.ratio
                            );
                        }
                    }
                    setAutoplaySupport(false);
                } else {
                    setAutoplaySupport(true);
                    for (key in videos) {
                        if (
                            videos[key].$videoWrapper.find('.' + classes.videoWithImage)
                            .length
                        ) {
                            continue;
                        }
                        videoPlayers[key].playVideo();
                        setAsPlaying(videos[key]);
                    }
                }
            })
        );

        $(window).on(
            'scroll.videoPlayer',
            $.debounce(50, function() {
                if (!youtubeLoaded) return;

                for (var key in videos) {
                    if (videos.hasOwnProperty(key)) {
                        var $videoWrapper = videos[key].$videoWrapper;

                        // Close the video if more than 75% of it is scrolled out of view
                        if (
                            $videoWrapper.hasClass(classes.playing) &&
                            ($videoWrapper.offset().top + $videoWrapper.height() * 0.75 <
                                $(window).scrollTop() ||
                                $videoWrapper.offset().top + $videoWrapper.height() * 0.25 >
                                $(window).scrollTop() + $(window).height())
                        ) {
                            closeVideo(key);
                            toggleExpandVideo(key, false);
                        }
                    }
                }
            })
        );
    }

    function createPlayer(key) {
        var args = $.extend({}, videoOptions, videos[key]);
        args.playerVars.controls = args.controls;
        videoPlayers[key] = new YT.Player(key, args);
    }

    function removeEvents() {
        $(document).off('.videoPlayer');
        $(window).off('.videoPlayer');
    }

    function setButtonLabels($videoWrapper, title) {
        var $playButtons = $videoWrapper.find(selectors.playVideoBtn);
        var $closeButton = $videoWrapper.find(selectors.closeVideoBtn);
        var $pauseButton = $videoWrapper.find(selectors.pauseVideoBtn);
        var $closeButtonText = $closeButton.find(selectors.fallbackText);
        var $pauseButtonStopText = $pauseButton
            .find(selectors.pauseVideoStop)
            .find(selectors.fallbackText);
        var $pauseButtonResumeText = $pauseButton
            .find(selectors.pauseVideoResume)
            .find(selectors.fallbackText);

        // Insert the video title retrieved from YouTube into the instructional text
        // for each button
        $playButtons.each(function() {
            var $playButton = $(this);
            var $playButtonText = $playButton.find(selectors.fallbackText);

            $playButtonText.text(
                $playButtonText.text().replace('[video_title]', title)
            );
        });
        $closeButtonText.text(
            $closeButtonText.text().replace('[video_title]', title)
        );
        $pauseButtonStopText.text(
            $pauseButtonStopText.text().replace('[video_title]', title)
        );
        $pauseButtonResumeText.text(
            $pauseButtonResumeText.text().replace('[video_title]', title)
        );
    }

    return {
        init: init,
        editorLoadVideo: editorLoadVideo,
        loadVideos: loadVideos,
        playVideo: customPlayVideo,
        pauseVideo: pauseVideo,
        removeEvents: removeEvents
    };
})();
velatheme.Helpers = (function() {
    var touchDevice = false;

    function setTouch() {
        touchDevice = true;
    }

    function isTouch() {
        return touchDevice;
    }
    return {
        setTouch: setTouch,
        isTouch: isTouch
    };
})();
velatheme.LibraryLoader = (function() {
    var types = {
        link: 'link',
        script: 'script'
    };

    var status = {
        requested: 'requested',
        loaded: 'loaded'
    };

    var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

    var libraries = {
        youtubeSdk: {
            tagId: 'youtube-sdk',
            src: 'https://www.youtube.com/iframe_api',
            type: types.script
        },
        plyrShopifyStyles: {
            tagId: 'plyr-shopify-styles',
            src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
            type: types.link
        },
        modelViewerUiStyles: {
            tagId: 'shopify-model-viewer-ui-styles',
            src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
            type: types.link
        }
    };

    function load(libraryName, callback) {
        var library = libraries[libraryName];

        if (!library) return;
        if (library.status === status.requested) return;

        callback = callback || function() {};
        if (library.status === status.loaded) {
            callback();
            return;
        }

        library.status = status.requested;

        var tag;

        switch (library.type) {
            case types.script:
                tag = createScriptTag(library, callback);
                break;
            case types.link:
                tag = createLinkTag(library, callback);
                break;
        }

        tag.id = library.tagId;
        library.element = tag;

        var firstScriptTag = document.getElementsByTagName(library.type)[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    function createScriptTag(library, callback) {
        var tag = document.createElement('script');
        tag.src = library.src;
        tag.addEventListener('load', function() {
            library.status = status.loaded;
            callback();
        });
        return tag;
    }

    function createLinkTag(library, callback) {
        var tag = document.createElement('link');
        tag.href = library.src;
        tag.rel = 'stylesheet';
        tag.type = 'text/css';
        tag.addEventListener('load', function() {
            library.status = status.loaded;
            callback();
        });
        return tag;
    }

    return {
        load: load
    };
})();
velatheme.ProductVideo = (function() {
    var videos = {};
    var hosts = {
        html5: 'html5',
        youtube: 'youtube'
    };

    var selectors = {
        productMediaWrapper: '[data-product-single-media-wrapper]'
    };

    var attributes = {
        enableVideoLooping: 'enable-video-looping',
        videoId: 'video-id'
    };

    function init(videoContainer, sectionId) {
        if (!videoContainer.length) {
            return;
        }

        var videoElement = videoContainer.find('iframe, video')[0];
        var mediaId = videoContainer.data('mediaId');

        if (!videoElement) {
            return;
        }

        videos[mediaId] = {
            mediaId: mediaId,
            sectionId: sectionId,
            host: hostFromVideoElement(videoElement),
            container: videoContainer,
            element: videoElement,
            ready: function() {
                createPlayer(this);
            }
        };

        var video = videos[mediaId];

        switch (video.host) {
            case hosts.html5:
                window.Shopify.loadFeatures([{
                    name: 'video-ui',
                    version: '1.0',
                    onLoad: setupPlyrVideos
                }]);
                velatheme.LibraryLoader.load('plyrShopifyStyles');
                break;
            case hosts.youtube:
                velatheme.LibraryLoader.load('youtubeSdk', setupYouTubeVideos);
                break;
        }
    }

    function setupPlyrVideos(errors) {
        if (errors) {
            fallbackToNativeVideo();
            return;
        }

        loadVideos(hosts.html5);
    }

    function setupYouTubeVideos() {
        if (!window.YT.Player) return;

        loadVideos(hosts.youtube);
    }

    function createPlayer(video) {
        if (video.player) {
            return;
        }

        var productMediaWrapper = video.container.closest(
            selectors.productMediaWrapper
        );
        var enableLooping = productMediaWrapper.data(attributes.enableVideoLooping);

        switch (video.host) {
            case hosts.html5:
                // eslint-disable-next-line no-undef
                video.player = new Shopify.Plyr(video.element, {
                    loop: {
                        active: enableLooping
                    }
                });
                break;
            case hosts.youtube:
                var videoId = productMediaWrapper.data(attributes.videoId);

                video.player = new YT.Player(video.element, {
                    videoId: videoId,
                    events: {
                        onStateChange: function(event) {
                            if (event.data === 0 && enableLooping) event.target.seekTo(0);
                        }
                    }
                });
                break;
        }

        productMediaWrapper.on('mediaHidden xrLaunch', function() {
            if (!video.player) return;

            if (video.host === hosts.html5) {
                video.player.pause();
            }

            if (video.host === hosts.youtube && video.player.pauseVideo) {
                video.player.pauseVideo();
            }
        });

        productMediaWrapper.on('mediaVisible', function() {
            if (velatheme.Helpers.isTouch()) return;
            if (!video.player) return;

            if (video.host === hosts.html5) {
                video.player.play();
            }

            if (video.host === hosts.youtube && video.player.playVideo) {
                video.player.playVideo();
            }
        });
    }

    function hostFromVideoElement(video) {
        if (video.tagName === 'VIDEO') {
            return hosts.html5;
        }

        if (video.tagName === 'IFRAME') {
            if (
                /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
                    video.src
                )
            ) {
                return hosts.youtube;
            }
        }
        return null;
    }

    function loadVideos(host) {
        for (var key in videos) {
            if (videos.hasOwnProperty(key)) {
                var video = videos[key];
                if (video.host === host) {
                    video.ready();
                }
            }
        }
    }

    function fallbackToNativeVideo() {
        for (var key in videos) {
            if (videos.hasOwnProperty(key)) {
                var video = videos[key];

                if (video.nativeVideo) continue;

                if (video.host === hosts.html5) {
                    video.element.setAttribute('controls', 'controls');
                    video.nativeVideo = true;
                }
            }
        }
    }

    function removeSectionVideos(sectionId) {
        for (var key in videos) {
            if (videos.hasOwnProperty(key)) {
                var video = videos[key];

                if (video.sectionId === sectionId) {
                    if (video.player) video.player.destroy();
                    delete videos[key];
                }
            }
        }
    }

    return {
        init: init,
        hosts: hosts,
        loadVideos: loadVideos,
        removeSectionVideos: removeSectionVideos
    };
})();
velatheme.ProductModel = (function() {
    var modelJsonSections = {};
    var models = {};
    var xrButtons = {};

    var selectors = {
        mediaGroup: '[data-product-single-media-group]',
        xrButton: '[data-shopify-xr]'
    };

    function init(modelViewerContainers, sectionId) {
        modelJsonSections[sectionId] = {
            loaded: false
        };

        modelViewerContainers.each(function(index) {
            var $modelViewerContainer = $(this);
            var mediaId = $modelViewerContainer.data('media-id');
            var $modelViewerElement = $(
                $modelViewerContainer.find('model-viewer')[0]
            );
            var modelId = $modelViewerElement.data('model-id');

            if (index === 0) {
                var $xrButton = $modelViewerContainer
                    .closest(selectors.mediaGroup)
                    .find(selectors.xrButton);
                xrButtons[sectionId] = {
                    $element: $xrButton,
                    defaultId: modelId
                };
            }

            models[mediaId] = {
                modelId: modelId,
                sectionId: sectionId,
                $container: $modelViewerContainer,
                $element: $modelViewerElement
            };
        });

        window.Shopify.loadFeatures([{
                name: 'shopify-xr',
                version: '1.0',
                onLoad: setupShopifyXr
            },
            {
                name: 'model-viewer-ui',
                version: '1.0',
                onLoad: setupModelViewerUi
            }
        ]);
        velatheme.LibraryLoader.load('modelViewerUiStyles');
    }

    function setupShopifyXr(errors) {
        if (errors) return;

        if (!window.ShopifyXR) {
            document.addEventListener('shopify_xr_initialized', function() {
                setupShopifyXr();
            });
            return;
        }

        for (var sectionId in modelJsonSections) {
            if (modelJsonSections.hasOwnProperty(sectionId)) {
                var modelSection = modelJsonSections[sectionId];

                if (modelSection.loaded) continue;
                var $modelJson = $('#ModelJson-' + sectionId);

                window.ShopifyXR.addModels(JSON.parse($modelJson.html()));
                modelSection.loaded = true;
            }
        }
        window.ShopifyXR.setupXRElements();
    }

    function setupModelViewerUi(errors) {
        if (errors) return;

        for (var key in models) {
            if (models.hasOwnProperty(key)) {
                var model = models[key];
                if (!model.modelViewerUi) {
                    model.modelViewerUi = new Shopify.ModelViewerUI(model.$element);
                }
                setupModelViewerListeners(model);
            }
        }
    }

    function setupModelViewerListeners(model) {
        var xrButton = xrButtons[model.sectionId];

        model.$container.on('mediaVisible', function() {
            xrButton.$element.attr('data-shopify-model3d-id', model.modelId);
            if (velatheme.Helpers.isTouch()) return;
            model.modelViewerUi.play();
        });

        model.$container
            .on('mediaHidden', function() {
                xrButton.$element.attr('data-shopify-model3d-id', xrButton.defaultId);
                model.modelViewerUi.pause();
            })
            .on('xrLaunch', function() {
                model.modelViewerUi.pause();
            });
    }

    function removeSectionModels(sectionId) {
        for (var key in models) {
            if (models.hasOwnProperty(key)) {
                var model = models[key];
                if (model.sectionId === sectionId) {
                    models[key].modelViewerUi.destroy();
                    delete models[key];
                }
            }
        }
        delete modelJsonSections[sectionId];
    }

    return {
        init: init,
        removeSectionModels: removeSectionModels
    };
})();
velatheme.Product = {};
velatheme.Product = (function() {
    function Product(container) {
        var $container = (this.$container = $(container));
        var sectionId = $container.attr('data-section-id');

        this.settings = {
            // Breakpoints from src/stylesheets/global/variables.scss.liquid
            mediaQueryMediumUp: 'screen and (min-width: 767px)',
            mediaQuerySmall: 'screen and (max-width: 749px)',
            bpSmall: false,
            enableHistoryState: $container.data('enable-history-state') || false,
            namespace: '.slideshow-' + sectionId,
            sectionId: sectionId,
        };

        this.selectors = {
            productMediaWrapper: '[data-product-single-media-wrapper]',
            productThumbImages: '.product-single__thumbnail--' + sectionId,
            productThumbs: '.product-single__thumbnails-' + sectionId,
            productThumb: ".product-single__thumbnail",
            productThumbListItem: '.product-single__thumbnails-item',
            productThumbsWrapper: '.thumbnails-wrapper',
            productMediaTypeVideo: '[data-product-media-type-video]',
            productMediaTypeModel: '[data-product-media-type-model]',

        };
        this.classes = {
            hidden: 'hide',
            visibilityHidden: 'visibility-hidden',
            activeClass: 'active-thumb',
        };
        this.$loaderStatus = $(this.selectors.loaderStatus, $container);
        // Stop parsing if we don't have the product json script tag when loading
        // section in the Theme Editor
        if (!$('#ProductJson-' + sectionId).html()) {
            return;
        }

        this.productSingleObject = JSON.parse(
            document.getElementById('ProductJson-' + sectionId).innerHTML
        );
        this._initMediaSwitch();
        this._initProductVideo();
        this._initModelViewerLibraries();
        this._initShopifyXrLaunch();
    }
    Product.prototype = _.assignIn({}, velatheme.Product.prototype, {

        _initProductVideo: function() {
            var sectionId = this.settings.sectionId;

            $(this.selectors.productMediaTypeVideo, this.$container).each(function() {
                var $el = $(this);
                velatheme.ProductVideo.init($el, sectionId);
            });
        },
        _initMediaSwitch: function() {
            if (!$(this.selectors.productThumbImages).length) {
                return;
            }
            var self = this;

            $(this.selectors.productThumbImages)
                .on('click', function(evt) {
                    evt.preventDefault();
                    var $el = $(this);

                    var mediaId = $el.data('thumbnail-id');
                    var productType = $el.data('stype');
                    var zoomImg = $el.data('zoom-image');
                    $('#ProductPhotoImg').attr("data-zoom-image", zoomImg);
                    if (productType == 'image') {
                        $("#groupProImage").css('display', 'block');
                        $("#groupMedia").css('display', 'none');
                    } else {
                        $("#groupProImage").css('display', 'none');
                        $("#groupMedia").css('display', 'block');

                    }
                    self._switchMedia(mediaId);
                    self._setActiveThumbnail(mediaId);
                })
                .on('keyup', self._handleMediaFocus.bind(self));
        },
        _setActiveThumbnail: function(mediaId) {
            // If there is no element passed, find it by the current product image
            if (typeof mediaId === 'undefined') {
                mediaId = $(
                    this.selectors.productMediaWrapper + ':not(.hide)',
                    this.$container
                ).data('media-id');
            }

            var $thumbnailWrappers = $(
                this.selectors.productThumbListItem + ':not(.slick-cloned)',
                this.$container
            );

            var $activeThumbnail = $thumbnailWrappers.find(
                this.selectors.productThumbImages +
                "[data-thumbnail-id='" +
                mediaId +
                "']"
            );

            $(this.selectors.productThumbImages)
                .removeClass(this.classes.activeClass)
                .removeAttr('aria-current');

            $activeThumbnail.addClass(this.classes.activeClass);
            $activeThumbnail.attr('aria-current', true);

            if (!$thumbnailWrappers.hasClass('slick-slide')) {
                return;
            }

            // var slideIndex = $activeThumbnail.parent().data('slick-index');
            // $('#productThumbs .product-single__thumbnails').slick('slickGoTo', slideIndex, true);
        },
        _switchMedia: function(mediaId) {
            var $currentMedia = $(
                this.selectors.productMediaWrapper +
                ':not(.' +
                this.classes.hidden +
                ')',
                this.$container
            );

            var $newMedia = $(
                this.selectors.productMediaWrapper +
                "[data-media-id='" +
                mediaId +
                "']",
                this.$container
            );

            var $otherMedia = $(
                this.selectors.productMediaWrapper +
                ":not([data-media-id='" +
                mediaId +
                "'])",
                this.$container
            );

            $currentMedia.trigger('mediaHidden');
            $newMedia.removeClass(this.classes.hidden).trigger('mediaVisible');
            $otherMedia.addClass(this.classes.hidden);
        },

        _handleMediaFocus: function(evt) {
            if (evt.keyCode !== slate.utils.keyboardKeys.ENTER) return;

            var mediaId = $(evt.currentTarget).data('thumbnail-id');

            $(
                this.selectors.productMediaWrapper +
                "[data-media-id='" +
                mediaId +
                "']",
                this.$container
            ).focus();
        },
        _initModelViewerLibraries: function() {
            var $modelViewerElements = $(
                this.selectors.productMediaTypeModel,
                this.$container
            );
            if ($modelViewerElements.length < 1) return;
            velatheme.ProductModel.init($modelViewerElements, this.settings.sectionId);
        },

        _initShopifyXrLaunch: function() {
            var self = this;
            $(document).on('shopify_xr_launch', function() {
                var $currentMedia = $(
                    self.selectors.productMediaWrapper +
                    ':not(.' +
                    self.classes.hidden +
                    ')',
                    self.$container
                );
                $currentMedia.trigger('xrLaunch');
            });
        },

        onUnload: function() {
            this.$container.off(this.settings.namespace);
            velatheme.ProductVideo.removeSectionVideos(this.settings.sectionId);
            velatheme.ProductModel.removeSectionModels(this.settings.sectionId);
        }
    });
    return Product;
})();

// Youtube API callback
// eslint-disable-next-line no-unused-vars
function onYouTubeIframeAPIReady() {
    velatheme.SlideshowVideo.loadVideos();
    velatheme.Video.loadVideos();
    velatheme.ProductVideo.loadVideos(velatheme.ProductVideo.hosts.youtube);
}
$(document).ready(function() {
    $(vela.init);
    $('body').on('ajaxCart.afterCartLoad', function(evt, cart) {
        if (window.ajaxcart_type == 'drawer') {
            vela.RightDrawer.open();
        }
    });
    var sections = new velatheme.Sections();
    sections.register('velaSlideshowSection', velatheme.SlideshowSection);
    sections.register('product', velatheme.Product);
    sections.register('vela-template-product', velatheme.Product);

    //verticalmenu
    //$('#vermenuContent').hide();
    $('.vermenuContainer .extendlink').hide();
    $('#vermenuContent .allCategory').on("click", function() {
        $(this).toggleClass('extendCategory');
        $('.vermenuContainer .extendlink').slideToggle('slow');
    });
    $('#velaVerticalMenu .vermenuTitle').click(function(event) {
        $(this).toggleClass('active');
        $('#vermenuContent').slideToggle('slow');
        $('body').toggleClass('menuVerticalActive');
    });
    $('.menuVerticalOverlay').click(function(event) {
        $('body').removeClass('menuVerticalActive');
        $('#vermenuContent').slideToggle('slow');
    });

});
$(window).on('load', function() {
    $(vela.productImage);
});