// page01
sesami.page01 = {};
sesami.page01.init = function () {
    console.debug('page01 init is called.');


    // コンテナ
    var 
        $content = $('[data-page="1"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END;

    // Boxタップ
    $content.on(TOUCH_END, '.jsBoxTap', function () {
        console.debug('[jsBoxTap]');

        var 
            $box = $content.find('.jsBox'),
            $this = $(this);

        $box.addClass('rotateAnim');
        $this.addClass('noAction');
        setTimeout(function () {
            $box.removeClass('rotateAnim');
            $this.removeClass('noAction');
        }, 800);

        sesami.effectPlayer.play(24);

        sesami.actionMap.page1.action1 = true;

    });


    // Bodyタップ
    $content.on(sesami.event.TOUCH_START, '.jsBodyTap', function () {
        console.debug('[jsBodyTap] touchstart');
        $content.find('.jsEye').removeClass('hidden');
        $content.find('.jsDrop').addClass('hidden');
        $content.find('.jsArmAnim').addClass('stop');

        sesami.actionMap.page1.action2 = true;
    
    }).on(sesami.event.TOUCH_END, '.jsBodyTap', function () {
        console.debug('[jsBodyTap] touchend');
        $content.find('.jsEye').addClass('hidden');
        $content.find('.jsDrop').removeClass('hidden');
        $content.find('.jsArmAnim').removeClass('stop');

        sesami.effectPlayer.play(23);
    });


};




//
// 後処理
//
sesami.page01.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page01 dealloc is called.');
};
