
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
