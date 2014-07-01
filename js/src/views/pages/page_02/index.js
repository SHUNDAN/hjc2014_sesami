// page02
sesami.page02 = {};
sesami.page02.init = function () {
    console.debug('page02 init is called.');

    var $content = $('[data-page="2"]');
    var effectPlayer = sesami.effectPlayer;
    var TOUCH_START = sesami.event.TOUCH_START;
    var TOUCH_MOVE = sesami.event.TOUCH_MOVE;
    var TOUCH_END = sesami.event.TOUCH_END;
    var ANIMATION_END_EVENT = 'animationend oAnimationEnd animationend webkitAnimationEnd';
    var TRANSITION_EVENT = 'transition oTransition webkitTransition';
    var TRANSITION_END_EVENT = 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend';

    // クッキーモンスタータップアニメ
    // 初回の手のアニメーションのENDイベントを取得したら、
    // 手のobjectを差し替える
    var isCMAnime = false;
    var $cm_target = $content.find('.jsCMHand');
    var $cm_target_02 = $content.find('.jsCMHand--02');
    $cm_target.one(ANIMATION_END_EVENT, function(event) {
      $(this).addClass('hidden');
      $(this).next().removeClass('hidden');
    });
    // クッキーモンスターをタップしたら、
    // 差し替えたタップアニメ用の手に
    // アニメーション用classを付与する。アニメが終わったらremoveする。
    $content.on(TOUCH_START, '.jsCMArea', function () {
        var $target = $content.find('.jsCMArea');
        var that = this;
        // event.preventDefault();
        if(this.isCMAnime) {
          $cm_target_02.removeClass('is-tap--anim');
          // return false;
        }
        else {
          this.isCMAnime = true;
        }
        $cm_target_02
          .addClass('is-tap--anim')
          .one(ANIMATION_END_EVENT, function(event) {
              that.isCMAnime = false;
              $cm_target_02.removeClass('is-tap--anim');
          });
        sesami.effectPlayer.play(20);
        sesami.actionMap.page2.action1 = true;
    });

    // クッキーかけらのディレイ
    var $jsCMTips = $content.find('.jsCMTips');
    $jsCMTips.wait(1500).addClass('hidden');

    // 涙のディレイ
    var $jsCMTears = $content.find('.jsCMTears');
    $jsCMTears.wait(1500).removeClass('hidden');

    // プールタップで看板出現
    $content.on(TOUCH_START, '.jsPoolAreaTap', function () {
        $content.find('.jsCaution').removeClass('hidden');
        sesami.actionMap.page2.action2 = true;
        effectPlayer.play(15);
    // }).on(TOUCH_MOVE, '.jsPoolAreaTap', function () {
    //     $content.find('.jsCaution').addClass('hidden');
    }).on(TOUCH_END + ' touchcancel', '.jsPoolAreaTap', function () {
        $content.find('.jsCaution').addClass('hidden');
        effectPlayer.play(15);
    });

    // ビッグバードタップ
    var $jsBBArea = $content.find('.jsBBArea');
    var $jsBB_01 = $content.find('.jsBB--01');
    var $jsBB_02 = $content.find('.jsBB--02');
    var isBBAnime = false;
    $jsBBArea.on(TOUCH_START, $(this), function () {
        // event.preventDefault();
        $jsBB_01.addClass('hidden');
        $jsBB_02.removeClass('hidden');
        sesami.actionMap.page2.action3 = true;
        sesami.effectPlayer.play(18);
    }).on(TOUCH_END, $(this), function () {
        $jsBB_01.removeClass('hidden');
        $jsBB_02.addClass('hidden');
    });;

    // エルモタップ
    var $jsElmoArea = $content.find('.jsElmoArea');
    var isElmoAnime = false;
    $jsElmoArea.on(TOUCH_START, $(this), function () {
        var that = this;
        // event.preventDefault();
        if(this.isElmoAnime) {
          return false;
        }
        else {
          this.isElmoAnime = true;
        }
        $(this)
          .addClass('is-tap--anim')
          .one(ANIMATION_END_EVENT, function(event) {
              that.isElmoAnime = false;
              $jsElmoArea.removeClass('is-tap--anim');
          });
        sesami.actionMap.page2.action4 = true;
        sesami.effectPlayer.play(13);
    });

    // バートタップ
    var $jsBertArea = $content.find('.jsBertArea');
    var isBertAnime = false;
    $jsBertArea.on(TOUCH_START, $(this), function () {
        var that = this;
        // event.preventDefault();
        if(this.isBertAnime) {
          return false;
        }
        else {
          this.isBertAnime = true;
        }
        $(this)
          .addClass('is-tap--anim')
          .one(ANIMATION_END_EVENT, function(event) {
              that.isBertAnime = false;
              $jsBertArea.removeClass('is-tap--anim');
          });
        sesami.actionMap.page2.action5 = true;
        sesami.effectPlayer.play(14);
    });

    // オスカー
    var $oscarHand_l = $content.find('.jsOscarHand_l');
    $oscarHand_l.wait(500).removeClass('hidden');

    var $oscarFace = $content.find('.jsOscarFace');
    $oscarFace.wait(1000).removeClass('hidden');

    var $oscarHand_r = $content.find('.jsOscarHand_r');
    $oscarHand_r.wait(1500).removeClass('hidden');

    var $jsOscarFuta = $content.find('.jsOscarFuta');
    $jsOscarFuta.wait(1000).addClass('oscar__futa--stop');

    // 吹き出しのディレイ
    var $jsFkidashiArea = $content.find('.jsFkidashiArea');
    $jsFkidashiArea.wait(2000).removeClass('hidden');

    // オスカータップ
    var $jsOscarArea = $content.find('.jsOscarArea');
    var isOscarAnime = false;
    $jsOscarArea.on(TOUCH_START, $(this), function () {
        var that = this;
        // event.preventDefault();
        if(this.isOscarAnime) {
          return false;
        }
        else {
          this.isOscarAnime = true;
        }
        $(this)
          .addClass('is-tap--anim')
          .one(ANIMATION_END_EVENT, function(event) {
              that.isOscarAnime = false;
              $jsOscarArea.removeClass('is-tap--anim');
          });
        effectPlayer.play(23);
        sesami.actionMap.page2.action6 = true;
    });

    // 吹き出し
    $content.find('.fukidashiTap').on(TOUCH_START, function () {
        $content
          .find('.fukidashi__balloonArea')
          .removeClass('anim')
          .addClass('anim')
          .wait(600)
          .removeClass('anim');
        effectPlayer.play(18);
        sesami.actionMap.page2.action7 = true;
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
