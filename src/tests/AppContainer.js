
var mq = require("mithril-query")
var o = require("ospec")

var AppContainer = require("../views/AppContainer.js")

o.spec("AppContainer", function() {
    o("things are working", function() {
        var out = mq(AppContainer, {text: "What a wonderful day to be alive!"})
        out.should.contain("day")
    })
})
