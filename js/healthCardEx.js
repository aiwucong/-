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
            height: 700,
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
function unhealthPrints() {
    bdhtml = window.document.body.innerHTML; //获取当前页的html代码
    sprnstr = "<!--stratprint1-->"; //设置打印开始区域 
    eprnstr = "<!--endprint1-->"; //设置打印结束区域 
    prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html 
    prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
    window.document.body.innerHTML = prnhtml;
    window.print();
    window.document.body.innerHTML = bdhtml;
    location.reload();
}

// // 已打印表格
function dataTables(passDate) {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table2',
            height: 'auto',
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
    })
}
function unprintTable(){
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table1',
            height: 'auto',
            title: '用户数据表',
            url: baseUrl + "/healthcard/dayin?token=" + localStorage.getItem("token"),
            where: {
                printStatus: 0
            },
            method: 'post',
            autoSort: false,
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                if (res.status == 250) {
                    layer.msg(res.data)
                    if (window != window.top) {
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 500)
                    }
                } else if (res.data.pageData != null) {
                    $.each(res.data.pageData, function (i, n) {
                        if (n.medical == 0) {
                            n.medical = "合格"
                        } else {
                            n.medical = "不合格"
                        }
                    })
                }
                return {
                    "count": res.data.count,
                    "data": res.data.pageData,
                    "code": res.status //code值为200表示成功
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
    });
}
function passprintTable(){
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table2',
            height: 'auto',
            title: '用户数据表',
            url: baseUrl + "/healthcard/dayin?token="+localStorage.getItem("token"),
            where: {
                printStatus: 1
            },
            toolbar: '#toolbarDemo',
            method: 'post',
            limit: 10,
            page: true,
            parseData: function (res) {
                console.log(res)
                if(res.status == 250){
                    layer.msg(res.data)
                    if (window != window.top) {
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 500)
                    }
                }
                if (res.data.pageData != null) {
                    $.each(res.data.pageData, function (i, n) {
                        if (n.medical == 0) {
                            n.medical = "合格"
                        } else {
                            n.medical = "不合格"
                        }
                    })
                }
                return {
                    "count": res.data.count,
                    "data": res.data.pageData,
                    "code": res.status //code值为200表示成功
                };
            },
            response: {
                // statusName: 'status',
                statusCode: 'success', 
                dataName:'data'// 对应 code自定义的参数名称
            },
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
            ],
            done: function (res, curr, count) {
                console.log(res)
            }
        });
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
            // console.log(res);
            var medical = res.data.medical
            if (medical == 0) {
                medical = "合格"
            } else {
                medical = "不合格"
            }

            $('.name').text(res.data.name);
            $('.age').text(res.data.age);
            $('.sex').text(res.data.gender);
            $('.tj').text(medical);
            $('.dataTime').text(res.data.endTime);
            $('.erweima').attr('src', "data:image/jpg;base64," + res.data.qrCode);
            $('.zhang').attr('src', "data:image/jpg;base64," + res.data.gz);
            $('.personImg').attr('src', "data:image/jpg;base64," + res.data.idCardPhoto);
            $('.card').text(res.data.healthNum);
            $('.art').text(res.data.name);
            $('.companyTitle').text(res.data.hospitalName);
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
        url: baseUrl + "/healthcard/keywordSelect?token="+localStorage.getItem("token"),
        type: "post",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var data = res.data;
            console.log(res);
            var noPrint = [];
            var printyes = [];
            if (res.status == 100) {
                $(".layui-table-main").html('<div class="layui-none">无数据</div>');
                return
                // location.reload()
            } else {
                // console.log(data)
                $.each(data, function (i, n) {
                    // console.log(n)
                    if(n.medical == 1){
                        n.medical = "不合格"
                    }else{
                        n.medical = "合格"
                    }
                    if (n.printStatus == 1) {
                        noPrint.push(n)
                    } else {
                        printyes.push(n)

                    }
                })
                
                if(noPrint.length != 0){
                    var passDate = noPrint
                    // console.log(passDate);
                    dataTables(passDate)
                }
                 else if(printyes.length !=0){
                    var userData = printyes;
                    dataTable(userData)
                }
                
            }
        },
        error: function () {
            // console.log('失败');
        
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
        layer.msg('请输入查询条件，信息不能为空',{offset:'200px'})
        unprintTable()
        passprintTable()
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

function p_print(dataId){
    $.ajax({
        url: baseUrl + "/healthcard/xuanzheDY",
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
        }
    })
}

function p_prints(){
    $.ajax({
        url: baseUrl + "/healthcard/piLiangDY",
        type: 'post',
        contentType: "application/x-www-form-urlencoded",
        xhrFields: {
            widthCredentials: true
        },
        data: {
            "healthId": $('#healthIds').val()
        },
        success: function (res) {
            console.log(res);
        }
    })
}