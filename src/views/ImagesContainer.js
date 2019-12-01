
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;
var DefaultState = require("./Global").defaultState
var Constantes = require("./Global").constantes;
var GridElementsConstructor = require("../utils/GridElementsConstructor")

var canUpdate = true;

$(window).scroll(function() {
     if($(window).scrollTop() + 2*$(window).height() > $(document).height()) {
       if(canUpdate){
         canUpdate = false;
         setTimeout(function(){ canUpdate = true; }, 1000)

         PicsumAPI.getImagesFromApi(State.page)
         .then((response) => {
           let newImagesArray = GridElementsConstructor.createElementForGrid(response.data);
           State.imagesArray = State.imagesArray.concat(newImagesArray);
           State.page = State.page+1;
           console.log(State.imagesArray)
           m.redraw()
         })
         .catch((error) => console.error(error))
       }
     }
});

module.exports = {
    disconnect:function(){
      State.grid.firstFreePosition = 0;
      State.grid.filledArea = {};
    },
    view: function(vnode) {
      return m("#gridContainer", [
        State.connected &&
        m(".menuContainer", [
            m(m.route.Link, {href: "/home"}, m(".menuButton#homeMenuButton", "Home")),
            m(m.route.Link, {href: "/favourites"}, m(".menuButton#favouritesMenuButton", "Favourites"))
          ]
        ),
        m(m.route.Link, {href: "/connexion"},
        m(".disconnect", {
          onclick:()=>{
            this.disconnect()
          }
        }, State.connected?"Disconnect":"Sign in"),),
        m(".gallery#homeGallery",
          State.imagesArray.map((imageData,index) => { return m(RandomImage, {key:index, imageData:imageData}) })
        )
      ])
    }
}

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
