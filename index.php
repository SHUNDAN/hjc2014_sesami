<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>セサミストリート絵本</title>
    <link rel="stylesheet" href="./css/all.css">
    <meta name="viewport" content="width=640, minimal-ui">
</head>
<body>

<div id="page" class="page">
    <?php  include "template.html" ?>
</div>



<!--とりあえずの実装です-->
<div id="nextPageBtn" style="width:100px; height:100px; background-color:blue; position:absolute; bottom:10px; right:10px; color:white;">
    次ページへ<br>ボタン(仮)
</div>
<div id="prevPageBtn" style="width:100px; height:100px; background-color:green; position:absolute; bottom:10px; left:10px; color:white;">
    前ページへ<br>ボタン(仮)
</div>

<script type="text/javascript" src="./js/libs/all-libs.js"></script>
<script type="text/javascript" src="./js/all.js"></script>



<!--以下JSは、ページングの仮実装です.-->
<script>
(function () {

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

})();


// 初期表示のページを出す.
(function () {

    var currentPage = sesami.currentPage;
    $('[data-page]').addClass('hidden');
    $('[data-page="' + currentPage + '"]').removeClass('hidden');

})();




// ページングボタンを押したら、次/前ページへ行きます.
(function () {

    $('#nextPageBtn').on('click', function () {

        var content = $('[data-page="' + (sesami.currentPage+1) + '"]');
        if (content.length === 0) {
            alert('最終ページです');
        } else {
            sesami.currentPage++;
            $('[data-page]').addClass('hidden');
            $('[data-page="' + sesami.currentPage + '"]').removeClass('hidden');
            location.hash = "page=" + sesami.currentPage;
        }
    });



    $('#prevPageBtn').on('click', function () {

        var content = $('[data-page="' + (sesami.currentPage-1) + '"]');
        if (content.length === 0) {
            alert('最初のページです');
        } else {
            sesami.currentPage--;
            $('[data-page]').addClass('hidden');
            $('[data-page="' + sesami.currentPage + '"]').removeClass('hidden');
            location.hash = "page=" + sesami.currentPage;
        }
    });

})();







</script>




</body>
</html>
