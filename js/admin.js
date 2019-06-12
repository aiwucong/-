window.onload = function() {
    $.ajax({
        url: baseUrl+'/tubiao/allCount',
        type: "get",
        success:function(res){
            console.log(res);
            $('#tijian').text(res.data.daytjnum)
            $('#yuyue').text(res.data.dayordernum)
            $('#fazheng').text(res.data.daycardnum)
            $('#month-tijian').text(res.data.monthtjnum)
            $('#all_tijian').text(res.data.alltjnum)
        },
        error: function() {
            console.log("服务器异常");
        }
    })


    var names = []; //一周时间数组（实际用来盛放X轴坐标值）
    var nums = []; //当日体检人数数组（实际用来盛放Y坐标值）
    var cardNum = [];//当日发证人数
    $.ajax({
        type: "get",
        async: true,
        url: baseUrl + '/tubiao/zhucountone',   //请求发送到TestServlet处
        data: {},
        success: function(result) {
            // alert(result);
            var result = result.data;
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                if(result.day0 == undefined){
                    result.day0 = "暂无数据"
                }
                if(result.day1 == undefined){
                    result.day1 = "暂无数据"
                }
                if(result.day2 == undefined){
                    result.day2 = "暂无数据"
                }
                if(result.day3 == undefined){
                    result.day3 = "暂无数据"
                } 
                if(result.day4 == undefined){
                    result.day4 = "暂无数据"
                }
                if(result.tjdaynum0 == undefined){
                    result.tjdaynum0 =  0
                }
                if(result.tjdaynum1 == undefined){
                    result.tjdaynum1 = 0
                }
                if(result.tjdaynum2 == undefined){
                    result.tjdaynum2 = 0
                }
                if(result.tjdaynum3 == undefined){
                    result.tjdaynum3 = 0
                } 
                if(result.tjdaynum4 == undefined){
                    result.tjdaynum4 = 0
                }
                names = [result.day0.slice(0, 10),result.day1.slice(0, 10),result.day2.slice(0, 10),result.day3.slice(0, 10),result.day4.slice(0, 10)]
               
               
                nums = [result.tjdaynum0,result.tjdaynum1,result.tjdaynum2,result.tjdaynum3,result.tjdaynum4]
                cardNum = [result.carddaynum0,result.carddaynum1,result.carddaynum2,result.carddaynum3,result.carddaynum4]
                myChart.hideLoading(); //隐藏加载动画
                myChart.setOption({ //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '当日体检人数',
                        data: nums
                    },{
                        name: '当日发证人数',
                        data: cardNum
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