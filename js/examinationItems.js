var examinationItems = {
    IDnumber:'',//体检编号
    healthnumber:'',//健康证号
    phonenumber:'',//手机号码
    IDname:'',//姓名
    age:'',//年龄
    IDcard:'',//身份证号
    startdate:"",//办证日期
    enddate:'',//结束日期
    bzpeople:'',//办证人员
    ganyan:'',//肝炎
    liji:'',//痢疾
    shanghan:'',//伤寒
    feijiehe:'',//肺结核
    pifubing:'',//皮肤病
    xin:'',//心
    fei:'',//肺
    shouxuan:'',//手癣
    zhijia:'',//指甲
    shoubu:'',//手部
    yingxie:'',//银屑
    shentou:'',//渗透性皮肤病
    huanong:'',//化脓性皮肤病
    gan:'',//肝
    pi:'',//脾
    Xxian:$('.Xxian'),//x线
    ganjun:$('.ganjun'),
    typhoid:$('.typhoid'),
    jiagan:'',
    wugan:'',
    sex:'',
    company:'',
    status:'',
    idcardPhoto:'',
    deptNum:'',
    // preserveBtn:$('#preserve'),//保存
    layuiTable:function(){//渲染表格
        var that = this;
        layui.use(['table','form'],function(){
            var table = layui.table;
            var form = layui.form;
            table.render({
                elem: '#demo',
                height: 550,
                url:baseUrl + "/tijian/getWeekDataTJ?TJproject=0&token="+localStorage.getItem("token"),
                // data: userData,
                page: true, //开启分页
                title:'渠道统计数据表',
                method:'POST',
                toolbar: '#toolbarDemo',
                parseData: function (res) {
                    return {
                        "count": res.data.count,
                        "data": res.data.pageData,
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
                            width: 120
                        }, {
                            field: 'name',
                            title: '姓名',
                            width: 80
                        }, {
                            field: 'sex',
                            title: '性别',
                            width: 60
                        }, {
                            field: 'age',
                            title: '年龄',
                            width: 60
                        }, {
                            field: 'startdate',
                            title: '办证日期',
                            width: 100
                        }, {
                            field: 'person',
                            title: '办证人员',
                            width: 100
                        }, {
                            field: 'telphone',
                            title: '手机号码',
                            width: 100
                        }, {
                            field: 'idcardNum',
                            title: '身份证号',
                            width: 100
                        },
                        {
                            field: 'hearthcardNum',
                            title: '健康证号',
                            width: 100
                        }
                    ]
                ],
                done: function (res, curr, count) { // 隐藏列
                    $(".layui-table-box").find("[data-field='idcardPhoto']").css("display", "none");
                    if(res.status == "250"){
                        if (window != window.top) {
                            setTimeout(function () {
                                window.top.location = "../index.html";
                            }, 500)
                        }
                    }
                }
            })
            table.on('row(test)', function(obj){
                var data = obj.data;
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
                that.sex = data.sex
                that.company = data.company
                that.idcardPhoto = data.idcardPhoto
                that.deptNum = data.deptNum
                that.status = data.status
                that.startdate = data.startdate
                that.IDnumber = data.number
                that.healthnumber = data.hearthcardNum
                that.phonenumber = data.telphone
                that.age = data.age,
                that.IDcard = data.idcardNum,
                that.IDname = data.name
                //标注选中样式
                obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
              });
        })
    },
    judgeIf:function(){
        var that = this;
        layui.use(['form','layer','jquery'],function(){
            var form = layui.form,
                $ = layui.jquery,
                layer = layui.layer;
            var shouxian = $("input:checkbox[name='like[shouxian]']:checked").length
            var zhijia = $("input:checkbox[name='like[zhijia]']:checked").length
            var shoubu = $("input:checkbox[name='like[shoubu]']:checked").length
            var yingxie = $("input:checkbox[name='like[yingxie]']:checked").length
            var shentou = $("input:checkbox[name='like[shentou]']:checked").length
            var huanong = $("input:checkbox[name='like[huanong]']:checked").length
            if($('.ganyan').val() == 0){
                that.ganyan = "正常"
            }else{
                that.ganyan = "不正常"
            }
            if($('.liji').val() == 0){
                that.liji = "正常"
            }else{
                that.liji = "不正常"
            }
            if($('.shanghan').val() == 0){
                that.shanghan = "正常"
            }else{
                that.shanghan = "不正常"
            }
            if($('.feijiehe').val() == 0){
                that.feijiehe = "正常"
            }else{
                that.feijiehe = "不正常"
            }
            if($('.pifubing').val() == 0){
                that.pifubing = "正常"
            }else{
                that.pifubing = "不正常"
            }
            if($('.xin').val() == 0){
                that.xin = "正常"
            }else{
                that.xin = "不正常"
            }
            if($('.fei').val() == 0){
                that.fei = "正常"
            }else{
                that.fei = "不正常"
            }
            if($('.gan').val() == 0){
                that.gan = "正常"
            }else{
                that.gan = "不正常"
            }
            if($('.pi').val() == 0){
                that.pi = "正常"
            }else{
                that.pi = "不正常"
            }
            if(shouxian == 0){
                that.shouxuan = "无"
            }else{
                that.shouxuan = "有"
            }
            if(huanong == 0){
                that.huanong = "无"
            }else{
                that.huanong = "有"
            }
            if(zhijia == 0){
                that.zhijia = "无"
            }else{
                that.zhijia = "有"
            }
            if(shoubu == 0){
                that.shoubu = "无"
            }else{
                that.shoubu = "有"
            }
            if(yingxie == 0){
                that.yingxie = "无"
            }else{
                that.yingxie = "有"
            }
            if(shentou == 0){
                that.shentou = "无"
            }else{
                that.shentou = "有"
            }
            form.on('radio(jiagan)', function (data) {
                if(data.value == 1){
                    that.jiagan == "阳性"
                }else{
                    that.jiagan == "阴性"
                }
                
            });
            form.on('radio(wugan)', function (data) {
                if(data.value == 1){
                    that.wugan == "阳性"
                }else{
                    that.wugan == "阴性"
                }
                
            });
        })
        
    },
    preserve:function(){
        var that = this;
        that.judgeIf()
        var data = {
            "number": that.IDnumber,
            "healthNum":that.healthnumber,
            "name":that.IDname,
            "sex":that.sex,
            "age":that.age,
            "idcardNum":that.IDcard,
            "company":that.company,
            "tjTime":that.startdate,
            "status":that.status,
            "hospitalNum":that.deptNum,
            "ganyan":that.ganyan,
            "liji":that.liji,
            "shanghan":that.shanghan,
            "feijiehe":that.feijiehe,
            "pifubing":that.pifubing,
            "xin":that.xin,
            "gan":that.gan,
            "pi":that.pi,
            "fei":that.fei,
            "sx":that.shouxuan,
            "zjx":that.zhijia,
            "sbst":that.shoubu,
            "yx":that.yingxie,
            "sc":that.shentou,
            "hn":that.huanong,
            "xPicture":that.Xxian.text(),
            "lj":that.ganjun.text(),
            "sh":that.typhoid.text(),
            "antiHav":that.jiagan,
            "antiHev":that.wugan,
            "qt":'',
            "alt":'',
            "idcardPhoto":that.idcardPhoto
        }
        if(that.IDnumber != ""){
            $.ajax({
                url: baseUrl + '/tjproject/tjAdd',
                data:JSON.stringify(data),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: 'json',
                xhrFields:{
                    widthCredentials:true
                  },
                success:function(res){
                    if(res.status == 200){
                        alert(res.data)
                        location.reload()
                    }
                }
            })
        }else{
            alert("请找到您所要填写的个人信息，单击表格选中")
        }
       
       
    },
    init:function(){
        var that = this;
        that.layuiTable();
    }
};
examinationItems.init();
$(function(){
    $('#preserve').on('click', function () {
        examinationItems.preserve()
    });
})
