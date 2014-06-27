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
    $bigBirdBody = $bigBirdArea.find('.jsBigBirdBody'),
    $bigBirdMouth = $bigBirdArea.find('.bigBird-mouth_2'),
    isBigBirdAnime = false;

    setInterval(function(){
        if(isBigBirdAnime) return false;
        $bigBirdMouth.toggleClass('hidden');
    },1000);

    $bigBirdBody.on(TOUCH_START, function(event) {
        event.preventDefault();
        if(isBigBirdAnime) return false;
        isBigBirdAnime = true;
        sesami.effectPlayer.play(17);
        $bigBirdArea
            .addClass('anime')
            .one(ANIMATION_END_EVENT, function(event) {
                isBigBirdAnime = false;
                $(this).removeClass('anime');
            });

        sesami.actionMap.page8.action1 = true;
    });

    var
    $bertArea = $('.jsBertArea'),
    $bertHair = $bertArea.find('.bert-hair'),
    bertHairClass = $bertHair.attr('class'),
    bertHairUrl = $bertHair.attr('src'),
    isBertAnime = false;

    $.get(bertHairUrl, function(data) {
        var $svg = jQuery(data).find('svg');
        if(typeof bertHairClass !== 'undefined') {
            $svg = $svg.attr('class', bertHairClass);
        }
        $svg = $svg.removeAttr('xmlns:a');
        $bertHair.replaceWith($svg);
    });

    $bertArea.on(TOUCH_START, function(event) {
        event.preventDefault();
        var color = '#' + ("00000"+Math.floor(Math.random() * 0x1000000).toString(16)).substr(-6);
        $bertArea.find('.bert-hair').find('path').css('fill', color);
        sesami.effectPlayer.play(1 + Math.floor( Math.random() * 25 ));
        sesami.actionMap.page8.action2 = true;
    });

    var
    $elmoArea = $('.jsElmoArea'),
    $elmoBody = $elmoArea.find('.jsElmoBody'),
    isElmoAnime = false;

    $elmoBody.on(TOUCH_START, function(event) {
        event.preventDefault();
        if(isElmoAnime) return false;
        isElmoAnime = true;
        sesami.effectPlayer.play(15);
        $elmoArea
            .addClass('anime')
            .one(ANIMATION_END_EVENT, function(event) {
                isElmoAnime = false;
                $(this).removeClass('anime');
            });

        sesami.actionMap.page8.action3 = true;
    });

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
        $oscar.off();
        $oscar.on(TOUCH_START, function(event) {
            event.preventDefault();
            if(oscarProperty.anime != 0) return false;
            oscarProperty.anime++;
            $(this).addClass('active');
            sesami.effectPlayer.play(16);
            var offsetY = document.getElementById('jsOscarAreaId').offsetTop;
            var offsetX = document.getElementById('jsOscarAreaId').offsetLeft;

            oscarProperty.start = [offsetY,offsetX];
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

            sesami.actionMap.page8.action4 = true;
        });

        $oscar.on(TOUCH_END, function(event) {
            event.preventDefault();
            oscarProperty.anime = 0;
            $(this).removeClass('active');
            $oscarArea
                .removeAttr('style')
                .toggleClass('type2');

            $oscar.toggleClass('hidden');
            sesami.effectPlayer.play(8);

            sesami.actionMap.page8.action5 = true;
        });
    }, function() {
        $oscar.off();
        oscarProperty.anime = 0;
    });

    var
    $cookiemonsterArea = $('.jsCookiemonsterArea'),
    $cookiemonsterHand = $cookiemonsterArea.find('.jsCookiemonsterHand'),
    isCookiemonsterAnime = false;

    $cookiemonsterArea.on(TOUCH_START, function(event) {
        event.preventDefault();
        if(isCookiemonsterAnime) return false;
        isCookiemonsterAnime = true;
        $cookies.addClass('anime');

        $.each($cookies, function(i, val) {
           $cookies.eq(i).attr('src', './img/cookie/cookie2-' + (1 + Math.floor( Math.random() * 3 )) + '.png');
        });

        $cookiemonsterHand
            .addClass('anime')
            .one(ANIMATION_END_EVENT, function(event) {
                isCookiemonsterAnime = false;
                $(this).removeClass('anime');
                $cookies.removeClass('anime');
            });
        sesami.effectPlayer.play(21);
        sesami.actionMap.page8.action6 = true;
    });

};


sesami.page08.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page08 dealloc is called.');
};
