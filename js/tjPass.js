 function wPasstable(){
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table2',
            height: 500,
            title: '用户数据表',
            url: baseUrl + "/tijian/getTJlist?token=" + localStorage.getItem("token"),
            method:'get',
            where: {status:1},
            even: true,
            autoSort: false,
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                $('#already-audited').text(res.data.count);
                $.each(res.data.pageData, function (i, n) {
                    n.status = "审核通过"
                })
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
                        title: '体检编号',
                        width: 100,
                    },
                    {
                        field: 'name',
                        title: '姓名',
                        width: 100,
                    },
                    {
                        field: 'createTime',
                        title: '体检时间',
                        width: 200
                    }, {
                        field: 'hearthcardNum',
                        title: '健康证编号',
                        width: 150
                    }, {
                        field: 'telphone',
                        title: '手机号码',
                        width: 100
                    },
                    {
                        field: 'startdate',
                        title: '发证日期',
                        width: 177
                    },
                    {
                        field: 'status',
                        title: '体检审核',
                        toolbar: '#toolbarDemos',
                        width: 180
                    }, {
                        field: 'status',
                        title: '体检结果',
                        width: 177
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
        //监听排序
        table.on('sort(table2)', function (obj) {
            layer.msg('服务端排序。order by ' + obj.field + ' ' + obj.type);
            //服务端排序
            table.reload('table2', {
                initSort: obj
                    //,page: {curr: 1} //重新从第一页开始
                    ,
                where: { //重新请求服务端
                    key: obj.field //排序字段
                        ,
                    order: obj.type //排序方式
                }
            });
        });
    })
 }
 $(function(){
    wPasstable()
 })
