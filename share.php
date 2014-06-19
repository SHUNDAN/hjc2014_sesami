<?php
    // テスト用URL
    // http://localhost:8082/share.php?key=66aa0c6c91b3d54526638b43418de11a4404a6c0

    if (empty($_GET['key'])) {
        header("Location: notfound.html");
        exit;
    }

    $key = $_GET['key'];
    $imgPath = './tmpbox/' . substr($key, 0, 2) . '/' . substr($key, 2);
    $shareUrl = 'http://yoheim.net/app/sesami-book/share?key=' . $key;
?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>笑って!クッキーモンスター! | HTML5 Japan Cup 2014</title>
    <link rel="stylesheet" href="./css/create.css?_=2">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta property="og:title" content="「笑って!クッキーモンスター!」を読んでオリジナル写真を作ったよ!" />
    <meta property="og:type" content="article" />
    <meta property="og:description" content="触って楽しい『笑って!クッキーモンスター!』絵本を読めるよ!さらにオリジナル写真も作れるよ!" />
    <meta property="og:url" content="<?php echo $shareUrl ?>" />
    <meta property="og:image" content="<?php echo $imgPath?>" />
    <meta property="og:site_name" content="笑って!クッキーモンスター! | HTML5 Japan Cup 2014" />
    <meta property="og:locale" content="jp" />
    <meta property="fb:admins" content="yohei.munesada" />
    <meta property="fb:app_id" content="231193763645613" />

</head>
<body>


<h1 style="margin-top:10px;">セサミの絵本へようこそ！</h1>
<div class="taCenter">「わらって!クッキーモンスター!」を読んで、こんな写真を作ったよ♪</div>
<img src="<?php echo $imgPath?>" alt="オリジナル写真" class="shareImage"/>


<h2 class="mt40">「わらって!クッキーモンスター!」は触って楽しいオンライン絵本だよ！</h2>
<div class="description taCenter mt5">
    クッキーを落として泣いているクッキーモンスター。さぁみんなでクッキーを作って、クッキーモンスターの笑顔を取り戻そう！<br>
    この絵本は触って楽しい絵本です。触ると何が起こるかな〜。絵本の色々な場所を触ってみてください！
</div>
<a href="./">
    <img src="./img/share/book_sample.png" alt="「笑って!クッキーモンスター!」にようこそ" class="bookCover"/>
</a>
<br>
<br>
<br>

<a href="./" class="linkToBook pb20">さっそく読む！</a>





<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<script type="text/javascript" src="./js/libs/all-libs.js?_=4"></script>
<script type="text/javascript" src="./js/create.js?_=4"></script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-51582016-1', 'yoheim.net');
  ga('send', 'pageview');
</script>

</body>
</html>






















