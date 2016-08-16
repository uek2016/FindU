/////////////////    公用库函数

var API = {
	////////user 相关的 api
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

//		return $.get('/getAllUser',{cache: false}).then(function(data) {
//			return data;
//		}, 'json');

		return $.ajax({
			data:"a="+Math.random(),
			type:"get",
			url:"/getAllUser",
			dataType:"json",
			cache:false,
			success:function(){
				return data;
			},
			error:function(){
				console.log($(this))
			}
		});
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
		}, 'json');
	},
	setPassword: function(obj) {
		return $.get('/setPassword', obj).done(function(data) {
			return data;
		}, 'json');
	},

	///////  extra_work 相关的api
	addExWork: function(){
		return $.get('/api/exwork/addexwork').done(function(data) {
			return data;
		}, 'json');
	},

	deleteExWorkByWid: function(wid){
		return $.get('/api/exwork/deleteWorkByWid', {wid:wid}).done(function(data) {
			return data;
		}, 'json');
	},

	updateExWorkByUid: function(obj){
		return $.get('/api/exwork/updateWorkByUid', obj).done(function(data) {
			return data;
		}, 'json');
	},
	getAllExWorkByUid:function(uid){
		return $.get('/api/exwork/getAllworkByUid', {uid:uid}).done(function(data) {
			return data;
		}, 'json');
	},
	getWorkByWid:function(wid){
		return $.get('/api/exwork/getworkbywid',{wid:wid}).done(function(data){
			return data;
		})
	},
	getExByMonth:function(month){
		return $.get('/api/exwork/getMonthWork',{m:month}).done(function(data){
			return data;
		})
	},
}
