// Audio
(function () {

    // Namespace.
    //================================================
    var sesami = window.sesami;

    // Variables.
    //================================================
    var bgmFilePath = './sound/bgm.mp3';        // TODO firefoxの場合にはoggを読み込む.
    var soundFilePath = './sound/effect.mp3';   // TODO firefoxの場合にはoggを読み込む.


    // TODO スマホ対応とかどーしよー.
    // ロード
    var bgmAudio = document.createElement('audio');
    bgmAudio.src = bgmFilePath;
    bgmAudio.addEventListener('canplay', function () {
        console.debug('bgmAudio canplay');
        bgmAudio.canplay = true;
    });
    bgmAudio.load();


    // Public Method.
    //================================================
    var start,
        end,
        nowPlaying,
        timeupdateListener = function () {
            // console.debug('timeupdate', bgmAudio.currentTime);
            if (bgmAudio.currentTime >= end) {
                bgmAudio.pause();
                bgmAudio.currentTime = start;
                bgmAudio.play();
            }
        };
    sesami.bgmSound = {
        pause: function () {
            bgmAudio.pause();
            bgmAudio.removeEventListener('timeupdate', timeupdateListener);

            nowPlaying = false;
        },
        play: function (bgmType) {
            // 0 - 35
            // 35 - 69
            // 70 - 109
            // 109 - 155
            var starts = [0, 36, 72, 110];
            var ends = [35, 69, 109, 155];

            // stop.
            // TODO 現在と一緒だったら何もしない.
            if (start === starts[bgmType - 1]) {
                return;
            }
            sesami.bgmSound.pause();



            // TODO canplay待ち.


            start = starts[bgmType - 1];
            end = ends[bgmType - 1];

            nowPlaying = true;


            console.debug('play:', bgmType, start, end);

            // ループ処理.
            bgmAudio.addEventListener('timeupdate', timeupdateListener);

            bgmAudio.currentTime = start;
            bgmAudio.play();
        },
        audio: bgmAudio
    };



    // 仮.
    var startBGM = function () {
        if (bgmAudio.canplay) {
            console.debug('start!!!!!!');
            var bgmType = Math.abs(sesami.currentPage % 4) + 1;
            sesami.bgmSound.play(bgmType);
        } else {
            setTimeout(startBGM, 100);
        }
    }
    $(startBGM);



})();