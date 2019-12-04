

var m = require("mithril");
var State = require("./Global").state;
var DatabaseAPI = require("../API/DatabaseAPI");



module.exports = {
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
    DatabaseAPI.togglePicture(State.username, imageDatas).then((result)=> {
      //console.log(result)
    }).catch((error)=> {
      //console.log(error)
    })
    State.favourites.map((favourite)=>favourite.id).includes(imageDatas.id) ?
      function(){
        State.favourites.splice(State.favourites.map((favourite)=>favourite.id).indexOf(imageDatas.id),1);
      }()
      :
      function(){
        State.favourites.push(imageDatas);
      }()
  },
  view:function(vnode){
    return vnode.attrs.imageData && m(".imageContainer", {
      style: vnode.attrs.imageData.position && vnode.attrs.imageData.position.length===2 && {
        // Position on the grid
        "grid-row-start":     vnode.attrs.imageData.position[0]+1,
        "grid-row-end":       vnode.attrs.imageData.position[0]+1 + vnode.attrs.imageData.area[0],
        "grid-column-start":  vnode.attrs.imageData.position[1]+1,
        "grid-column-end":    vnode.attrs.imageData.position[1]+1 + vnode.attrs.imageData.area[1],
      }
    },[m("img.imageCard", vnode.attrs.imageData.src && {
        src:vnode.attrs.imageData.src,
      }),
      vnode.attrs.imageData.data && m("div.textCard", vnode.attrs.imageData.data.author ? vnode.attrs.imageData.data.author : ""),
      m("img.likeButton",{
        src:State.favourites.length>0 && State.favourites.map((favourite)=>favourite.id).includes(vnode.attrs.imageData.data.id) ? "./src/assets/heartBlack.png" : this.current.src[vnode.attrs.key],
        onmouseover:() => {this.setHoverLike(vnode.attrs.key)},
        onmouseout:() => {this.setOutLike(vnode.attrs.key)},
        onclick:() => {this.toggleLike(vnode.attrs.imageData.data)}
      }, "Like")]
    )
  }
}
