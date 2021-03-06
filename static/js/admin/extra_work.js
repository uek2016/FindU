
$(function(){
//	当前月的第一天	
	var color=["#FFF4AC","#C4F9CD","#F6E2F7","#FDCCD1","#FFD8BE","#CBEBF8","#FBDFD2","#FED1E1","#B5FFA4"];
	var colorfont=["#624920","#23672E","#5C3461","#89353D","#814218","#164D62","#49362D","#801B3F","#336419"];
	var xingqi={0:"周日",1:"周一",2:"周二",3:"周三",4:"周四",5:"周五",6:"周六"};
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
	var nowmonth=moment().month();
	var allday=setMOnth(6+1);
//	这是每一个人都数组总额
	var everyperson=[];	
	
	
	API.getExByMonth(6+1).then(function(data){
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
	
	//	根据名字个数来设置高度
		var windowheight=$(window).height()-50;
		var liheight=windowheight/(names.length+1);
		if(liheight<=40){
			liheight=40;
		}
		$("body").css("line-height",(liheight-2)+"px");
			
		
		
	// 	画左上角月份
		var li=$("<li>");
		li.html("姓名 / "+(nowmonth+1)+"月");
		li.css({height:liheight,"line-height":liheight+"px"});
		li.appendTo($("#name ul"));	
	
	
	//	画时间总计
		var li=$("<li>");
		li.attr("id","totle-time");
		li.html("总计");
		
		li.css({height:liheight,"line-height":liheight+"px"});
		li.appendTo($("#totle ul"));
		
	//	画姓名    
		$.each(names,function(i,val){
				var li=$("<li>");
				li.html(val);
				li.css({height:liheight});
				li.appendTo($("#name ul"));
		})			
	
          
		//	画天数
		
		var boxheight=$("#table-parent").width()/7;
		
		var divobj=$("<div>");
		divobj.attr({"class":"list","month":moment().month()});
		divobj.css("width",allday.length*boxheight+0.5);
		
			
		var tr=$("<ul>");
		$.each(allday,function(j,obj){
				var li=$("<li>");
				li.css({"width":boxheight,height:liheight});
				li.html(moment(obj.value).date()+"号("+xingqi[moment(obj.value).day()]+")");
				li.appendTo(tr);
		})
		tr.appendTo(divobj);	
		
		
		//获取每个人在当月天的加班具体详情
				
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
					row.push({title:record[0].w_title,wid:record[0].wid,is_del:record[0].is_del,start:record[0].w_start_time,end:record[0].w_end_time});
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
						
//	画数据，需要总数据	
		$.each(everyperson,function(i,val){
			var tr=$("<ul>");
			$.each(val,function(j,obj){
				var li=$("<li>");
				li.css({"width":boxheight,height:liheight});
				if(typeof obj =="object"){
					var d=moment(obj.start);
					var d2=moment(obj.end);
					var timedur=obj.end-obj.start;
					var xiaoshi=(parseInt(timedur/(1000*60))/60).toFixed(1);
					var str=d.hours()+":"+d.minute()+"-"+d2.hours()+":"+d2.minute()+" "+xiaoshi+"小时";	
					li.attr({"id":obj.wid,time:xiaoshi});					
					li.html("<div class='extra-more'><h1>"+str+"</h1><h2>"+obj.title+"</h2></div><div class='ms-del'></div>");
					var ms_nub=Math.floor(Math.random()*color.length);
					if(obj.is_del=="1"){
						li.attr("is_del",1)
						li.css({"background-color":"#cccccc",color:colorfont[ms_nub]})
					}else{
						li.attr("is_del",0)
						li.css({"background-color":color[ms_nub],color:colorfont[ms_nub]})
					}
					
				}else{
					li.html(obj.title);
				}
				li.appendTo(tr);
			})
			tr.appendTo(divobj)
		})
		divobj.appendTo($("#table"));
		
		var listlength=$(".list").length;
		$("#table").css("width",$(".list").width()*listlength);
		
		
		
		
		
		
	
	$("#table-parent").delegate("div:has('.ms-del')", "click", function(event){
		API.deleteExWorkByWid($(event.target).parent("li").attr("id")).then(function(data){	
			if(data){
				if($(event.target).parent("li").attr("is_del")=="0"){
//					有问题
					
					var deltime=$(event.target).parent("li").attr("time");
					
					var index=$(".list ul").index($(event.target).parent().parent());
//					完了之后开始减就ok
				var nowobj=$("#totle ul li").eq(index);
					nowobj.html((parseFloat(nowobj.attr("everytime"))-parseFloat(deltime)).toFixed(1)+"小时");
					nowobj.attr("everytime",(parseFloat(nowobj.attr("everytime"))-parseFloat(deltime)).toFixed(1))					
				}
				$(event.target).parent("li").attr("is_del",1);
				$(event.target).parent("li").css("background-color","#CCCCCC");
					 	
			}
		})	
	});
	
	
	
//	获取总时间，需要每个人的数据
			var totle_time=get_totle_time();
			console.log(totle_time)
			function get_totle_time(){
				var totle_time=[];
				$.each(everyperson,function(i,val){
				var time=0;
				$.each(val,function(j,obj){
						if(typeof obj=="object"){
							if(obj.is_del=="0"){
								var timedur=obj.end-obj.start;						
								var fenzhong=parseInt(timedur/(1000*60));
								time+=fenzhong;
							}							
						}
					})
						time=time/60;
						time=time.toFixed(1);
						totle_time.push(time);
				})
				return totle_time;
			}	
				
//画总时间
		$.each(totle_time,function(i,val){
			var li=$("<li>");
			li.html(val+"小时");
			li.attr("everytime",val);
			li.css({height:liheight,"line-height":liheight+"px"});
			li.appendTo($("#totle ul"));
		})
		
		
// 画相对应的width和高度，因为是定位		
		var $nameheight=$("#name").height();
		$("#table-parent").css("height",$nameheight);
		$("#table").css("height",$nameheight);
		
//		生成表格
		$("#check").click(function(){
			location.href="/api/exwork/excel?m="+(moment().month()+1);
		})
					
    })
	
	

})
