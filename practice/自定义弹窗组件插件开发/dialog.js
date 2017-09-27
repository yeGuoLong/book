$.dialog = function (opts) {
	var $dialog = $('<div class="dialog">'+
			'<div class="title">'+
				'<h3>'+opts.title+'</h3>'+
				'<a href="javascript:;" class="close">X</a>'+
			'</div>'+
			'<div class="content">'+
				'<div class="message">'+
					'<span class="icon"></span>'+
					'<span class="text">'+opts.content+'</span>'+
				'</div>'+
				'<div class="btn">'+
					'<input type="button" value="确定" class="sure">'+
					'<input type="button" value="取消" class="cancel">'+
				'</div>'+
			'</div>'+
		'</div>);');
	$('body').append($dialog).append('<div class="grey"></div>');
	autoCenter($dialog);
	$(window).resize(function(){
		autoCenter($dialog);
	});
	initEvent($dialog,opts);
}
//自动居中事件
function autoCenter($dialog){
	var w = $dialog.width();
	var h = $dialog.height();
	var l = ($(window).width() -w)/2;
	var t = ($(window).height() -h)/2;
	$dialog.css({'left':l,'top':t});

}

function initEvent($dialog,opts){
	//移动事件
	$dialog.find('.title').mousedown(function(ev){
		var ev = ev || window.event;
		var dialogBox = $(this).parent();
		var _left = ev.clientX - dialogBox.offset().left;
		var _top = ev.clientY - dialogBox.offset().top;
		console.log(_left,_top);
		var move = true;
		$(document).mousemove(function(ev){
			if (move) {
				var ev = ev || window.event;
				var l = ev.clientX - _left;
				var t = ev.clientY - _top;
				dialogBox.css({'left':l,'top':t});
			}
			
		}).mouseup(function(){
			move = false;
		});
	});

	//按钮关闭事件
	$dialog.find('.close').click(function(){
		$dialog.fadeOut(500,function(){
			$(this).remove();
		})
		$('.grey').remove();
	});

	//确定按钮
	$dialog.find('.sure').click(function(){
		$dialog.fadeOut(500,function(){
			$(this).remove();
		})
		$('.grey').remove();
		if (opts.callback) {
			opts.callback(true);
		}
	});

	//取消按钮
	$dialog.find('.cancel').click(function(){
		$dialog.fadeOut(500,function(){
			$(this).remove();
		})
		$('.grey').remove();
		if (opts.callback) {
			opts.callback(false);
		}
	});
}

