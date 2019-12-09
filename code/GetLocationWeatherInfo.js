module.exports.function = function getLocationWeatherInfo (location, weather, checkList) {
  const http = require('http')
  const console = require('console')
  const dates = require('dates')

  var weather = require('/utils/GetWeatherAPI.js')
  var attire = require('/utils/GetAttireInfo.js')
  var checkList = require('/utils/GetCheckListInfo.js')

  var latitude = location.latitude
  var longitude = location.longitude

  var yes = weather.getYesterdayWeatherAPI(latitude, longitude)
  var darksky = weather.getDarkSkyCurrentAPI(latitude, longitude)

  var hourly = 'https://apis.openapi.sk.com/weather/current/hourly'

  let options = {
      format: 'json', 
      headers: {
        'accept': 'application/json',
      }, 
      query: {
        'appKey': '4f906803-1214-4bfe-94bb-45259e71fac7',
        'version': '2',
        'lat': latitude, 
        'lon': longitude
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

  var humidex = Math.round(weather.getHumidex(latitude, longitude))

  var UV = Math.round(darksky.uv)

  var fineDust = weather.fineDustToString(Math.round(weather.getFineDustAPI(latitude, longitude).pm10Grade))

  var fineDustImage = weather.fineDustImage(fineDust)

  var feelsLike = Math.round(darksky.feelsLike)

  var yesMax = TMax - Math.round(yes.tmax)
  
  var yesMin = TMin - Math.round(yes.tmin)

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
    today: today, 
    weatherUrl: weatherUrl, 
    attireInfo: attireInfo,
    checkListInfo: checkList,
    template: template
  }
}