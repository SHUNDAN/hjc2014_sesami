// page02
sesami.page02 = {};
sesami.page02.init = function () {
    console.debug('page02 init is called.');

    var $content = $('[data-page="2"]');
    var TOUCH_START = sesami.event.TOUCH_START;
    var TOUCH_MOVE = sesami.event.TOUCH_MOVE;
    var TOUCH_END = sesami.event.TOUCH_END;

    $content.on(TOUCH_START, '.jsPoolAreaTap', function () {
        console.debug('[jsPoolAreaTap] touchstart');
        $content.find('.jsCaution').removeClass('hidden');
    
    }).on(TOUCH_END, '.jsPoolAreaTap', function () {
        console.debug('[jsPoolAreaTap] touchend');
        $content.find('.jsCaution').addClass('hidden');
    });



};

//
// 後処理
//
sesami.page02.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page00 dealloc is called.');
};
