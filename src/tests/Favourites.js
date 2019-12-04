
var mq = require("mithril-query")
var o = require("ospec")

var Favourites = require("../views/Favourites.js")

o.spec("Favourites empty", function() {
    var out = mq(Favourites, {globalState:{connected:true,favourites:[]}})

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("gridContainer")
    })

    o("have error  message if favourites length is null", function() {
      out.should.have(".noFavouritesMessage")
    })

    o("have not have gallery if favourites length is null", function() {
      out.should.not.have(".gallery")
    })
})

o.spec("Favourites with wrong image", function() {
    var out = mq(Favourites, {globalState:{connected:true,favourites:[0]}})

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("gridContainer")
    })

    o("have not error message if favourites length is null", function() {
      out.should.not.have(".noFavouritesMessage")
    })

    o("have gallery if favourites length is null", function() {
      out.should.have(".gallery")
    })

    o("dont have FavouriteImage if FavouriteImage have wrong template", function() {
      var gallery = mq(out.first("#favouriteGallery"))
      var image = gallery.has(".favouriteImageContainer")
      gallery.should.not.have(".favouriteImageContainer")
      o(image).equals(false)
    })
})

o.spec("Favourites with 1 valid image", function() {
    var out = mq(Favourites, {globalState:{connected:true,favourites:[{id:"string", download_url:"string"}]}})

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("gridContainer")
    })

    o("have not error message if favourites length is null", function() {
      out.should.not.have(".noFavouritesMessage")
    })

    o("have gallery if favourites length is null", function() {
      out.should.have(".gallery")
    })

    o("dont have FavouriteImage if FavouriteImage have wrong template", function() {
      var gallery = mq(out.first("#favouriteGallery"))
      var image = gallery.has(".favouriteImageContainer")
      gallery.should.have(1,".favouriteImageContainer")
      o(image).equals(true)
    })
})

o.spec("Favourites with multiple valid/invalid images", function() {
    var out = mq(Favourites, {
      globalState:{
        connected:true,
        favourites:[
          {id:"string", download_url:"string"},
          {id:"string", download_url:"string"},
          {id:"string", download_url:""},
          {id:"", download_url:"string"},
          {property:"string", download_url:"string"},
          {id:"string", property:""},
          {obj:"string"},
          "",
          [],
          2,
        ]
      }
    })

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("gridContainer")
    })

    o("have not error message if favourites length is null", function() {
      out.should.not.have(".noFavouritesMessage")
    })

    o("have gallery if favourites length is null", function() {
      out.should.have(".gallery")
    })

    o("dont have FavouriteImage if FavouriteImage have wrong template", function() {
      var gallery = mq(out.first("#favouriteGallery"))
      var image = gallery.has(".favouriteImageContainer")
      gallery.should.have(2,".favouriteImageContainer")
      o(image).equals(true)
    })
})
