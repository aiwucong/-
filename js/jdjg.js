// layui.use('table', function(){
//     var table = layui.table;   
//     //第一个实例
//     table.render({
//       elem: '#tables'
//       ,height: 312 ,
//       url:baseUrl + "/count/healthCount"
//       ,page: true //开启分页
//       ,toolbar: '#toolbarDemo',
//       cols: [[ //表头
//         {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
//         ,{field: 'username', title: '用户名', width:80}
//         ,{field: 'sex', title: '性别', width:80, sort: true}
//         ,{field: 'city', title: '城市', width:80} 
//         ,{field: 'sign', title: '签名', width: 177}
//         ,{field: 'experience', title: '积分', width: 80, sort: true}
//         ,{field: 'score', title: '评分', width: 80, sort: true}
//         ,{field: 'classify', title: '职业', width: 80}
//         ,{field: 'wealth', title: '财富', width: 135, sort: true}
//       ]]
//     });

//   });

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
        console.log(res)
        var hosdata = res.data;
        var str = "";
        str += "<option>--请选择--</option>"
        $.each(hosdata, function (i, n) {
          str += "<option value=" + i + ">" + n + "</option>"
        })
        $('#hospial').append(str)
        // var hosl = hos
        $('#hospial').change(function () {
          that.hos = $(this).val()

          console.log(that.hos)
        })
      },
      error: function () {
        console.log("没拿到数据")
      }
    });
  },
  tableStatistics: function () {
    var that = this;
    $.ajax({
      url: baseUrl + "/count/healthCount?token=" + localStorage.getItem("token"),
      type: "post",
      dataType: 'json',
      contentType: "application/json",
      data: JSON.stringify({
        "areaNum": that.city,
        "hospitalNum": that.hos
      }),
      xhrFields: {
        widthCredentials: true
      },
      success: function (res) {
        console.log(res);
        if (res.status == "200") {
          var userData = res.data;
          console.log(userData)
          that.dataTable(userData);
          $.each(userData, function(i,n){
            if(n.status == "0"){
              n.status = "未审核"
            }else if(n.status == "1"){
              n.status = "合格"
            }else{
              n.status = "不合格"
            }
          })
        } else if (res.status == "300") {
          alert('请重新登录账号');
          location.href = "login-pate2.html"
        } else if (res.status == "100") {
          alert('该区域无数据');
        }
      }

    })
  },
  dataTable: function (userData) {
    layui.use('table', function () {
      var table = layui.table;
      //第一个实例
      table.render({
        elem: '#tables',
        height: 312,
        data: userData,
        page: true //开启分页
          ,
        toolbar: '#toolbarDemo',
        cols: [
          [ //表头
             {
              field: 'name',
              title: '姓名',
              width: 80
            }, {
              field: 'sex',
              title: '性别',
              width: 80
            }, {
              field: 'age',
              title: '年龄',
              width: 80
            }, {
              field: 'idcardNum',
              title: '身份证号码',
              width: 177
            }, {
              field: 'tjhospital',
              title: '体检机构',
              width: 80
            }, 
            {
              field: 'createTime',
              title: '体检日期',
              width: 135
            },{
              field: 'hearthcardNum',
              title: '健康证编号',
              width: 80
            }, {
              field: 'startdate',
              title: '发证日期',
              width: 80
            }, {
              field: 'enddate',
              title: '有效期',
              width: 135
            },{
              field: 'name',
              title: '持证人',
              width: 135
            },{
              field: 'status',
              title: '体检状态',
              width: 135
            }
          ]
        ]
      });

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
  $('#ShowDiv').on('click', function () {
    cityQuery.tableStatistics()


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
        console.log("拿到了数据")
        console.log(res)
      },
      error: function (res) {
        console.log("没拿到数据")
      }

    });
  }
})