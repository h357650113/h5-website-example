// JavaScript Document quanqu grow up page img loading
var load_img = new Array;
    load_img = ["img/pmat/bar.png","img/phome/bg.jpg", "img/phome/tt.png", "img/phome/tp.png", "img/phome/1.png", "img/phome/1t.png", "img/phome/2.png", "img/phome/2t.png", "img/phome/3.png", "img/phome/3t.png", "img/phome/boy.png", "img/arrow.png", "img/pall/t.png", "img/pall/text.png", "img/pall/bg.png", "img/pall/study.png", "img/pall/play.png", "img/arrow.png", "img/pmu/t.png", "img/pmu/tg.png", "img/pmu/stage.png", "img/pmu/m1.png", "img/pmu/m1.jpg", "img/pmu/l1.jpg", "img/pmu/r1.jpg", "img/arrow.png", "img/pmat/t.png", "img/pmat/pie.png", "img/pmat/tg.png", "img/arrow.png", "img/pmth/t.png", "img/pmth/tg.png", "img/pmth/mt.png", "img/pmu/stage.png", "img/pmu/m1.png", "img/pmu/m1.jpg", "img/pmu/l1.jpg", "img/pmu/r1.jpg", "img/arrow.png", "img/pms/t.png", "img/end/tbg.png", "img/end/btns.png"]
   
var img = new Image();      // 声明对象，使用 image 对象中的 onload 方法
var loading = {
    end : function(){
       setTimeout($('#loading').fadeOut('fast'),1000);
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
        loading.end();
    }
})

