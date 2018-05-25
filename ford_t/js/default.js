// JavaScript Document

var stage = {
    index : 1,
    c : 0,
    timetxt : 1800,
    distance : 100,
    wheel : 0,
    mowheel : function () {
         var e = event;
         if (stage.wheel == "no" ) return false;
         
         if ( e.wheelDelta < 0 ) {
            stage.index += 1;
            stage.changePage("next");
            stage.wheel = "no";
         }
         else {
            stage.index -= 1;
            stage.changePage("last");
            stage.wheel = "no";
         }
    },
    
    changePage : function (where) {

        if ( where == "next" ) {          
            if ( stage.index == 2 ) {
                secondpageshow();
                barChange();
            }
            else if ( stage.index == 3 ) {
                barChange();
            }
            else stage.index = 3;
        }
        else {
            if ( stage.index == 2 ) {
                 barChange();
            }
            else if ( stage.index == 1 ) {
                initialize();
                pageoneshow();
                barChange();
            }
            else stage.index = 1;
        }
    },    
    
    mdown : function () {
        stage.c = event.clientX;
    },
    
    mmove : function () {
        s = stage.c - event.clientX;
        return s;
    }
}
     function barChange() {
        if ( stage.index <= 1){
            $("#p1 img:eq(0)").attr("src","images/barS.png");
            $("#p2 img:eq(0)").attr("src","images/bar.png");
            $("#p3 img:eq(0)").attr("src","images/bar.png");
            $(".h").css("display","block");
            $(".s").css("display","none");
            stage.index = 1;
            var int = setInterval(function(){
                stage.wheel = 0;
                clearInterval(int);
            },stage.timetxt)
        }
        else if ( stage.index == 2) {
            $("#p2 img:eq(0)").attr("src","images/barS.png");
            $("#p1 img:eq(0)").attr("src","images/bar.png");
            $("#p3 img:eq(0)").attr("src","images/bar.png");
            $(".s").css("display","block");
            $(".h").css("display","none");
            stage.index = 2;
            var int = setInterval(function(){
                stage.wheel = 0;
                clearInterval(int);
            },stage.timetxt)
        }
        else if ( stage.index >= 3) {
            $("#p3 img:eq(0)").attr("src","images/barS.png");
            $("#p2 img:eq(0)").attr("src","images/bar.png");
            $("#p1 img:eq(0)").attr("src","images/bar.png");
            $(".s").css("display","none");
            $(".h").css("display","none");
            stage.index = 3;
            var int = setInterval(function(){
                stage.wheel = 0;
                clearInterval(int);
            },stage.timetxt)
        }
    }
    
    function barClick() {
        $("#p1").click(function(){
            stage.index = 1;
            barChange();
            initialize();
            pageoneshow();
        })
        $("#p2").click(function(){
            stage.index = 2;
            barChange();
            secondpageshow();
        })
        $("#p3").click(function(){
            stage.index = 3;
            barChange();  
        })
    }
    //initialize allpage
    function initialize() {
        $(".texth").css("display","none");
        $(".buttonh").css("display","none");
        $(".textf").css("display","none");
        $(".texts").css("display","none");
        $(".textt").css("display","none");
        $(".text360").css("display","none");
        $(".t").css("display","none");
        $(".dialog").css("display","none");
        $(".mouse_360").css("display","none");
        
        $(".surroundpg").animate({height:'0px'},stage.timetxt);
        
        $(".carfpg").css("width","0px");
        $(".carspg").css("width","0px");
        $(".cartpg").css("width","0px");
    }

    //pageone actions part one
    function pageoneshow() {
        $(".content_st").show();
        $(".texth").fadeIn(stage.timetxt);
        var t = setInterval( function() {
            $(".buttonh").fadeIn(stage.timetxt);
            clearInterval(t);
        },1000);
    }
    //pageone button start 
    $(".buttonh").click(function(){
        optwof();
        });
    //pageone actions part two f
    function optwof() {
        $(".carfpg").css("display","block");
        $(".carfpg").animate({width:'100%'},stage.timetxt);
        var t = setInterval( function() {
            $(".textf").fadeIn(stage.timetxt);
            setTimeout(optwos,stage.timetxt);
            clearInterval(t);
        },stage.timetxt);
    }
    //pageone actions part two s
    function optwos() {
        $(".carspg").css("display","block");
        $(".carspg").animate({width:'100%'},stage.timetxt);
        var t = setInterval( function() {
            $(".texts").fadeIn(stage.timetxt);   
            setTimeout(optwot,stage.timetxt);
            clearInterval(t);
        },stage.timetxt);
    }
    //pageone actions part two t
    function optwot() {
        $(".cartpg").css("display","block");
        $(".cartpg").animate({width:'100%'},stage.timetxt);
        var t = setInterval( function() {
            $(".textt").fadeIn(stage.timetxt);
            clearInterval(t);
        },stage.timetxt);
    }
    //pagesecond 360 page show function
    function secondpageshow() {
        $(".pagesecond").css("display","block");
        $(".surroundpg").css("display","block");
        $(".mouse_360").css("display","block");
        $(".surroundpg").animate({height:'100%'},stage.timetxt);
        var t = setInterval( function() {
            $(".text360").fadeIn(stage.timetxt);
            clearInterval(t);
        },stage.timetxt);
        setTimeout(startpages,stage.timetxt);
    }
    //Close dialog
    function diaClose() {
        $(".dialog").fadeOut("fast");
    }
    function diaShow() {
        $(".dialog").fadeIn("slow");
    }
    //pagesecond text box show
    function choosetext() {
        var str = $(".car360").css("background-image");
        
        if ( str.match(/1/g) == 1) {
            $(".rt1").fadeIn("slow");
            $(".rt2").fadeOut("fast");
            $(".rt3").fadeOut("fast");
        }
            else if ( str.match(/2/g) == 2) {
                $(".rt2").fadeIn("slow");
                $(".rt1").fadeOut("fast");
                $(".rt3").fadeOut("fast");
            }
                else if ( str.match(/3/g) == 3) {
                     $(".rt3").fadeIn("slow");
                     $(".rt2").fadeOut("fast");
                     $(".rt1").fadeOut("slow");
                }
    }
    //pagesecond 360 action test1 function
    function startpages() {
        $(".surroundpg").bind("mousedown",surround);
        $(".surroundpg").bind("mouseup",edistance);
    }
    function surround () {
          stage.mdown();
          $(".text360").css("display","none");
          $(".surroundpg").css("cursor","ew-resize");
          $(".surroundpg").bind("mousemove",distance);
          
          event.preventDefault();   // cancel bubble
          event.stopPropagation();
    }
    function distance(){ 
     var urlstr =  $(".car360").css("background-image");
         urlstr = urlstr.replace(/"/g,'');    // remove all "
         num = urlstr.length;
         num = Number(num - 6);
         urlstr = urlstr[num];
                   
        if( stage.mmove() > stage.distance ) {
           stage.mdown();
               urlstr -= 1;
               if ( urlstr <= 1 ) { urlstr = 1}
                
           $(".car360").css("background-image","url(./images/r" + urlstr + ".jpg)");
           choosetext();
            }
        else if ( stage.mmove() < -stage.distance ) {
           stage.mdown();
               urlstr += 1;
               if ( urlstr >= 3 ) { urlstr = 3}
                
           $(".car360").css("background-image","url(./images/r" + urlstr + ".jpg)");
           choosetext();
            }
    }   
    function edistance(){
        $(".surroundpg").unbind("mousemove",distance);
        $(".surroundpg").css("cursor","default");
    }
