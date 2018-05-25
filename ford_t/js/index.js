// JavaScript Document -hsd- 4.21.7 drivelist wheel back use little stack
var stage = {
    index : 1,
    chapter : 0,
    c : 0, //mouse point x
    timer : 1200,  //change page
    timetxt : 800,  //show text
    distance : 10,
    wheel : "no",    //contral use mouse wheel change page
    surrding : "no",  //contral 360 event
    onshow : 1,
    wheelTimer : 2000,
    carCol : "coll",  // colour on show in page 360
    
    stack : {
            schapter : 10,
            spush : function (init) {
                this.schapter = init;
                return this.schapter;
            },
            spop : function () {
                c = this.schapter;
                this.schapter = 10;
                return c;
            }
    },
    
    mowheel : function (e) {
        
         if ( this.wheel == "no" ) {
            return;
          } 
         else {
             stage.wheel = "no";
             var e = event;
			 //console.log(e)
             if ( e.wheelDelta < 0 ) {
                stage.changePage("next");
                //debug.clearP2();
              } 
             else {
                    stage.changePage("last");      
                   //debug.clearP2();        
              }
          }
       
    },
    mowheel_f : function (e) {  // just for firefox
         if ( this.wheel == "no" ) {
            return false;
         } 
         else {
             stage.wheel = "no";
             
             if ( e.detail > 0 ) {
                stage.changePage("next");
                //debug.clearP2();
              } 
             else {
                    stage.changePage("last");      
                   //debug.clearP2();        
              }
         }
    },
    
    changePage : function (where) {
               
        if ( where == "next" ) {
           stage.chapter += 1;
           onchapter();
        } 
        else { 
                rechapter();
                stage.chapter -= 1;
            }
        barChange();
       
    },
    
    mdown : function () {
        var e = arguments.callee.caller.arguments[0] || window.event; //reply firefox 360 event for temporary
        stage.c = e.clientX;
    },
    
    mmove : function () {
        var e = arguments.callee.caller.arguments[0] || window.event; //reply firefox 360 event for temporary
        s = stage.c - e.clientX;
        return s;
    },
    getBrower : function () {
        var brower = navigator.userAgent;

        if ( brower.indexOf("Firefox") > 0 ) {
            return "Firefox";
        }
    },
}
     //bar
     function barChange() {
        if ( stage.chapter < 4 ){
            $("#p1 img:eq(0)").attr("src","images/barS.png");
            $("#p2 img:eq(0)").attr("src","images/bar.png");
            $("#p3 img:eq(0)").attr("src","images/bar.png");
            $(".h").css("display","block");
            $(".s").css("display","none");
            $(".d").css("display","none");
        }
        else if ( stage.chapter == 4 ) {
            $("#p2 img:eq(0)").attr("src","images/barS.png");
            $("#p1 img:eq(0)").attr("src","images/bar.png");
            $("#p3 img:eq(0)").attr("src","images/bar.png");
            $(".s").css("display","block");
            $(".h").css("display","none");
            $(".d").css("display","none");
        }
        else if ( stage.chapter > 4 ) {
            $("#p3 img:eq(0)").attr("src","images/barS.png");
            $("#p2 img:eq(0)").attr("src","images/bar.png");
            $("#p1 img:eq(0)").attr("src","images/bar.png");
            $(".s").css("display","none");
            $(".h").css("display","none");
            $(".d").css("display","block");
        }
    }
    
    //Click change chapter
    function barClick() {
        $("#p1").click(function(){
            stage.chapter = 0;
            stage.wheel = "no";
            debug.clearP2();
            barChange();
            page.pagetwohide();  
            driver.hidedrive();
        })
        $("#p2").click(function(){
            stage.chapter = 4;
            stage.wheel = "no";
            debug.clearP2();
            barChange();
            page.pagetwoshow();   
            driver.hidedrive();         
        })
        $("#p3").click(function(){
            barChange();  
        })
    }
    
    //change chapters
    function onchapter() {
        var c = stage.chapter;
        switch ( c ) {
            case 1 : part.partf();break;
            case 2 : part.parts();break;
            case 3 : part.partt(); break;
            case 4 : page.pagetwoshow();break;
            case 5 : driver.showdrive();break;
            default : { stage.chapter = c - 1;
                        stage.wheel = 0; }
                        break;
        }
       
    }
    
    //return chapters
    function rechapter() {
        var c = stage.chapter;
        switch ( c ) {
            case 1 : rpart.partf();break;
            case 2 : rpart.parts();break;
            case 3 : rpart.partt(); break;
            case 4 : page.pagetwohide();break;
            case 5 : driver.hidedrive();break;
            default : { stage.chapter = c + 1;
                        stage.wheel = 0; }
                        break;
        }
       
    }
    
    //Building page use factor of pic(fixed)
    function building(){  
        var ww = $(document).width();
        var wh = $(document).height();
        //common images
        var l = (ww - 1920)/2;
        var t = (wh - 1080)/2;
        //360 cars
        var x = (ww - 1350)/2;
        var y = (wh - 675)/2;
            
            $(".surdimg").css("width",1350);
            $(".surdimg").css("height",675);
            $(".surdimg").css("left",x);  
            $(".surdimg").css("top",y); 
            
            $(".commonimg").css("width",1920);
            $(".commonimg").css("height",1080);
            $(".commonimg").css("left",l);  
            $(".commonimg").css("top",t); 
            
        //part text box
        $(".ponebox").css("width",ww);
        $(".ponebox").css("height",wh);
        //content text box
        $(".content_st").css("width",ww);
        $(".content_st").css("height",wh);
    }
    
    //page one start    
    function pageoneshow() {
        $(".carh").css("width",'100%');        
        $(".content_st").show();
        $(".texth").fadeIn(stage.timer);
        
        var t = setInterval( function() {
            $(".buttonh").fadeIn(stage.timer);
            clearInterval(t);
        },1000);
        
        $(".wmouse").fadeIn("slow",function(e){
            stage.chapter = 0;
            stage.wheel = 0;
        });       
    }
    
    //chapter change parts move on
    var part = {
        //page one part fisrt
        partf : function() {
           //s $(".content_st").fadeOut("slow");
            $(".carf").css("width",'100%');
            $(".carh").animate({width:0},stage.timer,function(e){
                $(".fl").fadeIn(stage.timetxt,function(e){
                        $(".ft").fadeIn(stage.timetxt,function(e){
                            $(".fb").fadeIn(stage.timetxt,function(e){
                                stage.wheel = 0;
                            });
                        })
                    });
            });
        },
        //page one part second
        parts : function () {
            $(".cars").css("width",'100%');      
            $(".carf").animate({width:0},stage.timer,function(e){
                $(".sl").fadeIn(stage.timer,function(e){
                        $(".st").fadeIn(stage.timetxt,function(e){
                            $(".sb").fadeIn(stage.timetxt,function(e){
                                stage.wheel = 0;
                            });
                        })
                    });
            });
        },
        //page one part third
        partt : function () {
            $(".cart").css("width",'100%');
            $(".cars").animate({width:0},stage.timer,function(e){
                $(".tl").fadeIn(stage.timer,function(e){
                        $(".tt").fadeIn(stage.timetxt,function(e){
                            $(".tb").fadeIn(stage.timetxt,function(e){
                                stage.wheel = 0;
                            });
                        })
                    });
            });
        }
    }
        //return chapters 
    var rpart = {
        //page one part fisrt
        partf : function() {
            $(".carf").css("width",'100%');
            $(".carh").animate({width:"100%"},stage.timer,function(e){
                stage.wheel = 0;
            });
        },
        //page one part second
        parts : function () {
            $(".cars").css("width",'100%');      
            $(".carf").animate({width:"100%"},stage.timer,function(e){
                stage.wheel = 0;
            });
        },
        //page one part third
        partt : function () {
            $(".cart").css("width",'100%');
            $(".cars").animate({width:"100%"},stage.timer,function(e){
                stage.wheel = 0;
            });
        }
    }
        //page action move on or back
    var page = {
        //page two part one show
        pagetwoshow : function() {
            if ( stage.chapter == 0 )s
               // $(".content_st").fadeOut();
            else {
                     $(".textf").hide();
                     $(".texts").hide();
                     $(".textt").hide();
                }
            //return white color car
            $("#surdimg").attr({src:"images/coll/08.png"});
            $(".col").css("width",'50px');
            $(".coll").css("width",'80px');
            stage.carCol = "coll";
            //loading cars
            load_img('coll');
            //build surrounding page
            $(".car360").css({"width":"100%","height":"100%"});
            $(".mouse_360").css("display","block");
            $(".wmouse").fadeOut("fast");
            $(".pageone").animate({height:0},stage.timer);
            
            var t = setInterval( function() {
                $(".text360").fadeIn(stage.timer,function(e){
                    stage.chapter = 4;  
                    stage.wheel = 0;
                });
                  
                colbar.barshow();
                clearInterval(t);
            },stage.timer);
        },
        //page two part one hidden
        pagetwohide : function () {       
            $(".pageone").animate({height:'100%'},stage.timer);
            $(".mouse_360").css("display","none");     
            $(".text360").hide();
            $(".t").hide();
            colbar.barhide();
            
            debug.returnPart();
    
            $(".content_st").fadeIn(stage.timer);
            $(".carh").css("width","100%");
            $(".carf").css("width","100%");
            $(".cas").css("width","100%");
            $(".cart").css("width","100%");
            $(".textf").hide();
            $(".texts").hide();
            $(".textt").hide();
       
            $(".wmouse").fadeIn("slow",function(e){
                stage.chapter = 0;
                stage.wheel = 0;
            });
        }
    }
    //pagesecond 360 action function
    function startpages() {
        $(".surdimg").bind("mousedown",surround);
        $(".surdimg").bind("mouseup",edistance);
    }
    function surround () {  //handle mousedown
          stage.mdown();    //record point x
          debug.clearP2();
          $(".text360").css("display","none");
          $(".surdimg").css("cursor","ew-resize");
          if ( stage.surrding == "no" ) {
             return 0;
          } 
          else {
              $(".surdimg").bind("mousemove",distance);      
          }
          
          win.stopDef();
          win.cancelBub();

    }
    function distance() {  
   
    var urlstr =  $("#surdimg").attr("src");
        urlstr = Number(urlstr.slice(12,14)); // pic right now not good to get it
        
        if( stage.mmove() > stage.distance ) {    
           stage.mdown();    // Revert point.x
               urlstr += 1;  // turn right
               //choosetext(urlstr); //actions when surrounding car
               if ( urlstr > 72 ) { urlstr = 0 };  // tail return head 00            
               if ( urlstr < 10 ) urlstr = "0" + urlstr; // not good turn to two string
           $("#surdimg").attr({src:"images/"+ stage.carCol + "/" + urlstr + ".png"});
            }
        else if ( stage.mmove() < -stage.distance ) {
           stage.mdown();
               urlstr -= 1;  // turn left
               //choosetext(urlstr);
               if ( urlstr < 0 ) { urlstr = 72 };   // head return tail 72
               if ( urlstr < 10 ) urlstr = "0" + urlstr; 
           $("#surdimg").attr({src:"images/"+ stage.carCol + "/" + urlstr + ".png"});
            }  
            
            win.stopDef();
            win.cancelBub();
            
    }   
    function edistance() {  //handle mouseup
        $(".surdimg").unbind("mousemove",distance);
        $(".surdimg").css("cursor","default");
    }
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
    //pagesecond text box show
    function choosetext(str) {
        if ( str > 1 && str < 14 ) {
            $(".rt1").fadeIn("show");
            $(".rt2").fadeOut("fast");
            $(".rt3").fadeOut("fast");
            $(".rt4").fadeOut("fast");
            $(".rt5").fadeOut("fast");
            stage.onshow = 1;
        }
        else if ( str > 15 && str < 28 ) {
            $(".rt2").fadeIn("fast");
            $(".rt1").fadeOut("fast");
            $(".rt3").fadeOut("fast");
            $(".rt4").fadeOut("fast");
            $(".rt5").fadeOut("fast");
        }
        else if ( str > 30 && str < 45 ) {
             $(".rt3").fadeIn("fast");
             $(".rt2").fadeOut("fast");
             $(".rt1").fadeOut("slow");
             $(".rt4").fadeOut("fast");
             $(".rt5").fadeOut("fast");
             stage.onshow = 2;
        } 
        else if ( str > 50 && str < 60 ) {
             $(".rt3").fadeOut("fast");
             $(".rt2").fadeOut("fast");
             $(".rt1").fadeOut("fast");
             $(".rt4").fadeIn("slow");
             $(".rt5").fadeOut("fast");
             stage.onshow = 3;
        }
        else if ( str > 60 && str < 72 ) {
             $(".rt5").fadeIn("slow");
             $(".rt2").fadeOut("fast");
             $(".rt1").fadeOut("fast");
             $(".rt4").fadeOut("fast");
             $(".rt3").fadeOut("fast");
        } 
        else {
            $(".rt3").fadeOut("fast");
            $(".rt2").fadeOut("fast");
            $(".rt1").fadeOut("fast");
            $(".rt4").fadeOut("fast");
            $(".rt5").fadeOut("fast");
        }

    }
    //pagetwo dialog
    function diaClose() {
        $(".dialog").fadeOut("fast");
    }
    function diaShow() {
        if ( stage.onshow == 1 ) {
            $(".show").attr({src:"images/engine.jpg"});
        }
        else if( stage.onshow == 2 ) {
            $(".show").attr({src:"images/seat.jpg"});
        }
        else if ( stage.onshow == 3 ) {
            $(".show").attr({src:"images/window.jpg"});
        }
        $(".dialog").fadeIn("slow");
    }
    //older drive
var driver = {
    index : 0,
    showdrive :  function() {
        if ( this.index == 1 ) return;
        
        $(".txtdr").fadeIn();
        $(".drive").show();
        $(".drive").css("height",0);
        $(".drive").animate({height:'200px'});
        $(".struct").animate({top:"-200px"},function(e){
                    stage.wheel = 0;
        });
        
        this.index = 1;
    },
    hidedrive :  function() {
        if ( this.index == 0 ) return;
        
        $(".txtdr").fadeOut();
        barChange();
        
        if ( stage.stack.schapter < 4 ) {
            stage.chapter = stage.stack.spop() + 1;
        }
        
        $(".drive").animate({height:'0px'});
        $(".struct").animate({top:"0px"},function(e){
                    stage.wheel = 0;
        });
       
        this.index = 0;
    }
}
     function isPhone(v) {
        var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
        v = Number(v);
        
        if (reg.test(v)) {
            return true;
          } 
        else {
            return false;
          }  
    }
    
    var pro = [
        {
            chinese : "北京市",
            city : Array = ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县", "延庆镇"]
        },
        {
            chinese : "天津市",
            city : Array = ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "蓟县", "宁河县", "芦台镇", "静海县", "静海镇"]
            },
        {
            chinese : "上海市",
            city : Array = ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县", "城桥镇"]
            },
        {
            chinese : "重庆市",
            city : Array = ["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "合川市", "永川区市", "江津市", "南川市", "綦江县", "潼南县", "铜梁县", "大足县", "荣昌县", "璧山县", "垫江县", "武隆县", "丰都县", "城口县", "梁平县", "开县", "巫溪县", "巫山县", "奉节县", "云阳县", "忠县", "石柱土家族自治县", "彭水苗族土家族自治县", "酉阳土家族苗族自治县", "秀山土家族苗族自治县"]
            },
        {
            chinese : "河北省",
            city : Array = ["石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "保定市", "衡水市", "沧州市", "邢台市", "邯郸市"]
            },
        {
            chinese : "山西省",
            city : Array = ["太原市", "朔州市", "大同市", "阳泉市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市", "吕梁市", "运城市"]
            },
         {
            chinese : "内蒙古",
            city : Array = ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "呼伦贝尔市", "鄂尔多斯市", "乌兰察布市", "巴彦淖尔市", "兴安盟", "锡林郭勒盟", "阿拉善盟"]
            },
         {
            chinese : "辽宁省",
            city : Array = ["沈阳市", "朝阳市", "阜新市", "铁岭市", "抚顺市", "本溪市", "辽阳市", "鞍山市", "丹东市", "大连市", "营口市", "盘锦市", "锦州市", "葫芦岛市"]
            },
         {
            chinese : "吉林省",
            city : Array = ["长春市", "白城市", "松原市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "延边州"]
            },
         {
            chinese : "黑龙江省",
            city : Array = ["哈尔滨市", "齐齐哈尔市", "七台河市", "黑河市", "大庆市", "鹤岗市", "伊春市", "佳木斯市", "双鸭山市", "鸡西市", "牡丹江市", "绥化市", "大兴安岭地区"]
            },
            
         {
            chinese : "江苏省",
            city : Array = ["南京市", "徐州市", "连云港市", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市", "南通市", "镇江市", "常州市", "无锡市", "苏州市"]
            },
         {
            chinese : "浙江省",
            city : Array = ["杭州市", "湖州市", "嘉兴市", "舟山市", "宁波市", "绍兴市", "衢州市", "金华市", "台州市", "温州市", "丽水市"]
            },
         {
            chinese : "安徽省",
            city : Array =  ["合肥市", "宿州市", "淮北市", "亳州市", "阜阳市", "蚌埠市", "淮南市", "滁州市", "马鞍山市", "芜湖市", "铜陵市", "安庆市", "黄山市", "六安市", "巢湖市", "池州市", "宣城市"]
            },
         {
            chinese : "福建省",
            city : Array = ["福州市", "南平市", "莆田市", "三明市", "泉州市", "厦门市", "漳州市", "龙岩市", "宁德市"]
            },
         
         {
            chinese : "江西省",
            city : Array = ["南昌市", "九江市", "景德镇市", "鹰潭市", "新余市", "萍乡市", "赣州市", "上饶市", "抚州市", "宜春市", "吉安市"]
            },
         {
            chinese : "山东省",
            city : Array = ["济南市", "青岛市", "聊城市", "德州市", "东营市", "淄博市", "潍坊市", "烟台市", "威海市", "日照市", "临沂市", "枣庄市", "济宁市", "泰安市", "莱芜市", "滨州市", "菏泽市"]
            },
            
            
         {
            chinese : "河南省",
            city : Array = ["郑州市", "开封市", "三门峡市", "洛阳市", "焦作市", "新乡市", "鹤壁市", "安阳市", "濮阳市", "商丘市", "许昌市", "漯河市", "平顶山市", "南阳市", "信阳市", "周口市", "驻马店市"]
            },
         {
            chinese : "湖北省",
            city : Array = ["武汉市", "十堰市", "襄樊市", "荆门市", "孝感市", "黄冈市", "鄂州市", "黄石市", "咸宁市", "荆州市", "宜昌市", "随州市", "省直辖县级行政单位", "恩施州"]
            },
         {
            chinese : "湖南省",
            city : Array = ["长沙市", "张家界市", "常德市", "益阳市", "岳阳市", "株洲市", "湘潭市", "衡阳市", "郴州市", "永州市", "邵阳市", "怀化市", "娄底市", "湘西州"]
            },
         {
            chinese : "广东省",
            city : Array = ["广州市", "深圳市", "清远市", "韶关市", "河源市", "梅州市", "潮州市", "汕头市", "揭阳市", "汕尾市", "惠州市", "东莞市", "珠海市", "中山市", "江门市", "佛山市", "肇庆市", "云浮市", "阳江市", "茂名市", "湛江市"]
            },
         {
           chinese : "广西",
            city : Array = ["南宁市", "桂林市", "柳州市", "梧州市", "贵港市", "玉林市", "钦州市", "北海市", "防城港市", "崇左市", "百色市", "河池市", "来宾市", "贺州市"]
            },
                        
         {
            chinese : "四川省",
            city : Array = ["成都市", "广元市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市", "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中市", "达州市", "资阳市", "眉山市", "雅安市", "阿坝州", "甘孜州", "凉山州"]
            },
         {
            chinese : "贵州省",
            city : Array = ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节地区", "铜仁地区", "黔东南州", "黔南州", "黔西南州"]
            },
         {
            chinese : "云南省",
            city : Array = ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "思茅市", "临沧市", "德宏州", "怒江州", "迪庆州", "大理州", "楚雄州", "红河州", "文山州", "西双版纳州"]
            },
         {
            chinese : "西藏",
            city : Array = ["拉萨市", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区"]
            },
                        
         {
            chinese : "陕西省",
            city : Array = ["西安市", "延安市", "铜川市", "渭南市", "咸阳市", "宝鸡市", "汉中市", "榆林市", "安康市", "商洛市"]
            },
         {
            chinese : "甘肃省",
            city : Array = ["兰州市", "嘉峪关市", "白银市", "天水市", "武威市", "酒泉市", "张掖市", "庆阳市", "平凉市", "定西市", "陇南市", "临夏州", "甘南州"]
            },
         {
            chinese : "青海省",
            city : Array = ["西宁市", "海东地区", "海北州", "海南州", "黄南州", "果洛州", "玉树州", "海西州"]
            },
         {
            chinese : "宁夏",
            city : Array = ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"]
            },
                        
         {
            chinese : "新疆",
            city : Array = ["乌鲁木齐市", "克拉玛依市", "自治区直辖县级行政单位", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区", "哈密地区", "克孜勒苏柯州", "博尔塔拉州", "昌吉州", "巴音郭楞州", "伊犁州", "塔城地区", "阿勒泰地区"]
            },
         {
            chinese : "香港",
            city : Array = ["香港特别行政区"]
            },
         {
            chinese : "澳门",
            city : Array = ["澳门特别行政区"]
            },
         {
            chinese : "台湾省",
            city : Array =  [" "]
            }
           
    ];
     
    function findp() {
            var p = document.getElementById("province").value;
            var html = "";
            
            $('#city').empty();
            for ( var i = 0; i < pro.length; i++ ) {

                if ( pro[i].chinese == p ) {
                    for ( var j = 0; j < pro[i].city.length; j++ ) { 
                        $('#city').append("<option value='" + pro[i].city[j] + "'>" + pro[i].city[j] + "</option>");
                    }
                }
            }
        }
        
    //input still like placehold attr  list
    $("input").on("focusin",function(){
        var tag = $(this).attr("id"); 
            tag = "#" + tag;
        
        if ( $(tag).val() == "姓名" ||  $(tag).val()  == "手机号码" || $(tag).val()  == "e-mail" || $(tag).val() == "输入有误" ) {
             $(this).val(""); 
             $(this).css("color","black");
        }
    });
    $("input").on("focusout",function(){
        var tage = $(this).attr("id"); 
            tag = "#" + tage;
        var flag = $(this).attr("data-val"); 
            
        if ( $(tag).val() == "") {
             $(this).val(flag); 
             $(this).css("color","#787878");
        }
    });
    function osubmit() {

        var n = $("#name").val();
        var p = $("#phone").val();
        
        if ( n == "" || n == "姓名" ) {
            $("#name").val("输入有误");
            $("#name").css("color","red");
        }
        if ( !isPhone(p) ) {
            $("#phone").val("输入有误");
            $("#phone").css("color","red");
        }

    }
    
var debug = {
    clearP2 : function () {
        $(".rt3").fadeOut("fast");
        $(".rt2").fadeOut("fast");
        $(".rt1").fadeOut("fast");
        $(".rt4").fadeOut("fast");
        $(".rt5").fadeOut("fast");
    },
    returnPart : function () {
       $(".prt").hide();
    }
    
}

var colbar = {
    barshow : function() {
        $(".coltab").fadeIn("fast");
    },
    barhide : function() {
        $(".coltab").hide();
    },
    colbar  : function() { 
        $(".col").click(function(){
            
               stage.surrding = "no";
           
           var id = $(this).attr("id");
           var target = "#" + stage.carCol;
               $(target).css("width","50px");
           
           stage.carCol = id;
           
           var target = "#" + stage.carCol;
               $(target).css("width","80px");
          
           $("#surdimg").attr({src:"images/"+ stage.carCol + "/" + "00" + ".png"});
           load_img(stage.carCol);
        });
    }
}

function load_img(name) {
    var imgs = [];
    for (var i = 0; i < 10; ++i) {
        imgs[imgs.length] = 'images/'+name+'/'+'0'+i+'.png';
    }
    for (var i = 10; i < 73; ++i) {
        imgs[imgs.length] = 'images/'+name+'/'+i+'.png';
    }
    $('#loading').show();
    loadResources(imgs, function (n, i, img) {
        if (i != n) return;
        $('#loading').hide();
        stage.surrding = 0;
    })
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
        img.onload = loaded;
        img.onabort = loaded;
        img.onerror = loaded;
        img.src = resourceDir + urls[i];
    }
}