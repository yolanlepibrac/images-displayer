// src/views/App.js

var m = require("mithril")
var State = require("./Global").state
var Constantes = require("./Global").constantes
var Header = require("./Header")
var AppContainer = require("./AppContainer")

module.exports = {
    view: function(vnode) {
        return m("#App", [
            m(Header, {size:"50px", backgroundColor:Constantes.color, text:"Images Displayer"}),
            m(AppContainer)
        ])
    }
}
