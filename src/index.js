import m from "mithril";
var App = require("./views/App");
var NoAccount = require("./views/NoAccount")
var Connected = require("./views/ImagesContainer")

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       console.log("bottom!");
   }
});

m.mount(document.body, App)
m.route(document.getElementById('appContainer'), "/connexion", {
    "/connexion": NoAccount,
    "/home" : Connected
})
