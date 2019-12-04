

var mq = require("mithril-query")
var o = require("ospec")

var FavouriteImage = require("../views/FavouriteImage.js")


o.spec("FavouriteImage", function() {
    var out = mq(FavouriteImage, {key:1, imageData:{data:{id:"string", download_url:"string", author:"author"}}})

    o("key is correct", function() {
        o(out.vnode.attrs.key).equals(1)
    })

    o("src is correct", function() {
        o(out.vnode.state.current.src[out.vnode.attrs.key]).equals("./src/assets/heartBlack.png")
    })

    o("src is correct on hover like", function() {
        out.vnode.state.setHoverLike(out.vnode.attrs.key)
        o(out.vnode.state.current.src[out.vnode.attrs.key]).equals("./src/assets/cross.png")
    })

    o("display an image", function() {
        out.should.have(2, "img")
    })

    o("contain author", function() {
        out.should.contain("author")
    })

    o("togglelike works", function() {
        out.vnode.state.toggleLike({})
    })

})


o.spec("FavouriteImage work if download_url empty or null", function() {
    var out = mq(FavouriteImage, {imageData:{data:{id:"string", download_url:""}}})
    var out1 = mq(FavouriteImage, {imageData:{data:{id:"string", download_url:null}}})
    var out2 = mq(FavouriteImage, {imageData:{data:{id:"string", download_url:undefined}}})
    var out3 = mq(FavouriteImage, {imageData:{data:{id:"string", download_url:{}}}})
    var out4 = mq(FavouriteImage, {imageData:{data:{id:"string", download_url:0}}})

    o("download_url work if empty or null", function() {
      // background image and like image
        out.should.have(2, "img")
        out1.should.have(2, "img")
        out2.should.have(2, "img")
        out3.should.have(2, "img")
        out4.should.have(2, "img")
    })
})
