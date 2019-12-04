
var m = require("mithril");
var FavouriteImage = require("./FavouriteImage");

module.exports = {
    view: function(vnode) {
      return m("#gridContainer", [
        vnode.attrs.globalState.connected &&
        vnode.attrs.globalState.favourites.length>0 ? m(".gallery#favouriteGallery",
            vnode.attrs.globalState.favourites.map((imageData,index) => {
              if(imageData.id && imageData.download_url){
                return m(FavouriteImage, {key:index, imageData:{data:imageData}})
              }else{
                return m("", {key:index})
              }
          })
          )
          :
          m(".noFavouritesMessage", "You do not have favourites yet")
      ])
    }
}
