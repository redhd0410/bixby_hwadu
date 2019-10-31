module.exports.templateMaker = function (target, compare, TMax, TMin, yesMax, yesMin) {
  var template = ""

  if(yesMax > 0) {
    template = target+" 최고 기온은 "+compare+"보다 "+yesMax+"° 높은 "+TMax+"°, " 
  } else if (yesMax == 0){
    template = target+" 최고 기온은 전날과 같은"+TMax+"°, "
  } else {
    template = target+" 최고 기온은 "+compare+"보다 "+(-yesMax)+"° 낮은 "+TMax+"°, "
  }

  if(yesMin > 0) {
    template = template+"최저 기온은 "+compare+"보다 "+yesMin+"° 높은 "+TMin+"° 입니다."
  } else if (yesMin == 0){
    template = template+"최저 기온은 전날과 같은 "+TMax+"° 입니다."

  } else {
    template = template+"최저 기온은 "+compare+"보다 "+yesMin+"° 낮은 "+(-TMin)+"° 입니다."
    
  }

  return template
}

module.exports.nightUrlMaker = function (condition) {
  const console = require('console')
  var url
  switch (condition) {
    case "맑음":
      url = "/images/weather/nightSunny.png"
      break
    case "구름조금":
      url = "/images/weather/nightSunnywithCloud.png"
      break
    case "구름많음":
      url = "/images/weather/nightCloudywithSun.png"
      break
    case "구름많고 비":
      url = "/images/weather/nightCloudywithSunRainy.png"
      break
    case "구름많고 눈":
      url = "/images/weather/cloudywithSunSnowy.png"
      break
    case "구름많고 비 또는 눈":
      url = "/images/weather/nightCloudywithSunRainyorSnowy.png"
      break
    case "흐림":
      url = "/images/weather/cloudy.png"
      break
    case "흐리고 비":
      url = "/images/weather/cloudyRainy.png"
      break
    case "흐리고 눈":
      url = "/images/weather/cloudySnowy.png"
      break
    case "흐리고 비 또는 눈":
      url = "/images/weather/cloudyRainyorSnowy.png"
      break
    case "흐리고 낙뢰":
      url = "/images/weather/ThunderstormCloudy.png"
      break
    case "뇌우/비":
      url = "/images/weather/thunderstormRainy.png"
      break
    case "뇌우/눈":
      url = "/images/weather/nightThunderstormSnow.png"
      break
    case "뇌우/비 또는 눈":
      url = "/images/weather/thunderstormRainyorSnowy.png"
      break
  }
  return url
}

module.exports.afternoonUrlMaker = function (condition) {
  const console = require('console')
  var url
  switch (condition) {
    case "맑음":
      url = "/images/weather/sunny.png"
      break
    case "구름조금":
      url = "/images/weather/sunnywithCloud.png"
      break
    case "구름많음":
      url = "/images/weather/cloudywithSun.png"
      break
    case "구름많고 비":
      url = "/images/weather/cloudywithSunRainy.png"
      break
    case "구름많고 눈":
      url = "/images/weather/cloudywithSunSnowy.png"
      break
    case "구름많고 비 또는 눈":
      url = "/images/weather/cloudywithSunRainyorSnowy.png"
      break
    case "흐림":
      url = "/images/weather/cloudy.png"
      break
    case "흐리고 비":
      url = "/images/weather/cloudyRainy.png"
      break
    case "흐리고 눈":
      url = "/images/weather/cloudySnowy.png"
      break
    case "흐리고 비 또는 눈":
      url = "/images/weather/cloudyRainyorSnowy.png"
      break
    case "흐리고 낙뢰":
      url = "/images/weather/ThunderstormCloudy.png"
      break
    case "뇌우/비":
      url = "/images/weather/thunderstormRainy.png"
      break
    case "뇌우/눈":
      url = "/images/weather/thunderstormSnowy.png"
      break
    case "뇌우/비 또는 눈":
      url = "/images/weather/thunderstormRainyorSnowy.png"
      break
  }
  return url
}

module.exports.fineDustToString = function (fineDust) {
  var res = ""
  if (fineDust == 1) {
    res = "좋음"
  }
  else if (fineDust == 2) {
    res = "보통"
  }
  else if (fineDust == 3) {
    res = "나쁨"
  }
  else if (fineDust == 4) {
    res = "매우 나쁨"
  }
  else {
    res = "정보 없음"
  }
  return res
}

module.exports.fineDustImage = function (fineDust) {
  var url = ""
  if (fineDust == "좋음") {
    url = "/images/fineDust/1.png"
  }
  else if (fineDust == "보통") {
    url = "/images/fineDust/2.png"
  }
  else if (fineDust == "나쁨") {
    url = "/images/fineDust/3.png"
  }
  else if (fineDust == "매우 나쁨") {
    url = "/images/fineDust/4.png"
  }
  return url
}

module.exports.getalertAPI = function (point) {
  var alert = "https://apis.openapi.sk.com/weather/severe/alert"
  const http = require('http')
  const console = require('console')
  let options = {
    format: "json",
    headers: {
      'appKey': '4f906803-1214-4bfe-94bb-45259e71fac7'
    }, 
    query: {
      'version': '2',
      'lat': point.latitude, 
      'lon': point.longitude
    }
  }
  let data = http.getUrl(alert, options)
  return data.weather.alert
}

module.exports.getYesterdayWeatherAPI = function (point) {
  var yesterday = "https://apis.openapi.sk.com/weather/yesterday"
  const http = require('http')
  const console = require('console')
  let options = {
    format: "json",
    headers: {
      'appKey': '4f906803-1214-4bfe-94bb-45259e71fac7'
    }, 
    query: {
      'version': '2',
      'lat': point.latitude, 
      'lon': point.longitude
    }
  }
  let data = http.getUrl(yesterday, options)
  return data.weather.yesterday[0].day.temperature
}

module.exports.getFineDustAPI= function() {
  const http = require('http')
  const console = require('console')
  var fineDustAPI = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?pageNo=1&numOfRows=10&sidoName=서울&ServiceKey=2%2BERPeB3MlX%2BmFZQPy3N7BjsDmykveN4abcFaN1mEOFTxSuIFIiuvQ50l9nCV8%2FuWzra9ubQ1GcJWvfAFfqoKA%3D%3D&ver=1.3&_returnType=json"
  let data = http.getUrl(fineDustAPI)
  return JSON.parse(data).list[0]
} 

module.exports.getHumidex  = function (point) {
  var humidex = "https://apis.openapi.sk.com/weather/index/th"
  const http = require('http')
  const console = require('console')
  let options = {
    format: "json",
    headers: {
      'appKey': '4f906803-1214-4bfe-94bb-45259e71fac7'
    }, 
    query: {
      'version': '2',
      'lat': point.latitude, 
      'lon': point.longitude
    }
  }
  let data = http.getUrl(humidex, options)
  return data.weather.wIndex.thIndex[0].current.index

}

module.exports.getUVIndex  = function(point) {
  var uv = "https://apis.openapi.sk.com/weather/index/uv"
  const http = require('http')
  let options = {
    format: "json",
    headers: {
      'appKey': '4f906803-1214-4bfe-94bb-45259e71fac7'
    }, 
    query: {
      'version': '2',
      'lat': point.latitude, 
      'lon': point.longitude
    }
  }
  let data = http.getUrl(uv, options)

  return data.weather.wIndex

}

module.exports.getWinChillTempAPI = function(point) {
  var uv = "https://apis.openapi.sk.com/weather/index/wct"
  const http = require('http')
  let options = {
    format: "json",
    headers: {
      'appKey': '4f906803-1214-4bfe-94bb-45259e71fac7'
    }, 
    query: {
      'version': '2',
      'lat': point.latitude, 
      'lon': point.longitude
    }
  }
  let data = http.getUrl(uv, options)

  return data.weather.wIndex.wctIndex[0].current.index
}

module.exports.getSummaryAPI = function (point) {
  var summary = "https://apis.openapi.sk.com/weather/summary"
  const http = require('http')
  let options = {
    format: "json",
    headers: {
      'appKey': '4f906803-1214-4bfe-94bb-45259e71fac7'
    }, 
    query: {
      'version': '2',
      'lat': point.latitude, 
      'lon': point.longitude
    }
  }

  let data = http.getUrl(summary, options)

  return data.weather.summary[0]

}
