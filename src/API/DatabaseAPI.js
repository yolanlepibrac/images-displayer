var axios = require('axios');
var m = require("mithril");

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const burl = "https://images-displayer.herokuapp.com"
//const burl = "http://localhost:8000/"

module.exports = {
    login : function(username,password) {
        return axios.post(burl + '/user/login',{'username':username,'password':password},{headers: headers})
    },
    signup : function(username,password){
        return axios.post(burl + '/user/signup',{'username':username,'password':password},{headers: headers})
    },
    addPicture: function() {
        return axios.post(burl + '/user/addPicture',{},{headers: headers})
    },
    deletePicture: function(){
        return axios.post(burl + '/user/deletePicture',{},{headers: headers})
    },
}
