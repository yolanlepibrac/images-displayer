
var mq = require("mithril-query")
var o = require("ospec")

var AppContainer = require("../views/AppContainer.js")

o.spec("AppContainer", function() {
    var out = mq(AppContainer)

    o("display div inside component", function() {
        out.should.have('div')
    })

    o("component does not have span", function() {
        out.should.not.have('span')
    })

    o("component is appContainer", function() {
        out.should.have('#appContainer')
    })

})
