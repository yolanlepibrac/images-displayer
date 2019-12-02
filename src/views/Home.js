
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;
var DefaultState = require("./Global").defaultState
var Constantes = require("./Global").constantes;
var GridElementsConstructor = require("../utils/GridElementsConstructor");
var ImagesContainer = require("./ImagesContainer")

var homeGallery = document.getElementById('homeGallery');


var setImagesToState = function(){
    PicsumAPI.getImagesFromApi(State.page)
    .then((response) => {
      let newImagesArray = GridElementsConstructor.createElementForGrid(response.data);
      State.imagesArray = State.imagesArray.concat(newImagesArray);
      State.page = State.page+1;
      m.redraw()
    })
    .catch((error) => console.error(error))
}

var canUpdate = true;
var setScrollToGallery = function(){
  $("#homeGallery").on('scroll', function () {
    if($("#homeGallery").scrollTop() + 2*$("#homeGallery").innerHeight() > $("#homeGallery").prop('scrollHeight')) {
      if(canUpdate){
        canUpdate = false;
        setTimeout(function(){ canUpdate = true; }, 1000)
        setImagesToState()
      }
    }
  });
}

var Home = {
  oncreate:function(){
    setScrollToGallery()
  },
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
    State.favourites.map((favourite)=>favourite.id).includes(imageDatas.id) ? State.favourites.splice(State.favourites.map((favourite)=>favourite.id).indexOf(imageDatas.id),1) : State.favourites.push(imageDatas)

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
        src:State.favourites.map((favourite)=>favourite.id).includes(vnode.attrs.imageData.data.id) ? "./src/assets/heartBlack.png" : this.current.src[vnode.attrs.key],
        onmouseover:() => {this.setHoverLike(vnode.attrs.key)},
        onmouseout:() => {this.setOutLike(vnode.attrs.key)},
        onclick:() => {this.toggleLike(vnode.attrs.imageData.data)}
      }, "Like")]
    )
  }
}
