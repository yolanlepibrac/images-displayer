import m from "mithril";
var App = require("./views/App");
var NoAccount = require("./views/NoAccount")
var Connected = require("./views/Connected")


m.mount(document.body, App)
m.route(document.getElementById('appContainer'), "/noAccount", {
    "/noAccount": NoAccount,
    "/connected" : Connected
})
