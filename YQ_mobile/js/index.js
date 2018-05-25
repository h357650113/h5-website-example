// JavaScript Document stage - page include jQuery hsd 2016.5.5 versions 1.0
try{
    var webnar = navigator.userAgent;
    var look = new hgBaseLook();
        look.look({
            type : 'mobile website upload',
            des : 'yuanqutech - '+webnar,
            project : 'yuanqutech',
            token : 'b0f2390b1b7e3273690f42480372cb7b'
        });
} catch (e) {
    console.log(e);
};
    
var win = {
	w: $(window).width(),
	h: $(window).height()
}
if (win.w > 700) {
	//window.location.href = 'http://www.yuanqutech.com/';
}
$(function() {
	page.building();
	$('.h_kv').height($('.hkv').height());

	/*** when page loaded ***/
	if (win.w < 330) {
		$('.vid_lit').css({
			'width': '47.4%'
		});
		$('.nav_wrap').css({
			'font-size': '.8em'
		})
	} else if (win.w < 376) {
		$('.vid_lit').css({
			'width': '47%'
		});
	}
	$('.nav_lit').css({
		'width': win.w / $('.nav_lit').length
	});
	$('#line').css('left', $('.nav_lit').width() / 2 - 15)
	/*** weixin ***/
	$('.content').on('touchstart',
	function() {
		event = e || event;
		event.preventDefault();
	}); // prevent weixin weird event
	$('.session').on('touchstart',
	function() {
		event.stopPropagation();
	})
	/**** page nav ****/
	var nav = {
		sx: 0,
		mx: 0
	}
	$('.nav_lit').on('touchstart',
	function() {
		var tar = Number($(this).attr('data-rol'));
		var num = 0;
		//num += $('.navlit:eq('+tar+')>span').width()/2;
		num += .2 * tar * win.w;
		$('#line').css('-webkit-transform', 'translate3d(' + num + 'px,0,0)');
        /*** iphone scrolling: touch, every action remove and add ***/
		$('.session').removeClass('sollow');
		session.changeSession(tar);
	})
	/*** change session ***/
	var session = {
		index: 0,
		changeSession: function(tar) {
			$('.session').removeClass('display');
            /*** add class on every page change ***/
			$('.session:eq(' + tar + ')').addClass('display sollow');
			switch (tar) {
			case 2:
				loopStruct();
				vidlit();
				break;
			default:
				break;
			};
		}
	}
	//load view, find cookie jump page
	/***
    var flag = yq.req.Cookie_get('yq');

        if(flag){
            session.changeSession(flag);
        }
     ***/
	/*** video page ***/
	// content overflow
	var h = (win.h - $('.header').height() - $('.nav').height());
	$('.content').css('height', h + 'px');
	$('.session').css('height', h + 'px');
	$('.kv_loop').css('height', ($('.kv_cont').height()) + 'px');
	// kv loop struct
	function loopStruct() {
		$('.loops').width($('.kv_loop').width());
		$('.loop').width($('.loops').length * $('.loops').width());

		var loop = {
			sx: 0,
			mx: 0,
			width: $('.loops').width(),
			index: 0,
			maxindex: $('.loops').length
		}
		$('.loop').on('touchstart',
		function() {
			event.preventDefault();
			var touches = event.touches ? event.touches[0] : event;
			loop.sx = touches.pageX;
		});
		$('.loop').on('touchend',
		function() {
			var touches = event.changedTouches ? event.changedTouches[0] : event;
			var m = touches.pageX - loop.sx;
			if (m < -30) {
				if (loop.index < loop.maxindex - 1) {
					loop.mx -= loop.width;
					$('#kvloop').css('-webkit-transform', 'translate3d(' + loop.mx + 'px,0,0)');
					loop.index++;
				}
			} else if (m > 30) {
				if (loop.index > 0) {
					loop.mx += loop.width;
					$('#kvloop').css('-webkit-transform', 'translate3d(' + loop.mx + 'px,0,0)');
					loop.index--;
				}
			} else if ( - 3 < m < 3) {
				page.tv(page.looptv(loop.index));
			}
		})
	}

	function vidlit() {
		var s = 0;
		$('.vid_lit').on('touchstart',
		function() {
			var touches = event.touches ? event.touches[0] : event;
			s = touches.pageY;
		});
		$('.vid_lit').on('touchend',
		function() {
			var touches = event.changedTouches ? event.changedTouches[0] : event;
			var m = touches.pageY;
			if (m - s == 0) {
				var target = $(this).attr('data-rol');
				page.tv(target);
			}
		})
	}

	$('#newslit').html(newp(data.news));
	$('.newstit').on('touchend',
	function() {
		var url = $(this).attr('data-url');
		window.open(url);
	});
	$('#newsmore').on('touchend',
	function() {
		page.news.show();
	})

	new kvloop('hkv', 'hloop', 'hlits', data.hkv);
});

var page = {
	building: function() {
		// building video page
		var htm = '';
		for (var i = 0; i < data.video.length; i++) {
			htm += '<div class="vid_lit" data-rol="' + data.video[i].url + '">' + '<img src="' + data.video[i].img + '">' + '</div>'
		}
		for (var i = 0; i < data.looptv.length; i++) {
			$('.loops:eq(' + i + ')').attr('data-rol', data.looptv[i].url);
		}
		$('#video_lit').html(htm);
	},
	tv: function(tar) {
		var html = '';
		html += '<div class="tvmiddle"><div id="tvClose">关闭</div><iframe width=320 height=200 src="' + tar + '" frameborder=allowfullscreen id="tv"></iframe></div>';
		$('#tvbox').html(html);
		$('#tvbox').fadeIn('fast');
		$('#tvClose').on('touchstart',
		function() {
			$('#tv').remove();
			$('#tvbox').fadeOut('fast')
		})
	},
	looptv: function(tar) {
		var flag = $('.loops:eq(' + tar + ')').attr('data-rol');
		return flag;
	},
	news: {
		show: function() {
			$('#home_p').css('display', 'none');
			$('#news_p').css('display', 'block');
		},
		hidden: function() {
			$('#home_p').css('display', 'block');
			$('#news_p').css('display', 'none');
		}
	}
}

var yq = {}
yq.req = {
	Cookie_set: function(name, value, tem) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + tem);
		document.cookie = name + "=" + escape(value) + ((tem == null) ? "": ";expires=" + exdate.toGMTString());
	},

	Cookie_get: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)){ return unescape(arr[2]) }
		else {return null;}
	}
}
/****
    *
    *
    *
****/
function newp(data) {
	var html = '';
    var len = data.length;
	for (var i = len -1; i > 0 ; i--) {
		html += '<div class="newslit">' + '<div class="newstit" data-url="' + data[i].url + '">' + '<img src="img/p_news/point.png">' + data[i].title + '</div>' + '<div class="newscont">' + data[i].cont + '</div></div>'
	}
	return html;
}