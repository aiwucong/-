layui.use('table', function () {
    var table = layui.table;
    table.render({
        elem: '#table1',
        height: '600',
        title: '用户数据表',
        url: baseUrl + "/healthcard/dayin?token=" + localStorage.getItem("token"),
        where: {
            printStatus: 0,
            hospitalNum:mainDatas.hospitalNum
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
                    field: 'yuliu1',
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
            $('.name').val(data.name);
            $('#age').val(data.age + "岁");
            $('#sex').val(data.gender);
            $('#tj').val(data.medical);
            $('#dataTime').val(data.endTime);
            $('#erwerma').attr('src', "data:image/jpg;base64," + data.qrCode);
            $('#gz').attr('src', "data:image/jpg;base64," + data.yuliu2);
            $('#personImg').attr('src', "data:image/jpg;base64," + data.yuliu3);
            $('#card').val(data.healthNum);
            $('#art').val(data.name);
            $('.bott').val(data.yuliu4)
         if (obj.event === 'audit_pass') {
            var dataId = obj.data.healthId;
            xiangqing(dataId);
            p_print(dataId);
            layer.msg('正在请求打印,请等待!!!',{offset:'200px'})
            var timer = setInterval(function () {
                $('.box').show()
                healthPrints()
                clearInterval(timer)
                $('.box').hide()
            }, 3000)
        }
    });
    // 批量打印
    table.on('toolbar(table1)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id),
            data = checkStatus.data; //获取选中的数据
        var ids = [];
        var healthIds = [];
        $.each(data, function (i, n) {
            healthIds.push(n.healthId)
        })
        $('#healthIds').val(healthIds)
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i]);
        }
        var str = "";
        str += "<!--stratprint1-->"
        $.each(ids, function (i, n) {
            str += "<div class ='box'>";
            str += "<div class='box_center'>"
            str += " <h2 class='box_tit'>健康证明</h2>"
            str += "<div class='boxHome'>"
            str += "<div class='boxImg'><img src='data:image/jpg;base64," + n.yuliu3 + "' alt='' class='personImg'></div>"
            str += "<div class='boxInputs'>"
            str += "<div class='liners'>"
            str += "<div class='liners_item1'><span class='liners_tit'>姓名:</span><span class='liners_input name'>" + n.name + "</span></div>"
            str += "<div class='liners_item2'><span class='liners_tit'>年龄:</span><span class='liners_input old'>" + n.age +"岁"+ "</span></div>"
            str += "</div>"
            str += "<div class='liners'>"
            str += "<div class='liners_item1'><span class='liners_tit'>性别:</span><span class='liners_input sex'>" + n.gender + "</span></div>"
            str += "<div class='liners_item2'><span class='liners_tit'>体检:</span><span class='liners_input tj'>" + n.medical + "</span></div>"
            str += "</div>"
            str += " <div class='Ylines'><span class='liners_tit'>有效期至:</span><span class='liners_input dataTime'>" + n.endTime + "</span></div>"
            str += "<div class='Ylines'><span class='liners_tit'>证号:</span><span class='liners_input card'>" + n.healthNum + "</span></div>"
            str += "<img src='data:image/jpg;base64," + n.qrCode + "' alt='' class='erweima'>"
            str += "</div></div>"
            str += "<h4 class='companyTitle'>" + n.yuliu4 + "</h4>"
            str += "<img src='data:image/jpg;base64," + n.yuliu2 + "' alt='' class='zhang'>"
            str += "</div></div>"
            str += "<div class='pageBreak'></div>";
        })
        str += "<!--endprint1-->";
        $('#printBox').append(str)
        p_prints()
        if (data.length != 0) {
            layer.msg('正在请求打印，请稍后',{offset: '200px'});
            var timer = setInterval(function(){
                $('.box').show()
                unhealthPrints()
                clearInterval(timer)
                $('.box').hide()
            },3000)

        }else {
            alert("请选择需要打印的数据")
        }

    })

});