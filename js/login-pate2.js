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
				contentType:"application/x-www-form-urlencoded",
				url: baseUrl + "/user/login",
				data:{
					"account":account,
					"password":passwd,
				},
				xhrFields:{withCredentials:true},
				success:function(data){
					if(data.status=="success"){
						localStorage.setItem("token",data.data.token);						
						setTimeout(function(){
							location.href="hostipalSelect.html";		
						},1000)

					}else{
						// alert("登录失败，原因为"+data.data.errMsg);
					}
				},
				error:function(data){
					alert("登录失败,原因为"+data.responseText);
				}
			})
		}
	
				//当所有input框不为空时,按钮变色
    $('input').on('input propertychange', function() {
    	
        if(($.trim($('#account').val()) !== "") && ($.trim($('#passwd').val()) !== "")){
            $("#getCard").css("background-color","#FF9600");
        }else{
        	$("#getCard").css("background-color","#B2B2B2")
        }
    });