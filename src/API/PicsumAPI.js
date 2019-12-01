var axios = require('axios');
var m = require("mithril");

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const burl = "https://picsum.photos/v2/list?page=2&limit=100"

//const burl = "http://localhost:8000/"

module.exports = {
    getImagesFromApi : function() {
      return fetch(burl)
      .then((response) => response.json())
      .catch((error) => console.error(error))
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
