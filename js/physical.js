window.onload = function() {
    // console.log("werwf")
    // 体检审核总数，体检合格总数，体检不合格总数
    $.ajax({
        url: "http://192.168.1.107:8086/tijian/getallstatus",
        type: "get",
        success: function(res) {
            console.log(res);
            console.log(res.length);
            $('#unaudited-audited').text(res.data.zerostatus);//待审核
            $('#already-audited').text(res.data.onestatus);//合格总数
            $('#unalready-audited').text(res.data.otwostatus);//不合格总数

        },
        error: function() {
            // console.log("服务器异常");
        }
    });

    // 体检待审核表格数据
    $.ajax({
        url: "http://192.168.1.107:8086/tijian/getzerolist",
        type: 'get',
        dataType: 'json',
        success: function(res) {
            console.log(111);
            var userData = res.data
            console.log(userData);
            dataTable(userData)
        }
    })
}

// 待审核表格函数
function dataTable(userData) {
    layui.use('table', function() {
        var table = layui.table;
    
        //渲染
        table.render({
            elem: '#table1',
            height: 500,
            title: '用户数据表',
            data: userData,
            even: true,
            autoSort: false,
            // loading: false,
            // totalRow: true,
            // limit: 30,
            toolbar: '#toolbarDemo',
            // defaultToolbar: ['filter'],
    
            cols: [[ //表头
                    {
                        width: 60,
                        type: "checkbox",
                        // fixed: 'left'
                    },
                    {
                        field: 'number',
                        title: 'ID',
                        width: 100,
                        // sort: true,
                        // fixed: 'left'
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
                        field: 'healcardcreatTime',
                        title: '发证日期',
                        width: 177
                    },
                    {
                        field: 'status',
                        title: '体检审核',
                        toolbar: '#barDemo',
                        width: 180
                    }, {
                        field: 'medical',
                        title: '体检结果',
                        width: 177
                    }
                   
                ]
            ],
            page: true
        });
        //未审核表格监听行工具事件
        table.on('tool(table1)', function(obj) {
            var data = obj.data;
            //console.log(obj)
            if (obj.event === 'audit_pass') {
                layer.confirm('确认是否合格？',{
                    title: ['合格', 'font-size:18px; text-align: center;'],
                    btn: ['确认','取消'] //按钮
                  }, function(){
                    layer.msg('审核成功', {icon: 1});
                    var newdata={
                        "number":4,
                        "status" :1
                     }
                    $.ajax({
                        url: "http://192.168.1.107:8086/tijian/upstatus",
                        type: 'post',
                        contentType:"application/json;chaset=utf-8",
                        dataType: 'json',
                        data:JSON.stringify(newdata),
                        success: function(res) {
                            console.log(222)
                           console.log(res);
                           obj.del();
                        }
                    })
                  },
                  function(){
                  })
    
                 } else if (obj.event === 'audit_failed') {
                var index = layer.open({
                    title: ['不合格原因', 'font-size:18px; text-align: center;'],
                    area: ['450px', '240px'],
                    type: 1,
                    content: $('#box1'), //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                    btn: ['确认', '取消'],
                    btn1() {
                        // 确定按钮的回调 写业务代码
                        layer.msg('审核成功', { icon: 1 });
                        layer.close(index);
                    },
                    btn2() {
                        //取消按钮的回调
                    }
    
                });
            }
        });
    
        //监听排序
        table.on('sort(table1)', function(obj) {
            console.log(this)
    
            //return;
            layer.msg('服务端排序。order by ' + obj.field + ' ' + obj.type);
            //服务端排序
            table.reload('table1', {
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
    
    
    
    
        window.ins1 = table.render({
            elem: '#table2',
            height: 500,
            title: '用户数据表',
            url: '../json/table/demo2.json'
                //,size: 'lg'
                ,
            even: true,
            autoSort: false
                //,loading: false
                ,
            totalRow: true,
            limit: 30,
            toolbar: '#toolbarDemo',
            //     //,defaultToolbar: ['filter']
            //     ,
            cols: [[
                {
                    width: 60,
                    type: "checkbox",
                    // fixed: 'left'
                },
                {
                    field: 'id',
                    title: 'ID',
                    width: 100,
                    // sort: true,
                    // fixed: 'left'
                },
                {
                    field: 'username',
                    title: '姓名',
                    width: 120,
                },
                {
                    field: 'time',
                    title: '体检时间',
                    width: 200
                }, {
                    field: 'number',
                    title: '健康证编号',
                    width: 150
                }, {
                    field: 'phonenumber',
                    title: '手机号码',
                    width: 100
                },
                {
                    field: 'date',
                    title: '发证日期',
                    width: 177
                },
                {
                    field: 'city',
                    title: '体检审核',
                    toolbar: '#toolbarDemos',
                    width: 150
                }, {
                    field: 'result',
                    title: '体检结果',
                    width: 177
                }
            ]
            ]
        });
    
        //工具栏事件
        // table.on('toolbar(test)', function(obj) {
        //     var checkStatus = table.checkStatus(obj.config.id);
        //     switch (obj.event) {
        //         case 'add':
        //             layer.msg('添加');
        //             break;
        //         case 'update':
        //             layer.msg('编辑');
        //             break;
        //         case 'delete':
        //             layer.msg('删除');
        //             break;
        //         case 'getCheckData':
        //             var data = checkStatus.data;
        //             layer.alert(JSON.stringify(data));
        //             break;
        //         case 'getCheckLength':
        //             var data = checkStatus.data;
        //             layer.msg('选中了：' + data.length + ' 个');
        //             break;
        //         case 'isAll':
        //             layer.msg(checkStatus.isAll ? '全选' : '未全选')
        //             break;
        //     };
        // });
    
        // table.on('row(test)', function(obj) {
        //     console.log(obj);
        //     //layer.closeAll('tips');
        // });
    
    
        //监听表格行点击
        // table.on('tr', function(obj) {
        //     console.log(obj)
        // });
    
        // //监听表格复选框选择
        // table.on('checkbox(test)', function(obj) {
        //     console.log(obj)
        // });
    
        // //监听表格单选框选择
        // table.on('radio(test)', function(obj) {
        //     console.log(obj)
        // });
    
        // //监听表格单选框选择
        // table.on('rowDouble(test)', function(obj) {
        //     console.log(obj);
        // });
    
        // //监听单元格编辑
        // table.on('edit(test)', function(obj) {
        //     var value = obj.value //得到修改后的值
        //         ,
        //         data = obj.data //得到所在行所有键值
        //         ,
        //         field = obj.field; //得到字段
    
        //     console.log(obj)
        // });
    
        //监听行工具事件
        table.on('tool(table2)', function(obj) {
            var data = obj.data;
            //console.log(obj)
            if (obj.event === 'audit_modify') {
                layer.open({
                    title: ['修改结果', 'font-size:18px; text-align: center;'],
                    area: ['400px', '300px'],
                    type: 1,
                    content: $('#box2'),
                    btn: ['确认', '取消'],
                    btn1() {
                        // 确定按钮的回调 写业务代码
                        layer.msg('的确很重要', { icon: 1 });
                    },
                    btn2() {
                        //取消按钮的回调
                    }
    
                });
    
            } else if (obj.event === 'audit_failed') {
                layer.open({
                    title: ['审核结果', 'font-size:18px; text-align: center;'],
                    area: ['450px', '400px'],
                    type: 1,
                    content: $('#box1'), //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                    btn: ['确认', '取消'],
                    btn1() {
                        // 确定按钮的回调 写业务代码
                        layer.msg('预约时间成功', { icon: 1 });
                    },
                    btn2() {
                        //取消按钮的回调
                    }
    
                });
            }
        });
    
        //监听排序
        table.on('sort(table2)', function(obj) {
            console.log(this)
    
            //return;
            layer.msg('服务端排序。order by ' + obj.field + ' ' + obj.type);
            //服务端排序
            table.reload('test', {
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
    
    
        //return;
    
        var $ = layui.jquery,
            active = {
                parseTable: function() {
                    table.init('parse-table-demo', {
                        limit: 3
                    });
                },
                add: function() {
                    table.addRow('test')
                }
            };
        $('i').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.layui-btn').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    });
}
layui.use(['element', 'laydate', 'layer', 'form'], function() {
    var element = layui.element;
    var laydate = layui.laydate;
    var form = layui.form;

    //日期范围
    laydate.render({
        elem: '#aa',
    });
    form.on('submit(formDemo)', function(data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });
    // tab栏点击事件体检合格
    element.on('tab(docDemoTabBrief)', function(data) {})
});
