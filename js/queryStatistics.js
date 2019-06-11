
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
                    type: "checkbox"
                    // fixed: 'left'
                },
                {
                    field: 'wealth',
                    title: '体检日期',
                    width: 120
                },
                {
                    field: 'id',
                    title: '体检编号',
                    width: 120
                }, {
                    field: 'username',
                    title: '健康证号',
                    width: 120,
                }, {
                    field: 'sex',
                    title: '姓名',
                    width: 80,
                }, {
                    field: 'city',
                    title: '性别',
                    width: 80,
                }, {
                    field: 'sign',
                    title: '年龄',
                    width: 80,
                }, {
                    field: 'experience',
                    title: '单位',
                    width: 120
                }, {
                    field: 'score',
                    title: '审核结果',
                    width: 120
                }, {
                    field: 'classify',
                    title: '肝炎',
                    width: 80
                }, {
                    field: 'wealth',
                    title: '痢疾',
                    width: 80
                },{
                    field: 'wealth',
                    title: '伤寒',
                    width: 80
                },{
                    field: 'wealth',
                    title: '肺结核',
                    width: 80
                },{
                    field: 'wealth',
                    title: '皮肤病',
                    width: 80
                },{
                    field: 'wealth',
                    title: '其它',
                    width: 80
                },{
                    field: 'wealth',
                    title: '心',
                    width: 80
                },{
                    field: 'wealth',
                    title: '肝',
                    width: 80
                },{
                    field: 'wealth',
                    title: '脾',
                    width: 80
                },{
                    field: 'wealth',
                    title: '肺',
                    width: 80
                },{
                    field: 'wealth',
                    title: '手癣',
                    width: 80
                },{
                    field: 'wealth',
                    title: '指甲癣',
                    width: 80
                },{
                    field: 'wealth',
                    title: '手部湿疹',
                    width: 80
                },{
                    field: 'wealth',
                    title: '银屑(鱼鳞屑)病',
                    width: 80
                },{
                    field: 'wealth',
                    title: '渗出性皮肤病',
                    width: 80
                },{
                    field: 'wealth',
                    title: '化脓性皮肤病',
                    width: 80
                },{
                    field: 'wealth',
                    title: '其它',
                    width: 80
                },{
                    field: 'wealth',
                    title: 'X胸透或胸部拍片',
                    width: 80
                },{
                    field: 'wealth',
                    title: '痢疾杆菌',
                    width: 80
                },{
                    field: 'wealth',
                    title: '伤寒或副伤寒',
                    width: 80
                },{
                    field: 'wealth',
                    title: '谷丙转氨酶',
                    width: 80
                },{
                    field: 'wealth',
                    title: 'HBsAg',
                    width: 80
                },{
                    field: 'wealth',
                    title: 'HBeAg',
                    width: 80
                },{
                    field: 'wealth',
                    title: '其它',
                    width: 80
                }
            ]
        ],
        done: function (res, curr, count) {
            $('th').eq(1).css({'background-color': '#009ddd', 'color': '#fff'})
            $('th').eq(2).css({'background-color': '#009ddd', 'color': '#fff'})
            $('th').eq(3).css({'background-color': '#009ddd', 'color': '#fff'})
            $('th').eq(4).css({'background-color': '#009ddd', 'color': '#fff'})
            $('th').eq(5).css({'background-color': '#009ddd', 'color': '#fff'})
            $('th').eq(6).css({'background-color': '#009ddd', 'color': '#fff'})
            $('th').eq(7).css({'background-color': '#009ddd', 'color': '#fff'})
            $('th').eq(8).css({'background-color': '#009ddd', 'color': '#fff'})
            $('th').eq(9).css({'background-color': '#4169E1', 'color': '#fff'})
            $('th').eq(10).css({'background-color': '#4169E1', 'color': '#fff'})
            $('th').eq(11).css({'background-color': '#4169E1', 'color': '#fff'})
            $('th').eq(12).css({'background-color': '#4169E1', 'color': '#fff'})
            $('th').eq(13).css({'background-color': '#4169E1', 'color': '#fff'})
            $('th').eq(14).css({'background-color': '#4169E1', 'color': '#fff'})
            $('th').eq(15).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(16).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(17).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(18).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(19).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(20).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(21).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(22).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(23).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(24).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(25).css({'background-color': 'green', 'color': '#fff','opacity':'0.8'})
            $('th').eq(26).css({'background-color': '#9370Db', 'color': '#fff'})
            $('th').eq(27).css({'background-color': '#6495ED', 'color': '#fff'})
            $('th').eq(28).css({'background-color': '#6495ED', 'color': '#fff'})
            $('th').eq(29).css({'background-color': '#6495ED', 'color': '#fff'})
            $('th').eq(30).css({'background-color': '#6495ED', 'color': '#fff'})
            $('th').eq(31).css({'background-color': '#6495ED', 'color': '#fff'})
            $('th').eq(32).css({'background-color': '#6495ED', 'color': '#fff'})
            var str = "<p>标题<p>"
            $('.layui-table-bool-self').append(str)
        }
    });
});

function dataTable(userData){
    
}