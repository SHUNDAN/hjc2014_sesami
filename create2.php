<?php
    // テスト用URL
    // http://localhost:8082/create2.php?key=66aa0c6c91b3d54526638b43418de11a4404a6c0

    if (empty($_GET['key'])) {
        header("Location: notfound.html");
        exit;
    }

    $key = $_GET['key'];
    $imgPath = './tmpbox/' . substr($key, 0, 2) . '/' . substr($key, 2);
    $shareUrl = 'http://yoheim.net/app/sesami-book/share.php?key=' . $key;

    $agent = strtolower($_SERVER['HTTP_USER_AGENT']);
    $isSmartPhone = preg_match("/iphone/",$agent) || preg_match("/android/",$agent);
?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>写真作成 | セサミBook</title>
    <link rel="stylesheet" href="./css/create.css">

    <meta property="og:title" content="笑って!クッキーモンスターを読んでオリジナル写真を作ったよ!" />
    <meta property="og:type" content="article" />
    <meta property="og:description" content="触って楽しい『笑って!クッキーモンスター』絵本を読めるよ!さらにオリジナル写真も作れるよ!" />
    <meta property="og:url" content="<?php echo $shareUrl ?>" />
    <meta property="og:image" content="<?php echo $imgPath?>" />
    <meta property="og:site_name" content="笑って!クッキーモンスター! | HTML5 Japan Cup 2014" />
    <meta property="og:locale" content="jp" />
    <meta property="fb:admins" content="yohei.munesada" />
    <meta property="fb:app_id" content="231193763645613" />

</head>
<body>

    <!--完了ページ-->
    <div class="page" data-page="6">
        <h1>写真ができたよ!!</h1>
        <img src="<?php echo $imgPath?>" alt="オリジナル写真" style="max-width:100%;"/>
        <a href="http://www.facebook.com/share.php?u=<?php echo $shareUrl ?>" class="button fb" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">Facebookでシェア</a>
        <!-- <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-type="button"></div> -->
        <p class="notice">
            <?php if ($isSmartPhone) {?>
            ※ 画像を長押しすることでダウンロードすることができます。
            <?php } else { ?>
            ※ 画像を右クリックしてダウンロードすることができます。
            <?php } ?>
        </p>
    </div>



    
</body>
</html>