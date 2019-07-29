		
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


layui.use(['form','layer'],function(){
	var form = layui.form;
	var layer = layui.layer;
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
		var idCard = $("#idCard").val();
			var telphone = $("#telphone").val();
			var vcode = $("#vcode").val();
			if(idCard==null || idCard==""){
				layer.msg("身份证号不能为空",{icon:7});
			}else if(telphone==null || telphone==""){
				layer.msg("手机号不能为空",{icon:7});
			}else if(vcode==null || vcode==""){
				layer.msg("验证码不能为空",{icon:7});
			}else if(checkboxs == false) {
				layer.msg('请勾选并阅读平台使用协议',{icon:7})
			}else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard))) {
				layer.msg('请输入正确的身份证号', {icon:7});
			}else if (!(/^1[3456789]\d{9}$/.test(telphone))) {
					layer.msg('请输入正确的手机号', {icon:7});
			}else{
				$.ajax({
					type:"get",
					url:  baseUrl+"/healthcard/get",
					data:{"otpCode":vcode,
							"idCard":idCard,
							"telphone":telphone
					},
					success:function(data){
						console.log(data);
						if(data.status==200){
							layer.msg("查询成功",{icon:1});
							sessionStorage.setItem('card',JSON.stringify(data.data))
							location.href="healthCard.html";
						}else if(data.status == 100){
							layer.msg("查询失败,原因："+data.data);
						}else {
							layer.msg(data.data.errMsg)
						}
					},
					error:function(data){
						layer.msg("获取失败,原因为"+data.data.errMsg);
					}
							
				});
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

	function sendMsg(){
		var telphone = $("#telphone").val();
		var code=$("#vcode").val();
		if(telphone==null || telphone==""){
			layer.msg("手机号不能不填",{icon:2})
			return false;
		}
		$.ajax({
			type:"post",
			url:baseUrl + "/sms/sendMsg?telphone="+telphone,
			success:function(data){
				console.log(data)
				if(data.status=="200"){
					layer.msg("验证码已发送，请注意查收",{icon:1});
				}else if(data.status == '300'){
					layer.msg('【玛迪卡云】&nbsp&nbsp您的验证码已发送,有效期为20分钟,请勿重复发送。',{icon:7});
				}else{
					layer.msg("验证码获取失败",{icon:2});
				}
			},
			error:function(data){
				alert("获取失败,原因为"+data);
			}
		})
	}
	$('#sedCode').click(function(){
		sendMsg()
	})
})