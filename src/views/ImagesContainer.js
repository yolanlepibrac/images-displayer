
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");

module.exports = {
    current : "foo",
    getImagesFromApi:function(){
      console.log("get")
      PicsumAPI.getImagesFromApi();
    },
    view: function(vnode) {
      return m("#connectionLine", [
        m(m.route.Link, {href: "/connexion"}, "disconnect"),
        m("div", {onclick: () => {this.getImagesFromApi()}}, "get Picture")
      ])
    }
}
