
var m = require("mithril")
var DatabaseAPI = require("../API/DatabaseAPI");
var State = require("./Global").state;
var PicsumAPI = require("../API/PicsumAPI");

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
    validate:function(){
      console.log(this.current.username, this.current.password)
      if(this.current.username === "" ||  this.current.username === undefined || this.current.password === "" ||  this.current.password === undefined){
        return;
      }else{
        this.current.onLogin ?
        DatabaseAPI.login(this.current.username, this.current.password).then((data) => {
          if(data.status === 200){
            this.getImagesFromApi(true)
          }
        }) :
        DatabaseAPI.signup(this.current.username, this.current.password).then((data) => {
          if(data.status === 200){
            this.getImagesFromApi(true)
          }
        });
      }
    },
    getImagesFromApi:(isConnected) => {
      PicsumAPI.getImagesFromApi()
      .then((response) => {
        State.connected = isConnected;
        State.imagesArray = response.data;
        m.route.set("/home");
      })
      .catch((error) => console.error(error))
    },
    connectWithoutAccount:(vnode) => {
      vnode.state.getImagesFromApi(false)
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
          this.current.onLogin ?
          m("div.connectionTopContainer", [
            m(".connectionTop", "Login"),
            m(Quit, {desactiveLoginRegister:() => {this.desactiveLoginRegister()}}, "quit")
          ])
          :
          !this.current.onRegister && m("div.connectionButton #login", {
            onclick:() => {
              this.activeLogin()
            }
          }, "Login"),
          this.current.onRegister ?
          m("div.connectionTopContainer", [
            m(".connectionTop", "Register"),
            m(Quit, {desactiveLoginRegister:() => {this.desactiveLoginRegister()}}, "quit")
          ])
          :
          !this.current.onLogin && m("div.connectionButton #register", {
            onclick:() => {
              this.activeRegister()
            }
          },"Register"),
        ]),
        this.current.onLogin || this.current.onRegister ?
          m(ConnectionInput,  {
            style:{width:"100%"},
            username : this.current.username,
            password : this.current.password,
            validate:() => {this.validate()},
            onChangeUserName:(u) => {this.onChangeUserName(u)},
            onChangePassword:(p) => {this.onChangePassword(p)},
          }, this.current.username)
        :
          m("div.connectionButton #withoutAccount", {style:{width:"100%"}, onclick:() => {this.connectWithoutAccount(vnode)}}, "Continue without account")


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
            m("input.input[type=text][placeholder=User Name]", {value:vnode.attrs.username, oninput:function(e){vnode.attrs.onChangeUserName(e.target.value)}}),
            m("input.input[type=text][placeholder=Password]", {value:vnode.attrs.password, oninput:function(e){vnode.attrs.onChangePassword(e.target.value)}}),
          ]),
          m(".loginValidate",{onclick:function(){vnode.attrs.validate()}}, "Validate"),
        ])
    }
}

module.exports = NoAccount;
