var axios = require('axios');
var m = require("mithril");

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const burl = `https://picsum.photos/v2/list?page=2&limit=100`

//const burl = "http://localhost:8000/"

module.exports = {
    getImagesFromApi : function() {
      return axios.get(burl ,{},{headers: headers})

    },
}
