layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table2',
            height: 550,
            title: '用户数据表',
            url: baseUrl + "/tijian/getStatusList?token=" + localStorage.getItem("token"),
            method:'get',
            where: {status:1,
                hospitalNum:mainDatas.hospitalNum
            },
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
                            n.status = "合格"
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
            var idCard = data.tjId;
            console.log(data)
            if (obj.event === 'audit') {
                layer.confirm('确认修改为不合格？', {
                        title: ['合格', 'font-size:18px; text-align: center;'],
                        offset: '200px',
                        btn: ['确认', '取消'] //按钮
                    }, function () { //确认按钮函数
                        var newdata = {
                            "tjId": idCard,
                            "status": "2",
                        }
                        $.ajax({
                            url: baseUrl + "/tijian/oneTJSH?token=" + localStorage.getItem("token"),
                            type: 'post',
                            contentType: "application/x-www-form-urlencoded",
                            xhrFields: {
                                widthCredentials: true
                            },
                            data: newdata,
                            success: function (res) {
                                console.log(res)
                                if (res.status == '200') {
                                    layer.msg('审核成功', {offset: '200px'});
                                    obj.del();
                                    location.reload();
                                } else if (res.status == 'fail') {
                                    if(res.data.errCode == 60001){
                                        layer.msg('登录过期',{offset:'200px'})
                                        setTimeout(function(){
                                            if (window != window.top) {
                                                window.top.location = "../login-dept.html"
                                            }
                                            },500)
                                    }else{
                                        layer.msg('审核失败',{offset: '200px'});
                                    }
                                   
                                }
                            }
                        })
                    },
                    function () { //取消按钮函数
                    })
            }
        });
    })
