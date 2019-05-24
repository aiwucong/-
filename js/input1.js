layui.use(['form', 'laydate', 'table', 'upload'], function () {
    var form = layui.form;
    var laydate = layui.laydate;
    var table = layui.table;
    var upload = layui.upload;
    var timer;
    //监听提交
    form.on('submit(formDemo)', function (data) {
        layer.msg(上传成功);
        return false;
    });
    // 表格监听
    table.on('row(test)', function (obj) {
        console.log(obj.tr) //得到当前行元素对象
        console.log(obj.data) //得到当前行数据
        $.each(obj.data, (key, val) => {
            if (key == 'sex') {
                if (val === "男") {
                    $('#boy').attr('checked', true)
                    $('#girl').attr('checked', false)
                } else {
                    $('#girl').attr('checked', true)
                    $('#boy').attr('checked', false)
                }
            } else {
                $.each($('.lines'), (index, dom) => {
                    $(dom).find(`[name=${key}]`).val(val)
                })
            }
        })
    });
    // 日期
    laydate.render({
        elem: '#startdate', //指定元素
        done: function (value, date) {
            var FullYear = date.year + 1;
            var month = date.month;
            month = month < 10 ? '0' + month : month;
            var day = date.date;
            day = day < 10 ? '0' + day : day;
            var lastDate = FullYear + "-" + month + "-" + day;
            document.getElementById("enddate").value = lastDate;
        }

    });

    // 上传图片
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: ''
        ,before: function(obj){
          //预读本地文件示例，不支持ie8
          console.log(obj)
          obj.preview(function(index, file, result){
            //   console.log(result)
            console.log(file.name)
            //   console.log(index)
             $('#idcardimg').attr('src', result); //图片链接（base64）
            
          });
        }
        ,done: function(res){
          //如果上传失败
          if(res.code > 0){
            return layer.msg('上传失败');
          }
          //上传成功
        }
        ,error: function(){
          //演示失败状态，并实现重传
          var demoText = $('#demoText');
          demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
          demoText.find('.demo-reload').on('click', function(){
            uploadInst.upload();
          });
        }
      });


    // 复选框
    form.on('checkbox', function (data) {
        if (data.value == 1 && data.elem.checked == true) {
            timer = setInterval(function () {
                $.ajax({
                    type: "post",
                    url: "http://192.168.1.111:8080/mycaream/changestatus/1",
                    async: true,
                    contentType: "application/json",
                    success: function (data) {
                        console.log(data)
                    }
                })
            }, 5000)
        } else {
            clearInterval(timer)
        }
        // console.log(data.elem);
        // console.log(data.elem.checked); 
        // console.log(data.value);
    })
});


// 表格
// function tableRendom(data) {
//     debugger
//     var table = layui.table;
//     //第一个实例
//     table.render({
//         elem: '#demo',
//         height: 312,
//         url: baseUrl+'/tijian/daytjlist',
//         data: data,
//         page: true //开启分页
//             ,
//         toolbar: '#toolbarDemo',
//         cols: [
//             [ //表头
//                 {
//                     width: 60,
//                     type: "checkbox",
//                     fixed: 'left'
//                 },
//                 {
//                     field: 'id',
//                     title: 'ID',
//                     width: 80,
//                     sort: true,
//                     even: 'setSign'
//                 }, {
//                     field: 'name',
//                     title: '姓名',
//                     // width: 50
//                 }, {
//                     field: 'sex',
//                     title: '性别',
//                     width: 80,
//                     sort: true
//                 }, {
//                     field: 'age',
//                     title: '年龄',
//                     width: 80
//                 }, {
//                     field: 'startdate',
//                     title: '办证日期',
//                     width: 80,
//                     sort: true
//                 }, {
//                     field: 'person',
//                     title: '办证人员',
//                     width: 80,
//                     sort: true
//                 }, {
//                     field: 'telphone',
//                     title: '手机号码',
//                     width: 80
//                 }, {
//                     field: 'idcardNum',
//                     title: '身份证号',
//                     width: 135
//                 },
//                 {
//                     field: 'hearthcardNum',
//                     title: '健康证号',
//                     width: 135,
//                     sort: true
//                 },
//                 {
//                     field: 'adress',
//                     title: '通信地址',
//                     width: 135,
//                     sort: true
//                 }, {
//                     field: 'deptNum',
//                     title: '办证单位',
//                     width: 135,
//                     sort: true
//                 }
//             ]
//         ]
//     });
//     table.on('row(test)',function(obj){
//         console.log(obj.data);
//         console.log(obj.data.username);
//         $('.IDname').attr("value", obj.data.username);
//     })
// }


$(function () {
    $("#save").on("click", function () {
        var IDnumber = $("#IDnumber").val(),
        IDname = $(".IDname").val(),
        sex = $("input[type='radio']:checked").val(),
        company = $("#company").val(),
        startdate = $("#startdate").val(),
        person = $(".bzpeople").val(),
        telphone = $(".phonenumber").val(),
        idcardNum = $("#IDcard").val(),
        hearthcardNum = $(".healthnumber").val(),
        adress = $(".address").val(),
        enddate = $("#enddate").val(),
        age = $("#age").val(),
        deptNum = $(".units").val(),
        idcardimg = $('#idcardimg')[0].src,
        sexList = "";
        console.log(111)
        if (sex = 1) {
            sexList = '男'
        } else {
            sexList = '女'
        }
        var data = {
            "number": IDnumber,
            "name": IDname,
            "sex": sexList,
            "age": age,
            "company": company,
            "startdate": startdate,
            "person": person,
            "telphone": telphone,
            "idcardNum": idcardNum,
            "hearthcardNum": hearthcardNum,
            "adress": adress,
            "enddate": enddate,
            "deptNum": deptNum,
            "idcardimg":idcardimg
        };
     
        // var num = $("#IDnumber").val().substring(2);
        // console.log(num)
        // num++;
        // var newnum = $("#IDnumber").val().substring(0, 2) + num;
        // console.log(newnum)
        // $("#IDnumber").val(newnum)

        var num=$("#IDnumber").val().substring(5);
        console.log(num)
			num++;
            num+=100000;
            console.log(num)
            var newnum=$("#IDnumber").val().substring(0,5)+num.toString().substring(1);
            console.log(newnum)
			$("#IDnumber").val(newnum)



        $.ajax({
            type: "post",
            url: "http://192.168.1.107:8086/tijian/add",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (data) {
                var userData = data.data
                // window.location.reload()
                if (data.status == "success") {
                    alert("保存成功");
                } else {
                    alert("保存失败，原因为" + data.data.errMsg);
                }
            },
            error: function () {
                alert("失败");
            }
        });
    })
    // 自定义弹框
    $('.custom').click(function () {
        var index = layer.open({
            title: ['自定义编号', 'font-size:18px; text-align: center;'],
            area: ['450px', '250px'],
            type: 1,
            content: $('#customBox'),
            btn: ['确认', '取消'],
            btn1() {
                // 确定按钮的回调 写业务代码
                var cusHtalthCard = $('#cusHtalthCard').val();
                console.log(cusHtalthCard);
                var cusHtalthCard2 = $('#cusHtalthCard2').html()
                console.log(cusHtalthCard2);
                // $(".healthnumber").attr("value", cusHtalthCard);
                $('.healthnumber').attr("value", cusHtalthCard.toString()+cusHtalthCard2 );
                console.log(cusHtalthCard.toString()+cusHtalthCard2)
                layer.msg('修改成功', {
                    icon: 1
                });
                layer.close(index);
            },
            btn2() {
                //取消按钮的回调
            }

        });
    })
    
    $('#healtTable').click(function(){ 
        var  IDname = $(".IDname").val(),
            sex = $("input[type='radio']:checked").val(),
            company = $("#company").val(),
            telphone = $(".phonenumber").val(),
            adress = $(".address").val(),
            age = $("#age").val(),
            idcardimg = $('#idcardimg')[0].src,
            IDnumber = $("#IDnumber").val(),
            startdate = $("#startdate").val(),
            sexList = "";
        
        if (sex = 1) {
            sexList = '男'
        } else {
            sexList = '女'
        }
        var data = {
            "number": IDnumber,
            "name": IDname,
            "sex": sexList,
            "age": age,
            "company": company,
            "telphone": telphone,
            "adress": adress,
            'idcardimg':idcardimg,
            "startdate": startdate
        };
        $.ajax({
            type: "post",
            url: "http://192.168.1.107:8086/tijian/tjtable",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (data) {
                console.log(data)
                if (data.status == "success") {
                    alert("保存成功跳转页面");
                } else {
                    alert("保存失败，原因为" + data.data);
                }
            },
            error: function (data) {
                console.log(data)
                alert("失败");
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

    $('.readcard').click(function () {
        layui.use('form', function () {
            var form = layui.form;
            $.ajax({
                type: "post",
                url: baseUrl + "/changestatus/1",
                async: true,
                contentType: "application/json",
                success: function (data) {
                    console.log(data)
                    $('.IDname').attr("value", data.pName);
                    $('#IDcard').attr("value", data.pCertNo);
                    $("#idcardimg").attr("src", "data:image/png;base64," + data.photo);
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
    $.ajax({
        url: "http://192.168.1.107:8086/tijian/weektjlist",
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var userData = res.data
            console.log(userData)
            dataTable(userData)
        }
    })

    function dataTable(userData) {
        layui.use('table', function () {
            var table = layui.table;
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
        })
    }

    // 上传图片
    $('.btn1').click(function () {
        console.log(111);
        $.ajax({
            type: "post",
            url: "http://192.168.1.107:8081/changestatus/3",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $("#idcardimg").attr("src", "data:image/png;base64," + data.photo);
            },
            error: function () {
                alert("失败");
            }
        });
    })
})
window.onload = function () {
    $.ajax({
        url: "http://192.168.1.107:8086/tijian/getlastnum",
        type: "get",
        success: function (res) {
            console.log(res);
            console.log(res.data.hearthcardNum);
            $('.healthnumber').attr("value", res.data.hearthcardNum);
        },
        error: function () {
            console.log("服务器异常");
        }
    })
}