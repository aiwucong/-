$(function() {
    $('.audited').click(function() {
        $.ajax({
            url: baseUrl + "/deptup/getres",
            type: "get",
            data: {
                'status': 1
            },
            xhrFields:{withCredentials:true},
            success: function(res) {
                console.log(res);
                console.log(res.length);
            },
            error: function() {
                console.log('服务器异常');
            }

        });
    });

})


window.onload = function() {
    // console.log("werwf")
    $.ajax({
        url: baseUrl + "/deptup/getres",
        type: "get",
        data: {
            'status': 1
        },
        xhrFields:{withCredentials:true},
        success: function(res) {
            console.log(res);
            console.log(res.length);
            $('#already-audited').text(res.length);
        },
        error: function() {
            // console.log("服务器异常");
        }
    });
    $.ajax({
        url: baseUrl + "/getres",
        type: "get",
        data: {
            'status': 2
        },
        xhrFields:{withCredentials:true},
        success: function(res) {
            console.log(res);
            console.log(res.length);
            $('#unaudited-audited').text(res.length);
        },
        error: function() {
            // console.log("服务器异常");
        }
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
});
layui.use('table', function() {
    var table = layui.table;

    //渲染
    table.render({
        elem: '#table1',
        height: 500,
        title: '用户数据表',
        url: '../json/table/demo1.json',
        even: true,
        autoSort: false,
        page:true,
        toolbar: '#toolbarDemo',
        // defaultToolbar: ['filter'],

        cols: [[ //表头
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
                    field: 'id',
                    title: '登记时间',
                    width: 100,
                },
                {
                    field: 'username',
                    title: '单位名称',
                    width: 200
                }, {
                    field: 'creditcode',
                    title: '单位统一信用代码',
                    width: 150
                }, {
                    field: 'phonenumber',
                    title: '手机号码',
                    width: 100
                }, {
                    field: 'city',
                    title: '预约资质审核',
                    toolbar: '#barDemo',
                    width: 280
                }, {
                    field: 'result',
                    title: '结果',
                    width: 177
                }
            ]
        ],
        page: true
    });

    //监听行工具事件
    table.on('tool(table1)', function(obj) {
        var data = obj.data;
        //console.log(obj)
        if (obj.event === 'audit_pass') {
            layer.open({
                title: ['审核结果', 'font-size:18px; text-align: center;'],
                area: ['450px', '320px'],
                type: 1,
                content: $('#box'),
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
                    layer.msg('的确很重要', { icon: 1 });
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
        url: '',
        even: true,
        autoSort: false,
        totalRow: true,
        limit: 30,
        toolbar: '#toolbarDemo',
        //     //,defaultToolbar: ['filter']
        //     ,
        cols: [
            [ //表头
                {
                    width: 60,
                    type: "checkbox",
                    fixed: true
                },
                {
                    field: 'id',
                    title: 'ID',
                    width: 100,
                    fixed: true,
                    sort: true
                },
                {
                    field: 'id',
                    title: '登记时间',
                    width: 100,
                },
                {
                    field: 'username',
                    title: '单位名称',
                    width: 200
                }, {
                    field: 'username',
                    title: '单位统一信用代码',
                    width: 150
                }, {
                    field: 'sex',
                    title: '手机号码',
                    width: 100
                }, {
                    field: 'city',
                    title: '预约资质审核',
                    toolbar: '#toolbarDemo',
                    width: 280
                }, {
                    field: 'sign',
                    title: '结果',
                    width: 177
                }
            ]
        ]
    });

    //监听行工具事件
    table.on('tool(table2)', function(obj) {
        var data = obj.data;
        //console.log(obj)
        if (obj.event === 'audit_pass') {
            layer.open({
                title: ['审核结果', 'font-size:18px; text-align: center;'],
                area: ['450px', '320px'],
                type: 1,
                content: $('#box'),
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