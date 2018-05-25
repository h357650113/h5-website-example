// JavaScript Document

var actions = {};
var ctrl = {
    page1 : function () {
        $('#home_btn_area').on('touchstart',function(){
                $('#btn_home_i').attr('src','img/home/f6.png');
                actions.pass.page1();
                //text
                ctrl.boxer.ontouch();
                ctrl.boxer.touchMove();
                
                ctrl.fly.outouch();
                ctrl.fly.touchMove();
            });
    },
    boxer : {
        Point : 0,
        ontouch : function () {
            $('#box_kong').on('touchstart',function(){
                var tou = event.touches[0].pageX;
                ctrl.boxer.Point = tou;
            })
        },
        touchMove : function () {
            $('#box_kong').on('touchmove',function(){
                m = event.touches[0].pageX - ctrl.boxer.Point;
                if ( m > 0) {
                    mp3s.mboxer.musicPlay();
                    games.q.bitRight();
                }
                else {
                    mp3s.mboxer.musicPlay();
                    games.q.bitLeft();
                }
            })
        }
        
    },
    fly : {
        index : 0,
        Point : 0,
        outouch : function () {
            $('.fly_area').on('touchstart',function(){
                var tou = event.touches[0].pageY;
                ctrl.fly.Point = tou;
            })
        },
        touchMove : function () {
            $('.fly_area').on('touchmove',function(){
                m = event.touches[0].pageY - ctrl.fly.Point
                if ( Math.abs(m) > 0) {
                    mp3s.mzhua.musicPlay();
                    switch (ctrl.fly.index) {
                        case 0 : $('.y_p:eq(0)').addClass('op_show bounceIn'); break;
                        case 1 : $('.y_p:eq(1)').addClass('op_show bounceIn'); break;
                        case 2 : $('.y_p:eq(2)').addClass('op_show bounceIn'); break;
                        case 3 : games.y.showAll();break;
                        default:break;
                    }
                    
                }
                ctrl.fly.index += 1;
            })
        }
    }
};

actions.page1 = {
    showAll : function () {
        var i = 0;
        var leng = $('.ac_home').length;
        $('.ac_home:eq('+i+')').addClass('bounceIn op_show')
        var t = setInterval(function () {
            switch(i){
                case 0 : i += 1; $('.ac_home:eq('+i+')').css('opacity','1'); $('.ac_home:eq('+i+')').addClass('bounceIn'); break;
                case 1 : i += 1; $('.ac_home:eq('+i+')').css('opacity','1'); $('.ac_home:eq('+i+')').addClass('tada'); break;
                case 2 : i += 1; $('.ac_home:eq('+i+')').css('opacity','1'); $('.ac_home:eq('+i+')').addClass('flash'); break;
                case 3 : i += 1; $('.ac_home:eq('+i+')').css('opacity','1'); $('.ac_home:eq('+i+')').addClass('bounceIn pulse'); ctrl.page1(); break;
                case leng : clearInterval(t) ; break;
                default : i += 1; break;
            }
            
        },300)
    },
}

actions.page2 = {
    showAll : function () {
        var i = 0;
        var leng = $('.ac_start').length;
        var t = setInterval(function () {
            switch(i){
                case 0 : $('.ac_start:eq('+i+')').addClass('bounceIn op_show'); i += 1; break;
                case 1 : $('.ac_start:eq('+i+')').addClass('tada op_show'); i += 1; break;
                case leng : clearInterval(t) ; break;
                default : i += 1; break;
            }
            
        },300)
        actions.page2.listener();
    },
    listener : function () {
        $('.game_e').on('touchstart',function () {
            //mp3s.freez.musicStop();
            //mp3s.light.musicStop();
            //mp3s.mboxer.musicStop();
            //mp3s.mzhua.musicStop();
            $('#start').css('display','none')
            games.e.startE();
            mp3s.light.musicPlay();
            games.k.index = 0;
        });
        $('.game_k').on('touchstart',function () {
            $('#start').css('display','none')
            games.k.startK();
            mp3s.freez.musicPlay();
        });
        $('.game_y').on('touchstart',function () {
            $('#start').css('display','none')
            games.y.startY();
            games.k.index = 0;
        });
        $('.game_q').on('touchstart',function () {
            $('#start').css('display','none')
            games.q.startq();
            games.k.index = 0;
        });
        $('.btn_sj').on('touchstart',function () { games.end(); } );
        $('#jumpto').on('touchstart',function () {
            window.location.href = "http://www.baidu.com";
        })
    }
}

var mp3s = {
    light : {
         state : 1,
         musicPlay : function() {
             var music = document.getElementById('mlight');  
             music.play();          
         },
         musicStop : function() {
            var music = document.getElementById('mlight');  
            music.pause();          
         }
    },
    freez : {
         state : 1,
         musicPlay : function() {
             var music = document.getElementById('mfreez');  
             music.play();          
         },
         musicStop : function() {
            var music = document.getElementById('mfreez');  
            music.pause();          
         }
    },
    mzhua : {
         state : 1,
         musicPlay : function() {
             var music = document.getElementById('mzhua');  
             music.play();          
         },
         musicStop : function() {
            var music = document.getElementById('mzhua');  
            music.pause();          
         }
    },
    mboxer : {
         state : 1,
         musicPlay : function() {
             var music = document.getElementById('mboxer');  
             music.play();          
         },
         musicStop : function() {
            var music = document.getElementById('mboxer');  
            music.pause();          
         }
    }
}

games = {
    e : {
        startE : function () {
            games.clear();
            $('#start').addClass('action op_zore');
            $('#gamee').css('display','block');
            games.e.showAll();
        },
        showAll : function () {
            var i = 0;
            var leng = $('.ac_e').length;
            var t = setInterval(function () {
                switch(i){
                    case 0 : games.e.action_er(); $('.ac_e:eq('+i+')').addClass('bounceIn op_show'); i += 1; break;
                    case 1 : $('.ac_e:eq('+i+')').addClass('tada op_show'); i += 1; break;
                    case 2 : $('.ac_e:eq('+i+')').addClass('tada op_show'); i += 1; clearInterval(t); break;
                    default : i += 1; break;
                }
            },500)
        },
        action_er : function () {
            var i = 0;
            var c = setInterval ( function () {
                switch (i) {
                    case 0 : $('#er').attr('src','img/game/e/1.jpg'); i += 1; break;
                    case 1 : $('#er').attr('src','img/game/e/2.jpg'); i += 1; break;
                    case 2 : $('#er').attr('src','img/game/e/3.jpg'); i += 1; break;
                    case 3 : $('#er').attr('src','img/game/e/4.jpg'); i += 1; break;
                    case 4 : $('#er').attr('src','img/game/e/5.jpg'); i += 1; break;
                    case 5 : $('#er').attr('src','img/game/e/6.jpg'); i += 1; break;
                    case 6 : $('#er').attr('src','img/game/e/7.jpg'); i += 1; break;
                    case 7 : i = 0; break;
                    default: i += 1; break;
                }
            },130);
        },
        clear : function () {
            var i = 0;
            var leng = $('.ac_e').length;
            var t = setInterval(function () {
                switch(i){
                    case 0 : games.e.action_er(); $('.ac_e:eq('+i+')').removeClass('bounceIn op_show'); i += 1; break;
                    case 1 : $('.ac_e:eq('+i+')').removeClass('tada op_show'); i += 1; break;
                    case 2 : $('.ac_e:eq('+i+')').removeClass('tada op_show'); i += 1; clearInterval(t); break;
                    default : i += 1; break;
                }
            },500)
        }
    },
    k : {
        index : 0,
        startK : function () {
            if ( games.k.index == 0 ) {
                games.clear();
                $('#start').addClass('ds_show action op_zore');
                $('#gamek').css('display','block');
                games.k.showAll();
            } else if ( games.k.index == 1 ) {
                games.k.index = 2;
                games.k.showAll();
            }
        },
        showAll : function () {
            var i = 0;
            if ( games.k.index == 2 ) i = games.k.index;
            var leng = $('.ac_k').length;
            var t = setInterval(function () {
                switch(i){
                    case 0 : $('.ac_k:eq('+i+')').addClass('bounceIn op_show'); i += 1; break;
                    case 1 : $('.ac_k:eq('+i+')').addClass('tada op_show'); games.k.index = 1; clearInterval(t); break;
                    case 2 : $('.ac_k:eq('+i+')').addClass('tada op_show'); i += 1; break;
                    case 3 : $('.ac_k:eq('+i+')').addClass('tada op_show'); i += 1; break;
                    case 4 : $('.ac_k:eq('+i+')').addClass('tada op_show'); games.k.index = 0; clearInterval(t) ; break;
                    default : i += 1; break;
                }
            },500)
        },
        clear : function () {
            var i = 0;
            var leng = $('.ac_k').length;
            var t = setInterval(function () {
                switch(i){
                    case 0 : $('.ac_k:eq('+i+')').removeClass('bounceIn op_show'); i += 1; break;
                    case 1 : $('.ac_k:eq('+i+')').removeClass('tada op_show'); i += 1; break;
                    case 2 : $('.ac_k:eq('+i+')').removeClass('tada op_show'); i += 1; break;
                    case 3 : $('.ac_k:eq('+i+')').removeClass('tada op_show'); i += 1; break;
                    case 4 : $('.ac_k:eq('+i+')').removeClass('tada op_show'); i += 1; clearInterval(t) ; break;
                    default : i += 1; break;
                }
            },500)
        }
    },
    y : {
        startY : function () {
            games.clear();
            $('#start').addClass('ds_show action op_zore');
            $('#gamey').css('display','block');
        },
        showAll : function () {
            var i = 0; 
            var leng = $('.ac_y').length;
            var t = setInterval ( function () {
                switch(i){
                    case 0 : $('.ac_y:eq(' + i + ')').addClass('op_show bounceIn'); i += 1; break;
                    case 1 : $('.ac_y:eq(' + i + ')').addClass('op_show bounceIn'); i += 1; clearInterval(t); break;
                    default:break;
                }
            }, 500);
        }
    },
    q : {
        startq : function () {
            games.clear();
            $('#start').addClass('ds_show action op_zore');
            $('#gameq').css('display','block');
            games.q.showAll();
        },
        showAll : function () {
            $('#boxer').addClass('around');
        },
        
        canBit : true,
        bitTimes : 0,
        bitRight : function () {
            if(!games.q.canBit)return;
            $('#boxer').removeClass('around');
            $('#boxer').addClass('bitright');
            $('#qshow').addClass('bounceIn');
            $('#bitone').attr('src','img/game/q/x1.png');
            $('#bitblood').attr('src','');
            var i = 0;
            var t = setInterval( function(){
                    switch(i){
                        case 0 : $('#bitblood').attr('src','img/game/q/x2.png'); i++ ;break;
                        case 1 : $('#boxer').removeClass('bitright'); i++ ; 
                                if( games.q.bitTimes==0 )
                                     $('#q2').addClass('op_show bounceIn');
                                break;
                        case 2 : $('#boxer').addClass('around'); i++;break;
                        case 3 : $('#bitone').attr('src','img/game/q/x.png');$('#bitblood').attr('src','img/game/q/x0.png'); i++; break;
                        case 4 : if( games.q.bitTimes == 0 ){
                                        $('#q1').addClass('op_show bounceIn');
                                        $('#qshow').removeClass('bounceIn');
                                        games.q.bitTimes == 1;
                                    };games.q.canBit = true; clearInterval(t); break;
                        default: i += 1; break;
                    }
                },300);
        },
        bitLeft : function () {
            if(!games.q.canBit)return;
            $('#boxer').removeClass('around');
            $('#boxer').addClass('bitleft');
            $('#qshow').addClass('bounceIn');
            $('#bitone').attr('src','img/game/q/x3.png');
            $('#bitblood').attr('src','');
            var i = 0;
            var t = setInterval( function(){
                    switch(i){
                        case 0 : $('#bitblood').attr('src','img/game/q/x4.png'); i++ ;break;
                        case 1 : $('#boxer').removeClass('bitleft'); i++ ;
                                 if( games.q.bitTimes==0 )
                                     $('#q2').addClass('op_show bounceIn');
                                 break;
                        case 2 : $('#boxer').addClass('around'); i++; break;
                        case 3 : $('#bitone').attr('src','img/game/q/x.png'); $('#bitblood').attr('src','img/game/q/x0.png'); i++; break;
                        case 4 : if( games.q.bitTimes == 0 ){
                                        $('#q1').addClass('op_show bounceIn');
                                        $('#qshow').removeClass('bounceIn');
                                        games.q.bitTimes == 1;
                                    };games.q.canBit = true; games.q.canBit = true; clearInterval(t); clearInterval(t); break;
                        default:break;
                    }
                },300);
        },
        clear : function () {
            games.q.bitTimes = 0;
            $('#q1').removeClass('op_show bounceIn');
            $('#q2').removeClass('op_show bounceIn');
        }
    },
    end : function () {
        games.clear();
        $('#gamend').css('display','block');
        
        $('#btn_end').on('touchstart',function(){
            ends.showPage();
        });
        
        var i = 0;
        var t = setInterval( function() {
            switch(i){
                case 0 : $('.ac_end:eq('+ i +')').addClass('op_show bounceIn'); i += 1; break;
                case 1 : $('.ac_end:eq('+ i +')').addClass('op_show bounceIn'); i += 1; break;
                case 2 : clearInterval(t); break;
                default: i += 0 ;break;
            }
         }, 500);
    },
    clear : function () {
        games.e.clear();
        games.q.clear();
        games.k.clear();
        var i = 0;
        var len = $('.game').length;
        
        for (i; i < len; i ++) {
            $('.game:eq('+i+')').css('display','none');
        }
    }
}

var ends = {
    showPage : function () {
        games.clear();
        $('#end').css('display','block');
    }
}

actions.start = function () {        
    games.clear();
    actions.page1.showAll();
}
actions.pass = {
    page1 : function () {
        $('#home').addClass('action');
        $('#home').css({'opacity':'0','-webkit-transform':'scale3D(.3,.3,.3)','-webkit-transform':'translateY(-250px)'});
        actions.page2.showAll();
        setTimeout(function(){$('#home').css('display','none')},800)
    }
}

var a = new Array;
    a = [
        'img/home/f1.png',
        'img/home/f2.png',
        'img/home/f3.png',
        'img/home/f4.png',
        'img/home/f5.png',
        'img/home/f6.png',
        'img/start/r.jpg',
        'img/start/1.jpg',
        'img/start/2.jpg',
        'img/game/e/egb.jpg',
        'img/game/e/er1.png',
        'img/game/e/er2.png',
        'img/game/e/er3.png',
        'img/game/e/1.jpg',
        'img/game/e/2.jpg',
        'img/game/e/3.jpg',
        'img/game/e/4.jpg',
        'img/game/e/5.jpg',
        'img/game/e/6.jpg',
        'img/game/e/7.jpg',
        'img/game/comm1.png',
        'img/game/q/x.png',
        'img/game/q/x1.png',
        'img/game/q/x2.png',
        'img/game/q/x3.png',
        'img/game/q/x4.png',
        'img/game/k/gb.jpg',
        'img/game/k/k2.png',
        'img/game/k/k3.png',
        'img/game/k/k4.png',
        'img/game/k/k5.png',
        'img/game/k/k6.png',
        'img/game/k/k1.png',
        'img/game/k/k11.png',
        'img/game/y/bg.jpg',
        'img/game/y/1.png',
        'img/game/y/2.png',
        'img/game/y/3.png',
        'img/game/y/4.png',
        'img/game/y/5.png',
        'img/game/y/6.png',
        'img/game/y/btns.png',
        'img/game/q/bg.jpg,',
        'img/game/q/x.png',
        'img/game/q/x0.png',
        'img/game/q/xl1.png'
    ]
    
var img = new Image();      // 声明对象，使用 image 对象中的 onload 方法

function loading(){
    var w = $(document).width();
        h = $(document).height();
        
    var f = 640/1008;
        $('.page').css({'width': h * f, 'height':h,'left':'50%','margin-left':-(h * f)/2});
        $('.btns_str').css({'width':h * f,'left':'50%','margin-left':-(h * f)/2});
        $('.box_kong').css({'width':h * f,'left':'50%','margin-left':-(h * f)/2});
        $('.fly_area').css({'width':h * f,'left':'50%','margin-left':-(h * f)/2})
    
    var i = 0;
    var len = a.length;
    for(i; i < len; i++){     // 以循环方式读取 a 表中地址数据，并进行缓存。
        img.src = a[i];
        img.onload;
        if( i == (len-1) )  actions.start();
    }
}
loading();

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
