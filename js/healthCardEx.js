layui.use(['element', 'laydate', 'layer', 'form'], function () {
    var element = layui.element;
    var laydate = layui.laydate;
    var form = layui.form;

    //日期范围
    laydate.render({
        elem: '#w_date',
        range: true
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
                $('.box').show()
                var dataId = data.healthId;
                xiangqing(dataId);
                var timer = setInterval(function(){
                    healthPrints()
                    clearInterval(timer)
                },3000)

            } else if (obj.event === 'audit_xiangqing') {
                var dataId = data.healthId;
                xiangqing(dataId);
            }
        });

        table.on('toolbar(table1)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id),
                data = checkStatus.data; //获取选中的数据
            console.log(data);
            var ids = [];
            for (var i = 0; i < data.length; i++) {
                ids.push(data[i]);
            }
            var str = "";
            str += "<!--stratprint-->"
            $.each(ids, function (i, n) {
                str += "<div class ='box'>";
                str += "<div class='box_center'>"
                str += " <h2 class='box_tit'>健康证明</h2>"
                str += "<div class='boxHome'>"
                str += "<div class='boxImg'><img src='data:image/jpg;base64,"+n.yuliu3+"' alt='' class='personImg'></div>"
                str += "<div class='boxInputs'>"
                str += "<div class='liners'>"
                str += "<div class='liners_item1'><span class='liners_tit'>姓名:</span><span class='liners_input name'>"+n.name+"</span></div>"
                str += "<div class='liners_item2'><span class='liners_tit'>年龄:</span><span class='liners_input old'>"+n.age+"</span></div>"
                str += "</div>"
                str += "<div class='liners'>"
                str += "<div class='liners_item1'><span class='liners_tit'>性别:</span><span class='liners_input sex'>"+n.gender+"</span></div>"
                str += "<div class='liners_item2'><span class='liners_tit'>体检:</span><span class='liners_input tj'>"+n.medical+"</span></div>"
                str += "</div>"
                str += " <div class='Ylines'><span class='liners_tit'>有效期至:</span><span class='liners_input dataTime'>"+n.endTime+"</span></div>"
                str += "<div class='Ylines'><span class='liners_tit'>证号:</span><span class='liners_input card'>"+n.healthNum+"</span></div>"
                str += "<img src='data:image/jpg;base64,"+n.qrCode+"' alt='' class='erweima'>"
                str += "</div></div>"
                str += "<h4 class='companyTitle'>武汉玛迪卡智能科技有限公司制发</h4>"
                str += "<img src='data:image/jpg;base64,"+n.yuliu2+"' alt='' class='zhang'>"
                str += "</div></div>"
                str += "<div class='pageBreak'></div>";

            })
            str += "<!--endprint-->";
            $('#printBox').append(str)
            console.log(ids)
            if (data.length != 0) {
                layer.msg('正在请求打印，请稍后',{icon:16});
                var timer = setInterval(function(){
                    healthPrints()
                    clearInterval(timer)
                },3000)
                
            } else {
                alert("请选择需要打印的数据")
            }

        })

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
            toolbar: '#toolbarDemo',
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
        // 批量打印
        table.on('toolbar(table2)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id),
                data = checkStatus.data; //获取选中的数据
            console.log(data);
            var ids = [];
            for (var i = 0; i < data.length; i++) {
                ids.push(data[i]);
            }
            var str = "";
            str += "<!--stratprint-->"
            $.each(ids, function (i, n) {
                str += "<div class ='box'>";
                str += "<div class='box_center'>"
                str += " <h2 class='box_tit'>健康证明</h2>"
                str += "<div class='boxHome'>"
                str += "<div class='boxImg'><img src='data:image/jpg;base64,"+n.yuliu3+"' alt='' class='personImg'></div>"
                str += "<div class='boxInputs'>"
                str += "<div class='liners'>"
                str += "<div class='liners_item1'><span class='liners_tit'>姓名:</span><span class='liners_input name'>"+n.name+"</span></div>"
                str += "<div class='liners_item2'><span class='liners_tit'>年龄:</span><span class='liners_input old'>"+n.age+"</span></div>"
                str += "</div>"
                str += "<div class='liners'>"
                str += "<div class='liners_item1'><span class='liners_tit'>性别:</span><span class='liners_input sex'>"+n.gender+"</span></div>"
                str += "<div class='liners_item2'><span class='liners_tit'>体检:</span><span class='liners_input tj'>"+n.medical+"</span></div>"
                str += "</div>"
                str += " <div class='Ylines'><span class='liners_tit'>有效期至:</span><span class='liners_input dataTime'>"+n.endTime+"</span></div>"
                str += "<div class='Ylines'><span class='liners_tit'>证号:</span><span class='liners_input card'>"+n.healthNum+"</span></div>"
                str += "<img src='data:image/jpg;base64,"+n.qrCode+"' alt='' class='erweima'>"
                str += "</div></div>"
                str += "<h4 class='companyTitle'>武汉玛迪卡智能科技有限公司制发</h4>"
                str += "<img src='data:image/jpg;base64,"+n.yuliu2+"' alt='' class='zhang'>"
                str += "</div></div>"
                str += "<div class='pageBreak'></div>";

            })
            str += "<!--endprint-->";
            $('#printBox').append(str)
            console.log(ids)
            if (data.length != 0) {
                layer.msg('正在请求打印，请稍后',{icon:16});
                var timer = setInterval(function(){
                    healthPrints()
                    clearInterval(timer)
                },3000)
                
            } else {
                alert("请选择需要打印的数据")
            }

        })

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
            if (userData != null) {
                $.each(userData, function (i, n) {
                    if (n.medical == 0) {
                        n.medical = "合格"
                    } else {
                        n.medical = "不合格"
                    }
                })
                dataTable(userData)
            }


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
            // console.log(res)
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
            $('#dataTime').attr('value', res.data.endTime);
            $('#erwerma').attr('src', "data:image/jpg;base64," + res.data.qrCode);
            $('#gz').attr('src', "data:image/jpg;base64," + res.data.gz);
            $('#personImg').attr('src', "data:image/jpg;base64," + res.data.idCardPhoto);
            $('#card').attr('value', res.data.healthNum);
            $('#art').text(res.data.name);
            $('.age').text(res.data.age);
            $('.sex').text(res.data.gender);
            $('.tj').text(medical);
            $('.dataTime').text(res.data.endTime);
            $('.erweima').attr('src', "data:image/jpg;base64," + res.data.qrCode);
            $('.zhang').attr('src', "data:image/jpg;base64," + res.data.gz);
            $('.personImg').attr('src', "data:image/jpg;base64," + res.data.idCardPhoto);
            $('.card').text(res.data.healthNum);
            $('.bott').text(res.data.hospitalName);
        }
    })

}
// 身份证正则
function isCardNo(wcard) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(wcard) === false) {
        alert('身份证输入不合法');
        return false
    }
}

//查询接口
function queryAjax(data) {
    $.ajax({
        url: baseUrl + "/healthcard/keywordSelect",
        type: "post",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var data = res.data;
            // console.log(data);
            var noPrint = [];
            var printyes = [];
            if (res.status == 100) {
                alert("未找到该人员信息")
                return
                // location.reload()
            } else {
                $.each(data, function (i, n) {
                    // console.log(n)
                    if (n.printStatus == 0) {
                        noPrint.push(n)
                        dataTable(userData)
                    } else {
                        printyes.push(n)

                    }
                })
            }

            var userData = noPrint;
            dataTable(userData)
            var passData = printyes;
            dataTables(passData)
        },
        error: function () {
            console.log('失败');
        }
    })
}

function queryDiv() {
    var wname = $('#w_name').val();
    var wcard = $('#w_card').val();
    var wdate = $('#w_date').val();
    var data = {
        "name": wname,
        "idCard": wcard,
        "yuliu1": wdate
    };
    if (wname == "" && wcard == "" && wdate == "") {
        alert('请输入')
        return
    } else {
        if (wcard != "") {
            isCardNo(wcard)
            queryAjax(data)
        } else {
            queryAjax(data)
        }
    }
}

// 查询
$(function () {
    $('.chaxun').on('click', function () {
        queryDiv();
    })

})
// 键盘监听
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        queryDiv()
    }
});