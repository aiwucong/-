window.onload = function () {
    // 体检审核总数，体检合格总数，体检不合格总数
    $.ajax({
        url: baseUrl + "/tijian/getallstatus",
        type: "get",
        success: function (res) {
            // console.log(res);
            // console.log(res.length);
            $('#unaudited-audited').text(res.data.zerostatus); //待审核
            $('#already-audited').text(res.data.onestatus); //合格总数
            $('#unalready-audited').text(res.data.otwostatus); //不合格总数

        },
        error: function () {
            // console.log("服务器异常");
        }
    });

    // 体检待审核表格数据
    $.ajax({
        url: baseUrl + "/tijian/getzerolist",
        type: 'get',
        xhrFields: {
            widthCredentials: true
        },
        dataType: 'json',
        success: function (res) {
            var userData = res.data
            $.each(userData, function (i, n) {
                n.status = "审核不通过"
        })
            // console.log(userData);
            dataTable(userData)
        }
    })
    // 体检合格
    $.ajax({
        url: baseUrl + "/tijian/getonelist",
        type: 'get',
        xhrFields: {
            widthCredentials: true
        },
        dataType: 'json',
        success: function (res) {
            var passData = res.data
            $.each(passData, function (i, n) {
                    n.status = "审核通过"
            })
            // console.log(passData);
            dataTables(passData)
        }
    });
    // 体检不合格
    $.ajax({
        url: baseUrl + "/tijian/gettwolist",
        type: 'get',
        xhrFields: {
            widthCredentials: true
        },
        dataType: 'json',
        success: function (res) {
            var unpassData = res.data
            $.each(unpassData, function (i, n) {
                n.status = "审核不通过"
        })
            dataTableser(unpassData)
        }
    });


}
var selectVal;
var hgDate;
var enddate;
// layui模板使用
layui.use(['element', 'laydate', 'layer', 'form'], function () {
    var element = layui.element;
    var laydate = layui.laydate;
    var form = layui.form;
    form.on('select(category)', function (data) {
        // console.log(data.elem); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值
        selectVal = data.value;
    })

    //日期范围
    laydate.render({
        elem: '#aa',
        done: function (value, date) {
            hgDate = value;
            var FullYear = date.year + 1;
            var month = date.month;
            month = month < 10 ? '0' + month : month;
            var day = date.date;
            day = day < 10 ? '0' + day : day;
            var lastDate = FullYear + "-" + month + "-" + day;
            document.getElementById("enddate").value = lastDate;
            enddate = document.getElementById("enddate").value;
        }
    });
    laydate.render({
        elem: '#openDate',
        range: true
    });

    form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});
//身份证正则表达式
function regIDCard(wcard){
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(wcard) === false) {
        alert('身份证输入不合法');
        return false
    }
}
//查询接口
function queryAjax(data){
    $.ajax({
        url: baseUrl + "/tijian/keywordSelect",
        type: "post",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        success:function(res){
            console.log(res)
            if(res.status == 100){
                alert("未找到该人员信息")
            }else{
                var res = res.data,
                    passData = [],//合格
                    unpassData = [],//未合格
                    userData = [];//未审核
                $.each(res,function(i,n){
                    if(n.status == 2){//不合格
                        n.status = "审核不通过"
                        unpassData.push(n)
                    }else if(n.status == 1){//合格
                        n.status = "审核通过"
                        passData.push(n)
                    }else{
                        n.status = "未审核"
                        userData.push(n)
                    }
                })
            }
            // console.log(unpassData)
            // console.log(passData)
            // console.log(userData)
            if(unpassData.length != 0){
                dataTableser(unpassData)
            }else{
                alert("未找到该记录")
                return
            }
            if(passData.length !=0){
                dataTables(passData)
            }else{
                alert("未找到该记录")
                return
            }
            if(userData.length != 0){
                // console.log(userData)
                return 
            }else{
                alert("未找到该记录")
                return
            }
        }
    })
}
//查询
function queryDiv(){
    var nameIndex = $('.nameId').val(),
        tjCard = $('.tjCard').val(),
        wcard = $('#exDate').val(),//身份证号码
        openDate = $('#openDate').val();
        var data = {
            "name": nameIndex,
            "idcardNum": wcard,
            "number": tjCard,
            "createTime":openDate
        };
    if(nameIndex == "" && tjCard == "" && wcard == "" && openDate == ""){
        alert("请输入信息，信息不能为空")
    }else{
        if(wcard != ""){
            regIDCard(wcard)
            queryAjax(data)
        }else{
            queryAjax(data)
        }
        
    }

}
// 未审核表格函数
function dataTable(userData) {
    layui.use('table', function () {
        var table = layui.table;
        //渲染
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
                        type: "checkbox"
                    },
                    {
                        field: 'number',
                        title: 'ID',
                        width: 100
                    },
                    {
                        field: 'name',
                        title: '姓名',
                        width: 100
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
                        toolbar: '#barDemo',
                        width: 180
                    }, {
                        field: 'status',
                        title: '体检结果',
                        width: 177
                    }

                ]
            ],
            page: true
        });

        //未审核表格监听行工具事件
        table.on('tool(table1)', function (obj) {
            var data = obj.data;
            var idCardNum;
            //console.log(obj)
            table.on('row(table1)', function (obj) {
                // console.log(obj.data) //得到当前行数据
                idCardNum = obj.data.idcardNum;
                // console.log(idCardNum);
            })
            if (obj.event === 'audit_pass') {
                var index = layer.open({
                    title: ['合格', 'font-size:18px; text-align: center;'],
                    area: ['450px', '240px'],
                    type: 1,
                    content: $('#box'), 
                    btn: ['确认', '取消'],
                    btn1() {
                        debugger
                        // 确定按钮的回调
                        var newdata = {
                            "idCardNum": idCardNum,
                            "status": "1",
                            "startdate" : hgDate,
                            "enddate" : enddate
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
                                // console.log(res);
                                // console.log(res.status);
                                // console.log(res.status.code)
                                if (res.status == '200') {
                                    idCardNum = null;
                                    startdate = null;
                                    enddate = null;
                                    layer.msg('审核成功', {
                                        icon: 1
                                    });
                                    obj.del();
                                } else if (res.status == 'fail') {
                                    layer.msg('审核失败', {
                                        icon: 2
                                    });
                                }
                            }
                        })
                        layer.close(index);
                    },
                    btn2() {
                        //取消按钮的回调
                    }

                });

            } else if (obj.event === 'audit_failed') {
                var index = layer.open({
                    title: ['不合格原因', 'font-size:18px; text-align: center;'],
                    area: ['450px', '240px'],
                    type: 1,
                    content: $('#box'), 
                    btn: ['确认', '取消'],
                    btn1() {
                        // 确定按钮的回调 写业务代码
                        layer.msg('审核成功', {
                            icon: 1
                        });
                        layer.close(index);
                    },
                    btn2() {
                        //取消按钮的回调
                    }

                });
            }
        });

        //监听排序
        table.on('sort(table1)', function (obj) {
            // console.log(this)

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
    })
}
// 体检合格表格
function dataTables(passData) {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table2',
            height: 500,
            title: '用户数据表',
            data: passData,
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
                        field: 'number',
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
            page: true
        });

        //监听排序
        table.on('sort(table2)', function (obj) {
            // console.log(this)
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

        //体检合格监听行工具事件
        table.on('tool(table2)', function (obj) {
            var data = obj.data;
            var idCardNum = data.idcardNum;
            if (obj.event === 'audit') {
                layer.confirm('确认修改为不合格？', {
                        title: ['合格', 'font-size:18px; text-align: center;'],
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
                                // console.log(res);
                                // console.log(res.status);
                                // console.log(res.status.code)
                                if (res.status == '200') {
                                    layer.msg('审核成功', {
                                        icon: 1
                                    });
                                    obj.del();
                                    location.reload();
                                } else if (res.status == 'fail') {
                                    layer.msg('审核失败', {
                                        icon: 2
                                    });
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
            // console.log(this)

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
// 体检不合格表格
function dataTableser(unpassData) {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table3',
            height: 500,
            title: '用户数据表',
            data: unpassData,
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
                        field: 'number',
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
            page: true
        });

        //不合格表格监听行工具事件
        table.on('tool(table3)', function (obj) {
            var data = obj.data;
            var idCardNum = obj.data.idcardNum;;
            if (obj.event === 'audit_modify') {
                layer.confirm('确认修改为合格？', {
                        title: ['合格', 'font-size:18px; text-align: center;'],
                        btn: ['确认', '取消'] //按钮
                    }, function () { //确认按钮函数
                        var newdata = {
                            "idCardNum": idCardNum,
                            "status": "1"
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
                                // console.log(res);
                                // console.log(res.status);
                                // console.log(res.status.code)
                                if (res.status == '200') {
                                    layer.msg('审核成功', {
                                        icon: 1
                                    });
                                    obj.del();
                                    location.reload();
                                } else if (res.status == 'fail') {
                                    layer.msg('审核失败', {
                                        icon: 2
                                    });
                                }
                            }
                        })
                    },
                    function () { //取消按钮函数
                    })
            }
        });

        //监听排序
        table.on('sort(table3)', function (obj) {
            // console.log(this)

            //return;
            layer.msg('服务端排序。order by ' + obj.field + ' ' + obj.type);
            //服务端排序
            table.reload('table3', {
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

// 查询
$(function () {
    $('.chaxun').on('click', function () {
        queryDiv();
    })

})

$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        queryDiv()
    }
});
