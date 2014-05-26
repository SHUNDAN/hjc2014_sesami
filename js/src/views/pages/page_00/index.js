// page00
;(function () {

    var
        $page = $('[data-page="0"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END
        ;



    // ロゴ.
    $page.on(TOUCH_END, '.tapLogo', function () {

        $page
            .find('.jsLogo')
            .removeClass('anim')
            .addClass('anim')
            .wait(2000)
            .removeClass('anim');
    });


    // タイトル
    $page.on(TOUCH_START + ' mouseenter', '.tapWord', function () {
        var pos = $(this).data('pos');
        // console.debug('[tapWord]', pos);

        $page
            .find('.wordWrapper[data-pos="'+pos+'"]')
            .addClass('scale')
            .wait(800)
            .removeClass('scale');

        $(this)
            .addClass('noAction')
            .wait(800)
            .removeClass('noAction');
    });










})();