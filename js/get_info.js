function sendMsg(){
			var telphone = $("#telphone").val();
			var code=$("#vcode").val();
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
					}else{
						alert("验证码获取失败");
					}
				},
				error:function(data){
					console.log(data)
					alert("获取失败,原因为"+data);
				}
			})
		}
		
		
		//查询健康证
		function getCard(){
			
			var idCard = $("#idCard").val();
			var telphone = $("#telphone").val();
			var vcode = $("#vcode").val();
			if(idCard==null || idCard==""){
				alert("身份证号不能为空");
				return false;
			}
			if(telphone==null || telphone==""){
				alert("手机号不能为空");
				return false;
			}
			if(vcode==null || vcode==""){
				alert("验证码不能为空");
				return false;
			}
			$.ajax({
				type:"get",
				url:  baseUrl+"/healthcard/get?optcode="+vcode,
				data:{"otpCode":vcode},
				success:function(data){
					console.log(data)
					if(data==vcode){
						alert("查询成功");
						sessionStorage.setItem("card",data.data);
						location.href="healthCard.html";
					}else{
						alert("查询失败,原因："+data.data.errMsg);
					}
				},
				error:function(data){
					//console.log(data)
					//alert("获取失败,原因为"+data.data.errMsg);

					//alert("err")
				}
						
			});
						
		}
	

		//健康证
//		function getCard(){
//			location.href="hearthCard-info.html"
//		}

	
	
				//当所有input框不为空时,按钮变色
$('input').on('input propertychange', function() {
    	
        if(($.trim($('#idCard').val()) !== "") && ($.trim($('#telphone').val()) !== "")&& ($.trim($('#vcode').val()) !== "")){
            $("#getCard").css("background-color","#FF9600");
        }else{
        	$("#getCard").css("background-color","#B2B2B2");
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
         "background":"#B2B2B2"
      })
   }
})