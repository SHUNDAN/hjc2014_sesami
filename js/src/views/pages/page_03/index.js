// page03
;(function(){

    var
    $page = $('[data-page="3"]'),
    TOUCH_START = sesami.event.TOUCH_START,
    TOUCH_MOVE = sesami.event.TOUCH_MOVE,
    TOUCH_END = sesami.event.TOUCH_END;

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
    $elmoArea = $('.jsElmoArea'),
    $eye = $('.jsEye'),
    isEyeAnime = false;

    $elmoArea.on(TOUCH_START, function(event) {
      event.preventDefault();
      if(isEyeAnime) return false;
      isEyeAnime = true;
      $eye.addClass('kottiminna');
      var remove = function(){
        $eye.removeClass('kottiminna');
        isEyeAnime = false;
      }
      setTimeout(remove,4000);
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

})();