jQuery(function ($) {
            "use strict";


            //FORCE VIDEO PLAY ON iOS hack
            //$(document).ready(() => {
                $('video').get(0).play();
           // });

            // LOADER
            
                /*$(function () {
                    $('body').addClass('noScroll');
                    setTimeout(function () {
                        $('.loading').addClass("hidden");
                        $('body').removeClass('noScroll');
                    });
                });*/
          

           
                //HIDE NAVBAR
                var scrollTimeOut = true,
                    lastYPos = 0,
                    yPos = 0,
                    yPosDelta = 5,
                    nav = $('nav.navbar'),
                    navHeight = nav.outerHeight(),
                    setNavClass = function () {
                        scrollTimeOut = false;
                        yPos = $(window).scrollTop();

                        if (Math.abs(lastYPos - yPos) >= yPosDelta) {
                            if (yPos > lastYPos && yPos > navHeight) {
                                nav.addClass('hide-nav');
                            } else {
                                nav.removeClass('hide-nav');
                            }
                            lastYPos = yPos;
                        }
                    };

                $(window).scroll(function (e) {
                    scrollTimeOut = true;
                });

                setInterval(function () {
                    if (scrollTimeOut) {
                        setNavClass();
                    }

                }, 250);

                //DISABLE HOVER ON TOUCH
                function hasTouch() {
                    return 'ontouchstart' in document.documentElement ||
                        navigator.maxTouchPoints > 0 ||
                        navigator.msMaxTouchPoints > 0;
                };
                if (hasTouch()) {
                    try {
                        for (var si in document.styleSheets) {
                            var styleSheet = document.styleSheets[si];
                            if (!styleSheet.rules) continue;

                            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                                if (!styleSheet.rules[ri].selectorText) continue;

                                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                                    styleSheet.deleteRule(ri);
                                }
                            }
                        }
                    } catch (ex) {}
                };

                //CLOSE MENU ON CLICK
                $(function () {
                    var navMain = $(".navbar-collapse");
                    navMain.on("click", "a:not([data-toggle])", null, function () {
                        navMain.collapse('hide');
                    });
                });

                //HIGHLIGHT MENU SECTION
                $('body').scrollspy({
                    target: '#myNavbar',
                    offset: 50
                });


                // OWL CAROUSEL
                $('.owl-carousel').owlCarousel({
                    loop: true,
                    checkVisibility: false,
                    dots: true,
                    responsiveClass: true,
                    mouseDrag: true,
                    touchDrag: true,
                    margin: 5,
                    slideBy: 5,
                    nav: true,
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                    responsive: {
                        0: {
                            items: 1,
                            dots: false,
                        },
                        414: {
                            items: 2,
                            dots: false,
                        },
                        600: {
                            items: 3,

                        },
                        1000: {
                            items: 5,

                        }
                    }
                });

                // MAGNIFIC POPUp
                $('.popup-vimeo').magnificPopup({
                    disableOn: 0,
                    midClick: true,
                    type: 'iframe',
                    iframe: {
                        markup: '<div class="mfp-iframe-scaler">' +
                            '<div class="mfp-close"></div>' +
                            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen="1" webkitallowfullscreen="1" mozallowfullscreen="1"></iframe>' +
                            '<div class="mfp-title">Some caption</div>' +
                            '</div>'
                    },
                    callbacks: {
                        markupParse: function (template, values, item) {
                            values.title = item.el.attr('title');
                        }
                    },
                    mainClass: 'mfp-fade',
                    removalDelay: 500,
                    preloader: false,
                    fixedContentPos: true,
                });



                $('.grid').imagesLoaded(function () {
                    // MASONRY
                    $('.grid').masonry({
                        itemSelector: '.grid-item',
                        percentPosition: true,
                        gutter: 5,
                        columnWidth: '.grid-sizer'
                    });
                });

                $('.popup-gallery').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    disableOn: 0,
                    mainClass: 'mfp-fade',
                    closeOnContentClick: true,
                    closeBtnInside: true,
                    closeOnBgClick: true,
                    removalDelay: 60,
                    preloader: false,
                    fixedContentPos: false,
                    gallery: {
                        enabled: true,
                        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                    }

                });

                //SMOOTH SCROLL
                $(document).ready(function () {
                    $("a").on('click', function (event) {
                        if (this.hash !== "") {

                            event.preventDefault();

                            var hash = this.hash;

                            $('html, body').animate({
                                scrollTop: $(hash).offset().top
                            }, 800, function () {

                                window.location.hash = hash;
                            });
                        }
                    });
                });



            });
