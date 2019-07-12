	function deptlogin(){
		
		}
	
				//当所有input框不为空时,按钮变色
    $('input').on('input propertychange', function() {
    	
        if(($.trim($('#account').val()) !== "") && ($.trim($('#passwd').val()) !== "")){
            $("#getCard").css("background-color","#FF9600");
        }else{
        	$("#getCard").css("background-color","#B2B2B2")
        }
	});
	$(document).keydown(function (event) {
		if (event.keyCode == 13) {
			deptlogin()
		}
	});	
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
		var checkboxs
		form.on('checkbox(filter)', function (data) {
			console.log(data.elem.checked); //是否被选中，true或者false
			checkboxs = data.elem.checked
			console.log(checkboxs)
		});
		$('#getCard').click(function(){
			var account=$("#account").val();
			var passwd = $("#passwd").val();
			if(account==null||account==""){
				layer.msg("账号不能为空");
				return false;
			}else if(passwd==null||passwd==""){
				layer.msg("密码不能为空");
				return false;
			}else if (checkboxs == false) {
				layer.msg('请勾选并阅读平台使用协议')
				return;
			} else{
				$.ajax({
					type:"post",
					contentType:"application/x-www-form-urlencoded",
					url: baseUrl + "/user/login",
					data:{
						"account":account,
						"password":passwd,
						"key":1
					},
					xhrFields:{withCredentials:true},
					success:function(data){
						if(data.status=="success"){
							checkboxs = null;
							localStorage.setItem("token",data.data.token);	
							localStorage.removeItem("iframeLists")	
							sessionStorage.setItem('name',data.data.deptName)				
							setTimeout(function(){
								location.href="jd/index.html";		
							},500)
	
						}else{
							layui.use('layer',function(){
								layer.msg("登录失败，原因为:"+data.data.errMsg);
							})
							
						}
					},
					error:function(data){
						alert("登录失败,原因为"+data.responseText);
					}
				})
			}
		
		})
	})