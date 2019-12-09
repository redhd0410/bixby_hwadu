module.exports.function = function getStlyeInfo(temperature, style, point) {
  const console = require('console')
  const dates = require('dates')
  var weather = require('/utils/GetWeatherAPI.js')
  var attire = require('/utils/GetAttireInfo.js')

  var latitude = point.latitude
  var longitude = point.longitude

  var feelsLike = Math.round(weather.getDarkSkyCurrentAPI(latitude, longitude).feelsLike)
  var month = dates.ZonedDateTime.now().getDateTime().date.month
  var season = ""

  if (Object.keys(temperature).length != 0){
    var top = attire.getAttireInfo(temperature).top
    var bottom = attire.getAttireInfo(temperature).bottom
  } else {
    var top = attire.getAttireInfo(feelsLike).top
    var bottom = attire.getAttireInfo(feelsLike).bottom
  }

  if (feelsLike < 0) {
    season = "winter"
  } else if(1 <= feelsLike && feelsLike <= 10){
      season = "autumn"
  } else if(11 <= feelsLike && feelsLike <= 20){
      season = "spring"
  } else{
      season = "summer"
  }

  var attireInfo = {
    top: top, 
    bottom: bottom
  }

  // var styleUrl = "www.google.com/search?q=site%3Anaver.com+가을옷&tbm=isch"
  var styleImage = [
    "images/" + season + "/1.jpg",
    "images/" + season + "/2.jpg",
    "images/" + season + "/3.jpg",
    "images/" + season + "/4.jpg",
    "images/" + season + "/5.jpg"
  ]

  var styleUrl = "https://www.styleshare.kr/feed/dailylook"

  return {
    styleImage: styleImage,
    styleUrl: styleUrl,
    attireInfo: attireInfo
  }
}
