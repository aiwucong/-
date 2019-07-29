//当所有input框不为空时,按钮变色
$('input').on('input propertychange', function () {

	if (($.trim($('#account').val()) !== "") && ($.trim($('#passwd').val()) !== "")) {
		$("#getCard").css("background-color", "#FF9600");
	} else {
		$("#getCard").css("background-color", "#B2B2B2");
	}
});

layui.use(['form', 'layer'], function () {
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
		return checkboxs;
	});
	function deptlogin(){
		var account = $("#account").val();
			var passwd = $("#passwd").val();
			if (account == null || account == "") {
				layer.msg("账号不能为空",{icon:7});
				return false;
			} else if (passwd == null || passwd == "") {
				layer.msg("密码不能为空",{icon:7});
				return false;
			} else if (checkboxs == false) {
				layer.msg('请勾选并阅读平台使用协议',{icon:7})
				return;
			} else{
				$.ajax({
				type:"post",
				url: baseUrl+"/login/loginUser",
				data:{
					"account":account,
					"password":passwd,
					"key":1
				},
				xhrFields:{withCredentials:true},
				success:function(data){
					console.log(data)
					checkboxs = null;
					if(data.status=="200"){
						localStorage.setItem('token',data.data.token)
						localStorage.removeItem('iframeList')
						var resultData = {
							"areaNum" : data.data.areaNum,
							"hospitalNum" : data.data.hospitalNum,
							"hospitalName":data.data.hospitalName,
							"nick":data.data.nick,
							"name":data.data.name,
							"sex":data.data.sex,
							"telphone":data.data.telphone,
							"name":data.data.name,
							"status":data.data.status,
							"account":data.data.account
						}
						var resultDatas = JSON.stringify(resultData)
						sessionStorage.setItem("resultData",resultDatas);
					location.href="html/index.html";
					}else{
						layui.use('layer',function(){
							layer.msg(data.data,{icon:2});
						})
					}
				},
				error:function(data){
					// alert("登录失败,原因为"+data.data.responseText);
					alert('失败')
				}
			})
			}
		
	}
	$('#getCard').click(function(){
		deptlogin()	
	})
	$(document).keydown(function (event) {
		if (event.keyCode == 13) {
			deptlogin()
		}
	});

})
