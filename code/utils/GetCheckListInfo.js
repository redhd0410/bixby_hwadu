module.exports.getCheckListInfo = function (UV, condition, fineDust, feelsLike, humidity) {
  const console = require('console')
  var item = []
  var url = []

  if (50 <= UV) {
    item.push("썬크림")
    url.push("/images/checkList/sunblock.png")
    item.push("모자")
    url.push("/images/checkList/hat.png")
  }

  if (fineDust == "나쁨" || fineDust == "매우 나쁨") {
    item.push("마스크")
    url.push("/images/checkList/mask.png")
    item.push("창문 닫기")
    url.push("/images/checkList/winC.png")
  } else {
    item.push("환기")
    url.push("/images/checkList/winO.png")
  }

  if (condition.includes("비")) {
    item.push("우산")
    url.push("/images/checkList/umbrella.png")
    item.push("장화")
    url.push("/images/checkList/boots.png")
    item.push("창문 닫기")
    url.push("/images/checkList/winCR.png")
  }

  if (feelsLike <= 5){
    item.push("방한용품")
    url.push("/images/checkList/winterACC.png")
    item.push("장판 끄기")
    url.push("/images/checkList/off.png")
  } 

  if (feelsLike <= -15){
    item.push("동파 주의")
    url.push("/images/checkList/pipe.png")
  }

  if (feelsLike >=33){
    item.push("손풍기")
    url.push("/images/checkList/fan.png")
  }

  if (humidity >= 80) {
    item.push("고데기")
    url.push("/images/checkList/straightener.png")
  }

  if (item.length == 0){
    item.push("오늘은 준비물이 없어요. 오늘 날씨를 즐기세요!");
  }

  let result=[];
  for (let i=0;i<item.length; i++){
    let obj = {
      item : item[i],
      itemUrl: url[i]
    };
    result.push(obj);
  }

  console.log(humidity>=60)

  return result
}