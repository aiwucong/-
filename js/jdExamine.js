window.onload = function () {
    $.ajax({
        url: baseUrl + "/deptorder/deptCount?token=" + localStorage.getItem("token"),
        type: "post",
        xhrFields: {
            withCredentials: true
        },
        data: {
            "hospitalNum": mainDatas.hospitalNum
        },
        success: function (res) {
            // console.log(res)
            if (res.status == 250) {
                layer.msg(res.data, {
                    offset: '100px'
                })
                if (window != window.top) {
                    setTimeout(function () {
                        window.top.location = "../index.html";
                    }, 500)
                }
            } else {
                $('#unaudited-audited').text(res.data.daish);
                $('#already-audited').text(res.data.yish);
            }
        },
        error: function () {
            // console.log("服务器异常");
        }
    });
}
var unpassyy;
var yuyueTime;
layui.use(['element', 'laydate', 'layer', 'form', 'table'], function () {
    var element = layui.element;
    var laydate = layui.laydate;
    var form = layui.form;
    var table = layui.table;

    form.on('select(required)', function (data) {
        // console.log(data.value); //得到被选中的值
        unpassyy = data.value;
    });
    var data = new Date(),
        year = data.getFullYear(),
        mouth = data.getMonth() + 1,
        day = data.getDate();
        day = day<10?"0"+day:day;
        mouth = mouth<10?"0"+mouth:mouth;
        yuyueTime =year+"-"+mouth+"-"+day
    //日期范围
    laydate.render({
        elem: '#aa',
        value: 'new Date()',
        done: function(value, date, endDate){
           yuyueTime = value
        }
    });

    element.on('tab(docDemoTabBrief)', function (data) {
        console.log(data)
        // 预约已审核表格数据
        if (data.index == 1) {
            yishenTable()
        } else{
            noPassTable()
        }
    })
    daishTable()

    function daishTable() {
        //渲染
        table.render({
            elem: '#table1',
            height: 500,
            title: '用户数据表',
            url: baseUrl + "/deptorder/deptList?token=" + localStorage.getItem("token"),
            where: {
                deptShenhe: "0",
                hospitalNum: mainDatas.hospitalNum
            },
            method: 'post',
            autoSort: false,
            page: true,
            toolbar: '#toolbarDemo',
            page: true,
            parseData: function (res) {
                console.log(res)
                if (res.data.pageData != null) {
                    $.each(res.data.pageData, function (i, n) {
                        n.deptShenhe = "未审核"
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
                        // fixed: 'left'
                    },
                    // {
                    //     field: 'deptId',
                    //     title: 'ID',
                    //     width: 100,
                    //     // sort: true,
                    //     // fixed: 'left'
                    // },
                    {
                        field: 'createTime',
                        title: '登记时间'
                    },
                    {
                        field: 'deptName',
                        title: '单位名称'
                    }, 
                    {
                        field: 'deptCode',
                        title: '单位统一信用代码'
                    }, {
                        field: 'deptTime',
                        title: '预约体检时间'
                    },
                    {
                        field: 'deptPhone',
                        title: '手机号码'
                    }, {
                        field: 'city',
                        title: '预约资质审核',
                        toolbar: '#barDemo',
                        width:280
                    }, {
                        field: 'deptShenhe',
                        title: '审核状态'
                    }
                ]
            ],

            done: function (res, curr, count) { // 隐藏列
                if (res.status == "100") {
                    $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
                }
            }
        });
    }

    function yishenTable() {
        table.render({
            elem: '#table2',
            height: 500,
            title: '用户数据表',
            url: baseUrl + "/deptorder/deptList?token=" + localStorage.getItem("token"),
            where: {
                deptShenhe: "1",
                hospitalNum: mainDatas.hospitalNum
            },
            method: 'post',
            autoSort: false,
            page: true,
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                if (res.data.pageData != null) {
                    $.each(res.data.pageData, function (i, n) {
                        n.deptShenhe = "预约成功"
                    })
                } else if (res.status == 250) {
                    layer.msg(res.data, {
                        offset: '100px'
                    })
                    if (window != window.top) {
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 500)
                    }
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
                        // fixed: 'left'
                    },
                    // {
                    //     field: 'deptId',
                    //     title: 'ID',
                    //     width: 100,
                    //     // sort: true,
                    //     // fixed: 'left'
                    // },
                    {
                        field: 'createTime',
                        title: '登记时间'
                    },
                    {
                        field: 'deptName',
                        title: '单位名称'
                    }, {
                        field: 'deptCode',
                        title: '单位统一信用代码'
                    }, 
                    {
                        field: 'deptTime',
                        title: '预约体检时间'
                    },
                    {
                        field: 'deptPhone',
                        title: '手机号码'
                    }, {
                        field: 'deptYuanyin',
                        title: '预约资质审核',
                        toolbar: '#timesDemos',
                        width:280
                    }, {
                        field: 'deptShenhe',
                        title: '审核状态'
                    }
                ]
            ],
            done: function (res) {}
        });
    }

    function noPassTable() {
        table.render({
            elem: '#table3',
            height: 500,
            title: '用户数据表',
            url: baseUrl + "/deptorder/deptList?token=" + localStorage.getItem("token"),
            where: {
                deptShenhe: "2",
                hospitalNum: mainDatas.hospitalNum
            },
            method: 'post',
            autoSort: false,
            page: true,
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                if (res.data.pageData != null) {
                    $.each(res.data.pageData, function (i, n) {
                        n.deptShenhe = "预约不成功"
                    })
                } else if (res.status == 250) {
                    layer.msg(res.data, {
                        offset: '100px'
                    })
                    if (window != window.top) {
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 500)
                    }
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
                        // fixed: 'left'
                    },
                    // {
                    //     field: 'deptId',
                    //     title: 'ID',
                    //     width: 100,
                    //     // sort: true,
                    //     // fixed: 'left'
                    // },
                    {
                        field: 'createTime',
                        title: '登记时间'
                    },
                    {
                        field: 'deptName',
                        title: '单位名称'
                    }, {
                        field: 'deptCode',
                        title: '单位统一信用代码'
                    },  {
                        field: 'deptTime',
                        title: '预约体检时间'
                    },
                    {
                        field: 'deptPhone',
                        title: '手机号码'
                    }, {
                        field: 'deptYuanyin',
                        title: '预约资质审核',
                        toolbar: '#toolbarDemos'
                    }, {
                        field: 'deptShenhe',
                        title: '审核状态'
                    }
                ]
            ],
            done: function (res) {}
        });
    }
    
    table.on('tool(table_tj)', function (obj) {
        var deptId = obj.data.deptId;
        var deptPhone = obj.data.deptPhone;
        if (obj.event === 'audit_pass') {
            var index = layer.open({
                title: ['审核结果', 'font-size:18px; text-align: center;'],
                area: ['450px', '200px'],
                type: 1,
                content: $('#box'),
                btn: ['确认', '取消'],
                offset: '100px',
                btn1() {
                    console.log(yuyueTime)
                    $.ajax({
                        url: baseUrl + "/deptorder/deptSH?token=" + localStorage.getItem('token'),
                        type: 'post',
                        data: {
                            "deptId": deptId,
                            "deptShenhe": 1,
                            "time": yuyueTime,
                            "deptPhone": deptPhone,
                            "why": ''
                        },
                        xhrFields: {
                            widthCredentials: true
                        },
                        success: function (res) {
                            console.log(res)
                            if (res.status == '200') {
                                layer.msg('审核成功', {
                                    offset: '200px'
                                });
                                layer.close(index)
                                setTimeout(function(){
                                    location.reload()
                                },1000)
                            } else if (res.status == '100') {
                                layer.msg('审核失败', {
                                    offset: '200px'
                                });
                                layer.close(index)
                                setTimeout(function(){
                                    location.reload()
                                },1000)
                            } else {
                                layer.msg(res.data.errMsg, {
                                    offset: '200px'
                                });
                                layer.close(index)
                            }
                        },
                        error: function () {
                            console.log("服务器异常");
                        }
                    });
                },
                btn2() {
                    //取消按钮的回调
                }

            });

        } else if (obj.event === 'audit_failed') {
            var indes = layer.open({
                title: ['审核结果', 'font-size:18px; text-align: center;'],
                area: ['450px', '400px'],
                type: 1,
                content: $('#box1'),
                offset: '100px',
                btn: ['确认', '取消'],
                offset: '100px',
                btn1() {
                    var untextarea = $('#untextarea').val()
                    // 确定按钮的回调 写业务代码
                    $.ajax({
                        url: baseUrl + "/deptorder/deptSH?token=" + localStorage.getItem('token'),
                        type: 'post',
                        data: {
                            "deptId": deptId,
                            "deptShenhe": 2,
                            "time": '',
                            "deptPhone": deptPhone,
                            "why": unpassyy + untextarea
                        },
                        xhrFields: {
                            widthCredentials: true
                        },
                        dataType: 'json',
                        success: function (res) {
                            console.log(res)
                            if (res.status == '200') {
                                layer.msg('审核成功', {
                                    offset: '200px'
                                }); 
                                setTimeout(function(){
                                    location.reload()
                                },1000)
                                layer.close(indes)
                            } else if (res.status == '100') {
                                layer.msg('审核失败', {
                                    offset: '200px'
                                });
                                layer.close(indes)
                                setTimeout(function(){
                                    location.reload()
                                },1000)
                            } else {
                                layer.msg(res.data.errMsg, {
                                    offset: '200px'
                                });
                                layer.close(indes)
                            }
                        },
                        error: function () {
                            console.log("服务器异常");
                        }
                    });
                },
                btn2() {
                    //取消按钮的回调
                }
            });
        } else if (obj.event === 'looks') {
            $.ajax({
                url: baseUrl + '/deptorder/deptInfoLook?token=' + localStorage.getItem('token'),
                type: 'get',
                data: {
                    'deptId': deptId
                },
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded",
                xhrFields: {
                    widthCredentials: true
                },
                success: function (res) {
                    console.log(res)
                    layer.open({
                        title: ['审核结果', 'font-size:18px; text-align: center;'],
                        area: ['1200px', '700px'],
                        type: 1,
                        content: $('#looks'),
                        offset: '50px'
                    });
                    $('.a_certificate').attr('src', "data:image/jpg;base64," + res.data[0])
                    $('.b_certificate').attr('src', "data:image/jpg;base64," + res.data[1])
                    $('.c_certificate').attr('src', "data:image/jpg;base64," + res.data[2])
                    $('.a_printBtn').click(function () {
                        setTimeout(function () {
                            $('#looks').show
                            Printimgs();
                        }, 500);
                    })
                    $('.b_printBtn').click(function () {
                        setTimeout(function () {
                            $('#looks').show
                            b_Printimg();
                        }, 500);

                    })
                    $('.c_printBtn').click(function () {
                        setTimeout(function () {
                            $('#looks').show
                            c_Printimgs();
                        }, 500);

                    })
                    $('.lookBox').viewer({
                        zIndex: 19891017
                    });
                },
                error: function (res) {
                    console.log('失败')
                }
            });
        } else if(obj.event === 'yiexamine'){
            var noExamineHome = layer.open({
                title: ['审核结果', 'font-size:18px; text-align: center;'],
                area: ['auto', 'auto'],
                offset: '100px',
                type: 1,
                content: $('.logOut'),
                btn: ['确认', '取消'],
                btn1() {
                    // 确定按钮的回调 写业务代码
                    $.ajax({
                        url: baseUrl + "/deptorder/tjStatusUpdate?token=" + localStorage.getItem('token'),
                        type: 'post',
                        data: {
                            "deptId": deptId,
                            "tjStatus": 1,
                        },
                        xhrFields: {
                            widthCredentials: true
                        },
                        dataType: 'json',
                        success: function (res) {
                            console.log(res)
                            if (res.status == '200') {
                                layer.msg('审核成功', {
                                    offset: '200px'
                                });
                                layer.close(noExamineHome)
                                noExamineTable()
                            } else if (res.status == '100') {
                                layer.msg('审核失败', {
                                    offset: '200px'
                                });
                                layer.close(noExamineHome)
                                noExamineTable()
                            } else if(res.status == '300'){
                                layer.msg('体检时间未到。不能确认', {
                                    offset: '200px'
                                });
                                layer.close(noExamineHome)
                                noExamineTable()
                            }
                            else {
                                layer.msg(res.data.errMsg, {
                                    offset: '200px'
                                });
                                layer.close(noExamineHome)
                                noExamineTable()
                            }
                        },
                        error: function () {
                            console.log("服务器异常");
                        }
                    });
                },
                btn2() {
                    //取消按钮的回调
                }

            });
        }else if(obj.event === 'alterTime'){
            var index = layer.open({
                title: ['修改体检时间', 'font-size:18px; text-align: center;'],
                area: ['450px', '200px'],
                type: 1,
                content: $('#box'),
                btn: ['确认', '取消'],
                offset: '100px',
                btn1() {
                    console.log(yuyueTime)
                    $.ajax({
                        url: baseUrl + "/deptorder/updateTJtime?token=" + localStorage.getItem('token'),
                        type: 'post',
                        data: {
                            "deptId": deptId,
                            "time": yuyueTime,
                            "deptPhone": deptPhone,
                        },
                        xhrFields: {
                            widthCredentials: true
                        },
                        success: function (res) {
                            console.log(res)
                            if (res.status == '200') {
                                layer.msg('修改成功', {
                                    offset: '200px'
                                });
                                layer.close(index)
                                yishenTable()
                            } else if (res.status == '100') {
                                layer.msg('修改失败', {
                                    offset: '200px'
                                });
                                layer.close(index)
                                yishenTable()
                            } else {
                                layer.msg(res.data.errMsg, {
                                    offset: '200px'
                                });
                                layer.close(index)
                                yishenTable()
                            }
                        },
                        error: function () {
                            console.log("服务器异常");
                        }
                    });
                },
                btn2() {
                    //取消按钮的回调
                }

            });
        }else {
            layer.msg('该功能暂未开放',{offset:'200px'})
        }
    });

    function Printimgs() {
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

    function b_Printimg() {
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

    function c_Printimgs() {
        bdhtml = window.document.body.innerHTML; //获取当前页的html代码
        sprnstr = "<!--stratprint2-->"; //设置打印开始区域 
        eprnstr = "<!--endprint2-->"; //设置打印结束区域 
        prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html 
        prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
        window.document.body.innerHTML = prnhtml;
        window.print();
        window.document.body.innerHTML = bdhtml;
        location.reload();
    }
});