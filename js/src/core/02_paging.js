//
// ページングを行う機能
//
;(function () {

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

        var content = $('[data-page="' + (sesami.currentPage+1) + '"]');
        if (content.length === 0) {
            alert('最終ページです');
        } else {
            sesami.currentPage++;
            $('[data-page]').addClass('hidden');
            $('[data-page="' + sesami.currentPage + '"]').removeClass('hidden');
            location.hash = "page=" + sesami.currentPage;

            // 仮.
            var bgmType = Math.abs(sesami.currentPage % 4) + 1;
            sesami.bgmSound.play(bgmType);
        }
    });




    // 前ページへ
    $('#prevPageBtn').on('click', function () {

        var content = $('[data-page="' + (sesami.currentPage-1) + '"]');
        if (content.length === 0) {
            alert('最初のページです');
        } else {
            sesami.currentPage--;
            $('[data-page]').addClass('hidden');
            $('[data-page="' + sesami.currentPage + '"]').removeClass('hidden');
            location.hash = "page=" + sesami.currentPage;

            // 仮.
            var bgmType = Math.abs(sesami.currentPage % 4) + 1;
            sesami.bgmSound.play(bgmType);

        }
    });









    // 初期ページの制御
    var currentPage = sesami.currentPage;
    $('[data-page]').addClass('hidden');
    $('[data-page="' + currentPage + '"]').removeClass('hidden');



})();