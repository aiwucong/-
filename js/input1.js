layui.use(['form', 'laydate', 'table'], function() {
    var form = layui.form;
    var laydate = layui.laydate;
    var table = layui.table;
    //监听提交
    // 日期
    laydate.render({
        elem: '#startdate', //指定元素
        done: function(value, date) {
            var FullYear = date.year + 1;
            var month = date.month;
            month = month < 10 ? '0' + month : month;
            var day = date.date;
            day = day < 10 ? '0' + day : day;
            var lastDate = FullYear + "-" + month + "-" + day;
            document.getElementById("enddate").value = lastDate;
        }

    });
    // 表格
    function tableRendom(data) {
        debugger
        var table = layui.table;
        //第一个实例
        table.render({
            elem: '#demo',
            height: 312,
            url: baseUrl+'/tijian/daytjlist',
            data: data,
            page: true //开启分页
                ,
            toolbar: '#toolbarDemo',
            cols: [
                [ //表头
                    {
                        width: 60,
                        type: "checkbox",
                        fixed: 'left'
                    },
                    {
                        field: 'id',
                        title: 'ID',
                        width: 80,
                        sort: true,
                        even: 'setSign'
                    }, {
                        field: 'name',
                        title: '姓名',
                        // width: 50
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
                        width: 80,
                        sort: true
                    }, {
                        field: 'person',
                        title: '办证人员',
                        width: 80,
                        sort: true
                    }, {
                        field: 'telphone',
                        title: '手机号码',
                        width: 80
                    }, {
                        field: 'idcardNum',
                        title: '身份证号',
                        width: 135
                    },
                    {
                        field: 'hearthcardNum',
                        title: '健康证号',
                        width: 135,
                        sort: true
                    },
                    {
                        field: 'adress',
                        title: '通信地址',
                        width: 135,
                        sort: true
                    }, {
                        field: 'deptNum',
                        title: '办证单位',
                        width: 135,
                        sort: true
                    }
                ]
            ]
        });
        table.on('row(test)',function(obj){
            console.log(obj.data);
            console.log(obj.data.username);
            $('.IDname').attr("value", obj.data.username);
        })
    }

    
$(function() {
    $("#save").on("click", function() {
        var IDnumber = $("#IDnumber").val(),
            IDname = $(".IDname").val(),
            name =$(".IDname").val(),
            sex =$("input[type='radio']:checked").val(),
            company = $("#company").val(),
            startdate = $("#startdate").val(),
            person = $(".bzpeople").val(),
            telphone = $(".phonenumber").val(),
            idcardNum = $("#IDcard").val(),
            hearthcardNum = $(".healthnumber").val(),
            adress = $(".address").val(),
            enddate = $("#enddate").val(),
            age = $("#age").val(),
            deptNum = $(".units").val();
            sexList = ""        
            if(sex===1){
                sexList='男'
            }else{
                sexList='女'
            }
            var data={"number":IDnumber,"name":IDname,"sex":sexList,"age":age,
            "company":company,"startdate":startdate,"person":person,"telphone":telphone,
           "idcardNum":idcardNum,"hearthcardNum":hearthcardNum,"adress":adress, "enddate":enddate,
            "deptNum":deptNum};
        $.ajax({
            type: "post",
            url: baseUrl + "/tijian/add",
            contentType: "application/json;charset=utf-8",
            dataType:'json',
            data:JSON.stringify(data),
            success: function(data) {
               var userData = data.data
               window.location.reload()
                if (data.status == "success") {
                    alert("保存成功");
                } else {
                    alert("保存失败，原因为" + data.data.errMsg);
                }
            },
            error: function() {
                alert("失败");
            }
        });
    })
    // 自定义弹框
    $('.custom').click(function(){
        var index = layer.open({
            title: ['自定义编号', 'font-size:18px; text-align: center;'],
            area: ['450px', '250px'],
            type: 1,
            content: $('#customBox'), //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            btn: ['确认', '取消'],
            btn1() {
                // 确定按钮的回调 写业务代码
                layer.msg('修改成功', { icon: 1 });
                layer.close(index);
            },
            btn2() {
                //取消按钮的回调
            }

        });
    })

    function getAge(birthday) {
        var today = new Date();
        var birthDate = new Date(birthday); //把出生日期转换成日期
        var age = today.getFullYear() - birthDate.getFullYear(); //分别获取到年份后相减
        var m = today.getMonth() - birthDate.getMonth(); //获取到月份后相减
        if (m < 0 || (m == 0 && today.getDate() < birthDate.getDate())) {
            age--; //如果月份的结果小于等于0，或者日期相减的结果是0，年龄减去1
        }
        return age
    }

    $('.readcard').click(function() {
        layui.use('form', function() {
            var form = layui.form;
            $.ajax({
                type: "post",
                url: baseUrl+"/changestatus/1",
                async: true,
                contentType: "application/json",
                success: function(data) {
                    console.log(data)
                    $('.IDname').attr("value", data.pName);
                    $('#IDcard').attr("value", data.pCertNo);
                    if (data.pSex === "男") {
                        $('#boy').attr('checked', true)
                        $('#girl').attr('checked', false)
                    } else {
                        $('#girl').attr('checked', true)
                        $('#boy').attr('checked', false)
                    }
                    form.render(); //更新全部                 
                }
            });
        })
    })
   
    console.log(true)
    $.ajax({
        url:baseUrl+'/tijian/daytjlist',
        type:'POST',
        dataType:'json',
        success:function(res){
            var userData = res.data
            console.log(userData)
            dataTable(userData)
        }
    })
    function dataTable(userData){
        table.render({
            elem: '#demo',
            height: 312,
            data: userData,
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
                        field: 'id',
                        title: 'ID',
                        width: 80,
                        sort: true,
                        even: 'setSign'
                    }, {
                        field: 'name',
                        title: '姓名',
                        // width: 50
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
                        width: 80,
                        sort: true
                    }, {
                        field: 'person',
                        title: '办证人员',
                        width: 80,
                        sort: true
                    }, {
                        field: 'telphone',
                        title: '手机号码',
                        width: 80
                    }, {
                        field: 'idcardNum',
                        title: '身份证号',
                        width: 135
                    },
                    {
                        field: 'hearthcardNum',
                        title: '健康证号',
                        width: 135,
                        sort: true
                    },
                    {
                        field: 'adress',
                        title: '通信地址',
                        width: 135,
                        sort: true
                    }, {
                        field: 'deptNum',
                        title: '办证单位',
                        width: 135,
                        sort: true
                    }
                ]
            ]
        })
    }
})
})

    