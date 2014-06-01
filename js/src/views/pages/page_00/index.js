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

    // オスカー
    $page.on(TOUCH_END, '.tapOscar', function () {

        $page
            .find('.jsOscarAnim')
            .addClass('anim noAction')
            .wait(5000)
            .removeClass('anim noAction');
    });



    // バート
    $page.on(TOUCH_END, '.tapBert', function () {

        $page
            .find('.jsBert')
            .toggleClass('hidden');
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
            .wait(5000)
            .removeClass('anim noAction');
    });


    // エルモ（タップ）
    $page.on(TOUCH_END, '.tapElmo', function () {
        $page
            .find('.jsElBody')
            .toggleClass('hidden');
    });


    // ビッグバード（タップ）
    $page.on(TOUCH_END, '.tapBigBird', function () {
        $page
            .find('.jsBigBird')
            .toggleClass('hidden');
    });










    // 2014.06.01 ムネ
    // すみません、共通処理として以下を追加させてください.
    // ページ表示時、離脱時に呼び出すインターフェースを追加します.
    // ページの切り替わり時に共通部分から呼び出しますので、必要な処理がありましたら、記述をお願いします.
    //
    sesami.page00 = {};
    sesami.page00.init = function () {
        // ページ表示時に呼び出されます.
        // ページ開始時にイベントのバインドなど、ここで行ってください.
        console.debug('page00 init is called.');
    };
    sesami.page00.dealloc = function () {
        // ページを離れる場合に呼び出されます.
        // イベントのアンバインドやタイマーの削除を、ここで行ってください.
        console.debug('page00 dealloc is called.');
    };



})();