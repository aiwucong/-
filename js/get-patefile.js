var tjDate
layui.use(['layer','laydate'],function(){
	var layer = layui.layer
	var laydate = layui.laydate
	$('#pateUpload').click(function(){
		layer.msg('该功能暂未开放',{icon:2})
	})
	var data = new Date(),
    year = data.getFullYear(),
    month = data.getMonth() + 1,
    day = data.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    tjDate = year+"-"+month +"-"+day
	laydate.render({ 
		elem: '#selectorTime',
		value:new Date(),
		min:0,
		max:6,
		done: function (value, date) {
			tjDate = value;
			$.ajax({
				url:baseUrl + "/deptorder/companyOrder",
				type:'post',
				data:{
					"hospitalNum":$('#hospial option:checked').val(),
					"time":tjDate
				},	
				success:function(res){
					console.log(res)
					if(res.status == 200){
						if(res.data.am >=0){
							$('.am_text').text(res.data.am)
							if(res.data.am == 0){
								$('.time_am').removeClass('cur')
							}
							
						}
						if(res.data.pm >= 0){
							$('.pm_text').text(res.data.pm)
							if(res.data.pm == 0){
								$('.time_pm').removeClass('cur')
							}
						}
						if(res.data.am ==0 && res.data.pm == 0){
							layer.msg("当前预约人数已满，请重新选择时间或者医院",{icon:2})
						}
					}
				}
			})
		}
	  });
	  $('.showimgs').viewer();

})
var patefile = {
	imgOne:'',
	imgtwo:'',
	imgthere:'',
	city:'',
	upLoad:function(){//上传营业执照
		var fileInput = document.getElementById("upimg");
		var file = fileInput.files[0];
		// var fileSize =  1024 * 1024 * 5;
		var reader = new FileReader();         
		//创建文件读取相关的变量
		var imgFile,that = this;  
		//创建读取文件的对象
			   //为文件读取成功设置事件
			reader.onload=function(e) {
				// alert('文件读取完成');
				imgFile = e.target.result;
				that.imgOne = imgFile.split(',')[1]
				$("#imgg1").attr('src',imgFile);
			};
			//正式读取文件
			reader.readAsDataURL(file);
		
	},
	upLoadid:function(){//经营许可证
		var fileInput = document.getElementById("id");
		var file = fileInput.files[0];
		//创建读取文件的对象
		var reader = new FileReader();         
		//创建文件读取相关的变量
		var imgFile,that=this;         
		//为文件读取成功设置事件
		reader.onload=function(e) {
			// alert('文件读取完成');
			imgFile = e.target.result;
			that.imgtwo = imgFile.split(',')[1]
			$("#imgg2").attr('src',imgFile);
		};
		//正式读取文件
		reader.readAsDataURL(file);
	},
	upLoadidcard:function(){//其他扫描件
		var fileInput = document.getElementById("idCard");
		var file = fileInput.files[0];
		//创建读取文件的对象
		var reader = new FileReader();         
		//创建文件读取相关的变量
		var imgFile,that = this;         
		//为文件读取成功设置事件
		reader.onload=function(e) {
			imgFile = e.target.result;
			that.imgthere = imgFile.split(',')[1]
			$("#imgg3").attr('src',imgFile);
		};
		//正式读取文件
		reader.readAsDataURL(file);
	},
	changeCity:function(){
		var that = this,
		optionIndex = $('#qu option:checked').val();
		// that.city = optionIndex;
		var data = {
			"areaNum": optionIndex
		  }
		$.ajax({
			type: "post",
			url: baseUrl + "/hospital/selectNum",
			data: data,
			contentType: "application/x-www-form-urlencoded",
			dataType: "json",
			success: function (res) {
			  var hosdata = res.data;
			  let newData = hosdata.map(value => {
				return {
				  hospitalName: value.hospitalName,
				  hospitalNum: value.hospitalNum
				}
			  })
			  var str = "";
			  str += "<option value=''>请选择</option>"
			  $.each(newData, function (i, n) {
				str += "<option value=" + n.hospitalNum + ">" + n.hospitalName + "</option>"
			  })
			  $('#hospial').append(str)
			  $('#hospial').change(function () {
				that.city = $(this).val()
				$.ajax({
					url:baseUrl + "/deptorder/companyOrder",
					type:'post',
					data:{
						"hospitalNum":$('#hospial option:checked').val(),
						"time":tjDate
					},	
					success:function(res){
						console.log(res)
						if(res.status == 200){
							if(res.data.am >=0){
								$('.am_text').text(res.data.am)
								if(res.data.am == 0){
									$('.time_am').removeClass('cur')
								}
								
							}
							if(res.data.pm >= 0){
								$('.pm_text').text(res.data.pm)
								if(res.data.pm == 0){
									$('.time_pm').removeClass('cur')
								}
								
							}
							if(res.data.am ==0 && res.data.pm == 0){
								layer.msg("当前预约人数已满，请重新选择时间",{icon:2},{time:5000})
							}
						}
					}
				})
			  })
			},
			error: function () {
			  console.log("没拿到数据")
			}
		  });
	},
	ShowDiv:function(){
		var that = this;
		var upLoadData = JSON.parse(sessionStorage.getItem('pateData')),
			pateInput = $('#pateInput').val();
		var hospial = $('#hospial option:checked').val()
		var timeVal="",listImg = [that.imgOne]
		var timers = ""
		if($('.time_pm').hasClass('cur')){
			timeVal = "pm"
			timers = tjDate + " "+ "15:00:00"
		}
		if($('.time_am').hasClass('cur')){
			timeVal = "am"
			timers = tjDate + " "+ "10:00:00"
		}
		var data = {
			"deptImgurl":JSON.stringify(listImg),
			"deptName": upLoadData.deptName,
			"deptCode": upLoadData.deptCode,
			"deptPhone": upLoadData.telphone,
			"deptPeoplenum": pateInput,
			"deptTjcode": hospial,
			"deptTime":tjDate,
			"apm":timeVal,
			"yuliu2":timers
		}
		if(timeVal == ""){
			layer.msg("请选择体检时间段",{icon:7})
			return
		}
		if(that.imgOne == "" || pateInput == "" || hospial == ""){
			layer.msg("请输入完整信息",{icon:7})
		}else{
			$.ajax({
				url:baseUrl + "/deptorder/deptOrder2",
				type:'post',
				data:data,	
				success:function(res){
					console.log(res)
					if(res.status == 200){
						layer.msg("预约成功",{icon:1})
						setTimeout(function(){
							window.location.href = "/index.html"
						},2000)
					}else if(res.status == 700){
						layer.msg('预约人数超过可预约人数。',{icon:2})
					}else if(res.status == 800){
						layer.msg('当日预约人数已满，请选择其它时间!',{icon:2})
					}else if(res.status == 600){
						layer.msg('该时间已超过体检时间段,请重新选择体检日期!',{icon:2},{time:5000})
					}else if(res.status == 900){
						layer.msg('当前时间，只能预约下午体检时段!',{icon:2},{time:5000})
					}else if(res.status == 100){
						layer.msg("预约失败",{icon:2})
					}else{
						layer.msg("服务器异常",{icon:2})
					}
				}
			})
			
		}
	},
	upLoadExect:function(){

	},
	photoCheck:function(obj){
		
	},
	init:function(){
		var that = this;
		// $('.residue .time_am').on('click',function(){
		// 	$(this).addClass("cur").siblings().removeClass("cur");
		// })
		
		$("#qu").change(function () {
			$("#hospial").children().remove()
			that.changeCity()
		  })
		  var map = {
			"tjid": "35"
		  }
	}
}
patefile.init();
$(function(){
	$('.residue .times').click(function(){
		// debugger
		if($('.am_text').text() != 0 && $('.pm_text').text() != 0){
			$(this).addClass('cur').siblings().removeClass('cur')
		}else if($('.am_text').text() == 0 && $('.pm_text').text() != 0){
			$('.time_am').removeClass('cur');
			$('.time_pm').addClass('cur')
		}else if($('.pm_text').text() == 0 && $('.am_text').text() != 0){
			$('.time_am').addClass('cur')
			$('.time_pm').removeClass('cur')
		}else if($('.pm_text').text() == 0 && $('.am_text').text() == 0){
			$('.time_pm').removeClass('cur');
			$('.time_am').removeClass('cur');
		}
		// $(this).addClass('cur').siblings().removeClass('cur')
	})
})