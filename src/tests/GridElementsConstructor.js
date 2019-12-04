
var mq = require("mithril-query")
var o = require("ospec")

var GridElementsConstructor = require("../utils/GridElementsConstructor.js")

o.spec("GridElementsConstructor", function() {
    var out = mq(GridElementsConstructor)

    o("display non views component", function() {
        out.should.not.contain()
    })

    o("display no DOM elements", function() {
      out.should.not.have("div")
      out.should.not.have("img")
      out.should.not.have("span")
      out.should.not.have("input")
      out.should.not.have("button")
    })
})



o.spec("createElementForGrid", function() {
    var out = mq(GridElementsConstructor)

    o("createElementForGrid works on empty array", function() {
        out.rootNode.createElementForGrid(null)
        out.rootNode.createElementForGrid(undefined)
        out.rootNode.createElementForGrid()
        out.rootNode.createElementForGrid([])
    })

    o("createElementForGrid works on wrong array", function() {
        out.rootNode.createElementForGrid([{obj:"obj"},1,"string"])
    })

    o("createElementForGrid works on wrong array with download_url", function() {
        out.rootNode.createElementForGrid([{download_url:{obj:"obj"}}, {download_url:"string"},{download_url:2}])
    })

    o("createElementForGrid works on wrong array with download_url string", function() {
        out.rootNode.createElementForGrid([{download_url:"string"}])
    })

    o("createElementForGrid works on wrong array with download_url empty string", function() {
        out.rootNode.createElementForGrid([{download_url:""}])
    })

    o("createElementForGrid works on wrong array with download_url string containing /", function() {
        out.rootNode.createElementForGrid([{download_url:"string/string"}])
    })
})


o.spec("createElementForGrid value", function() {
    var out = mq(GridElementsConstructor)

    o("createElementForGrid works on wrong array", function() {
        o(out.rootNode.createElementForGrid([{
          download_url:"string/string/500/400"
        }])).deepEquals([ {
          data: {
            download_url: 'string/string/500/400' },
            area: [ 1, 1 ],
            position: [ 0, 3 ],
            src: 'string/string/50/40'
          }
        ])
    })
})


o.spec("defineArea", function() {
    var out = mq(GridElementsConstructor)

    o("defineArea works on empty value", function() {
        out.rootNode.defineArea()
        out.rootNode.defineArea(null)
        out.rootNode.defineArea(undefined)
        out.rootNode.defineArea("")
        out.rootNode.defineArea(0)
        out.rootNode.defineArea({})
        out.rootNode.defineArea(NaN)
        out.rootNode.defineArea(null, null)
        out.rootNode.defineArea(undefined, undefined)
        out.rootNode.defineArea("", "")
        out.rootNode.defineArea(0, 0)
        out.rootNode.defineArea({}, {})
        out.rootNode.defineArea(NaN, NaN)
        out.rootNode.setPositionInGrid(900719925474099267n)
    })

    o("defineArea works on interger", function() {
        out.rootNode.defineArea(1,1)
    })

    o("defineArea works on negative interger", function() {
        out.rootNode.defineArea(-1,-1)
    })

    o("defineArea works on large interger", function() {
        out.rootNode.defineArea(900719925474099267n,900719925474099267n)
    })

    o("defineArea works on large negative interger", function() {
        out.rootNode.defineArea(-900719925474099267n,-900719925474099267n)
    })

    o("defineArea works on float", function() {
        out.rootNode.defineArea(0.1,0.1)
    })

    o("defineArea works on negative float", function() {
        out.rootNode.defineArea(-0.1,-0.1)
    })

    o("defineArea works on other numer", function() {
        out.rootNode.defineArea(Math.PI,Math.PI)
    })
})

o.spec("defineArea value", function() {
    var out = mq(GridElementsConstructor)

    o("defineArea return undefined for 0 0", function() {
        o(out.rootNode.defineArea(0,0)).equals(undefined)
    })

    o("defineArea return [3,2] for 1 1", function() {
        o(out.rootNode.defineArea(1,1)).deepEquals ([3,2])
    })

    o("defineArea return undefined for 0 1", function() {
        o(out.rootNode.defineArea(0,1)).equals(undefined)
    })

    o("defineArea return undefined for 1 0", function() {
        o(out.rootNode.defineArea(1,0)).equals(undefined)
    })

    o("defineArea return [3,2] for 10 10", function() {
        o(out.rootNode.defineArea(10,10)).deepEquals ([3,2])
    })
})


o.spec("setPositionInGrid", function() {
    var out = mq(GridElementsConstructor)

    o("setPositionInGrid works on empty value", function() {
        out.rootNode.setPositionInGrid()
        out.rootNode.setPositionInGrid(null)
        out.rootNode.setPositionInGrid(undefined)
        out.rootNode.setPositionInGrid("")
        out.rootNode.setPositionInGrid(0)
        out.rootNode.setPositionInGrid({})
        out.rootNode.setPositionInGrid(NaN)
        out.rootNode.setPositionInGrid([])
        out.rootNode.setPositionInGrid(900719925474099267n)
    })

    o("setPositionInGrid works on interger", function() {
        out.rootNode.setPositionInGrid([1,1])
    })

    o("setPositionInGrid works on negative interger", function() {
        out.rootNode.setPositionInGrid([-1, -1])
    })

    o("setPositionInGrid works on large interger", function() {
        out.rootNode.setPositionInGrid([900719925474099267n,900719925474099267n])
        out.rootNode.setPositionInGrid([900719925474099267n,0])
    })

    o("setPositionInGrid works on large negative interger", function() {
        out.rootNode.setPositionInGrid([-900719925474099267n, 900719925474099267n])
        out.rootNode.setPositionInGrid([-900719925474099267n, -900719925474099267n])
    })

    o("setPositionInGrid works on float", function() {
        out.rootNode.setPositionInGrid([0.1, 0.1])
    })

    o("setPositionInGrid works on negative float", function() {
        out.rootNode.setPositionInGrid([-0.1,-0.1])
    })

    o("setPositionInGrid works on other numer", function() {
        out.rootNode.setPositionInGrid([Math.PI, Math.PI])
    })
})

o.spec("setPositionInGrid value", function() {
    var out = mq(GridElementsConstructor)

    o("setPositionInGrid return [0,0] for [0,0]", function() {
        o(out.rootNode.setPositionInGrid([0,0])).deepEquals([0,0])
    })
})


o.spec("setPositionInGrid value [10,10]", function() {
  var out = mq(GridElementsConstructor)

    o("setPositionInGrid return [0,0] for [10,10]", function() {
        o(out.rootNode.setPositionInGrid([10,10])).deepEquals(undefined)
    })
})

o.spec("setPositionInGrid value [-1,-1]", function() {
  var out = mq(GridElementsConstructor)

    o("setPositionInGrid return [0,0] for [-1,-1]", function() {
        o(out.rootNode.setPositionInGrid([-1,-1])).deepEquals(undefined)
    })
})


o.spec("setReduceImageUrl", function() {
    var out = mq(GridElementsConstructor)

    o("setReduceImageUrl works on empty value", function() {
        out.rootNode.setReduceImageUrl()
        out.rootNode.setReduceImageUrl(null)
        out.rootNode.setReduceImageUrl(undefined)
        out.rootNode.setReduceImageUrl("")
        out.rootNode.setReduceImageUrl(0)
        out.rootNode.setReduceImageUrl({})
        out.rootNode.setReduceImageUrl(NaN)
        out.rootNode.setReduceImageUrl([])
        out.rootNode.setReduceImageUrl(null, null)
        out.rootNode.setReduceImageUrl(undefined, undefined)
        out.rootNode.setReduceImageUrl("","")
        out.rootNode.setReduceImageUrl(0, 0)
        out.rootNode.setReduceImageUrl({}, {})
        out.rootNode.setReduceImageUrl(NaN, NaN)
        out.rootNode.setReduceImageUrl([],[])
        out.rootNode.setReduceImageUrl(900719925474099267n, 900719925474099267n)
    })

    o("setReduceImageUrl works on interger", function() {
        out.rootNode.setReduceImageUrl([],1)
    })

    o("setReduceImageUrl works on negative interger", function() {
        out.rootNode.setReduceImageUrl([-1], -1)
    })

    o("setReduceImageUrl works on large interger", function() {
        out.rootNode.setReduceImageUrl([900719925474099267n],900719925474099267n)
        out.rootNode.setReduceImageUrl([900719925474099267n],0)
    })

    o("setReduceImageUrl works on large negative interger", function() {
        out.rootNode.setReduceImageUrl([-900719925474099267n], 900719925474099267n)
        out.rootNode.setReduceImageUrl([-900719925474099267n], -900719925474099267n)
    })

    o("setReduceImageUrl works on float", function() {
        out.rootNode.setReduceImageUrl([0.1], 0.1)
    })

    o("setReduceImageUrl works on negative float", function() {
        out.rootNode.setReduceImageUrl([-0.1],-0.1)
    })

    o("setReduceImageUrl works on other numer", function() {
        out.rootNode.setReduceImageUrl([Math.PI], Math.PI)
    })
})


o.spec("setReduceImageUrl value", function() {
  var out = mq(GridElementsConstructor)

    o("setPositionInGrid return '0/0' for [1,1] [0,0]", function() {
        o(out.rootNode.setReduceImageUrl([1,1], [0,0])).deepEquals("0/0")
    })

    o("setPositionInGrid return '0/0' for ['1','1'] [0,0]", function() {
        o(out.rootNode.setReduceImageUrl(["1","1"], [0,0])).deepEquals("0/0")
    })

    o("setPositionInGrid return '0/0' for ['1','1'], [1,1]", function() {
        o(out.rootNode.setReduceImageUrl(["1","1"], [1,1])).deepEquals("0/0")
    })

    o("setPositionInGrid return '0/0' for ['2','2'], [1,1]", function() {
        o(out.rootNode.setReduceImageUrl(["2","2"], [1,1])).deepEquals("0/0")
    })

    o("setPositionInGrid return '1/1' for ['10','10'], [1,1]", function() {
        o(out.rootNode.setReduceImageUrl(["10","10"], [1,1])).deepEquals("1/1")
    })

    o("setPositionInGrid return '2/2' for ['20','20'], [1,1]", function() {
        o(out.rootNode.setReduceImageUrl(["20","20"], [1,1])).deepEquals("2/2")
    })

    o("setPositionInGrid return 'string/2/2' for ['string','20','20'], [1,1]", function() {
        o(out.rootNode.setReduceImageUrl(["string","20","20"], [1,1])).deepEquals("string/2/2")
    })

    o("setPositionInGrid return '4/4' for ['20','20'], [2,1]", function() {
        o(out.rootNode.setReduceImageUrl(["20","20"], [2,1])).deepEquals("4/4")
    })

    o("setPositionInGrid return '8/8' for ['20','20'], [2,2]", function() {
        o(out.rootNode.setReduceImageUrl(["20","20"], [2,2])).deepEquals("8/8")
    })


})
