layui.use('table', function () {
    var table = layui.table;
    //第一个实例
    table.render({
      elem: '#result',
      height: '600',
      url: baseUrl + "/countData/healthCount?token=" + localStorage.getItem("token"),
      where: {
        areaNum: mainDatas.areaNum,
        hospitalNum:mainDatas.hospitalNum
      },
      method: 'post',
      parseData: function (res) {
        let datas = res.data.pageData;
        console.log(datas)
        if (datas != undefined) {
          $.each(datas, function (i, n) {
            n.yuliu4 = "身份证"
            if (n.status == 0) {
              n.status = "未审核"
            } else if (n.status == 1) {
              n.status = "合格"
            } else {
              n.status = "不合格"
            }
          })
        }
  
        return {
          "count": res.data.count,
          "data": res.data.pageData,
          "code": res.status //code值为200表示成功
        };
      },
      response: {
        statusName: 'code',
        statusCode: 200, // 对应 code自定义的参数名称
      },
      page: true //开启分页
        ,
      toolbar: '#toolbarDemo',
      cols: [
        [{
          field: 'title',
          title: '结果统计表',
          width: 100,
          colspan: 14
        }],
        [ //表头
          {
            width: 60,
            type: "checkbox",
            // fixed: 'left'
          },
          {
            field: 'yuliu4',
            title: '证件类型'
          },
          {
            field: 'yuliu3',
            title: '体检机构'
          },
          {
            field: 'hearthcardNum',
            title: '健康证号'
          },
          {
            field: 'startdate',
            title: '办证日期'
          }, 
          {
            field: 'createTime',
            title: '体检日期'
          },
          {
            field: 'name',
            title: '持证人'
          },
          {
            field: 'enddate',
            title: '有效期至'
          },
          {
            field: 'idcardNum',
            title: '身份证号码'
          },
          {
            field: 'name',
            title: '姓名'
          }, {
            field: 'sex',
            title: '性别'
          }, {
            field: 'age',
            title: '年龄'
          },
             {
            field: 'status',
            title: '体检状态'
          }
        ]
      ],
      done: function (res, curr, count) {
        if (res.code == "250") {
          layer.msg('账号登录过期,请重新登录', {offset:'200px'})
          if (window != window.top) {
            setTimeout(function () {
              window.top.location = "../login-dept.html";
            }, 500)
          }
        } else if (res.code == "150") {
          $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
        } else if (res.code == "400") {
          layer.msg('您没有查询该区域的权限！', {
            offset: '100px'
          }, )
          $(".layui-table-main").html('<div class="layui-none">该区域暂无数据</div>');
        }
        $(".layui-table-box").find("[data-field='title']").css({
          "text-align": "center",
          "font-size": "24px",
          "font-weight": "blod"
        });
      }
    });
  
  });