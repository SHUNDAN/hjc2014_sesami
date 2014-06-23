//
// ページングを行う機能
//
;(function () {

    var
        MIN_PAGE = 0,
        MAX_PAGE = $('.pageTemplate').length - 1, // 0ページから始めるので -1 する
        $pageContainer = $('#page'),
        $nextBtn = $('#nextPageBtn');

    if (sesami.isIEold || sesami.isAndroid2X) {
        MAX_PAGE -= 1; // createへの導線を外す.
    }


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
        // SVGが再生できない端末は、PNGへフォールバックを行う
        if (sesami.isAndroid2X || sesami.isIEold) {
            snipet = snipet.replace(/.svg/g, '.png');
        }
        return snipet;
    };
    var showPageAt = function (nextPageNo, currentPageNo) {

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

        // 仮.
        // var bgmType = Math.abs(nextPageNo % 4) + 1;
        // sesami.bgmSound.play(bgmType);

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
        $nextBtn.css('opacity', 0)
        setTimeout(function () {
            $nextBtn.animate({opacity: 1}, 500);
        }, delayTime);

        // BGM再生
        sesami.bgmPlayer.playBGMAt(nextPageNo);

    };
    var preloadPage = function (pageNo) {
        setTimeout(function () {
            console.debug('[preloadPage]', pageNo);
            var snipet = $('#template_page_' + get2DigitPageNo(pageNo)).html();
            $(snipet);
        }, 1000);
    };

    var nextBtnDelayTime = function (pageNo) {
        switch (pageNo) {
            case 0:
                return 3000;
            case 3:
                return 2000;
            case 6:
            case 7:
                return 2500;
            case 9:
                return 100;
            default:
                return 1500;
        }
    }



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
    $('#nextPageBtn').on(sesami.event.TOUCH_END, function () {

        var nextPage = sesami.currentPage + 1;
        if (nextPage > MAX_PAGE) {
            nextPage = 0;
        }

        showPageAt(nextPage, sesami.currentPage);
        sesami.currentPage = nextPage;

    });




    // 前ページへ
    $('#prevPageBtn').on(sesami.event.TOUCH_END, function () {

        var prevPage = sesami.currentPage - 1;
        if (prevPage < MIN_PAGE) {
            prevPage = MAX_PAGE;
        }

        showPageAt(prevPage, sesami.currentPage);
        sesami.currentPage = prevPage;
    });








    // 初期ページの制御
    // onloadにするかは微妙.
    // window.addEventListener('load', function () {
    //     console.debug('onload paging fired');
    //     showPageAt(sesami.currentPage);
    // });
    $(function () {
        console.debug('onload paging fired');
        showPageAt(sesami.currentPage);
    });


    // SVGからPNGへのフォールバック
    if (sesami.isAndroid2X || sesami.isIEold) {
        var src = $('.book').attr('src').replace('.svg', '.png');
        $('.book').attr('src', src);
        var src = $('#nextPageBtn').attr('src').replace('.svg', '.png');
        $('#nextPageBtn').attr('src', src);
    }






})();