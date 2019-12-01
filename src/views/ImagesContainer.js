
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;
var Constantes = require("./Global").constantes;
var GridElementsConstructor = require("../utils/GridElementsConstructor")

module.exports = {
    current : {
      imagesArray : [],
      page : 1,
    },
    getImagesFromApi:function(page){
      PicsumAPI.getImagesFromApi(this.current.page)
      .then((response) => {
        let newImagesArray = GridElementsConstructor.createElementForGrid(response.data);
        State.imagesArray = State.imagesArray.concat(newImagesArray);
        this.current.page = this.current.page+1;
        console.log(State.imagesArray)
        m.redraw()
      })
      .catch((error) => console.error(error))
    },
    view: function(vnode) {
      return m("#gridContainer", [
        m(m.route.Link, {href: "/connexion"}, m(".disconnect", "Disconnect"),),
        m(".getPic", {onclick: () => {this.getImagesFromApi(this.current.page)}}, "get Picture"),
        m(".gallery#homeGallery",
          State.imagesArray.map((imageData,index) => { return m(ClickableImage, {imageData:imageData, index:index}) })
        )
      ])
    }
}

var ClickableImage = {
  view:function(vnode){
    return m(".imageContainer", {
      key: vnode.attrs.index,
      style:{
        "grid-row-start": vnode.attrs.imageData.position[0]+1,
        "grid-row-end":vnode.attrs.imageData.position[0]+1 + vnode.attrs.imageData.area[0],
        "grid-column-start": vnode.attrs.imageData.position[1]+1,
        "grid-column-end": vnode.attrs.imageData.position[1]+1 + vnode.attrs.imageData.area[1],
      }
    },[m("img.imageCard", {
        src:vnode.attrs.imageData.src,
        onclick:() => {

        }},
      ),
      m("div.textCard", vnode.attrs.imageData.data.author)]
    )
  }
}
