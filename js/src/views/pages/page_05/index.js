// page05
sesami.page05 = {};
sesami.page05.init = function () {
    console.debug('page05 init is called.');

};


//
// 後処理
//
sesami.page05.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page05 dealloc is called.');
};
