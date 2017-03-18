function addListener(element, eventType, listener){
    if (element.addEventListener) {
        element.addEventListener(eventType, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventType, listener);
    } else {
        element['on' + eventType] = listener;
    }
}
 
// 用于页面加载完成之前，调用时需要放在HTML的顶部
function loadJS(url){
    addListener(window, 'load', function(){
        addJS(url);
    });
}

<html>
    <head>
        <meta content="text/html; charset=UTF-8">
        <script type="text/javascript">
            function makeJS(url){
                var js = document.createElement('script');
                js.type = 'text/javascript';
                js.src = url;
                return js;
            }
             
            // 用于页面加载完成之后，调用时需要放在HTML的底部，或在body的onload里
            function addJS(url){
                document.getElementsByTagName('head')[0].appendChild(makeJS(url));
            }
        </script>
    </head>
    <body onload="addJS('test.js')">
    </body>
</html>

function addListener(element, eventType, listener){
  if (element.addEventListener) {
    element.addEventListener(eventType, listener, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventType, listener);
  } else {
    element['on' + eventType] = listener;
  }
}
function makeJS(url){
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = url;
    return js;
}
// 用于页面加载完成之后，调用时需要放在HTML的底部
function addJS(url){
    document.getElementsByTagName('head')[0].appendChild(makeJS(url));
}
// 用于页面加载完成之前，调用时需要放在HTML的顶部
function loadJS(url){
    addListener(document.body, 'load',function(){
        addJS(url);
    });
}