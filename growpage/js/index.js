// JavaScript Document robort yuanqu 2016-3-24 1.00.1 by hsd h357650113@hotmail.com
// 机械控制
// page 1-3 action first style / second style; page 4-6 
var Actions = {    // 组动画 对象 -> 方法
    userCont : {
        showCont : function (timer,index) {
            setTimeout(function(){
                userObject.showCont(index);
            },timer)
        },
        hidenCont : function () {
            userObject.hideCont();
        }
    },
    page1 : {
        ballMove : function () {
            setTimeout(function(){
                rBall.moveBalls.AllBallsToCorner('r_Circle',false,0,function(){ // AllBallsToCorner use element's classname
                    rBall.moveBalls.SingleMove('cont_wrap',0,0);  // SingleMove use element's id
                    rBall.moveBalls.SingleMove('roundLine',0,0);
                    rBall.moveBalls.AllBallsToCorner('r_Circle',0,false,function(){
                        Actions.userCont.showCont(300,0);
                        });
                });},800)
        },
        ballBack : function(){
            rBall.moveBalls.SingleMove('cont_wrap',(-win.w/2),0);  //// SingleMove use element's id
                        rBall.moveBalls.SingleMove('roundLine',(win.w/2 + 110),0);
                        rBall.moveBalls.AllBallsBackStep('r_Circle','x',function(){
                            rBall.moveBalls.AllBallsBackStep('r_Circle','y',function(){
                                $('#balls_wrap').css('-webkit-transform','rotate(-180deg)');
                                setTimeout(function(){
                                rBall.moveBalls.AllBallsToCorner('r_Circle',false,0,function(){ // AllBallsToCorner use element's classname
                                    rBall.moveBalls.SingleMove('cont_wrap',0,0);  // SingleMove use element's id
                                    rBall.moveBalls.SingleMove('roundLine',0,0);
                                    rBall.moveBalls.AllBallsToCorner('r_Circle',0,false,function(){
                                        Actions.userCont.showCont(300,0);
                                        });
                                });},800)
                            });
                        });
        },
        babbyshow : function (){
            $('#babby_cricle').css('opacity',1);
            $('#babby_cricle').css('-webkit-transform','scale(.7)');
            setTimeout(function(){$('#babby_bg').addClass('ani_round')},800);
        }
    },
    endPage : {
        intoPage : function (){
            var i = 0;
            var t = setInterval(function(){
                if(i == 1){
                    $('#endPage').css({'-webkit-transform':'scale(1)','opacity':1})
                    $('#end_circle').addClass('ani_round');
                    i++;
                } else if ( i == 2 ){
                    $('.endbutt').css({'-webkit-transform':'scale(1)','opacity':1})
                    i ++;
                } else if ( i == 3 ){
                    clearInterval(t);
                } else {
                    i++;
                }
            },300)
        }
    },
    pageGoto : function () {
        $('.session:eq(' + ( PageActions.sessionIndex - 1 ) + ')').css('-webkit-transform','translateY(' + -win.h + 'px)');
    }
}

var dateAjax = {
    STARTPAGE : false,
    cd : '',
    getUserDate : function(){
        var localhost = String(window.location);
        var flag;
        var len = localhost.lenght;
        if(localhost.indexOf('#')){
            var target = localhost.indexOf('#')+1;
                flag = localhost.slice(target,len);

            window.location.href = 'http://192.168.0.221:8081/App/YQweb/GrowUp2016331/index.html#' + flag;
            //window.location.href = 'http://192.168.0.221:8081/TextInWEb/growUp/index.html#' + flag;
            flag = 'getJson.php?tid=' + flag;
        }
        $.get(flag,
            function(data,status){
                var date = (new Function("","return "+data))();     
                if(date.eid){  
                    $('#loading_text').css({'width':'290px','height':'59px','margin-left':'-145px','bottom':'-65px'});
                    $('#loading_text').html('该分享连接已经过期<br>请重新分享');
                    var i = 3; 
                    var t = setInterval(function(){
                        $('#loading_text').html('该分享连接已经过期<br>请重新分享<br>'+i);
                        
                        if(i == 0){
                            window.location.href = 'http://www.yuanqutech.com/mobile/indexmobile.html';
                        }
                        
                        i--;
                    },1000);
                    return;
                } else {
                    dateAjax.STARTPAGE = true; 
                    if(dateAjax.STARTPAGE){ setTimeout("loading.end()",500) } 
                }
                
                var index = 0;
                for(var i = 0; i < date.length; i++){
                    switch(date[i].type){
                        case 'base' : { 
                            dateAjax.cd = date[i].data.days;
                            $('.time_cont:eq(' + index + ')').html(date[i].data.activedt);
                            $('.text_cont:eq(' + index + ')').html('小白来到了我家');
                            index ++;
                        }; break;
                        case 'interaction' : {
                            if(date[i].data.firstfriend.dt) {
                                $('.time_cont:eq(' + index + ')').html(date[i].data.firstfriend.dt);
                                $('.text_cont:eq(' + index + ')').html('我添加了第一个好朋友：' + date[i].data.firstfriend.name);
                                ImgorCont.img(index-1,'img/pstudy/6.png');
                                PageActions.sessionCase[index-1] = 'img';
                                index ++;
                            } 
                            if (date[i].data.totalfriend) {
                                $('.text_cont:eq(' + index + ')').html('我已经拥有了 '+date[i].data.totalfriend+' 个好朋友了呢');  
                                ImgorCont.img(index-1,'img/pstudy/7.png');
                                PageActions.sessionCase[index-1] = 'img';
                                index ++;
                            }
                            if(date[i].data.firstvideo.dt){
                                $('.time_cont:eq(' + index + ')').html(date[i].data.firstvideo.dt);
                                $('.text_cont:eq(' + index + ')').html('我和 '+date[i].data.firstvideo.name+' 视频聊天了'); 
                                ImgorCont.cont(index-1,'img/p2/l1.png','img/p2/l11.png','img/p2/l12.png');
                                PageActions.sessionCase[index-1] = 'cont';
                                index ++; 
                            }
                            if(date[i].data.firstwav.dt){
                                $('.time_cont:eq(' + index + ')').html(date[i].data.firstwav.dt);
                                $('.text_cont:eq(' + index + ')').html('我试着给 '+date[i].data.firstwav.name+' 发了一条语音信息'); 
                                ImgorCont.cont(index-1,'img/p2/l3.png','img/p2/l31.png','img/p2/l32.png');
                                PageActions.sessionCase[index-1] = 'cont';
                                index ++;
                            }
                        }; break;
                        case 'study' : {
                            if(date[i].data.english.total){
                                $('.text_cont:eq(' + index + ')').html('我会背 ' + date[i].data.english.total + ' 个英语单词');
                                ImgorCont.img(index-1,'img/pstudy/4.png');
                                PageActions.sessionCase[index-1] = 'img';
                                index ++;
                            }
                            if(date[i].data.firstpoem.dt){
                                $('.text_cont:eq(' + index + ')').html('我会背《' + date[i].data.firstpoem.name + '》古诗偶~');
                                ImgorCont.img(index-1,'img/pstudy/1.png');
                                PageActions.sessionCase[index-1] = 'img';
                                index ++;
                            }
                            if(date[i].data.math.lesson){
                                $('.text_cont:eq(' + index + ')').html('我已经学会了 ' + date[i].data.math.lesson + ' 偶~');
                                ImgorCont.img(index-1,'img/pstudy/3.png');
                                PageActions.sessionCase[index-1] = 'img';
                                index ++;
                            }
                            if(date[i].data.poem.total){
                                $('.text_cont:eq(' + index + ')').html('我会背诵 ' + date[i].data.poem.total + ' 首古诗');
                                ImgorCont.img(index-1,'img/pstudy/2.png');
                                PageActions.sessionCase[index-1] = 'img';
                                index ++;
                            }
                        }; break;
                        case 'play' : {
                            if(date[i].data.knowledge){
                                $('.text_cont:eq(' + index + ')').html('我会背诵 ' + date[i].data.knowledge + ' 首古诗');
                                ImgorCont.img(index-1,'img/pstudy/2.png');
                                PageActions.sessionCase[index-1] = 'img';
                                index ++;
                            }
                        }; break;
                        default : break;
                    };
                }
                 
                index -= 1;
                if(index < 10){
                   var end = 9 - index;
                   for(var i = end; end >= index; end --){
                       $('.wrap_box:eq('+end+')').remove(); 
                   }
                       end = 9 - index;
                       var t = parseInt(end/3);
                       console.log(t)
                   if(t>0){
                       var leng = $('.session').length-2;
                       console.log(leng)
                       var i = 0;
                       while( i < t){
                       $('.session:eq('+leng+')').remove();
                         leng--;
                         i++;
                       }
                    }
                 }
            }        
        )                
    }
}

    document.addEventListener('touchstart',function(e){ event = e || event; event.preventDefault(); }); // prevent weixin weird event
	
	for(var i = 0; i < document.getElementsByTagName('input').length; i ++){
		document.getElementsByTagName('input').item(i).addEventListener('touchstart',function(e){
			event = e || event; event.stopPropagation();
		});
	}

$(function($){
    $('#Allstuffs').css({'width':win.w,'height':win.h});
    $('.session').css({'width':win.w,'height':win.h});

    // start web page here 
   $('.session:eq(0)').css({'display':'block','opacity':1});
})
// add listener read consumer touch events
var PageActions = {
    actionsession : 0,
    sessionCase : [],
    sessionlit : 0,
    cd : function(){
        var flag = PageActions.sessionlit;
        PageActions.sessionlit += 1;
        return PageActions.sessionCase[flag];
    },
    sessionIndex : -1,
    nextSession : function(){
        var _this = this;
        _this.hasTouch = false;
        setTimeout(function(){ 
            _this.sessionIndex += 1;
            _this.hasTouch = true;
        },3000);
        
        $('.session:eq('+PageActions.sessionIndex+')').css({'display':'block','opacity':1})
        console.log(PageActions.sessionIndex);
        /**
        var target = document.getElementsByClassName('session').item(_this.sessionIndex);
            target.style.display = 'block';
            target.style.opacity = 1;        
            **/
    },
    hasTouch : true
}
document.addEventListener('touchstart',function(){
    if(PageActions.sessionIndex == 0 && PageActions.hasTouch){
        Actions.userCont.hidenCont();
        $('.text_cont:eq(0)').html('小白陪伴了我 ' + dateAjax.cd + ' 天');
        
        Actions.page1.ballBack()
        animateInterval(Ani_page2,10);
        PageActions.nextSession();
    } else if(PageActions.sessionIndex == ($('.session').length - 1) && PageActions.hasTouch){
        Actions.pageGoto();
        Actions.endPage.intoPage();
        PageActions.nextSession();
    } else if(PageActions.sessionIndex == 1 && PageActions.hasTouch){
        Actions.pageGoto();
        pageGoto();
    } else if(PageActions.sessionIndex == 2 && PageActions.hasTouch){
        Actions.pageGoto();
        pageGoto();
    } else if(PageActions.sessionIndex == 3 && PageActions.hasTouch){
        Actions.pageGoto();
        pageGoto();
    } 
});

document.getElementById('endbutt').addEventListener('touchstart',function(){
    window.location.reload(); 
})

var Ani_page1 = [
     {  func : function(){                
            $('#roundBox').css('opacity',1);   // 实际动画队列 单动画 和 组动画 在此 排队执行
            $('#cricle').css('-webkit-transform','scale(1)')
            Actions.page1.ballMove();
        },
        timer : 10,
        order:false
     },
     { func : function(){
        $('#cricle').css('opacity',1);
        $('#p1_cb').css('-webkit-transform','scale(1)');
        $('#p1_ct').css('-webkit-transform','scale(1)');
        setTimeout(function(){
            $('#p1_cb').addClass('ani_round');
            $('#p1_r').css({'-webkit-transform':'scale(1)','opacity':1});
            },1000)
      },
      timer : 30
    },
    {
        func : function(){
            PageActions.sessionIndex = 0;  // page start touchstart
        },
        timer : 180
    }
]
var Ani_page2 = [
    {   func : function(){
            $('#cricle').css('-webkit-transform','translate3d(0,140px,0) scale(.7)')
        },
        timer : 10,
        order : false
    },
    {
        func : function(){
             $('.text_bg').css('opacity',0);
             $('#p1_l').css('margin-left','77px');
		     $('#p1_contt').css('width','0px');
             $('.cont_box').css('-webkit-transform','rotate(-180deg) scale(.7)');
             Actions.page1.babbyshow();
        },
        timer : 20
    },
    {
        func : function () {
            $('#heart').css('opacity',1);
            setTimeout(function(){
                $('#heart_jump').addClass('jumpheart');
                },800)
        },
        timer : 90
    }
]

// 横屏检测代码
window.addEventListener("orientationchange", function() {
        if(window.orientation == 90 || window.orientation == -90){
            document.getElementsByClassName('horizontal').item(0).style.display = 'block';
        } else {
            window.location.reload();
        }
    }, false);

var ImgorCont = {
    cont : function(index,url1,url2,url3){
        var html = '<div class="exh_cont">'+
                   '<img src="' + url1 + '" class="exh_bg trans">'+
                   '<img src="' + url2 + '" class="exh_l trans">'+
                   '<img src="' + url3 + '" class="exh_r trans">'+
                   '</div>';
           $('.wrap_box:eq('+index+')').append(html);
    },
    img : function(index,url){
        var html = '<div class="exh_stud">'+
                   '<img src="' + url + '" class="stud_img" style="' + ((index%3)%2==0?'right:-230px':'left:-95px') + '">'+
                   '</div>';
           $('.wrap_box:eq('+index+')').append(html);
    }
}
// function for balls move 
function ballsMove(index){
    $('.balls:eq('+index+')').css('opacity',1);
    ObjectBalls[index].moveBalls.AllBallsToCorner('dial'+index,false,0,function(){ // AllBallsToCorner use element's classname
                    ObjectBalls[index].moveBalls.SingleMove('dial_wrap'+index,0,0);  // SingleMove use element's id
                    ObjectBalls[index].moveBalls.SingleMove('dial_img'+index,0,0); 
                    ObjectBalls[index].moveBalls.AllBallsToCorner('dial'+index,0,false,function(){
                        Actions.userCont.showCont(300,index+1);
                        exhObj.jContorImg(PageActions.cd());
                    });
            });
}
function pageGoto(){
     Actions.userCont.hidenCont();
        PageActions.nextSession();
        var i = 0;
        var t = setInterval(function(){
            ballsMove(PageActions.actionsession);
            PageActions.actionsession ++;
            i++;
            if(i == 3) clearInterval(t);
        },350)
}