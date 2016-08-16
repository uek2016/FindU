$(document).ready(function() {
	var w = document.documentElement.clientWidth;
	$("html").css({
		fontSize: w / 7.19
	});
})


document.addEventListener("plusready",function(){

$(function() {


	function User() {};

	User.prototype = {
		checkUser: function(ob) {
			return $.get('/checkUser', ob).then(function(data) {
				return data;
			});
		},
		addUser: function() {
			return $.get('/addUser').then(function(data) {
				return data;
			})
		},
		deleteUserById: function(id) {
			return $.get('/deleteUserById', {
				uid: id
			}).then(function(data) {
				return data;
			})
		},
		updateUserById: function(data) {
			return $.get('/updateUserById', {
				uid: data.uid,
				uname: data.uname,
				phone: data.phone,
				tel: data.tel,
			}).then(function(data) {
				return data;
			})
		},
		getAllUser: function() {
			return $.get('/getAllUser').then(function(data) {
				return data;
			}, 'json');
		},
		getUserById: function(id) {
			return $.get('/getUserById', {
				uid: id
			}).then(function(data) {
				return data;
			}, 'json');
		},
		getAuthById: function(id) {
			return $.get('/getAuthById', {
				uid: id
			}).done(function(data) {
				return data;
			}, 'json')
		},
		setPassword: function(obj) {
			return $.get('/setPassword', obj).done(function(data) {
				return data;
			}, 'json')
		}
	}
	var u = new User();

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
	$('#username2').val(JSON.parse(localStorage.sgqphone).phone).attr("readonly", "readonly");
	$('.sgq-return').click(function(){
//		history.back();
		plus.webview.close("sgq_reset","slide-out-right");
	});
	

	$(".myreset").submit(function(e) {
		var us2 = $("[name='username2']").val();
		var up2 = $("[name='userps1']").val();
		var oup = $("[name='olduserps1']").val();
		//验证
		if(up2=="123456"){
			
			plus.nativeUI.toast("密码不能为123456！");
			
			e.preventDefault();
		}else{
			$.ajax({
				url: "/checkUser",
				data: "account=" + us2 + "&password=" + oup,
				success: function(data) {
					if(data) {
						$.ajax({
							url: "/setPassword",
							data: "account=" + us2 + "&password=" + up2,
							success: function() {
								console.log("密码是"+up2)
								localStorage.sgqphone = '{"phone":"' + us2 + '","password":"' + up2 + '"}';
								
//								$(".wlh-reset").removeClass("wlh-resetmove");
//								$('#username').val(JSON.parse(localStorage.sgqphone).phone);
//								$(".wlh-zhezhao").fadeIn(200);
//								$(".wlh-resetbox2").fadeIn(200);
//								$(".wlh-zhezhao").delay(800).fadeOut(200);
//								$(".wlh-login").delay(1000).fadeIn(200);
//								$(".mylogin>input").val("");
								var sgq_login=plus.webview.create("./login","sgq_login");
								plus.nativeUI.toast("请重新登录");
								sgq_login.show();
								plus.webview.close("sgq_reset");
								
								
							}
						})
						
						return false;
					} else {

//						$(".wlh-login").addClass("wlh-loginmove");
//						var t = setTimeout(function() {
//								$(".wlh-login").removeClass("wlh-loginmove");
//								clearTimeout(t);
//							}, 600)
							plus.nativeUI.toast("您输入的密码有误！");
						

					}
				}
			})

			return false;
		}
	})


	
		
//		$(".wlh-reset").addClass("wlh-resetmove");
//		$("#username2").val($("#username").val());
//		$(".myreset").submit(function() {
//				var us2 = $("[name='username2']").val();
//				var up2 = $("[name='userps1']").val();
//
//				$.ajax({
//					url: "/setPassword",
//					dataType: "jsonp",
//					data: "account=" + us2 + "&password=" + up2
//
//				})
//				$(".wlh-reset").removeClass("wlh-resetmove");
//				$(".wlh-zhezhao").fadeIn(200);
//				$(".wlh-resetbox2").fadeIn(200);
//				$(".wlh-zhezhao").delay(800).fadeOut(200);
//				$(".wlh-login").delay(1000).fadeIn(200);
//				$(".mylogin>input").val("");
//				return false;
//			})


	

})
})