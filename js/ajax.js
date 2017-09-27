/**
 * ajax插件(原生)
 * author:yegl
 * date:20170621
 * version: 1.0.0
 * 调用方式
 ajax({
     type:"get",//post或者get，非必须
     url:"test.jsp",//必须的
     data:{"a":1},//非必须
     dataType:"json",//text/xml/json，非必须
     async:true,//是否异步，非必须
     contentType:'application/x-www-form-urlencoded',//内容类型，非必须
     timeout:2000,//超时时间，可选
     success:function(data){//回调函数，非必须
         alert(data);
     },
     fail:function(data){//回调函数，非必须
         alert(data);
     }
  });**/
'use strict';
var createAjax = function() {
    var xhr;
    try {
        //ie系列浏览器
        xhr = new ActiveXobject('Microsoft.XMLHTTP');
    } catch (e1) {
        try {
            //非ie浏览器
            xhr = new XMLHttpRequest();
        } catch (e2) {
            window.alert('your Browser not support ajax,please change another!');
        }
    }
    return xhr;
};

var ajax = function(conf) {
    //初始化
    //type参数，可选
    var type = (conf.type || 'get').toUpperCase();
    //url参数，必填
    var url = conf.url || '';
    //data参数可选，只有在post请求时需要
    var data = conf.data || {};
    //dataType参数可选,默认为json
    var dataType = (conf.dataType || 'json').toUpperCase();
    //async参数可选，默认为true异步请求
    var async = conf.async || true;
    //post请求时content-type类型可选，默认application/x-www-form-urlencoded
    var contentType = conf.contentType || 'application/x-www-form-urlencoded';


    //回调函数可选
    var success = conf.success,
        fail = conf.fail;
    if (!url || url === '') {
        alert('please set url !');
        return;
    } else if (type === 'GET' && url.indexOf('?') === -1) { //get方式时检查URL是否转为参数url，若没有则把data中的数据转化作为url传递给服务器
        url = url + '?' + getParams(data);
    }
    //创建ajax引擎对象
    var xhr = createAjax();
    //打开
    xhr.open(type, url, async);
    //超时时间，毫秒数，可选，默认无
    if (conf.timeout) {
        xhr.timeout = conf.timeout;
    }
    //发送
    if (type === 'GET') {
        xhr.send(null);
    } else if (type === 'POST') {
        xhr.setRequestHeader('content-type', contentType);
        xhr.send(JSON.stringify(data)); //发送的数据需要转化成JSON格式
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200 && success && typeof success == 'function') {
            if (dataType === 'TEXT') {
                success(xhr.responseText);
            } else if (dataType === 'XML') {
                success(xhr.responseXML);
            } else if (dataType === 'JSON') {
                success(eval('' + xhr.responseText));
            }
        } else if (xhr.readyState === 4 && xhr.status !== 200 && fail && typeof fail == 'function') {
            fail(xhr);
        }
    }

}

/**
 * 对象参数的处理，拼接并防止乱码
 * @param data
 * @returns {string}
 */
function getParams(data) {
    var arr = [];
    for (var param in data) {
        arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
    }
    arr.push(('randomNumber=' + Math.random()).replace('.', ''));
    // console.log(arr);
    return arr.join('&');
}
