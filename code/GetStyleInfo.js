module.exports.function = function getStlyeInfo(temperature, style, point) {
  const console = require('console')
  const dates = require('dates')
  var weather = require('/utils/GetWeatherAPI.js')
  var attire = require('/utils/GetAttireInfo.js')

  var feelsLike = Math.round(weather.getWinChillTempAPI(point))
  var month = dates.ZonedDateTime.now().getDateTime().date.month

  if (Object.keys(temperature).length != 0){
    var top = attire.getAttireInfo(temperature).top
    var bottom = attire.getAttireInfo(temperature).bottom
  } else {
    var top = attire.getAttireInfo(feelsLike).top
    var bottom = attire.getAttireInfo(feelsLike).bottom
  }

  var attireInfo = {
    top: top, 
    bottom: bottom
  }

  // var styleUrl = "www.google.com/search?q=site%3Anaver.com+가을옷&tbm=isch"
  var styleImage = [
    "images/autumn/1.jpg",
    "images/autumn/2.jpg",
    "images/autumn/3.jpg",
    "images/autumn/4.jpg",
    "images/autumn/5.jpg"
  ]

  var styleUrl = "https://www.styleshare.kr/feed/dailylook"

  return {
    styleImage: styleImage,
    styleUrl: styleUrl,
    attireInfo: attireInfo
  }
}
