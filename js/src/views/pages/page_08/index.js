// page08
sesami.page08 = {};
sesami.page08.init = function () {
    console.debug('page08 init is called.');

    var
        $page = $('[data-page="8"]'),
        TOUCH_START = sesami.event.TOUCH_START,
        TOUCH_MOVE = sesami.event.TOUCH_MOVE,
        TOUCH_END = sesami.event.TOUCH_END,
        CookieManager = sesami.CookieManager,
        floor = Math.floor;


    // Cookieのランダム配置
    var $cookies = $page.find('.jsCookie');
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
        $cookie.attr('src', './img/cookie/cookie2-'+type+'.png');
    }


};


sesami.page08.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page08 dealloc is called.');
};
