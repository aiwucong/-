layui.use(['form', 'laydate', 'table', 'upload'], function () {
    var form = layui.form;
    var laydate = layui.laydate;
    var table = layui.table;
    var upload = layui.upload;
    var timer;
    //监听提交
    form.on('submit(formDemo)', function (data) {
        // layer.msg(上传成功);
        return false;
    });
    // 表格监听
    table.on('rowDouble(test)', function (obj) {
        // console.log(obj.tr) //得到当前行元素对象
        console.log(obj.data) //得到当前行数据
        console.log(obj.data.idcardphoto);
        $("#idcardimg").attr("src", "data:image/jpg;base64," + obj.data.idcardphoto);

        $.each(obj.data, (key, val) => {
            if (key == 'sex') {
                if (val === "男") {
                    form.val('fromtest', {
                        "sex": '1'
                    })
                } else {
                    form.val('fromtest', {
                        "sex": '2'
                    })
                }
            } else {
                $.each($('.lines'), (index, dom) => {
                    $(dom).find(`[name=${key}]`).val(val)
                })

            }


        })

    });

    // 头工具栏事件
    table.on('toolbar(test)', function (obj) {
        // 批量修改办证单位
        if (obj.event === 'batchMod') {
            var checkStatus = table.checkStatus(obj.config.id);
            console.log(checkStatus);
            var data = checkStatus.data;
            var arrs = [];
            for (var i = 0; i < data.length; i++) {
                arrs[i] = data[i].idcardNum;
                console.log(arrs[i]);
            }
            console.log(data);
            var batchBox = layer.open({
                title: ['批量修改', 'font-size:18px; text-align: center;'],
                area: ['400px', '200px'],
                type: 1,
                content: $('#batchBox'),
                btn: ['确认', '取消'],
                btn1() {
                    // 确定按钮的回调
                    var deptNum = $('#deptNum').val();
                    console.log(deptNum);
                    layer.msg('修改成功', {
                        icon: 1
                    });
                    layer.close(batchBox);
                },
                btn2() {
                    //取消按钮的回调
                }

            });
        }
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
        elem: '#test1',
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            console.log(obj)
            obj.preview(function (index, file, result) {
                //   console.log(result)
                console.log(file.name)
                //   console.log(index)
                $('#idcardimg').attr('src', result); //图片链接（base64）

            });
        }
    });


    // 复选框
    form.on('checkbox', function (data) {
        if (data.value == 1 && data.elem.checked == true) {
            timer = setInterval(function () {
                $.ajax({
                    type: "post",
                    url: "http://192.168.1.115:8080/mycaream/changestatus/1", //这个目前不改
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
    })
});
// 新增数据
var pDepartment;
var pEffectDate;
var pExpire;

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
            idcardimg = basestr,
            sexList = "";
        if (sex = 1) {
            sexList = '男'
        } else {
            sexList = '女'
        }
        console.log(idcardimg);
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
            "idcardPhoto": idcardimg,
            "nation": pNation,
            "starttime": pEffectDate,
            "psb": pDepartment,
            "endtime": pExpire
        };

        $.ajax({
            type: "post",
            url: baseUrl + "/tijian/add",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (data) {
                alert(JSON.stringify(data));
                //体检编号自增
                var num = $("#IDnumber").val().substring(5);
                console.log(num)
                num++;
                num += 100000;
                console.log(num)
                var newnum = $("#IDnumber").val().substring(0, 5) + num.toString().substring(1);
                console.log(newnum)
                $("#IDnumber").val(newnum)
                var userData = data.data
                //window.location.reload()
                if (data.status == 200) {
                    alert("保存成功");
                    $.ajax({
                        url: baseUrl + "/tijian/weektjlist",
                        type: 'POST',
                        dataType: 'json',
                        success: function (res) {
                            var userData = res.data
                            console.log(userData)
                            dataTable(userData)
                        } 
                    })
                } else {
                    alert("保存失败，原因为" + data.data);
                    console.log(data);
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
                var cusHtalthCard2 = $('#cusHtalthCard2').html();
                $('.healthnumber').attr("value", cusHtalthCard.toString() + cusHtalthCard2);
                console.log(cusHtalthCard.toString() + cusHtalthCard2)
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
    //打印体检表
    $('#healtTable').click(function () {
        var IDnumber = $("#IDnumber").val(),
            IDname = $(".IDname").val(),
            sex = $("input[type='radio']:checked").val(),
            company = $("#company").val(),
            startdate = $("#startdate").val(),
            idcardNum = $("#IDcard").val(),
            adress = $(".address").val(),
            age = $("#age").val(),
            idcardimg = $('#idcardimg')[0].src,
            sexList = "";
        if (sex = 1) {
            sexList = '男'
        } else {
            sexList = '女'
        }
        var data = {
            "pNation": pNation,
            "number": IDnumber,
            "name": IDname,
            "sex": sexList,
            "age": age,
            "company": company,
            "startdate": startdate,
            "idcardNum": idcardNum,
            "adress": adress,
            "idcardimg": idcardimg
        };
        $.ajax({
            url: baseUrl + '/tijian/tjtable',
            type: "post",
            contentType: "application/json;charset=utf-8",
            //dataType: 'json',
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res)
            }
        })
    })


    //打印健康证
    $('.healthCard1').click(function () {
        //var IDnumber = $("#IDnumber").val(),
        var IDname = $(".IDname").val(),
            sex = $("input[type='radio']:checked").val(),
            age = $("#age").val(),
            idcardimg = $('#idcardimg')[0].src,
            enddate = $("#enddate").val(),
            hearthcardNum = $(".hearthcardNum").val(),
            sexList = "";
        if (sex = 1) {
            sexList = '男'
        } else {
            sexList = '女'
        }
        var data = {
            "name": IDname,
            "sex": sexList,
            "age": age,
            "idcardimg": idcardimg,
            "hearthcardNum": hearthcardNum,
            "enddate": enddate
        };
        $.ajax({
            url: baseUrl + '/tijian/savecardinfo',
            type: "post",
            contentType: "application/json;charset=utf-8",
            //dataType: 'json',
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res)
            }
        })
    })
    // 读身份证
    var pNation;
    var basestr;
    $('.readcard').click(function () {
        layui.use('form', function () {
            var form = layui.form;
            $.ajax({
                type: "get",
                url: IdUrl + "/card/get", //这个不能改
                //url: "http://localhost:8080/mycaream/changestatus/1",
                async: true,
                contentType: "application/json",
                success: function (data) {
                    console.log(data);
                    if (data.status == 100) {
                        alert (JSON.stringify((data.data)));
                    } else if(data.status == 200) {
                        pNation = data.pNation;
                        $('.IDname').attr("value", data.pName);
                        $('#IDcard').attr("value", data.pCertNo);
                        $('.address').attr("value", data.pAddress);
                        $("#idcardimg").attr("src", "data:image/jpg;base64," + data.imgUrl);
                        console.log(data.imgUrl);
                        basestr = data.imgUrl;
                        pDepartment = data.pDepartment;
                        pEffectDate = data.pEffectDate;
                        pExpire = data.pExpire;
                        if (data.pSex === "男") {
                            $('#boy').attr('checked', true)
                            $('#girl').attr('checked', false)
                        } else {
                            $('#girl').attr('checked', true)
                            $('#boy').attr('checked', false)
                        }
                        //年龄计算	
                        var date = new Date();
                        var birth = data.pBirth;
                        var y1 = birth.toString().substring(-1, 4);
                        var year = date.getFullYear() - y1;
                        var m1 = birth.substring(4, 6);
                        var m2 = date.getMonth() + 1;
                        if (m1 < m2) {
                            console.log(year)
                            $('#age').attr("value", year);
                        } else {
                            console.log(year--)
                            $('#age').attr("value", year--);
                        }
                        form.render(); //更新全部   
                    }
                }
            });

        })

    })

    // 获取年龄的方法
    // function getAge(birthday) {
    //     var today = new Date();
    //     var birthDate = new Date(birthday); //把出生日期转换成日期
    //     var age = today.getFullYear() - birthDate.getFullYear(); //分别获取到年份后相减
    //     var m = today.getMonth() - birthDate.getMonth(); //获取到月份后相减
    //     if (m < 0 || (m == 0 && today.getDate() < birthDate.getDate())) {
    //         age--; //如果月份的结果小于等于0，或者日期相减的结果是0，年龄减去1
    //     }
    //     return age
    // }





    // 返回表格的数据
    $.ajax({
        url: baseUrl + "/tijian/weektjlist",
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
                        }, {
                            field: 'idcardPhoto',
                            title: '照片',
                            width: 135,
                            sort: true
                        }
                    ]
                ],
                done: function (res, curr, count) { // 隐藏列
                    $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
                }
            })
        })
    }

    // 获取图片传值
    $('.btn1').click(function () {
        console.log(111);
        $.ajax({
            type: "post",
            url: IdUrl + "/changestatus/3", //这个不能改
            //url: "http://localhost:8080/mycaream/changestatus/3",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                console.log(data.photo)
                $("#idcardimg").attr("src", "data:image/jpg;base64," + data.photo);
            },
            error: function () {
                alert("失败");
            }
        });
    })
})
// 返回健康证号
window.onload = function () {
    $.ajax({
        url: baseUrl + "/tijian/getlastnum",
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

