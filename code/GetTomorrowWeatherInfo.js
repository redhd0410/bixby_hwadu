module.exports.function = function GetTomorrowWeatherinfo(weather, point, attire, checkList, question, date){
  const console = require('console')
  const dates = require('dates')
  var weather = require('/utils/GetWeatherAPI.js')
  var attire = require('/utils/GetAttireInfo.js')
  var checkList = require('/utils/GetCheckListInfo.js')

  var latitude = point.latitude
  var longitude = point.longitude

  var tem = weather.getSummaryAPI(latitude, longitude)
  var darksky = weather.getDarkSkyTomAPI(latitude, longitude)

  var TomTMax = Math.round(tem.tomorrow.temperature.tmax)
  var TomTMin = Math.round(tem.tomorrow.temperature.tmin)
  var toTMax = TomTMax - Math.round(tem.today.temperature.tmax)
  var toTMin = TomTMin - Math.round(tem.today.temperature.tmin)
  var template = weather.templateMaker("내일","오늘",TomTMax,TomTMin,toTMax,toTMin)

  var Tomorrow = dates.ZonedDateTime.now().plusDays(1).getDateTime()
  var condition = tem.tomorrow.sky.name
  var feelsLike = condition.includes("비") || condition.includes("흐") ? TomTMax - 4 : TomTMax - 1
  var fineDust = Math.round(Number(weather.getFineDustAPI().pm10Value24))

  var fineDustImage=weather.fineDustImageByNum(fineDust)
  var month = Tomorrow.date.month
  var day = Tomorrow.date.day
  var time = parseInt(Tomorrow.time.hour)

  var weatherUrl = time <= 19 ? weather.afternoonUrlMaker(condition) : weather.nightUrlMaker(condition)
  console.log(condition)
  var today = "내일, " + month + "월 " + day + "일"
  
  var UV = Math.round(darksky.uv)

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
    fineDust: String(fineDust),
    fineDustImage: fineDustImage
  }
}