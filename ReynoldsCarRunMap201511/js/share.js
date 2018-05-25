
function setupwx (argument) {
    //if (/MicroMessenger/i.test(navigator.userAgent)) {
    $.getScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function callback() {
        $.ajax({
            type: "post",
            url: "http://bluescfg.sinaapp.com/wxapi/jssdk.php",
            dataType: 'json',
            data: {
                url: window.location.href
            },
            success: function (data) {
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'hideMenuItems'
                        ]
                })
                wx.ready(function () {

                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareAppMessage(shareData);
                    wx.hideMenuItems({
                        menuList: [
                            //'menuItem:share:qq',
                            //'menuItem:share:weiboApp',
                            //'menuItem:favorite',
                            //'menuItem:share:facebook',
                            //'menuItem:copyUrl',
                            //'menuItem:readMode',
                            //'menuItem:openWithQQBrowser',
                            //'menuItem:openWithSafari'
                        ]
                    });
                })
                wx.error(function (res) {
                    // alert(res)
                })
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // alert("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:" + thrownError + "\n" + xhr.responseText);
            }
        })
    })
//}
 }

