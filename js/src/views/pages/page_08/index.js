// page08
sesami.page08 = {};
sesami.page08.init = function () {
    console.debug('page08 init is called.');

};


sesami.page08.dealloc = function () {
    // ページを離れる場合に呼び出されます.
    // イベントのアンバインドやタイマーの削除を、ここで行ってください.
    console.debug('page08 dealloc is called.');
};
