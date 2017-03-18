//可参考C:\Users\Administrator\Documents\GitHub\jq\leyou_mobile_site\src\main\webapp\view\goods\goods_detailNew.ftl

<script src="https://res.wx.qq.com/open/js/jweixin-1.1.0.js" ></script>
<script >

    var wxconfig;
    var link = window.location.href.split("?")[0]+'?isWx=wx';

    $.ajax({
        url:"${basePath}/queryWxConfig.htm?curUrl="+ encodeURIComponent(window.location.href.split('#')[0]),
        async:false,
        success:function(data){
            if(data != null){
                wxconfig = {
                    appId : data.appId,
                    timestamp : data.timestamp,
                    nonceStr : data.nonceStr,
                    signature : data.signature
                };
            }

        }
    });


    wx.config({
        debug: false,
        appId: wxconfig.appId, // 公众号的唯一标识
        timestamp:wxconfig.timestamp , // 生成签名的时间戳
        nonceStr: wxconfig.nonceStr, // 生成签名的随机串
        signature: wxconfig.signature,// 签名
        jsApiList: ['onMenuShareTimeline',
            'onMenuShareAppMessage'] // 需要使用的JS接口列表
    });

    //处理失败验证
    wx.error(function(res){

    });
    wx.ready(function(){

        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: '${map.detailBean.productVo.productName!''}', // 分享标题
            link: link, // 分享链接
            imgUrl: '${map.detailBean.productVo.goodsInfoImgId!''}', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: '${map.detailBean.productVo.productName!''}', // 分享标题
            desc: '${map.detailBean.productVo.subtitle!''}', // 分享描述
            link: link, // 分享链接
            imgUrl: '${map.detailBean.productVo.goodsInfoImgId!''}', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });

</script>