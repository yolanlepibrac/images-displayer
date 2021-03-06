
var m = require("mithril");
var State = require("./Global").state;
var Home = require("./Home")
var Favourites = require("./Favourites")



module.exports = {
    oninit:function(){
      this.current.displayFavourites=false
    },
    current:{
      displayFavourites:false,
    },
    disconnect:function(){
      this.current.displayFavourites = false;
      this.reinitialisationOfGrid();
      State.favourites = [];
      State.username = "";
      State.connected=false;
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
      State.grid.firstFreePositionLine = 0;
      State.grid.filledArea = {};
    },
    toggleDisconnect:function(){
      State.connected = !State.connected
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
        this.current.displayFavourites ? m(Favourites, {globalState : State}) : m(Home, {globalState : State})
      ])
    }
}
