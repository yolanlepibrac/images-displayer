
var m = require("mithril")

module.exports = {
    view: function(vnode) {
      return m("#connectionWindow", [
          m("#connectionInput", [
            m("input.input[type=text][placeholder=User Name]"),
            m("input.input[placeholder=Password]"),
          ]),
          m(".loginValidate",{onclick:function(){vnode.attrs.validate()}}, "Validate"),
        ])
    }
}
