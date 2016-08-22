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

         
	API.getWorkByWid(28).then(function(data){
		var obj=data[0];
		var st=moment(obj["w_start_time"]).format("YYYY")+"年"+moment(obj["w_start_time"]).format("MM")+"月"+moment(obj["w_start_time"]).format("DD")+"日"+"  "+moment(obj["w_start_time"]).format("hh")+":"+moment(obj["w_start_time"]).format("mm");
		var et=moment(obj["w_end_time"]).format("YYYY")+"年"+moment(obj["w_end_time"]).format("MM")+"月"+moment(obj["w_end_time"]).format("DD")+"日"+"  "+moment(obj["w_end_time"]).format("hh")+":"+moment(obj["w_end_time"]).format("mm");

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
		API.updateExWorkByUid({
			wid: 11,
			uid: 143,
			w_title: $(".wlhtitle").val(),
			w_keywords: $(".wlhcon").val(),
			w_progress: $("#field-range").val(),
			w_start_time: time.stime,
			w_end_time: time.etime,
			w_date: time.date,
		})
    })
    
    document.getElementById("del").addEventListener("tap",function(){
    	API.deleteExWorkByWid(11);
    })
})
