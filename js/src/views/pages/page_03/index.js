// page03
sesami.page03 = {};
sesami.page03.init = function() {
    console.debug('page03 init is called.');

    var
    $page = $('[data-page="3"]'),
    TOUCH_START = sesami.event.TOUCH_START,
    TOUCH_MOVE = sesami.event.TOUCH_MOVE,
    TOUCH_END = sesami.event.TOUCH_END;

    var ANIMATION_EVENT = 'animation oAnimation webkitAnimation';
    var ANIMATION_END_EVENT = 'animationend oAnimationEnd animationend webkitAnimationEnd';

    var
    $ballonArea = $('.jsBallonArea'),
    $ballonCharacter = $ballonArea.find('.jsBallonCharacter'),
    $ballonTap = $('.jsBallonTap'),
    $ballonCharacterCookieMonster = $ballonCharacter.find('.CookieMonster'),
    isBallonAnime = false,
    isFirst = true;

    $ballonCharacterCookieMonster.on(ANIMATION_END_EVENT, function(event) {
      $ballonCharacterCookieMonster.removeClass('animate');
      isBallonAnime = false;
    });

    $ballonTap.on(TOUCH_START, function(event) {
      event.preventDefault();
      if(isBallonAnime) return false;
      isBallonAnime = true;
      $ballonCharacterCookieMonster.addClass('animate');
    });

    $ballonCharacter.one(ANIMATION_END_EVENT,function(){
      if(isBallonAnime) return false;
      if(isFirst) $ballonArea.addClass('start');
      isFirst = false;
      isBallonAnime = true;
      $ballonCharacterCookieMonster.addClass('animate');
    });

    //
    // var
    // $bigbirdArea = $('.jsBigbirdArea'),
    // $bigbirdHand = $bigbirdArea.find('.jsBigbirdHand')
    // $bigbirdArea.on(TOUCH_START, function(event) {
    //   event.preventDefault();
    //   $bigbirdHand.addClass('animate');
    //   $bigbirdHand.one(ANIMATION_END_EVENT, function(event) {
    //     $bigbirdHand.removeClass('animate');
    //   });
    // });

    var
    $eyeArea = $('.jsElmoArea,.jsBigbirdArea,.jsBertArea'),
    $eye = $('.jsEye'),
    isEyeAnime = false;

    $eyeArea.on(TOUCH_START, function(event) {
      event.preventDefault();
      if(isEyeAnime) return false;
      isEyeAnime = true;
      $eye.addClass('kottiminna');
      $page.addClass('noAnimate');
      var remove = function(){
        $eye.removeClass('kottiminna');
        $page.removeClass('noAnimate');
        isEyeAnime = false;
      }
      setTimeout(remove,2000);
    });

    var
    $oscarArea = $('.jsOscarArea'),
    isOscarAnime = false;
    $oscarArea.on(TOUCH_START, function(event) {
      event.preventDefault();
      if(isOscarAnime) return false;
      isOscarAnime = true;
      $oscarArea.find('.jsOscar1').hide().end()
                .find('.jsOscar2').show();
      setTimeout(oscarSecoundFunc,1000);
    });

    var oscarSecoundFunc = function(){
      $oscarArea.find('.jsOscar2').addClass('secound');
      $oscarArea.find('.jsOscar2').one(TOUCH_START, function(event) {
        $(this).removeClass('secound');
        setTimeout(function(){
          $oscarArea.find('.jsOscar1').show().end()
                    .find('.jsOscar2').hide();
          isOscarAnime = false;
        },1000);
      });
    }



};


//
// 後処理
//
sesami.page03.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page03 dealloc is called.');
};
