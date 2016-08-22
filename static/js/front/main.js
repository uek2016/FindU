$(function() {
	sgq_online=true;
	if(store("sgqphone")) {
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
		userlistEl.html(userlistHtml);

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

		if (navigator.onLine) {
			var contacts = [];

			//侧边栏
			var sideEl = $('.indexlist');

			//用户列表
			var userlistEl = $('.userlist');

			//纪录每一组成员的offsettop
			var toplist = [];

			//页面滚动条的偏移量
			var off;


			var sync = function() {
			
				API.getAllUser().then(function(list) {
					contacts = list;
					render(contacts);
					localStorage.__findu__data = JSON.stringify(contacts);
				})
			}


			/////////////////////////////////////////////////////////
			//保障没有网络也能使用
			if(localStorage.__findu__data) {
				contacts = JSON.parse(localStorage.__findu__data);
				setTimeout(function() {
					render(contacts);
				}, 0);
				setTimeout(function() {
					sync();
				}, 500);
			} else {
				sync();
			}

			$(window).on('resize', function() {
				search($('#search').val().trim());
			})

			////////////////////////////////////////////////////////////////////
			//头部固定字母条

			$(window).on('scroll', function() {
				var s = $(this).scrollTop() + off;
				if(toplist) {
					toplist.forEach(function(v) {
						if(s >= v.top) {
							$('.fixedindex').text(v.index);
							return;
						}
					})
				}
			});

			/////////////////////////////////////////////////////////////////////
			//右侧点击和拖动
			$('.indexlist').on('touchstart touchmove', function(e) {
				var soff = $('.header').height() + $('.sub-header').height();
				var sep = sideEl.find('li').outerHeight(true);
				var sidetop = sideEl.position().top;
				var y = e.originalEvent.changedTouches[0].clientY;
				var x = Math.floor((y - sidetop) / sep);
				if(x < 0 || x > toplist.length - 1) {
					return false;
				}
				$(window).scrollTop(toplist[x].top - soff);
				return false;
			});

			/////////////////////////////////////////////////////////////////
			//搜索功能
			var search = function(key) {
				var tmp = contacts.filter(function(v) {
					if(v.uname.indexOf(key) !== -1 || v.phone.indexOf(key) !== -1 || v.tel.indexOf(key) !== -1 || v.account.indexOf(key) !== -1) {
						return true;
					} else {
						return false;
					}
				})
				render(tmp);
			}

			// fixed ios position:fixed;
			$('#search').on('touchstart', function() {
				$(window).scrollTop(0);
			})

			$('#search').on('input', function(e) {
				search($(this).val().trim())
				if($(this).val().trim() === '') {
					$(this).trigger('blur');
				}
			})


		} else {
			//保障没有网络也能使用
			if(localStorage.__findu__data) {
				contacts = JSON.parse(localStorage.__findu__data);
				setTimeout(function() {
					render(contacts);
				}, 0);
			}
		}
	} else {
		location.href="/app/login";
	}
	
})
	//////////////////测试API代码



$(function() {
	//	 console.log( moment().format('YYYY MM DD HH MM SS') );
	//   添加测试数据的脚本
	API.addExWork().then(function(wid) {
		var base = moment({
			y: 2016,
			M: 6,
			d: 1
		})
		var randomdate = base.clone().add(Math.ceil(Math.random() * 30), 'day').valueOf();
		API.updateExWorkByUid({
			wid: wid,
			uid: Math.floor(Math.random() * 4) + 140,
			w_title: '加班做银泰',
			w_keywords: '银泰',
			w_progress: Math.floor(Math.random() * 100),
			w_start_time: randomdate,
			w_end_time: randomdate,
			w_date: randomdate,
		}).then(function(data) {
			console.log(data);
		})
	});
	//	API.deleteExWorkByWid(2).then(function(data){
	//		console.log(data);
	//	})
	//	API.getAllExWorkByUid(12).then(function(data) {
	//		console.log(data);
	//	})
})
