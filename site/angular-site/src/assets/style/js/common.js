function getURLVar(key) {
    var value = [];

    var query = String(document.location).split('?');

    if (query[1]) {
        var part = query[1].split('&');

        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');

            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }

        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    }
}

$(document).ready(function () {
    // process the form
    $('form#fast-order-form').submit(function (event) {
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'name': $('#name').val(),
            'email': $('input[name=email]').val(),
            'city': $('input[name=city]').val(),
            'delivery': $('textarea[name=delivery]').val(),
            'phone': $('input[name=phone]').val(),
            'product': $('input[name=product]').val(),
            'price': $('input[name=price]').val()
        };
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/order-form.php', // the url where we want to POST
            data: formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode: true
        })
            .done(function (data) {
                // log data to the console so we can see               
                if (!data.success) {
                    if (data.errors.name) {
                        $('#name').addClass('has-error'); // add the error class to show red input                        
                    }
                    if (data.errors.email) {
                        $('input[name=email]').addClass('has-error'); // add the error class to show red input
                    }
                    if (data.errors.city) {
                        $('input[name=city]').addClass('has-error');
                    }
                    if (data.errors.phone) {
                        $('input[name=phone]').addClass('has-error');
                    }
                    if (data.errors.delivery) {
                        $('textarea[name=delivery]').addClass('has-error');
                    }
                    $('input').on('change',function(){
                        $(this).removeClass('has-error');
                    });
                    $('textarea[name=delivery]').on('change',function(){
                        $(this).removeClass('has-error');
                    });
                } else {
                    $('form#fast-order-form').append('<div class="alert alert-success">Р’РёРµ СѓСЃРїРµС€РЅРѕ РЅР°РїСЂР°РІРёС…С‚Рµ РїРѕСЂСЉС‡РєР°! РќР°С€ СЃСЉС‚СЂСѓРґРЅРёРє С‰Рµ СЃРµ СЃРІСЉСЂР¶Рµ СЃ РІР°СЃ Р·Р° РїРѕС‚РІСЉСЂР¶РґР°РІР°РЅРµ РЅР° РїРѕСЂСЉС‡РєР°С‚Р°.</div>');
                    $('form#fast-order-form input').val("");
                    $('form#fast-order-form textarea').val("");
                    setTimeout(function(){
                        $('form#fast-order-form .alert-success').fadeOut().remove();
                        ga("send", "event", "Quick Purchase", "click");
                    }, 10000);
                }
            });
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});

$(document).ready(function () {
    // Highlight any found errors
    $('.text-danger').each(function () {
        var element = $(this).parent().parent();

        if (element.hasClass('form-group')) {
            element.addClass('has-error');
        }
    });

    if(window.location.search.indexOf("news") > -1) {
        $('.menu>li').removeClass('active');
        $('.menu>li.blog').addClass('active');
    }


    if(window.location.search.indexOf("information_id=10") > -1) {
        $('.menu>li').removeClass('active');
        $('.menu>li a[href="/shop/index.php?route=information/static&information_id=10"]').parent().addClass('active');
    }
    if(window.location.search.indexOf("information_id=9") > -1) {
        $('.menu>li').removeClass('active');
        $('.menu>li a[href="/shop/index.php?route=information/information&information_id=9"]').parent().addClass('active');
    }
    if(window.location.search.indexOf("information_id=11") > -1) {
        $('.menu>li').removeClass('active');
        $('.menu>li a[href="/shop/index.php?route=information/information&information_id=11"]').parent().addClass('active');
    }


    $('.mobile-toggle').click(function () {
        $('.nav-bar').toggleClass('nav-open');
        $(this).toggleClass('active');
        $('.site-header').toggleClass('hidden');
    });

    $('.js-qty__adjust--minus').on('click', function () {
        var currentQuantity = parseInt($('#input-quantity').val());
        if (currentQuantity > 1) {
            currentQuantity = currentQuantity - 1;
            $('#input-quantity').val(currentQuantity);
        }
    });

    $('.js-qty__adjust--plus').on('click', function () {
        var currentQuantity = parseInt($('#input-quantity').val());
        currentQuantity = currentQuantity + 1;
        $('#input-quantity').val(currentQuantity);
    });

    // Currency
    $('#currency .currency-select').on('click', function (e) {
        e.preventDefault();

        $('#currency input[name=\'code\']').attr('value', $(this).attr('name'));

        $('#currency').submit();
    });

    $('.new-label').each(function(){
        var newCurrency = $(this).next('span').text().split(" ")[2];
        $(this).append(newCurrency);
    });

    // Language
    $('#language a').on('click', function (e) {
        e.preventDefault();

        $('#language input[name=\'code\']').attr('value', $(this).attr('href'));

        $('#language').submit();
    });

    if(window.location.host == "en.bali-tea.com" && $("html").attr("lang") != "en") {
        $('#language input[name=\'code\']').attr('value', "en");
        $('#language').submit();
    }

    if(window.location.search.indexOf("lang=el") > 0 && $("html").attr("lang") != "el") {
        $('#language input[name=\'code\']').attr('value', "el");
        $('#language').submit();
    }

    /* Search */
    $('#search input[name=\'search\']').parent().find('button').on('click', function () {
        url = $('base').attr('href') + 'index.php?route=product/search';

        var value = $('header input[name=\'search\']').val();

        if (value) {
            url += '&search=' + encodeURIComponent(value);
        }

        location = url;
    });

    $('#search input[name=\'search\']').on('keydown', function (e) {
        if (e.keyCode == 13) {
            $('header input[name=\'search\']').parent().find('button').trigger('click');
        }
    });

    // Menu
    $('#menu .dropdown-menu').each(function () {
        var menu = $('#menu').offset();
        var dropdown = $(this).parent().offset();

        var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

        if (i > 0) {
            $(this).css('margin-left', '-' + (i + 5) + 'px');
        }
    });

    // Product List
    $('#list-view').click(function () {
        $('#content .product-grid > .clearfix').remove();

        //$('#content .product-layout').attr('class', 'product-layout product-list col-xs-12');
        $('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');

        localStorage.setItem('display', 'list');
    });

    // Product Grid
    $('#grid-view').click(function () {
        // What a shame bootstrap does not take into account dynamically loaded columns
        cols = $('#column-right, #column-left').length;

        if (cols == 2) {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
        } else if (cols == 1) {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
        } else {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
        }

        localStorage.setItem('display', 'grid');
    });

    if (localStorage.getItem('display') == 'list') {
        $('#list-view').trigger('click');
    } else {
        $('#grid-view').trigger('click');
    }

    // Checkout
    $(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function (e) {
        if (e.keyCode == 13) {
            $('#collapse-checkout-option #button-login').trigger('click');
        }
    });

    // tooltips on hover
    $('[data-toggle=\'tooltip\']').tooltip({
        container: 'body'
    });

    // Makes tooltips work on ajax generated content
    $(document).ajaxStop(function () {
        $('[data-toggle=\'tooltip\']').tooltip({
            container: 'body'
        });
    });
});

// Cart add remove functions
var cart = {
    'add': function (product_id, quantity) {
        $.ajax({
            url: 'index.php?route=checkout/cart/add',
            type: 'post',
            data: 'product_id=' + product_id + '&quantity=' + (typeof (quantity) != 'undefined' ? quantity : 1),
            dataType: 'json',
            beforeSend: function () {
                $('#cart > button').button('loading');
            },
            complete: function () {
                $('#cart > button').button('reset');
            },
            success: function (json) {
                $('.alert, .text-danger').remove();

                if (json['redirect']) {
                    location = json['redirect'];
                }

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

                    // Need to set timeout otherwise it wont update the total
                    setTimeout(function () {
                        $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-basket"></i><span id="cart-total">' + json['total'] + '</span></span>');
                    }, 100);

                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');

                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'update': function (key, quantity) {
        $.ajax({
            url: 'index.php?route=checkout/cart/edit',
            type: 'post',
            data: 'key=' + key + '&quantity=' + (typeof (quantity) != 'undefined' ? quantity : 1),
            dataType: 'json',
            beforeSend: function () {
                $('#cart > button').button('loading');
            },
            complete: function () {
                $('#cart > button').button('reset');
            },
            success: function (json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-basket"></i><span id="cart-total"> ' + json['total'] + '</span></span>');
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function (key) {
        $.ajax({
            url: 'index.php?route=checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function () {
                $('#cart > button').button('loading');
            },
            complete: function () {
                $('#cart > button').button('reset');
            },
            success: function (json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-basket"></i><span id="cart-total"> ' + json['total'] + '</span></span>');
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
}

var voucher = {
    'add': function () {

    },
    'remove': function (key) {
        $.ajax({
            url: 'index.php?route=checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function () {
                $('#cart > button').button('loading');
            },
            complete: function () {
                $('#cart > button').button('reset');
            },
            success: function (json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-basket"></i><span id="cart-total"> ' + json['total'] + '</span></span>');
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
}

var wishlist = {
    'add': function (product_id) {
        $.ajax({
            url: 'index.php?route=account/wishlist/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function (json) {
                $('.alert').remove();

                if (json['redirect']) {
                    location = json['redirect'];
                }

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }

                $('#wishlist-total span').html(json['total']);
                $('#wishlist-total').attr('title', json['total']);

                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function () {

    }
}

var compare = {
    'add': function (product_id) {
        $.ajax({
            url: 'index.php?route=product/compare/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function (json) {
                $('.alert').remove();

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

                    $('#compare-total').html(json['total']);

                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function () {

    }
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function (e) {
    e.preventDefault();

    $('#modal-agree').remove();

    var element = this;

    $.ajax({
        url: $(element).attr('href'),
        type: 'get',
        dataType: 'html',
        success: function (data) {
            html = '<div id="modal-agree" class="modal">';
            html += '  <div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '      <div class="modal-header">';
            html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
            html += '      </div>';
            html += '      <div class="modal-body">' + data + '</div>';
            html += '    </div';
            html += '  </div>';
            html += '</div>';

            $('body').append(html);

            $('#modal-agree').modal('show');
        }
    });
});

// Autocomplete */
(function ($) {
    $.fn.autocomplete = function (option) {
        return this.each(function () {
            this.timer = null;
            this.items = new Array();

            $.extend(this, option);

            $(this).attr('autocomplete', 'off');

            // Focus
            $(this).on('focus', function () {
                this.request();
            });

            // Blur
            $(this).on('blur', function () {
                setTimeout(function (object) {
                    object.hide();
                }, 200, this);
            });

            // Keydown
            $(this).on('keydown', function (event) {
                switch (event.keyCode) {
                    case 27: // escape
                        this.hide();
                        break;
                    default:
                        this.request();
                        break;
                }
            });

            // Click
            this.click = function (event) {
                event.preventDefault();

                value = $(event.target).parent().attr('data-value');

                if (value && this.items[value]) {
                    this.select(this.items[value]);
                }
            }

            // Show
            this.show = function () {
                var pos = $(this).position();

                $(this).siblings('ul.dropdown-menu').css({
                    top: pos.top + $(this).outerHeight(),
                    left: pos.left
                });

                $(this).siblings('ul.dropdown-menu').show();
            }

            // Hide
            this.hide = function () {
                $(this).siblings('ul.dropdown-menu').hide();
            }

            // Request
            this.request = function () {
                clearTimeout(this.timer);

                this.timer = setTimeout(function (object) {
                    object.source($(object).val(), $.proxy(object.response, object));
                }, 200, this);
            }

            // Response
            this.response = function (json) {
                html = '';

                if (json.length) {
                    for (i = 0; i < json.length; i++) {
                        this.items[json[i]['value']] = json[i];
                    }

                    for (i = 0; i < json.length; i++) {
                        if (!json[i]['category']) {
                            html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
                        }
                    }

                    // Get all the ones with a categories
                    var category = new Array();

                    for (i = 0; i < json.length; i++) {
                        if (json[i]['category']) {
                            if (!category[json[i]['category']]) {
                                category[json[i]['category']] = new Array();
                                category[json[i]['category']]['name'] = json[i]['category'];
                                category[json[i]['category']]['item'] = new Array();
                            }

                            category[json[i]['category']]['item'].push(json[i]);
                        }
                    }

                    for (i in category) {
                        html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

                        for (j = 0; j < category[i]['item'].length; j++) {
                            html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
                        }
                    }
                }

                if (html) {
                    this.show();
                } else {
                    this.hide();
                }

                $(this).siblings('ul.dropdown-menu').html(html);
            }

            $(this).after('<ul class="dropdown-menu"></ul>');
            $(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

        });
    }
})(window.jQuery);