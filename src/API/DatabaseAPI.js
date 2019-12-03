var axios = require('axios');
var m = require("mithril");

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const burl = "https://images-displayer.herokuapp.com"

module.exports = {
    login : function(username,password) {
        return axios.post(burl + '/user/login',{'username':username,'password':password},{headers: headers})
    },
    signup : function(username,password){
        return axios.post(burl + '/user/signup',{'username':username,'password':password},{headers: headers})
    },
    togglePicture: function(username, picture) {
        return axios.post(burl + '/user/togglePicture',{'username':username, 'picture':picture},{headers: headers})
    },
}
