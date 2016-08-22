$(document).ready(function() {
	var w = document.documentElement.clientWidth;
	$("html").css({
		fontSize: w / 7.19
	});
})

$(function() {
	var cw = document.documentElement.clientWidth;
	var ch = document.documentElement.clientHeight;
	$(".wlh-loginbox").css({
		width: cw,
		height: ch
	});

	$(function() {
		$(".mylogin").validate({
			rules: {
				username: {
					required: true,
					maxlength: 15,
					minlength: 5
				},
				userps: {
					required: true,
					maxlength: 15,
					minlength: 6
				}
			},
			messages: {
				username: {
					required: "请输入账号！"
				},
				userps: {
					required: "请输入密码！"
				}
			}
		})

	})
	
	if(store("sgqphone")){
		$("[name='username']").val(JSON.parse(store("sgqphone")).phone);

	}
	if(store("sgqreload")){
		$('.wlh-zhezhao').fadeIn().delay(500).fadeOut();
		store.remove("sgqreload");
	}

	var wlh_num = 0;
	$(".wlh-sub").click(function() {
		var us = $("[name='username']").val();
		var up = $("[name='userps']").val();
		API.checkUser({
			account:us,
			password:up,
		}).then(function(data) {
			if(data) {
				if(data.password=="e10adc3949ba59abbe56e057f20f883e"){
        			location.href="/app/reset";

			}else{
					Cookies.set('__uek__', data.phone, { expires: 100 });
					Cookies.set('___uek___', data.password, { expires: 100 });
					
//	uid获取方式！！！！！！！！！！！！！！！！！！				
/////////////将uid存储到localStorage.sgqphone中，uid读取方法：JSON.parse(store("sgqphone")).uid

					store("sgqphone",JSON.stringify(data));
      				location.href="/app";
				}

			} else {
				$(".wlh-login").addClass("wlh-loginmove");
				var t = setTimeout(function() {
						$(".wlh-login").removeClass("wlh-loginmove");
						clearTimeout(t);
					}, 600)

				if(us === '') {
					$(".wlh-text>label.error").css("display", "block").text("您的账号不能为空！");
				}

				$(".wlh-ps>label.error").css("display", "block").text("您输入的密码有误！");

			}
		})

		return false;
	})

	$(".wlh-zhezhao").click(function() {
		$(this).fadeOut(200);
	})
})

