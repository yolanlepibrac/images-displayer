
var State = require("../views/Global").state;
var Constantes = require("../views/Global").constantes;


module.exports = {
  createElementForGrid:function(data){

    if(data === undefined || data === null){
      return
    }

    // Create object containing image data, its area on screen, its position in the grid, and a optimize source (depending on its dimensions)
    let newImagesArray = [];
    for (var i = 0; i < data.length; i++) {

      if(!data[i].download_url || typeof(data[i].download_url) !== "string"){return}

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

    if(area === undefined || area === null){
      return;
    }else if(typeof(area[0]) === "bigint" || typeof(area[1]) === "bigint"){
      return;
    }

    // Set the position of images in the grid
    let areaWasPosed = false
    let i = 0;
    let positionOfArea = []
    // loop on all position of the grid, until the image can be display
    // -> Possible Optimization : store the first line index of free position in grid -> to not loop on all the grid after some images are set
    while(areaWasPosed === false){
      for (var j = 0; j < Constantes.gridLength; j++) {
        let areaCanBePosedAtPosition = true;
        // loop on every position of the grid that the image will fill
        for (var posX = i; posX < i+area[0]; posX++) {
          for (var posY = j; posY < j+area[1]; posY++) {
            // State.grid.filledArea store the "already taken position" in an object
            if(State.grid.filledArea["[" + posX + "," + posY +"]"] === true || j+area[1]>Constantes.gridLength){
              // Check if position is free
              areaCanBePosedAtPosition = false;
            }
          }
        }
        if(areaCanBePosedAtPosition === true){
          positionOfArea = [i,j]
          for (var posX = i; posX < i+area[0]; posX++) {
            for (var posY = j; posY < j+area[1]; posY++) {
              // Store positions of image in the "already taken position" object
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

    if(res===undefined  || res===null || area===undefined  || area===null){return}

    let areaSize = area[0]*area[1];
    //Division of image size by 10 (to optimize loading) - then multiply by the surface it will take on screen (to not loose to much quality for large images)
    res[res.length-1] = Math.round(parseInt(res[res.length-1], 10)/10*areaSize);
    res[res.length-2] = Math.round(parseInt(res[res.length-2], 10)/10*areaSize);

    // Security to not overpass 5000/5000 size
    if(res[res.length-1] > 5000 || res[res.length-2] > 5000){
      let max = Math.max(res[res.length-1], res[res.length-2])
      if(max === res[res.length-1]){
        res[res.length-1] = res[res.length-1]*5000/res[res.length-1]
        res[res.length-2] = res[res.length-2]*5000/res[res.length-1]
      }else{
        res[res.length-1] = res[res.length-1]*5000/res[res.length-2]
        res[res.length-2] = res[res.length-2]*5000/res[res.length-2]
      }
    }

    let newSrc = "";
    for (var i = 0; i < res.length; i++) {
      if(i === res.length -1){
        newSrc = newSrc + res[i]
      }else{
        newSrc = newSrc + res[i] + "/"
      }
    }
    // Check if Images can be load or throw an error
    var checkIfImagesCanBeLoad = new Promise(function(resolve, reject){

      if (!window.fetch){return}

      fetch(newSrc).then((response) => {
        if(response.status === 200){
          //console.log(response)
          resolve(response)
        }else{
          console.log("error", response)
          reject(response)
        }
      })
    }).catch((error)=> {
      console.log(error)
    })

    return newSrc
  }
}
