//
// page05で型抜きするクッキーの種類に合わせて、その後のページの表示を制御する機能
//
(function () {

    sesami.CookieManager = {

        numOfCookie1: 1,
        numOfCookie2: 1,
        numOfCookie3: 1,

        addCookieCount: function (type) {
            this['numOfCookie' + type]++;
        },

        getCookieRaito: function (type) {
            var num = this['numOfCookie' + type];
            var sum = this.numOfCookie1 + this.numOfCookie2 + this.numOfCookie3;
            return num / sum;
        },

    };
})();