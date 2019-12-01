import m from "mithril";
var App = require("./views/App");
var NoAccount = require("./views/NoAccount")
var Connected = require("./views/ImagesContainer")




m.mount(document.body, App)
m.route(document.getElementById('appContainer'), "/connexion", {
    "/connexion": NoAccount,
    "/home" : Connected
})
