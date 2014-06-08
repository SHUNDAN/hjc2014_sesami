// page08
sesami.page08 = {};
sesami.page08.init = function () {
    console.debug('page08 init is called.');

    var
        $page = $('[data-page="8"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END,
        ANIMATION_END_EVENT = 'animationend oAnimationEnd animationend webkitAnimationEnd',
        TRANSITION_EVENT = 'transition oTransition webkitTransition';
        TRANSITION_END_EVENT = 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend',
        CookieManager = sesami.CookieManager,
        floor = Math.floor,
        isTouch = ('ontouchstart' in window);


    // Cookieのランダム配置
    var $cookies = $page.find('.jsCookie');
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
        $cookie.attr('src', './img/cookie/cookie2-'+type+'.png');
    }

    var
    $bigBirdArea = $('.jsBigBirdArea'),
    $bigBirdMouth = $bigBirdArea.find('.bigBird-mouth_2');

    setInterval(function(){
        $bigBirdMouth.toggleClass('hidden');
    },1000);

    var
    $oscar = $('.jsOscar'),
    $oscarArea = $('.jsOscarArea'),
    oscarProperty = {
        start: [0,0],
        page: [0,0],
        move: [0,0],
        anime: 0
    };

    $page.hover(function() {
        $oscar.on(TOUCH_START, function(event) {
            event.preventDefault();
            if(oscarProperty.anime != 0) return false;
            oscarProperty.anime++;
            $(this).addClass('active');
            var offset = $('.jsOscarArea').offset();
            oscarProperty.start = [offset.top,offset.left];
            oscarProperty.page =
            (isTouch)?
            [event.originalEvent.touches[0].pageY,
            event.originalEvent.touches[0].pageX] :
            [event.pageY,
            event.pageX];

        });

        $oscar.on(TOUCH_MOVE, function(event) {
            event.preventDefault();
            if(oscarProperty.anime < 1) return false;
            oscarProperty.anime++;
            oscarProperty.move =
            (isTouch)?
            [event.originalEvent.touches[0].pageY - oscarProperty.page[0],
            event.originalEvent.touches[0].pageX - oscarProperty.page[1]]:
            [event.pageY - oscarProperty.page[0],
            event.pageX - oscarProperty.page[1]];

            $oscarArea
                .css({
                    'top': oscarProperty.start[0] + oscarProperty.move[0],
                    'left': oscarProperty.start[1] + oscarProperty.move[1]
                });
        });

        $oscar.on(TOUCH_END, function(event) {
            event.preventDefault();
            oscarProperty.anime = 0;
            $(this).removeClass('active');
            $oscarArea
                .removeAttr('style')
                .toggleClass('type2');

            $oscar.toggleClass('hidden');

        });
    }, function() {
        $oscar.off();
    });

};


sesami.page08.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page08 dealloc is called.');
};
