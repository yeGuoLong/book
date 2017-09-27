/****左右联动开始*****/
$('.main-list a:first').addClass("selected");
$('.main-list a:first').children("p").addClass('active');
$('.list dl:last').css('min-height',$(window).height()-$('.header').height() - $('.bar-bottom').height());
$(window).resize(function(){
    $('.list dl:last').css('min-height',$(window).height()-$('.header').height() - $('.bar-bottom').height());
});
//左边栏点击事件
$('.main-list a').click(function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    $(this).children("p").addClass('active');
    $(this).siblings().children("p").removeClass("active");
    var _index = $(this).index();
    var top = $('.list dl').eq(_index).offset().top;
    $('body').animate({scrollTop: top-43}, 300);
    // console.log('序列：'+_index+'距离顶端高度：' + top +'滚轮高度：'+ $("body").scrollTop());
});
//判断当前所在的位置为合适的栏目加上样式
function skipHref() {
    $('.list dl').each(function(){
        var dlLastTop = parseInt($('.list dl:last').offset().top);
        // console.log(parseInt($(this).offset().top)+'bodyH:'+ parseInt($('body').scrollTop()+43)+'====='+$('.list dl:last').offset().top+'最后一个dl'+dlLastTop);
        if (parseInt($('body').scrollTop()) >= dlLastTop) {
            $('.main-list a:last').addClass("selected").siblings().removeClass("selected");
            $('.main-list a:last').children("p").addClass('active');
            $('.main-list a:last').siblings().children("p").removeClass("active");
        }else if (parseInt($(this).offset().top) <= parseInt($('body').scrollTop()+43)) {
            var _in = $(this).index();
            // console.log('============'+_in);
            $('.main-list a').eq(_in).addClass("selected").siblings().removeClass("selected");
            $('.main-list a').eq(_in).children("p").addClass('active');
            $('.main-list a').eq(_in).siblings().children("p").removeClass("active");
        }
    });
}

$(window).scroll(function(){
    if (!$("body").is(":animated")) {
       skipHref(); 
    }
});
/****左右联动结束***/