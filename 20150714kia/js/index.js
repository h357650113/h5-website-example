// JavaScript Document
var page = {
    p0 : {
        action1 : function () {
            $('#p0tittle').css('width','100%');
            setTimeout($('#p0down').css('opacity','1'),2000);
        }
    },
    p1 : {
        a1 : function () {
            $('#p1t1').css('opacity','1');
        },
        a2 : function () {
            $('#p1t2').css('opacity','1');
        },
        car : function () {
            $('#p1car').css('transform','translateX(0)');
        },
		a3:function(){
			$('#p1car').css('transform','translateY(-50px)');
		},
		a4:function(){
			$('#p1t1,#p1t2').css({'opacity':'0.6','transition':'all ease 0.5s','-webkit-transition':'all ease 0.5s','-moz-transition':'all ease 0.5s'});
		},
        allstuffs : function () {
			$('#p1stuff').css('transform','translateY(-28px)');
        },
        showdown : function () {
            $('#p1icon').css('opacity','1');
        }
    },
    p2 : {
        a1 : function () {
            $('#p2t1').css('opacity','1');
        },
        a2 : function () {
            $('#p2t2').css('opacity','1');
        },
        car : function () {
            $('#p2car').css('transform','translateX(0)');
        },
		a3:function(){
			$('#p2car').css('transform','translateY(-50px)');
		},
		a4:function(){
			$('#p2t1,#p2t2').css({'opacity':'0.6','transition':'all ease 0.5s','-webkit-transition':'all ease 0.5s','-moz-transition':'all ease 0.5s'});
		},
        allstuffs : function () {
           $('#p2stuff').css('transform','translateY(-28px)');
        },
        showdown : function () {
            $('#p2icon').css('opacity','1');
        }
    },
    p3 : {
        a1 : function () {
            $('#p3t1').css('opacity','1');
        },
        a2 : function () {
            $('#p3t2').css('opacity','1');
        },
		car : function () {
            $('#p3car').css('transform','translateX(0)');
        },
		a3:function(){
			$('#p3car').css('transform','translateY(-50px)');
		},
		a4:function(){
			$('#p3t1,#p3t2').css({'opacity':'0.6','transition':'all ease 0.5s','-webkit-transition':'all ease 0.5s','-moz-transition':'all ease 0.5s'});
		},
        
        allstuffs : function () {
            $('#p3stuff').css('transform','translateY(-28px)');
        },
        showdown : function () {
            $('#p3icon').css('opacity','1');
        }
    },
    p4 : {
        a1 : function () {
            $('#p4t1').css('opacity','1');
        },
        a2 : function () {
            $('#p4t2').css('opacity','1');
        },
        car : function () {
            $('#p4car').css('transform','translateX(0)');
        },
		a3:function(){
			$('#p4car').css('transform','translateY(-50px)');
		},
		a4:function(){
			$('#p4t1,#p4t2').css({'opacity':'0.6','transition':'all ease 0.5s','-webkit-transition':'all ease 0.5s','-moz-transition':'all ease 0.5s'});
		},
        allstuffs : function () {
            $('#p4stuff').css('transform','translateY(-28px)');
        },
        showdown : function () {
            $('#p4icon').css('opacity','1');
        }
    },
    p5 : {
        a1 : function () {
            $('#p4t1').addClass('zoomIn');
        },
        btn : function () {
            $('#p5_btn').on('touchstart',function(){
                $('.listPage').show();
            })
        }
    }
}

var musicBtn = {
    state : 1,
    musicPlay : function() {
        $('.com_music_btn').addClass('round');
        var music = document.getElementById('bgmusic');  
        music.play();
    },
    musicStop : function() {
        $('.com_music_btn').removeClass('round');
        var music = document.getElementById('bgmusic');  
        music.pause();    
    },
    action : function () {
        if( musicBtn.state ) {
            musicBtn.musicPlay();
        } else {
            musicBtn.musicStop();
        }
    }
}

$(document).ready(function(e) {
    setTimeout(page.p0.action1,300);
    
    $('.com_music_btn').on('touchstart',function(){
        if( musicBtn.state ) {
            musicBtn.state = null;
        } else {
            musicBtn.state = 1;
        }
        
        musicBtn.action();
    });
    
    $('#submit').on('touchstart',function(){
        //submit
    })
    
});

