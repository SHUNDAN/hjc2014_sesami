//
// オリジナル写真作成 & Facebook共有ページ
//
(function () {


    // **** 仮実装です
    // ファイルアップをして、後続のサーバーへの保存、Facebook連携の実装を行うために、
    // とりあえずファイルをアップできるようにしています.
    var fileInput = document.querySelector('input[type="file"]');
    fileInput.onchange = function(e) {
        console.debug('e:', e, fileInput);
        var file = fileInput.files[0];
        var fr = new FileReader();
        fr.onload = function () {
            var img = document.createElement('img');
            img.width = 200;
            img.src = this.result;
            $('#previewArea').empty().append(img);
        };
        fr.readAsDataURL(file);
    };



    // 「はい」ボタンを押した時の挙動です
    $('#yesBtn').on('click', function () {
        // xhr2を用いて、ファイルアップロードします。IE9は対象外です.


        // 制作した画像を取得します（仮です）
        var img = document.querySelector('#previewArea img');
        if (!img) {
            alert('画像がないから駄目です');
            return;
        }

        // 子供の名前を取得します（仮です）
        var childName = 'かほ';

        // 現在日付を取得します（仮です）
        var now = new Date();
        var dateString = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();

        // debug
        console.debug('[yesbtn]', img, childName, dateString);

        // base64で送信.（仮です）
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);
        var base64 = canvas.toDataURL();
        console.debug('base64', base64);

        // 送信内容を作成します
        // サーバー側で以下のキーを使いますので、ここは変えない.
        var formData = new FormData();
        formData.append('childName', childName);
        formData.append('date', dateString);
        formData.append('base64', base64);  // 最終的にはPNGデータでアップしてください.


        // 送ります.
        var xhr = new XMLHttpRequest();
        xhr.open('POST', './api/create'); // TODO Apache設定にて、修飾子は出さない対応
        xhr.onload = function () {
            if (this.status === 200) {
                var uniqueKey = this.responseText;
                // TODO このキーを使って、ユニークなURLを作成します.
                console.debug('key=', uniqueKey);

            }
        }
        xhr.send(formData);

    });


























})();