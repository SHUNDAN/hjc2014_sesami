//
// ページサイズを設定するJavaScript.
// 初期表示時のページサイズの指定の他、Window.resizeのタイミングで、サイズの変更を行います。
//
;(function () {

    var isFirstTime = true;
    var adjustSize = function () {

        var
            wh = window.innerHeight,
            ww = window.innerWidth,
            isLandScape = (wh <= ww),

            // 縦対応は後で.
            // MAX_WIDTH = (isLandScape ? 1400 : 1000), // book.svgのサイズ
            // MAX_HEIGHT = (isLandScape ? 1000 : 1400), // book.svgのサイズ
            MAX_WIDTH = 1400 * 5, // book.svgの縮尺
            MAX_HEIGHT = 1000 * 5, // book.svgの縮尺
            PAGE_SIZE_RAITO = MAX_WIDTH / MAX_HEIGHT,
            min = Math.min,
            floor = Math.floor,
            wRaito = ww / wh,
            ch = undefined,
            cw = undefined;

            if (wRaito > PAGE_SIZE_RAITO) {
                ch = min(wh, MAX_HEIGHT);
                cw = floor(ch * PAGE_SIZE_RAITO);
            } else {
                cw = min(ww, MAX_WIDTH);
                ch = floor(cw / PAGE_SIZE_RAITO);
            }

            console.debug('[adjustSize]', ch, cw);

            $('#page').css({
                'width': cw,
                'height': ch
            });

            // 縦判定
            if (isLandScape) {
                $('body').removeClass('portrait');
                $('body').addClass('landscape');
            } else {
                $('body').addClass('portrait');
                $('body').removeClass('landscape');
            }

            // フォントサイズ
            var fontSize = Math.floor(15 * ww / 815);
            console.debug('fontSize:', fontSize);
            $(document.body).css('font-size', fontSize + 'px');

            // iPadで時々画像が抜けるので、再描画を促す.
            $('#pageRefresher').wait(200).removeClass('hidden').wait(50).addClass('hidden');


            // iOS7.1で横向きで画面をロードした場合に、minimal-ui対策があだになるので、さらに対策w
            if (isFirstTime && isLandScape) {
                $('body').addClass('first');
            } else {
                $('body').removeClass('first');
            }
            isFirstTime = false;
    };
    window.onresize = adjustSize;
    adjustSize();

})();