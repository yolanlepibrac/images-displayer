// src/views/App.js
var m = require("mithril")
var ConnectionInput = require("./ConnectionInput")

var NoAccount = {
    current : {
      username: "",
      password: "",
      widthLogin : "50%",
      widthRegister : "50%",
      onLogin:false,
      onRegister:false,
    },
    setUsername: function(value) {
        this.username = value
    },
    setPassword: function(value) {
        this.password = value
    },
    validate: function(vnode){
      if(vnode.state.current.username === "" ||  vnode.state.current.username === undefined || vnode.state.current.password === "" ||  vnode.state.current.password === undefined){
        return;
      }else{
        //vnode.state.current.onLogin ? DatabaseAPI.login(vnode) : DatabaseAPI.register(vnode)
      }
    },
    activeLogin:(vnode) => {
      vnode.state.current.onLogin = true;
      vnode.state.current.onRegister = false;
    },
    activeRegister:(vnode) => {
      vnode.state.current.onLogin = false;
      vnode.state.current.onRegister = true;
    },
    desactiveLoginRegister:(vnode) => {
      vnode.state.current.onLogin = false;
      vnode.state.current.onRegister = false;
    },
    view: function(vnode) {
      return m("#connectionContainer", [
        m("#connectionLine", [
          vnode.state.current.onLogin ?
          m("div.connectionTopContainer", [
            m(".connectionTop", "Login"),
            m(Quit, {desactiveLoginRegister:function(){vnode.state.desactiveLoginRegister(vnode)}}, "quit")
          ])
          :
          !vnode.state.current.onRegister && m("div.connectionButton #login", {
            onclick:function(){
              vnode.state.activeLogin(vnode)
            }
          }, "Login"),
          vnode.state.current.onRegister ?
          m("div.connectionTopContainer", [
            m(".connectionTop", "Register"),
            m(Quit, {desactiveLoginRegister:function(){vnode.state.desactiveLoginRegister(vnode)}}, "quit")
          ])
          :
          !vnode.state.current.onLogin && m("div.connectionButton #register", {
            onclick:function(){
              vnode.state.activeRegister(vnode)
            }
          },"Register"),
        ]),
        vnode.state.current.onLogin || vnode.state.current.onRegister ?
        m(ConnectionInput,  {style:{width:"100%"}, validate:function(){vnode.state.validate()}}, vnode.state.current.username):
        m("div.connectionButton #withoutAccount", {style:{width:"100%"}, onclick:function(){console.log(vnode.state.current.onRegister)}}, "Continue without account")


      ])
    }
}



var Quit = {
  view: function(vnode) {
    return m("img.quitConnect", {
      src:"./src/assets/quit.png",
      onclick:function(){
        vnode.attrs.desactiveLoginRegister()
      }
    },
    "quit")
  }
}

module.exports = NoAccount;
