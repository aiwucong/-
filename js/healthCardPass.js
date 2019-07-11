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
            //得到当前页码
            // console.log(curr); 
            //得到数据总量
            // console.log(count);
        }
    });
    //监听行工具事件
    table.on('tool(table2)', function (obj) {
        let data = obj.data;
        console.log(data)
        $('#name').attr('value', data.name);
        $('#age').attr('value', data.age);
        $('#sex').attr('value', data.gender);
        $('#tj').attr('value', data.medical);
        $('#dataTime').attr('value', data.endTime);
        $('#erwerma').attr('src', "data:image/jpg;base64," + data.qrCode);
        $('#gz').attr('src', "data:image/jpg;base64," + data.yuliu2);
        $('#personImg').attr('src', "data:image/jpg;base64," + data.yuliu3);
        $('#card').attr('value', data.healthNum);
        $('#art').text(data.name);
        $('.bott').text(data.yuliu4)
    });
    // 批量打印
    table.on('toolbar(table2)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id),
            data = checkStatus.data; //获取选中的数据
        // console.log(data);
        var ids = [];
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i]);
        }
        var str = "";
        str += "<!--stratprint-->"
        $.each(ids, function (i, n) {
            // console.log(n)
            str += "<div class ='box'>";
            str += "<div class='box_center'>"
            str += " <h2 class='box_tit'>健康证明</h2>"
            str += "<div class='boxHome'>"
            str += "<div class='boxImg'><img src='data:image/jpg;base64," + n.yuliu3 + "' alt='' class='personImg'></div>"
            str += "<div class='boxInputs'>"
            str += "<div class='liners'>"
            str += "<div class='liners_item1'><span class='liners_tit'>姓名:</span><span class='liners_input name'>" + n.name + "</span></div>"
            str += "<div class='liners_item2'><span class='liners_tit'>年龄:</span><span class='liners_input old'>" + n.age + "</span></div>"
            str += "</div>"
            str += "<div class='liners'>"
            str += "<div class='liners_item1'><span class='liners_tit'>性别:</span><span class='liners_input sex'>" + n.gender + "</span></div>"
            str += "<div class='liners_item2'><span class='liners_tit'>体检:</span><span class='liners_input tj'>" + n.medical + "</span></div>"
            str += "</div>"
            str += " <div class='Ylines'><span class='liners_tit'>有效期至:</span><span class='liners_input dataTime'>" + n.endTime + "</span></div>"
            str += "<div class='Ylines'><span class='liners_tit'>证号:</span><span class='liners_input card'>" + n.healthNum + "</span></div>"
            str += "<img src='data:image/jpg;base64," + n.qrCode + "' alt='' class='erweima'>"
            str += "</div></div>"
            str += "<h4 class='companyTitle'>"+n.yuliu4+"</h4>"
            str += "<img src='data:image/jpg;base64," + n.yuliu2 + "' alt='' class='zhang'>"
            str += "</div></div>"
            str += "<div class='pageBreak'></div>";

        })
        str += "<!--endprint-->";
        $('#printBox').append(str)
        // console.log(ids)
        if (data.length != 0) {
            layer.msg('正在请求打印，请稍后',  {
                offset: '200px'
            });
            var timer = setInterval(function () {
                $('.box').show()
                healthPrints()
                clearInterval(timer)
                $('.box').hide()
            }, 3000)

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