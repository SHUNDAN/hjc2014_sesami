// page00
sesami.page00 = {};
sesami.page00.init = function () {
    console.debug('page00 init is called.');

    var
        $page = $('[data-page="0"]'),
        effectPlayer = sesami.effectPlayer,
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

        effectPlayer.play(8);

        sesami.actionMap.page0.action1 = true;
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

        effectPlayer.play(22);

        sesami.actionMap.page0.action2 = true;
    });

    // オスカー
    $page.on(TOUCH_END, '.tapOscar', function () {

        $page
            .find('.jsOscarAnim')
            .addClass('anim noAction')
            .wait(5000)
            .removeClass('anim noAction');

        setTimeout(function () {
            effectPlayer.play(23);
        }, 1000);

        sesami.actionMap.page0.action3 = true;
    });



    // バート
    $page.on(TOUCH_END, '.tapBert', function () {

        $page
            .find('.jsBert')
            .toggleClass('hidden');

        effectPlayer.play(19);

        sesami.actionMap.page0.action4 = true;
    });


    // クッキーモンスター（通常）
    var cmAnim = function () {
        $page
            .find('.jsCmMouse')
            .wait(3000)
            .toggleClass('hidden')
            .wait(500)
            .toggleClass('hidden')
            .wait(2000)
            .toggleClass('hidden')
            .wait(500)
            .toggleClass('hidden')
            .wait(1000, cmAnim);

    };
    cmAnim();

    // クッキーモンスター（タップ）
    $page.on(TOUCH_END, '.tapCookieMonster', function () {
        $page
            .find('.jsCmArea')
            .addClass('anim noAction')
            .wait(2500)
            .removeClass('anim noAction');

        setTimeout(function () {
            effectPlayer.play(9);
            setTimeout(function () {
                effectPlayer.play(9);
            }, 500);
        }, 1125);

        sesami.actionMap.page0.action5 = true;
    });


    // エルモ（タップ）
    $page.on(TOUCH_END, '.tapElmo', function () {
        $page
            .find('.jsElBody')
            .toggleClass('hidden');

        effectPlayer.play(15);
        sesami.actionMap.page0.action6 = true;
    });


    // ビッグバード（タップ）
    $page.on(TOUCH_END, '.tapBigBird', function () {
        $page
            .find('.jsBigBird')
            .toggleClass('hidden');

        effectPlayer.play(10);
        sesami.actionMap.page0.action7 = true;
    });




};


//
// 後処理
//
sesami.page00.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page00 dealloc is called.');
};
