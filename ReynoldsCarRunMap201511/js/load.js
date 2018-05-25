	var menc = $('.wrap').hasClass('u-Mask');

	var loadingImages = [
        'img/loading/loading.jpg',
        'img/loading/loadingb.png',
        'img/loading/loading.png',
		'img/car.png',
		//'img/car1.png',
		'img/logo.png',
		'img/map.jpg',
        'img/home/bg5.jpg',
        'img/home/bg6.jpg',
        'img/home/boxd.png',
        'img/home/boxu.png',
        'img/home/bg7.jpg',
        'img/home/bg3.jpg',
        'img/home/shadow.png',
        'img/home/flames.png',
        'img/home/flame0.png',
        'img/home/flame1.png',
        'img/home/flame2.png',
        'img/home/flame3.png',
        'img/home/key_btn.png',
	];
	resourceDir = "";

	function loadResources(urls, progress) {
		var loadedCount = 0;
		var loaded = function() {
			++loadedCount;
			if (progress) progress(urls.length, loadedCount, this);
		};
		for (var i = 0; i < urls.length; ++i) {
			if (!urls[i]) {
				loaded();
				// alert(1);
				return;
			}
			var img = new Image();
			img.onload = loaded;
			img.onabort = loaded;
			img.onerror = loaded;
			img.src = resourceDir + urls[i];
		}
	}
	loadResources(loadingImages, function(n, i, img) {
		var stmei
		$('#load_bar').css('opacity',1);
        $('#load_bar').css('width',Math.round(i * 100 / n) + "%");
		if (i != n) return;
		stmei = setTimeout(function() {
			$("#loading").fadeOut();
			$(".wrap").removeClass("u-Mask");
		}, 800);

		function myStopFunction() {
			clearTimeout(stmei);
		}
	})
