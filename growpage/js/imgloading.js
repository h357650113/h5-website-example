// JavaScript Document quanqu grow up page img loading
var load_img = new Array;
    load_img = [
       'text.OTF',
       'back.gif',
       'img/round_box/boll.png',
       'img/p0/circle_b.png',
       'img/p0/circle_t.png',
       'img/p0/robot.png',
       'img/p1/boybg.png',
       'img/p1/boyface.png',
       'img/round_box/cont_line.png',
       'img/p2/l1.png',
       'img/p2/l11.png',
       'img/p2/l12.png',
       'img/round_box/cont_line.png',
       'img/round_box/boll.png',
       'img/p2/l2.png',
       'img/p2/l21.png',
       'img/p2/l22.png',
       'img/p2/l2.png',
       'img/p2/l21.png',
       'img/p2/l22.png',
       'img/pend/babby.png',
       'img/pend/circle.png',
       'img/pend/endbuttbg.png',
       'img/pend/endbutt.png'
    ]
   
var img = new Image();      // 声明对象，使用 image 对象中的 onload 方法
var loading = {
    end : function(){
        $('#loadcri_wrap').css({'-webkit-transform':'scale(.3)','opacity':0});
        $('#loading').css('opacity','0');
        if((win.w/win.h) > (320/525)){
            $('#mid_line').css('top','50%');
            $('#Allstuffs').css('-webkit-transform','scale(.9)')
        }
        setTimeout(function(){
            $('#loading').css('display','none');
            animateInterval(Ani_page1,10);
        },800)
    }
}
resourceDir="";
function loadResources(urls, progress) {
    var loadedCount = 0;
    var loaded = function () {
        ++loadedCount;
        if (progress) progress(urls.length, loadedCount, this);
    };
    for (var i = 0; i < urls.length; ++i) {
        if (!urls[i]) {
            loaded();
            return;
        }
        var img = new Image();
        //resourceMap[urls[i]] = img;
        img.onload = loaded;
        img.onabort = loaded;
        img.onerror = loaded;
        img.src = resourceDir + urls[i];//+ "?ver=" + j_version;
    }
}
loadResources(load_img,function (n, i, img) {
    $('#loading_text').html(Math.round(i * 100 / n) + "%");
    if (i > (load_img.length-1)){
      dateAjax.getUserDate();
    }
})