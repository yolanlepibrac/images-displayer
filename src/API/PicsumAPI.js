var axios = require('axios');
var m = require("mithril");

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}



module.exports = {
    getImagesFromApi : function(page) {
      let url = "https://picsum.photos/v2/list?page="+ page + "&limit=50";
      return axios.get(url ,{},{headers: headers})

    },
}
