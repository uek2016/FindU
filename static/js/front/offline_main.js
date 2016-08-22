$(function(){
	if(!sgq_online){
		var contacts = [];

		//侧边栏
		var sideEl = $('.indexlist');

		//用户列表
		var userlistEl = $('.userlist');

		//纪录每一组成员的offsettop
		var toplist = [];

		//页面滚动条的偏移量
		var off;
		if(localStorage.__findu__data) {
			contacts = JSON.parse(localStorage.__findu__data);
			setTimeout(function() {
				render(contacts);
			}, 0);
		}
		var render = function(contacts) {
			var data = {};
			contacts.forEach(function(v) {
				var key = v.sindex.toUpperCase();
				if(!data[key]) {
					data[key] = [];
				}
				data[key].push(v);
			})
			var indexlists = Object.keys(data).sort();
			var userlistHtml = '';
			var sideElHtml = '';
			indexlists.forEach(function(v) {
				sideElHtml += '<li>' + v.toUpperCase() + '</li>';
				var arr = data[v].sort(function(a, b) {
					return a.uname > b.uname;
				});
				userlistHtml += '<dt>' + v.toUpperCase() + '</dt>'
				arr.forEach(function(v) {
					userlistHtml += '<dd>' + v.uname + '<a href="tel:' + v.phone + '"></a></dd>';
				})
			})

			//创建侧边栏 和 用户列表
			sideEl.html(sideElHtml);
			sideEl.height(function() {
				return $(this).children().eq(0).outerHeight(true) * indexlists.length;
			});
			sideEl.css({
				top: ($(window).outerHeight(true) - sideEl.height()) / 2
			})
			userlistEl.html(userlistHtml)

			//去掉每组最后一个成员的分割线
			userlistEl.find('dt').prev().css('border', 'none');

			if(indexlists.length !== 0) {
				toplist = userlistEl.find('dt').map(function(i, v) {
					return {
						top: $(this).offset().top,
						index: indexlists[i]
					};
				}).get();
				if($('.fixedindex').text().trim() === '') {
					$('.fixedindex').text(toplist[0].index);
				}
			} else {
				$('.fixedindex').text('');
			}

			off = $('.header').height() + $('.sub-header').height() + $('.fixedindex').height();

		}
		 
	}
})