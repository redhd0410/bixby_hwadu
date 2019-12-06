module.exports.function = function getWeatherInfo (weather, point, attire, checkList) {
  const console = require('console')
  const dates = require('dates')
  var weather = require('/utils/GetWeatherAPI.js')
  var attire = require('/utils/GetAttireInfo.js')
  var checkList = require('/utils/GetCheckListInfo.js')

  var yes = weather.getYesterdayWeatherAPI(point)

  var hourly = 'https://apis.openapi.sk.com/weather/current/hourly'
  const http = require('http')

  let options = {
      format: 'json', 
      headers: {
        'accept': 'application/json',
      }, 
      query: {
        'appKey': '4f906803-1214-4bfe-94bb-45259e71fac7',
        'version': '2',
        'lat': point.latitude, 
        'lon': point.longitude
      }
    
  }
  let data = http.getUrl(hourly, options)

  var wind = Math.round(data.weather.hourly[0].wind.wspd)

  var condition = data.weather.hourly[0].sky.name

  var rain = Math.round(data.weather.hourly[0].precipitation.sinceOntime)
  
  var humidity = Math.round(data.weather.hourly[0].humidity)

  var TMin = Math.round(data.weather.hourly[0].temperature.tmin)

  var TC = Math.round(data.weather.hourly[0].temperature.tc)

  var TMax = Math.round(data.weather.hourly[0].temperature.tmax)

  var humidex = Math.round(weather.getHumidex(point))

  var UV = Math.round(weather.getUVIndex(point).uvindex[0].day00.index)

  var fineDust = weather.fineDustToString(Math.round(weather.getFineDustAPI(point).pm10Grade))

  var fineDustImage = weather.fineDustImage(fineDust)

  var feelsLike = Math.round(weather.getWinChillTempAPI(point))

  var yesMax = TMax - Math.round(yes.tmax)
  
  var yesMin = TMin - Math.round(yes.tmin)

  var alert = weather.getalertAPI(point).length == 0 ? "N" : weather.getalertAPI(point)[0].alert60.t1

  var month = dates.ZonedDateTime.now().getDateTime().date.month

  var day = dates.ZonedDateTime.now().getDateTime().date.day

  var time = parseInt(dates.ZonedDateTime.now().getDateTime().time.hour)

  var today = "오늘, " + month + "월 " + day + "일"
  
  var template = weather.templateMaker("오늘","어제",TMax, TMin, yesMax, yesMin)

  var weatherUrl = time <= 19 ? weather.afternoonUrlMaker(condition) : weather.nightUrlMaker(condition)

  var checkList = checkList.getCheckListInfo(UV, condition, fineDust, feelsLike, humidity)

  var top = attire.getAttireInfo(feelsLike).top

  var bottom = attire.getAttireInfo(feelsLike).bottom

  var attireInfo = {
    top: top, 
    bottom: bottom
  }

  return {
    wind: Number(wind), 
    rain: rain, 
    humidity: Number(humidity),
    condition: condition,
    TC: Number(TC), 
    TMin: Number(TMin), 
    TMax: Number(TMax), 
    humidex: Number(humidex), 
    UV: Number(UV),
    fineDust: fineDust,
    fineDustImage: fineDustImage,
    feelsLike: feelsLike,
    yesMax: yesMax, 
    yesMin: yesMin,
    alert: alert,
    today: today, 
    weatherUrl: weatherUrl, 
    attireInfo: attireInfo,
    checkListInfo: checkList,
    template: template
  }
}