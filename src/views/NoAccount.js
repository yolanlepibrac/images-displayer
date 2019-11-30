
var m = require("mithril")
var DatabaseAPI = require("../API/DatabaseAPI");
var State = require("./Global").state;

var NoAccount = {
    current : {
      username: "",
      password: "",
      widthLogin : "50%",
      widthRegister : "50%",
      onLogin:false,
      onRegister:false,
    },
    onChangeUserName:function(username){
      this.current.username = username
    },
    onChangePassword:function(password){
      this.current.password = password
    },
    validate: function(vnode){
      console.log(this.current.username, this.current.password)
      if(this.current.username === "" ||  this.current.username === undefined || this.current.password === "" ||  this.current.password === undefined){
        return;
      }else{
        this.current.onLogin ?
        DatabaseAPI.login(this.current.username, this.current.password).then((data) => {
          if(data.status === 200){
            State.connected = true;
            m.route.set("/connected", {connected:true});
          }
        }) :
        DatabaseAPI.signup(this.current.username, this.current.password).then((data) => {
          if(data.status === 200){
            State.connected = true;
            m.route.set("/connected", {connected:true});
          }
        });
      }
    },
    activeLogin:function(){
      this.current.onLogin = true;
      this.current.onRegister = false;
    },
    activeRegister:function(){
      this.current.onLogin = false;
      this.current.onRegister = true;
    },
    desactiveLoginRegister:function(){
      this.current.onLogin = false;
      this.current.onRegister = false;
    },

    view: function(vnode) {
      return m("#connectionContainer", [
        m("#connectionLine", [
          vnode.state.current.onLogin ?
          m("div.connectionTopContainer", [
            m(".connectionTop", "Login"),
            m(Quit, {desactiveLoginRegister:function(){vnode.state.desactiveLoginRegister()}}, "quit")
          ])
          :
          !vnode.state.current.onRegister && m("div.connectionButton #login", {
            onclick:function(){
              vnode.state.activeLogin()
            }
          }, "Login"),
          vnode.state.current.onRegister ?
          m("div.connectionTopContainer", [
            m(".connectionTop", "Register"),
            m(Quit, {desactiveLoginRegister:function(){vnode.state.desactiveLoginRegister()}}, "quit")
          ])
          :
          !vnode.state.current.onLogin && m("div.connectionButton #register", {
            onclick:function(){
              vnode.state.activeRegister()
            }
          },"Register"),
        ]),
        vnode.state.current.onLogin || vnode.state.current.onRegister ?
          m(ConnectionInput,  {
            style:{width:"100%"},
            validate:function(){vnode.state.validate()},
            onChangeUserName:function(u){vnode.state.onChangeUserName(u)},
            onChangePassword:function(p){vnode.state.onChangePassword(p)},
          }, vnode.state.current.username)
        :
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

var ConnectionInput = {
    view: function(vnode) {
      return m("#connectionWindow", [
          m("#connectionInput", [
            m("input.input[type=text][placeholder=User Name]", {oninput:function(e){vnode.attrs.onChangeUserName(e.target.value)}}),
            m("input.input[type=text][placeholder=Password]", {oninput:function(e){vnode.attrs.onChangePassword(e.target.value)}}),
          ]),
          m(".loginValidate",{onclick:function(){vnode.attrs.validate()}}, "Validate"),
        ])
    }
}

module.exports = NoAccount;
