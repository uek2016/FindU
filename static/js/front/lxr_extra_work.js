$(function(){
	
	$(".lxr_extra_liebiao").click(function(){
		$(".lxr_extra_workinfor").slideToggle()
	})

	
	var lxr_intime = new Date();
	// console.log(lxr_intime);

	$(".lxr_dian").addClass("lxr_meidian");
		var lxr_have_ri = [];

	//画表
	var lxr_exlist = function(data){

		for(var i=0;i<data.length;i++){

			if (data[i].uid == 141) {

				var lxr_time2 = new Date(data[i].w_start_time)
				var lxr_time3 = new Date(data[i].w_end_time)
				
				var ex_html="";
				ex_html += "<li class='lxr_extrawork_li'>"
				ex_html += "<div class='lxr_list_ri'>"+lxr_time2.getDate()+"日</div>"
				ex_html += "<div class='lxr_list_time'>"
				ex_html += "<span>"+lxr_time2.getHours()+":"+lxr_time2.getMinutes()+"</span><br/>"
				ex_html += "<span>"+lxr_time3.getHours()+":"+lxr_time3.getMinutes()+"</span></div>"
				ex_html += "<div class='lxr_list_content'>"
				ex_html += "<span>"+data[i].w_title+"</span>"
				ex_html += "<p>"+data[i].w_keywords+"</p></div></li>"
				
				$(".lxr_extrawork_ul").append(ex_html)
				lxr_have_ri.push(lxr_time2.getDate());
			
			}

		}

		//小点
		for (var i =0;i<lxr_have_ri.length;i++) {

			console.log(lxr_have_ri[i])

			$(".col").eq(parseInt(lxr_have_ri[i])+6).find(".lxr_dian").removeClass("lxr_meidian");
		};
	


	}


/*	$.ajax({
		type:"get",
		url:"/api/exwork/getAllworkByUid",
		data:"uid=141",
		success:function(data){
			lxr_exlist(data);
		}
	});*/
	






	
	
// })

})

