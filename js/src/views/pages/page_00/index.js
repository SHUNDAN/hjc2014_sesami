// page00
;(function () {

    $page = $('[data-page="0"]');



    // ロゴ.
    $page.on('click', '.jsLogo', function () {

        $(this)
            .addClass('anim noAction')
            .wait(3000)
            .removeClass('anim noAction');
    });










})();