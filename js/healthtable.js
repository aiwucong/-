layui.use('table', function () {
            var table = layui.table;
            table.render({
                    elem: '#demo',
                    height: 600,
                    url: baseUrl + "/countData/healthCount?token=" + localStorage.getItem("token"), //数据接口
                    toolbar: '#toolbarDemo',
                    where:{areaNum:mainDatas.areaNum,
                        hospitalName:mainDatas.hospitalName
                    },
                    page: true, //开启分页
                    parseData: function (res) {
                        console.log(res)
                        if(res.status == 100){
                            layer.msg('账号登录过期,请重新登录', {offset:'200px'})
                            if (window != window.top) {
                                setTimeout(function () {
                                    window.top.location = "../index.html";
                                }, 500)
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
                        statusCode: '200', // 对应 code自定义的参数名称
                    },
                    cols: [
                        [{
                            field: 'title',
                            title: '从业人员健康证签领表',
                            width: 100,
                            colspan: 14
                        }],
                        [ //表头
                            {
                                width: 60,
                                type: "checkbox",
                                // fixed: 'left'
                            },
                            {
                                field: 'number',
                                title: '体检编号',
                                width: 80,
                                sort: true,
                                // fixed: 'left'
                            }, {
                                field: 'hearthcardNum',
                                title: '健康证号',
                                width: 80
                            }, {
                                field: 'name',
                                title: '姓名',
                                width: 80,
                                sort: true
                            }, {
                                field: 'sex',
                                title: '性别',
                                width: 80
                            }, {
                                field: 'age',
                                title: '年龄',
                                width: 80
                            }, {
                                field: 'yuliu3',
                                title: '工作单位',
                                width: 150
                            }, {
                                field: 'yuliu2',
                                title: '体检日期',
                                width: 80
                            }, {
                                field: 'idcardNum',
                                title: '身份证号码'
                            }, {
                                field: 'adress',
                                title: '通信地址',
                                width: 135,
                                sort: true
                            }, {
                                field: 'telphone',
                                title: '手机号码',
                                width: 135
                            },{
                                field: 'qianming',
                                title: '签名',
                                width: 135
                            }
                        ]
                    ],
                    done: function (res, curr, count) {
                        $(".layui-table-box").find("[data-field='title']").css({
                            "text-align": "center",
                            "font-size": "24px",
                            "font-weight": "blod"
                        });
                    }
                        })
                    })