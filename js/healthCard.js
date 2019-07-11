// window.onload = function(){
//     let card = 
//     console.log(card)
//     let cardData = JSON.stringify(card);
//     console.log(cardData)
// }



var cardinfo = JSON.parse(sessionStorage.getItem("card"));

$('.name').text(cardinfo.name)
$('.age').text(cardinfo.age)
$('.sex').text(cardinfo.gender)
if(cardinfo.medical == 0){
    $('.tj').text("合格")
}else{
    $('.tj').text("不合格")
}
$('.stateData').text(cardinfo.health_num)
$('.healthData').text(cardinfo.end_time)
$('.healthBtn').text(cardinfo.hospitalNum)
$('.ewm').attr('src','data:image/jpg;base64,' + cardinfo.qr_code)
$('.imgs').attr('src','data:image/jpg;base64,' + cardinfo.photo)
$('.gz').attr('src','data:image/jpg;base64,' + cardinfo.gz)
console.log(cardinfo)