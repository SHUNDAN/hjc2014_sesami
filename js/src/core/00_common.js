//
// グローバル変数とか定義するやつ
//
// なんかファイル名をいい感じにしたい
(function () {


// namespace.
var sesami = window.sesami = window.sesami || {};



// TAPイベント.
var hasTapEvent = ('ontouchstart' in window); // chrome36から必ずtrueになるぞ・・・
sesami.event = {};
// sesami.event.TOUCH_START = (hasTapEvent ? 'touchstart' : 'mousedown');
// sesami.event.TOUCH_MOVE = (hasTapEvent ? 'touchmove' : 'mousemove');
// sesami.event.TOUCH_END = (hasTapEvent ? 'touchend' : 'mouseup');
sesami.event.TOUCH_START = 'touchstart mousedown';
sesami.event.TOUCH_MOVE = 'touchmove mousemove';
sesami.event.TOUCH_END = 'touchend mouseup';


// UserAgent
var userAgent = navigator.userAgent.toLowerCase();
console.debug('[userAgent]', userAgent);
sesami.isIphone = userAgent.indexOf('iphone') + 1;
sesami.isIphone7_1 = sesami.isIphone && userAgent.indexOf('os 7_1') !== -1;
sesami.isAndroid = userAgent.indexOf('android') + 1;



// iPhoneとAndroidではスクロールを禁止する.
if (sesami.isIphone || sesami.isAndroid) {
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    })
}

// iOS7.1用にminimal-uiを付けているので、iOS7.1の場合はそれのバグ回避のため、高さを140%くらいにする。
if (sesami.isIphone7_1) {
    $('#container').addClass('iphone7_1');
}


})();