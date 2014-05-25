// page00
;(function () {

    $page = $('[data-page="0"]');



    // ロゴ.
    $page.on('click', '.jsLogo', function () {

        $(this)
            .removeClass('anim')
            .addClass('anim')
            .wait(1800)
            .removeClass('anim');
    });










})();