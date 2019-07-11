$(function(){
    $('#reBack').click(function () {
        if (window.frames["iframeList"].history) {
            window.frames["iframeList"].history.go(-1);
        }
    })
    layui.use('layer',function(){
        $('#logOut').click(function(){
            layer.confirm('确认退出登录？', {
                btn: ['确认', '取消'] //按钮
            }, function () {
                $.ajax({
                    type: "post",
                    url: baseUrl + "/user/loginOut?token=" + localStorage.getItem(
                        "token"),
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        localStorage.removeItem("token");
                        window.location = "../login-dept.html"
                    },
                    error: function (data) {
                        alert("登录失败,原因为" + data.responseText);
                    }
                })
            });
        })
        $('#user_person').click(function(){
            layer.open({
                title: ['账号信息', 'font-size:18px; text-align: center;'],
                area: ['500px', 'auto'],
                type: 1,
                content: $('.userBox'),
                offset:'100px',
                // btn: ['确认修改','取消'], 
            });
            $.ajax({
                url: baseUrl + '/user/userInfo?token=' + localStorage.getItem('token'),
                type: 'post',
                xhrFields: {
                    widthCredentials: true
                },
                success: function (res) {
                    console.log(res)
                    $('.p_user').val(res.data.account)
                    $('.p_name').val(res.data.name)
                    $('.p_sex').val(res.data.sex)
                    $('.p_company').val(res.data.deptName)
                    $('.p_phone').val(res.data.telphone)
                },
                error: function (res) {
    
                }
            })
        })
        $('#cMessage').click(function(){
            layer.open({
                title: ['技术支持', 'font-size:18px; text-align: center;'],
                area: ['240px', 'auto'],
                type: 1,
                content: $('.messageBox'),
                offset:'100px'
            });
        })
    })
    var companyName = sessionStorage.getItem("name");
    $('.mdk_head h3').text(companyName)
})
