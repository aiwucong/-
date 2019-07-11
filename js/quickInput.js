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
        // console.log(obj.tr) //得到当前行元素对象
        console.log(obj.data) //得到当前行数据
        localStorage.setItem("idCard", obj.data.idcardNum);
        $('#idcardimg').attr('src', "data:image/jpg;base64," + obj.data.idcardPhoto)
        console.log(obj.data.idcardPhoto)
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
            url: baseUrl + "/tijian/get?tjId=" + tjId,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            xhrFields: {
                widthCredentials: true
            },
            success: function (res) {
                console.log(res)
                var tjDate = {
                    "createTime": res.data.yuliu2,
                    "idcardNum": res.data.idcardNum,
                    "name": res.data.name,
                    "sex": res.data.sex,
                    "age": res.data.age,
                    "company": res.data.company,
                    "idcardPhoto": res.data.idcardPhoto,
                    "area": res.data.area,
                    "number": res.data.number,
                    "phone":res.data.telphone
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
                offset: '200px',
                btn1() {
                    // 确定按钮的回调
                    var deptNum = $('#deptNum').val();
                    // console.log(deptNum);
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
<<<<<<< Updated upstream
        auto: false,
        bindAction: '#comment-btn',
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                $('#idcardimg').attr('src', result);
            })
        },
        done: function (res) {
            // console.log(res)
        },
=======
        url:'',
        auto:false,
        bindAction:'#comment-btn',
        choose:function(obj){
            obj.preview(function(index,file,result){
                console.log(file)
                // let files = result; // 把整个base64给file
                // let name = "imageIndex" + ".png"; // 定义文件名字（例如：abc.png ， cover.png）
                // var type = "image/png"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
                // let conversions = base64ToBlob(files, type); // 调用base64转图片方法

                // // conversions就是转化之后的图片文件，

                // function base64ToBlob(urlData, type) {
                //     let arr = urlData.split(',');
                //     let mime = arr[0].match(/:(.*?);/)[1] || type;
                //     // 去掉url的头，并转化为byte
                //     let bytes = window.atob(arr[1]);
                //     // 处理异常,将ascii码小于0的转换为大于0
                //     let ab = new ArrayBuffer(bytes.length);
                //     // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
                //     let ia = new Uint8Array(ab);
                //     for (let i = 0; i < bytes.length; i++) {
                //         ia[i] = bytes.charCodeAt(i);
                //     }
                //     return new Blob([ab], {
                //         type: mime
                //     });
                // }       

                getWatermark(result,function(src){
                    var img = new Image();
                    img.onload = function() {
                    };
                    img.src = src;
                    document.body.appendChild(img);
                });
            //绘制canvas
                function getWatermark(url,cb) {
                    var img = new Image();
                    img.crossOrigin = 'Anonymous';//使用跨域图像
                    img.onload = function() {
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.width=img.width;
                        canvas.height=img.height;
                        var src = canvas.toDataURL('image/png');
                        cb(src);
                    };
                    img.src = url;
                    // console.log(src)
                    console.log(img.src)
                }
                    
                $('#idcardimg').attr('src', result);       
            })
        },
        done:function(res){
            console.log(res)
        },
        
>>>>>>> Stashed changes
    });


})


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
        idcardimg = $('#idcardimg')[0].src,
            sexList = "";
            var arr = idcardimg.split(',');
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
            "idcardPhoto": arr[1],
            "nation": pNation,
            "starttime": pEffectDate,
            "psb": pDepartment,
            "endtime": pExpire,
            "hospitalNum": hospitalNum
        };
        if (telphone == "" || telphone == undefined || telphone == null) {
            alert('请输入手机号')
            return;
        } else if (!(/^1[3456789]\d{9}$/.test(telphone))) {
            alert('请输入正确的手机号');
            return;
        } else {
            $.ajax({
                type: "post",
                url: baseUrl + "/tijian/add",
                contentType: "application/json;charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(data),
                success: function (data) {
                    // alert(JSON.stringify(data));
                    if (data.status == "100") {
                        alert("保存失败，原因为" + JSON.stringify(data.data));
                    } else if (data.status == '200') {
                        layer.msg("保存成功,正在请求打印请等待!!!",  {
                            offset: '200px'
                        });
                        // console.log(data.data.idcardNum);
                        var dataId = data.data.idcardNum;
                        xiangqing(dataId);
                        kstable();
                    }
                },
                error: function () {
                    alert("失败");
                }
            });
        }



    })
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
            layer.msg("请选择该成员打印信息",  {
                offset: '200px'
            })
        } else {
            // var dataId = data.data.idcardNum;
            layer.msg("正在处理打印数据请稍等", {
                icon: 16
            }, {
                offset: '200px'
            })
            xiangqing(dataId);
        }
    })

    // 读身份证
    // $('.readcard').click(function () {
    //     layui.use('form', function () {
    //         var form = layui.form;
    //         $.ajax({
    //             type: "get",
    //             url: IdUrl + "/card/get",
    //             async: true,
    //             contentType: "application/json",
    //             success: function (data) {
    //                 // console.log(data);
    //                 if (data.status == 100) {
    //                     alert(JSON.stringify((data.data)));
    //                 } else if (data.status == 200) {
    //                     pNation = data.pNation;
    //                     $('.IDname').val(data.pName);
    //                     $('#IDcard').val(data.pCertNo);
    //                     $('.address').val(data.pAddress);
    //                     $("#idcardimg").attr("src", "data:image/jpg;base64," + data.imgUrl);
    //                     // console.log(data.imgUrl);
    //                     pDepartment = data.pDepartment;
    //                     pEffectDate = data.pEffectDate;
    //                     pExpire = data.pExpire;
    //                     if (data.pSex === "男") {
    //                         $('#boy').attr('checked', true)
    //                         $('#girl').attr('checked', false)
    //                     } else {
    //                         $('#girl').attr('checked', true)
    //                         $('#boy').attr('checked', false)
    //                     }
    //                     //年龄计算	
    //                     var date = new Date();
    //                     var birth = data.pBirth;
    //                     var y1 = birth.toString().substring(-1, 4);
    //                     var year = date.getFullYear() - y1;
    //                     var m1 = birth.substring(4, 6);
    //                     var m2 = date.getMonth() + 1;
    //                     if (m1 < m2) {
    //                         // console.log(year)
    //                         $('#age').attr("value", year);
    //                     } else {
    //                         // console.log(year--)
    //                         $('#age').attr("value", year--);
    //                     }
    //                     form.render(); //更新全部   
    //                 }
    //             }
    //         });

    //     })

    // })
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
            $('.bzpeople').val(res.name);
            $('#hospitalNum').val(res.hospitalNum);
            $('.units').val(res.hospitalName);
            $('.healthnumber').val(res.healthNum);
            $('#IDnumber').val(res.number)
            if (res.status == "fail") {
                layer.msg('请登录账号', {
                    icon: 7
                }, {
                    offset: '200px'
                });
                if (window != window.top) {
                    setTimeout(function () {
                        window.top.location = "../index.html";
                    }, 2000)
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
            // console.log(res);
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
    $.ajax({
        type: "post",
        url: baseUrl + "/tijian/jc?token=" + token,
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(data),
        success: function (res) {
            console.log(res)
            if (res.status == "200") {
                // console.log(222);
                layer.msg("保存成功", {
                    offset: '200px'
                });
                jctable()
            } else if (res.status == "100") {
                layer.msg(res.data, {
                    icon: 2
                },{ offset: '50px'})
            }else{
                layer.msg(res.data)
                if(window != window.top){
                    location.href="../index-dept.html"
                }
                
            }
        },
        error: function () {
            console.log("失败");
        }
    });
}

// 保存
$(function () {
    $('#keeper').click(function () {
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
        console.log(idcardimg)
        if (sex == 1) {
            sexList = '男'
        } else {
            sexList = '女'
        }
        if (IDname == "" || company == "" || telphone == "" || idcardNum == "" || adress == "" || enddate == "" || age == "") {
            layer.msg('请将信息填入完整', {offset: '200px'});
        } else {
            saveDate();
        }
    })
})

layui.use('table', function () {
    var table = layui.table;
    table.render({
        elem: '#demo',
        height: 312,
        url: baseUrl + "/tijian/getWeekData?status=1" + "&yuliu1=1",
        method: 'post',
        page: true, //开启分页
        toolbar: '#toolbarDemo',
        parseData: function (res) {
            console.log(res)
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
                    fixed: 'left'
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
            console.log(res)
            $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
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
// 快速表格
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
            "yuliu1": "1"
        },
        success: function (res) {
            // console.log(res);
            if (res.status == "100") {
                $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
            } else if (res.status == "200") {
                var userData = res.data
                dataTable(userData)
            }
        }
    })
}