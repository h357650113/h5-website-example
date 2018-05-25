// stage planar dot move by hsd 2016/3/28 email:h357650113@hotmail.com stagePlanar 1.00.1
function PlanarMove(Arr,time,ease){
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
    // 预处理 函数 绘制 各个 对象 的起点位置
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
    // 点 对象 操作 public:
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

function dotsDate(dotsclass,wrapclass,lineclass,wrap,line){
    var ballsDot = [
            {   
                name : 'top',
                client : {
                    x : 80,
                    y : 20
                },
                css3 : function(){ 
                    return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
                },
                classname : dotsclass
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
                classname : dotsclass
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
                classname : dotsclass
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
                classname : dotsclass
            },
            {
                name : wrap,
                client : {
                    x : -win.w/2,
                    y : 0
                },
                css3 : function(){ 
                    return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
                },
                classname : wrapclass
            },
            {
                name : line,
                client : {
                    x : win.w/2 + 110,
                    y : 0
                },
                css3 : function(){ 
                    return 'translate3d(' + this.client.x + 'px,' + this.client.y + 'px,0)' 
                },
                classname :lineclass
            }
        ]
        
        return ballsDot;
}

var BallsList = [];
var ObjectBalls = [];
function buildDots(len){
    for(var i = 0; i < len; i ++){
        BallsList[i] = dotsDate('dial'+i,'box_cont'+i,'box_cont_img'+i,'dial_wrap'+i,'dial_img'+i);
        ObjectBalls[i] = new PlanarMove(BallsList[i],.3,'ease');
    }
}
buildDots(9);

// user content box
function userContent(){
    var _this = this;
    _this.showCont = function(index){
        $('.user_cont:eq(' + index + ')').css({'opacity':1, 'height':'105px'});
        $('.time_cont:eq(' + index + ')').css({'-webkit-transform':'translate3d(0,0,0)','opacity':1 });
        $('.text_cont:eq(' + index + ')').css({'-webkit-transform':'translate3d(0,0,0)','opacity':1 });    
    }
   _this.hideCont = function(){
        $('.user_cont').css({'opacity':0,'height':'0px'});
        $('.time_cont').css({'-webkit-transform':'translate3d(0,-50px,0)','opacity':0 });
        $('.text_cont').css({'-webkit-transform':'translate3d(0,50px,0)','opacity':0 });        
    }
    $('.user_cont').css({'-webkit-transition':'opacity ease .3s','opacity':0});
    $('.time_cont').css({'-webkit-transform':'translate3d(0,-50px,0)','-webkit-transition':'all ease .3s','opacity':0 });
    $('.text_cont').css({'-webkit-transform':'translate3d(0,50px,0)','-webkit-transition':'all ease .3s','opacity':0 });
    // ajax here find user date
}
var userObject = new userContent();

// user exhibition img show
function exhCont(){
    var _this = this;
    var imgIndex = 0;
    var contIndex = 0;
    
    function img() {
        var flag;
            flag = imgIndex;
            imgIndex += 1;
        return flag;
    }
    function cont() {
        var flag;
            flag = contIndex;
            contIndex += 1;
        return flag;
    }
    
    _this.jContorImg = function (str) {
        if ( str == 'cont' ) {
            var flag = Number(cont());
            exCont(flag);
        } else if ( str == 'img') {
            var flag = Number(img());
            exImg(flag);
        }
    }
    
   function exCont(index){
        $('.exh_bg:eq(' + index + ')').css({'-webkit-transform':'scale(1)','opacity':1});
        setTimeout(function(){
            $('.exh_l:eq(' + index + ')').css({'-webkit-transform':'scale(1)','opacity':1});
            $('.exh_r:eq(' + index + ')').css({'-webkit-transform':'scale(1)','opacity':1});
        },300)
    }
   function exImg(index){
        $('.exh_stud img:eq(' + index + ')').css({'opacity':1});
    }
}
var exhObj = new exhCont();