// page07
sesami.page07 = {};
sesami.page07.init = function () {
    console.debug('page07 init is called.');

    // defines.
    var 
        $page = $('[data-page="7"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END,
        CookieManager = sesami.CookieManager,
        floor = Math.floor;


    // Private Functions.
    //---------------------------------------
    var getPoses = function (eventObject) {

        var pageWidth = $page.width();
        var pageHeight = $page.height();

        if (eventObject.type === 'mousedown') {
            console.debug('[eventObject]', eventObject);
            var offsetX = eventObject.offsetX || eventObject.pageX;
            var offsetY = eventObject.offsetY || eventObject.pageY;
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
    var type = 1;
    $page.find('.tapArea').on(TOUCH_START, function (e) {
        console.debug('[cookie]');
        var posArray = getPoses(e);
        var sizeArray = getSizes(posArray.length);
        for (var i = 0; i < posArray.length; i++) {
            var pos = posArray[i];
            var size = sizeArray[i];

            var img = new Image();
            img.src = './img/cookie/cookie2-'+type+'.png?_=' + window.appVersion;
            img.pos = pos;
            img.className = 'jsDummy';
            img.style.width = size + '%';
            img.style.height = 'auto';
            img.style.top = (pos.y - size/2) + '%';
            img.style.left = (pos.x - size/2) + '%';
            img.style.position = 'absolute';

            img.onload = function () {
                $(this).insertBefore('[data-page="7"] .tapArea');
            }

            type++;
            if (type === 4) {
                type = 1;
            }
        }

        sesami.effectPlayer.play(19);
        sesami.actionMap.page7.action1 = true;
    });



    // load
    //----------------------------
    setTimeout(function () {
        $page.addClass('startAnim');
    }, 100);




    // クッキーを差し替える（型抜きした割合で分配する）
    // Cookieのランダム配置
    var $cookies = $page.find('.cookie');
    var MAX_NUM = $cookies.length;
    var nums = [];
    nums[0] = floor(MAX_NUM * CookieManager.getRaito(1));
    nums[1] = floor(MAX_NUM * CookieManager.getRaito(2));
    nums[2] = MAX_NUM - nums[0] - nums[1];

    var idx = 0;
    for (var i = 0; i < MAX_NUM; i++) {
        var $cookie = $cookies.eq(i);
        var type;
        while (true) {
            if (nums[idx]) {
                type = idx + 1;
                nums[idx]--;
                break;
            }
            idx++;
            idx = idx % 3;
        }
        $cookie.attr('src', './img/cookie/cookie2-'+type+'.png?_=' + window.appVersion);
    }





    // タップ：クッキーモンスター
    $page.find('.tapCMArea').on(TOUCH_START, function () {
        $page
            .find('.cookieMonster')
            .removeClass('anim')
            .addClass('anim')
            .wait(1000)
            .removeClass('anim');

        sesami.effectPlayer.play(13);
        sesami.actionMap.page7.action2 = true;
    });






};


sesami.page07.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page07 dealloc is called.');

    var $page = $('[data-page="7"]');
    $page.removeClass('startAnim');
    $page.find('.jsDummy').remove();
};

