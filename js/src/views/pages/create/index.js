//
//
// 写真の合成機能を実装する
// create

// オリジナル写真作成 & Facebook共有ページ
//


// Private Functions
//-------------------------------------------
var getCurrentPageNo = function (element) {
  return $(element).parents('[data-page]').data('page');
}
var goPage = function (pageNo) {
    $('[data-page]').addClass('hidden');
    $('[data-page="' + pageNo + '"]').removeClass('hidden');
};







// ボタンアクションの定義
//-------------------------------------------
$('.jsNextPage').on('click', function () {
    var currentPage = getCurrentPageNo(this);
    goPage(currentPage + 1);
    $(window).scrollTop(0);
});
$('.jsPrevPage').on('click', function () {
    var currentPage = getCurrentPageNo(this);
    goPage(currentPage - 1);
    $(window).scrollTop(0);
});


// 仮です（ファイルアップロードするところ）
var tmp = {};
$('.jsFileSelect').on('change', function (e) {

  var file;
  //Drop || file
  if(e.originalEvent.dataTransfer){
    file = e.originalEvent.dataTransfer.files[0];
  }else{
    file = $(this)[0].files[0];
  }

  //not image
  if(!(file.type == 'image/jpeg' || file.type == 'image/png')){
    console.log('画像じゃないよ');
    return false;
  }

  var fileReader = new FileReader();

  fileReader.onloadend = function(e){
      tmp.uploadFileUrl = e.target.result;
      goPage(3);


      // 画像をページにプレビュー表示する
      var image = new Image();
      image.src = tmp.uploadFileUrl;
      image.onload = function () {

          // 写真の中央表示の調整
          var w = this.width;
          var h = this.height;
          if (w < h) { // 縦長
              this.width = 300;
              var h = (h / w) * 300 - 300;
              this.style.marginTop = h/2 * -1 + 'px';
          } else { // 横長
              this.height = 300;
              var w = (w / h) * 300 - 300;
              this.style.marginLeft = w/2 * -1 + 'px';
          }

          // DOMにアペンド
          $('.jsUploadPhoto').empty().append(this);
      }


  };
  fileReader.readAsDataURL(file);

});



// フレーム選択
$('.jsFrameSelect img').on('click', function () {

    var $figure = $('.jsUploadPhoto');
    var frame = $(this)[0].cloneNode(true);
    frame.className = 'frame';
    $figure.find('.frame').remove();
    $figure.append(frame);
});



// 確認画面へ
$('.jsGotoConfirmPage').on('click', function () {

    // 選択されたフレームとユーザー画像を取得する.
    var $frameImage;
    var $userImage;
    var $images = $('.jsUploadPhoto img');
    $.each($images, function (index) {
        var $img = $($images[index]);
        if ($img.hasClass('frame')) {
            var img = $img[0].cloneNode();
            $frameImage = $(img);
        } else {          
            var img = $img[0].cloneNode();
            $userImage = $(img);
        }
    });

    // 表示
    $('.jsUploadPhoto2').append($frameImage).append($userImage);


    // 次のページへ
    goPage(5);

});


// やり直す
$('.jsRest').on('click', function () {
    goPage(1);
});

// アップロード
$('.jsUpload').on('click', function () {


        // 制作した画像を取得します（仮です）
        var $frameImage;
        var $userImage;
        var $images = $('.jsUploadPhoto img');
        $.each($images, function (index) {
            var $img = $($images[index]);
            if ($img.hasClass('frame')) {
                var img = $img[0].cloneNode();
                $frameImage = $(img);
            } else {          
                var img = $img[0].cloneNode();
                $userImage = $(img);
            }
        });
        img = $userImage[0];




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
        xhr.open('POST', './api/create.php'); // TODO Apache設定にて、修飾子は出さない対応
        xhr.onload = function () {
            if (this.status === 200) {
                var uniqueKey = this.responseText;


                // FacebookシェアボタンをJSから動的には生成できないので、
                // PHPでの出力を行う.
                var url = './create2.php?key=' + uniqueKey;
                location.href = url;



                // var url1 = './share?key=' + uniqueKey;
                // var url2 = 'http://yoheim.net/app/sesami-book/share?key=' + uniqueKey;


                // // 仮。本当は合成画像を表示してください。
                // $('.jsUploadPhoto3').append($frameImage).append($userImage);

                // $('.jsFacebookShare').attr('href', url2);


                // goPage(6);



                // // TODO このキーを使って、ユニークなURLを作成します.
                // console.debug('key=', uniqueKey);

                // var url1 = './share?key=' + uniqueKey;
                // var url2 = 'http://yoheim.net/app/sesami-book/share?key=' + uniqueKey;
                // var a = document.createElement('a');
                // a.href = url1;
                // a.innerHTML = url2;

                // var $div = document.querySelector('#result');
                // $div.innerHTML = '<p>画面ができたよ！以下の画面をFacebookでシェアしよう！</p>';
                // $div.innerHTML += '<input type="button" value="Facebookでシェアする(未実装ボタン)"/><br>';
                // $div.appendChild(a);

                // var iframe = document.createElement('iframe');
                // iframe.src = url1;
                // iframe.width = 1000;
                // iframe.height = 1000;
                // iframe.style['-webkit-transform'] = 'scale(.5,.5)';
                // iframe.style['-webkit-transform-origin'] = '0% 0%';
                // $div.appendChild(iframe);


                // TODO この後、Facebookでシェアする機能を表示する.
            }
        }
        xhr.send(formData);


});


// ダウンロードボタン
$('.jsDownload').on('click', function () {
    alert('写真ダウンロードボタン');
});













sesami.create = sesami.create || {};

sesami.create = function(){
  this._constructor();
};

sesami.create.prototype = {
  $tgt: null,
  canvas: null,
  image: null,
  original: null, //original画像はここ
  property: null, //共通情報
  _constructor: function(){
    var _this = this;
    _this.$tgt = $('.jsPostArea');
    _this.canvas = _this.$tgt.find('canvas');
    _this.context = _this.canvas[0].getContext('2d');
    _this.$fileInput = _this.$tgt.find('input[type="file"]');
    _this.property = {
      w :_this.canvas.outerWidth(),
      h :_this.canvas.outerHeight(),
      crop: {}, //クロップ情報
      scope: {}, //スコープ情報
    };
    //ファイル読み込み準備
    _this._read();
  },
  _read: function(){

    //
    var _this = this;
    var createObjectURL = window.webkitURL && window.webkitURL.createObjectURL;
    var JPEG_QUALITY = 0.8;

    // イベントをキャンセルするハンドラです.
    var cancelEvent = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // ドロップ処理するハンドラです
    var readFile= function(e){

      e.preventDefault();

      var file;
      //Drop || file
      if(e.originalEvent.dataTransfer){
        file = e.originalEvent.dataTransfer.files[0];
      }else{
        file = $(this)[0].files[0];
      }

      //not image
      if(!(file.type == 'image/jpeg' || file.type == 'image/png')){
        console.log('画像じゃないよ');
        return false;
      }

      var fileReader = new FileReader();

      fileReader.onloadend = function(e){

        var dataUrl = e.target.result; //fileReader.result
        _this.original = {};
        _this.original.name = file.name.substring(0, file.name.lastIndexOf('.'))+'.jpg';
        _this.original.data = new Image();
        _this.original.data.src = dataUrl;

        _this.original.data.onload = function(){
          _this.original.w = _this.original.data.width;
          _this.original.h = _this.original.data.height;
        };

        //クロップをリセット
        _this.property.scope.point = [{}, {}, {}, {}];

        //元画像を現画像にセット
        _this.image = $.extend(true, _this.image, _this.original);
        drawFile();

        console.log(_this.original);

      };
      fileReader.readAsDataURL(file);
      cancelEvent(e);
      return false;

    };

    var drawFile = function(){

      _this.context.clearRect(0, 0, _this.canvas.outerWidth(), _this.canvas.outerHeight());

      //context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
      //sx, sy, sw, sh 使用範囲
      //dx, dy, dw, dh 配置する座標

      _this.image.w = _this.image.data.width;
      _this.image.h = _this.image.data.height;

      _this.context.drawImage(_this.image.data,
                              0,
                              0,
                              _this.image.w,
                              _this.image.h,
                              _this.property.w / 2 - (_this.property.h * _this.image.w / _this.image.h)/2,
                              0,
                              _this.property.h * _this.image.w / _this.image.h,
                              _this.property.h);

      _this.image.data.src = _this.canvas[0].toDataURL('image/jpeg', JPEG_QUALITY);

    };

    _this.$fileInput.on('change', readFile);
    _this.$tgt.on({
      'drop':readFile,
      "dragenter" :cancelEvent,
      "dragover" :cancelEvent,
    });
  },
  _crop_bind: function(){
    var _this = this;
  }
};

var Create = new sesami.create();

(function () {


    // **** 仮実装です
    // ファイルアップをして、後続のサーバーへの保存、Facebook連携の実装を行うために、
    // とりあえずファイルをアップできるようにしています.
    // var fileInput = document.querySelector('input[type="file"]');
    // fileInput.onchange = function(e) {
    //     console.debug('e:', e, fileInput);
    //     var file = fileInput.files[0];
    //     var fr = new FileReader();
    //     fr.onload = function () {
    //         var img = document.createElement('img');
    //         img.width = 200;
    //         img.src = this.result;
    //         $('#previewArea').empty().append(img);
    //     };
    //     fr.readAsDataURL(file);
    // };

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
        xhr.open('POST', './api/create.php'); // TODO Apache設定にて、修飾子は出さない対応
        xhr.onload = function () {
            if (this.status === 200) {
                var uniqueKey = this.responseText;
                // TODO このキーを使って、ユニークなURLを作成します.
                console.debug('key=', uniqueKey);

                var url1 = './share?key=' + uniqueKey;
                var url2 = 'http://yoheim.net/app/sesami-book/share?key=' + uniqueKey;
                var a = document.createElement('a');
                a.href = url1;
                a.innerHTML = url2;

                var $div = document.querySelector('#result');
                $div.innerHTML = '<p>画面ができたよ！以下の画面をFacebookでシェアしよう！</p>';
                $div.innerHTML += '<input type="button" value="Facebookでシェアする(未実装ボタン)"/><br>';
                $div.appendChild(a);

                var iframe = document.createElement('iframe');
                iframe.src = url1;
                iframe.width = 1000;
                iframe.height = 1000;
                iframe.style['-webkit-transform'] = 'scale(.5,.5)';
                iframe.style['-webkit-transform-origin'] = '0% 0%';
                $div.appendChild(iframe);


                // TODO この後、Facebookでシェアする機能を表示する.
            }
        }
        xhr.send(formData);

    });


})();