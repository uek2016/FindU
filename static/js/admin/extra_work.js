
$(function(){
	function settable(){
		var d=new moment();
		var days=d.daysInMonth();
		$("#table").css("width",148*days);
		$("#table-parent").css("width",149*7+1);
	}
	settable()
	function huadate(){
//		画日期
		var d=new moment();
		var days=d.daysInMonth();
		var dayarr={1:"星期一",2:"星期二",3:"星期三",4:"星期四",5:"星期五",6:"星期六",0:"星期日"};
		var tr=$("<tr>");
		for(var i=1;i<=days;i++){
			var th=$("<th>");
			var datestring = moment().year() + '-' + (d.month()+1) + '-' + i;
		var everyday = moment(datestring,'YYYY-MM-DD');
			th.html(i+"("+dayarr[everyday.day()] +")");
			th.appendTo(tr);
			tr.prependTo($("#table"));	
		}
		
//		画数据
		
		
	}
	huadate();
	
	 
	 
	 
	var totle=[]; 
	API.getExByMonth(7).then(function(data){
		console.log(data)
		for(var i=0;i<data.length;i++){
			if(panduan(data[i].uid)){
				totle.push(data[i].uid);
			}
		}
		console.log(totle)
	});
	
	function panduan(val){
		for(var i=0;i<totle.length;i++){
			if(totle[i]==val){
				return false;
			}
		}
		return true;
	}
})
