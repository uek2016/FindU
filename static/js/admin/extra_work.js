
$(function(){
//	当前月的第一天
	
	function setMOnth(month){
		//  即这个月从1日到最后一天
			var date = moment('2016-'+month+'-1', 'YYYY-MM-DD');
			var dates = _.range(date.daysInMonth()).map(function(v) {
				var day = date.clone().add(v, 'day');
				return {
					display: day.format('YY/MM/DD'),
					value: day.valueOf()
				};
			})
			return dates;
	}
//	获取到7月所有的天数
	var allday=setMOnth(7);
	
	API.getExByMonth(7).then(function(data){
//		data为所有的数据
		var name=[];
		//表格中的行  即所有人的姓名
			var names = _.uniq(data.map(function(v) {
				return v.uname;
			}));
			names.forEach(function(v) {
				name.push({
					caption: v,
					type: 'sting'
				});
			});
			
			
//			依据名字的个数设置每个li td th 的高度
			
			
			
			
			
			//每一列中的信息
			var everyperson=[];
				names.forEach(function(name) {
							//第一个为当前日期
							var row = [];
							//随后为该人在该天的加班记录
							allday.forEach(function(day) {
		
								var record = _.filter(data, function(_) {
									return _.w_date === day.value && _.uname === name;
								})
								if(record.length) {
									//todo  补上开始时间和结束时间
									row.push({title:record[0].w_title,start:record[0].w_start_time,end:record[0].w_end_time});
								} else {
									row.push('');
								}
							});
							everyperson.push(row);
						})
					
			
//			拿到所有的关联开始时间,结束时间,项目名称的数组 everyperson
//		            拿到所有的天数    allday
//			拿到所有的名字       name
//			拿到所有的名字相关数组     names 
//          拿到所有的总时间  totle_time
//          console.log(everyperson,allday,name,names)
//          console.log(everyperson);
				
				var totle_time=[];
					$.each(everyperson,function(i,val){
						var time=0;
						$.each(val,function(j,obj){
							if(typeof obj=="object"){
								var d=moment(obj.start);
								var d2=moment(obj.end);
							}
						})
						totle_time.push(time);
				})
			
//			设置高度
			var windowheight=$(window).height();
			var liheight=windowheight/(names.length+1);
			if(liheight<=40){
				liheight=40;
			}
			$("body").css("line-height",(liheight-2)+"px")
//		画月份
		var li=$("<li>");
		li.html(7);
		li.css({height:liheight,"line-height":liheight+"px"});
		li.appendTo($("#name ul"));	
		
			
//		画姓名    
		$.each(names,function(i,val){
			var li=$("<li>");
			li.html(val);
			li.css({height:liheight});
			li.appendTo($("#name ul"));
		})
		
		
//		画时间总计
		var li=$("<li>");
		li.html("总计");
		li.css({height:liheight,"line-height":liheight+"px"});
		li.appendTo($("#totle ul"));
		
//画总时间
		$.each(totle_time,function(i,val){
			var li=$("<li>");
			li.html(val);
			li.css({height:liheight,"line-height":liheight+"px"});
			li.appendTo($("#totle ul"));
		})
//		
//		console.log(allday);
//		
//		console.log(everyperson);
//	画表头
		var xingqi={0:"周日",1:"周一",2:"周二",3:"周三",4:"周四",5:"周五",6:"周六"};
		var boxheight=$("#table-parent").width()/7;
		$("#table").css("width",allday.length*boxheight);
		var tr=$("<ul>");
		$.each(allday,function(j,obj){
				var li=$("<li>");
				li.css({"width":boxheight,height:liheight});
				li.html(moment(obj.value).date()+"号("+xingqi[moment(obj.value).day()]+")");
				li.appendTo(tr);
		})
		tr.appendTo($("#table"));
//		
//	画数据	
		$.each(everyperson,function(i,val){
			var tr=$("<ul>");
			$.each(val,function(j,obj){
				var li=$("<li>");
				li.css({"width":boxheight,height:liheight});
				if(typeof obj=="object"){
					li.html(obj.tilte);
				}else{
					li.html(obj.tilte);
				}
				
				li.appendTo(tr);
			})
			tr.appendTo($("#table"))
		})
//		
					
					
			
	})
	
	
	
//	function settable(){
//		var d=new moment();
//		var days=d.daysInMonth();
//		$("#table").css("width",148*days);
//		$("#table-parent").css("width",149*7+1);
//	}
//	settable();
//	var thobj=[];
//	function huadate(){
////		画日期
//		var d=new moment();
//		var days=d.daysInMonth();
//		var dayarr={1:"星期一",2:"星期二",3:"星期三",4:"星期四",5:"星期五",6:"星期六",0:"星期日"};
//		var tr=$("<tr>");
//		for(var i=1;i<=days;i++){
//			var th=$("<th>");
//			var datestring = moment().year() + '-' + (d.month()+1) + '-' + i;
//		var everyday = moment(datestring,'YYYY-MM-DD');
//			th.html(i+"("+dayarr[everyday.day()] +")");
//			th.attr("day",everyday.valueOf());
//			thobj.push(th);
//			th.appendTo(tr);
//			tr.prependTo($("#table"));	
//		}
//	}
//
//	
//	
//	 
//	 
//	 
//	var totle=[]; 
//	var totleid=[];
//	var totleobj=[];
//	var work=[];
//	API.getAllUser().then(function(data){
//		$.each(data,function(i,val){
//			totle.push(data[i].uname);
//			totleid.push(data[i].uid);	
//		});
//		$.each(totleid,function(i,val){
//			var li=$("<li>");
//			li.attr("uid",val);			
//			li.html(totle[i]);
//			totleobj.push(li);
//			li.appendTo($("#name ul"));
//		});
//	})
//	
//	API.getExByMonth(7).then(function(data){
//		console.log(data)
////		依据Uid进行分组，存到work里面
//		$.each(totleid,function(i,val){
//			var arr=[];
//			$.each(data,function(j,n){
//				if(data[j].uid==totleid[i]){
//					arr.push(data[j]);
//				}
//			})
//			work.push(arr);
//		})
//		console.log(work);
//		console.log(totleid)
//		$.each(totleid,function(i,val){
//			var tr=$("<tr>");
//			tr.attr("uid",val);	
//			$.each(thobj,function(j,tharr){
//				var td=$("<td>");
////					取到时间,
//					$.each(work[i], function(h,meiyige) {
//						console.log(meiyige.w_date,tharr.attr("day"))
//						if(meiyige.w_date==tharr.attr("day")){
////							创建一个div，存储具体的信息
//							
//						}
//					});
//				td.appendTo(tr);				
//			})
//			tr.appendTo($("#table"));
//		})
//		
//	});
//
//
//	huadate();

})
