// JavaScript Document


var stage = {
}

var page = {
    win : {
        width : $(window).width(),
        height : $(window).height() 
    },
    building : function () {   
        var leng = $('.page').length;
        var h = page.win.height;
        var w = page.win.width;
        
        $('.page').css('height',h);
        $('.page').css('width',w);
        
        $('.stageFmb').css('position','relative');
        $('.stageFmb').css('top','0px');
        $('.stageFmb').css('height',h * leng);
    },
    next : function () {
       var t = Number($('.stageFmb').css('top').replace('px',''));
           $('.stageFmb').css('top',t - page.win.height);
    },
    last : function () {
       var t = Number($('.stageFmb').css('top').replace('px',''));
           $('.stageFmb').css('top',t + page.win.height);
    },
    goTo : function () {
    },
    beforeLeave : null,
    afterLoad : null
}

function touchEvent() {
    var _this = this;
    
    var movY;
    
    _this.tdown = function () {
        movY = event.touches[0].clientY;
    };
    _this.tmove = function () {
        var y = event.touches[0].clientY - movY;
        return y;
    }
    _this.action = function () {
       document.addEventListener('touchstart',_this.start);
       document.addEventListener('touchend',_this.end);
    }
    _this.start = function () {
        _this.tdown();
        document.addEventListener('touchmove',_this.move);
    }
    _this.move = function() {
        if(_this.tmove() < -30){
            page.next();
        } else if ( _this.tmove() > 30 ) {
            page.last();
        }
    }
    _this.end = function () {
        document.removeEventListener('touchmove',_this.move);
    }
}

page.building();
var t = new touchEvent();
t.action();

