// JavaScript Document, Stage of plane element control strate struct, 2016.3.25 by hsd email:h357650113@hotmail.com
// 点集 对象 存储 数据格式
// 平面元素运动控制器
var win = {
		w : $(window).width(),
		h: $(window).height()
}

function roundBox(Arr,time,ease){
    var TIMER;     // arr = [ { name : 122, type : 'ball', client : { x : 0, y : 0 }, css3 : function(){ return string } } ]
    var ease = 'ease';
    var Name = false;
    var arrs = [];
    var stockClassName = [];
    
    var classList = [];

    //预处理部分 参数 存放
    for(var i = 0; i < arguments.length; i++){
        if(typeof arguments[i] == 'number'){
            TIMER = arguments[i];
        }
        if(typeof arguments[i] == 'object'){
            arrs = arguments[i];
        }
        if(typeof arguments[i] == 'string'){
            if( arguments[i] == 'ease' || arguments[i] == 'linear' ){
                ease = arguments[i];
            }
        }
    }
    var timer = TIMER * 1000; // callback time
    var _this = this;
    // 对象 参量和数据 存储结构
    for(var i = 0; i < arrs.length; i++){
        arrs[i].stack = { x : 0, y : 0 };
        arrs[i].changeClient = function (x,y) {
                if(typeof x == 'number'){ 
                    this.stack.x = this.client.x; 
                    this.client.x = x 
                };
                if(typeof y == 'number'){ 
                    this.stack.y = this.client.y; 
                    this.client.y = y 
                };
        }
    }
    // 预处理函数
    // stockClassName 类名 存放 堆栈， 无重复 记录 类名 个数
    stockClassName[0] = arrs[0].classname;
    // 预处理 对象 识别错误 补充重要属性
    for(var j = 0; j < arrs.length; j ++){
        if(!arrs[j].css3){
            arrs[j].css3 = function(){ 
                return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
            }
        }
        // 无重复类名 压栈
        for(var i = 0; i < stockClassName.length; i++){
            if( arrs[j].classname == stockClassName[i] ){
                break;
            } 
            if( i == stockClassName.length - 1 ){
                stockClassName.push(arrs[j].classname);
            }
        }
    }
    // 类以类名形式 从 输入数列中 分离
    for( var i = 0; i < stockClassName.length; i++ ){
        classList[i] = { name : stockClassName[i], object : [] };
        for(var j = 0; j < arrs.length; j ++){
            if(stockClassName[i] == arrs[j].classname){
                classList[i].object.push(arrs[j]);
            }
        }
    }
    // 预处理 class 绘制 各个 对象 的起点位置
    for(var i = 0; i < classList.length; i ++){
        for(var j = 0; j < classList[i].object.length; j ++){
            var leng = document.getElementsByClassName(classList[i].name).length;
            for(var z = 0; z < leng; z++){
                document.getElementsByClassName(classList[i].name).item(z).style.WebkitTransform = classList[i].object[z].css3();
                document.getElementsByClassName(classList[i].name).item(z).style.WebkitTransition = 'all ' + ease + ' ' + TIMER +'s';
            }
        }
    }
    
    // 群 整体 基础运动 函数
    function groupAction(type){
        for(var i = 0; i < document.getElementsByClassName(type).length; i ++ ){
            document.getElementsByClassName(type).item(i).style.WebkitTransform = arrs[i].css3();
        }
    }
    function BallsAction(name){
        for(var i = 0; i < document.getElementsByClassName(name).length; i ++ ){
            document.getElementsByClassName(name).item(i).style.WebkitTransform = arrs[i].css3();
        }
    }
    function changeBallsClient(name,x,y){
        for(var i = 0 ; i < arrs.length; i++){
                if( arrs[i].classname == name ){
                    arrs[i].changeClient(x,y);
                };
            }
    }
    // 个体 以 id 为标志的 单独操作函数
    function changeSingleEleClient(name,x,y){
        for(var i = 0 ; i < arrs.length; i++){
                if( arrs[i].name == name ){
                    arrs[i].changeClient(x,y);
                };
            }
    }
    function SingleAction(name){ 
        for(var i = 0 ; i < arrs.length; i++){
                if( arrs[i].name == name ){
                    document.getElementById(name).style.WebkitTransform = arrs[i].css3();
                };
        }
    }
    // 点 对象 操作
    _this.moveBalls = {
        // id 操作
        SingleMove : function (name,x,y,callback) {
            changeSingleEleClient(name,x,y);
            SingleAction(name);
            setTimeout(callback,timer);
        },
        // class 对象操作
        AllBallsToCorner : function (name,x,y,callback) {
            changeBallsClient(name,x,y);
            BallsAction(name);
            setTimeout(callback,timer);
        },
        AllBallsBackStep : function (name,n,callback) {
            switch(n){
                case 'x' : {    for(var i = 0 ; i < arrs.length; i++){
                                    if( arrs[i].classname == name ) arrs[i].client.x = arrs[i].stack.x;
                                }
                           }; break;
                case 'y' : {    for(var i = 0 ; i < arg_rCircle.length; i++){
                                    if( arrs[i].classname == name ) arrs[i].client.y = arrs[i].stack.y;
                                }
                           }; break;
                case 'all':{    for(var i = 0 ; i < arg_rCircle.length; i++){
                                    if( arrs[i].classname == name ){
                                        arrs[i].client.x = arg_rCircle[i].stack.x;
                                        arrs[i].client.y = arg_rCircle[i].stack.y;
                                    }
                                }
                           }; break;
                default : console.log('arrguments is x, y and all'); break;
            }
            
            BallsAction(name); 
            setTimeout(callback,timer);
        }
    }
}


var arg_rCircle = [
        {   
            name : 'top',
            client : {
                x : 80,
                y : 20
            },
            css3 : function(){ 
                return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
            },
            classname : 'r_Circle'
        },
        {
            name : 'right',
            client : {
                x : -80,
                y : 20
            },
            css3 : function(){
                return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
            },
            classname : 'r_Circle'
        },
        {
            name : 'bottom',
            client : {
                x : -80,
                y : -20
            },
            css3 : function(){ 
                return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
            },
            classname : 'r_Circle'
        },
        {
            name : 'left',
            client : {
                x : 80,
                y : -20
            },
            css3 : function(){ 
                return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
            },
            classname : 'r_Circle'
        },
        {
            name : 'cont_wrap',
            client : {
                x : -win.w/2,
                y : 0
            },
            css3 : function(){ 
                return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
            },
            classname : 'cont'
        },
        {
            name : 'roundLine',
            client : {
                x : win.w/2 + 110,
                y : 0
            },
            css3 : function(){ 
                return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
            },
            classname : 'r_comm_img'
        }
    ]


var rBall = new roundBox(arg_rCircle,.3,'ease');
// 动画 平面位置 移动 动作 组

