
// var baseUrl="http://192.168.1.110:8086";
var baseUrl="http://39.98.227.70:8082/mdk2019"; 
// var baseUrl="http://192.168.0.115:8082/mdk2019_war"; 
var IdUrl = "http://192.168.0.111:8080/card_project";


function queryParams(params){
    if (!params) return;
    var url = location.href,
        paraString = url.substring(url.indexOf('?') + 1, url.length).split('&'),
        paraObj = {};
    for (var i = 0,j = paraString[i];i<paraString.length; i++) {
        paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(
            j.indexOf('=') + 1,
            j.length
        );
    }
    var returnValue = paraObj[params.toLowerCase()];
    if (typeof returnValue === 'undefined') {
        return '';
    } else {
        if(returnValue.indexOf('#')>-1) {
            returnValue = returnValue.split('#')[0];
        }
        return returnValue;
    }
} /*获取url参数*/
//t添加cookie
function addCookie(objName,objValue,objHours){
    var str = objName + '=' + escape(objValue);
    if(objHours > 0){
        var data = new Date(),
            minute = objHours * 60 * 60 * 1000;
            data.setTime(data.getTime() + minute);
        str += ';path=/;expires=' + data.toUTCString();
    }
    document.cookie = str;
}
//找到你所储存的cookie名称
function getCookie(objName){
    var arrStr = document.cookie.split('; ');
    for(var i=0; i<arrStr.length;i++){
        var temp = arrStr[i].split('=');
        if(temp[0] === objName){
            return unescape(temp[1])
        }
    }
    return ''
}
//删除cookie
function delCookie(objName){
    var data = new Date();
    data.setTime(data.getTime() - 10);
    document.cookie = objName + '=; expire=' + data.toUTCString() + '; path=/'; 
}


