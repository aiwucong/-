//当所有input框不为空时,按钮变色
 $('input').on('input propertychange', function() {
        if(($.trim($('#account').val()) !== "") && ($.trim($('#passwd').val()) !== "")){
            $("#getCard").css("background-color","#FF9600");
        }else{
        	$("#getCard").css("background-color","#B2B2B2")
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
				btn: ['我已阅读并同意平台使用协议'],
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
			checkboxs = data.elem.checked
		});
 
		function deptlogin(){
			var account=$("#account").val();
			var passwd = $("#passwd").val();
			if(account==null||account==""){
				layer.msg("账号不能为空",{icon7});
				return false;
			}else if(passwd==null||passwd==""){
				layer.msg("密码不能为空",{icon:7});
				return false;
			}else if (checkboxs == false) {
				layer.msg('请勾选并阅读平台使用协议',{icon:7})
				return;
			} else{
				$.ajax({
					type:"post",
					contentType:"application/x-www-form-urlencoded",
					url: baseUrl + "/login/loginUser",
					data:{
						"account":account,
						"password":passwd,
						"key":2
					},
					xhrFields:{withCredentials:true},
					success:function(data){
						console.log(data)
						if(data.status=="200"){
							checkboxs = null;
							localStorage.setItem("token",data.data.token);	
							localStorage.removeItem("iframeLists")	
							var resultData = {
								"areaNum" : data.data.areaNum,
								"hospitalNum" : data.data.hospitalNum,
								"hospitalName":data.data.hospitalName,
								"nick":data.data.nick,
								"name":data.data.name
							}
							var resultDatas = JSON.stringify(resultData)
							sessionStorage.setItem("resultData",resultDatas);		
							location.href="jd/index.html";		
	
						}else if(data.status=="400"){
							layer.msg("该账号没有权限",{icon:2});
						}else if(data.status=="404"){
							layer.msg("该账号不存在",{icon:2});
						}else if(data.status=="100"){
							layer.msg(data.data,{icon:2});
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
		}
		$(document).keydown(function (event) {
			if (event.keyCode == 13) {
				deptlogin()
			}
		});	
		$('#getCard').click(function(){
			deptlogin()
		})
	})