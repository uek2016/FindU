$(function(){
	
	var time={};
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
				console.log(options)
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
					result[i].value = rs.y.value +"年" + rs.m.value +"月" + rs.d.value +"日" +"  "+ rs.h.value +":" + rs.i.value;							
					if(i==0){
						time.stime=moment({y:rs.y.text,M:rs.m.text,d:rs.d.text,h:rs.h.text,i:rs.i.text}).valueOf();
						time.date=moment({y:rs.y.text,M:rs.m.text,d:rs.d.text}).valueOf();
					}else if(i==1){
						time.etime=moment({y:rs.y.text,M:rs.m.text,d:rs.d.text,h:rs.h.text,i:rs.i.text}).valueOf();
						time.date=moment({y:rs.y.text,M:rs.m.text,d:rs.d.text}).valueOf();
					}
					picker.dispose();
				});
			}, false);
		});
	})(mui);

//获取wid的值
/*var wlh_url=location.href.split("/");
var wid=wlh_url[wlh_url.length-1].split(":")[1];*/
         
	API.getWorkByWid(28).then(function(data){
		var obj=data[0];
		//obj={wid:11,uid:142,"w_title":"辅导学生","w_keywords":"在09室辅导学生","w_progress":0,"w_start_time":1471326582820,"w_end_time":1471326683820}
		var st=moment(obj["w_start_time"]).format("YYYY")+"年"+moment(obj["w_start_time"]).format("MM")+"月"+moment(obj["w_start_time"]).format("DD")+"日"+"  "+moment(obj["w_start_time"]).format("hh")+":"+moment(obj["w_start_time"]).format("mm");
		var et=moment(obj["w_end_time"]).format("YYYY")+"年"+moment(obj["w_end_time"]).format("MM")+"月"+moment(obj["w_end_time"]).format("DD")+"日"+"  "+moment(obj["w_end_time"]).format("hh")+":"+moment(obj["w_end_time"]).format("mm");
		//console.log( moment().format('YYYY MM DD HH MM SS') )
		//console.log(data);
		//var 
		if(obj["w_title"]!=""){
			$(".wlhtitle").val(obj["w_title"]);
			$(".wlhcon").val(obj["w_keywords"]);
			$("#field-range").val(obj["w_progress"]);
			$("#field-range-input").val(obj["w_progress"]);
			$("#wlh_s").val(st);
			$("#wlh_e").val(et);
		}else{
			$(".wlhtitle").val();
			$(".wlhcon").val();
			$("#field-range").val();
			$("#field-range-input").val();
			$("#wlh_s").val();
			$("#wlh_e").val();
		}
		    
	})


    document.getElementById("queding").addEventListener("tap",function(){
	
	/*API.updateExWorkByUid({wid:wlh_wid,"w_title":$(".wlhtitle").val(),"w_keywords":$(".wlhcon").val(),"w_progress":$(".wlhpre").val(),"w_start_time":$("#wlh_s").val(),"w_end_time":$("#wlh_e").val()}).ten(function(data){
		localtion.href="/app/extra/wid:"+data[wid];
	})*/
	    /*var date = new Date().getTime();
	    var stime=$("#wlh_s").val();
	    var etime=$("#wlh_e").val();*/
	    //console.log(stime+"~~"+etime);
		/*var base = moment({
			y: 2016,
			M: 6,
			d: 1
		})
		var randomdate = base.clone().add(Math.ceil(Math.random() * 30), 'day').valueOf();*/
		API.updateExWorkByUid({
			wid: 11,
			uid: 143,
			w_title: $(".wlhtitle").val(),
			w_keywords: $(".wlhcon").val(),
			w_progress: $("#field-range").val(),
			w_start_time: time.stime,
			w_end_time: time.etime,
			w_date: time.date,
		})/*.then(function(data) {
			console.log(data);
		})*/
    })
})
