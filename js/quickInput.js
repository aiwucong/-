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
        // console.log(obj.data) //得到当前行数据
        localStorage.setItem("idCard", obj.data.idcardNum);
        $("#idcardimg").attr("src", "data:image/jpg;base64," + obj.data.idcardPhoto);

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
            // console.log(checkStatus);
            var data = checkStatus.data;
            var arrs = [];
            for (var i = 0; i < data.length; i++) {
                arrs[i] = data[i].idcardNum;
            }
            // console.log(data);
            var batchBox = layer.open({
                title: ['批量修改', 'font-size:18px; text-align: center;'],
                area: ['400px', '200px'],
                type: 1,
                content: $('#batchBox'),
                btn: ['确认', '取消'],
                btn1() {
                    // 确定按钮的回调
                    var deptNum = $('#deptNum').val();
                    // console.log(deptNum);
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
        value: new Date(),
        min: 0,
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
            // console.log(obj)
            obj.preview(function (index, file, result) {
                //   console.log(result)
                // console.log(file.name)
                //   console.log(index)
                $('#idcardimg').attr('src', result); //图片链接（base64）

            });
        }
    });
});

function sjDate() {
    var date = new Date();
    var year = date.getFullYear() + 1;
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = date.getDate();
    day = day < 10 ? '0' + day : day;
    var lastDate = year + "-" + month + "-" + day;
    document.getElementById("enddate").value = lastDate;
}

// 新增数据
var pDepartment;
var pEffectDate;
var pExpire;
var pNation;
var basestr;
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
            hospitalNum = $('#hospitalNum').val()
        idcardimg = basestr,
            sexList = "";
        if (sex == 1) {
            sexList = '男'
        } else {
            sexList = '女'
        }
        // console.log(hospitalNum);
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
            "endtime": pExpire,
            "hospitalNum": hospitalNum
        };

        $.ajax({
            type: "post",
            url: baseUrl + "/tijian/add",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (data) {
                console.log(data);
                // alert(JSON.stringify(data));
                if (data.status == 200) {
                    layer.msg("保存成功,正在请求打印请等待!!!", {
                        icon: 16
                    });
                    // console.log(data.data.idcardNum);
                    var dataId = data.data.idcardNum;
                    xiangqing(dataId);
                    kstable();
                } else {
                    layer.msg("保存失败，原因为" + JSON.stringify(data.data), {
                        icon: 1
                    });
                    // console.log(data);
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
                // console.log(cusHtalthCard.toString() + cusHtalthCard2)
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
            hospitalNum = $('#hospitalNum').val(),
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
            "idcardimg": idcardimg,
            "hospitalNum": hospitalNum
        };
            $.ajax({
                url: baseUrl + '/tijian/tjtable',
                type: "post",
                contentType: "application/json;charset=utf-8",
                //dataType: 'json',
                data: JSON.stringify(data),
                success: function (res) {
                    // console.log(res)
                }
            })
        
    })
    $('.reset').click(function () {
        location.reload();
    })

    //打印健康证
    $('.healthCard1').on('click', function () {
        var IDcard = $('#IDcard').val()
        var dataId = localStorage.getItem('idCard')
        if (IDcard == "") {
            layer.msg("请选择该成员打印信息", {
                icon: 7
            })
        } else {
            // var dataId = data.data.idcardNum;
            layer.msg("正在处理打印数据请稍等", {
                icon: 16
            })
            xiangqing(dataId);

        }
    })

    // 读身份证
    $('.readcard').click(function () {
        layui.use('form', function () {
            var form = layui.form;
            $.ajax({
                type: "get",
                url: IdUrl + "/card/get",
                async: true,
                contentType: "application/json",
                success: function (data) {
                    // console.log(data);
                    if (data.status == 100) {
                        alert(JSON.stringify((data.data)));
                    } else if (data.status == 200) {
                        pNation = data.pNation;
                        $('.IDname').attr("value", data.pName);
                        $('#IDcard').attr("value", data.pCertNo);
                        $('.address').attr("value", data.pAddress);
                        $("#idcardimg").attr("src", "data:image/jpg;base64," + data.imgUrl);
                        // console.log(data.imgUrl);
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
                            // console.log(year)
                            $('#age').attr("value", year);
                        } else {
                            // console.log(year--)
                            $('#age').attr("value", year--);
                        }
                        form.render(); //更新全部   
                    }
                }
            });

        })

    })

    // 返回快速录入表格的数据
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#demo',
            height: 312,
            url: baseUrl + "/tijian/getWeekData?status=1"+"&yuliu1=1",
            method: 'post',
            response: {
                statusName: 'status',
                statusCode: 200, // 对应 code自定义的参数名称
                msgName: 'msg', // 对应 msg自定义的参数名称
                countName: 'countSum', // 对应 count自定义的参数名称
                dataName: 'data', // 对应 data自定义的参数名称
            },
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
                        sort: true,
                        even: 'setSign'
                    }, {
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
                        field: 'deptNum',
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
                $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
                if (res.status == "100") {
                    $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
                }
            }
        })
        table.render({
            elem: '#baseInput',
            height: 312,
            url: baseUrl + "/tijian/getWeekData?status=0",
            response: {
                statusName: 'status',
                statusCode: 200, // 对应 code自定义的参数名称
                msgName: 'msg', // 对应 msg自定义的参数名称
                countName: 'countSum', // 对应 count自定义的参数名称
                dataName: 'data', // 对应 data自定义的参数名称
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
                        field: 'id',
                        title: 'ID',
                        sort: true,
                        even: 'setSign'
                    }, {
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
                        field: 'deptNum',
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
                $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
                if (res.status == "100") {
                    $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
                }
            }
        })
    })

    // 获取图片传值
    $('.btn1').click(function () {
        $.ajax({
            type: "post",
            url: IdUrl + "/changestatus/3",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                // console.log(data.photo)
                $("#idcardimg").attr("src", "data:image/jpg;base64," + data.photo);
            },
            error: function () {
                alert("失败");
            }
        });
    })
})

var startdate
window.onload = function () {
    PersonnelUnit();
    jctable();
    sjDate();
}

// 返回办证单位函数
function PersonnelUnit() {
    $.ajax({
        url: baseUrl + "/tijian/userInfo?token=" + localStorage.getItem("token"),
        type: "get",
        xhrFields: {
            widthCredentials: true
        },
        success: function (res) {
            console.log(res);
            // console.log(res.data.hearthcardNum);
            $('.bzpeople').val(res.name);
            $('#hospitalNum').val(res.hospitalNum);
            $('.units').val(res.hospitalName);
            $('.healthnumber').val(res.healthNum);
            $('#IDnumber').val(res.number)
            if (res.status == "fail") {
                layer.msg('请登录账号', {
                    icon: 7
                });
                if (window != window.top) {
                    window.top.location = "/index.html";
                }
            }
        },
        error: function () {
            alert("服务器异常");
        }
    })
}
// 打印函数
function winPrint() {
    $('.box').show();
    bdhtml = window.document.body.innerHTML; //获取当前页的html代码
    sprnstr = "<!--stratprint-->"; //设置打印开始区域 
    eprnstr = "<!--endprint-->"; //设置打印结束区域 
    prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17); //从开始代码向后取html 
    prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
    window.document.body.innerHTML = prnhtml;
    window.print();
    window.document.body.innerHTML = bdhtml;
    location.reload();
    $('.box').hide();
}
// 详情
function xiangqing(dataId) {
    $.ajax({
        url: baseUrl + "/healthcard/saveAndDayin",
        type: 'post',
        xhrFields: {
            widthCredentials: true
        },
        data: JSON.stringify({
            "idCard": dataId
        }),
        contentType: "application/json;charset=UTF-8",
        dataType: 'json',
        success: function (res) {
            console.log(res);
            var medical = res.data.medical
            if (medical == 0) {
                medical = "合格"
            } else {
                medical = "不合格"
            }
            $('.name').text(res.data.name);
            $('.old').text(res.data.age);
            $('.sex').text(res.data.gender);
            $('.tj').text(medical);
            $('.dataTime').text(res.data.endTime);
            $('.erweima').attr('src', "data:image/jpg;base64," + res.data.qrCode);
            $('.zhang').attr('src', "data:image/jpg;base64," + res.data.gz);
            $('.personImg').attr('src', "data:image/jpg;base64," + res.data.idCardPhoto);
            $('.companyTitle').text(res.data.hospitalName);
            $('.card').text(res.data.healthNum);
            if (res.data.gz != "") {
                // console.log("公章")
                var timer = setInterval(function () {
                    winPrint();
                    clearInterval(timer)
                }, 500)
            } else {
                alert("公章不存在")
            }

        }
    })
}

// 基础录入
function saveDate() {
    var token = localStorage.getItem("token");
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
        hospitalNum = $('#hospitalNum').val(),
        idcardimg = basestr,
        sexList = "";
    if (sex == 1) {
        sexList = '男'
    } else {
        sexList = '女'
    }
    var data = {
        "number" : IDnumber,
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
        "deptNum": hospitalNum,
        "idcardPhoto": idcardimg,
        "nation": pNation,
        "starttime": pEffectDate,
        "psb": pDepartment,
        "endtime": pExpire,
        "hospitalNum": hospitalNum
    };
    $.ajax({
        type: "post",
        url: baseUrl + "/tijian/jc?token=" + token,
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(data),
        success: function (data) {
            alert (JSON.stringify(data))
            console.log(data);
            // alert(JSON.stringify(data));
            if (data.status == 200) {
                layer.msg("保存成功", {
                    icon: 1
                });
                jctable()
            } else {
                layer.msg("保存失败，原因为" + JSON.stringify(data.data), {
                    icon: 2
                });
                // console.log(data);
            }
        },
        error: function () {
            alert("失败");
        }
    });
}


// }


// 保存
$(function () {
    $('#keeper').click(function () {
        debugger
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
        hospitalNum = $('#hospitalNum').val(),
        idcardimg = basestr,
        sexList = "";
    if (sex == 1) {
        sexList = '男'
    } else {
        sexList = '女'
    }
        if (IDname == "" || company == "" || telphone == "" || idcardNum == "" || adress == "" || enddate == "" || age == "") {
            layer.msg('请将信息填入完整', {
                icon: 5
            });
        } else {
            saveDate();
        }
    })
})



function dataTables(baseData) {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#baseInput',
            height: 312,
            data: baseData,
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
                        sort: true,
                        even: 'setSign'
                    }, {
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
                        field: 'deptNum',
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
                $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
            }
        })
    })
}

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
                        sort: true,
                        even: 'setSign'
                    }, {
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
                        field: 'deptNum',
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
                $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
                if (res.data == "") {
                    $(".layui-table-init").html('<div class="layui-none">暂无数据</div>');
                }
            }
        })
    })
}


// 基础表格
function jctable() {
    $.ajax({
        type: 'post',
        url: baseUrl + "/tijian/getWeekData",
        contentType: "application/x-www-form-urlencoded",
        xhrFields: {
            widthCredentials: true
        },
        data: {
            "status": 0
        },
        success: function (res) {
            console.log(res)
            var baseData = res.data;
            var units = $('.units').val();
            $.each(baseData, function(i,n){
                n.deptNum = units;
            })
            dataTables(baseData)
        }
    })
}

function kstable() {
    $.ajax({
        url: baseUrl + "/tijian/getWeekData",
        contentType: "application/x-www-form-urlencoded",
        type: 'post',
        xhrFields: {
            widthCredentials: true
        },
        data: {
            "status": "1",
            "yuliu1":"1"
        },
        success: function (res) {
            console.log(res);
            var userData = res.data
            dataTable(userData)
        }
    })
}