layui.use('table', function () {
    var table = layui.table;
    table.render({
        elem: '#demo',
        height: 500,
        url: '../json/table/demo2.json', //数据接口
        toolbar: '#toolbarDemo',
        page: true //开启分页
            ,
        cols: [
            [
                {
                    field: 'title',
                    title: '从业人员健康证签领表',
                    width: 100,
                    sort: true,
                    colspan:14,
                }, 
            ],
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
        ],
        done: function(res, curr, count){
            console.log(res);
            
            //得到当前页码
            console.log(curr); 
            
            //得到数据总量
            console.log(count);
            $(".layui-table-box").find("[data-field='title']").css({"text-align":"center","font-size":"24px","font-weight":"blod"});
          }
    });

});
