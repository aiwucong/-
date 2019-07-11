window.onload = function () {
    // console.log("werwf")
    $.ajax({
        url: baseUrl + "/deptorder/yuyueCount?token="+localStorage.getItem("token"),
        type: "post",
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            // console.log(res)
            if(res.status == 250){
                layer.msg(res.data)
                if (window != window.top) {
                    setTimeout(function () {
                        window.top.location = "../index.html";
                    }, 500)
                }
            }else{
                $('#unaudited-audited').text(res.data.daish);
                $('#already-audited').text(res.data.yish);
            }
        },
        error: function () {
            // console.log("服务器异常");
        }
    });
}

var yuyueTime;
var unpassyy;
layui.use(['element', 'laydate', 'layer', 'form'], function () {
    var element = layui.element;
    var laydate = layui.laydate;
    var form = layui.form;

    form.on('select(required)', function (data) {
        // console.log(data.value); //得到被选中的值
        unpassyy = data.value;
    });

    //日期范围
    laydate.render({
        elem: '#aa',
        done: function (value, date, endDate) {
            yuyueTime = value;
            // console.log(yuyueTime);
        }
    });




    element.on('tab(docDemoTabBrief)', function (data) {
        // 预约已审核表格数据
        if (data.index == 1) {
            layui.use('table', function () {
                var table = layui.table;
                table.render({
                    elem: '#table2',
                    height: 500,
                    title: '用户数据表',
                    url: baseUrl + "/deptorder/daiSH?token=" +localStorage.getItem("token"),
                    even: true,
                    autoSort: false,
                    page: true,
                    toolbar: '#toolbarDemo',
                    parseData: function (res) {
                        console.log(res)
                        if (res.data.pageCount != null) {
                            $.each(res.data.pageCount, function (i, n) {               
                                    n.deptShenhe = "已审核"
                            })
                        }
                        return {
                            "count": res.data.count,
                            "data": res.data.pageCount,
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
                                // fixed: 'left'
                            },
                            {
                                field: 'deptId',
                                title: 'ID',
                                width: 100,
                                // sort: true,
                                // fixed: 'left'
                            },
                            {
                                field: 'createTime',
                                title: '登记时间',
                                width: 100,
                            },
                            {
                                field: 'deptName',
                                title: '单位名称',
                                width: 200
                            }, {
                                field: 'deptCode',
                                title: '单位统一信用代码',
                                width: 150
                            }, {
                                field: 'deptPhone',
                                title: '手机号码',
                                width: 100
                            }, {
                                field: 'deptYuanyin',
                                title: '预约资质审核',
                                toolbar: '#toolbarDemos',
                                width: 280
                            }, {
                                field: 'deptShenhe',
                                title: '审核状态',
                                width: 177
                            }
                        ]
                    ],
                    done:function(res){
                    }
                });
        
                // 监听行工具事件
                table.on('tool(table2)', function (obj) {
                    var data = obj.data;
                    //console.log(obj)
                    if (obj.event === 'audit_pass') {
                        // layer.open({
                        //     title: ['审核结果', 'font-size:18px; text-align: center;'],
                        //     area: ['450px', '320px'],
                        //     type: 1,
                        //     content: $('#box'),
                        //     btn: ['确认', '取消'],
                        //     btn1() {
                        //         // 确定按钮的回调 写业务代码
                        //         layer.msg('的确很重要', {
                        //             icon: 1
                        //         });
                        //     },
                        //     btn2() {
                        //         //取消按钮的回调
                        //     }
        
                        // });
        
                    } else if (obj.event === 'audit_failed') {
                        layer.open({
                            title: ['审核结果', 'font-size:18px; text-align: center;'],
                            area: ['450px', '400px'],
                            type: 1,
                            content: $('#box1'), //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                            btn: ['确认', '取消'],
                            btn1() {
                                // 确定按钮的回调 写业务代码
                                layer.msg('预约时间成功', {
                                    icon: 1
                                });
                            },
                            btn2() {
                                //取消按钮的回调
                            }
        
                        });
                    }
                });
            });
        }
    })

}); 

// 手机号正则
function judgeTel(org) {
    var curType = $(org).val();
    var tellReg = new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/);
    if (!tellReg.test(curType)) {
        alert("电话号码不规范")
        return false
    } else {
        console.log("规范")
    }
}


function queryDiv() {
    var company = $('#company').val();
    var phonenumber = $('#phonenumber').val();
    var creditCode = $('#creditCode').val();
    var data = {
        "deptName": company,
        "deptCode": creditCode,
        "deptPhone": phonenumber
    };
    if (company == "" && phonenumber == "" && creditCode == "") {
        alert('请输入')
        return
    } else {
        $.ajax({
            url: baseUrl + "/deptorder/keywordSelect",
            type: "post",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                var data = res.data;
                $.each(data, function (i, n) {
                    if (n.deptShenhe == 0) {

                        // var userData = data;
                        // dataTable(userData)
                    } else {
                        var passData = n;
                        dataTables(passData)
                    }
                })
                if (res.status == 100) {
                    alert("未找到该人员信息")
                    // location.reload()
                }
            },
            error: function () {
                console.log(失败);
            }
        })
    }
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
// 预约待审表格
layui.use('table', function () {
    var table = layui.table;
    //渲染
    table.render({
        elem: '#table1',
        height: 500,
        title: '用户数据表',
        url: baseUrl + "/deptorder/daiSH?token="+localStorage.getItem("token"),
        where: {deptShenhe: "0"},
        method:'post',
        autoSort: false,
        page: true,
        toolbar: '#toolbarDemo',
        page: true,
        parseData: function (res) {
            // console.log(res)
            if (res.data.pageCount != null) {
                $.each(res.data.pageCount, function (i, n) {               
                        n.deptShenhe = "未审核"
                })
            }
            return {
                "count": res.data.count,
                "data": res.data.pageCount,
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
                    // fixed: 'left'
                },
                {
                    field: 'deptId',
                    title: 'ID',
                    width: 100,
                    // sort: true,
                    // fixed: 'left'
                },
                {
                    field: 'createTime',
                    title: '登记时间',
                    width: 100,
                },
                {
                    field: 'deptName',
                    title: '单位名称',
                    width: 200
                }, {
                    field: 'deptCode',
                    title: '单位统一信用代码',
                    width: 150
                }, {
                    field: 'deptPhone',
                    title: '手机号码',
                    width: 100
                }, {
                    field: 'city',
                    title: '预约资质审核',
                    toolbar: '#barDemo',
                    width: 280
                }, {
                    field: 'deptShenhe',
                    title: '审核状态',
                    width: 177
                }
            ]
        ],

        done: function (res, curr, count) { // 隐藏列
            if (res.status == "100") {
                $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
            }
        }
    });

    //监听行工具事件
    table.on('tool(table1)', function (obj) {
        console.log(obj.data) //得到当前行数据
        var data = obj.data;
        var deptId = obj.data.deptId;
        var deptPhone = obj.data.deptPhone;
        if (obj.event === 'audit_pass') {
            layer.open({
                title: ['审核结果', 'font-size:18px; text-align: center;'],
                area: ['450px', '320px'],
                type: 1,
                content: $('#box'),
                btn: ['确认', '取消'],
                offset:'100px',
                btn1() {
                    $.ajax({
                        url: baseUrl + "/deptorder/deptSH",
                        type: 'post',
                        data: JSON.stringify({
                            "deptId": deptId,
                            "deptShenhe": 1,
                            "deptTime": yuyueTime,
                            "deptPhone": deptPhone
                        }),
                        contentType: "application/json",
                        xhrFields: {
                            widthCredentials: true
                        },
                        dataType: 'json',
                        success: function (res) {
                            if (res.status == '200') {
                                layer.msg('审核成功', {
                                    icon: 1
                                });
                            }
                        },
                        error: function () {
                            console.log("服务器异常");
                        }
                    });
                },
                btn2() {
                    //取消按钮的回调
                }

            });

        } else if (obj.event === 'audit_failed') {
            layer.open({
                title: ['审核结果', 'font-size:18px; text-align: center;'],
                area: ['450px', '400px'],
                type: 1,
                content: $('#box1'),
                btn: ['确认', '取消'],
                offset:'100px',
                btn1() {
                    var untextarea = $('#untextarea').val()
                    // 确定按钮的回调 写业务代码
                    $.ajax({
                        url: baseUrl + "/deptorder/deptSH",
                        type: 'post',
                        data: JSON.stringify({
                            "deptId": deptId,
                            "deptShenhe": 2,
                            "deptTime": yuyueTime,
                            "deptPhone": deptPhone,
                            "deptYuanyin": unpassyy + untextarea
                        }),
                        contentType: "application/json",
                        xhrFields: {
                            widthCredentials: true
                        },
                        dataType: 'json',
                        success: function (res) {
                            if (res.status == "200") {
                                layer.msg('审核成功', {
                                    icon: 1
                                });
                            }
                        },
                        error: function () {
                            console.log("服务器异常");
                        }
                    });
                },
                btn2() {
                    //取消按钮的回调
                }

            });
        } else if(obj.event === 'looks'){
            console.log(deptId)
            $.ajax({
                url:baseUrl +'/deptorder/lookDeptInfo',
                type:'get',
                data:{'deptId':deptId},
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded",
                xhrFields: {
                    widthCredentials: true
                },
                success:function(res){
                    console.log(res.data);
                    layer.open({
                        title: ['审核结果', 'font-size:18px; text-align: center;'],
                        area: ['1200px', '700px'],
                        type: 1,
                        content: $('#looks'),
                        offset:'50px'
                    });
                    $('.a_certificate').attr('src',"data:image/jpg;base64,"+res.data[0])
                    let img1 = "data:image/jpg;base64,"+res.data[0];
                    console.log(img1)
                    $('.b_certificate').attr('src',"data:image/jpg;base64,"+res.data[1])
                    $('.c_certificate').attr('src',"data:image/jpg;base64,"+res.data[2])
                    $('.a_printBtn').click(function(){
                        setTimeout(function(){
                            $('#looks').show
                            Printimgs();
                        },500);
                    })
                    $('.b_printBtn').click(function(){
                        setTimeout(function(){
                            $('#looks').show
                            b_Printimg();
                        },500);
                       
                    })
                    $('.c_printBtn').click(function(){
                        setTimeout(function(){
                            $('#looks').show
                            c_Printimgs();
                        },500);
                       
                    })
                    $('.lookBox').viewer({
                        zIndex:19891017
                    });
                },
                error:function(res){
                   console.log('失败')
                }
            });
        }
        else{
            layer.msg('该功能暂未开放')
        }
        function Printimgs() {
            bdhtml = window.document.body.innerHTML; //获取当前页的html代码
            sprnstr = "<!--stratprint-->"; //设置打印开始区域 
            eprnstr = "<!--endprint-->"; //设置打印结束区域 
            prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17); //从开始代码向后取html 
            prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
            window.document.body.innerHTML = prnhtml;
            window.print();
            window.document.body.innerHTML = bdhtml;
            location.reload();
        }
        function b_Printimg() {
            bdhtml = window.document.body.innerHTML; //获取当前页的html代码
            sprnstr = "<!--stratprint1-->"; //设置打印开始区域 
            eprnstr = "<!--endprint1-->"; //设置打印结束区域 
            prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html 
            prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
            window.document.body.innerHTML = prnhtml;
            window.print();
            window.document.body.innerHTML = bdhtml;
            location.reload();
        }
        function c_Printimgs() {
            bdhtml = window.document.body.innerHTML; //获取当前页的html代码
            sprnstr = "<!--stratprint2-->"; //设置打印开始区域 
            eprnstr = "<!--endprint2-->"; //设置打印结束区域 
            prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html 
            prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
            window.document.body.innerHTML = prnhtml;
            window.print();
            window.document.body.innerHTML = bdhtml;
            location.reload();
        }

    });

    //监听排序
    table.on('sort(table1)', function (obj) {

        //return;
        layer.msg('服务端排序。order by ' + obj.field + ' ' + obj.type);
        //服务端排序
        table.reload('table1', {
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
});
// 预约待审核表格
// function dataTable(userData) {
//     layui.use('table', function () {
//         var table = layui.table;
//         //渲染
//         table.render({
//             elem: '#table1',
//             height: 500,
//             title: '用户数据表',
//             data: userData,
//             even: true,
//             autoSort: false,
//             page: true,
//             toolbar: '#toolbarDemo',
//             page: true,
//             cols: [
//                 [ //表头
//                     {
//                         width: 60,
//                         type: "checkbox",
//                         // fixed: 'left'
//                     },
//                     {
//                         field: 'deptId',
//                         title: 'ID',
//                         width: 100,
//                         // sort: true,
//                         // fixed: 'left'
//                     },
//                     {
//                         field: 'createTime',
//                         title: '登记时间',
//                         width: 100,
//                     },
//                     {
//                         field: 'deptName',
//                         title: '单位名称',
//                         width: 200
//                     }, {
//                         field: 'deptCode',
//                         title: '单位统一信用代码',
//                         width: 150
//                     }, {
//                         field: 'deptPhone',
//                         title: '手机号码',
//                         width: 100
//                     }, {
//                         field: 'city',
//                         title: '预约资质审核',
//                         toolbar: '#barDemo',
//                         width: 280
//                     }, {
//                         field: 'deptShenhe',
//                         title: '审核状态',
//                         width: 177
//                     }
//                 ]
//             ],

//             done: function (res, curr, count) { // 隐藏列
//                 if (res.status == "100") {
//                     $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
//                 }
//             }
//         });

//         //监听行工具事件
//         table.on('tool(table1)', function (obj) {
//             var data = obj.data;
//             var deptId;
//             var deptPhone;
//             table.on('row(table1)', function (obj) {
//                 // console.log(obj.data) //得到当前行数据
//                 deptId = obj.data.deptId;
//                 deptPhone = obj.data.deptPhone;
//             })

//             if (obj.event === 'audit_pass') {
//                 layer.open({
//                     title: ['审核结果', 'font-size:18px; text-align: center;'],
//                     area: ['450px', '320px'],
//                     type: 1,
//                     content: $('#box'),
//                     btn: ['确认', '取消'],
//                     btn1() {
//                         $.ajax({
//                             url: baseUrl + "/deptorder/deptSH",
//                             type: 'post',
//                             data: JSON.stringify({
//                                 "deptId": deptId,
//                                 "deptShenhe": 1,
//                                 "deptTime": yuyueTime,
//                                 "deptPhone": deptPhone
//                             }),
//                             contentType: "application/json",
//                             xhrFields: {
//                                 widthCredentials: true
//                             },
//                             dataType: 'json',
//                             success: function (res) {
//                                 if (res.status == '200') {
//                                     layer.msg('审核成功', {
//                                         icon: 1
//                                     });
//                                 }
//                             },
//                             error: function () {
//                                 console.log("服务器异常");
//                             }
//                         });
//                     },
//                     btn2() {
//                         //取消按钮的回调
//                     }

//                 });

//             } else if (obj.event === 'audit_failed') {
//                 layer.open({
//                     title: ['审核结果', 'font-size:18px; text-align: center;'],
//                     area: ['450px', '400px'],
//                     type: 1,
//                     content: $('#box1'),
//                     btn: ['确认', '取消'],
//                     btn1() {
//                         var untextarea = $('#untextarea').val()
//                         // 确定按钮的回调 写业务代码
//                         $.ajax({
//                             url: baseUrl + "/deptorder/deptSH",
//                             type: 'post',
//                             data: JSON.stringify({
//                                 "deptId": deptId,
//                                 "deptShenhe": 2,
//                                 "deptTime": yuyueTime,
//                                 "deptPhone": deptPhone,
//                                 "deptYuanyin": unpassyy + untextarea
//                             }),
//                             contentType: "application/json",
//                             xhrFields: {
//                                 widthCredentials: true
//                             },
//                             dataType: 'json',
//                             success: function (res) {
//                                 if (res.status == "200") {
//                                     layer.msg('审核成功', {
//                                         icon: 1
//                                     });
//                                 }
//                             },
//                             error: function () {
//                                 console.log("服务器异常");
//                             }
//                         });
//                     },
//                     btn2() {
//                         //取消按钮的回调
//                     }

//                 });
//             } else if(obj.event === 'edit') {
//                alert(123)
//             }
//         });

//         //监听排序
//         table.on('sort(table1)', function (obj) {

//             //return;
//             layer.msg('服务端排序。order by ' + obj.field + ' ' + obj.type);
//             //服务端排序
//             table.reload('table1', {
//                 initSort: obj
//                     //,page: {curr: 1} //重新从第一页开始
//                     ,
//                 where: { //重新请求服务端
//                     key: obj.field //排序字段
//                         ,
//                     order: obj.type //排序方式
//                 }
//             });
//         });
//     });
// }



// 预约已审核表格
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
            page: true,
            toolbar: '#toolbarDemo',
            cols: [
                [ //表头
                    {
                        width: 60,
                        type: "checkbox",
                        // fixed: 'left'
                    },
                    {
                        field: 'deptId',
                        title: 'ID',
                        width: 100,
                        // sort: true,
                        // fixed: 'left'
                    },
                    {
                        field: 'createTime',
                        title: '登记时间',
                        width: 100,
                    },
                    {
                        field: 'deptName',
                        title: '单位名称',
                        width: 200
                    }, {
                        field: 'deptCode',
                        title: '单位统一信用代码',
                        width: 150
                    }, {
                        field: 'deptPhone',
                        title: '手机号码',
                        width: 100
                    }, {
                        field: 'deptYuanyin',
                        title: '预约资质审核',
                        toolbar: '#toolbarDemos',
                        width: 280
                    }, {
                        field: 'deptShenhe',
                        title: '审核状态',
                        width: 177
                    }
                ]
            ]
        });

        // 监听行工具事件
        table.on('tool(table2)', function (obj) {
            var data = obj.data;
            //console.log(obj)
            if (obj.event === 'audit_pass') {
                // layer.open({
                //     title: ['审核结果', 'font-size:18px; text-align: center;'],
                //     area: ['450px', '320px'],
                //     type: 1,
                //     content: $('#box'),
                //     btn: ['确认', '取消'],
                //     btn1() {
                //         // 确定按钮的回调 写业务代码
                //         layer.msg('的确很重要', {
                //             icon: 1
                //         });
                //     },
                //     btn2() {
                //         //取消按钮的回调
                //     }

                // });

            } else if (obj.event === 'audit_failed') {
                layer.open({
                    title: ['审核结果', 'font-size:18px; text-align: center;'],
                    area: ['450px', '400px'],
                    type: 1,
                    content: $('#box1'), //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                    btn: ['确认', '取消'],
                    btn1() {
                        // 确定按钮的回调 写业务代码
                        layer.msg('预约时间成功', {
                            icon: 1
                        });
                    },
                    btn2() {
                        //取消按钮的回调
                    }

                });
            }
        });
    });
}










// //监听排序
// table.on('sort(table2)', function(obj) {
//     console.log(this)

//     //return;
//     layer.msg('服务端排序。order by ' + obj.field + ' ' + obj.type);
//     //服务端排序
//     table.reload('test', {
//         initSort: obj
//             //,page: {curr: 1} //重新从第一页开始
//             ,
//         where: { //重新请求服务端
//             key: obj.field //排序字段
//                 ,
//             order: obj.type //排序方式
//         }
//     });
// });


// //return;

// var $ = layui.jquery,
//     active = {
//         parseTable: function() {
//             table.init('parse-table-demo', {
//                 limit: 3
//             });
//         },
//         add: function() {
//             table.addRow('test')
//         }
//     };
// $('i').on('click', function() {
//     var type = $(this).data('type');
//     active[type] ? active[type].call(this) : '';
// });
// $('.layui-btn').on('click', function() {
//     var type = $(this).data('type');
//     active[type] ? active[type].call(this) : '';
// });