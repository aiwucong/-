layui.use(['element', 'laydate', 'layer', 'form', 'table'], function () {
    var element = layui.element;
    var laydate = layui.laydate;
    var form = layui.form;
    var table = layui.table;
    var selectVal;
    form.on('select(category)', function (data) {
        selectVal = data.value;
    })
    var sh_hgDate 
    var sh_enddate
    var data = new Date(),
    year = data.getFullYear(),
    year1 = data.getFullYear() +1,
    month = data.getMonth() + 1,
    day = data.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    sh_hgDate =year+"-"+month +"-"+day
    sh_enddate = year1+"-"+month +"-"+day
    //日期范围
    laydate.render({
        elem: '#aa',
        value: new Date(),
        done: function (value, date) {
            sh_hgDate = value;
            var FullYear = date.year + 1;
            var month = date.month;
            month = month < 10 ? '0' + month : month;
            var day = date.date;
            day = day < 10 ? '0' + day : day;
            var lastDate = FullYear + "-" + month + "-" + day;
            document.getElementById("enddate").value = lastDate;
            sh_enddate = lastDate
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
        $('#enddate').val(lastDate)
    }
    sjDate()
   
    //未审核表格监听行工具事件
    table.on('tool(table1)', function (obj) {
        var data = obj.data;
        var idCard = data.tjId;
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
                        "tjId": idCard,
                        "status": "1",
                        "startdate": sh_hgDate,
                        "enddate": sh_enddate,
                    }
                    var token = localStorage.getItem('token');
                    $.ajax({
                        url: baseUrl + "/tijian/oneTJSH?token=" + token,
                        type: 'post',
                        contentType: "application/x-www-form-urlencoded",
                        xhrFields: {
                            widthCredentials: true
                        },
                        data: newdata,
                        success: function (res) {
                            console.log(res)
                            if (res.status == '200') {
                                layer.msg('审核成功', {
                                    offset: '200px'
                                });
                                wUntable()
                            } else if (res.status == '100') {
                                layer.msg('审核失败', {
                                    offset: '200px'
                                });
                            } else if(res.status == '250'){
                                layer.msg('登录过期，请重新登录', {
                                    offset: '200px'
                                });
                                setTimeout(function(){
                                    if (window != window.top) {
                                        window.top.location = "../login-dept.html"
                                    }
                                    },500)
                            }else{
                                if(res.data.errCode == 60001){
                                    layer.msg('登录过期，请重新登录', {
                                        offset: '200px'
                                    });
                                    setTimeout(function(){
                                        if (window != window.top) {
                                            window.top.location = "../login-dept.html"
                                        }
                                        },500)
                                }else if(res.data.errCode == 50002){
                                    layer.msg('没有操作权限。', {
                                        offset: '200px'
                                    });
                                }else{
                                    layer.msg('服务器异常。', {
                                        offset: '200px'
                                    });
                                }
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
                    let whyrenson = $('.whyRenson').val()
                    // 确定按钮的回调 写业务代码
                    var newdata = {
                        "tjId": idCard,
                        "status": "2",
                        "why":whyrenson
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
                            if (res.status == '200') {
                                idCardNum = null;
                                startdate = null;
                                enddate = null;
                                layer.msg('审核成功',{
                                    offset: '200px'
                                });
                                wUntable()
                            } else if (res.status == 'fail') {
                                layer.msg('审核失败',{
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
        }
    });
    table.on('toolbar(table1)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        var newsDatas = data.map(value => {
            return {
              name: value.name,
              tel: value.telphone
            }
          })
        switch (obj.event) {
            case 'batchPass':
                if(data.length == 0){
                    layer.msg('请选择要审核的数据',{offset:'200px'})
                }else{
                    var ids = [];
                $.each(data, function (i, n) {
                    ids.push(n.tjId)
                })
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
                        var newdata = {
                            "tjId": healIds,
                            "status": "1",
                            "startdate": sh_hgDate,
                            "enddate": sh_enddate,
                            "telphoneAndName":JSON.stringify(newsDatas)
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
                                    layer.msg('审核成功',{offset:'200px'})
                                    wUntable()
                                }else if(res.status == 'fail'){
                                    layer.msg(res.data.errMsg,{offset:'200px'})
                                }
                            }
                        })
                        layer.close(index);
                    },
                    btn2() {
                        //取消按钮的回调
                    }
                });
                }            
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
                            "why": rensons,
                            "telphoneAndName":JSON.stringify(newsDatas)
                        }
                        console.log(newdata)
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
                                    layer.msg('审核成功',{offset:'200px'})
                                    wUntable()
                                }else if(res.status == 100){
                                    layer.msg('审核失败',{offset:'200px'})
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
            url: baseUrl + "/tijian/getStatusList?token=" + localStorage.getItem('token'),
            autoSort: false,
            method: 'get',
            where: {
                status: 0,
                hospitalNum:mainDatas.hospitalNum
            },
            toolbar: '#toolbarDemo',
            parseData: function (res) {
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
                            n.status = "合格"
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
            data: data,
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                if (res.status == "100") {
                    $(".layui-table-main").html('<div class="layui-none">无数据</div>');
                } else if (res.status == "200") {
                    var datas = res.data,
                        passData = [], //合格
                        unpassData = [], //未合格
                        userData = []; //未审核
                    $.each(datas, function (i, n) {
                        if (n.status == 2) { //不合格
                            n.status = "不合格"
                            unpassData.push(n)
                            dataTableser(unpassData)
                            dataTables(passData)
                            dataTable(userData)
                        } else if (n.status == 1) { //合格
                            n.status = "合格"
                            passData.push(n)
                            dataTables(passData)
                            dataTableser(unpassData)
                            dataTable(userData)
                        } else {
                            n.status = "未审核"
                            userData.push(n)
                            dataTable(userData)
                            dataTables(passData)
                            dataTableser(unpassData)
                        }
                    })
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
            "dates": openDate
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
                            title: '体检编号',
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
                page:true,
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