// src/views/App.js
var m = require("mithril")
var NoAccount = require("./NoAccount")

module.exports = {
    current : "foo",
    view: function(vnode) {
      return m("#appContainer")
    }
}
