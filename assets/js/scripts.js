jQuery(function ($) {
    "use strict";


    $(document).ready(function () {
        $("h2").hover(function (e) {
            var randomClass = getRandomClass();
            $(e.target).attr("class", randomClass);
        });
    });

    function getRandomClass() {
        var classes = new Array("pink", "yellow", "purple", "red", "blue", "orange", "teal", "lime", "green", "cyan", "indigo");

        var randomNumber = Math.floor(Math.random() * 12);

        return classes[randomNumber];
    };


});
