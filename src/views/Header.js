// src/views/Header.js
var m = require("mithril")

module.exports = {
    view: function(vnode) {
        return m("#header", {style: { backgroundColor:vnode.attrs.backgroundColor, height:vnode.attrs.size}}, vnode.attrs.text)
    }
}
