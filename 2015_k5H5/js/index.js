// JavaScript Document
jQuery(function($){
    var f = 640/1008;
    var win = {
        h : $(window).height(),
        w : $(window).width()
    }
    
    stage.page_w = win.w;
    stage.page_h = win.w/f;
    
    $('.middle').css({'width':win.w,'height':win.w/f,'left':'50%','margin-left':-win.w/2});
    $('.wrap').css({'width':win.w*2,'height':win.w/f});
    $('.session').css({'width':win.w,'height':win.w/f});
    $('.comm_img').css('width',win.w); 
    $('#h_car').css({'width':win.w/2,'overflow':'hidden'});
    $('.comm_img_litr').css('width',win.w);
    
    if( win.w/win.h > 0.84 ){
        $('.middle').css({'width':win.h*f,'height':win.h,'left':'50%','margin-left':-win.h*f/2});
        $('.wrap').css({'width':win.h*f*2,'height':win.h});
        $('.session').css({'width':win.h*f,'height':win.h});
        $('.comm_img').css('width',win.h*f); 
        $('#h_car').css({'width':win.h*f*2,'overflow':'hidden'});
        $('.comm_img_litr').css('width',win.h*f*2);
        
         stage.page_w = win.h * f;
         stage.page_h = win.h;
    }
    
    
    if(window.location.href.indexOf('#p10')>4){
       action.homeCarChios.changeToBlc();
       stage.canHome = false;
       runPage.go(10);
    };
    
    //listeners arguments
    var px;
    var py;
    var _x;
    var _y;
    //logo_mu
    $('.logo_mu').on('touchstart',function(){
        stage.barin = true;
        $('.bar_wrap').css('-webkit-transform','translateX(0rem)');
    });
    $('.comm_img').on('touchstart',function(e){
        if(stage.barin){
            $('.bar_wrap').css('-webkit-transform','translateX(45rem)');
            stage.barin = false;
        } else {
            return; 
        }
    })
    //
    window.addEventListener("orientationchange", function() { 
    
        if(window.orientation == 90 || window.orientation == -90){
            document.getElementsByClassName('horizontal').item(0).style.display = 'block';
        } else {
            //if(load_horiz == 1){ window.location.reload() };
            //document.getElementsByClassName('horizontal').item(0).style.display = 'none';
            window.location.reload();
        }
    
    }, false);
    //jumpbar
    $('.jumpbar').on('touchstart',function(){
        if(stage.canHome)return;
        var tar = $(this).attr('data-rol');
        $('.jumpbar').css('color','#FFFFFF');
        $(this).css('color','#909090');
        switch(tar){
            case '0' : runPage.go(0); break;
            case '1' : runPage.go(1); break;
            case '4' : runPage.go(4); break;
            case '5' : runPage.go(5); break;
            case '7' : runPage.go(7); break;
            case '8' : runPage.go(8); break;
            case '10' : runPage.go(10); break;
        }
    })
    // Session active
    $(document).on('touchstart',function(){
        px = event.touches[0].pageX;
    })
    $(document).on('touchmove',function(){
        if(!stage.canSession) return;
        _x = event.touches[0].pageX - px;
        if ( _x > 80 ) {
            session.lastSession();
            stage.canSession = false;
            look.OnPage(stage.index);
            setTimeout(function(){stage.canSession = true;},800);
        } else if ( _x < -80 ) {
            session.nextSession();
            stage.canSession = false;
            look.OnPage(stage.index);
            setTimeout(function(){stage.canSession = true;},800);
        }
    })
    // Home choise active
    $('#home_drag').on('touchstart',function(){
        px = event.touches[0].pageX;
    })
    $('#home_drag').on('touchmove',function(){
        if(!stage.canHome)return;
        _x = event.touches[0].pageX - px;
        if( _x > 30 && stage.Pagehome.dragX != 2 ){
            $('#logobg').attr('src','img/logo2.png');
            action.homeCarChios.changeToBlc();
            stage.canHome = false;
        } else if ( _x < -30 && stage.Pagehome.dragX != 1  ) {
            action.homeCarChios.changeToWt();
            stage.canHome = false;
        }
    })
    //page2 point 
    $('#lockp2').on('touchstart',function(){
        action.page2.point();
        $('#lockp2').attr('src','img/p2/lockp1.png');
        //$('#lockp2').off('touchstart');
    });
    $('#p2bt').on('touchstart',function(){
        action.page2.p2bg();
        //$('#p2bt').off('touchstart');
    })
    //page3 btns w
    var light = {
        b : false,
        l : false,
        showlight : function () {
            if (light.b&&light.l){
                $('#p3wbg').attr('src','img/p3/w/4.jpg');
                $('#p3wli').attr('src','img/p3/w/4.png');
            } else if (!light.b&&light.l) {
                $('#p3wbg').attr('src','img/p3/w/3.jpg');
                $('#p3wli').attr('src','img/p3/w/3.png');
            } else if (light.b&&!light.l) {
                $('#p3wbg').attr('src','img/p3/w/2.jpg');
                $('#p3wli').attr('src','img/p3/w/2.png');
            } else {
                $('#p3wbg').attr('src','img/p3/w/1.jpg');
                $('#p3wli').attr('src','img/p3/w/1.png');
            }
        }
    }
    $('#biglight').on('touchstart',function(){
        if ( light.b ) {
            light.b = false;
        } else {
            light.b = true;
        }
        light.showlight();
    })
    $('#ledlight').on('touchstart',function(){
        if ( light.l ) {
            light.l = false;
        } else {
            light.l = true;
        }
        light.showlight();
    })
    var blight = {
        b : true,
        light : function () {
            if(blight.b){
                $('#p3bg').attr('src','img/p3/b/2.jpg');
                $('#p3blig').attr('src','img/p3/b/2.png');
                blight.b = false;
            } else {
                $('#p3bg').attr('src','img/p3/b/1.jpg');
                $('#p3blig').attr('src','img/p3/b/1.png');
                blight.b = true;
            }
        }
    }
    $('#p3blig').on('touchstart',function(){
        blight.light();
    })
    //page5
    $('.p5b').on('touchstart',function(){
        var tar = $(this).attr('data-rol');
        $('#p5bg').attr('src','img/p5/b/'+tar+'.jpg');
        $('#p5bbg').attr('src','img/p5/b/'+tar+'.png');
    });
    //page6
    var p6 = {
        wp : true,
        bp : true
    }
    $('#p6wp').on('touchstart',function(){
        if (p6.wp) {
            $('#p6wg').attr('src','img/p6/w/2.jpg');
            p6.wp = false;
        } else {
            $('#p6wg').attr('src','img/p6/w/1.jpg');
            p6.wp = true;
        }
    })
    $('#p6p').on('touchstart',function(){
        if (p6.bp) {
            $('#p6g').attr('src','img/p6/b/2.jpg');
            p6.bp = false;
        } else {
            $('#p6g').attr('src','img/p6/b/1.jpg');
            p6.bp = true;
        }
    })
    //page7
    $('.p7wb').on('touchstart',function(){
        var tar = $(this).attr('data-rol')
        if(tar == 1){
            $('#p7wbg').attr('src','img/p7/w/2.jpg');
            $('#p7wb').attr('src','img/p7/w/2.png');
            $('#p7wt').attr('src','img/p7/b/t1.png');
        } else {
            $('#p7wbg').attr('src','img/p7/w/1.jpg');
            $('#p7wb').attr('src','img/p7/w/1.png');
            $('#p7wt').attr('src','img/p7/b/t.png');
        }
    })
    $('.p7b').on('touchstart',function(){
        var tar = $(this).attr('data-rol')
        if(tar == 1){
            $('#p7bg').attr('src','img/p7/b/2.jpg');
            $('#p7bb').attr('src','img/p7/b/2.png');
            $('#p7bt').attr('src','img/p7/b/t1.png');
        } else {
            $('#p7bg').attr('src','img/p7/b/1.jpg');
            $('#p7bb').attr('src','img/p7/b/1.png');
            $('#p7bt').attr('src','img/p7/b/t.png');
        }
    })
    //page9 
    $('#p9w').on('touchstart',function(){
        action.page9.w.carAction();
    })
    $('#p9bst').on('touchstart',function(){
        action.page9.b.carAction();
    })
    //page10
    $('.p11cbtns').on('touchstart',function(){
        var target = $(this).attr('data-rol');
        if( target == 1 ){
            $('#p11t').attr('src','img/p11/1.jpg');
            list.carType = "K5 sx";
        } else if( target == 2 ) {
            $('#p11t').attr('src','img/p11/2.jpg');
            list.carType = "K5 mx";
        } else if (target == 3) {
            $('#p11cbg').attr('src','img/p11/2.png');
            $('.pageList1').css('display','block');
        } else if (target == 4) {
            $('#p11cbg').attr('src','img/p11/3.png');
            window.location.href=window.location.href+"#p10";
            window.location.href="http://m.dyk.com.cn/index.php";
        }
    })
    //page13
    $('.p13return').on('touchstart',function(){
        $('.pageList1').css('display','none');
        $('.pageList2').css('display','none');
    })
    //pagelist11
    var list = {
        carType : 'k5 sxx',
        carWay : '在线订购'
    }
    $('.list1btns').on('touchstart',function(){
        var tar = $(this).attr('data-rol');
        if( tar == 1 ){
            $('.pageList1').css('display','none');
            $('.pageList2').css('display','block');
            $('#List2bg').attr('src','img/p13/2.jpg');
            list.carWay = "预约试驾";
        } else if (tar == 2){
            window.location.href="http://m.dyk.com.cn/dealer.php";
           
        } else if (tar == 3){
            $('.pageList1').css('display','none');
            $('.pageList2').css('display','block');
            $('#List2bg').attr('src','img/p13/1.jpg');
            list.carWay = "在线订购";
        } else if (tar == 4){
            window.location.reload();
        }
    })
    $('.endbtn').on('touchstart',function(){
        var tar = $(this).attr('data-rol');
        if(tar == "sub"){
            var uname1 = $('#name').val();
            var mobile = $('#tel').val();// $("#UsersForm [name=txtMobile]:input").val();
            var proid = $('#province').val();
            var cityid = $('#city').val();
            var sex = $('input[name="sex"]').val();
            var models = list.carType;
            var dealers = document.getElementsByName('dealers').item(0).value;
            if( $('#city').val() == '请选择'){
                alert('请选择城市');return false;
            }
            if( uname1 == ''){
                alert('姓名必填');return false;
            }
            if( mobile == ''){
                alert('手机号码必填');return false;
            }
            var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
            if (reg.test(mobile)) {
            }else{
                alert("请填入正确的手机号码");
                $("#txtMobile").focus();return false;
            };
            if( models == '' || models=='请选择'){
                alert('请选择车型');return false;
            }
            if(!sex){
                alert('请选择性别');return false;
            }
            if( !cityid ){
                alert('请选择城市');return false;
            }

    
            var p = $('#frm').serialize();
            p+='&provincecode='+$('#province').val();
            p+='&citycode='+$('#city').val();
            p+='&province='+  $("select[name=province] option:selected").text();
            p+='&city='+  $("select[name=city] option:selected").text();
    
            if($('#dealer').val() == '' || $('#dealer').val() == '请选择经销商' || $('#dealer').val() == '请从列表中选择经销商'){
                alert('请从列表中选择经销商');return false;
            }
            try{
                _dcv.push(['_setVar','customer','东风悦达起亚']);
                _dcv.push(['_setVar','way',list.carWay]);
                _dcv.push(['_setVar','channel','新k5H5moblie']);
                _dcv.push(['_setVar','car_type',models]);
                _dcv.push(['_setVar','car_model','']);
                _dcv.push(['_setVar','dealer_province',proid]);
                _dcv.push(['_setVar','dealer_city',cityid]);
                _dcv.push(['_setVar','dealer_name',dealers]);
                _dcv.push(['_setVar','name',uname1]);
                _dcv.push(['_setVar','sex',sex]);
                _dcv.push(['_setVar','mobile',mobile]);
                _dcv.push(['_setVar','email','']);
                _dcv.push(['_setVar','activity','官方直降 给力进行中']);//来自于哪个活动
                _dcv.push(['_setVar','is_accept',true]);//是否接收
                _dcv.push(['_setVar','remarks','官方直降 给力进行中 线索']);
                _dcv.push(['_setVar','drive_time','']);
                _dcv.push(['_setVar','contact_time','']);
                _dcv.push(['_setVar','buy_time','']);
                _dcv.push(['_trackVar']);
            }catch(e){
                console.debug(e);
            }
            alert('提交成功');
            $('#name').val('姓名');
            $('#name').css('color','#9F9F9F');
            $('#tel').val('手机号码');
            $('#tel').css('color','#9F9F9F');
    
        } else {
            //alert("clear")
        }
    })
    $('#name').on('focusin',function(){
        var val = $('#name').val();
        if(val == "姓名"){
            $('#name').val('');
            $('#name').css('color','#000000');
        } 
    })
    $('#name').on('focusout',function(){
        var val = $('#name').val();
        if(val == ""){
            $('#name').val('姓名');
            $('#name').css('color','#9F9F9F');
        } 
    })
    $('#tel').on('focusin',function(){
        var val = $('#tel').val();
        if(val == "手机号码"){
            $('#tel').val('');
            $('#tel').css('color','#000000');
        } 
    })
    $('#tel').on('focusout',function(){
        var val = $('#tel').val();
        if(val == ""){
            $('#tel').val('手机号码');
            $('#tel').css('color','#9F9F9F');
        } 
    })
    //loading Dom
    action.page2.p2wbg();
    setTimeout("$('#home_drag').addClass('action');",500);
})

var session = {
    nextSession : function () {
        if( stage.sessionIndex == stage.sessionLength || action.session.Do ) return;
        stage.sessionIndex += 1;
        action.session.next();
    },
    lastSession : function () {
        if( stage.sessionIndex == 0 || action.session.Do )return;
        stage.sessionIndex -= 1;
        action.session.last();
    }
}

var action = {
    session : {
        Do : false,
        next : function () {
            action.session.Do = true;
            $('.wrap').css({'-webkit-transform':'translateX(' + ( stage.sessionL -= stage.page_w ) + 'px)'});
            $('#logobg').attr('src','img/logo.png');
            setTimeout("action.session.Do = false",750);
        },
        last : function () {
            action.session.Do = true;
            $('.wrap').css({'-webkit-transform':'translateX(' + ( stage.sessionL += stage.page_w ) + 'px)'})
            $('#logobg').attr('src','img/logo2.png');
            setTimeout("action.session.Do = false",750);
        }
    },
    homeCarChios : {
        changeToWt : function () {    // change to black
            $('#home_drag').css('-webkit-transform','translateX(-110px)');
            stage.Pagehome.dragX = 2
            session.nextSession();
            var i = 0;
            $('.home').css('opacity',0);
            var t = setInterval(function(){
                stage.swipe = true;
                if (i == 1) {
                    $('.home').css('display','none');
                    stage.homePass = true;
                    $('.wrap').addClass('action');
                    
                    if ( stage.sessionIndex == 1 ) { action.page1.b_txt(); stage.start = true; }

                    clearInterval(t);
                    return;
                }
                i += 1;
            },400)
        },
        changeToBlc : function () {    // chnage to white
            $('#home_drag').css('-webkit-transform','translateX(110px)');
            session.lastSession();
            $('.home').css('opacity',0);
            var t = setInterval(function(){
                stage.swipe = true;
                    $('.home').css('display','none');
                    stage.homePass = true;
                    $('.wrap').addClass('action');
                    
                    if ( stage.sessionIndex == 0 ) { action.page1.w_txtshow(); stage.start = true; }
                    
                    clearInterval(t);
                    return;
            },400)
            stage.Pagehome.dragX = 1;
        },
        changeMid : function () {
           $('#home_drag').css('-webkit-transform','translateX(0px)');
           stage.Pagehome.dragX = 0;
           stage.swipe = false;
        }
    },
    page10 : {
        wtxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p10wt').addClass('action mtxt');break;
                    //case 1 : $('#p10ws').addClass('flash');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        btxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p10bt').addClass('action mtxt');break;
                    //case 1 : $('#p10bs').addClass('flash');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        }
    },
    page9 : {
        w : {
            carAction : function(){
                var i = 0;
                $('#p9w').addClass('action op0');
                var car = $('#p9wtcar').css('-webkit-transform');
                
                var t = setInterval(function(){
                    switch(i){
                        case 0 :  $('#p9wtcar').removeClass('carRuning');break;
                        case 1 :  $('#p9wtcar').addClass('carRuning');break;
                        case 2 :  $('#id9car1').css('opacity','0');$('#id9car2').css('opacity','1');break;
                        case 4 :  $('#id9car1').css('opacity','1');$('#id9car2').css('opacity','0');break;
                        case 5 :  i = 0;break;
                        default : break;
                    }
                    i++;
                },600)
            }
        },
        b : {
            carAction : function(){
                var i = 0;
                $('#p9bst').addClass('action op0');
                var t = setInterval(function(){
                    switch(i){
                        case 0 :  $('#p9bcar2').removeClass('carRun'); $('#p9bcar2').addClass('action p9bcar2'); $('.rod1').css('-webkit-animation-duration','1.5s'); $('.rod2').css('-webkit-animation-duration','1.5s');$('.p9bcar1').addClass('action p9bcar11');break;
                        case 1 : $('.rod1').css('-webkit-animation-play-state','paused'); $('.rod2').css('-webkit-animation-play-state','paused'); $('.rod1').removeClass('rod1');$('.rod2').removeClass('rod2');break;
                        case 2 : clearInterval(t);
                        default : break;
                    }
                    i++;
                },750)
            }
        },
        wtxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p9wt').addClass('action mtxt');break;
                    //case 1 : $('#p9ws').addClass('flash');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        btxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p9bt').addClass('action mtxt');break;
                    //case 1 : $('#p9bs').addClass('flash');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        }
    },
    page8 : {
        wtxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p8wt').addClass('action mtxt');break;
                    //case 1 : $('#p8ws').addClass('flash');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        btxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p8bt').addClass('action mtxt');break;
                    //case 1 : $('#p8bs').addClass('flash');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        }
    },
    page7 : {
        wtxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p7wt').addClass('action mtxt');break;
                    //case 1 : $('#p7ws').addClass('flash');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        btxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p7bt').addClass('action mtxt');break;
                    //case 1 : $('#p7bs').addClass('flash');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        }
    },
    page6 : {
        wtxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p6wt').addClass('action mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        btxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p6bt').addClass('action mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        }
    },
    page5 : {
        wtxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p5wt').addClass('action mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        btxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p5bt').addClass('action mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        }
    },
    page4 : {
        wtxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p4wt').addClass('action mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        btxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p4bt').addClass('action mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        }
    },
    page3 : {
        wtxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p3wt').addClass('action mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        btxt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p3bt').addClass('action mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        }
    },
    page2 : {
        p2bg : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p2bg').addClass('op0');$('#p2bt').css('opacity',0);break;
                    case 1 : $('#p2bt2').addClass('action mitxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        p2bt : function () {
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 0 : $('#p2bt').addClass('mtxt');break;
                    default:clearInterval(t);break;
                }
                i += 1;
            },750)
        },
        p2wbg : function () {
            $('.p2wbg:eq(0)').css('z-index',9);
            $('.p2wbg:eq(1)').css('z-index',8);      
            $('.p2wbg:eq(2)').css('z-index',7);
            $('.p2wbg').removeClass('op');
        },
        point : function () {
            $('.lockp2').addClass('carArrow');
            var i = 0;
            var t = setInterval(function(){
                switch(i){
                    case 2 : $('.p2wbg:eq(0)').addClass('action op0'); break;
                    case 4 : $('.p2wbg:eq(1)').addClass('action op0'); $('#lockp2').addClass('action op0'); $('#p2txt').css('opacity',1); break;
                    case 6 : $('#p2wt').addClass('action mitxt');break;
                    case 8 : clearInterval(t); break;
                    default: break;
                }
                i += 1;
            },200)
        },
        clear : function () {
            $('.p2wbg:eq(0)').removeClass('action op0');
            $('.p2wbg:eq(1)').removeClass('action op0');
            $('.lockp2').removeClass('carArrow action op0');
            $('#p2txt').css('opacity',0);
            $('#p2bg').removeClass('op0');
            $('#p2bg').addClass('action');$('#p2bt').addClass('action');
        }
    },
    page1 : {
        b_txt : function () {
            var i = 0;
            var t = setInterval ( function () {
                switch(i){
                    case 0 : $('#p1bt').addClass('action mtxt'); break;
                    case 1 : clearInterval(t);break;
                    default:break;
                }
                i += 1;
            },500);
        },
        w_txtshow : function () {
            var i = 0;
            var t = setInterval ( function () {
                switch(i){
                    case 0 : $('#p1t').addClass('action mtxt'); break;
                    case 1 : clearInterval(t);break;
                    default:break;
                }
                i += 1;
            },500);
        },
    },
    page0 : {
        text : function () {
            $('#p0txt').addClass('action mitxt');
        }
    },
    clearPage : function(){
        //$('.comm_img').removeClass('mtxt mitxt carArrow action');
        //action.page2.clear();
    }
}

var stage = {
    index : 0,
    homePass : false,
    barin : false,
    horiz : 0,

    sessionIndex : 0,  // 0 means in left, 1 means in right 
    sessionLength : 1,
    
    canHome : true,
    canSession : true,
    
    start : false,
    swipe : false,
    
    sessionL : 0,
    page_w : 0,
    page_h : 0,
    
    Pagehome : {
        dragX : 0
    }
}

var look = {
    OnPage : function(index){
       if(!stage.start)return;
       stage.canSession = true;
       //action.clearPage();
       switch(index){
           case 0 : { if ( stage.sessionIndex == 0 ) action.page1.w_txtshow();
                      else action.page1.b_txt();
                    } break;
           case 1 : if(stage.sessionIndex == 0) {} else {
                      action.page2.p2bt();
                    };break;
           case 2 : { if(stage.sessionIndex == 0) action.page3.wtxt();
                      else action.page3.btxt();
                    };break;
           case 3 : { if(stage.sessionIndex == 0) action.page4.wtxt();
                      else action.page4.btxt();
                    };break;
           case 4 : { if(stage.sessionIndex == 0) action.page5.wtxt();
                      else action.page5.btxt();
                    };break;
           case 5 : { if(stage.sessionIndex == 0) action.page6.wtxt();
                      else action.page6.btxt();
                    };break;
           case 6 : { if(stage.sessionIndex == 0) action.page7.wtxt();
                      else action.page7.btxt();
                    };break;
           case 7 : { if(stage.sessionIndex == 0){ action.page8.wtxt(); $('#logobg').attr('src','img/logo.png'); }
                      else action.page8.btxt();
                    };break;
           case 8 : { if(stage.sessionIndex == 0) { action.page9.wtxt(); $('#logobg').attr('src','img/logo.png'); }
                      else action.page9.btxt();
                    };break;
           case 9 : { if(stage.sessionIndex == 0) { action.page10.wtxt(); $('#logobg').attr('src','img/logo.png'); }
                      else action.page10.btxt();
                    };break;
           case 10 : stage.canSession = false;$('#logobg').attr('src','img/logo2.png');break;
           default: break;
       }
    }
}

function loading_log(){
    this.end = function () {
        $('#loading').css('display','none')
        $('#all').css('display','block');
        setTimeout(" action.page0.text();",300)
    }
}
var load_img = new Array;
    load_img = [
    'img/loading.jpg',
    'img/logo.png',
    'img/kong.png',
    'img/p0/0.jpg',
    'img/p0/0.png',
    'img/p0/1.png',
    'img/p1/w/1.jpg',
    'img/p1/w/1.png',
    'img/p1/b/1.jpg',
    'img/p1/b/1.png',
    'img/p2/1.jpg',
    'img/p2/2.jpg',
    'img/p2/3.jpg',
    'img/p2/1.png',
    'img/p2/lockp.png',
    'img/p2/b/1.jpg',
    'img/p2/b/1.png',
    'img/p2/b/2.jpg',
    'img/p2/b/2.png',
    'img/p3/w/1.jpg',
    'img/p3/w/t.png',
    'img/p3/w/1.png',
    'img/kong.png',
    'img/kong.png',
    'img/p3/b/1.jpg',
    'img/p3/b/1.png',
    'img/p3/b/t.png',
    'img/p4/w/1.jpg',
    'img/p4/w/1.png',
    'img/p4/b/1.jpg',
    'img/p4/b/1.png',
    'img/p5/w/1.jpg',
    'img/p5/w/t1.png',
    'img/p5/w/1.png',
    'img/kong.png',
    'img/p5/b/1.jpg',
    'img/p5/b/t1.png',
    'img/p5/b/1.png',
    'img/p6/w/1.jpg',
    'img/p6/w/2.png',
    'img/p6/w/1.png',
    'img/p6/w/1.png',
    'img/p6/b/1.jpg',
    'img/p6/b/t.png',
    'img/p6/b/1.png',
    'img/p7/w/1.jpg',
    'img/p7/w/t.png',
    'img/p7/w/1.png',
    'img/p7/b/1.jpg',
    'img/p7/b/t.png',
    'img/p7/b/1.png',
    'img/p8/w/1.jpg',
    'img/p8/w/1.png',
    'img/p8/b/1.jpg',
    'img/p8/b/1.png',
    'img/p9/w/1.jpg',
    'img/p9/w/r.jpg',
    'img/p9/w/r.jpg',
    'img/p9/w/t.png',
    'img/p9/w/1.png',
    'img/p9/w/2.png',
    'img/p9/w/p.png',
    'img/p9/b/1.jpg',
    'img/p9/b/1.png',
    'img/p9/b/2.png',
    'img/p9/b/t.png',
    'img/p9/b/b.png',
    'img/p9/b/st.png',
    'img/p10/w/1.jpg',
    'img/p10/w/1.png',
    'img/p10/b/1.jpg',
    'img/p10/b/1.png',
    'img/p11/1.jpg',
    'img/p11/1.png',
    'img/p3/w/4.jpg',
    'img/p3/w/4.png',
    'img/p3/w/3.jpg',
    'img/p3/w/3.png',
    'img/p3/w/2.jpg',
    'img/p3/w/2.png',
    'img/p3/w/1.jpg',
    'img/p3/w/1.png',
    'img/p3/b/2.jpg',
    'img/p3/b/2.png',
    'img/p3/b/1.jpg',
    'img/p3/b/1.png',
    'img/p5/w/1.jpg',
    'img/p5/w/2.jpg',
    'img/p5/w/1.png',
    'img/p5/w/2.png',
    'img/p5/w/t1.png',
    'img/p5/w/t2.png',
    'img/p5/b/1.jpg',
    'img/p5/b/2.jpg',
    'img/p5/b/1.png',
    'img/p5/b/2.png',
    'img/p5/b/t1.png',
    'img/p5/b/t2.png',
    'img/p6/w/2.jpg',
    'img/p6/w/1.jpg',
    'img/p6/b/2.jpg',
    'img/p6/b/1.jpg',
    'img/p7/w/2.jpg',
    'img/p7/w/2.png',
    'img/p7/w/1.jpg',
    'img/p7/w/1.png',
    'img/p7/b/2.jpg',
    'img/p7/b/2.png',
    'img/p7/b/1.jpg',
    'img/p7/b/1.png',
    'img/p11/1.jpg',
    'img/p11/2.jpg',
    'img/p13/2.jpg',
    ]
    
    //alert(load_img.length)
var img = new Image();      // 声明对象，使用 image 对象中的 onload 方法

var loading = new loading_log();

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
	$('#loadtxt').html(Math.round(i * 100 / n) + "%");
    $('#txtbox').css('height',(130 - Math.round(i * 100 / n)) + "%")
	if (i > 112){
		setTimeout("loading.end()",500)
	}
})