
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;
var GridElementsConstructor = require("../utils/GridElementsConstructor");
var RandomImage = require("./RandomImage");


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

module.exports = {
  oncreate:function(){
    setScrollToGallery()
  },
    oninit:function(vnode){
      PicsumAPI.getImagesFromApi()
      .then((response) => {
        State.imagesArray = GridElementsConstructor.createElementForGrid(response.data);
        m.redraw()
      })
      .catch((error) => console.error(error));
    },

    view: function(vnode) {
      return m(".gallery#homeGallery",
          (vnode.attrs.globalState && vnode.attrs.globalState.imagesArray && vnode.attrs.globalState.imagesArray.length>0) && vnode.attrs.globalState.imagesArray.map((imageData,index) => {
            if(imageData.data && typeof(imageData.data.id) === "string" && typeof(imageData.data.author) === "string" && typeof(imageData.src) === "string" && imageData.position.length===2 && imageData.area.length===2){
              return m(RandomImage, {key:index, imageData:imageData})
            }else{
              return m("", {key:index})
            }
          })
        )
    }
}
