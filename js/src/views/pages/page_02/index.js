// page02
sesami.page02 = {};
sesami.page02.init = function () {
    console.debug('page02 init is called.');



};

//
// 後処理
//
sesami.page02.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page00 dealloc is called.');
};
