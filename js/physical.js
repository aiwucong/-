layui.use(['element', 'laydate', 'layer', 'form', 'table'], function () {
    var element = layui.element;
    var laydate = layui.laydate;
    var form = layui.form;
    var table = layui.table;
    var selectVal;
    var hgDate;
    var enddate;
    form.on('select(category)', function (data) {
        // console.log(data.elem); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值
        selectVal = data.value;
    })
    //日期范围
    laydate.render({
        elem: '#aa',
        value: new Date(),
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
        },
    });
    laydate.render({
        elem: '#openDate',
        range: true
    });
    function sjDate() {
        var date = new Date();
        var year = date.getFullYear() + 1;
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var lastDate = year + "-" + month + "-" + day;
        document.getElementById("enddate").value = lastDate;
    }
    sjDate()
    //未审核表格监听行工具事件
    table.on('tool(table1)', function (obj) {
        var data = obj.data;
        var idCardNum;
        console.log(data)
        table.on('row(table1)', function (obj) {
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
                offset: '200px',
                btn1() {
                    // 确定按钮的回调
                    var newdata = {
                        "idCardNum": idCardNum,
                        "status": "1",
                        "startdate": hgDate,
                        "enddate": enddate
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
                            console.log(res);
                            // console.log(res.status);
                            // console.log(res.status.code)
                            if (res.status == '200') {
                                idCardNum = null;
                                startdate = null;
                                enddate = null;
                                layer.msg('审核成功', {
                                    icon: 1
                                }, {
                                    offset: '200px'
                                });
                                obj.del();
                                location.reload()
                            } else if (res.status == 'fail') {
                                layer.msg('审核失败', {
                                    icon: 2
                                }, {
                                    offset: '200px'
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
                content: $('#box1'),
                btn: ['确认', '取消'],
                offset: '200px',
                btn1() {
                    // 确定按钮的回调 写业务代码
                    layer.msg('审核成功', {
                        icon: 1
                    }, {
                        offset: '200px'
                    });
                    layer.close(index);
                },
                btn2() {
                    //取消按钮的回调
                }

            });
        }
    });
    table.on('toolbar(table1)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'batchPass':
                var data = checkStatus.data;
                var ids = [];

                $.each(data, function (i, n) {
                    ids.push(n.tjId)
                })
                console.log(ids)
                $('#healthIds').val(ids)
                var healIds = $('#healthIds').val()
                var index = layer.open({
                    title: ['合格', 'font-size:18px; text-align: center;'],
                    area: ['450px', '240px'],
                    type: 1,
                    content: $('#box'),
                    btn: ['确认', '取消'],
                    offset: '200px',
                    btn1: function (index) {
                        // 确定按钮的回调
                        console.log(healIds)
                        var newdata = {
                            "tjId": healIds,
                            "status": "1",
                            "startdate": hgDate,
                            "enddate": enddate
                        }
                        $.ajax({
                            url: baseUrl + "/tijian/batchUpTJdate?token=" + localStorage.getItem("token"),
                            type: "post",
                            data: newdata,
                            contentType: "application/x-www-form-urlencoded",
                            xhrFields: {
                                withCredentials: true
                            },
                            success: function (res) {
                                console.log(res)
                                if (res.status == 200) {
                                    wUntable()
                                }
                            }
                        })
                        layer.close(index);
                    },
                    btn2() {
                        //取消按钮的回调


                    }

                });
                break;
            case 'batchFail':
                var data = checkStatus.data;
                var failids = [];
                $.each(data, function (i, n) {
                    failids.push(n.tjId)
                })
                $('#healthIds').val(failids)
                var failhealIds = $('#healthIds').val()
                var indexs = layer.open({
                    title: ['不合格', 'font-size:18px; text-align: center;'],
                    area: ['450px', '240px'],
                    type: 1,
                    content: $('#box1'),
                    btn: ['确认', '取消'],
                    offset: '200px',
                    btn1: function (index) {
                        var rensons = $('.whyRenson').val()
                        // 确定按钮的回调
                        var newdata = {
                            "tjId": failhealIds,
                            "status": "2",
                            "why": rensons
                        }
                        $.ajax({
                            url: baseUrl + "/tijian/batchUpTJdate?token=" + localStorage.getItem("token"),
                            type: "post",
                            data: newdata,
                            contentType: "application/x-www-form-urlencoded",
                            xhrFields: {
                                withCredentials: true
                            },
                            success: function (res) {
                                if (res.status == 200) {
                                    wUntable()
                                }
                            }
                        })
                        layer.close(indexs);
                    },
                    btn2() {

                    }

                });

                break;
        };
    });
    form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });
    wUntable();

    function wUntable() {
        table.render({
            elem: '#table1',
            height: '550',
            title: '用户数据表',
            url: baseUrl + "/tijian/getTJlist?token=" + localStorage.getItem("token"),
            autoSort: false,
            method: 'get',
            where: {
                status: 0
            },
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                if (res.status == 250) {
                    if (window != window.top) {
                        layer.msg('请重新登录！', {
                            offset: '200px'
                        })
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 1000)
                    }
                } else if (res.status == 'success') {
                    $('#unaudited-audited').text(res.data.count); //待审核
                    if (res.data.pageData != null) {
                        $.each(res.data.pageData, function (i, n) {
                            n.status = "未审核"
                        })
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
                        type: "checkbox"
                    },
                    {
                        field: 'number',
                        title: 'ID'
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
                        toolbar: '#barDemo',
                        width: 200
                    }, {
                        field: 'status',
                        title: '体检结果'
                    }

                ]
            ],
            page: true,
            done: function (res) {
                console.log(res)
                if (res.code == 250) {
                    layer.msg('请先登录账号', {
                        offset: '200px'
                    });
                    if (window != window.top) {
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 2000)
                    }
                }
            }
        });
    }

    function wFailtable() {
        table.render({
            elem: '#table3',
            height: 550,
            title: '用户数据表',
            url: baseUrl + '/tijian/getTJlist?token=' + localStorage.getItem("token"),
            method: 'get',
            where: {
                status: 2
            },
            autoSort: false,
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                if (res.status == 250) {
                    if (window != window.top) {
                        layer.msg('请重新登录！', {
                            offset: '200px'
                        })
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 1000)
                    }
                } else if (res.status == 'success') {
                    $('#unalready-audited').text(res.data.count);
                    if (res.data.pageData != null) {
                        $.each(res.data.pageData, function (i, n) {
                            n.status = "审核不通过"
                        })
                    }
                }
                // 可进行数据操作
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
            done: function (res, curr, count) {
                console.log(res)
            }
        });
    }

    function wPasstable() {
        table.render({
            elem: '#table2',
            height: 550,
            title: '用户数据表',
            url: baseUrl + "/tijian/getTJlist?token=" + localStorage.getItem("token"),
            method: 'get',
            where: {
                status: 1
            },
            autoSort: false,
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                if (res.status == 250) {
                    if (window != window.top) {
                        layer.msg('请重新登录！', {
                            offset: '200px'
                        })
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 1000)
                    }
                } else if (res.status == 'success') {
                    $('#already-audited').text(res.data.count);
                    if (res.data.pageData != null) {
                        $.each(res.data.pageData, function (i, n) {
                            n.status = "审核通过"
                        })
                    }
                }
                // 可进行数据操作
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
    }


    //身份证正则表达式
    function regIDCard(wcard) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(wcard) === false) {
            alert('身份证输入不合法');
            return false
        }
    }
    //查询接口
    function queryAjax(data) {
        $.ajax({
            url: baseUrl + "/tijian/keywordSelect?token=" + localStorage.getItem("token"),
            type: "post",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                console.log(res)
                if (res.status == "100") {
                    $(".layui-table-main").html('<div class="layui-none">无数据</div>');
                } else if (res.status == "200") {
                    var datas = res.data,
                        passData = [], //合格
                        unpassData = [], //未合格
                        userData = []; //未审核
                    $.each(datas, function (i, n) {
                        if (n.status == 2) { //不合格
                            n.status = "审核不通过"
                            unpassData.push(n)
                        } else if (n.status == 1) { //合格
                            n.status = "审核通过"
                            passData.push(n)
                        } else {
                            n.status = "未审核"
                            userData.push(n)
                        }
                    })
                }
                // console.log(unpassData)
                // console.log(passData)
                // console.log(userData)
                if (unpassData != null) {
                    dataTableser(unpassData)
                }
                if (passData != null) {
                    dataTables(passData)
                }
                if (userData != null) {
                    dataTable(userData)
                }
            }
        })
    }
    //查询
    function queryDiv() {
        var nameIndex = $('.nameId').val(),
            tjCard = $('.tjCard').val(),
            wcard = $('#exDate').val(), //身份证号码
            openDate = $('#openDate').val();
        var data = {
            "name": nameIndex,
            "idcardNum": wcard,
            "number": tjCard,
            "createTime": openDate
        };
        if (nameIndex == "" && tjCard == "" && wcard == "" && openDate == "") {
            layer.msg("请输入查询条件，信息不能为空", {
                offset: '100px'
            });
            wUntable()
            wFailtable()
            wPasstable()

        } else {
            if (wcard != "") {
                regIDCard(wcard)
                queryAjax(data)
            } else {
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
                page: true,
                done: function (res) {}
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
                        offset: '200px',
                        btn1() {
                            debugger
                            // 确定按钮的回调
                            var newdata = {
                                "idCardNum": idCardNum,
                                "status": "1",
                                "startdate": hgDate,
                                "enddate": enddate
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
                                        }, {
                                            offset: '200px'
                                        });
                                        obj.del();
                                    } else if (res.status == 'fail') {
                                        layer.msg('审核失败', {
                                            icon: 2
                                        }, {
                                            offset: '200px'
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
                        content: $('#box1'),
                        btn: ['确认', '取消'],
                        offset: '200px',
                        btn1() {
                            // 确定按钮的回调 写业务代码
                            layer.msg('审核成功', {
                                icon: 1
                            }, {
                                offset: '200px'
                            });
                            layer.close(index);
                        },
                        btn2() {
                            //取消按钮的回调
                        }

                    });
                }
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
                page: true
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
                page: true
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

});