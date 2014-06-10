// Audio
(function () {

    // return false;

    // Namespace.
    //================================================
    // var sesami = window.sesami;



    //
    // 音源定義
    //
    var json = {
      "resources": [
        "./sound/effect.ogg",
        "./sound/effect.m4a",
        "./sound/effect.mp3",
        "./sound/effect.ac3"
      ],
      "spritemap": {
        "1": {
          "start": 3,
          "end": 3.679183673469388,
          "loop": false
        },
        "2": {
          "start": 5,
          "end": 8.578775510204082,
          "loop": false
        },
        "3": {
          "start": 10,
          "end": 12.925714285714285,
          "loop": false
        },
        "4": {
          "start": 14,
          "end": 15.018775510204081,
          "loop": false
        },
        "5": {
          "start": 17,
          "end": 17.75755102040816,
          "loop": false
        },
        "6": {
          "start": 19,
          "end": 19.99265306122449,
          "loop": false
        },
        "7": {
          "start": 21,
          "end": 21.313469387755102,
          "loop": false
        },
        "8": {
          "start": 23,
          "end": 23.914285714285715,
          "loop": false
        },
        "9": {
          "start": 25,
          "end": 25.6018820861678,
          "loop": false
        },
        "10": {
          "start": 27,
          "end": 27.914285714285715,
          "loop": false
        },
        "11": {
          "start": 29,
          "end": 31.455510204081634,
          "loop": false
        },
        "12": {
          "start": 33,
          "end": 35.639433106575964,
          "loop": false
        },
        "13": {
          "start": 37,
          "end": 39.40326530612245,
          "loop": false
        },
        "14": {
          "start": 41,
          "end": 43.27265306122449,
          "loop": false
        },
        "15": {
          "start": 45,
          "end": 45.83591836734694,
          "loop": false
        },
        "16": {
          "start": 47,
          "end": 47.57469387755102,
          "loop": false
        },
        "17": {
          "start": 49,
          "end": 50.07208616780046,
          "loop": false
        },
        "18": {
          "start": 52,
          "end": 52.626938775510204,
          "loop": false
        },
        "19": {
          "start": 54,
          "end": 54.57469387755102,
          "loop": false
        },
        "20": {
          "start": 56,
          "end": 56.57469387755102,
          "loop": false
        },
        "21": {
          "start": 58,
          "end": 58.54857142857143,
          "loop": false
        },
        "22": {
          "start": 60,
          "end": 60.23510204081633,
          "loop": false
        },
        "23": {
          "start": 62,
          "end": 63.98637188208617,
          "loop": false
        },
        "24": {
          "start": 65,
          "end": 65.39183673469388,
          "loop": false
        },
        "25": {
          "start": 67,
          "end": 67.98401360544217,
          "loop": false
        },
        "silence": {
          "start": 0,
          "end": 2,
          "loop": true
        }
      },
      "autoplay": "silence"
    };


    var effectPlayer;
    if (sesami.isIphone || sesami.isIpad || sesami.isAndroid) {
        // あとでロード
    } else {
        effectPlayer = new jukebox.Player(json);        
    }

    sesami.effectPlayer = {
        play: function (num) {
            if (effectPlayer) {
                effectPlayer.play(num);
            } else {
                effectPlayer = new jukebox.Player(json);
                effectPlayer.play(num);
            }
        }
    }
    

















// 以下古い実装です。Zyngaライブラリの実装に切り替えます。














    // // Variables.
    // //================================================
    // var bgmFilePath = './sound/bgm.mp3';        // TODO firefoxの場合にはoggを読み込む.
    // var soundFilePath = './sound/effect.mp3';   // TODO firefoxの場合にはoggを読み込む.


    // // TODO スマホ対応とか.
    // // ロード
    // var bgmAudio = document.createElement('audio');
    // bgmAudio.src = bgmFilePath;
    // bgmAudio.addEventListener('canplay', function () {
    //     console.debug('bgmAudio canplay');
    //     bgmAudio.canplay = true;
    // });
    // bgmAudio.load();


    // var effectAudio = document.createElement('audio');
    // effectAudio.src = soundFilePath;
    // effectAudio.addEventListener('canplay', function () {
    //     console.debug('effectAudio canplay');
    //     effectAudio.canplay = true;
    // });


    // // Public Method（BGM）
    // //================================================
    // var start,
    //     end,
    //     nowPlaying,
    //     timeupdateListener = function () {
    //         // console.debug('timeupdate', bgmAudio.currentTime);
    //         if (bgmAudio.currentTime >= end) {
    //             bgmAudio.pause();
    //             bgmAudio.currentTime = start;
    //             bgmAudio.play();
    //         }
    //     };
    // sesami.bgmSound = {
    //     pause: function () {
    //         bgmAudio.pause();
    //         bgmAudio.removeEventListener('timeupdate', timeupdateListener);
    //         nowPlaying = false;
    //     },
    //     play: function (bgmType) {
    //         // 0 - 35
    //         // 35 - 69
    //         // 70 - 109
    //         // 109 - 155
    //         var starts = [0, 36, 72, 110];
    //         var ends = [35, 69, 109, 155];

    //         // stop.
    //         // TODO 現在と一緒だったら何もしない.
    //         if (start === starts[bgmType - 1]) {
    //             return;
    //         }
    //         sesami.bgmSound.pause();



    //         // TODO canplay待ち.


    //         start = starts[bgmType - 1];
    //         end = ends[bgmType - 1];

    //         nowPlaying = true;


    //         console.debug('play:', bgmType, start, end);

    //         // ループ処理.
    //         bgmAudio.addEventListener('timeupdate', timeupdateListener);

    //         bgmAudio.currentTime = start;
    //         bgmAudio.play();
    //     },
    //     audio: bgmAudio
    // };



    // // 仮.
    // var startBGM = function () {
    //     if (bgmAudio.canplay) {
    //         console.debug('start!!!!!!');
    //         var bgmType = Math.abs(sesami.currentPage % 4) + 1;
    //         sesami.bgmSound.play(bgmType);
    //     } else {
    //         setTimeout(startBGM, 100);
    //     }
    // }
    // $(startBGM);






























})();