var runPage = new FullPage({

  id : 'pageContain',                            // id of contain
  slideTime : 800,                               // time of slide
  continuous : false,                            // create an infinite feel with no endpoints
  effect : {                                     // slide effect
          transform : {
            translate : 'Y',                      // 'X'|'Y'|'XY'|'none'
            scale : [1, 1],                      // [scalefrom, scaleto]
            rotate : [0, 0],                       // [rotatefrom, rotateto]
          },
          opacity : [0, 1]                       // [opacityfrom, opacityto]
      },                           
  mode : 'wheel,touch,nav:navBar',               // mode of fullpage
  easing : 'ease'                                // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
    //  ,onSwipeStart : function(index, thisPage) {   // callback onTouchStart
    //    return 'stop';
    //  }
    //  ,beforeChange : function(index, thisPage) {   // callback before pageChange
    //    return 'stop';
    //  }
    //  ,callback : function(index, thisPage) {       // callback when pageChange
    //    alert(index);
    //  };
});

/****
  * 声明部分
****/
var canvasPie = {};
var canvasBar = {};

var touch = {};
    touch._y = 0;
    touch.y = 0;


// data : [{ name : '', value : 10 }]
canvasPie.draw = function(id,data){
    var c=document.getElementById(id);
    var ctx=c.getContext("2d");
    
    var w = c.width;
    var h = c.height;

    var colors = ['ff6c2b','32ade6','8656bc'];
    var pd = 0;
    var n = 0;
    
    var sum = 0;
    for(var i = 0; i < data.length; i++){
        sum += data[i].value;
    }
    
    for(var i = 0; i < data.length; i++){
        n += data[i].value/sum;
        draw(i,n);
        //drawt(data[i].name,w/2-5*pd*2*Math.PI,h/2-5*n*n*2*Math.PI);
        pd = n;
    }
    // 扇形绘制
    function draw(ci,n){
        ctx.beginPath();
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,h/2,pd*2*Math.PI,n*2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = "#"+colors[ci];
        ctx.fill();
    }
    // 绘制文字
    function drawt(text,x,y){
        ctx.beginPath();
        ctx.font="2px";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(text,x,y);
        ctx.fill();
        ctx.closePath();   
    }
}

canvasBar.draw = function(id,data){
    var c=document.getElementById(id);
    var ctx=c.getContext("2d");
    
    var w = c.width;
    var h = c.height;
    
        h -= 40;
    
    var space = 45;
    var flag = 0;
    var bw = 35;
    
    var sum = 0;
    var n = 0;
    
    var colors = ['ff6c2b','437cc1','9f54f3'];
    
    var cache = [];
    
    var loadedCount = 0;
    var loaded = function () {
        ++loadedCount;
    };
    
    var img = new Image();

        img.src = 'img/pmat/bar.png';
        img.onload = loaded;
    
    ctx.beginPath();
    ctx.drawImage(img,0,0,630,320,0,0,310,170);   
    ctx.closePath();
    // 最大 柱 为 基准
    for(var i = 0; i < data.length; i++){
           var mx = 0;
           var target = data[i].value;
           for(var k = 0; k < target.length;k++){
               mx += target[k];
               if(sum<mx){
                  sum = mx
               }
           }
           cache.push(mx);
    }

    for(var i = 0; i < data.length; i++){
           var target = data[i].value;
           // 记录 绘图 头部
           var head = 1-(cache[i]/sum);
           // 记录 绘图 尾部
           var tie = 0;
           // 同柱 向下 绘图
           for(var k = 0; k < target.length;k++){
               tie = target[k]/sum
               drawle2(flag,head*h,k,tie*h);;
               head += tie;
           }
           drawt(data[i].name,flag);
           // x轴 偏移
           flag += bw + space;
    }
    // 绘制 文字
    function drawt(text,x){
        ctx.beginPath();
        ctx.font="2px";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(text,x,h+40);
        ctx.fill();
        ctx.closePath();
    }
    // 块 绘制
    function drawle2(x,xh,ci,line){
        ctx.beginPath();
        ctx.rect(x+5,xh+30,bw,line);
        ctx.fillStyle = "#"+colors[ci];
        ctx.fill();
        ctx.closePath();
    }

}


$(function(){

    canvasPie.draw('papie',[{name:1,value:70},{name:2,value:10}]);
    canvasPie.draw('papie2',[{name:1,value:40},{name:2,value:40},{name:3,value:20}]);
    canvasBar.draw('bar1',[{name:'2016-6-1',value:[30,20,10]},{name:'2016-6-2',value:[20,15,22]},{name:'2016-6-4',value:[33,20,50]},{name:'2016-6-15',value:[40,20,44]}]);
    
    $('.pe_btn').on('touchstart',function(){
        runPage.go(0);
    })

    $('#touch').on('touchstart',function(){
        win.cancelBub();
        win.stopDef();
        touch.y = event.touches[0].pageY;
        touch.end = $('#touchwrap').height()-Number($('#touch').css('height').replace('px',''));
        console.log(touch.end)
    })
    $('#touch').on('touchmove',function(){
        var _y = event.touches[0].pageY - touch.y;
        if((touch._y+_y)>0){
           $('#touch').css('-webkit-transform','translate3d(0,0px,0)'); 
           return;
        } else if ((touch._y+_y)<touch.end){
            $('#touch').css('-webkit-transform','translate3d(0,'+touch.end+'px,0)'); 
            return;
        } else {
        $('#touch').css('-webkit-transform','translate3d(0,'+(touch._y+_y)+'px,0)');
        }
    })
    $('#touch').on('touchend',function(){
        touch._y += event.changedTouches[0].pageY - touch.y;
    })
    
})

var win = {
        cancelBub : function () {              
             if ( event.stopPropagation ) {            
                  event.stopPropagation();  //cancelBubble                  
              }
             else {                  
                  event.cancelBubble = true;                  
              }
        },
        stopDef : function () {              
             if ( event.preventDefault ) {                    
                  event.preventDefault();  // cancel drag      
              }
             else {                      
                  event.returnValue = false;
              }    
        },
    }
