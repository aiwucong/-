var cityQuery = {
  hos: "",
  city: "",
  querySelect: function () {
    var that = this;
    var opindex = $("#qu option:checked").val();
    that.city = opindex;
    var data = {
      "areaNum": opindex
    }
    $.ajax({
      type: "post",
      url: baseUrl + "/deptorder/selectNum",
      data: data,
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      success: function (res) {
        // console.log(res)
        var hosdata = res.data;
        // console.log(hosdata);
        let newData = hosdata.map(value => {
          return {
            hospitalName: value.hospitalName,
            hospitalNum: value.hospitalNum
          }
        })
        //  console.log(newData);
        var str = "";
        str += "<option value=''>请选择</option>"
        $.each(newData, function (i, n) {
          str += "<option value=" + n.hospitalNum + ">" + n.hospitalName + "</option>"
        })
        $('#hospial').append(str)
        $('#hospial').change(function () {
          that.hos = $(this).val()
          // console.log(that.hos)
        })
      },
      error: function () {
        console.log("没拿到数据")
      }
    });
  },
  init: function () {
    var that = this;
  }
}
cityQuery.init();
$(function () {
  $("#qu").change(function () {
    $("#hospial").children().remove()
    cityQuery.querySelect()
  })
  var map = {
    "tjid": "35"
  }

  function test() {
    $.ajax({
      type: "post",
      url: baseUrl + "/hospital/gethos",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: map,
      success: function (res) {
        // console.log("拿到了数据")
        // console.log(res)
      },
      error: function (res) {
        // console.log("没拿到数据")
      }

    });
  }
})
layui.use('table', function () {
  var table = layui.table;
  //第一个实例
  table.render({
    elem: '#tables',
    height: 'atuo',
    url: baseUrl + "/count/healthCount?token=" + localStorage.getItem("token"),
    method: 'post',
    parseData: function (res) {
      console.log(res)
      let datas = res.data.pageData;
      console.log(datas)
      if( datas != undefined){
        $.each(datas,function(i,n){
        if(n.status == 0){
          n.status = "未审核"
        } else if(n.status == 1){
          n.status = "审核通过"
        }else {
          n.status = "审核未通过"
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
      [ //表头
        {
          field: 'name',
          title: '姓名'
        }, {
          field: 'sex',
          title: '性别'
        }, {
          field: 'age',
          title: '年龄'
        }, {
          field: 'idcardNum',
          title: '身份证号码'
        }, {
          field: 'yuliu3',
          title: '体检机构'
        },
        {
          field: 'createTime',
          title: '体检日期'
        }, {
          field: 'hearthcardNum',
          title: '健康证编号'
        }, {
          field: 'startdate',
          title: '发证日期'
        }, {
          field: 'enddate',
          title: '有效期'
        }, {
          field: 'name',
          title: '持证人'
        }, {
          field: 'status',
          title: '体检状态'
        }
      ]
    ],
    done: function (res, curr, count) {
      console.log(res);
      if (res.code == "250") {
        layer.msg('账号登录过期,请重新登录', {
          icon: 4
        })
        if (window != window.top) {
          setTimeout(function () {
            window.top.location = "../login-pate2.html";
          }, 500)
        }
      } else if (res.code == "150") {
        $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
      } 
      else if(res.code == "400") {
          layer.msg('您没有查询该区域的权限！',{offset:'100px'},)
          $(".layui-table-main").html('<div class="layui-none">该区域暂无数据</div>');
      }

      //得到当前页码
      // console.log(curr); 
      //得到数据总量
      // console.log(count);
      $(".layui-table-box").find("[data-field='title']").css({
        "text-align": "center",
        "font-size": "24px",
        "font-weight": "blod"
      });
    }
  });
  var $ = layui.$,
  active = {
    reload: function () {
      //执行重载
      let opindex = $("#qu option:checked").val();
      let hos = $("#hospial option:checked").val();
      table.reload('tables', {
        page: {
          curr: 1 //重新从第 1 页开始
        },
        where: {
          "areaNum": opindex,
          "hospitalNum": hos
        }

      }, 'data')
    }
  };

$('#ShowDiv').on('click', function () {
  var type = $(this).data('type');
  active[type] ? active[type].call(this) : '';
});

});