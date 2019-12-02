import m from "mithril";
var App = require("./views/App");
var NoAccount = require("./views/NoAccount")
var ImagesContainer = require("./views/ImagesContainer")
var Favourites = require("./views/Favourites")
var Home = require("./views/Home")




m.mount(document.body, App)
m.route(document.getElementById('appContainer'), "/connexion", {
    "/connexion": NoAccount,
    "/home" : ImagesContainer,
})
/*
m.route(document.getElementById('gridContainer'), "/home", {
    "/home" : Home,
    "/favourites" : Favourites,
})
*/
