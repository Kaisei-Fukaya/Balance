var RESIZE = {
    
    WIDTH:480,
    HEIGHT:320,
    RATIO: null,
    RATIOP: null,
    canvas: null,
    ctx: null,
    currentHeight: null,
    currentWidth: null,
    RECT: null,
    ua: null,
    android: null,
    ios: null,
    docElem: null,
    
    init: function(){
        RESIZE.RATIO = RESIZE.WIDTH / RESIZE.HEIGHT;
        RESIZE.RATIOP = RESIZE.HEIGHT / RESIZE.WIDTH;
        RESIZE.currentWidth = RESIZE.WIDTH;
        RESIZE.currentHeight = RESIZE.HEIGHT;
        RESIZE.canvas = document.getElementsByTagName("canvas")[0];
        RESIZE.canvas.width = RESIZE.WIDTH;
        RESIZE.canvas.height = RESIZE.HEIGHT;
        RESIZE.ctx = RESIZE.canvas.getContext("2d");
        RESIZE.ctx.webkitImageSmoothingEnabled = false;
        RESIZE.ua = navigator.userAgent.toLowerCase();
        RESIZE.android = RESIZE.ua.indexOf('android') > -1 ? true : false;
        RESIZE.ios = ( RESIZE.ua.indexOf('iphone') > -1 || RESIZE.ua.indexOf('ipad') > -1  ) ? true : false;
        RESIZE.docElem = document.documentElement;
        RESIZE.resize();
    },
    
    resize: function(){
        if(window.innerHeight > window.innerWidth){
            RESIZE.currentWidth = window.innerWidth;
            RESIZE.currentHeight = RESIZE.currentWidth * RESIZE.RATIOP;
            if(RESIZE.android || RESIZE.ios){
/*                document.body.style.height = (window.innerHeight + 50)+"px";*/
                //Go fullscreen
/*                if(RESIZE.docElem.requestFullscreen){
                    RESIZE.docElem.requestFullscreen();
                }else if(RESIZE.docElem.mozRequestFullScreen){
                    RESIZE.docElem.mozRequestFullScreen();
                }else if(RESIZE.docElem.webkitRequestFullscreen){
                    RESIZE.docElem.webkitRequestFullscreen();
                }else if(docElem.msRequestFullscreen){
                    RESIZE.docElem.msRequestFullscreen();
                }*/
            }
        };
        if(window.innerWidth > window.innerHeight){
            if(RESIZE.android || RESIZE.ios){
                RESIZE.currentHeight = window.innerHeight;
            }else{
                RESIZE.currentHeight = window.innerHeight/1.5;
            }
            RESIZE.currentWidth = RESIZE.currentHeight * RESIZE.RATIO;
            if(RESIZE.android || RESIZE.ios){
/*                document.body.style.height = (window.innerHeight + 50)+"px";*/
                //Go fullscreen
/*                if(RESIZE.docElem.requestFullscreen){
                    RESIZE.docElem.requestFullscreen();
                }else if(RESIZE.docElem.mozRequestFullScreen){
                    RESIZE.docElem.mozRequestFullScreen();
                }else if(RESIZE.docElem.webkitRequestFullscreen){
                    RESIZE.docElem.webkitRequestFullscreen();
                }else if(docElem.msRequestFullscreen){
                    RESIZE.docElem.msRequestFullscreen();
                }*/
            }
        };
        RESIZE.RECT = canvas.getBoundingClientRect();
        RESIZE.canvas.style.width = RESIZE.currentWidth + "px";
        RESIZE.canvas.style.height = RESIZE.currentHeight + "px";
/*        RESIZE.canvas.width = RESIZE.canvas.clientWidth;
        RESIZE.canvas.height = RESIZE.canvas.clientHeight;
        RESIZE.ctx.scale(RESIZE.RATIO,RESIZE.RATIO);*/
/*        window.setTimeout(function(){
            window.scrollTo(0,1);
        }, 1);*/
    },
    
};

window.addEventListener("load", RESIZE.init, false);
window.addEventListener("resize", RESIZE.resize, false);