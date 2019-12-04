
var m = require("mithril")
var DatabaseAPI = require("../API/DatabaseAPI");
var State = require("./Global").state;
var PicsumAPI = require("../API/PicsumAPI");
var GridElementsConstructor = require("../utils/GridElementsConstructor");


var NoAccount = {
    current : {
      username: "",
      password: "",
      onLogin:false,
      onRegister:false,
      errorMessage : "",
      displayLoading:false,
    },
    onChangeUserName:function(username){
      if(typeof(username) === "number"){
        username = username.toString(10)
      }else if(typeof(username) !== "string"){
        username = ""
      }
      this.current.username = username
    },
    onChangePassword:function(password){
      if(typeof(password) === "number"){
        password = password.toString(10)
      }else if(typeof(password) !== "string"){
        password = ""
      }
      this.current.password = password
    },
    validate:function(){
      if(this.current.username === "" ||  this.current.username === undefined || this.current.password === "" ||  this.current.password === undefined){
        this.current.errorMessage = "Password and UserName must be filled";
        return;
      }else{
        this.current.displayLoading = true;
        this.current.onLogin ?
        DatabaseAPI.login(this.current.username, this.current.password).then((data) => {
          console.log(data)
          if(data.status === 200){
            State.favourites = data.data.userData.images
            State.username = data.data.userData.username
            this.navigateToHome(true)
          }else{
            this.setError("Impossible to login, check you UserName and Password");
          }
        }).catch((error) => {
          if(error.response.status === 401){
            this.setError("Impossible to login, check you UserName and Password");
          }
        }).catch((error)=> {
          this.setError("Impossible to login, must be an error with server")
        }) :
        DatabaseAPI.signup(this.current.username, this.current.password).then((data) => {
          if(data.status === 200){
            State.username = data.data.userData.username
            this.navigateToHome(true)
          }else{
            this.setError("Impossible to register, try an other UserName");
          }
        }).catch((error)=>{
          if(error.response.status === 204){
             this.setError("Impossible to register, this UserName is already taken");
           }
        }).catch((error)=> {
          this.setError("Impossible to login, must be an error with server");
        });
      }
    },
    setError:function(message){
      this.current.errorMessage = message;
      this.current.displayLoading = false;
      m.redraw()
    },
    navigateToHome:function(isConnected){
        this.current.displayLoading = false;
        State.connected = isConnected;
        m.route.set("/home");
    },
    connectWithoutAccount:(vnode) => {
      vnode.state.navigateToHome(false)
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
      this.current.errorMessage = "";
      this.current.onLogin = false;
      this.current.onRegister = false;
    },

    view: function(vnode) {
      return this.current.displayLoading ? m(".spinner")
      :
      m("#connectionContainer", [
        m("#connectionLine", [
          m("#errorConnection", this.current.errorMessage),
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
            m("input.input[type=text][placeholder=User Name][autofocus]",
            {value:vnode.attrs.username, oninput:function(e){vnode.attrs.onChangeUserName(e.target.value)}}),
            m("input.input[type=text][placeholder=Password]",
            {value:vnode.attrs.password, oninput:function(e){vnode.attrs.onChangePassword(e.target.value)}}),
          ]),
          m(".loginValidate",{onclick:function(){vnode.attrs.validate()}}, "Validate"),
        ])
    }
}

module.exports = NoAccount;
