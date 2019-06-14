var examinationItems = {
    layuiTable:function(){//渲染表格
        layui.use('table',function(){
            var table = layui.table;
            table.render({
                elem: '#demo',
                height: 312,
                url:"/json/demo3.json",
                // data: userData,
                page: true, //开启分页
                title:'渠道统计数据表',
                toolbar: '#toolbarDemo',
                cols: [
                    [ //表头
                        {
                            width: 60,
                            type: "checkbox",
                            fixed: 'left'
                        },
                        {
                            field: 'deptNum',
                            title: '体检编号',
                            width: 100,
                            sort: true
                        }, {
                            field: 'name',
                            title: '姓名',
                            width: 80
                        }, {
                            field: 'sex',
                            title: '性别',
                            width: 80,
                            sort: true
                        }, {
                            field: 'age',
                            title: '年龄',
                            width: 80
                        }, {
                            field: 'startdate',
                            title: '办证日期',
                            width: 120,
                            sort: true
                        }, {
                            field: 'person',
                            title: '办证人员',
                            width: 120,
                            sort: true
                        }, {
                            field: 'telphone',
                            title: '手机号码',
                            width: 100
                        }, {
                            field: 'idcardNum',
                            title: '身份证号',
                            width: 120
                        },
                        {
                            field: 'hearthcardNum',
                            title: '健康证号',
                            width: 120,
                            sort: true
                        }
                    ]
                ],
                done: function (res, curr, count) { // 隐藏列
                    $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
                }
            })

            //监听行的事件
            table.on('row(demo)',function(){
                var data = obj.data;
                console.log(data)
            })
        })
    },
    init:function(){
        var that = this;
        that.layuiTable()
    }
};
examinationItems.init();