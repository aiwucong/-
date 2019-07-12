	function sendMsg(){
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
					}else{
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
			function updata() {
				var result=false;
				var dept = $("#deptname").val();
				var deptcode = $("#deptcode").val();
				var telphone = $("#telphone").val();
				var code=$("#vcode").val();
				if(dept == null || dept == "") {
					alert("请输入单位或公司");
					return false;
				}
				if(deptcode == null || deptcode == "") {
					alert("请输入单位统一征信代码");
					return false;
				}
				if(telphone == null || telphone == "") {
					alert("请输入手机号");
					return false;
				}	
				if(code == null || code == "") {
					alert("请输入验证码");
					return false;
				}
								
				
//				$.ajax({
//					type: "post",
//					url:  baseUrl+"/deptorder/add",
//					data{
//						""
//					}
//					success: function(data) {
//						console.log(data)
//						if(code==data){
//							alert("登录成功");
//							location.href = "get-patefile.html";
//						}else{
//							alert("登录失败");
//						}
//					}
//				});
				
		
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
  
        if(($.trim($('#deptname').val()) !== "") && ($.trim($('#deptcode').val()) !== "") && ($.trim($('#telphone').val()) !== "")&& ($.trim($('#vcode').val()) !== "")){
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
         "background":"#b2b2b2"
      })
   }
})
//都不为空按钮变色
	var dname=0;
	var dcode=0;
	var vcode=0;
//实时监控输入框内容
$(document).on("input propertychange",function(){
   tel = $("#telphone").val().length;
   dname=$("#deptname").val().length;
   dcode=$("#deptcode").val().length;
   vcode=$("#vcode").val().length;
   if(tel !=0 && dname !=0&&dcode!=0&&vcode!=0){
      $("#send1").css({
         "background":"#ff9600"
      })
   }else {
      $("#send1").css({
         "background":"#b2b2b2"
      })
   }
})


layui.use(['form','layer'],function(){
	var form = layui.form
	var layer = layui.layer
	$('.deals').click(function () {
		var indexs = layer.open({
			title: false,
			area: ['400px', '600px'],
			type: 1,
			content: $('.notices'),
			btn: ['我已了解'],
			offset: '100px',
			btnAlign: 'c',
			shade: 0.8,
			moveType: 0,
			btn1: function (index) {
				layer.close(indexs);
			}

		});
	})
})

		