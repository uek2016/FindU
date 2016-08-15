$(function(){
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
		}, 'json');
	},
	setPassword: function(obj) {
		return $.get('/setPassword', obj).done(function(data) {
			return data;
		}, 'json');
	},
	
	///////  extra_work 相关的api
	addExWork: function(wid){
		return $.get('/api/exwork/addexwork',wid).done(function(data) {
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
		return $.get('/api/exwork/getAllworkByUid', {uid,uid}).done(function(data) {
			return data;
		}, 'json');
	}
}

//获取wid的值
var wlh_url=location.href.split("/");
var wlh_wid=wlh_url[wlh_url.length-1].split(":")[1];

API.addExWork(wlh_wid).then(function(data){
	//var obj=data;
	var obj={wid:11,"w_title":"辅导学生","w_keywords":"在09室辅导学生","w_progress":0,"w_start_time":"2016年8月14日 18：30","w_end_time":"2016年8月14日 20：30"}
	if(obj["w_title"]!=""){
		$(".wlhtitle").val(obj[w_title]);
		$(".wlhcon").val(obj[w_keywords]);
		$(".wlhpre").val(obj[w_progress]);
		$("#wlh_s").val(obj[w_start_time]);
		$("#wlh_e").val(obj[w_end_time]);
	}
})


$("#queding").addEventListener("tap",function(){
	API.updateExWorkByUid({wid:wlh_wid,"w_title":$(".wlhtitle").val(),"w_keywords":$(".wlhcon").val(),"w_progress":$(".wlhpre").val(),"w_start_time":$("#wlh_s").val(),"w_end_time":$("#wlh_e").val()}).ten(function(data){
		localtion.href="/jiaban/wid:"+data[wid];
	})
	
})
})
