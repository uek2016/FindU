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
		
		$(".myreset").validate({
			rules: {
				username2: {
					required: true,
					maxlength: 15,
					minlength: 5
				},
				userps1: {
					required: true,
					maxlength: 15,
					minlength: 6
				},
				userps2: {
					required: true,
					equalTo: "#mima"
				}
			},
			messages: {
				username: {
					required: "请输入账号！"
				},
				userps: {
					required: "请输入密码！"
				},
				userps2: {
					required: "请重新输入密码！"
				}
			}
		})
	})
	$(".wlh-zhezhao").click(function() {
		$(this).fadeOut(200);
	})
	$(".wlh-reset").addClass("wlh-resetmove");
	$('#username2').val(JSON.parse(store("sgqphone")).phone).attr("readonly", "readonly");
	$('.sgq-return').click(function(){
		history.back();
	});
	
	$("input").click(function(){
		$(".wlh-alert .errorinfo").css({display:"none"});
	})
	$(".myreset").submit(function(e) {
		var us2 = $("[name='username2']").val();
		var up2 = $("[name='userps1']").val();
		var oup = $("[name='olduserps1']").val();
		//验证
		if(up2=="123456"){
			$(".wlh-alert .errorinfo").css({display:"block"}).text("密码不能设为123456");
			e.preventDefault();
		}else{
			API.checkUser({
				account:us2,
				password:oup,
			}).then(function(data) {
				if(data) {
						API.setPassword({
							account:us2,
							password:up2,
						}).then(function(){
							store("sgqreload","true");
							$(".wlh-alert .errorinfo").css({display:"none"});
							$(".wlh-alert>label.error").css("display", "none");
							location.href="/app/login";	
						})
						return false;
					} else {
						$(".wlh-alert .errorinfo").css({display:"block"}).text("您输入的密码有误！");
					}
			})

			return false;
		}
	})

})
