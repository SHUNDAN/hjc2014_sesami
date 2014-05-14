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




})();