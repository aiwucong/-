
window.onload = function () {
    $.ajax({
        url: baseUrl + '/countData/allCount?token=' + localStorage.getItem("token"),
        type: "post",
        data:{"hospitalNum":mainDatas.hospitalNum},
        success: function (res) {
            console.log(res)
            if (res.status == "250") {
                layui.use('layer',function(){
                    var layer = layui.layer;
                    layer.msg('账号登录过期,请重新登录',{offset:'100px'})
                })
                if (window != window.top) {
                    setTimeout(function () {
                        window.top.location = "../index.html";
                    }, 500)
                }
            } else{
                $('#tijian').text(res.data.day_tjcount)
                $('#yuyue').text(res.data.day_yuyue)
                $('#fazheng').text(res.data.day_fz)
                $('#month-tijian').text(res.data.month_tjcount)
                $('#all_tijian').text(res.data.all_tjcount)
            }
        },
        error: function () {
            console.log("服务器异常");
        }
    })


    var names = []; //一周时间数组（实际用来盛放X轴坐标值）
    var nums = []; //当日体检人数数组（实际用来盛放Y坐标值）
    var cardNum = []; //当日发证人数
    $.ajax({
        type: "post",
        async: true,
        url: baseUrl + '/countData/tjAddfzWeekData?token='+localStorage.getItem("token"), 
        data:{"hospitalNum":mainDatas.hospitalNum},
        success: function (result) {
            console.log(result)
            if (result.status == "success") {
                names = Object.keys(result.data.tj);
                nums = Object.values(result.data.tj);
                cardNum = Object.values(result.data.card);
            }

            myChart.hideLoading(); //隐藏加载动画
            myChart.setOption({ //加载数据图表
                xAxis: {
                    data: names
                },
                series: [{
                    // 根据名字对应到相应的系列
                    name: '当日体检人数',
                    data: nums
                }, {
                    name: '当日发证人数',
                    data: cardNum
                }]
            });
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            myChart.hideLoading();
        }
    })


}