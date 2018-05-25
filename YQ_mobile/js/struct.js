function kvloop(wrap, loop, lit, data) {
	var flag = lit;
	var wrap = '#' + wrap;
	var loop = '#' + loop;
	var lit = '.' + lit;
	$(loop).css({
		'-webkit-transition': 'all ease .8s',
		'transition': 'all ease .8s'
	});
	var len = data.length;
	var w = $(wrap).parent('div').width();
	var h = $(wrap).parent('div').height();
	$(wrap).css({
		'width': w + 'px',
		'height': h + 'px',
		'overflow': 'hidden',
		'position': 'absolute',
		'left': '0px',
		'top': '0px',
		'z-index': '99'
	});
	$(loop).css({
		'width': w * len + 'px',
		'height': h + 'px'
	});
	var html = '';
	for (var i = 0; i < len; i++) {
		html += '<div class="' + data[i].class + '" data-url="' + data[i].url + '">'+
                '<img src="' + data[i].img + '" style="width:100%;" >'+
                '<div class="titlit">'+ data[i].title +'</div>'+
                '</div>'
	}
	$(loop).html(html);
	$(lit).css({
		'width': w + 'px',
		'height': h + 'px',
		'float': 'left'
	});
	$(lit + ':eq(' + (len - 1) + ')').css('clear', 'right');
	$(loop).after('<div class="kvlist" id="wr' + (flag) + '"></div>');
	html = '';
	for (var i = 0; i < len; i++) {
		html += '<div class="kvlists kvlists' + flag + '"></div>'
	}
	$('#wr' + flag).html(html); 
    $('.kvlists' + flag + ':eq(0)').css('background-color', 'rgba(204,204,204,1)');
    var sx = 0;
	var mx = 0;
	var index = 0;
	$(lit).on('touchstart',
	function() {
		event.preventDefault();
		var touches = event.touches ? event.touches[0] : event;
		sx = touches.pageX
	}); 
    $(lit).on('touchend',
	function() {
		var touches = event.changedTouches ? event.changedTouches[0] : event;
		var m = touches.pageX - sx;
		if (m < -30) {
			if (index < len - 1) {
				mx -= w;
				$('.kvlists' + flag).css('background-color', '');
				$(loop).css('-webkit-transform', 'translate3d(' + mx + 'px,0,0)');
				index++;
				$('.kvlists' + flag + ':eq(' + index + ')').css('background-color', 'rgba(204,204,204,1)')
			}
		} else if (m > 30) {
			if (index > 0) {
				mx += w;
				$('.kvlists' + flag).css('background-color', '');
				$(loop).css('-webkit-transform', 'translate3d(' + mx + 'px,0,0)');
				index--;
				$('.kvlists' + flag + ':eq(' + index + ')').css('background-color', 'rgba(204,204,204,1)')
			}
		} else if ( m == 0 ) {
			var url = $(this).attr('data-url'); 
            page.tv(url)
		}
	})
}