
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;
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

    view: function(vnode) {
      return m("#gridContainer", [
        m(m.route.Link, {href: "/connexion"}, m(".disconnect", "Disconnect"),),
        m(".gallery#homeGallery",
          State.imagesArray.map((imageData,index) => { return m(ClickableImage, {imageData:imageData, index:index}) })
        )
      ])
    }
}

var ClickableImage = {
  oninit:function(vnode){
    console.log(vnode.attrs)
  },
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
