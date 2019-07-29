layui.use('table', function () {
    var table = layui.table;
    table.render({
        elem: '#table3',
        height: 'auto',
        title: '用户数据表',
        url: baseUrl + "/healthcard/healthCardNoPass?token="+localStorage.getItem("token"),
        where:{
            hospitalNum:mainDatas.hospitalNum
        },
        toolbar: '#toolbarDemo',
        method: 'post',
        limit: 10,
        page: true,
        parseData: function (res) {
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
        done: function (res, curr, count) {
        }
    });
    //监听行工具事件
    table.on('tool(table3)', function (obj) {
        let data = obj.data;
        $('#name').val(data.name);
        $('#age').val(data.age + "岁");
        $('#sex').val(data.gender);
        $('#tj').val(data.medical);
        $('#dataTime').val(data.endTime);
        $('#erwerma').attr('src', "data:image/jpg;base64," + data.qrCode);
        $('#gz').attr('src', "data:image/jpg;base64," + data.yuliu2);
        $('#personImg').attr('src', "data:image/jpg;base64," + data.yuliu3);
        $('#card').val( data.healthNum);
        $('.bott').text(data.yuliu4)
    });
})