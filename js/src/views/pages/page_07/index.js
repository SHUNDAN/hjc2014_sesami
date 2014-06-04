// page07
sesami.page07 = {};
sesami.page07.init = function () {
    console.debug('page07 init is called.');

    // defines.
    var 
        $page = $('[data-page="7"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END;


    // Private Functions.
    //---------------------------------------
    var getPoses = function (eventObject) {

        var pageWidth = $page.width();
        var pageHeight = $page.height();

        if (eventObject.type === 'mousedown') {
            var offsetX = eventObject.offsetX;
            var offsetY = eventObject.offsetY;
            return [{
                x: (offsetX / pageWidth) * 100,
                y: (offsetY / pageHeight) * 100
            }];
        
        } else { // touch event.

            var posArray = [];
            var touches = eventObject.originalEvent.touches;
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i];
                console.debug('touch', touch);
                posArray.push({
                    x: (touch.clientX / pageWidth) * 100,
                    y: (touch.clientY / pageHeight) * 100                    
                });
            }

            return posArray;
        }
    };

    var getSizes = function (num) {
        var sizeArray = [];
        for (var i = 0; i < num; i++) {
            var size = Math.random() * 30;
            sizeArray.push(Math.max(5, size));
        }
        return sizeArray;
    }


    // クッキーをいっぱい貼付ける
    // TODO アンバインドもする.
    $page.find('.tapArea').on(TOUCH_START, function (e) {
        console.debug('[cookie]');
        var posArray = getPoses(e);
        var sizeArray = getSizes(posArray.length);
        for (var i = 0; i < posArray.length; i++) {
            var pos = posArray[i];
            var size = sizeArray[i];

            var img = new Image();
            img.src = './img/page07/cookie.svg';
            img.pos = pos;
            img.className = 'jsDummy';
            img.style.width = size + '%';
            img.style.top = (pos.y - size/2) + '%';
            img.style.left = (pos.x - size/2) + '%';
            img.style.position = 'absolute';

            img.onload = function () {
                $(this).insertBefore('[data-page="7"] .tapArea');
            }
        }
    });



    // load
    //----------------------------
    setTimeout(function () {
        $page.addClass('startAnim');
    }, 100);

};


sesami.page07.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page07 dealloc is called.');

    var $page = $('[data-page="7"]');
    $page.removeClass('startAnim');
    $page.find('.jsDummy').remove();
};

