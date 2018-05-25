// JavaScript Document, stage of animate list control by hsd 2016.3.25 .0.1 email : h357650113hotmail.com

// 动画序列控制
/**
var Ani = [  
    { func : function(){
        $('#a1').animate({width:'1366px',right:'216px'},800);
        },
      timer : 20,
      order : false,
    },
    { func : function(){
        $('#a2').animate({width:'1366px',right:'216px'},800);
        },
      timer : 50
    }
]
**/
function animateInterval (Ani,timer) {
    var len = Ani.length;  // 记录队列长度
    var i = 0;  // 循环游标
    var lon;  // 周转变量，用于临时记录动画序列结束位置
    var maxnum = 0; // 标记最后动画事件，用于结束动画序列操作
    var sig = 0;    // 执行动画游码
   //排序
    if(!Ani[0].order){  // 判断队列是否已经排序,否则进行冒泡排序
        for(var i = 0; i < len; i ++){
            for(var j = 0; j < len; j ++){
               if(Ani[i].timer < Ani[j].timer){
                    var middle = Ani[i];
                    Ani[i] = Ani[j];
                    Ani[j] = middle;
               }
            }
            if(Ani[i].timer > maxnum) maxnum = Ani[i].timer;  // 标记动画序列执行时间最大长度
        }
        lon = maxnum + 1;
        Ani[0].order = true;   // 标记队列为已经排序
        Ani[0].leng = lon;     // 记录结束位置
    } else {
        lon = Ani[0].leng;
    }
    // 循环执行动画序列
    i = 0;  // 游标清零
    var t = setInterval (function(){
        if(lon == i){   // 结束执行标致
            clearInterval(t); return;
        }
        // 时间标记，执行函数
        if( Ani[sig].timer == i ){
            Ani[sig].func();
            sig++;
        }
        i++;
    },timer);
}
