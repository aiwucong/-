// layui.use('element', function() {          
//     var $ = layui.jquery,
//         element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

//     var active = {  
//         tabAdd: function(url, id, name) {
//             //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
//             //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分

//             element.tabAdd('demo', {
//                 title: name,
//                 content: '<iframe style="width: 100%;height:600px;position:absolute;top:82px;right:0;" data-frameid="' + id + '" scrolling="no" frameborder="0" src="' + url + '" style="width:100%;"></iframe>',
//                 id: id //规定好的id
//             })
//             element.render('tab');

//         },
//         tabChange: function(id) {
//             //切换到指定Tab项
//             element.tabChange('demo', id); //根据传入的id传入到指定的tab项
//         },
//         tabDelete: function(id) {
//             element.tabDelete("demo", id); //删除

//         },
//         tabDeleteAll: function(ids) { //删除所有
//             $.each(ids, function(i, item) {
//                 element.tabDelete("demo", item); //ids是一个数组，里面存放了多个id，调用tabDelete方法分别删除
//             })
//         }
//     };
//     //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
//     $('.leftdaohang').on('click', function() {
//         debugger
//         var dataid = $(this);
//         //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
//         if ($(".layui-tab-title li[lay-id]").length <= 0) {
//             //如果比零小，则直接打开新的tab项
//             $("#contentHolder").hide();
//             active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("mytitle"));
//         } else {
//             //否则判断该tab项是否以及存在
//             var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
//             $.each($(".layui-tab-title li[lay-id]"), function() {
//                 //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
//                 if ($(this).attr("lay-id") == dataid.attr("data-id")) {
//                     isData = true;
//                     alert($(this).attr("lay-id"))
//                 }
//             })
//             if (isData == false) {
//                 //标志为false 新增一个tab项
//                 active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("mytitle"));
//             }
//         }
//         //最后不管是否新增tab，最后都转到要打开的选项页面上
//         active.tabChange(dataid.attr("data-id"));
//     });

// });

layui.use('element', function() {           
    var $ = layui.jquery           ,
        element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
                //触发事件
               
    var active = {               
        tabAdd: function() {                    //新增一个Tab项
                               
            element.tabAdd('demo', {                       
                title: '新选项<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>' //用于演示
                                         ,
                content: '内容' + (Math.random() * 1000 | 0)                     ,
                id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
                                       
            });                    //增加点击关闭事件  
                               
            var r = $(".layui-tab-title").find("li");                    //每次新打开tab都是最后一个，所以只对最后一个tab添加点击关闭事件  
                               
            r.eq(r.length - 1).children("i").on("click", function() {                       
                alert($(this).parent("li").attr('lay-id'));                       
                element.tabDelete("demo", $(this).parent("li").attr('lay-id'));                   
            }), element.tabChange("demo", r.length - 1);                   
            element.init();               
        }             ,
        tabDelete: function(othis) {                  //删除指定Tab项
                             
            element.tabDelete('demo', '44'); //删除：“商品管理”

                             
            othis.addClass('layui-btn-disabled');             
        }             ,
        tabChange: function() {                  //切换到指定Tab项
                             
            element.tabChange('demo', '22'); //切换到：用户管理
                         
        }           
    };           
    $('.site-demo-active').on('click', function() {               
        var othis = $(this),
            type = othis.data('type');               
        active[type] ? active[type].call(this, othis) : '';           
    });            //Hash地址的定位
               
    var layid = location.hash.replace(/^#test=/, '');           
    element.tabChange('test', layid);           
    element.on('tab(test)', function(elem) {               
        location.hash = 'test=' + $(this).attr('lay-id');           
    });       
});