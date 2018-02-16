jQuery(function ($) {
    "use strict";


    /*--scroll to top on refresh and init fullpage plugin--*/
    $(document).ready(function () {
        $(this).scrollTop(0);
        $('#fullpage').fullpage();
    });

    /*--extend sidemenu on hover--*/
    $('#mySidenav').hover(function () {
        $(this).stop(true, false).animate({
            width: "290px"
        }, 100, "linear");
    }, function () {
        $(this).animate({
            width: "80px"
        }, 100, "linear");
    });

    $('#mySidenav').hover(function () {
        $('p').removeClass('hidden');
        $('p').addClass('fadeInLeft');
        $('p').removeClass('fadeOutLeft')
    }, function () {
        $('p').addClass('fadeOutLeft')
    });



});
