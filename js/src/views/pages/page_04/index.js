// page04
sesami.page04 = {};
sesami.page04.init = function () {
    console.debug('page04 init is called.');


};

//
// 後処理
//
sesami.page04.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page00 dealloc is called.');
};
