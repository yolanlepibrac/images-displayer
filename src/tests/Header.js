
var mq = require("mithril-query")
var o = require("ospec")

var Header = require("../views/Header.js")

o.spec("Header normal", function() {
    var out = mq(Header, {style: { backgroundColor:"black", height:"50px"}, text:"my header"})

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("header")
    })

    o("display right color", function() {
      o(out.vnode.attrs.style.backgroundColor).equals("black")
    })

    o("display right height", function() {
      o(out.vnode.attrs.style.height).equals("50px")
    })

    o("text is display", function() {
      out.should.contain("my header")
    })

})
