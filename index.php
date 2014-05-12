<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>セサミストリート絵本</title>
    <link rel="stylesheet" href="./css/all.css">
</head>
<body>

<div id="page" class="page">
    <?php  include "index.html" ?>
</div>



<!--とりあえずの実装です-->
<div id="nextPageBtn" style="width:100px; height:100px; background-color:blue; position:absolute; bottom:10px; right:10px; color:white;">
    次ページへ<br>ボタン(仮)
</div>
<script>
(function () {
    var currentPage = 0;

    document.querySelector('#nextPageBtn').onclick = function () {
        alert('次のページへ進みます');
    };
})();
</script>

<script type="text/javascript" src="./js/all.js"></script>

</body>
</html>
