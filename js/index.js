    layui.use('layer', function () {
        var layer = layui.layer
        $('#user_person').click(function () {
            layer.open({
                title: ['账号信息', 'font-size:14px; text-align: center; font-weight: bold !important;'],
                area: ['500px', 'auto'],
                type: 1,
                content: $('.userBox'),
                offset: '100px',
                // btn: ['确认修改','取消'], 
            });
            mainDatas.status = 1 ?  mainDatas.status='正常':  mainDatas.status='禁用'          
            $('.p_user').val(mainDatas.account)
            $('.p_name').val(mainDatas.name)
            $('.p_sex').val(mainDatas.sex)
            $('.p_status').val(mainDatas.status)
            $('.p_phone').val(mainDatas.telphone)
        })
        $('#cMessage').click(function () {
            layer.open({
                title: ['服务热线', 'font-size:14px; text-align: center; font-weight: bold !important;'],
                area: ['240px', 'auto'],
                type: 1,
                content: $('.messageBox'),
                offset: '200px'
            });
        })
         $('.mdk_head h3').text(mainDatas.hospitalName)
    })