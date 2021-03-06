// page07
sesami.page09 = {};
sesami.page09.init = function () {
    console.debug('page09 init is called.');

    // defines.
    var 
        $page = $('[data-page="9"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END,
        CookieManager = sesami.CookieManager,
        floor = Math.floor;


    // 数える
    var done = 0, total = 0;
    for (var i = 0; i < 9; i++) {
        var actions = sesami.actionMap['page' + i];
        var j = 1;
        while (true) {
            var action = actions['action' + j++];
            if (action === true) {
                done++;
                total++;
            } else if (action === false) {
                total++;
            } else {
                break;
            }
        }
    }

    $page.find('#num1').text(done);
    $page.find('#num2').text(total);



    if (sesami.isIEold || sesami.isAndroid2X || sesami.isIE) {
        $page.find('.button')
            .text('ひょうしにもどる')
            .on(TOUCH_END, function () {
            sesami.goNextPage();
            return false;
        });
    }


};


sesami.page09.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page09 dealloc is called.');
};

