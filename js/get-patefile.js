var patefile = {
	imgOne:'',
	imgtwo:'',
	imgthere:'',
	city:'',
	upLoad:function(){//上传营业执照
		var fileInput = document.getElementById("upimg");
		var file = fileInput.files[0];
		//创建读取文件的对象
		var reader = new FileReader();         
		//创建文件读取相关的变量
		var imgFile,that = this;         
		//为文件读取成功设置事件
		reader.onload=function(e) {
			// alert('文件读取完成');
			imgFile = e.target.result;
			that.imgOne = imgFile
			console.log(imgFile);
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
			that.imgtwo = imgFile
			console.log(imgFile);
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
			// alert('文件读取完成');
			imgFile = e.target.result;
			that.imgthere = imgFile
			// console.log(imgFile);
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
			url: baseUrl + "/deptorder/selectNum",
			data: data,
			contentType: "application/x-www-form-urlencoded",
			dataType: "json",
			success: function (res) {
			  // console.log(res)
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
				console.log(that.city)
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
		console.log(pateInput)
		console.log(hospial)
		var listImg = [that.imgOne,that.imgOne,that.imgthere]
		console.log(listImg)
		if(that.imgOne == "" || that.imgtwo == "" || that.imgthere =="" || pateInput == "" || hospial == ""){
			console.log(12)
			alert("请输入完整信息")
		}else{
			$.ajax({
				url:baseUrl + "/deptorder/updateFileInfo",
				type:'post',
				data:{
					"listImg": listImg,
					"deptName": upLoadData.deptName,
					"deptCode": upLoadData.deptOrganization,
					"deptPhone": upLoadData.telphone,
					"deptPeoplenum": pateInput,
					"deptTjcode": hospial
				},
        		// contentType: "application/json",
				
				success:function(res){
					console.log(res)
				}
			})
			console.log(13)
		}
	},
	upLoadExect:function(){

	},
	init:function(){
		var that = this;
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