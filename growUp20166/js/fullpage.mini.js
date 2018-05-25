/* 
 * rusherwang
 * rusherwang@tencent.com
 * create: 2014.4.2
 * update: 2016.3.30
 * Github: https://github.com/powy1993/fullpage
 */
 
function FullPage(g){function F(a,C,b,d){this.cx=3*a;this.bx=3*(b-a)-this.cx;this.ax=1-this.cx-this.bx;this.cy=3*C;this.by=3*(d-C)-this.cy;this.ay=1-this.cy-this.by}var G=document.getElementById(g.id),c=G.children,x=c.length,ba=x,D=g.slideTime||800,z=g.effect||{},b=0,B,R,h,t,u,O,H,I,V,J=[],K=[],r=[],W=[],X,v,Y=null,n=!1,P=!1,ca,k,E,L,y,da,Z,ea,S,m,w,A,T,aa;if(c&&1!==x){g.mode&&(P=-1!==g.mode.indexOf("nav:"),W=g.mode.split(","),X=W.length);for(k=0;k<x;k++)J.push(c[k].style),K.push(+c[k].getAttribute("data-step")||
0),r.push(0);B=!!window.addEventListener;R="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch;(function(){var a=navigator.userAgent,C=a.indexOf("Android"),b;E=-1!==a.indexOf("QQBrowser")?200:0;-1!==C&&(b=a.substring(C+7,C+11).replace(" ",""));return b||0})();h=function(a){switch(!0){case ""===a.webkitTransition:return"webkit";case ""===a.MozTransition:return"Moz";case ""===a.msTransition:return"ms";case ""===a.OTransition:return"O";default:return""}}(document.createElement("Chriswang").style);
F.prototype={epsilon:.01,sampleCurveX:function(a){return((this.ax*a+this.bx)*a+this.cx)*a},sampleCurveY:function(a){return((this.ay*a+this.by)*a+this.cy)*a},sampleCurveDerivativeX:function(a){return(3*this.ax*a+2*this.bx)*a+this.cx},solveCurveX:function(a,b){var f,d,e,c;e=a;for(d=0;8>d;d++){c=this.sampleCurveX(e)-a;if(Math.abs(c)<b)return e;f=this.sampleCurveDerivativeX(e);if(Math.abs(f)<b)break;e-=c/f}f=0;d=1;e=a;if(e<f)return f;if(e>d)return d;for(;f<d;){c=this.sampleCurveX(e);if(Math.abs(c-a)<
b)break;a>c?f=e:d=e;e=.5*(d-f)+f}return e},solve:function(a,b){return this.sampleCurveY(this.solveCurveX(a,b))}};L=function(){t=document.documentElement.clientWidth||window.innerWidth;u=document.documentElement.clientHeight||window.innerHeight;G.style.height=u+"px"};k=function(a,b,f,c){O=a;H=b;I=f;V=c};if("string"===typeof g.easing)switch(g.easing){case "ease":k(.25,.1,.25,1);break;case "linear":k(0,0,1,1);break;case "ease-in":k(.42,0,1,1);break;case "ease-out":k(0,0,.58,1);break;case "ease-in-out":k(.42,
0,.58,1)}else k(g.easing[0],g.easing[1],g.easing[2],g.easing[3]);if(""!==h){for(;ba--;)J[ba][h+"TransitionTimingFunction"]="cubic-bezier("+O+","+H+","+I+","+V+")";y=function(a,b,c,d,e){a=a.style;b="translate("+b+"px,"+c+"px) translateZ(0)";e.scale&&(b+=0===d?" scale("+e.scale[0]+")":" scale("+e.scale[1]+")");e.rotate&&(b+=0===d?" rotate("+e.rotate[0]+"deg)":" rotate("+e.rotate[1]+"deg)");a[h+"TransformOrigin"]="50% 50%";a[h+"Transform"]=b}}else ca=new F(O,H,I,V),y=function(a,b,c,d){var e=a.currentStyle,
g=a.style,h=parseInt(g.left||e.left,10),m=parseInt(g.top||e.top,10),k=b-h,u=c-m,r=+new Date+d,n=0,q=z.opacity,t;clearInterval(Y);Y=setInterval(function(){var a;+new Date>r?(a=q?"left:"+b+"px;top:"+c+"px;filter:alpha(opacity="+100*q[1]+");":"left:"+b+"px;top:"+c+"px;",clearInterval(Y)):(t=r-new Date,n=t/d,n=ca.solve(1-n,F.prototype.epsilon),a="left:"+(h+k*n)+"px;top:"+(m+u*n)+"px;",q&&(a+="filter:alpha(opacity="+~~(100*(q[1]*n-q[0]*(1-n)))+");"));g.cssText=a},13)};da={transform:function(a,b,f){var d=
0,e=""!==h||"none"!==a.translate&&a.translate?E:-50;switch(a.translate){case "Y":d=f>b?u:-u;y(c[f],0,d,0,a);break;case "X":d=f>b?t:-t;y(c[f],d,0,0,a);break;case "XY":d={X:f>b?t:-t,Y:f>b?u:-u};y(c[f],d.X,d.Y,0,a);break;default:y(c[f],0,0,0,a)}setTimeout(function(){y(c[f],0,0,D,a)},e+50)},opacity:function(a,b,f){var d=c[f].style;d.opacity=a[0];setTimeout(function(){d.opacity=a[1]},70)}};ea=B&&R?navigator.userAgent.indexOf("Firefox")?function(a,b){a.addEventListener("click",b,!1)}:function(a,b,c){a.addEventListener("touchstart",
b,!1);c&&a.addEventListener("touchmove",function(a){a.preventDefault()},!1)}:function(a,b){a.onclick=b};m=function(a,b,c){var d=a.className,e=[];if(-1!==d.indexOf(b)){e=d.split(" ");for(d=e.length;d--;)e[d]===b&&(" "===c||""===c?e.splice(d,1):e[d]=c);e.length?a.className=e.join(" "):(a.removeAttribute("class"),a.removeAttribute("className"))}};P&&(T=function(a,b){var c=v[b].className;m(v[a],"active"," ");v[b].className=""===c?"active":c+" active"});g.continuous&&(w=function(a,b){var c=x;if(b)if(a>=
x)for(;c--;)r[c]=0;else if(0>a)for(;c--;)r[c]=K[c];return(x+a%x)%x});Z=function(a){var g=r[b];a=g+a;if(0<=a&&a<=K[b]){if(0===a)return m(c[b],"step1",""),r[b]=a,!1;if(1===a&&0===g)return c[b].className+=" step1",r[b]=a,!1;m(c[b],"step"+g,"step"+a);r[b]=a;return!1}return!0};S=function(){var a=c[b].getAttribute("data-step-restart");null!=a&&(a=+a>K[b]?K[b]:+a,0===a?m(c[b],"step"+r[b],""):m(c[b],"step"+r[b],"step"+a),r[b]=a)};A=function(a,C){var f=E,d,e;if(!(g.beforeChange&&"stop"===g.beforeChange(b,
c[b])||n||a===b)){if(g.continuous)a=w(a,1);else if(a>=x&&r[b]>=K[b]||0>a&&0===r[b])return;n=!0;if(!C&&!Z(a-b))return setTimeout(function(){n=!1},D);for(e in z)da[e](z[e],b,a);f+=""===h?20:0;d=b;b=a;P&&T(d,b);setTimeout(function(){c[a].className+=" slide"},f);setTimeout(function(){J[a][h+"TransitionDuration"]=D+"ms"},20);setTimeout(function(){S();m(c[d],"current","");m(c[b],"slide","current");g.callback&&g.callback(b,c[b]);n=!1},D+E+120)}};L();k=c[b].className;c[b].className=-1!==k.indexOf("current")?
k:k+" current";for(B?window.addEventListener("resize",L,!1):window.onresize=L;X--;)(function(a){switch(!0){case "wheel"===a:aa=function(a){a=a||window.event;a.preventDefault?a.preventDefault():a.returnValue=!1;n||(a=-a.wheelDelta||a.detail,A(b+(0>a?-1:1)))};B&&document.addEventListener("DOMMouseScroll",aa,!1);window.onmousewheel=document.onmousewheel=aa;break;case "touch"===a:if(!B)break;(function(){var a=z.transform.scale[0],f=z.transform.scale[1]-a,d=z.transform.rotate[0],e=z.transform.rotate[1]-
d,k=z.opacity[0],v=z.opacity[1]-k,y,A,B,E,L,q={},F=!1,O=-1===navigator.userAgent.indexOf("Windows Phone")?!1:!0,l,p,H,M,U,I,N,Q;N=!R&&O?window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"pointerDown",move:"pointerMove",end:"pointerUp"}:{start:"touchstart",move:"touchmove",end:"touchend"};document.body.ontouchmove=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};"Y"===z.transform.translate?(H=function(){var a=b-1,e=b+1;g.continuous&&
(a=w(a),e=w(e));l=J[a];p=J[e];l&&(l[h+"TransitionDuration"]="0ms",l[h+"Transform"]="translate(0,-"+u+"px) translateZ(0)",l[h+"TransformOrigin"]="50% 100%",c[a].className+=" swipe");p&&(p[h+"TransitionDuration"]="0ms",p[h+"Transform"]="translate(0,"+u+"px) translateZ(0)",p[h+"TransformOrigin"]="50% 0%",c[e].className+=" swipe")},I=function(b){var c=Math.abs(b.y/u),g=" scale("+~~(100*(a+f*c))/100+") rotate("+~~(d+e*c)+"deg)";l&&0<b.y&&(l.opacity=~~(100*(k+v*c))/100,l[h+"Transform"]="translate(0,"+~~(b.y-
u)+"px) translateZ(0)"+g);p&&0>b.y&&(p.opacity=~~(100*(k+v*c))/100,p[h+"Transform"]="translate(0,"+~~(u+b.y)+"px) translateZ(0)"+g)},M=function(a,e){var d=D>>1,f=b+e;g.continuous&&(f=w(f));m(c[f],"swipe","slide");a.opacity=1;a[h+"TransitionDuration"]=d+"ms";a[h+"Transform"]="translate(0,"+e*u+"px) translateZ(0)";setTimeout(function(){m(c[f],"slide","");setTimeout(function(){n=!1},50)},d)},U=function(a,e){var d=b+e,f=~~(D/1.5),k,l;g.continuous?(d=w(d),k=c[w(b-e)],l=!0):k=c[b-e];k&&m(k,"swipe","");
!l&&0>d||d>x-1?setTimeout(function(){n=!1},50):(P&&T(b,d),a.opacity=1,m(c[d],"swipe","slide"),a[h+"TransitionDuration"]=f+"ms",a[h+"Transform"]="translate(0,0) translateZ(0)",setTimeout(function(){S();m(c[b],"current","");m(c[d],"slide","current");b=d;g.callback&&g.callback(b,c[b]);setTimeout(function(){n=!1},50)},f))}):(H=function(){var a=b-1,e=b+1;g.continuous&&(a=w(a),e=w(e));l=J[a];p=J[e];l&&(l[h+"TransitionDuration"]="0ms",l[h+"Transform"]="translate(-"+t+"px,0) translateZ(0)",l[h+"TransformOrigin"]=
"100% 50%",c[a].className+=" swipe");p&&(p[h+"TransitionDuration"]="0ms",p[h+"Transform"]="translate("+t+"px,0) translateZ(0)",p[h+"TransformOrigin"]="0 50%",c[e].className+=" swipe")},I=function(b){var c=Math.abs(b.x/t),g=" scale("+~~(100*(a+f*c))/100+") rotate("+~~(d+e*c)+"deg)";l&&0<b.x&&(l.opacity=~~(100*(k+v*c))/100,l[h+"Transform"]="translate("+~~(b.x-t)+"px,0) translateZ(0)"+g);p&&0>b.x&&(p.opacity=~~(100*(k+v*c))/100,p[h+"Transform"]="translate("+~~(t+b.x)+"px,0) translateZ(0)"+g)},M=function(a,
e){var d=D>>1,f=b+e;g.continuous&&(f=w(f));m(c[f],"swipe","slide");a.opacity=1;a[h+"TransitionDuration"]=d+"ms";a[h+"Transform"]="translate("+e*t+"px,0) translateZ(0)";setTimeout(function(){m(c[f],"slide","");setTimeout(function(){n=!1},50)},d)},U=function(a,e){var d=b+e,f=~~(D/1.5),k,l;g.continuous?(d=w(d),k=c[w(b-e)],l=!0):k=c[b-e];k&&m(k,"swipe","");!l&&0>d||d>x-1?setTimeout(function(){n=!1},50):(P&&T(b,d),m(c[d],"swipe","slide"),a.opacity=1,a[h+"TransitionDuration"]=f+"ms",a[h+"Transform"]="translate(0,0) translateZ(0)",
setTimeout(function(){S();m(c[b],"current","");m(c[d],"slide","current");b=d;g.callback&&g.callback(b,c[b]);setTimeout(function(){n=!1},50)},f))});y=function(a){var c=a.touches?a.touches[0]:a;a.preventDefault();R&&(1<event.touches.length||event.scale&&1!==event.scale)||(q={x:c.pageX-B,y:c.pageY-E},F?(a="X"===g.effect.transform.translate?0>q.x?1:-1:0>q.y?1:-1,0<=r[b]+a&&r[b]+a<=K[b]||Q&&I(q)):(Q=Math.abs(q.x)>Math.abs(q.y)?"X":"Y",Q=Q===g.effect.transform.translate?!0:!1,F=!0))};A=function(a){var e=
a.changedTouches?a.changedTouches[0]:a;a=+new Date-L;var d;d=0;var f=!1;q={x:e.pageX-B,y:e.pageY-E};e=Math.abs(q.x);d=Math.abs(q.y);switch(g.effect.transform.translate){case "Y":f=250>+a&&30<d||d>.3*u;d=0<q.y?-1:1;break;case "X":f=250>+a&&30<e||e>.3*t;d=0<q.x?-1:1;break;default:f=350>+a&&50<d+e||d>.3*u||e>.3*t,d=e>d?0<q.x?-1:1:0<q.y?-1:1}f&&Q&&Z(d)&&(!1!==g.continuous||(l||-1!==d)&&(p||1!==d))?g.beforeChange&&"stop"===g.beforeChange(b,c[b])?(l&&M(l,-1),p&&M(p,1)):-1===d?U(l,-1):U(p,1):(l&&M(l,-1),
p&&M(p,1));G.removeEventListener(N.move,y,!1);G.removeEventListener(N.end,A,!1)};G.addEventListener(N.start,function(a){a=a.touches?a.touches[0]:a;if(!n){n=!0;B=a.pageX;E=a.pageY;L=+new Date;if(g.onSwipeStart&&"stop"===g.onSwipeStart(b,c[b]))return n=!1;q={};F=!1;H();G.addEventListener(N.move,y,!1);G.addEventListener(N.end,A,!1)}},!1)})();break;case -1!==a.indexOf("nav:"):(function(){var c=a.split(":")[1],c=document.getElementById(c),f,d;v=c.children;f=v.length;d=v[b].className;if(c&&v){for(;f--;)v[f].setAttribute("data-page",
f);-1===d.indexOf("active")&&(v[b].className=""===d?"active":d+" active");f=function(a){var b;a=a||window.event;a=a.target||a.srcElement;for(b=a.tagName.toLowerCase();"li"!==b;){if("ul"===b)return;a=a.parentNode;b=a.tagName.toLowerCase()}A(+a.getAttribute("data-page"),1)};ea(c,f,1)}})()}})(W[X]);return{thisPage:function(){return b},go:function(a){A(a)},next:function(){A(b+1)},prev:function(){A(b-1)}}}};