function settime(){
	var telphone = $("#telphone").val();
	if(telphone==null || telphone==""){
		alert("手机号不能不填！")
		return false;
	}
	$.ajax({
		type:"post",
		url:baseUrl + "/sms/sendMsg?telphone="+telphone,
		success:function(data){
			if(data.status=="success"){
				console.log(data)
				alert("验证码已发送，请注意查收");
			}
		},
		error:function(data){
			console.log(data)
			alert("获取失败,原因为"+data);
		}
	});
}
					

			
			//上传资质
function sendMsg() {
	var dept = $("#dept").val();
	var deptcode = $("#dept-code").val();
	var telphone = $("#telphone").val();
	var code=$("#vcode").val();
	if(dept == null || dept == "" || deptcode == null || deptcode == "" || telphone == null || telphone == "" || code == null || code == "") {
		alert("请输入完整信息");
	}else{
		var data = {
			'deptName': dept,
			'deptOrganization': deptcode,
			'telphone': telphone,
			'otpCode': code
		}
		$.ajax({
			url :baseUrl + "/deptorder/add",
			type:'post',
			contentType: "application/x-www-form-urlencoded",
			data:data,
			success:function(res){
				console.log(res)
				if(res.status == 200){
					sessionStorage.setItem('pateData',JSON.stringify(data))
					window.location.href = "get-patefile.html"
				}else if(res.status == 250){
					if(res.status.data.status == 0){
						alert("正在审核,请等待，不要重复预约")
					}else{
						alert("审核成功，请查收短信")
					}
				}
			}
		})
	}
}

			//信息录入
			//		function save(){
			//			alert("敬请期待！！！");
			//		}
	function trim(str){
		str=str.replace(/^\s*/,"");
		str=str.replace(/\s*$/,"");
		return str;
	}

					//当所有input框不为空时,按钮变色
    $('input').on("input propertychange", function() {

        if(($.trim($('#dept').val()) !== "") && ($.trim($('#dept-code').val()) !== "") && ($.trim($('#telphone').val()) !== "")&& ($.trim($('#vcode').val()) !== "")){
            $("#send1").css("background-color","#FF9600");
        }else{
        	$("#send1").css("background-color","#B2B2B2");
        }
    });
    
    
    //手机号不为空按钮变色
	var tel = 0 ;
//实时监控输入框内容
$(document).on("input propertychange","#telphone", function(){
   tel = $("#telphone").val().length;
   if(tel !=0 && tel !=0){
      $("#sedCode").css({
         "background":"#ff9600"
      })
   }else {
      $("#sedCode").css({
         "background":"#b2b2b2"
      })
   }
})

		