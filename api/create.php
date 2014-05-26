<?php
//
// 画像アップなどAPI
//

// check method
if($_SERVER["REQUEST_METHOD"] != "POST") {
    header("HTTP/1.1 405 Method Not Allowed");
    return;
}

// パラメータチェック
if (empty($_POST["childName"])) {
    header("HTTP/1.1 400 Bad Request");
    return;    
}
if (empty($_POST["date"])) {
    header("HTTP/1.1 400 Bad Request");
    return;    
}
if (empty($_POST["base64"])) {
    header("HTTP/1.1 400 Bad Request");
    return;    
}

// パラメータ受け取り
$childName = $_POST["childName"];
$dateString = $_POST["date"];
$base64 = $_POST["base64"];


// ランダム文字列
$key = sha1(uniqid(mt_rand(), true));


// 画像の保存先.
$dir = substr($key, 0, 2);
$fileName = substr($key, 2);
$tmpDir = '../tmpbox/' . $dir;
$imgPath = $tmpDir . '/' . $fileName . '.png';
if (file_exists($dir) && is_dir($dir)) {
    // Directoryあり
} else {
    mkdir($tmpDir);
}



// 画像の保存
$base64 = str_replace("data:image/png;base64,", "", $base64);
$img = base64_decode($base64);
file_put_contents($imgPath, $img);


// 一意のキーを返却
echo $key;













?>