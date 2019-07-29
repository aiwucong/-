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
    var tjId;
    table.on('rowDouble(test)', function (obj) {
        $('.tDates').val(undefined);
        localStorage.setItem("idCard", obj.data.idcardNum);
        $('#idcardimg').attr('src', "data:image/jpg;base64," + obj.data.idcardPhoto)
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
        tjId = obj.data.tjId;
    });


    //打印体检表事件
    $("#healtTable").on("click", "a", function () {
        var that = this;
        // alert(tjId)
        $.ajax({
            type: 'post',
            url: baseUrl + "/tijian/getTable?tjId=" + tjId,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            xhrFields: {
                widthCredentials: true
            },
            success: function (res) {
                var tjDate = {
                    "createTime": res.data.yuliu2,
                    "idcardNum": res.data.idcardNum,
                    "name": res.data.name,
                    "sex": res.data.sex,
                    "age": res.data.age,
                    "company": res.data.company,
                    "idcardPhoto": res.data.idcardPhoto,
                    "area": res.data.yuliu4,
                    "number": res.data.number,
                    "phone": res.data.telphone
                }
                var tjTables = JSON.stringify(tjDate);
                localStorage.setItem("tjtables", tjTables)
                window.parent.a(that)(); //调用父窗口的方法
            },
            error: function (data) {

            }

        })
    })
    // 头工具栏事件
    table.on('toolbar(test)', function (obj) {
        // 批量修改办证单位
        if (obj.event === 'batchMod') {
            var checkStatus = table.checkStatus(obj.config.id);
            var data = checkStatus.data;
            var arrs = [];
            for (var i = 0; i < data.length; i++) {
                arrs[i] = data[i].idcardNum;
            }
            var batchBox = layer.open({
                title: ['批量修改', 'font-size:18px; text-align: center;'],
                area: ['400px', '200px'],
                type: 1,
                content: $('#batchBox'),
                btn: ['确认', '取消'],
                offset: '200px',
                btn1() {
                    // 确定按钮的回调
                    var deptNum = $('#deptNum').val();
                    layer.msg('修改成功', {
                        offset: '200px'
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
        url: '',
        auto: false,
        bindAction: '#comment-btn',
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                getWatermark(result, function (src) {
                    var img = new Image();
                    img.onload = function () {};
                    img.src = src;
                    document.body.appendChild(img);
                });
                //绘制canvas
                function getWatermark(url, cb) {
                    var img = new Image();
                    img.crossOrigin = 'Anonymous'; //使用跨域图像
                    img.onload = function () {
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        var src = canvas.toDataURL('image/png');
                        cb(src);
                    };
                    img.src = url;
                }

                $('#idcardimg').attr('src', result);
            })
        },
        done: function (res) {},

    });
    // 页面刷新
    kstable()
    PersonnelUnit();
    sjDate();

function sjDate() {
    var date = new Date();
    document.getElementById("enddate").value = lay.digit(date.getFullYear() + 1) + '-' + lay.digit(date.getMonth() + 1) + '-' + lay.digit(date.getDate());
}

// 新增数据
var pDepartment;
var pEffectDate;
var pExpire;
var pNation;
$(function () {
    function kssavehs(status,backTracks) {
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
            idcardimg = $('#idcardimg')[0].src,
            sexList = "";
        var arr = idcardimg.split(',');
        if (sex == 1) {
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
            "deptNum": hospitalNum,
            "idcardPhoto": arr[1],
            "nation": pNation,
            "starttime": pEffectDate,
            "psb": pDepartment,
            "endtime": pExpire,
            "hospitalNum": hospitalNum,
            "yuliu3": deptNum
        };
        if (company == "" || company == undefined || company == null) {
            layer.msg('请输入工作单位', {
                offset: '100px'
            })
            return
        }
        if (telphone == "" || telphone == undefined || telphone == null) {
            layer.msg('请输入手机号', {
                offset: '100px'
            })
        } else if (!(/^1[3456789]\d{9}$/.test(telphone))) {
            layer.msg('请输入正确的手机号', {
                offset: '100px'
            });
        } else {
            if(backTracks == 0){
                $.ajax({
                    url:baseUrl + "/tijian/puluInfo?token=" + localStorage.getItem('token')+"&tjId="+tjId,
                    type:'post',
                    data:data,
                    success:function(data){
                        console.log(data)
                        if(data.status == 200){
                            layer.msg('补录成功',{offset:'200px'})
                            setTimeout(function(){
                                location.reload()
                            },1000)
                        }else if(data.status == 250){
                            layer.msg('登录过期',{offset:'200px'})
                            setTimeout(function(){
                                if (window != window.top) {
                                    window.top.location = "../login-dept.html"
                                }
                                },500)
                        }else {
                            layer.msg('补录失败',{offset:'200px'})
                            setTimeout(function(){
                                location.reload()
                            },1000)
                        }
                        
                    },
                    error:function(data){
                        console.log(data)
                    }
                })
            }else{
                $.ajax({
                    type: "post",
                    url:baseUrl + "/tijian/quickInput?token="+localStorage.getItem('token'),
                    data: data,
                    success: function (data) {
                        console.log(data)
                        // alert(JSON.stringify(data));
                        if (data.status == "100") {
                            layer.msg('保存失败', {
                                offset: '200px'
                            })
                            $('.tDates').val(undefined)
                        } else if (data.status == '200') {
                            console.log(data)
                            if (status == 0) {
                                layer.msg('保存成功', {
                                    offset: '200px'
                                })
                                setTimeout(function(){
                                    location.reload()
                                },500)
                                $('.tDates').val(undefined)
                            } else {
                                layer.msg("保存成功,正在请求打印请等待!!!", {
                                    offset: '200px'
                                });
                                var medical = data.data.medical
                                if (medical == 0) {
                                    medical = "合格"
                                } else {
                                    medical = "不合格"
                                }
                                $('.name').text(data.data.name);
                                $('.old').text(data.data.age + "岁");
                                $('.sex').text(data.data.gender);
                                $('.tj').text(medical);
                                $('.dataTime').text(data.data.endTime);
                                $('.erweima').attr('src', "data:image/jpg;base64," + data.data.qrCode);
                                $('.zhang').attr('src', "data:image/jpg;base64," + data.data.yuliu2);
                                $('.personImg').attr('src', "data:image/jpg;base64," + data.data.yuliu3);
                                $('.companyTitle').text(data.data.hospitalName);
                                $('.card').text(data.data.healthNum);
                                var timer = setInterval(function () {
                                    winPrint();
                                    clearInterval(timer)
                                }, 500)
    
                                kstable();
                            }
                        } else if (data.status == '250') {
                            layer.msg(data.data, {
                                offset: '200px'
                            })
                            if (window != window.top) {
                                window.top.location = "../login-dept.html"
                            }
                        } else if (data.status == 300) {
                            layer.msg(data.data, {
                                offset: '200px'
                            })
                            $('.tDates').val(undefined)
                        } else if (data.status == 400) {
                            layer.msg('健康证还在有效期内', {
                                offset: '200px'
                            })
                            $('.tDates').val(data.data)
                        } else {
                            if (data.data.errCode == 50002) {
                                layer.msg(data.data.errMsg, {
                                    offset: '200px'
                                })
                            } else if (data.data.errCode == 10002) {
                                layer.msg(data.data.errMsg, {
                                    offset: '200px'
                                })
                            } else if (data.data.errCode == 60001) {
                                layer.msg('登录过期', {
                                    offset: '200px'
                                })
                                setTimeout(function(){
                                if (window != window.top) {
                                    window.top.location = "../login-dept.html"
                                }
                                },500)
    
                            }
                        }
                    },
                    error: function () {
                        alert("失败");
                    }
                });
            }
        }
    }
    // 保存并打印
    $("#savePrint").on("click", function () {
        kssavehs(1)
    })
    // 保存
    $("#save").on("click", function () {
        kssavehs(0)
    })
    $('#ksBacks').click(function(){
        kssavehs('',0)
    })
    // 补录信息
   
    // 自定义弹框
    $('.custom').click(function () {
        var index = layer.open({
            title: ['自定义编号', 'font-size:18px; text-align: center;'],
            area: ['450px', '250px'],
            type: 1,
            content: $('#customBox'),
            btn: ['确认', '取消'],
            offset: '200px',
            btn1() {
                // 确定按钮的回调 
                var cusHtalthCard = $('#cusHtalthCard').val();
                var cusHtalthCard2 = $('#cusHtalthCard2').html();
                $('.healthnumber').attr("value", cusHtalthCard.toString() + cusHtalthCard2);
                layer.msg('修改成功', {
                    offset: '200px'
                });
                layer.close(index);
            }
        });
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
                offset: '200px'
            })
        } else {
            // var dataId = data.data.idcardNum;
            layer.msg("正在处理打印数据请稍等", {
                offset: '200px'
            })
            xiangqing(dataId);
        }
    })
    // 获取图片传值
    $('.btn1').click(function () {
        $.ajax({
            type: "post",
            url: IdUrl + "/changestatus/3",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function (data) {
                $("#idcardimg").attr("src", "data:image/jpg;base64," + data.photo);
            },
            error: function () {
                alert("失败");
            }
        });
    })

    function jckeephs(jcprintStatus,backTrack) {
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
            idcardimg = $('#idcardimg')[0].src,
            sexList = "";
        var arr = idcardimg.split(',');
        if (sex == 1) {
            sexList = '男'
        } else {
            sexList = '女'
        }
        var token = localStorage.getItem("token");
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
            "deptNum": hospitalNum,
            "idcardPhoto": arr[1],
            "nation": pNation,
            "starttime": pEffectDate,
            "psb": pDepartment,
            "endtime": pExpire,
            "hospitalNum": hospitalNum,
            "yuliu3": deptNum
        };
        if (IDname == "" || company == "" || telphone == "" || idcardNum == "" || adress == "" || enddate == "" || age == "") {
            layer.msg('请将信息填入完整', {
                offset: '200px'
            });
            return
        }
        if (!(/^1[3456789]\d{9}$/.test(telphone))) {
            layer.msg('请输入正确的手机号', {
                offset: '100px'
            });
            return
        }
        if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idcardNum))) {
            layer.msg('请输入正确的身份证号', {
                offset: '100px'
            });
        } else {
            if(backTrack == 0){
                $.ajax({
                    url:baseUrl + "/tijian/puluInfo?token=" + localStorage.getItem('token')+"&tjId="+tjId,
                    type:'post',
                    data:data,
                    success:function(data){
                        console.log(data)
                        if(data.status == 200){
                            layer.msg('补录成功',{offset:'200px'})
                            setTimeout(function(){
                                location.reload()
                            },1000)
                        }else if(data.status == 250){
                            layer.msg('登录过期',{offset:'200px'})
                            setTimeout(function(){
                                window.top.location = "../login-dept.html";
                            },1000)
                        }else {
                            layer.msg('补录失败',{offset:'200px'})
                            setTimeout(function(){
                                location.reload();
                            },1000)
                        }
                        
                    },
                    error:function(data){
                        console.log(data)
                    }
                })
            }else{
                $.ajax({
                    type: "post",
                    url: baseUrl + "/tijian/slowInput?token=" + token,
                    data: data,
                    success: function (res) {
                        console.log(res)
                        if (res.status == "200") {
                            if (jcprintStatus == 0) {
                                layer.msg("保存成功", {
                                    offset: '200px'
                                });
                                $('.tDates').val(undefined)
                                setTimeout(function(){
                                    location.reload()
                                },500)
                               
                            } else {
                                layer.msg("保存成功,请等待打印!!!", {
                                    offset: '200px'
                                });
                                jctable()
                                $('.dataTime').text(res.data.yuliu2)
                                $('#idcardNum').text(res.data.idcardNum)
                                $('.idname').text(res.data.name)
                                $('.age').text(res.data.age)
                                $('.sex').text(res.data.sex)
                                $('.company').text(res.data.company)
                                $('.area').text(res.data.yuliu4)
                                $('.number').text(res.data.number)
                                $(".idcardimg").attr("src", "data:image/jpg;base64," + res.data.idcardPhoto);
                                $(".p_phone").text(res.data.telphone)
                                var timer = setInterval(function () {
                                    winPrints();
                                    clearInterval(timer)
                                }, 500)
                            }
                        } else if (res.status == "100") {
                            $('.tDates').val(undefined)
                            layer.msg(res.data, {
                                offset: '200px'
                            })
                        } else if (res.status == 300) {
                            $('.tDates').val(undefined)
                            layer.msg(res.data, {
                                offset: '200px'
                            })
                        } else if (res.status == 400) {
                            layer.msg('健康证还在有效期内', {
                                offset: '200px'
                            })
                            $('.tDates').val(res.data)
                        } else if (res.status == '250') {
                            layer.msg(res.data)
                            if (window != window.top) {
                                window.top.location = "../login-dept.html";
                            }
                        } else {
                            if (res.data.errCode == 50002) {
                                layer.msg(res.data.errMsg, {
                                    offset: '200px'
                                })
                            } else if (res.data.errCode == 10002) {
                                layer.msg(res.data.errMsg, {
                                    offset: '200px'
                                })
                            }else if(res.data.errCode == 60001){
                                layer.msg('登录过期，请重新登录', {
                                    offset: '200px'
                                })
                                if (window != window.top) {
                                    setTimeout(function () {
                                        window.top.location = "../login-dept.html";
                                    }, 500)
                                }
                            }
                        }
                    },
                    error: function () {
                        console.log("失败");
                    }
                });
            }
            
        }
    }
    // 基础仅保存
    $('#keeper').click(function () {
        jckeephs(0)
    })
    // 保存并打印
    $('#keeprint').click(function () {
        jckeephs(1)
    })
    $('#backTrack').click(function(){
        jckeephs('',0)
    })
})

var startdate
// 返回办证单位函数
function PersonnelUnit() {
    $('.units').val(mainDatas.hospitalName);
    $('.bzpeople').val(mainDatas.name);
    var dates = new Date();
    var year = dates.getFullYear();
    var tjnum = Math.ceil((Math.random() * 9 + 1) * 100000);
    var healthnum = Math.ceil((Math.random() * 9 + 1) * 100000);
    $('#IDnumber').val("T" + year + tjnum)
    $('.healthnumber').val(mainDatas.nick + year + healthnum);
    $('#hospitalNum').val(mainDatas.hospitalNum)
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
// 打印体检表函数
function winPrints() {
    $('.box').show();
    bdhtml = window.document.body.innerHTML; //获取当前页的html代码
    sprnstr = "<!--stratprint1-->"; //设置打印开始区域 
    eprnstr = "<!--endprint1-->"; //设置打印结束区域 
    prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html 
    prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
    window.document.body.innerHTML = prnhtml;
    window.print();
    window.document.body.innerHTML = bdhtml;
    location.reload();
    $('.box').hide();
}
// 打印健康证详情
function xiangqing(dataId) {
    $.ajax({
        url: baseUrl + "/tijian/getCard?token=" + localStorage.getItem('token'),
        type: 'post',
        xhrFields: {
            widthCredentials: true
        },
        data: {
            "idCardNum": dataId
        },
        success: function (res) {
            console.log(res)
            if (res.status == 200) {
                var medical = res.data.medical
                if (medical == 0) {
                    medical = "合格"
                } else {
                    medical = "不合格"
                }
                $('.name').text(res.data.name);
                $('.old').text(res.data.age + "岁");
                $('.sex').text(res.data.gender);
                $('.tj').text(medical);
                $('.dataTime').text(res.data.endTime);
                $('.erweima').attr('src', "data:image/jpg;base64," + res.data.qrCode);
                $('.zhang').attr('src', "data:image/jpg;base64," + res.data.yuliu2);
                $('.personImg').attr('src', "data:image/jpg;base64," + res.data.yuliu3);
                $('.companyTitle').text(mainDatas.hospitalName);
                $('.card').text(res.data.healthNum);
                if (res.data.gz != "") {
                    var timer = setInterval(function () {
                        winPrint();
                        clearInterval(timer)
                    }, 500)
                } else {
                    layer.msg("公章不存在", {
                        offset: '200px'
                    })
                }
            } else {
                layer.msg('打印失败', {
                    offset: '200px'
                })
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
        deptNum = $(".units").val(),
        idcardimg = $('#idcardimg')[0].src,
        sexList = "";
    var arr = idcardimg.split(',');
    if (sex == 1) {
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
        "deptNum": hospitalNum,
        "idcardPhoto": arr[1],
        "nation": pNation,
        "starttime": pEffectDate,
        "psb": pDepartment,
        "endtime": pExpire,
        "hospitalNum": hospitalNum,
        "yuliu3": deptNum
    };
    if (!(/^1[3456789]\d{9}$/.test(telphone))) {
        layer.msg('请输入正确的手机号', {
            offset: '100px'
        });
        return
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idcardNum))) {
        layer.msg('请输入正确的身份证号', {
            offset: '100px'
        });
    } else {
        $.ajax({
            type: "post",
            url: baseUrl + "/tijian/jc?token=" + token,
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res)
                if (res.status == "200") {
                    layer.msg("保存成功", {
                        offset: '200px'
                    });
                    jctable()
                    $('.dataTime').text(res.data.createTime)
                    $('#idcardNum').text(res.data.idcardNum)
                    $('.idname').text(res.data.name)
                    $('.age').text(res.data.age)
                    $('.sex').text(res.data.sex)
                    $('.companyTitle').text(res.data.company)
                    $('.area').text(res.data.area)
                    $('.number').text(res.data.number)
                    $(".idcardimg").attr("src", "data:image/jpg;base64," + res.data.idcardPhoto);
                    $(".p_phone").text(res.data.telphone)
                    var timer = setInterval(function () {
                        winPrints();
                        clearInterval(timer)
                    }, 500)
                } else if (res.status == "100") {
                    layer.msg(res.data, {
                        icon: 2
                    }, {
                        offset: '50px'
                    })
                } else {
                    layer.msg(res.data, {
                        offset: '200px'
                    })
                    if (window != window.top) {
                        window.top.location = "../index.html";
                    }

                }
            },
            error: function () {
                console.log("失败");
            }
        });
    }
}

function kstable() {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#demo',
            height: 550,
            url: baseUrl + "/tijian/getWeekData?token=" + localStorage.getItem("token"),
            where: {
                status: 1,
                hospitalNum: mainDatas.hospitalNum
            },
            method: 'post',
            page: true, //开启分页
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                console.log(res)
                if (res.status == "250") {
                    layer.msg('账号登录过期,请重新登录!!!', {
                        offset: '100px'
                    })
                    if (window != window.top) {
                        setTimeout(function () {
                            window.top.location = "../index.html";
                        }, 500)
                    }
                }
                return {
                    "count": res.data.count,
                    "data": res.data.pageCount,
                    "status": res.status //code值为200表示成功
                };
            },
            response: {
                statusName: 'status',
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
                        field: 'number',
                        title: '体检编号',
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
                        field: 'yuliu3',
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


function dataTables(baseData) {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#baseInput',
            height: 550,
            data: baseData,
            page: true, //开启分页
            toolbar: '#toolbarDemo',
            cols: [
                [ //表头
                    {
                        field: 'number',
                        title: '体检编号',
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
                        field: 'yuliu3',
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

})