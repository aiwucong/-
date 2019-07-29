function trim(str) {
	str = str.replace(/^\s*/, "");
	str = str.replace(/\s*$/, "");
	return str;
}

//当所有input框不为空时,按钮变色
$('input').on("input propertychange", function () {

	if (($.trim($('#dept').val()) !== "") && ($.trim($('#dept-code').val()) !== "") && ($.trim($('#telphone').val()) !== "") && ($.trim($('#vcode').val()) !== "")) {
		$("#send1").css("background-color", "#FF9600");
	} else {
		$("#send1").css("background-color", "#B2B2B2");
	}
});


//手机号不为空按钮变色
var tel = 0;
//实时监控输入框内容
$(document).on("input propertychange", "#telphone", function () {
	tel = $("#telphone").val().length;
	if (tel != 0 && tel != 0) {
		$("#sedCode").css({
			"background": "#ff9600"
		})
	} else {
		$("#sedCode").css({
			"background": "#b2b2b2"
		})
	}
})


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
	});
	$('#send1').click(function () {
		var dept = $("#dept").val();
		var deptcode = $("#dept-code").val();
		var telphone = $("#telphone").val();
		var code = $("#vcode").val();
		if (dept == null || dept == "" || deptcode == null || deptcode == "" || telphone == null || telphone == "" || code == null || code == "") {
			layer.msg("请输入完整信息",{icon:7});
			return
		} else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(deptcode))) {
			layer.msg('请输入正确的身份证号/单位统一信用代码', {icon:7});
		}else if (!(/^1[3456789]\d{9}$/.test(telphone))) {
				layer.msg('请输入正确的手机号', {icon:7});
		}else if(checkboxs == false) {
			layer.msg('请勾选并阅读平台使用协议',{icon:7})
		}else {
			var data = {
				'deptName': dept,
				'deptCode': deptcode,
				'telphone': telphone,
				'otpCode': code,
			}
			$.ajax({
				url: baseUrl + "/deptorder/deptOrder1",
				type: 'post',
				contentType: "application/x-www-form-urlencoded",
				data: data,
				success: function (res) {
					if (res.status == 200) {
						sessionStorage.setItem('pateData', JSON.stringify(data))
						window.location.href = "get-patefile.html"
					}else if (res.status == 400) {
						if(res.data.status == 1){
							layer.msg("预约审核通过，不要体检时间内重复预约",{icon:1})
						}else if(res.data.status == 0){
							layer.msg("预约正在审核中，不要重复预约",{icon:7})
						}else{
							layer.msg("预约审核不通过,原因为："+res.data.why,{icon:2},{time:5000})
						}
					}else if(res.status == 300){
						layer.msg("预约失信次数已超过3次,不能再次预约",{icon:2},{time:5000})
					}
					else{
						layer.msg('验证码错误',{icon:2})
					}
				}
			})
		}
	})
	function settime() {
		var telphone = $("#telphone").val();
		if (telphone == null || telphone == "") {
			layer.msg("手机号不能不填！",{icon:7})
			return false;
		}
		$.ajax({
			type: "post",
			url: baseUrl + "/sms/sendMsg?telphone=" + telphone,
			success: function (data) {
				if (data.status == "200") {
					layer.msg("验证码已发送，请注意查收",{icon:1});
				}else if(data.status == '300'){
					layer.msg('【玛迪卡云】&nbsp&nbsp您的验证码已发送,有效期为20分钟,请勿重复发送。',{icon:7});
				}else{
					layer.msg("验证码获取失败",{icon:2});
				}
			},
			error: function (data) {
				alert("获取失败,原因为" + data);
			}
		});
	}
	$('#sedCode').click(function(){
		settime()
	})
})