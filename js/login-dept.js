
		function deptlogin(){
			var account=$("#account").val();
			var passwd = $("#passwd").val();
			if(account==null||account==""){
				alert("账号不能为空");
				return false;
			}
			if(passwd==null||passwd==""){
				alert("密码不能为空");
				return false;
			}
			
			$.ajax({
				type:"post",
				url: baseUrl+"/user/login",
				data:{
					"account":account,
					"password":passwd,
					"key":0
				},
				xhrFields:{withCredentials:true},
				success:function(data){
					console.log(data)
					if(data.status=="success"){
						localStorage.setItem('token',data.data.token)
						localStorage.removeItem('iframeList')
						sessionStorage.setItem('name',data.data.deptName)
					location.href="html/index.html";
					}else{
						layui.use('layer',function(){
							layer.msg("登录失败，原因为:"+data.data.errMsg);
						})
					}
				},
				error:function(data){
					// alert("登录失败,原因为"+data.data.responseText);
					alert('失败')
				}
			})
		}
		
					//当所有input框不为空时,按钮变色
$('input').on('input propertychange', function() {
    	
        if(($.trim($('#account').val()) !== "") && ($.trim($('#passwd').val()) !== "")){
            $("#getCard").css("background-color","#FF9600");
        }else{
        	$("#getCard").css("background-color","#B2B2B2");
        }
	});
	
	$(document).keydown(function (event) {
		if (event.keyCode == 13) {
			deptlogin()
		}
	});
    
		
		
