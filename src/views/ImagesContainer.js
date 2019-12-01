
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;
var Constantes = require("./Global").constantes;

module.exports = {
    current : {
      imagesArray : [],
      page : 0,
    },
    getImagesFromApi:function(page){
      PicsumAPI.getImagesFromApi()
      .then((response) => {
        console.log(response.data)
        this.current.page ++;
        State.imagesArray = State.imagesArray.concat(response.data);
        m.redraw()
      })
      .catch((error) => console.error(error))
    },
    view: function(vnode) {
      return m("#gridContainer", [
        m(m.route.Link, {href: "/connexion"}, m(".disconnect", "Disconnect"),),
        m(".getPic", {onclick: () => {this.getImagesFromApi()}}, "get Picture"),
        m(".gallery#homeGallery",
          State.imagesArray.map((imageData,index) => { return m(ClickableImage, {data:imageData, index:index}) })
        )
      ])
    }
}

var ClickableImage = {
  oninit:function(vnode){
    let url = vnode.attrs.data.download_url;
    let res = url.split("/");
    let area = this.defineArea(res[res.length-2],res[res.length-1])
    let position = this.setPositionInGrid(area)
    let newSrc = this.setReduceImageUrl(res, area)
  },
  current:{
    src:"",
    imageRatio:1,
    area:[0,0],
    areaSize:0,
    position:[0,0],
  },
  defineArea:function(width, height){
    let ratio = width/height;
    this.current.imageRatio = ratio
    // Defined the area the image will take, from its dimenstion
    // Grid is 1.5 width for 1 height
    let area =
      ratio < (0.5+0.75)/2 ?
        [3,1] :
      ratio < (0.75+1)/2 ?
        Math.random()<0.5 ? [2,1] : [4,2] :
      ratio < (1+1.5)/2 ?
        [3,2] :
      ratio < (1.5+2)/2 ?
        Math.random()<1/2 ? [1,1] : [2,2] :
      ratio < (2+3)/2 ?
        Math.random()<0.5 ? [1,2] : [2,4] :
      [1,3];
      this.current.area = area;
      return area
  },
  setPositionInGrid:function(area){
    //on store la premiere position de la grille pour pas reparcourir
    let areaWasPosed = false
    let i = State.grid.firstFreePosition
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
    console.log(positionOfArea)
    this.current.position = positionOfArea;
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
    this.current.src = newSrc;
    return newSrc
  },
  view:function(vnode){
    return m(".imageContainer", {
      style:{
        "grid-row-start": this.current.position[0]+1,
        "grid-row-end":this.current.position[0]+1 + this.current.area[0],
        "grid-column-start": this.current.position[1]+1,
        "grid-column-end": this.current.position[1]+1 + this.current.area[1],

      }
    },m("img.imageCard", {
        src:this.current.src,
        onclick:() => {

        }},
        vnode.attrs.data.author
      )
    )
  }
}
