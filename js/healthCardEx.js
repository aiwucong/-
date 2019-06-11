layui.use(['element', 'laydate', 'layer', 'form'], function () {
    var element = layui.element;
    var laydate = layui.laydate;
    var form = layui.form;

    //日期范围
    laydate.render({
        elem: '#aa',
    });
    form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});

// 未打印表格
function dataTable(userData) {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table1',
            height: 500,
            title: '用户数据表',
            data: userData,
            even: true,
            autoSort: false,
            toolbar: '#toolbarDemo',

            cols: [
                [ //表头
                    {
                        width: 60,
                        type: "checkbox",
                    },
                    {
                        field: 'healthId',
                        title: 'ID',
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
                        field: 'healthNum',
                        title: '健康证编号',
                        width: 150
                    }, {
                        field: 'idCard',
                        title: '身份证号',
                        width: 150
                    },
                    {
                        field: 'createTime',
                        title: '审核日期',
                        width: 177
                    },
                    {
                        field: 'city',
                        title: '打印健康证',
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

        //监听行工具事件
        table.on('tool(table1)', function (obj) {
            var data = obj.data;
            var dataId = data.healthId;
            if (obj.event === 'audit_pass') {
                // debugger
                $('.box').show()
                var dataId = data.healthId;
                debugger
                xiangqing(dataId);
                healthPrints();

            } else if (obj.event === 'audit_xiangqing') {
                var dataId = data.healthId;
                xiangqing(dataId);
            }
        });

        //监听排序
        table.on('sort(table1)', function (obj) {
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

    });
}
// 打印函数
function healthPrints() {
    bdhtml = window.document.body.innerHTML; //获取当前页的html代码
    sprnstr = "<!--stratprint-->"; //设置打印开始区域 
    eprnstr = "<!--endprint-->"; //设置打印结束区域 
    prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17); //从开始代码向后取html 
    prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
    window.document.body.innerHTML = prnhtml;
    window.print();
    window.document.body.innerHTML = bdhtml;
    location.reload();
}

// 已打印表格
function dataTables(passDate) {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table2',
            height: 500,
            title: '用户数据表',
            data: passDate,
            even: true,
            autoSort: false,
            totalRow: true,
            limit: 30,
            cols: [
                [{
                        width: 60,
                        type: "checkbox",
                    },
                    {
                        field: 'healthId',
                        title: 'ID',
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
                        field: 'healthNum',
                        title: '健康证编号',
                        width: 150
                    }, {
                        field: 'idCard',
                        title: '身份证号',
                        width: 150
                    },
                    {
                        field: 'createTime',
                        title: '审核日期',
                        width: 177
                    },
                    {
                        field: 'city',
                        title: '打印健康证',
                        toolbar: '#barDemo',
                        width: 180
                    }, {
                        field: 'medical',
                        title: '体检结果',
                        width: 177
                    }
                ]
            ]
        });
        //监听行工具事件
        table.on('tool(table2)', function (obj) {
            var data = obj.data;
            if (obj.event === 'audit_xiangqing') {
                var dataId = data.healthId;
                xiangqing(dataId);
            }
        });

        //监听排序
        table.on('sort(table2)', function (obj) {
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
                parseTable: function () {
                    table.init('parse-table-demo', {
                        limit: 3
                    });
                },
                add: function () {
                    table.addRow('test')
                }
            };
        $('i').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    })
}



window.onload = function () {
    var data = {
        "printStatus": 0
    }
    var datas = {
        "printStatus": 1
    }
    // 未打印
    $.ajax({
        url: baseUrl + "/healthcard/dayin",
        type: 'post',
        xhrFields: {
            widthCredentials: true
        },
        data: JSON.stringify(data),
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        success: function (res) {
            var userData = res.data;

            $.each(userData, function (i, n) {
                if (n.medical == 0) {
                    n.medical = "合格"
                } else {
                    n.medical = "不合格"
                }
            })
            dataTable(userData)
        }
    })
    // 已打印
    $.ajax({
        url: baseUrl + "/healthcard/dayin",
        type: 'post',
        xhrFields: {
            widthCredentials: true
        },
        data: JSON.stringify(datas),
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        success: function (res) {
            var passDate = res.data;
            $.each(passDate, function (i, n) {
                if (n.medical == 0) {
                    n.medical = "合格"
                } else {
                    n.medical = "不合格"
                }
            })
            dataTables(passDate)
        }
    })
}

// 详情
function xiangqing(dataId) {
    $.ajax({
        url: baseUrl + "/healthcard/xiangqing",
        type: 'post',
        xhrFields: {
            widthCredentials: true
        },
        data: JSON.stringify({
            "healthId": dataId
        }),
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        success: function (res) {
            console.log(res);
            var medical = res.data.medical
            if (medical == 0) {
                medical = "合格"
            } else {
                medical = "不合格"
            }
            $('#name').attr('value', res.data.name);
            $('#age').attr('value', res.data.age);
            $('#sex').attr('value', res.data.gender);
            $('#tj').attr('value', medical);
            $('#dataTime').attr('value', res.data.updateTime);
            $('#erwerma').attr('src', "data:image/jpg;base64," + res.data.qrCode);
            $('#gz').attr('src', "data:image/jpg;base64," + res.data.gz);
            $('#personImg').attr('src', "data:image/jpg;base64," + res.data.idCardPhoto);
            $('#card').attr('value', res.data.healthNum);
            $('#art').text(res.data.name);
            $('.age').text(res.data.age);
            $('.sex').text(res.data.gender);
            $('.tj').text(medical);
            $('.dataTime').text( res.data.updateTime);
            $('.erweima').attr('src' ,"data:image/jpg;base64," + res.data.qrCode);
            $('.zhang').attr('src', "data:image/jpg;base64," + res.data.gz);
            $('.personImg').attr('src', "data:image/jpg;base64," + res.data.idCardPhoto);
            $('.card').text(res.data.healthNum);
        }
    })

}