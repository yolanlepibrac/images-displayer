// src/views/App.js
var m = require("mithril")

module.exports = {
    current : "foo",
    view: function(vnode) {
      return m(m.route.Link, {href: "/noAccount"}, "disconnect")
    }
}
