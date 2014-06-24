// page06
sesami.page06 = {};
sesami.page06.init = function () {
    console.debug('page06 init is called.');


    var
        $page = $('[data-page="6"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END,
        CookieManager = sesami.CookieManager,
        floor = Math.floor;


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
        $cookie.attr('src', './img/page06/cookie2-'+type+'.png');
    }



    // アニメーション開始
    setTimeout(function () {
        $page
            .addClass('anim')
            .wait(3000, function () {
                countDown();
                addCountTapAction();
            });
    }, 100);



    // カウントダウンアニメーション
    var num = 11;
    var charaNo = 0;
    var countDown = function () {

        // return;

        num--;

        $page.find('.num').addClass('hidden');
        $page.find('.chara').addClass('hidden');

        var nextTime = 1000;

        if (num > 0) {
            $page.find('.num' + num).removeClass('hidden');            
            sesami.page06.timer = setTimeout(countDown, nextTime);
            return;        
        }

        $page
            .find('.box')
            .addClass('anim');
        sesami.effectPlayer.play(16);

        $page
            .find('.chara1')
            .removeClass('hidden')
            .wait(1000)
            .addClass('hidden')
            .wait(0, function () {
                
                $('#nextPageBtn').css('opacity', 1);

                $page
                    .find('.chara2')
                    .removeClass('hidden')
                    .wait(100)
                    .addClass('move')
                    .wait(1200, function () {
                        sesami.goNextPage();
                    });
            });

    }



    // カウントダウン部分（タップ）
    var addCountTapAction = function () {
        $page.on(TOUCH_END, '.tapAreaButton', function () {

            if (sesami.page06.timer) {
                clearTimeout(sesami.page06.timer);
                countDown();
            }

            sesami.actionMap.page6.action1 = true;
        });
    };



    // レンジを揺らす（タップ）
    // $page.on(TOUCH_END, '.tapAreaButton', function () {

    //     // $(this)
    //     //     .addClass('noAction')
    //     //     .wait(1000)
    //     //     .removeClass('noAction');

    //     // $page
    //     //     .find('.box')
    //     //     .addClass('anim')
    //     //     .wait(1000)
    //     //     .removeClass('anim');
    // });











};


//
// 後処理
//
sesami.page06.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page06 dealloc is called.');


    if (sesami.page06.timer) {
        clearTimeout(sesami.page06.timer);
    }


};
