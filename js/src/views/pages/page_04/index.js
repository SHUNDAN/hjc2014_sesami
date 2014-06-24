// page04
sesami.page04 = {};
sesami.page04.init = function () {
    console.debug('page04 init is called.');

    var
        $page = $('[data-page="4"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END,
        itemCount = 0,
        $material = $page.find('.material')
        ;


    // ナビゲーション表示
    var duration = 500;
    $page
        .wait(1000, function () {
            $page.find('.handArea1').addClass('anim');
        })
        .wait(duration, function () {
            $page.find('.handArea2').addClass('anim');
        })
        .wait(duration, function () {
            $page.find('.handArea3').addClass('anim');
        })
        .wait(duration, function () {
            $page.find('.handArea4').addClass('anim');
        })
        .wait(duration, function () {
            $page.find('.handArea5').addClass('anim');
        });



    var afterAnimation = function () {
        setTimeout(function () {
            $material.addClass('size' + itemCount);
            if (itemCount === 5) {
                count += 3;
                $page
                    .find('.materialArea')
                    .css({
                        'transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                        '-webkit-transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                        '-moz-transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                        '-ms-transform' : 'rotateZ(' + (DIFF * count) + 'deg)'
                    });
                setTimeout(function () {
                    sesami.effectPlayer.play(25);
                    $('#nextPageBtn').css('opacity', 1);
                }, 1500);
            }
        }, 800);
    };



    // バター（タップ）
    $page.on(TOUCH_END, '.tapButter', function () {
        console.debug('[tapButter]');
        $(this).addClass('hidden');
        $('.butterArea').addClass('anim');
        sesami.effectPlayer.play(13);

        itemCount++;
        afterAnimation();
        sesami.actionMap.page4.action1 = true;
    });

    // 砂糖（タップ）
    $page.on(TOUCH_END, '.tapSuger', function () {
        console.debug('[tapSuger]');
        $(this).addClass('hidden');
        $('.sugerArea').addClass('anim');
        sesami.effectPlayer.play(13);

        itemCount++;
        afterAnimation();
        sesami.actionMap.page4.action2 = true;
    });

    // たまご（タップ）
    $page.on(TOUCH_END, '.tapEgg', function () {
        console.debug('[tapEgg]');
        $(this).addClass('hidden');
        $('.eggArea').addClass('anim');
        sesami.effectPlayer.play(13);

        itemCount++;
        afterAnimation();
        sesami.actionMap.page4.action3 = true;
    });

    // 小麦粉（タップ）
    $page.on(TOUCH_END, '.tapFlour', function () {
        console.debug('[tapFlour]');
        $(this).addClass('hidden');
        $('.flourArea').addClass('anim');
        sesami.effectPlayer.play(13);

        itemCount++;
        afterAnimation();
        sesami.actionMap.page4.action4 = true;
    });

    // チョコ（タップ）
    $page.on(TOUCH_END, '.tapChoco', function () {
        console.debug('[tapChoco]');
        $(this).addClass('hidden');
        $('.chocoArea').addClass('anim');
        sesami.effectPlayer.play(13);

        itemCount++;
        afterAnimation();
        sesami.actionMap.page4.action5 = true;
    });

    // ボール（タップ）
    var DIFF = 120;
    var count = 0;
    $page.on(TOUCH_END, '.tapBowl', function () {
        count++;
        $page
            .find('.materialArea')
            .css({
                'transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                '-webkit-transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                '-moz-transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                '-ms-transform' : 'rotateZ(' + (DIFF * count) + 'deg)'
            });
        sesami.effectPlayer.play(18);

        sesami.actionMap.page4.action6 = true;
    });
    var orgnPos;
    var times = 0;
    var calcDistance = function (p1, p2) {
        if (!p1 || !p2) {
            return 0;
        }
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    $page.on(TOUCH_START, '.tapBowl', function (e) {
        if (e.type === 'touchstart') {
            var touch = e.originalEvent.touches[0];
            orgnPos = {
                x: touch.pageX,
                y: touch.pageY
            }

        } else {
            orgnPos = {
                x: e.pageX,
                y: e.pageY
            }
        }
    }).on(TOUCH_MOVE, '.tapBowl', function (e) {
        if (!orgnPos && e.type === 'mousemove') {
            orgnPos = {
                x: e.pageX,
                y: e.pageY
            };
            return;
        }
        if (++times % 10 !== 0) {
            return;
        }
        if (e.type === 'touchmove') {
            var touch = e.originalEvent.touches[0];
            var curPos = {
                x: touch.pageX,
                y: touch.pageY
            };
        } else {
            var curPos = {
                x: e.pageX,
                y: e.pageY
            };
        }

        var distance = calcDistance(orgnPos, curPos);
        console.debug(distance, e);
        if (distance > 30) {
            orgnPos = curPos;
            count++;
            $page
                .find('.materialArea')
                .css({
                    'transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                    '-webkit-transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                    '-moz-transform' : 'rotateZ(' + (DIFF * count) + 'deg)',
                    '-ms-transform' : 'rotateZ(' + (DIFF * count) + 'deg)'
                });
            sesami.effectPlayer.play(18);

            sesami.actionMap.page4.action6 = true;
        }

    });



};

//
// 後処理
//
sesami.page04.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page00 dealloc is called.');

    var $page = $('[data-page="4"]');
    $page.find('hidden').removeClass('hidden');
    $page.find('anim').removeClass('anim');
};
