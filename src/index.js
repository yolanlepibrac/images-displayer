import m from "mithril";
var App = require("./views/App");
var NoAccount = require("./views/NoAccount")
var ImagesContainer = require("./views/ImagesContainer")
var Favourites = require("./views/Favourites")




m.mount(document.body, App)
m.route(document.getElementById('appContainer'), "/connexion", {
    "/connexion": NoAccount,
    "/home" : ImagesContainer,
    "/favourites" : Favourites,
})
