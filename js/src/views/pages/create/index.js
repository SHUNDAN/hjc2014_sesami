//
//
// 写真の合成機能を実装する
// create

// オリジナル写真作成 & Facebook共有ページ
//


// 共通変数
//--------------------------------------------
var
  tmp = {}  // 各種情報を入れておく
  ;



// 進捗バー
//-------------------------------------------
var $progress = $('.jsProgress');
var Progress = {
    show: function () {
        $progress.removeClass('hidden');
        this.updateProgress(0);
    },
    hide: function () {
        $progress.addClass('hidden');
    },
    updateProgress: function (raito) {
        $progress.find('.inner').css('width', raito + '%');
        $progress.find('.raito').html(Math.floor(raito) + '%');
    },
};





// Private Functions
//-------------------------------------------
var getCurrentPageNo = function (element) {
  return $(element).parents('[data-page]').data('page');
}
var goPage = function (pageNo) {
    $('[data-page]').addClass('hidden');
    $('[data-page="' + pageNo + '"]').removeClass('hidden');
    window.scrollTo(0,1);
};
var image2base64 = function (img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);
    var base64 = canvas.toDataURL();
    return base64;
}






// ボタンアクションの定義
//-------------------------------------------

//
// 次ページ
//
$('.jsNextPage').on('click', function () {
    var currentPage = getCurrentPageNo(this);
    goPage(currentPage + 1);
});


//
// 前ページ
//
$('.jsPrevPage').on('click', function () {
    var currentPage = getCurrentPageNo(this);
    goPage(currentPage - 1);
});


//
// ファイルアップロード
//
$('.jsFileSelect').on('change', function (e) {

    // アップロードされたファイル
    var file = $(this)[0].files[0];

    // ファイル形式チェック
    if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
        if (file.type !== undefined) { // Android2.3対応
            alert('画像をアップロードしてください. ' + file.type);
            return false;
        }
    }


    // ファイル読み込み
    var fileReader = new FileReader();
    fileReader.onloadend = function(e) {

        // 画像をグローバル変数にキャッシュ.
        tmp.uploadFileUrl = e.target.result;

        // 画像として表示.
        var image = new Image();
        image.src = tmp.uploadFileUrl;
        image.onload = function () {


          // 1MB以上は、MegaPixcel対応
          var S1MB = 1 * 1024 * 1024;
          var fileSize = file.size;
          console.debug('size: ', fileSize, S1MB);
          if (fileSize > S1MB) {
              console.debug('use MegaPixImage');
              var scale = S1MB / fileSize;
              var w = Math.floor(image.width * scale);
              var h = Math.floor(image.height * scale);
              var canvas = document.createElement('canvas');
              var mgImg = new MegaPixImage(image);
              var newImg = new Image();
              newImg.onload = function () {
                  console.debug('image created by megaPix was loaded.');
                  goNext(newImg);
              }
              mgImg.render(newImg, { width: w, height: h });
              console.debug('megaPixImage finish');

          } else {
              console.debug('use NaturalImage');
              goNext(image);
          }



          function goNext(image) {

              // **** frame ***
              // w: 1000
              // h: 1167

              // **** photo ***
              // x: 65
              // y: 65
              // w: 900
              // h: 881

              // リサイズ情報
              var
                  posX = 65,
                  posY = 65,
                  resizedW = 1000,
                  resizedH = 1000,
                  resizedRaito = resizedH / resizedW;


              // 写真情報
              var
                  orgnW = image.width,
                  orgnH = image.height,
                  orgnRaito = orgnH / orgnW;


              // 横長の場合は、縦を縮小して、横を左右中央表示にする
              var scale, scaledWidth, scaledHeight ,marginL, marginT;
              if (orgnRaito < resizedRaito) {
                  srcH = orgnH;
                  srcW = orgnW * (orgnRaito / resizedRaito);
                  console.debug((srcH / srcW), (resizedH / resizedW));
                  marginL = (orgnW - srcW) / 2;
                  marginT = 0;

              // 縦長の場合は、横を縮小して、縦を上下中央表示にする
              } else {
                  srcH = orgnH * (resizedRaito / orgnRaito);
                  srcW = orgnW;
                  marginL = 0;
                  marginT = (orgnH - srcH) / 2;
                  // scale = resizedW / orgnW;
                  // scaledWidth = resizedW;
                  // scaledHeight = orgnH * scale;
                  // marginL = 0;
                  // marginT = (scaledHeight - resizedH) / 2 * -1;
              }


              // 画像の縮小と形指定を行う.
              var
                  canvas  = document.createElement('canvas'),
                  context = canvas.getContext('2d');

              canvas.width = resizedW;
              canvas.height = resizedH;

              // TODO iOSなどのサンプリング対策
              // context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
              // @see http://www.html5.jp/canvas/ref/method/drawImage.html
              context.drawImage(image, marginL, marginT, srcW, srcH, 0, 0, resizedW, resizedH);
              var imageBase64 = canvas.toDataURL('image/png');

              tmp.userImageBase64 = imageBase64;


              // 書き出し
              var resizedImage = new Image();
              resizedImage.src = imageBase64;
              resizedImage.className = 'userImage';
              resizedImage.onload = function () {
                  tmp.userImage = this;
                  $('.jsUploadPhoto').empty().append(this);

                  // ついでにデフォルトフレームもアペンド
                  tmp.selectedFrameNo = 1;
                  var frame = new Image();
                  frame.src = './img/create/frame1.png';
                  frame.className = 'frame';
                  $('.jsUploadPhoto').append(frame);
                  tmp.frameImage = frame;
              };
          }
        }

        // 文言の調整
        if (sesami.isIphone || sesami.isIpad || sesami.isAndroid) {
            $('#actionName').html('タップ');
        }


        // ページ遷移
        goPage(3);
    };
    fileReader.readAsDataURL(file);
});


// タップで回転
tmp.userImageRotate = 0;
$('.jsUploadPhoto').on('click', '.frame', function () {
    console.debug('[jsUploadPhoto]');

    tmp.userImageRotate += 90;
    $('.jsUploadPhoto .userImage').css({
        '-webkit-transform': 'rotateZ(' + tmp.userImageRotate + 'deg)',
        '-moz-transform': 'rotateZ(' + tmp.userImageRotate + 'deg)',
        '-ms-transform': 'rotateZ(' + tmp.userImageRotate + 'deg)',
        'transform': 'rotateZ(' + tmp.userImageRotate + 'deg)',
    });
});



// フレーム選択
$('.jsFrameSelect img').on('click', function () {

    var $figure = $('.jsUploadPhoto');
    var frame = $(this)[0].cloneNode(true);
    frame.className = 'frame';
    $figure.find('.frame').remove();
    $figure.append(frame);

    tmp.frameImage = frame;
});



// 確認画面へ
$('.jsGotoConfirmPage').on('click', function () {

    Progress.show();


    // 選択されたフレームとユーザー画像を取得する.
    var frameImage;
    var userImage;
    var $images = $('.jsUploadPhoto img');
    $.each($images, function (index) {
        var $img = $($images[index]);
        if ($img.hasClass('frame')) {
            var img = $img[0].cloneNode();
            frameImage = img;
        } else {
            var img = $img[0].cloneNode();
            userImage = img;
        }
    });







    // 合成処理 ********* ここから ***********
    var createImage = function () {
        var
            canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            frameImage = tmp.frameImage,
            frameW = frameImage.naturalWidth  || frameImage.width,
            frameH = frameImage.naturalHeight || frameImage.height,
            userImage = tmp.userImage,
            userImageW = userImage.naturalWidth  || userImage.width,
            userImageH = userImage.naturalHeight || userImage.height;

        canvas.width = frameW;
        canvas.height = frameH;

        // とりあえず真っ白を最背面に置く。
        // context.fillStyle = 'rgba(255,255,255,1)';
        // context.fillRect(0, 0, frameW, frameH);

        // ユーザー画像の描画
        // context.drawImage(tmp.userImage,0, 0, userImageW, userImageH, 54, 63, userImageW, userImageH);
        context.drawImage(tmp.userImage,0, 0, userImageW, userImageH, 0, 0, userImageW, userImageH);

        // フレーム画像の描画（透過のところは処理しない感じ）
        var newDatas = [];
        var pixels = context.getImageData(0, 0, frameW, frameH);
        var datas = pixels.data;
        var frameDatas = (function () {
            var
                aCanvas = document.createElement('canvas'),
                aContext = aCanvas.getContext('2d');

            aCanvas.width = frameW;
            aCanvas.height = frameH;

            context.drawImage(tmp.frameImage, 0, 0, frameW, frameH, 0, 0, frameW, frameH);

            return context.getImageData(0, 0, frameW, frameH).data;
        })();


        var i = 0, len = datas.length;
        var func = function () {
            for (; i < len; i++) {

                var
                    frameAlpha = (frameDatas[i + 3] < 1 ? (frameDatas[i+3]/255) : 1), // 50以下のみを透過と扱う。なぜか至ところが透過しているため・・・
                    orgnAlpha = 1;//(datas[i + 3] < 1 ?  datas[i+3]/ 255 : 1), // 50以下のみを透過と扱う。なぜか至ところが透過しているため・・・
                    floor = Math.floor;

                datas[i]     = floor(frameDatas[i]     * frameAlpha + datas[i]     * (1 - frameAlpha) * orgnAlpha);
                datas[i + 1] = floor(frameDatas[i + 1] * frameAlpha + datas[i + 1] * (1 - frameAlpha) * orgnAlpha);
                datas[i + 2] = floor(frameDatas[i + 2] * frameAlpha + datas[i + 2] * (1 - frameAlpha) * orgnAlpha);
                datas[i + 3] = 255;

                if (i % 10000 === 0 && i > 0) {
                    var raito = (i / len) * 100;
                    Progress.updateProgress(raito);
                    // console.debug('raito', raito);
                    i++;
                    break;
                }
            }
            if (i >= len) {
                Progress.updateProgress(100);

                context.putImageData(pixels, 0, 0);
                tmp.finalBase64 = canvas.toDataURL('image/png');


                // 表示
                var finalImage = new Image();
                finalImage.src = tmp.finalBase64;
                finalImage.onload = function () {
                    $('.jsUploadPhoto2').empty().append(finalImage);
                };

                // 次のページへ
                goPage(4);

                setTimeout(function () {
                    Progress.hide();
                }, 500);

            } else {
              // UIの更新タイミングを取る
              setTimeout(func, 1);
            }
        };
        func();
    };







    // ユーザー画像の回転処理
    var rotate = tmp.userImageRotate % 360;
    if (rotate !== 0) {

        var
            userImage = tmp.userImage,
            w = userImage.naturalWidth  || userImage.width,
            h = userImage.naturalHeight || userImage.height;

        var mgImg = new MegaPixImage(userImage);
        var newImg = new Image();
        newImg.onload = function () {
            console.debug('image created by megaPix was loaded.');
            tmp.userImage = newImg;
            createImage();
        }

        var orientation;
        if (rotate === 90) {
            orientation = 6;
        } else if (rotate === 180) {
            orientation = 3;
        } else {
            orientation = 8;
        }
        mgImg.render(newImg, { width: w, height: h , orientation: orientation});
        console.debug('megaPixImage finish');

    } else {
        createImage();
    }









});


// やり直す
$('.jsRest').on('click', function () {
    goPage(1);
});

// アップロード
$('.jsUpload').on('click', function () {

        Progress.show();


        // 制作した画像を取得します（仮です）
        // 本当は、合成した画像を取得します
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



        // 下記データは、画像に書き込んだ状態で、画像をアップロードしてください.
        // // 子供の名前を取得します（仮です）
        // var childName = 'かほ';
        // // 現在日付を取得します（仮です）
        // var now = new Date();
        // var dateString = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();



        // 送信するためにbase64に変換する.
        // var base64 = image2base64(img);
        // console.debug('base64', base64);


        // 送ります.
        $.ajax({
            xhr: function () {
                 var xhr = new window.XMLHttpRequest();
                 xhr.upload.addEventListener("progress", function(evt) {
                   if (evt.lengthComputable) {
                     var raito = evt.loaded / evt.total * 100;
                     Progress.updateProgress(raito);
                   }
                 }, false);
                 return xhr;
            },
            url: './api/create.php',
            method: 'post',
            dataType: 'text',
            data: {
                base64: tmp.finalBase64
            },
            success: function (text) {
                Progress.updateProgress(100);
                var uniqueKey = text;
                var url = './create2.php?key=' + uniqueKey;
                location.href = url;
            },
            error: function () {
                alert('ごめんなさい><。エラーが発生しました。\n時間を置いてから再度お試しください.');
            }
        });

});


// ダウンロードボタン
$('.jsDownload').on('click', function () {
    alert('写真ダウンロードボタン');
});



$(function () {
    window.scrollTo(0,1);
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

// var Create = new sesami.create();

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
    // $('#yesBtn').on('click', function () {
    //     // xhr2を用いて、ファイルアップロードします。IE9は対象外です.


    //     // 制作した画像を取得します（仮です）
    //     var img = document.querySelector('#previewArea img');
    //     if (!img) {
    //         alert('画像がないから駄目です');
    //         return;
    //     }

    //     // 子供の名前を取得します（仮です）
    //     var childName = 'かほ';

    //     // 現在日付を取得します（仮です）
    //     var now = new Date();
    //     var dateString = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();

    //     // debug
    //     console.debug('[yesbtn]', img, childName, dateString);

    //     // base64で送信.（仮です）
    //     var canvas = document.createElement('canvas');
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //     var context = canvas.getContext('2d');
    //     context.drawImage(img, 0, 0, img.width, img.height);
    //     var base64 = canvas.toDataURL();
    //     console.debug('base64', base64);

    //     // 送信内容を作成します
    //     // サーバー側で以下のキーを使いますので、ここは変えない.
    //     var formData = new FormData();
    //     formData.append('childName', childName);
    //     formData.append('date', dateString);
    //     formData.append('base64', base64);  // 最終的にはPNGデータでアップしてください.


    //     // 送ります.
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('POST', './api/create.php'); // TODO Apache設定にて、修飾子は出さない対応
    //     xhr.onload = function () {
    //         if (this.status === 200) {
    //             var uniqueKey = this.responseText;
    //             // TODO このキーを使って、ユニークなURLを作成します.
    //             console.debug('key=', uniqueKey);

    //             var url1 = './share?key=' + uniqueKey;
    //             var url2 = 'http://yoheim.net/app/sesami-book/share?key=' + uniqueKey;
    //             var a = document.createElement('a');
    //             a.href = url1;
    //             a.innerHTML = url2;

    //             var $div = document.querySelector('#result');
    //             $div.innerHTML = '<p>画面ができたよ！以下の画面をFacebookでシェアしよう！</p>';
    //             $div.innerHTML += '<input type="button" value="Facebookでシェアする(未実装ボタン)"/><br>';
    //             $div.appendChild(a);

    //             var iframe = document.createElement('iframe');
    //             iframe.src = url1;
    //             iframe.width = 1000;
    //             iframe.height = 1000;
    //             iframe.style['-webkit-transform'] = 'scale(.5,.5)';
    //             iframe.style['-webkit-transform-origin'] = '0% 0%';
    //             $div.appendChild(iframe);


    //             // TODO この後、Facebookでシェアする機能を表示する.
    //         }
    //     }
    //     xhr.send(formData);

    // });


})();