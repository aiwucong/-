layui.use('table', function () {
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo',
        height: 500,
        url: '../json/table/demo2.json', //数据接口
        toolbar: '#toolbarDemo',
        page: true //开启分页
            ,
        cols: [
            [ //表头
                {
                    width: 60,
                    type: "checkbox",
                    // fixed: 'left'
                },
                {
                    field: 'id',
                    title: '体检编号',
                    width: 80,
                    sort: true,
                    // fixed: 'left'
                }, {
                    field: 'username',
                    title: '健康证明号',
                    width: 80
                }, {
                    field: 'sex',
                    title: '姓名',
                    width: 80,
                    sort: true
                }, {
                    field: 'city',
                    title: '性别',
                    width: 80
                }, {
                    field: 'sign',
                    title: '年龄',
                    width: 177
                }, {
                    field: 'experience',
                    title: '单位',
                    width: 80,
                    sort: true
                }, {
                    field: 'score',
                    title: '体检日期',
                    width: 80,
                    sort: true
                }, {
                    field: 'classify',
                    title: '身份证号码',
                    width: 80
                }, {
                    field: 'wealth',
                    title: '住址',
                    width: 135,
                    sort: true
                },{
                    field: 'wealth',
                    title: '电话',
                    width: 135,
                    sort: true
                },{
                    field: 'wealth',
                    title: '评价',
                    width: 135,
                    sort: true
                },{
                    field: 'wealth',
                    title: '领证人签名',
                    width: 135,
                    sort: true
                },{
                    field: 'wealth',
                    title: '领证日期',
                    width: 135,
                    sort: true
                }
            ]
        ]
    });

});