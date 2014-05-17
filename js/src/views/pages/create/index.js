//
//
// 写真の合成機能を実装する
// create

sesami.create = sesami.create || {};

sesami.create = function(){
  this._constructor();
};

sesami.create.prototype = {
  $tgt: null,
  canvas: null,
  image: null,
  _constructor: function(){
    var _this = this;
    _this.$tgt = $('.jsPostArea');
    _this.canvas = _this.$tgt.find('canvas');
    _this.context = _this.canvas[0].getContext('2d');
    _this.$fileInput = _this.$tgt.find('input[type="file"]');
    this.property = {
      w :this.canvas.width(),
      h :this.canvas.height(),
    };
    //ファイル読み込み準備
    _this._read();
  },
  _read: function(){

    var _this = this;

    var createObjectURL = window.webkitURL && window.webkitURL.createObjectURL;

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
        _this.pre = {};
        _this.pre.name = file.name.substring(0, file.name.lastIndexOf('.'))+'.jpg';
        _this.pre.data = new Image();
        _this.pre.data.src = dataUrl;

        _this.pre.data.onload = function(){
          _this.pre.w = _this.pre.data.width;
          _this.pre.h = _this.pre.data.height;
        };

        //元画像を現画像にセット
        _this.image = _this.pre;
        drawFile();

      };
      fileReader.readAsDataURL(file);
      cancelEvent(e);
      return false;

    };

    var drawFile = function(){
      _this.context.clearRect(0, 0, _this.canvas.width(), _this.canvas.width());
      //_this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
      //sx, sy, sw, sh 使用範囲
      //dx, dy, dw, dh 配置する座標

      _this.image.w = _this.image.data.width;
      _this.image.h = _this.image.data.height;

      _this.context.drawImage(
                              _this.image.data,
                              0,
                              0,
                              641,
                              641,
                              0,
                              0,
                              _this.property.w,
                              _this.property.h
                              // 0,
                              // 0,
                              // _this.image.w,
                              // _this.image.h,
                              // _this.property.w / 2 - (_this.property.h * _this.image.w / _this.image.h)/2,
                              // 0,
                              // _this.property.w,
                              // _this.property.h
      );
    };

    _this.$fileInput.on('change', readFile);
    _this.$tgt.on({
      'drop':readFile,
      "dragenter" :cancelEvent,
      "dragover" :cancelEvent,
    });
  }
};

var Create = new sesami.create();