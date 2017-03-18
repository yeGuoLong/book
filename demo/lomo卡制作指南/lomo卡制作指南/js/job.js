document.addEventListener('touchmove', function(e){ e.preventDefault() })

function $(selector) { return document.querySelector(selector) }
function $$(selector) { return document.querySelectorAll(selector) }

new PreLoad($('#progress'), [
  'anchor-white.png',
  'audio.png',
  'bird.png',
  'bottle.png',
  'bubble.png',
  'bubble-pos.png',
  'bubble-pos-s.png',
  'drop-up.png',
  'fish.png',
  'joy.png',
  'pos-bottom.png',
  'of.png',
  'p3-title.png',
  'sea.png',
  'sea-behind.png',
  'share-fish.png',
  'ship.png',
  'thedream.png'
], {
  prefix: 'images/',
  complete: function(){
    var $loader = $('#loader')
    var $pages = $('#pages')
    var $page3s = $$('.page-3')
    var $posNavs = $$('.nav')

    $pages.classList.remove('d-n')
    var pages = new PageSlide($('.pages'), 'Y')
    
    Array.prototype.forEach.call($page3s, function($page3) {
      var $area = $page3.firstElementChild.children[2]
      var page = new PageSlide($page3, 'X')

      $area && $area.addEventListener('click', function(e) {
        page.go(1)
      })
    })

    Array.prototype.forEach.call($posNavs, function($posNav) {
      var $pos = $posNav.previousElementSibling.children
      var $lis = $posNav.children
      var l = $lis.length
      var current = 0;

      $posNav.addEventListener('touchmove', function(e) {
        e.stopPropagation()
        e.preventDefault()
      })

      if(l <= 1) return

      Array.prototype.forEach.call($lis, function($li, i) {

        $li.addEventListener('touchend', function(e) {
          if(i === current) return;

          $lis[i].classList.add('active')
          $lis[current].classList.remove('active')
          $pos[i].style.webkitTransform = 'translate3d(0,0,0)'
          $pos[current].style.webkitTransform = 'translate3d(100%,0,0)'
          current = i
        })
      })
    })

    setTimeout(function() {
      $loader.style.display = 'none'
    }, 300)
  }
}).load();

// Lock Sub-Page
!function() {
  var $posPage = $$('.pos-page')
  var flag
  var move
  var X
  var Y

  Array.prototype.forEach.call($posPage, function($page4){
    $page4.addEventListener('touchstart', function(e) {
      var touches = e.touches[0]
      move = 0
      flag = null
      X = touches.pageX
      Y = touches.pageY
    }, false)

    $page4.addEventListener('touchmove', function(e) {
      var touches = e.touches[0]
      var moveX = touches.pageX - X
      var moveY = touches.pageY - Y
      move = moveY

      if(!flag) {
        if(Math.abs(moveX) > Math.abs(moveY)) {
          flag = 'X'
        } else {
          flag = 'Y'
        }
      }

      if(flag === 'Y') {
        e.preventDefault()
        e.stopPropagation()
      }
    }, false)
  })
}();

// Share Modal
!function() {
  var $share = $('#share')
  var $shareTpis = $('#shareTips')
  var $shareHide = $('#shareHide')

  $share.addEventListener('click', function(e) {
    $shareTpis.classList.add('share_show')
  })

  $shareHide.addEventListener('click', function(e) {
    $shareTpis.classList.remove('share_show')
  })
}();


// Horizontal Screen Tips
!function() {
  var STYLESHEET=function(){
    var styleSheet=function(){
      //创建一个styleSheet,避免跨域问题
      var head = document.getElementsByTagName("head")[0]; 
      var style = document.createElement("style"); 
      style.type="text/css"; 
      head.appendChild(style);
      return document.styleSheets[document.styleSheets.length-1];
    }();
    function addStyleSheet(cssText){/*动态添加css样式*/
      var oCss = styleSheet,cssRules=cssText.split('\r\n');
      var len=!!oCss.cssRules?oCss.cssRules.length:0;//不直接使用oCss.cssRules.length是因为跨域时返回null，所以用len避免错误
      for(var i=0;i<cssRules.length;++i){
        oCss.insertRule(cssRules[i],len++);
      };
      return len;
    }
    return {add:addStyleSheet};
  }();


  var webkit=function(){
    //浏览器特有css样式的
    var css3_div=document.createElement("div");
    css3_div.style.cssText='-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
    if(css3_div.style.webkitTransition){
      return '-webkit-';
    }else if(css3_div.style.mozTransition){
      return '-moz-';
    }else if(css3_div.style.oTransition){
      return '-o-';
    }else if(css3_div.style.msTransition){
      return '-ms-';
    }else{
      return '';
    }
  }();

  //横屏警告
  var warn=function(){
    var _warn=document.createElement("div"),_warn_icon=document.createElement('i'),_warn_wrp=document.createElement('div');
    _warn_wrp.style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0; z-index:9999; background-color:#bd1f26; display:none;',_warn.style.cssText='position:absolute; left:50%; top:50%; width:250px; height:150px; margin:-75px 0 0 -125px; text-align:center; color:#ffffff;',_warn_icon.style.cssText='position:relative; display:block; width:74px; height:110px; background:url(images/iphone.png) 0 0 no-repeat; background-size:100%; margin:0 auto; '+webkit+'transform:rotate(-90deg); '+webkit+'animation:TOUCH_DRAG_IPHONE 1.6s ease-in infinite;';
    STYLESHEET.add('@'+webkit+'keyframes TOUCH_DRAG_IPHONE{0%{'+webkit+'transform:rotate(-90deg);}25%{'+webkit+'transform:rotate(0deg);}50%{'+webkit+'transform:rotate(0deg);}75%{'+webkit+'transform:rotate(-90deg);}100%{'+webkit+'transform:rotate(-90deg);}}');//
    document.body.appendChild(_warn_wrp),_warn_wrp.appendChild(_warn),_warn.appendChild(_warn_icon);
    var _warn_text=document.createTextNode('为了更好的体验，请使用竖屏浏览');
    _warn.appendChild(document.createElement('br')),_warn.appendChild(_warn_text);
    var setCssText=function(wrp,icon,text){
      //设置warn的样式
      if(typeof(wrp)=='string')_warn.style.cssText=wrp;
      if(typeof(icon)=='string')_warn_icon.style.cssText=icon;
      if(typeof(text)=='string')_warn_text.nodeValue=text;
    }
    var show=function(){
      _warn_wrp.style.display='block';
    }
    var hide=function(){
      _warn_wrp.style.display='none';
    }
    return {show:show,hide:hide,setCssText:setCssText};
  }();
  var need_watch='onorientationchange' in window;
  var clientHeight=document.documentElement.clientHeight,clientWidth=document.documentElement.clientWidth;
  if(need_watch){
    if(window.orientation!='0')warn.show();
    window.addEventListener('orientationchange',function(){
      if(window.orientation!='0'){
        warn.show();
      }else{
        warn.hide();
      }
    },false);
  }else{
    if(clientHeight<clientWidth)warn.show();
  }
  //监听窗口变化
  window.addEventListener('resize',function(){
    clientHeight=document.documentElement.clientHeight,clientWidth=document.documentElement.clientWidth;
    if(!need_watch){//没办监听orientationchange，用resize代替
      if(clientHeight<clientWidth){
        warn.show();
      }else{
        warn.hide();
      }
    }
  },false);
}();


// Audio
!function() {
  var $audio = $('audio')
  var $audioContorl = $('.audio-c')

  $audioContorl.addEventListener('click', function() {
    if( $audioContorl.classList.contains('play') ) {
      $audioContorl.classList.remove('play')
      $audio.pause()
    }
    else {
      $audioContorl.classList.add('play')
      $audio.play()
    }
  })
}();

// Share Config
!function(){
  var path=window.location.protocol+"//"+window.location.host+window.location.pathname.replace(/[^\/]+$/,''),
    url=path+'index.html',
    desc='我们的征途是星辰大海，梦想是指引我们前行的方向，所以向心怀梦想的你发出邀请，京东招募现在开启，更多职位请点击',
    title='京东招募榜';
  
  if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    init();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", init, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", init);
      document.attachEvent("onWeixinJSBridgeReady", init);
    }
  }
  function init(){
    WeixinJSBridge.on("menu:share:appmessage", shareToFriend);
    WeixinJSBridge.on("menu:share:timeline", shareToFriends);
  }
  function shareToFriend(){
    WeixinJSBridge.invoke("sendAppMessage", {
      appid: "wx06e3073fd4d17e3b",
      img_url:image,
      img_width: "80",
      img_height: "80",
      link: url,
      desc: desc,
      title: title
    }, function (res) {
      //alert(res.err_msg);
    });
  }
  function shareToFriends(){
    WeixinJSBridge.invoke("shareTimeline", {
      img_url:image,
      img_width: "80",
      img_height: "80",
      link: url,
      desc: desc,
      title: desc
    }, function (res) {
      //alert(res.err_msg);
    });
  }
}();