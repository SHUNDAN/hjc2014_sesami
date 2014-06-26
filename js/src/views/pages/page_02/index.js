// page02
sesami.page02 = {};
sesami.page02.init = function () {
    console.debug('page02 init is called.');

    var $content = $('[data-page="2"]');
    var TOUCH_START = sesami.event.TOUCH_START;
    var TOUCH_MOVE = sesami.event.TOUCH_MOVE;
    var TOUCH_END = sesami.event.TOUCH_END;

    // クッキーモンスターのアニメーション開始
    $content.find('.jsCM').addClass('anim');

    // クッキーかけらのディレイ
    var $jsCMTips = $('.jsCMTips');
    $jsCMTips.wait(1500).addClass('hidden');

    // 涙のディレイ
    var $jsCMTears = $('.jsCMTears');
    $jsCMTears.wait(1500).removeClass('hidden');

    // プールタップで看板出現
    $content.on(TOUCH_START, '.jsPoolAreaTap', function () {
        console.debug('[jsPoolAreaTap] touchstart');
        $content.find('.jsCaution').removeClass('hidden');
        sesami.actionMap.page2.action1 = true;
        sesami.effectPlayer.play(20);
    
    }).on(TOUCH_END, '.jsPoolAreaTap', function () {
        console.debug('[jsPoolAreaTap] touchend');
        $content.find('.jsCaution').addClass('hidden');
    });

    // オスカー
    var $oscarHand_l = $('.jsOscarHand_l');
    $oscarHand_l.wait(500).removeClass('hidden');

    var $oscarFace = $('.jsOscarFace');
    $oscarFace.wait(1000).removeClass('hidden');

    var $oscarHand_r = $('.jsOscarHand_r');
    $oscarHand_r.wait(1500).removeClass('hidden');

    var $jsOscarFuta = $('.jsOscarFuta');
    $jsOscarFuta.wait(1000).addClass('oscar__futa--stop');

    // 吹き出しのディレイ
    var $jsFkidashiArea = $('.jsFkidashiArea');
    $jsFkidashiArea.wait(2000).removeClass('hidden');


    // メンバー達
    $content.find('.jsTapMemberArea').on(TOUCH_START, function () {
        $content.find('.memberArea').addClass('anim');
        sesami.effectPlayer.play(16);
        sesami.actionMap.page2.action2 = true;
    }).on(TOUCH_END, function () {
        $content.find('.memberArea').removeClass('anim');
        sesami.effectPlayer.play(16);
    });

    // クッキーモンスター
    $content.find('.jsTapCookieMonster').on(TOUCH_START, function () {
        $content.find('.jsCM').removeClass('anim');
        $content.find('.jsCMTips, .jsCMTears').addClass('hidden');
        $content.find('.jsEye2').removeClass('hidden');
        sesami.effectPlayer.play(24);
        sesami.actionMap.page2.action3 = true;
    }).on(TOUCH_END, function () {
        $content.find('.jsCM').addClass('anim');
        $content.find('.jsCMTips, .jsCMTears').wait(1500).removeClass('hidden');        
        $content.find('.jsEye2').addClass('hidden');
        sesami.effectPlayer.play(19);
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
