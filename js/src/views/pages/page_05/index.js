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


    var selectType = 1;

    // 型選択
    var changeKata = function (targetType) {

        $page
            .find('.kataArea')
            .removeClass('select');

        $page
            .find('.kataArea.type' + selectType)
            .addClass('select');        
    }

    var userSelect = false;
    $page.on(TOUCH_END, '.tapAreaKata', function () {
        userSelect = true;
        selectType = $(this).data('type');
        changeKata(selectType);
    });


    // 型抜き
    var radian = 0;
    var addRandomStyle = function (element) {

        radian += 1.2;
        // var signX = (Math.random() < .4 ? 1 : -1);
        // var signY = (Math.random() < .4 ? 1 : -1);
        // var deltaX = Math.random() * 150 - 100;
        // var deltaY = Math.random() * 200 - 150;
        var deltaX = Math.random() * Math.cos(radian) * 100;
        var deltaY = Math.random() * Math.sin(radian) * 100;
        var scale  = Math.max(10, Math.random() * 4 * 10);
        var transform = 'translate('+deltaX+'%, '+deltaY+'%)';

        $(element)
            .css({
                '-webkit-transform': transform,
                '-moz-transform': transform,
                '-ms-transform': transform,
                'transform': transform,
                'width': scale + '%',
                'height': 'auto'
            });
    };
    $page.on(TOUCH_END, '.tapAreaBase', function () {
        console.debug('[tapAreaBase]');

        var image = new Image();
        image.src = './img/page05/cookie1-' + selectType + '.png';
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
