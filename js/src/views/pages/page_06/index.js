// page06
sesami.page06 = {};
sesami.page06.init = function () {
    console.debug('page06 init is called.');

};


//
// 後処理
//
sesami.page06.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page06 dealloc is called.');
};
