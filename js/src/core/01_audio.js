// Audio
(function () {

    // return false;

    // Namespace.
    //================================================
    // var sesami = window.sesami;



    //
    // 音源定義
    //
    var json1 = {
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



      //
      // BGM
      //
      var json2 = {
          "resources": [
            "./sound/bgm.ogg",
            "./sound/bgm.m4a",
            "./sound/bgm.mp3",
            "./sound/bgm.ac3"
          ],
          "spritemap": {
            "silence": {
              "start": 0,
              "end": 2,
              "loop": true
            },
            "sesami_01": {
              "start": 3,
              "end": 25.58823129251701,
              "loop": true
            },
            "sesami_02": {
              "start": 27,
              "end": 41.54546485260771,
              "loop": true
            }
          },
          "autoplay": "silence"
        };









    var effectPlayer;
    var bgmPlayer;
    if (sesami.isIphone || sesami.isIpad || sesami.isAndroid) {
        // あとでロード
    } else if (sesami.isIEold) {
        // dummy
        effectPlayer = {
            play: function () {}
        };
        bgmPlayer = {
            play: function () {}          
        };
    } else {
        effectPlayer = new jukebox.Player(json1);
        bgmPlayer = new jukebox.Player(json2);
    }

    sesami.effectPlayer = {
        play: function (type) {
            if (effectPlayer) {
                effectPlayer.play(type, true);
            } else {
                effectPlayer = new jukebox.Player(json1);
                var timer = setInterval(function () {
                    if (effectPlayer.canPlay) {
                        console.debug('effectPlayer.canPlay is true');
                        clearInterval(timer);
                        effectPlayer.play(type, true);
                    }
                }, 200);                
            }


            // ついでに
            if (!bgmPlayer) {
                bgmPlayer = new jukebox.Player(json2);
                var timer2 = setInterval(function () {
                    if (bgmPlayer.canPlay) {
                        console.debug('bgmPlayer.canPlay is true2');
                        sesami.bgmPlayer.playBGMAt(sesami.currentPage);
                        clearInterval(timer2);
                    }
                }, 500);
            }


        },
        stop: function () {
            if (effectPlayer) {
              effectPlayer.stop();
            }
        },
        _getPlayer: function () {
            return effectPlayer;
        }
    };

    var currentBGMType;
    sesami.bgmPlayer = {
        play: function (type) {
          if (bgmPlayer) {
              if (currentBGMType === type) {
                  return false;
              }
              currentBGMType = type;
              bgmPlayer.play(type, true);
          } else {
              bgmPlayer = new jukebox.Player(json2);
              var timer = setInterval(function () {
                  if (bgmPlayer.canPlay) {
                      console.debug('bgmPlayer.canPlay is true');
                      clearInterval(timer);
                      bgmPlayer.play(type, true);
                  }
              }, 200);
          }


          // ついでに
          // ついでに
          if (!effectPlayer) {
              effectPlayer = new jukebox.Player(json1);
              var timer2 = setInterval(function () {
                  if (effectPlayer.canPlay) {
                      console.debug('effectPlayer.canPlay is true2');
                      clearInterval(timer2);
                  }
              }, 500);
          }




        },
        stop: function () {
            if (bgmPlayer) {
              bgmPlayer.stop();
            }
        },
        playBGMAt: function (pageNo) {
            var type = this.__getBGMTypeAt(pageNo);
            this.play(type, true);
        },
        __getBGMTypeAt: function (pageNo) {
            var type;
            switch (pageNo) {
              case 0:
                  type = 'sesami_01';
                  break;
              case 1:
              case 2:
              case 3:
                  type = 'sesami_02';
                  break;
              default:
                  type = 'sesami_01';
                  break;
            }
            return type;
        },
        _getPlayer: function () {
            return bgmPlayer;
        }
    };


})();















