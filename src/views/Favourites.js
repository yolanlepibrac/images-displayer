
var m = require("mithril");
var State = require("./Global").state;
var Constantes = require("./Global").constantes;
var GridElementsConstructor = require("../utils/GridElementsConstructor")



module.exports = {
    view: function(vnode) {
      return m("#gridContainer", [
        State.connected &&
        State.favourites.length>0 ? m(".gallery#favouriteGallery",
            State.favourites.map((imageData,index) => { return m(FavouriteImage, {key:index, imageData:{data:imageData}}) })
          )
          :
          m(".noFavouritesMessage", "You do not have favourites yet")
      ])
    }
}

var FavouriteImage = {
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
    State.favourites.splice(State.favourites.indexOf(imageDatas),1)
  },
  view:function(vnode){
    return m(".favouriteImageContainer",
      [m("img.imageCard", {
        src:GridElementsConstructor.setReduceImageUrl(vnode.attrs.imageData.data.download_url.split("/"),[1,1]),
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
