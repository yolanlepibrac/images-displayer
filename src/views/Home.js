
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;
var DefaultState = require("./Global").defaultState
var Constantes = require("./Global").constantes;
var GridElementsConstructor = require("../utils/GridElementsConstructor");
var ImagesContainer = require("./ImagesContainer")

var canUpdate = true;
var homeGallery = document.getElementById('homeGallery');



var Home = {
    oninit:function(){
      PicsumAPI.getImagesFromApi()
      .then((response) => {
        State.imagesArray = GridElementsConstructor.createElementForGrid(response.data);
        m.redraw()
      })
      .catch((error) => console.error(error));


    },
    
    view: function(vnode) {
      return m(".gallery#homeGallery",
          State.imagesArray.map((imageData,index) => { return m(RandomImage, {key:index, imageData:imageData}) })
        )
    }
}

module.exports = Home

var RandomImage = {
  oninit:function(vnode){
    vnode.state.current.src[vnode.attrs.key] = "./src/assets/heartGrey.png";
  },
  current:{
    src : {},
  },
  setHoverLike:function(key){
    this.current.src[key] = "./src/assets/heartBlack.png";
  },
  setOutLike:function(key){
    this.current.src[key] = "./src/assets/heartGrey.png";
  },
  toggleLike:function(imageDatas){
    State.favourites.includes(imageDatas) ? State.favourites.splice(State.favourites.indexOf(imageDatas),1) : State.favourites.push(imageDatas)

  },
  view:function(vnode){
    return m(".imageContainer", {
      style:{
        "grid-row-start": vnode.attrs.imageData.position[0]+1,
        "grid-row-end":vnode.attrs.imageData.position[0]+1 + vnode.attrs.imageData.area[0],
        "grid-column-start": vnode.attrs.imageData.position[1]+1,
        "grid-column-end": vnode.attrs.imageData.position[1]+1 + vnode.attrs.imageData.area[1],
      }
    },[m("img.imageCard", {
        src:vnode.attrs.imageData.src,
      }),
      m("div.textCard", vnode.attrs.imageData.data.author),
      m("img.likeButton",{
        src:State.favourites.includes(vnode.attrs.imageData.data) ? "./src/assets/heartBlack.png" : this.current.src[vnode.attrs.key],
        onmouseover:() => {this.setHoverLike(vnode.attrs.key)},
        onmouseout:() => {this.setOutLike(vnode.attrs.key)},
        onclick:() => {this.toggleLike(vnode.attrs.imageData.data)}
      }, "Like")]
    )
  }
}
