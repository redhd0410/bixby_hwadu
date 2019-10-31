module.exports.function = function GetTomorrowWeatherinfo(weather, point, attire, checkList){
  const console = require('console')
  const dates = require('dates')
  var weather = require('/utils/GetWeatherAPI.js')
  var attire = require('/utils/GetAttireInfo.js')
  var checkList = require('/utils/GetCheckListInfo.js')

  var tem = weather.getSummaryAPI(point)

  var TomTMax = Math.round(tem.tomorrow.temperature.tmax)
  var TomTMin = Math.round(tem.tomorrow.temperature.tmin)
  var toTMax = TomTMax - Math.round(tem.today.temperature.tmax)
  var toTMin = TomTMin - Math.round(tem.today.temperature.tmin)
  var template = weather.templateMaker("내일","오늘",TomTMax,TomTMin,toTMax,toTMin)

  var Tomorrow = dates.ZonedDateTime.now().plusDays(1).getDateTime()
  var condition = tem.tomorrow.sky.name
  var feelsLike = condition.includes("비") || condition.includes("흐") ? TomTMax - 4 : TomTMax - 1
  var fineDust = Math.round(weather.getFineDustAPI().pm10Value24)
  console.log(fineDust)
  var fineDustImage=""

  if (fineDust <= 15){
    var fineDustValueToString = "좋음"
    var fineDustImage = "images/fineDust/1.png"
  }
  else if (16 <= fineDust && fineDust <= 35){
    var fineDustValueToString = "보통"
    var fineDustImage = "images/fineDust/2.png"
  }
  else if(36 <= fineDust && fineDust <= 75){
    var fineDustValueToString = "나쁨"
    var fineDustImage = "images/fineDust/3.png"
  }
  else if(76 <= fineDust){
    var fineDustValueToString = "매우 나쁨"
    var fineDustImage = "images/fineDust/4.png"
  }

  console.log(fineDustValueToString)

  var month = Tomorrow.date.month
  var day = Tomorrow.date.day
  var time = parseInt(Tomorrow.time.hour)
  var weatherUrl = time <= 19 ? weather.afternoonUrlMaker(condition) : weather.nightUrlMaker(condition)
  var today = "내일, " + month + "월 " + day + "일"
  var UV = Math.round(weather.getUVIndex(point).uvindex[0].day01.index)

  var checkList = checkList.getCheckListInfo(UV, condition, "", feelsLike, 0)

  var top = attire.getAttireInfo(feelsLike).top

  var bottom = attire.getAttireInfo(feelsLike).bottom

  var attireInfo = {
    top: top, 
    bottom: bottom
  }

  return {
    TMax: TomTMax, 
    TMin: TomTMin, 
    template: template,
    condition: condition, 
    today: today,
    weatherUrl: weatherUrl,
    attireInfo: attireInfo,
    checkListInfo: checkList, 
    fineDust: fineDustValueToString,
    fineDustImage: fineDustImage
  }
}