
var mq = require("mithril-query")
var o = require("ospec")

var ImagesContainer = require("../views/ImagesContainer.js")

o.spec("ImagesContainer", function() {
    var out = mq(ImagesContainer)

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("imagesContainer")
    })

    o("display favourite if false when init", function() {
        o(out.vnode.state.current.displayFavourites).equals(false)
        out.should.have("#homeGallery")
    })

    o("display favourite if true when navigate favourites", function() {
        out.vnode.state.onNavigateFavourites()
        o(out.vnode.state.current.displayFavourites).equals(true)
        out.redraw()
        out.should.have("#gridContainer")
        var grid = mq(out.first("#gridContainer"))
        grid.should.have(".noFavouritesMessage")
    })

    o("display favourite if false when navigate home", function() {
        out.vnode.state.onNavigateHome()
        o(out.vnode.state.current.displayFavourites).equals(false)
        out.redraw()
        out.should.have("#homeGallery")
    })

    o("display favourite if false when disconnect", function() {
        out.vnode.state.disconnect()
        o(out.vnode.state.current.displayFavourites).equals(false)
    })

    o("display a link to disconnect", function() {
      out.should.have("a")
    })

    o("display a menu container if connect and not if deconnect", function() {
      out.vnode.state.toggleDisconnect()
      out.redraw()
      out.should.have(".menuContainer")
      out.vnode.state.toggleDisconnect()
      out.redraw()
      out.should.not.have(".menuContainer")
    })
})
