// page01
(function () {

// TODO マルチタップ対応！


    // コンテナ
    var $content = $('[data-page="1"]');

    // Boxタップ
    // 仮です（tapにします）
    $content.on('click', '.jsBoxTap', function () {
        console.debug('[jsBoxTap]');

        var 
            $box = $content.find('.jsBox'),
            $this = $(this);

        $box.addClass('rotateAnim');
        $this.addClass('noAction');
        setTimeout(function () {
            $box.removeClass('rotateAnim');
            $this.removeClass('noAction');
        }, 800);

    });


    // Bodyタップ
    // 仮です（tapにします）
    $content.on(sesami.event.TOUCH_START, '.jsBodyTap', function () {
        console.debug('[jsBodyTap] touchstart');
        $content.find('.jsEye').removeClass('hidden');
        $content.find('.jsDrop').addClass('hidden');
        $content.find('.jsArmAnim').addClass('stop');
    
    }).on(sesami.event.TOUCH_END, '.jsBodyTap', function () {
        console.debug('[jsBodyTap] touchend');
        $content.find('.jsEye').addClass('hidden');
        $content.find('.jsDrop').removeClass('hidden');
        $content.find('.jsArmAnim').removeClass('stop');
    });


    // 2014.06.01 ムネ
    // すみません、共通処理として以下を追加させてください.
    // ページ表示時、離脱時に呼び出すインターフェースを追加します.
    // ページの切り替わり時に共通部分から呼び出しますので、必要な処理がありましたら、記述をお願いします.
    //
    sesami.page01 = {};
    sesami.page01.init = function () {
        // ページ表示時に呼び出されます.
        // ページ開始時にイベントのバインドなど、ここで行ってください.
        console.debug('page01 init is called.');
    };
    sesami.page01.dealloc = function () {
        // ページを離れる場合に呼び出されます.
        // イベントのアンバインドやタイマーの削除を、ここで行ってください.
        console.debug('page01 dealloc is called.');
    };




})();