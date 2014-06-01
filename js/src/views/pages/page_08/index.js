// page08
(function () {




    // 2014.06.01 ムネ
    // すみません、共通処理として以下を追加させてください.
    // ページ表示時、離脱時に呼び出すインターフェースを追加します.
    // ページの切り替わり時に共通部分から呼び出しますので、必要な処理がありましたら、記述をお願いします.
    //
    sesami.page08 = {};
    sesami.page08.init = function () {
        // ページ表示時に呼び出されます.
        // ページ開始時にイベントのバインドなど、ここで行ってください.
        console.debug('page08 init is called.');
    };
    sesami.page08.dealloc = function () {
        // ページを離れる場合に呼び出されます.
        // イベントのアンバインドやタイマーの削除を、ここで行ってください.
        console.debug('page08 dealloc is called.');
    };

})();