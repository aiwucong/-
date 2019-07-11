function jctable(){
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#baseInput',
            height: 500,
            url: baseUrl + "/tijian/getWeekData?token="+localStorage.getItem("token"),
            where:{
                status:0,
                yuliu1:0
            },
            parseData: function (res) {
                console.log(res)
                return {
                    "count": res.data.count,
                    "data": res.data.pageCount,
                    "status":  res.status//code值为200表示成功
                };
            },
            response: {
                statusName: 'status',
                statusCode: 'success', // 对应 code自定义的参数名称
            },
            method: 'post',
            page: true, //开启分页
            toolbar: '#toolbarDemo',
            cols: [
                [ //表头
                    {
                        width: 60,
                        type: "checkbox",
                        fixed: 'left'
                    },
                        {
                        field: 'name',
                        title: '姓名'
                    }, {
                        field: 'sex',
                        title: '性别',
                        sort: true
                    }, {
                        field: 'age',
                        title: '年龄'
                    }, {
                        field: 'startdate',
                        title: '办证日期',
                        sort: true
                    }, {
                        field: 'person',
                        title: '办证人员',
                        sort: true
                    }, {
                        field: 'telphone',
                        title: '手机号码'
                    }, {
                        field: 'idcardNum',
                        title: '身份证号'
                    },
                    {
                        field: 'hearthcardNum',
                        title: '健康证号',
                        sort: true
                    },
                    {
                        field: 'adress',
                        title: '通信地址',
                        sort: true
                    }, {
                        field: 'yuliu3',
                        title: '办证单位',
                        sort: true
                    }, {
                        field: 'idcardPhoto',
                        title: '照片',
                        sort: true
                    }
                ]
            ],
            done: function (res, curr, count) { // 隐藏列
                console.log(res)
                $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
                if (res.status == "100") {
                    $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
                }
            }
        })
    })
}
jctable()
