
var mq = require("mithril-query")
var o = require("ospec")

var App = require("../views/App.js")

o.spec("App", function() {
    var out = mq(App)

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("App")
    })

    o("display header", function() {
      out.should.have("#header")
    })

    o("display AppContainer", function() {
      out.should.have("#appContainer")
    })
})
