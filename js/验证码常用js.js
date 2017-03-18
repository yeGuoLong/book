// a标签中添加点击事件，调用方法
// <a class="get-confirmcode" href="#" onClick="codeNock();">获取验证码</a>

//js中用的方法
	function codeNock(){
		$(".get-confirmcode").html('60秒后重新获取');
        $(".get-confirmcode").attr('data-t','60');
        $(".get-confirmcode").attr("onClick","");
        $(".get-confirmcode").css("color","gray");
        $("#mobile").attr("readonly","readonly");
        setTimeout(countDown, 1000);
	};

	function countDown(){
        var time = $(".get-confirmcode").attr('data-t');
        $(".get-confirmcode").html((time - 1)+"秒后重新获取");
        $(".get-confirmcode").attr('data-t',(time - 1));
        time = time - 1;
        if (time < 1) {
            $(".get-confirmcode").attr("onClick","codeNock();");
            $(".get-confirmcode").html("获取验证码");
            $(".get-confirmcode").css("color","red");
            $("#mobile").removeAttr("readonly");
        } else {
            setTimeout(countDown, 1000);
        }
    }
		