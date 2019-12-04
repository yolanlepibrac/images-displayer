
var mq = require("mithril-query")
var o = require("ospec")

var Home = require("../views/Home.js")


o.spec("Home well displayed", function() {
    var out = mq(Home)

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("homeGallery")
    })

    o("should not have imageContainer if no props", function() {
      out.should.not.have(".imageContainer")
    })
})

o.spec("Home well displayed if no imagesArray", function() {
    var out = mq(Home, {globalState:{}})

    o("should not have imageContainer if no imagesArray", function() {
      out.should.not.have(".imageContainer")
    })
})

o.spec("Home well displayed if imagesArray length is null", function() {
    var out = mq(Home, {globalState:{imagesArray:[]}})

    o("should not have imageContainer if imagesArray length is null", function() {
      out.should.not.have(".imageContainer")
    })
})

o.spec("Home well displayed if imagesArray is invalid", function() {
    var out = mq(Home, {globalState:{imagesArray:[0]}})

    o("should not have imageContainer if imagesArray is invalid", function() {
      out.should.not.have(".imageContainer")
    })
})



o.spec("Home well displayed if imagesArray have 1 valid image", function() {
    var out = mq(Home, {
      globalState:{
        imagesArray:[{
          src:"",
          position:[0,0],
          area:[1,1],
          data:{
            id:"string",
            download_url:"string",
            author:"string"
          }
        }]
      }
    })

    o("dont have FavouriteImage if FavouriteImage have wrong template", function() {
      out.should.have(1,".imageContainer")
    })
})

o.spec("imagesArray with multiple valid/invalid images", function() {
    var out = mq(Home, {
      globalState:{
        imagesArray:[
          {area:[0,0], position:[0,0], src:"", data:{id:"string", download_url:"string", author:"string"}},
          {area:[0,0], position:[0,0], src:"", data:{id:"string", download_url:"string", author:"string"}},
          {area:[], position:[], src:"", data:{id:"", download_url:"", author:""}},
          {area:[0,0], position:[0,0], src:"", data:{id:0, download_url:0, author:0}},
          {area:[0,0], position:[0,0], src:"", data:{id:{}, download_url:{}, author:{}}},
          {area:[0,0], position:[0,0], src:"", data:{id:[], download_url:[], author:[]}},
          {area:"", position:"", src:"", data:""},
          {area:{}, position:{}, src:{}, data:{}},
          {area:0, position:0, src:0, data:0},
          {area:[], position:[], src:[], data:[]},
          {position:[0,0]},
          {area:[0,0]},
          {src:""},
          {data:{}},
          {},
          "",
          [],
          0,
        ]
      }
    })

    o("dont have FavouriteImage if FavouriteImage have wrong template", function() {
      out.should.have(2,".imageContainer")
    })
})

o.spec("oninit is working", function() {
  var out = mq(Home, {globalState:{imagesArray:[0]}})

  o("no error when called", function() {
      out.vnode.state.oninit()
  })
})
