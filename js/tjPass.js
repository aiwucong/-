layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table2',
            height: 550,
            title: '用户数据表',
            url: baseUrl + "/tijian/getTJlist?token=" + localStorage.getItem("token"),
            method:'get',
            where: {status:1},
            autoSort: false,
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                if(res.status == 250){
                    if(window != window.top){
                        layer.msg('请重新登录！',{offset:'200px'})
                        setTimeout(function(){
                            window.top.location = "../index.html";
                        },1000)
                    }
                }else if(res.status == 'success'){
                    $('#already-audited').text(res.data.count);
                    if (res.data.pageData != null){
                        $.each(res.data.pageData, function (i, n) {
                            n.status = "审核通过"
                        })
                    } 
                }
                // 可进行数据操作
                return {
                    "count": res.data.count,
                    "data": res.data.pageData,
                    "code": res.status//code值为200表示成功
                };
            },
            response: {
                statusName: 'code',
                statusCode: 'success', // 对应 code自定义的参数名称
            },
            cols: [
                [ //表头
                    {
                        width: 60,
                        type: "checkbox",
                    },
                    {
                        field: 'number',
                        title: '体检编号'
                    },
                    {
                        field: 'name',
                        title: '姓名'
                    },
                    {
                        field: 'createTime',
                        title: '体检时间'
                    }, {
                        field: 'hearthcardNum',
                        title: '健康证编号'
                    }, {
                        field: 'telphone',
                        title: '手机号码'
                    },
                    {
                        field: 'startdate',
                        title: '发证日期'
                    },
                    {
                        field: 'status',
                        title: '体检审核',
                        toolbar: '#toolbarDemos'
                    }, {
                        field: 'status',
                        title: '体检结果'
                    }
    
                ]
            ],
            page: true,
        });
         //体检合格监听行工具事件
         table.on('tool(table2)', function (obj) {
            var data = obj.data;
            var idCardNum = data.idcardNum;
            if (obj.event === 'audit') {
                layer.confirm('确认修改为不合格？', {
                        title: ['合格', 'font-size:18px; text-align: center;'],
                        offset: '200px',
                        btn: ['确认', '取消'] //按钮
                    }, function () { //确认按钮函数
                        var newdata = {
                            "idCardNum": idCardNum,
                            "status": "2"
                        }
                        $.ajax({
                            url: baseUrl + "/tijian/updateTJstatus",
                            type: 'post',
                            contentType: "application/x-www-form-urlencoded",
                            xhrFields: {
                                widthCredentials: true
                            },
                            data: newdata,
                            success: function (res) {
                                if (res.status == '200') {
                                    layer.msg('审核成功', {icon: 1},{offset: '200px'});
                                    obj.del();
                                    location.reload();
                                } else if (res.status == 'fail') {
                                    layer.msg('审核失败', {icon: 2},{offset: '200px'});
                                }
                            }
                        })
                    },
                    function () { //取消按钮函数
                    })
            }
        });
    })
