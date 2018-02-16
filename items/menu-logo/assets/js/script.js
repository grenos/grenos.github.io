jQuery(function ($) {
    "use strict";


    $(document).ready(function () {
        $(this).scrollTop(0);
    });


    var mainbottom = $('#page').offset().top;
    // on scroll,
    $(window).on('scroll', function () {
        // we round here to reduce a little workload
        stop = ($(window).scrollTop());
        if (stop > mainbottom) {
            $('.logo').addClass('logoSmall');
            $('.main-page').addClass('main');
            $('.article-main').addClass('article-small');
            $('.navbar').addClass('fadeInDown');
            $('.nav-wrap').removeClass('nav-hide')
            $('.navbar').removeClass('fadeOutUp');
        } else {
            $('.logo').removeClass('logoSmall');
            $('.main-page').removeClass('main');
            $('.article-main').removeClass('article-small');
            $('.navbar').addClass('fadeOutUp');
            $('.nav-wrap').addClass('nav-show')
        }

    });


});
