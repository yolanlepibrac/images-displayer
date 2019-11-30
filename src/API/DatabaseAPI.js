var axios = require('axios');
var m = require("mithril");

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',

}

const burl = ""

module.exports = {
    login : function(email,password) {
      console.log(email)
        return axios.post(burl + '/user/login',{'email' : email,'password' : password},{headers: headers})
    },
    signup : function(send){
        return axios.post(burl + '/user/signup',send,{headers: headers})
    },
    addPicture: function(id, oldPassword, newPassword) {
        return axios.post(burl + '/user/updatePassword',{'id' : id, 'oldPassword' : oldPassword, 'newPassword' : newPassword, },{headers: headers})
    },
    deletePicture: function(searchedText){
        return axios.post(burl + '/user/searchFriends',{'userName':searchedText},{headers: headers})
    },
}
