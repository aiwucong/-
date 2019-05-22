window.onload = function() {
    // console.log("werwf")
    $.ajax({
        url: "http://192.168.1.115:8086/tijian/daytjnum",
        type: "get",
        success: function(res) {
            // console.log(res);
            $('#tijian').text(res)
        },
        error: function() {
            console.log("服务器异常");
        }
    })

    $.ajax({
        url: "http://192.168.1.115:8086/deptorder/dayordernum",
        type: "get",
        success: function(res) {
            // console.log(res);
            $('#yuyue').text(res)

        },
        error: function() {
            console.log("服务器异常");
        }
    })

    $.ajax({
        url: "http://192.168.1.115:8086/healthcard/daycardnum",
        type: "get",
        success: function(res) {
            // console.log(res);
            $('#fazheng').text(res)

        },
        error: function() {
            console.log("服务器异常");
        }
    })


    $.ajax({
        url: "http://192.168.1.115:8086/tijian/monthtjnum",
        type: "get",
        success: function(res) {
            // console.log(res);
            $('#month-tijian').text(res)

        },
        error: function() {
            console.log("服务器异常");
        }
    })
    $.ajax({
        url: "http://192.168.1.115:8086/tijian/alltjnum",
        type: "get",
        success: function(res) {
            // console.log(res);
            $('#all_tijian').text(res)

        },
        error: function() {
            console.log("服务器异常");
        }
    })

    var names = []; //类别数组（实际用来盛放X轴坐标值）
    var nums = []; //销量数组（实际用来盛放Y坐标值）

    $.ajax({
        type: "get",
        async: true,
        url: "http://192.168.1.105:8086/tijian/weektjnum", //请求发送到TestServlet处
        data: {},
        success: function(result) {
            console.log(result);
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    var createTime = result[i].createTime.slice(5, 10)
                    names.push(result[i].createTime.slice(5, 10)); //挨个取出类别并填入类别数组
                    console.log(createTime)
                    console.log(names)
                }
                for (var i = 0; i < result.length; i++) {
                    nums.push(result[i].daycount); //挨个取出销量并填入销量数组
                }
                myChart.hideLoading(); //隐藏加载动画
                myChart.setOption({ //加载数据图表
                    xAxis: {
                        data: names

                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '销量',
                        data: nums
                    }]
                });

            }

        },
        error: function(errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            myChart.hideLoading();
        }
    })

}