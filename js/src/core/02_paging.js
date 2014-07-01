//
// ページングを行う機能
//
;(function () {

    var
        MIN_PAGE = 0,
        MAX_PAGE = $('.pageTemplate').length - 1, // 0ページから始めるので -1 する
        $pageContainer = $('#page'),
        $nextBtn = $('#nextPageBtn');


    // Private Functions.
    //-------------------------------------
    var get2DigitPageNo = function (pageNo) {
        if (pageNo >= 10) {
            return pageNo;
        } else {
            return '0' + pageNo;
        }
    };
    var getPageSnipet = function (pageNo) {
        var snipet = $('#template_page_' + get2DigitPageNo(pageNo)).html();
        // 画像のキャッシュバスタを付ける
        snipet = snipet.replace(/src="(.*?).svg"/g, 'src="$1.svg?_=' + window.appVersion + '"');
        snipet = snipet.replace(/src="(.*?).png"/g, 'src="$1.png?_=' + window.appVersion + '"');
        // SVGが再生できない端末は、PNGへフォールバックを行う
        if (sesami.isAndroid2X || sesami.isIEold) {
            snipet = snipet.replace(/.svg/g, '.png');
        }
        return snipet;
    };
    var nextBtnDelayTimer = null;
    var showPageAt = function (nextPageNo, currentPageNo, useSound) {

        if (nextBtnDelayTimer) {
            clearTimeout(nextBtnDelayTimer);
        }

        // 現在のページ
        var $currentPage = $('#container').find('[data-page="' + currentPageNo + '"]');

        // 次のページ
        var snipet = getPageSnipet(nextPageNo);
        var $nextPage = $(snipet).removeClass('hidden');

        // 現在のページは閉じる
        $currentPage.remove();

        // 次のページを表示する
        $pageContainer.append($nextPage);

        // ハッシュを変えておいて・・・
        location.hash = "page=" + nextPageNo;            

        // ページ番号の修正
        $('#pageNum').text(nextPageNo);

        // 初期化と廃棄.
        var pageObject = sesami['page0' + currentPageNo];
        pageObject &&  pageObject.dealloc && pageObject.dealloc();
        var pageObject = sesami['page0' + nextPageNo];
        pageObject && pageObject.init && pageObject.init();


        // さらに次をプリロード
        var nextNext = nextPageNo + 1;
        if (nextNext > MAX_PAGE) {
            nextNext = 0;
        }
        preloadPage(nextNext);

        // 次へボタンは少しだけ遅れて表示
        var delayTime = nextBtnDelayTime(nextPageNo);
        $nextBtn.css('opacity', 0).addClass('noAction');
        nextBtnDelayTimer = setTimeout(function () {
            nextBtnDelayTimer = null;
            $nextBtn.animate({opacity: 1}, 500).removeClass('noAction');
        }, delayTime);


        if (useSound !== false) {
            // BGM再生
            sesami.bgmPlayer.playBGMAt(nextPageNo);
            // ボタンの効果音
            sesami.effectPlayer.play(5);            
        }

        // 連続タップしやすいので、2秒だけ使えない苦する
        $nextBtn.addClass('noAction');//.wait(2000).removeClass('noAction');

        // iPadでは時々図が抜けるので、再描画を促す
        $('#pageRefresher').wait(200).removeClass('hidden').wait(50).addClass('hidden');

    };
    var preloadPage = function (pageNo) {
        setTimeout(function () {
            console.debug('[preloadPage]', pageNo);
            var snipet = getPageSnipet(pageNo);
            var srcs = snipet.match(/src="(.*?[.svg|.png].*?)"/g) || [];

            sesami.preloaded = false;
            var total = srcs.length;
            if (total === 0) {
                sesami.preloaded = true;
            }
            var done = 0;
            for (var i = 0; i < srcs.length; i++) {
                var src = srcs[i].replace('src="', '').replace('"', '');
                var img = new Image();
                img.src = src;
                img.onload = function () {
                    done++;
                    console.debug('[preload]', this.src, done, total);
                    if (done === total) {
                        sesami.preloaded = true;
                    }
                };
            }
        }, 1000);
    };

    var nextBtnDelayTime = function (pageNo) {
        if (sesami.isIEold || sesami.isIE9) {
            return 100;
        }
        switch (pageNo) {
            case 0:
                return 3000;
            case 2:
                return 4500;
            case 3:
                return 2000;
            case 4:
            case 5:
            case 6:
                return 30000; // animation内で表示する.
            case 7:
                return 5000;
            case 9:
                return 100;
            default:
                return 1500;
        }
    };



    // 現在ページの設定を行います。
    sesami.currentPage = 0;

    var hash = location.hash;
    if (hash) {
        hash = hash.replace('#', '');
        var datas = hash.split('&');
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i].split('=');
            var key = data[0];
            var value = data[1];
            if (key === 'page') {
                sesami.currentPage = parseInt(value);
            }
        }
    }





    // 次ページへ
    sesami.goNextPage = function () {

        var nextPage = sesami.currentPage + 1;
        if (nextPage > MAX_PAGE) {
            nextPage = 0;
        }

        console.debug('[goNextPage]', sesami.currentPage, nextPage, MAX_PAGE);

        showPageAt(nextPage, sesami.currentPage);
        sesami.currentPage = nextPage;

    };
    $('#nextPageBtn').on(sesami.event.TOUCH_END, sesami.goNextPage);




    // 前ページへ
    // $('#prevPageBtn').on(sesami.event.TOUCH_END, function () {

    //     var prevPage = sesami.currentPage - 1;
    //     if (prevPage < MIN_PAGE) {
    //         prevPage = MAX_PAGE;
    //     }

    //     showPageAt(prevPage, sesami.currentPage);
    //     sesami.currentPage = prevPage;
    // });








    // 初期ページの制御
    // onloadにするかは微妙.
    // window.addEventListener('load', function () {
    //     console.debug('onload paging fired');
    //     showPageAt(sesami.currentPage);
    // });
    $(function () {
        console.debug('onload paging fired');
        var useSound = (!sesami.isIphone && !sesami.isAndroid && !sesami.isIpad);
        showPageAt(sesami.currentPage, false, useSound);
    });


    // SVGからPNGへのフォールバック
    if (sesami.isAndroid2X || sesami.isIEold || sesami.isAndroid) {
        // 本
        var src = $('.book').attr('src').replace('.svg', '.png');
        $('.book').attr('src', src);
        // 次へボタン
        var src = $('#nextPageBtn').attr('src').replace('.svg', '.png');
        $('#nextPageBtn').attr('src', src);
        // 確認ダイアログ
        var src = $('#confirmImage').attr('src').replace('.svg', '.png');
        $('#confirmImage').attr('src', src);        
    }






})();