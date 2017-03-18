<?php 
include $_SERVER['DOCUMENT_ROOT'] . '/com/jsback/wct/jssdk.php';
$appId = 'wx2b98b68e4a66d204';
$appSecret = '20a3af2d88d8919ae0730f34f167824a';
$jssdk = new JSSDK($appId, $appSecret);
$signPackage = $jssdk -> getSignPackage();
?>
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1.0">
		<title>6.1福利日，玩爆儿童节</title>
		<link rel="stylesheet" type="text/css" href="./css/base.css" />
		<link rel="stylesheet" type="text/css" href="./css/style.css" />
		<script type="text/javascript" src="./js/jquery-2.1.4.js"></script>
	</head>

	<body style="background: #c0f6f4;">
		<div class="childrensDay">
			<div class="bg">
				<img class="childrensDay_bg" src="./images/partner_bg.png" />
				<!-- 转盘开始 -->
				<!-- <img class="zhuan_bg" src="./images/zhuan_bg.png" /> -->
				<img class="zhuan_bg_btn" src="./images/zhuan_bg_btn.png" r="1" />
				<img class="tan_bg" src="./images/tan_bg.png" />
				<img class="tan_close_btn" src="./images/tan_close_btn.png" />
				<div class="tan_pan"></div>
				<div class="tan_con">
					<p class="tan_con_title">恭喜您抽中</p>
					<p class="tan_con_name"></p>
					<p class="tan_con_quan">&nbsp;&nbsp;<span class="tan_con_txt"></span></p>
					<p class="tan_con_btn">长按即可复制</p>
				</div>
				<div class="tan_off">
					<p class="tan_off_title">您还没有抽奖哦</p>
					<p class="tan_off_name">赶紧去试试手气吧</p>
				</div>
				<div class="tan_over">
					<p class="tan_over_title">您的抽奖机会已经用完</p>
					<p class="tan_over_name">看看下面的产品吧</p>
				</div>
				<div class="tan_liuLiang">
					<p class="tan_con_title">恭喜您抽中</p>
					<p class="tan_con_name">30M电信流量</p>
					<p class="tan_con_number"><input style="border: none;" class="tan_con_phone" type="txt" minlength="11" maxlength="11" name="phone" placeholder="请在这输入江苏电信手机号码" value="" /></p>
					<p class="tan_con_phone_btn">确定</p>

				</div>
				<div class="tan_liuLiang_over">
					<p class="tan_con_title">恭喜您抽中</p>
					<p class="tan_con_name">30M电信流量</p>
					<p class="tan_con_number"><input style="border: none;" class="tan_con_phone" type="txt" minlength="11" maxlength="11" name="phone" placeholder="请在这输入江苏电信手机号码" value="" /></p>
					<p class="tan_con_phone_over_btn">确定</p>
				</div>
				<div class="tan_guanZhu">
					<p>奖品由公众号“乐优”提供</p>
					<p class="tan_guanZhu_txt">请长按下方二维码关注，关注后即可查看中奖记录</p>
					<img class="tan_guanZhu_pic" src="./images/wx_pic.png" />
				</div>
				<div id="lottery">
					<table class="zhuan_items" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td class="lottery-unit lottery-unit-0"><img src="./images/zhuan_01.png"></td>
							<td class="lottery-unit lottery-unit-1"><img src="./images/zhuan_02.png"></td>
							<td class="lottery-unit lottery-unit-2"><img src="./images/zhuan_03.png"></td>
							<td class="lottery-unit lottery-unit-3"><img src="./images/zhuan_04.png"></td>
						</tr>
						<tr>
							<td class="lottery-unit lottery-unit-9"><img src="./images/zhuan_05.png"></td>
							<td class="zhuan_btn" colspan="2" style="cursor: pointer;"></td>
							<td class="lottery-unit lottery-unit-4"><img src="./images/zhuan_06.png"></td>
						</tr>
						<tr>
							<td class="lottery-unit lottery-unit-8"><img src="./images/zhuan_07.png"></td>
							<td class="lottery-unit lottery-unit-7"><img src="./images/zhuan_08.png"></td>
							<td class="lottery-unit lottery-unit-6"><img src="./images/zhuan_09.png"></td>
							<td class="lottery-unit lottery-unit-5"><img src="./images/zhuan_10.png"></td>
						</tr>
					</table>
				</div>

				<div class="btns">
					<a href="rules.html?id=<?php echo time(); ?>"><img class="btn_rules" src="./images/btn_rules.png" /></a>
					<img class="btn_zhongJiang" src="./images/btn_zhongJiang.png" />
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript">
		var zjbh;
		var quan_name = "";
		var quan_ma ="";
		var lottery = {
			index: -1,
			count: 0,
			timer: 0,
			speed: 20,
			times: 0,
			cycle: 50,
			prize: -1,
			init: function(id) {
				if ($("#" + id).find(".lottery-unit").length > 0) {
					$lottery = $("#" + id);
					$units = $lottery.find(".lottery-unit");
					this.obj = $lottery;
					this.count = $units.length;
					$lottery.find(".lottery-unit-" + this.index).addClass("active");
				};
			},
			roll: function() {
				var index = this.index;
				var count = this.count;
				var lottery = this.obj;
				$(lottery).find(".lottery-unit-" + index).removeClass("active");
				index += 1;
				if (index > count - 1) {
					index = 0;
				};
				$(lottery).find(".lottery-unit-" + index).addClass("active");
				this.index = index;
				return false;
			},
			stop: function(index) {
				this.prize = index;
				return false;
			}
		};
		//券码显示
		var quan_show = function(quan_name, quan_ma) {
			$('p.tan_con_name').html(quan_name);
			$('span.tan_con_txt').html(quan_ma);
			$('.bg img.tan_bg,.bg .tan_con,.bg .tan_con p,.bg .tan_con span,.bg img.tan_close_btn,.tan_pan').show();
		};
		//弹窗显示
		var tan_show = function(zjbh) {
				if (zjbh === 0) { //30M电信流量
					var quan_name = '30M电信流量';
					$('p.tan_con_name').html(quan_name);
					$('.bg img.tan_bg,.bg .tan_liuLiang p,.tan_liuLiang,.tan_con_number,input.tan_con_phone,.tan_con_phone_btn,.bg img.tan_close_btn,.tan_pan').show();
				} else if (zjbh === 1) { //LOZ小颗粒积木小黄人拼装玩具
					//var quan_name = 'LOZ小颗粒积木小黄人拼装玩具';
					//var quan_ma = 'JHGLHLHJBLJBLJBs';
					quan_show(quan_name, quan_ma);
				} else if (zjbh === 3) { //蝙蝠侠-卡通小U盘64G
					//var quan_name = '蝙蝠侠-卡通小U盘64G';
					//var quan_ma = 'JHGLHLHJBLJBLJBs';
					quan_show(quan_name, quan_ma);
				} else if (zjbh === 4) { //5元现金券
					//var quan_name = '5元现金券';
					//var quan_ma = 'JHGLHLHJBLJBLJBs';
					quan_show(quan_name, quan_ma);
				} else if (zjbh === 6) { //10元现金券
					//var quan_name = '10元现金券';
					//var quan_ma = 'JHGLHLHJBLJBLJBs';
					quan_show(quan_name, quan_ma);
				}
			}
			//弹窗关闭
		var tanClose = function() {
				$('.bg img.tan_bg,.bg .tan_con,.tan_off,.bg .tan_over,.bg p,.bg span,.bg img.tan_close_btn,.bg img.tan_guanZhu_pic,.tan_pan,.tan_liuLiang_over').hide();
			}
			//中奖滚动
		function roll() {
			lottery.times += 1;
			lottery.roll();
			if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
				clearTimeout(lottery.timer);
				lottery.prize = -1;
				lottery.times = 0;
				click = false;
				//转盘停留后操作 显示中奖内容 中奖码
				setTimeout(function() {
					tan_show(zjbh); //调用弹窗显示函数
				}, 600);
			} else {
				if (lottery.times < lottery.cycle) {
					lottery.speed -= 10;
				} else if (lottery.times == lottery.cycle) {
					//控制指针停留位置  zjbh为后台传的奖品编号
					var index = zjbh;
					lottery.prize = index;
				} else {
					if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
						lottery.speed += 110;
					} else {
						lottery.speed += 20;
					}
				}
				if (lottery.speed < 40) {
					lottery.speed = 40;
				};
				// console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
				lottery.timer = setTimeout(roll, lottery.speed);
			}
			return false;
		}
		//判断手机号是否符合要求
		var pNumber = function(phoneNumber) {
			if (phoneNumber.length < 11 || !/^(133[0-9]|153[0-9]|180[0-9]|189[0-9]|181[0-9]|177[0-9])\d{7}$/i.test(phoneNumber)) {
				tan_show(zjbh);
			} else {
				var quan_name = '30M电信流量';
				var tiShi = '中奖号码为\t\t' + phoneNumber;
				$(".tan_con_number").html(tiShi);
				$('.bg>img.tan_bg,.tan_liuLiang_over>p.tan_con_title,.tan_liuLiang_over>p.tan_con_name,.tan_liuLiang_over,.tan_liuLiang_over>.tan_con_number,.tan_liuLiang_over>.tan_con_phone_over_btn,.bg img.tan_close_btn,.tan_pan').show();
			}
		}
		var click = false;
		var guanZhu;
		var chouJiang;
		window.onload = function() {
			lottery.init('lottery');
			//点击抽奖按钮后的操作
			$("img.zhuan_bg_btn").click(function() {
				if (click) {
					return false;
				} else {
					//后台传入用户是否关注，给关注赋值-->guanZhu === 0表示未关注
					guanZhu = "1"; //getQueryString("subscribe");
					if (guanZhu === "0") {
						$('img.tan_bg,.tan_guanZhu,.tan_guanZhu p,img.tan_guanZhu_pic,img.tan_close_btn,.tan_pan').show();
					} else {
						//后台传入用户是否已经抽奖，给抽奖赋值-->chouJiang === 0表示未抽奖
						chouJiang = 0;
						if (chouJiang === 0) {
							if ($(this).attr('r') === '1') {
								$.getJSON("http://wx.loyoo.co/huodong/61/wx_api.php?type=jiang&openid=<?php session_start(); echo $_SESSION['openid']; ?>&callback=?", function(data) {
									//后台给中奖编号赋值 0-->30M电信流量 1-->LOZ小颗粒积木小黄人拼装玩具  3-->蝙蝠侠-卡通小U盘64G  4-->5元现金券  6-->10元现金券
									if (data.re === "0") {
										alert(data.msg);
									} else {
										zjbh = parseInt(data.type);
										
										quan_name = data.msg ;
		 								quan_ma = quan_name + "</br>"+ data.password;
		 								
										lottery.speed = 100;
										roll();
										click = true;
										$(this).attr('r', '0');
										return false;
									}
								});
							} else {
								$('.bg .tan_over,.bg .tan_over p,.bg img.tan_bg,.bg img.tan_close_btn,.tan_pan').show();
							}
						} else {
							$('.bg .tan_over,.bg .tan_over p,.bg img.tan_bg,.bg img.tan_close_btn,.tan_pan').show();
						}
					}
				}
			});

			function getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			}
			$("img.tan_close_btn").click(function() {
				tanClose(); //调用弹窗关闭函数
			});
			$(".tan_pan").click(function() {
				tanClose(); //调用弹窗关闭函数
			});
			$("p.tan_con_phone_over_btn").click(function() {
				tanClose(); //调用弹窗关闭函数
			});
			$('p.tan_con_phone_btn').click(function() {
				var phoneNumber = $("input[name='phone']").val();
				if (phoneNumber.length < 11 || !/^(133[0-9]|153[0-9]|180[0-9]|189[0-9]|181[0-9]|177[0-9])\d{7}$/i.test(phoneNumber)) {
					alert('请输入正确的电信手机号');
				} else {
					var url = "http://wx.loyoo.co/huodong/61/wx_api.php?phone=" + phoneNumber + "&type=phone&openid=<?php session_start(); echo $_SESSION['openid']; ?>&callback=?";
					console.log(url);
					$.getJSON(url, function(data) {
						alert(data.msg);
						//添加Ajax上传手机号的函数请在这里
						tanClose(); //调用弹窗关闭函数
					});
				}
			});
			$("img.btn_zhongJiang").click(function() {
				//if (getQueryString("subscribe") === "1") {
					$.getJSON("http://wx.loyoo.co/huodong/61/wx_api.php?type=get&openid=<?php session_start(); echo $_SESSION['openid']; ?>&callback=?", function(data) {
						if (data.re === "0") {
							var r = $('img.zhuan_bg_btn').attr('r');
							if (r === '1') {
								$(".tan_off,.bg .tan_off p,.bg img.tan_bg,.bg img.tan_close_btn,.tan_pan").show();
							} else {
								if (zjbh === 0) {
									//后台传入用户输入并提交的手机号
									var phoneNumber = 18900000000;
									pNumber(phoneNumber); //调用判断手机号是否符合要求函数
								} else {
									tan_show(zjbh); //调用弹窗显示函数
								}
							}
						} else {
							quan_show(data.msg, data.password);
						}
					});
				//}
				//else{
				//	$('img.tan_bg,.tan_guanZhu,.tan_guanZhu p,img.tan_guanZhu_pic,img.tan_close_btn,.tan_pan').show();
				//}
			});
		};
		//百度站长统计代码
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?90e08e529d62e2c6134f4aee33a75157";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
	</script>

</html>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script>
		wx.config({
	    debug: false,
	    appId: '<?php echo $signPackage["appId"];?>',
	    timestamp: <?php echo $signPackage["timestamp"];?>,
	    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
	    signature: '<?php echo $signPackage["signature"];?>',
	    jsApiList: [
	      // 所有要调用的 API 都要加到这个列表中
	      "onMenuShareTimeline",
	      "openLocation",
	      "getLocation",
	      "onMenuShareAppMessage"
	    ]
	  });
	
	
	wx.ready(function(){
	    wx.onMenuShareTimeline({
    	title: '6.1福利日，玩爆儿童节', // 分享标题
    	desc: '抽奖大转盘，快来领玩具',
   		link: 'http://wx.loyoo.co/getopenid/getopenid.php?bkurl=http://wx.loyoo.co/huodong/61/wxPartner/wxPartner.php?id=1', // 分享链接
		imgUrl: 'http://wx.loyoo.co/huodong/61/wxPartner/images/share.jpg', // 分享图标
		success: function () { 
		// 用户确认分享后执行的回调函数
			
		},
		cancel: function () { 
		// 用户取消分享后执行的回调函数
		}
		});
		
		wx.onMenuShareAppMessage({
    	title: '6.1福利日，玩爆儿童节', // 分享标题
    	desc: '抽奖大转盘，快来领玩具',
   		link: 'http://wx.loyoo.co/getopenid/getopenid.php?bkurl=bkurl=http://wx.loyoo.co/huodong/61/wxPartner/wxPartner.php?id=1', // 分享链接
		imgUrl: 'http://wx.loyoo.co/huodong/61/wxPartner/images/share.jpg', // 分享图标
		success: function () { 
		// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
		// 用户取消分享后执行的回调函数
		}
		});
	});
	</script>