//
// グローバル変数とか定義するやつ
//
// なんかファイル名をいい感じにしたい
(function () {

// ie対応
if (!console.debug) {
    console.debug = console.log;
}



// namespace.
var sesami = window.sesami = window.sesami || {};



// TAPイベント.
var hasTapEvent = ('ontouchstart' in window); // chrome36から必ずtrueになるぞ・・・
sesami.event = {};
sesami.event.TOUCH_START = (hasTapEvent ? 'touchstart' : 'mousedown');
sesami.event.TOUCH_MOVE = (hasTapEvent ? 'touchmove' : 'mousemove');
sesami.event.TOUCH_END = (hasTapEvent ? 'touchend' : 'mouseup');
// sesami.event.TOUCH_START = 'touchstart mousedown';
// sesami.event.TOUCH_MOVE = 'touchmove mousemove';
// sesami.event.TOUCH_END = 'touchend mouseup';


// UserAgent
var userAgent = navigator.userAgent.toLowerCase();
console.debug('[userAgent]', userAgent);
sesami.isIphone = userAgent.indexOf('iphone') + 1;
sesami.isIphone7_1 = sesami.isIphone && userAgent.indexOf('os 7_1') !== -1;
sesami.isIpad = userAgent.indexOf('ipad') + 1;
sesami.isAndroid = userAgent.indexOf('android') + 1;
sesami.isAndroid2X = userAgent.indexOf('android 2.') + 1;
sesami.isIE7 = userAgent.indexOf('msie 7.0') + 1;
sesami.isIE8 = userAgent.indexOf('msie 8.0') + 1;
sesami.isIEold = sesami.isIE7 || sesami.isIE8;



// iPhoneとAndroidではスクロールを禁止する.
if (window.disableBodyScroll) {
    if (sesami.isIphone || sesami.isAndroid || sesami.isIpad) {
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault();
        })
    }    
}

// iOS7.1用にminimal-uiを付けているので、iOS7.1の場合はそれのバグ回避のため、高さを140%くらいにする。
if (sesami.isIphone7_1) {
    $('#container').addClass('iphone7_1');
}

// Androidの場合には、ヘッダスキップ
if (sesami.isAndroid) {
    $('#container').addClass('android');
    window.scrollTo = 1;
}


// デバイス情報をクラスで表現する
if (sesami.isIphone) {
    $(document.body).addClass('iPhone sp');
}
if (sesami.isIpad) {
    $(document.body).addClass('iPad');
}
if (sesami.isAndroid) {
    $(document.body).addClass('android sp');
}













})();