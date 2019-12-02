
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;
var DefaultState = require("./Global").defaultState
var Constantes = require("./Global").constantes;
var GridElementsConstructor = require("../utils/GridElementsConstructor")
var Home = require("./Home")
var Favourites = require("./Favourites")



var setImagesToState = function(){
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
    current:{
      displayFavourites:false
    },
    disconnect:function(){
      this.reinitialisationOfGrid();
      State.connected=false
    },
    onNavigateHome:function(){
      this.current.displayFavourites = false;
      this.reinitialisationOfGrid()
    },
    onNavigateFavourites:function(){
      this.current.displayFavourites = true;
      this.reinitialisationOfGrid()
    },
    reinitialisationOfGrid:function(){
      State.grid.firstFreePosition = 0;
      State.grid.filledArea = {};
    },
    view: function(vnode) {
      return m("#imagesContainer", [
        State.connected &&
        m(".menuContainer", [
            m(".menuButton#homeMenuButton", {onclick:()=>{this.onNavigateHome()}}, "Home"),
            m(".menuButton#favouritesMenuButton", {onclick:()=>{this.onNavigateFavourites()}}, "Favourites")
          ]
        ),
        m(m.route.Link, {href: "/connexion"},
        m(".disconnect", {
          onclick:()=>{
            this.disconnect()
          }
        }, State.connected?"Disconnect":"Sign in"),),
        this.current.displayFavourites ? m(Favourites) : m(Home)
      ])
    }
}
