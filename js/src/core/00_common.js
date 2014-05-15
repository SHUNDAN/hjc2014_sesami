//
// グローバル変数とか定義するやつ
//
// なんかファイル名をいい感じにしたい
(function () {


// namespace.
var sesami = window.sesami = window.sesami || {};



// TAPイベント.
var hasTapEvent = ('ontouchstart' in window);
sesami.event = {};
sesami.event.TOUCH_START = (hasTapEvent ? 'touchstart' : 'mousedown');
sesami.event.TOUCH_MOVE = (hasTapEvent ? 'touchmove' : 'mousemove');
sesami.event.TOUCH_END = (hasTapEvent ? 'touchend' : 'mouseup');










})();