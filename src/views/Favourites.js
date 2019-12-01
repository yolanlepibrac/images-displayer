
var m = require("mithril");
var State = require("./Global").state;
var Constantes = require("./Global").constantes;



module.exports = {

    view: function(vnode) {
      return m("#gridContainer", [
        State.connected &&
        m(".menuContainer", [
          m(".homeMenuButton", m(m.route.Link, {href: "/home"}, "Home")),
          m(".favouritesMenuButton", m(m.route.Link, {href: "/favourites"}, "Favourites")),
        ]),
        m(m.route.Link, {href: "/connexion"},
        m(".disconnect", {
          onclick:()=>{
            this.disconnect()
          }
        }, State.connected?"Disconnect":"Sign in"),),
        m(".gallery#homeGallery",
          State.favourites.map((imageData,index) => { return m("div", {key:index, imageData:imageData}, imageData.author) })
        )
      ])
    }
}
