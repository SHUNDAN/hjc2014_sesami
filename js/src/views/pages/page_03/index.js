// page03
;(function(){

    var
    $page = $('[data-page="3"]'),
    TOUCH_START = sesami.event.TOUCH_START,
    TOUCH_MOVE = sesami.event.TOUCH_MOVE,
    TOUCH_END = sesami.event.TOUCH_END;

    var ANIMATION_END_EVENT = 'animationend oAnimationEnd animationend webkitAnimationEnd';

    var
    $ballonCharacter = $('.jsBallonCharacter'),
    $ballonTap = $('.jsBallonTap'),
    $ballonCharacterCookieMonster = $ballonCharacter.find('.CookieMonster')
    isBallonAnime = false;

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
      isBallonAnime = true;
      $ballonCharacterCookieMonster.addClass('animate');
    });

})();