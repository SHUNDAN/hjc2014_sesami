//
// ページングを行う機能
//
;(function () {


    // Private Functions.
    //-------------------------------------
    var showPageAt = function (nextPageNo, currentPageNo) {

        $('[data-page]').addClass('hidden');
        $('[data-page="' + nextPageNo + '"]').removeClass('hidden');
        location.hash = "page=" + nextPageNo;

        // 仮.
        // var bgmType = Math.abs(nextPageNo % 4) + 1;
        // sesami.bgmSound.play(bgmType);

        // Init, Dealloc.
        var pageObject = sesami['page0' + currentPageNo];
        pageObject &&  pageObject.dealloc && pageObject.dealloc();
        var pageObject = sesami['page0' + nextPageNo];
        pageObject && pageObject.init && pageObject.init();

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
    $('#nextPageBtn').on('click', function () {

        var currentPage = sesami.currentPage;

        var content = $('[data-page="' + (sesami.currentPage+1) + '"]');
        if (content.length === 0) {
            content = $('[data-page="0"]');
            sesami.currentPage = -1;
        }
        sesami.currentPage++;

        showPageAt(sesami.currentPage, currentPage);
    });




    // 前ページへ
    $('#prevPageBtn').on('click', function () {

        var currentPage = sesami.currentPage;

        var content = $('[data-page="' + (sesami.currentPage-1) + '"]');
        if (content.length === 0) {
            content = $('[data-page="8"]'); // 決め打ち
            sesami.currentPage = 9;
        }
        sesami.currentPage--;

        showPageAt(sesami.currentPage, currentPage);
    });









    // 初期ページの制御
    $(function () {
        showPageAt(sesami.currentPage);
    });






})();