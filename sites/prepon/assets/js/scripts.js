jQuery(function ($) {
    "use strict";

    /*--scroll to top on refresh and init fullpage plugin--*/
    var setupFullPageScroll = function () {
        $(document).ready(function () {
            $(this).scrollTop(0);
            if ($(window).width() > 768) {
                $('#fullpage').fullpage({
                    menu: '#menu',
                    anchors: ['home', 'about', 'menus', 'us', 'you', 'reservations'],
                    lazyLoading: true,
                    controlArrows: false,
                    slidesNavigation: false,
                    slidesNavPosition: 'top',
                    scrollingSpeed: 600,
                    scrollOverflow: true,
                }); //fullpage function ends 
            } //if statement ends
            else {
                    $.fn.fullpage.destroy('all');
                 } //else statement ends    
        }); // document ready function ends   
    }; // var function ends    

    $(window).resize(function () {
        setupFullPageScroll();
    }).trigger('resize');


    new WOW().init();


    $('.dot').click(function () {
        var textSelector = '.' + $(this).data('id');
        $('.allTextClass').addClass('hidden').removeClass('visible');
        $(textSelector).addClass('visible').addAnimation('fadeInUp')
    });







});
