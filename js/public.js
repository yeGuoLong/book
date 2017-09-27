/*给li加边距*/
//id 类名或id名;t 给li第几个加上数字,0则为原来的;m1 左边距,百分比;m2 右边距,百分比;p 所除的模，
function li_margin(id, t, m1, m2, p) {
    var length_li = 0
    $(id).each(function() {
        length_li++;
        if ((length_li + t) % p == 0) {
            $(this).css({ "margin-left": m1 + "%", "margin-right": m2 + "%" });
        };
    });
}


//获得url带过来的参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


//解决javascript乘法浮点值运算Bug
function FloatMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) {}
    try { m += s2.split(".")[1].length } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//加法
function FloatAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

//减法  
function FloatSub(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度  
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//除法  
function FloatDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) {}
    try { t2 = arg2.toString().split(".")[1].length } catch (e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""));

        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}


// 判断是否是微信打开开始
var ua = window.navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //微信环境下接收微信支付返回参数

} else {
    //非微信环境下接受支付宝支付返回参数

}
// 判断是否是微信打开结束


//毫秒数转为具体时间开始
var twoInt = function(int) {
    return (int < 10) ? '0' + int : int;
};
var msToTime = function(millSec) {
    var newTime = new Date(millSec);
    var re = newTime.getFullYear() + '-' + twoInt(newTime.getMonth() + 1) + '-' + twoInt(newTime.getDate()) + ' ' + twoInt(newTime.getHours()) + ':' + twoInt(newTime.getMinutes());
    // console.log(re);
    return re;
};
// msToTime(1467993293210.00);
//毫秒数转为具体时间结束


/*******兼容IE的placeholder开始********/
if (!('placeholder' in document.createElement('input'))) {
    $('input[placeholder],textarea[placeholder]').each(function() {
        var that = $(this),
            text = that.attr('placeholder');
        if (that.val() === "") {
            that.val(text).addClass('placeholder');
        }
        that.focus(function() {
                if (that.val() === text) {
                    that.val("").removeClass('placeholder');
                }
            })
            .blur(function() {
                if (that.val() === "") {
                    that.val(text).addClass('placeholder');
                }
            })
            .closest('form').submit(function() {
                if (that.val() === text) {
                    that.val('');
                }
            });
    });
}
/*******兼容IE的placeholder结束********/


// 浏览器自动跳到移动版开始
// <script>
function browserRedirect() {
    var url = window.location.href;
    if (url.indexOf("weixin") > -1) {
        url = url.replace(/item/, "mobile/getwxcode3.htm?toUrl=item");
        if (url.lastIndexOf(".html") == -1) {
            url = url.replace(/#/, ".html#");
        }
        url = url.substring(0, url.indexOf("#"));
        location = url;
    }
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        //跳转到移动版
        location = "/mobile/";
    }
}

browserRedirect();
// </script>
// 浏览器自动跳到移动版结束


/**显示星期开始*/
function getweek() {
    var a = new Array("日", "一", "二", "三", "四", "五", "六");
    var week = new Date().getDay();
    var str = "星期" + a[week];
    return str;
}
/**显示星期结束*/

/***字数限制开始，text:字符,num:限制字数***/
function wordCut(text, num) {
    var newText = '';
    if (text.length > num) {
        newText = text.substring(0, num - 1) + '...';
    } else {
        newText = text;
    }
    return newText;
};
/***字数限制结束***/



/****生成含字母的随机数开始,n为随机数数量***/
var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function generateMixed(n) {
    var res = '';
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}
/****生成含字母的随机数结束***/

/***解决父级与孩子之间的点击事件冲突开始**/
event.stopPropagation(); //在孩子点击事件中加该语句
$('.main-ul').click('.quan-btn,.replay-btn,.del-btn', function() {
    commentEditHide();
}); //父级点击事件中加孩子名
/***解决父级与孩子之间的点击事件冲突结束**/

/**解决append的孩子事件无效开始**/
//查看详情点击事件
$('body').on('click', '.replay-con .comment-num', function() {
    commentNumClick(this);
});

function commentNumClick(_this) {
    //点击事件内容
}
/**解决append的孩子事件无效结束**/


/**JS没有现成的函数，能够直接生成指定范围的随机数开始**/
但是它有个函数： Math.random() 这个函数可以生成[0, 1) 的一个随机数。
利用它， 我们就可以生成指定范围内的随机数。
而涉及范围的话， 就有个边界值的问题。 这样就包含四种情况：
1） min≤ r≤ max(一般这种比较常见)
2） min≤ r < max
3) min < r≤ max
4） min < r < max
一、 min≤ r≤ max

function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}
二、 min≤ r < max

function RandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range); //舍去
    return num;
}
三、 min < r≤ max

function RandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    if (Math.round(Rand * Range) == 0) {
        return Min + 1;
    }
    var num = Min + Math.round(Rand * Range);
    return num;
}
四、 min < r < max

function RandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    if (Math.round(Rand * Range) == 0) {
        return Min + 1;
    } else if (Math.round(Rand * Max) == Max) {
        index++;
        return Max - 1;
    } else {
        var num = Min + Math.round(Rand * Range) - 1;
        return num;
    }
}
/**JS没有现成的函数，能够直接生成指定范围的随机数结束**/


/***获取input checked值开始****/
var pri1 = $('input:radio:checked').val();
/***获取input checked值结束****/


/***冒泡排序开始***/
function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

//正向冒泡算法
function bubbleSort(items) {

    var len = items.length,
        i, j, stop;

    for (i = 0; i < len; i++) {
        for (j = 0, stop = len - i; j < stop; j++) {
            if (items[j] > items[j + 1]) {
                swap(items, j, j + 1);
            }
        }
    }

    return items;
}
var cc = [2, 9, 6, 5, 3, 2, 4, 2];
console.log(bubbleSort(cc));


//反向冒泡排序
function bubbleSort(items) {
    var len = items.length,
        i, j;

    for (i = len - 1; i >= 0; i--) {
        for (j = len - i; j >= 0; j--) {
            if (items[j] < items[j - 1]) {
                swap(items, j, j - 1);
            }
        }
    }

    return items;
}

//反序冒泡排序
function bubbleSort2(items) {
    var len = items.length,
        i, j, stop;
    for (i = 0; i < len; i++) {
        for (j = 0, stop = len - i; j < stop; j++) {
            if (items[j] < items[j + 1]) {
                swap(items, j, j + 1);
            }
        }
    }
    return items;
}
/***冒泡排序结束***/



/****给你一个字符串，要你找出里面出现次数最多的字母和出现的次数，例如：“abaasdffggghhjjkkgfddsssss”开始*****/
var str = "abaasdffggghhjjkkgfddssssse";
var arr = new Array();
var i = 0;
while (str.charAt(0)) {
    arr[i] = str.charAt(0) + "=" + (str.split(str.charAt(0)).length - 1);
    str = str.split(str.charAt(0)).join("");
    i++;
}
console.log(arr);
for (var j = 0, temp = 0; j < arr.length; j++) {
    if (temp <= Number(arr[j].split("=")[1])) {
        temp = Number(arr[j].split("=")[1]);
        i = j;
    }
}
console.log(arr[i]);
/****给你一个字符串，要你找出里面出现次数最多的字母和出现的次数，例如：“abaasdffggghhjjkkgfddsssss”结束*****/

/**去掉数组中重复的元素开始**/
Array.prototype.strip = function() {
    if (this.length < 2) {
        return [this[0]] || [];
    }
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        arr.push(this.splice(i--, 1));
        for (var j = 0; j < this.length; j++) {
            if (this[j] == arr[arr.length - 1]) {
                this.splice(j--, 1);
            }
        }
    }
    return arr;
};
var a = ["abc", "abc", "a", "b", "c", "a", "b", "c"];
alert(a.strip());
/**去掉数组中重复的元素结束**/



/**页面重新加载（刷新）开始**/
window.location.reload();
/**页面重新加载（刷新）结束**/