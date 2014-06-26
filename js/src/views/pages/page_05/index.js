// page05
sesami.page05 = {};
sesami.page05.init = function () {
    console.debug('page05 init is called.');


    var
        $page = $('[data-page="5"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END,
        CookieManager = sesami.CookieManager;



    // ナビゲーション
    $page
        .find('.handArea1')
        .wait(1000)
        .addClass('anim');



    var
        selectType = 1,
        numOfCookie = 0;

    // 型選択
    var changeKata = function (targetType) {

        $page
            .find('.kataArea')
            .removeClass('select');

        $page
            .find('.kataArea.type' + selectType)
            .addClass('select');

        sesami.actionMap.page5.action1 = true;
    }

    var userSelect = false;
    $page.on(TOUCH_START, '.tapAreaKata', function () {
        userSelect = true;
        selectType = $(this).data('type');
        changeKata(selectType);

        sesami.effectPlayer.play(20);
    });


    // 型抜き
    var radian = 0;
    var addRandomStyle = function (element) {

        radian += 1.2;
        var deltaX = Math.floor(Math.random() * Math.cos(radian) * 160);
        var deltaY = Math.floor(Math.random() * Math.sin(radian) * 160);
        // var scale  = Math.max(1, Math.random() * 3);
        // if (sesami.isIphone) {
        //     scale = 1;
        // }
        // var transform = 'translate('+deltaX+'%, '+deltaY+'%) scale(' + scale + ', ' + scale + ')';
        var transform = 'translate3d('+deltaX+'%, '+deltaY+'%, 0)';
        console.debug('transform:', transform);

        $(element)
            .css({
                '-webkit-transform': transform,
                '-moz-transform': transform,
                '-ms-transform': transform,
                'transform': transform,
                opacity: 1
                // 'width': scale + '%',
                // 'height': 'auto'
            });

        sesami.effectPlayer.play(15);


        setTimeout(function () {
            numOfCookie++;
            if (numOfCookie === 3) {
                sesami.effectPlayer.play(25);
                $('#nextPageBtn').css('opacity', 1);
            }
        }, 1200);

        sesami.actionMap.page5.action2 = true;
    };
    $page.on(TOUCH_START, '.tapAreaBase', function () {
        console.debug('[tapAreaBase]');

        var image = new Image();
        image.src = './img/cookie/cookie1-' + selectType + '.png';
        image.className = 'cookie';
        image.onload = function () {
            $page.find('.cookieArea').append(this);
            var self = this;
            setTimeout(function () {
                addRandomStyle(self);
            }, 1);

            CookieManager.addCookieCount(selectType);

            if (userSelect === false) {
                selectType++;
                if (selectType > 3) {
                    selectType = 1;
                }
                changeKata(selectType);
            }
        };


    });





};


//
// 後処理
//
sesami.page05.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page05 dealloc is called.');
};
