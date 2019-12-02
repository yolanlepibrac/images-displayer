
var State = require("../views/Global").state;
var Constantes = require("../views/Global").constantes;


module.exports = {
  createElementForGrid:function(data){
    console.log(State.grid.filledArea);
    let newImagesArray = [];
    for (var i = 0; i < data.length; i++) {
      let url = data[i].download_url;
      let res = url.split("/");
      let area = this.defineArea(res[res.length-2],res[res.length-1]);
      let position = this.setPositionInGrid(area);
      let src = this.setReduceImageUrl(res, area);
      newImagesArray.push({
        data : data[i],
        area,
        position,
        src,
      })
    }
    return(newImagesArray)
  },
  defineArea:function(width, height){
    let ratio = width/height;
    // Defined the area the image will take, from its dimenstion
    // Grid is 1.5 width for 1 height
    let area =
      ratio < (0.5+0.75)/2 ?
        [3,1] :
      ratio < (0.75+1)/2 ?
        Math.random()<0.5 ? [2,1] : [4,2] :
      ratio < (1+1.5)/2 ?
        [3,2] :
      ratio < (1.5+2.25)/2 ?
        Math.random()<0.8 ? [1,1] : [2,2] :
      ratio < (2.25+2.75)/2 ?
        Math.random()<0.5 ? [1,2] : [2,4] :
      [1,3];
      return area
  },
  setPositionInGrid:function(area){
    //on store la premiere position de la grille pour pas reparcourir
    let areaWasPosed = false
    let i = 0;
    let positionOfArea = []
    while(areaWasPosed === false){
      for (var j = 0; j < Constantes.gridLength; j++) {
        let areaCanBePosedAtPosition = true;
        for (var posX = i; posX < i+area[0]; posX++) {
          for (var posY = j; posY < j+area[1]; posY++) {
            if(State.grid.filledArea["[" + posX + "," + posY +"]"] === true || j+area[1]>Constantes.gridLength){
              areaCanBePosedAtPosition = false;
            }
          }
        }
        if(areaCanBePosedAtPosition === true){
          positionOfArea = [i,j]
          for (var posX = i; posX < i+area[0]; posX++) {
            for (var posY = j; posY < j+area[1]; posY++) {
              State.grid.filledArea["[" + posX + "," + posY +"]"] = true
            }
          }
          areaWasPosed = true;
          break;
        }

      }
      i++
    }
    return positionOfArea;
  },
  setReduceImageUrl:function(res, area){
    let areaSize = area[0]*area[1];
    //Division of image size by 10 - then multiply by the surface it will take on screen
    res[res.length-1] = Math.round(parseInt(res[res.length-1], 10)/10*areaSize);
    res[res.length-2] = Math.round(parseInt(res[res.length-2], 10)/10*areaSize);

    let newSrc = "";
    for (var i = 0; i < res.length; i++) {
      if(i === res.length -1){
        newSrc = newSrc + res[i]
      }else{
        newSrc = newSrc + res[i] + "/"
      }
    }
    return newSrc
  }
}
