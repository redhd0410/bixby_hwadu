module.exports.getAttireInfo = function (feelsLike) {
  const console = require('console')
  let attireList = require("./data/AttireList.js")

  let tops = []
  let bottoms = []
  let topUrls = []
  let bottomUrls = []

  let feelsLike = parseInt(feelsLike)

  if (feelsLike <= 5){
      console.log("5도 이하")
      for (var key in attireList[0].tops) {
        tops.push(attireList[0].tops[key])
      }
      for (var key in attireList[0].topUrls) {
        topUrls.push(attireList[0].topUrls[key])
      }
      for (var key in attireList[0].bottoms) {
        bottoms.push(attireList[0].bottoms[key])
      }
      for (var key in attireList[0].bottomUrls) {
        bottomUrls.push(attireList[0].bottomUrls[key])
      }
  }
  else if (6 <= feelsLike && feelsLike <= 9){
      console.log("6도 이상 9도 이하")
      for (var key in attireList[1].tops) {
        tops.push(attireList[1].tops[key])
      }
      for (var key in attireList[1].topUrls) {
        topUrls.push(attireList[1].topUrls[key])
      }
      for (var key in attireList[1].bottoms) {
        bottoms.push(attireList[1].bottoms[key])
      }
      for (var key in attireList[1].bottomUrls) {
        bottomUrls.push(attireList[1].bottomUrls[key])
      }
  }
  else if (10 <= feelsLike && feelsLike <= 11){
      console.log("10도 이상 11도 이하")
      for (var key in attireList[2].tops) {
        tops.push(attireList[2].tops[key])
      }
      for (var key in attireList[2].topUrls) {
        topUrls.push(attireList[2].topUrls[key])
      }
      for (var key in attireList[2].bottoms) {
        bottoms.push(attireList[2].bottoms[key])
      }
      for (var key in attireList[2].bottomUrls) {
        bottomUrls.push(attireList[2].bottomUrls[key])
      }
  }
  else if (12 <= feelsLike && feelsLike <= 16){
      console.log("12도 이상 16도 이하")
      for (var key in attireList[3].tops) {
        tops.push(attireList[3].tops[key])
      }
      for (var key in attireList[3].topUrls) {
        topUrls.push(attireList[3].topUrls[key])
      }
      for (var key in attireList[3].bottoms) {
        bottoms.push(attireList[3].bottoms[key])
      }
      for (var key in attireList[3].bottomUrls) {
        bottomUrls.push(attireList[3].bottomUrls[key])
      }
  }
  else if (17 <= feelsLike && feelsLike <= 19) {
      console.log("17도 이상 19도 이하")
      for (var key in attireList[4].tops) {
        tops.push(attireList[4].tops[key])
      }
      for (var key in attireList[4].topUrls) {
        topUrls.push(attireList[4].topUrls[key])
      }
      for (var key in attireList[4].bottoms) {
        bottoms.push(attireList[4].bottoms[key])
      }
      for (var key in attireList[4].bottomUrls) {
        bottomUrls.push(attireList[4].bottomUrls[key])
      }
  }
  else if (20 <= feelsLike && feelsLike <= 22) {
      console.log("20도 이상 22도 이하")
      for (var key in attireList[5].tops) {
        tops.push(attireList[5].tops[key])
      }
      for (var key in attireList[5].topUrls) {
        topUrls.push(attireList[5].topUrls[key])
      }
      for (var key in attireList[5].bottoms) {
        bottoms.push(attireList[5].bottoms[key])
      }
      for (var key in attireList[5].bottomUrls) {
        bottomUrls.push(attireList[5].bottomUrls[key])
      }
  }
  else if (23 <= feelsLike && feelsLike <= 26){
      console.log("23도 이상 26도 이하")
      for (var key in attireList[6].tops) {
        tops.push(attireList[6].tops[key])
      }
      for (var key in attireList[6].topUrls) {
        topUrls.push(attireList[6].topUrls[key])
      }
      for (var key in attireList[6].bottoms) {
        bottoms.push(attireList[6].bottoms[key])
      }
      for (var key in attireList[6].bottomUrls) {
        bottomUrls.push(attireList[6].bottomUrls[key])
      }
  }
  else {
      console.log("27도 이상")
      for (var key in attireList[7].tops) {
        tops.push(attireList[7].tops[key])
      }
      for (var key in attireList[7].topUrls) {
        topUrls.push(attireList[7].topUrls[key])
      }
      for (var key in attireList[7].bottoms) {
        bottoms.push(attireList[7].bottoms[key])
      }
      for (var key in attireList[7].bottomUrls) {
        bottomUrls.push(attireList[7].bottomUrls[key])
      }
  }

  let topResult=[];
  for (let i=0;i<tops.length; i++){
    let obj = {
      topName : tops[i],
      topUrl: topUrls[i]
    };
    topResult.push(obj);
  }

  let bottomResult=[];
  for (let i=0;i<bottoms.length; i++){
    let obj = {
      bottomName : bottoms[i],
      bottomUrl: bottomUrls[i]
    };
    bottomResult.push(obj);
  }

  return {
    top: topResult,
    bottom: bottomResult
  }
}