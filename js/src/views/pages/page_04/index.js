// page04
sesami.page04 = {};
sesami.page04.init = function () {
    console.debug('page04 init is called.');

    var
        $page = $('[data-page="4"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END
        ;


    // バター（タップ）
    $page.on(TOUCH_END, '.tapButter', function () {
        console.debug('[tapButter]');
        $(this).addClass('hidden');
        $('.butterArea').addClass('anim');
    });

    // 砂糖（タップ）
    $page.on(TOUCH_END, '.tapSuger', function () {
        console.debug('[tapSuger]');
        $(this).addClass('anim');
        $('.sugerArea').addClass('anim');
    });

    // たまご（タップ）
    $page.on(TOUCH_END, '.tapEgg', function () {
        console.debug('[tapEgg]');
        $(this).addClass('anim');
        $('.eggArea').addClass('anim');
    });

    // 小麦粉（タップ）
    $page.on(TOUCH_END, '.tapFlour', function () {
        console.debug('[tapFlour]');
        $(this).addClass('anim');
        $('.flourArea').addClass('anim');
    });

    // チョコ（タップ）
    $page.on(TOUCH_END, '.tapChoco', function () {
        console.debug('[tapChoco]');
        $(this).addClass('anim');
        $('.chocoArea').addClass('anim');
    });




};

//
// 後処理
//
sesami.page04.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page00 dealloc is called.');

    var $page = $('[data-page="4"]');
    $page.find('hidden').removeClass('hidden');
    $page.find('anim').removeClass('anim');
};
