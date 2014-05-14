// page01
(function () {

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






})();