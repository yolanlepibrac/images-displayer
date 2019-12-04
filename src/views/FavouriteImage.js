
var m = require("mithril");
var State = require("./Global").state;
var GridElementsConstructor = require("../utils/GridElementsConstructor")
var DatabaseAPI = require("../API/DatabaseAPI");


module.exports = {
  oninit:function(vnode){
    vnode.state.current.src[vnode.attrs.key] = "./src/assets/heartBlack.png";
  },
  current:{
    src : {},
  },
  setHoverLike:function(key){
    this.current.src[key] = "./src/assets/cross.png";
  },
  setOutLike:function(key){
    this.current.src[key] = "./src/assets/heartBlack.png";
  },
  toggleLike:function(imageDatas){
    DatabaseAPI.togglePicture(State.username, imageDatas).then((result)=> {
      console.log(result)
    }).catch((error)=> {
      console.log(error)
    })
    State.favourites.splice(State.favourites.indexOf(imageDatas),1)
  },
  view:function(vnode){
    return m(".favouriteImageContainer",
      [m("img.imageCard", {
        src:vnode.attrs.imageData.data.download_url && typeof vnode.attrs.imageData.data.download_url === "string" ? GridElementsConstructor.setReduceImageUrl(vnode.attrs.imageData.data.download_url.split("/"),[1,1]) :
        ""
      }),
      m("div.textCard", vnode.attrs.imageData.data.author),
      m("img.likeButton",{
        src:this.current.src[vnode.attrs.key],
        onmouseover:() => {this.setHoverLike(vnode.attrs.key)},
        onmouseout:() => {this.setOutLike(vnode.attrs.key)},
        onclick:() => {this.toggleLike(vnode.attrs.imageData.data)}
      }, "Like")]
    )
  }
}
