
var m = require("mithril");
var PicsumAPI = require("../API/PicsumAPI");
var State = require("./Global").state;

module.exports = {
    current : {
      imagesArray : [],
    },
    getImagesFromApi:function(){
      PicsumAPI.getImagesFromApi()
      .then((response) => {
        console.log(response.data)
        State.imagesArray.concat(response.data)
      })
      .catch((error) => console.error(error))
    },
    view: function(vnode) {
      return m("#gridContainer", [
        m(m.route.Link, {href: "/connexion"}, m(".disconnect", "Disconnect"),),
        m(".getPic", {onclick: () => {this.getImagesFromApi()}}, "get Picture"),
        m(".gallery#homeGallery",
          State.imagesArray.map((imageData) => { return m(ClickableImage, {data:imageData}) })
        )
      ])
    }
}

var ClickableImage = {
  reduceImageSize:(url) => {
    let newUrl = "";
    let res = url.split("/");
    res[res.length-1] = Math.round(parseInt(res[res.length-1], 10)/10);
    res[res.length-2] = Math.round(parseInt(res[res.length-2], 10)/10);
    for (var i = 0; i < res.length; i++) {
      if(i === res.length -1){
        newUrl = newUrl + res[i]
      }else{
        newUrl = newUrl + res[i] + "/"
      }
    }
    return newUrl
  },
  view:function(vnode){
    return m(".imageContainer",
      m("img.imageCard", {
        src:this.reduceImageSize(vnode.attrs.data.download_url),
        style:{
          gridColumn: 1 / 3,
          gridRow: 1,
        },
        onclick:() => {

        }},
        vnode.attrs.data.author
      )
    )
  }
}
