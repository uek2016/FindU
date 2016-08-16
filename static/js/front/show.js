$(function(){

(function($) {
		$.init();
		var rangeList = document.querySelectorAll('input[type="range"]');
	    for(var i=0,len=rangeList.length;i<len;i++){
	        rangeList[i].addEventListener('input',function(){
	            if(this.id.indexOf('field')>=0){
	                document.getElementById(this.id+'-input').value = this.value;
                }else{
                    document.getElementById(this.id+'-val').innerHTML = this.value;
	            }	
	        });
	    }
		document.getElementById('field-range-input').addEventListener('input',function(){
	        document.getElementById('field-range').value = this.value;
	    });
	    
	    var result = $('.result');
		var btns = $('.btn');
		btns.each(function(i, btn) {
			btn.addEventListener('tap', function() {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');
				var picker = new $.DtPicker(options);
				picker.show(function(rs) {
							/*
							 * rs.value 拼合后的 value
							 * rs.text 拼合后的 text
							 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
							 * rs.m 月，用法同年
							 * rs.d 日，用法同年
							 * rs.h 时，用法同年
							 * rs.i 分（minutes 的第二个字母），用法同年
							 */
					result[i].value = rs.y.value +"年" + rs.m.text +"月" + rs.d.text +"日" +"  "+ rs.h.text +":" + rs.i.text;							
					picker.dispose();
				});
			}, false);
		});
	})(mui);

console.log(tarr);
//获取wid的值
var wlh_url=location.href.split("/");
var wid=wlh_url[wlh_url.length-1].split(":")[1];

API.addExWork().then(function(wid){
	//var obj=data;
	//console.log( moment().format('YYYY MM DD HH MM SS') )
	//console.log(wid);
	//var obj={wid:11,"w_title":"辅导学生","w_keywords":"在09室辅导学生","w_progress":0,"w_start_time":"2016年8月14日 18：30","w_end_time":"2016年8月14日 20：30"}
	/*if(obj["w_title"]!=""){
		$(".wlhtitle").val(obj["w_title"]);
		$(".wlhcon").val(obj["w_keywords"]);
		$(".wlhpre").val(obj["w_progress"]);
		$("#wlh_s").val(obj["w_start_time"]);
		$("#wlh_e").val(obj["w_end_time"]);
	}else{
		$(".wlhtitle").val();
		$(".wlhcon").val();
		$(".wlhpre").val();
		$("#wlh_s").val();
		$("#wlh_e").val();
	}*/
	    
})


document.getElementById("queding").addEventListener("tap",function(){
	/*API.updateExWorkByUid({wid:wlh_wid,"w_title":$(".wlhtitle").val(),"w_keywords":$(".wlhcon").val(),"w_progress":$(".wlhpre").val(),"w_start_time":$("#wlh_s").val(),"w_end_time":$("#wlh_e").val()}).ten(function(data){
		localtion.href="/app/extra/wid:"+data[wid];
	})*/
	    var date = new Date().getTime();
	    var stime=$("#wlh_s").val();
	    var etime=$("#wlh_e").val();
	    //console.log(stime+"~~"+etime);
		var base = moment({
			y: 2016,
			M: 6,
			d: 1
		})
		var randomdate = base.clone().add(Math.ceil(Math.random() * 30), 'day').valueOf();
		API.updateExWorkByUid({
			wid: 11,
			uid: Math.floor(Math.random() * 4) + 140,
			w_title: '加班做银泰',
			w_keywords: '银泰',
			w_progress: $(".wlhpre").val(),
			w_start_time: date,
			w_end_time: date,
			w_date: date,
			w_start_time: randomdate,
			w_end_time: randomdate,
			w_date: randomdate,
		}).then(function(data) {
			console.log(data);
		})
})
})
