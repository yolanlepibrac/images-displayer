

var mq = require("mithril-query")
var o = require("ospec")

var NoAccount = require("../views/NoAccount.js")


o.spec("NoAccount", function() {
    var out = mq(NoAccount)

    o("id is correct", function() {
        o(out.rootNode.attrs.id).equals("connectionContainer")
    })

    o("state is well initialized", function() {
        o(out.vnode.state.current.username).equals("")
        o(out.vnode.state.current.password).equals("")
        o(out.vnode.state.current.onLogin).equals(false)
        o(out.vnode.state.current.onRegister).equals(false)
        o(out.vnode.state.current.errorMessage).equals("")
        o(out.vnode.state.current.displayLoading).equals(false)
    })

})

o.spec("NoAccount data modifications are working", function() {
    var out = mq(NoAccount)

    o("change user name for empty", function() {
        out.vnode.state.onChangeUserName("")
        o(out.vnode.state.current.username).equals("")
    })

    o("change user name for null", function() {
        out.vnode.state.onChangeUserName(null)
        o(out.vnode.state.current.username).equals("")
    })

    o("change user name for undefined", function() {
        out.vnode.state.onChangeUserName(undefined)
        o(out.vnode.state.current.username).equals("")
    })

    o("change user name for number", function() {
        out.vnode.state.onChangeUserName(0)
        o(out.vnode.state.current.username).equals("0")
    })

    o("change password for empty", function() {
        out.vnode.state.onChangePassword("")
        o(out.vnode.state.current.password).equals("")
    })

    o("change password for null", function() {
        out.vnode.state.onChangePassword(null)
        o(out.vnode.state.current.password).equals("")
    })

    o("change password for undefined", function() {
        out.vnode.state.onChangePassword(undefined)
        o(out.vnode.state.current.password).equals("")
    })

    o("change password for number", function() {
        out.vnode.state.onChangePassword(0)
        o(out.vnode.state.current.password).equals("0")
    })
})

o.spec("Log validation is working", function() {
    var out = mq(NoAccount)

    o("validate", function() {
        out.vnode.state.validate()
    })
})

o.spec("setError is working", function() {
    var out = mq(NoAccount)

    o("setError", function() {
        out.vnode.state.setError("string")
        o(out.vnode.state.current.errorMessage).equals("string")
        o(out.vnode.state.current.displayLoading).equals(false)
    })
})

o.spec("navigateToHome is working", function() {
    var out = mq(NoAccount)

    o("navigateToHome", function() {
        out.vnode.state.navigateToHome()
        o(out.vnode.state.current.displayLoading).equals(false)
    })
})

o.spec("connectWithoutAccount is working", function() {
    var out = mq(NoAccount)

    o("connectWithoutAccount", function() {
        out.vnode.state.connectWithoutAccount(out.vnode)
    })
})

o.spec("activeLogin is working", function() {
    var out = mq(NoAccount)

    o("activeLogin", function() {
        out.vnode.state.activeLogin()
        o(out.vnode.state.current.onLogin).equals(true)
        o(out.vnode.state.current.onRegister).equals(false)
    })
})

o.spec("activeRegister is working", function() {
    var out = mq(NoAccount)

    o("activeRegister", function() {
        out.vnode.state.activeRegister()
        o(out.vnode.state.current.onLogin).equals(false)
        o(out.vnode.state.current.onRegister).equals(true)
    })
})

o.spec("desactiveLoginRegister is working", function() {
    var out = mq(NoAccount)

    o("desactiveLoginRegister", function() {
        out.vnode.state.desactiveLoginRegister()
        o(out.vnode.state.current.onLogin).equals(false)
        o(out.vnode.state.current.onRegister).equals(false)
        o(out.vnode.state.current.errorMessage).equals("")
    })
})

o.spec("displayloading is displayed if necessary", function() {
    var out = mq(NoAccount)

    o("displayloading display spinner", function() {
        out.vnode.state.current.displayLoading = true
        out.redraw()
        out.should.have(".spinner")
    })

    o("displayloading does not display spinner", function() {
        out.vnode.state.current.displayLoading = true
        out.redraw()
        out.should.not.have("#connectionContainer")
    })
})

o.spec("connectionContainer is displayed", function() {
    var out = mq(NoAccount)

    o("displayloading display spinner", function() {
        out.vnode.state.current.displayLoading = false
        out.redraw()
        out.should.not.have(".spinner")
    })

    o("displayloading does not display spinner", function() {
        out.vnode.state.current.displayLoading = false
        out.redraw()
        out.should.have("#connectionContainer")
    })
})

o.spec("error message is displayed", function() {
    var out = mq(NoAccount)

    o("error div display error message", function() {
        out.vnode.state.current.errorMessage = "error"
        out.redraw()
        out.should.have("#errorConnection")
        out.should.contain("error")
    })

})


o.spec("onLogin display", function() {
    var out = mq(NoAccount)

    o("display connectionTopContainer if onLogin is true", function() {
        out.vnode.state.current.onLogin = true
        out.redraw()
        out.should.have(".connectionTopContainer")
        out.should.contain("Login")
    })

    o("dont display connectionButton if onLogin is true", function() {
        out.vnode.state.current.onLogin = true
        out.redraw()
        out.should.not.have(".connectionButton")
    })

    o("display login if onLogin is false & onRegister false", function() {
        out.vnode.state.current.onLogin = false
        out.vnode.state.current.onRegister = false
        out.redraw()
        out.should.have("#login")
    })

})

o.spec("onRegister display", function() {
    var out = mq(NoAccount)

    o("display connectionTopContainer if onRegister is true", function() {
        out.vnode.state.current.onRegister = true
        out.redraw()
        out.should.have(".connectionTopContainer")
        out.should.contain("Register")
    })

    o("dont display connectionButton if onRegister is true", function() {
        out.vnode.state.current.onRegister = true
        out.redraw()
        out.should.not.have(".connectionButton")
    })

    o("display login if onLogin is false & onRegister false", function() {
        out.vnode.state.current.onLogin = false
        out.vnode.state.current.onRegister = false
        out.redraw()
        out.should.have("#register")
    })

})


o.spec("ConnectionInput display", function() {
    var out = mq(NoAccount)

    o("display ConnectionInput if onLogin is true", function() {
        out.vnode.state.current.onLogin = true
        out.redraw()
        out.should.have("#connectionWindow")
    })

    o("display ConnectionInput if onRegister is true", function() {
        out.vnode.state.current.onRegister = true
        out.redraw()
        out.should.have("#connectionWindow")
    })

    o("dont display ConnectionInput if onRegister is false and onLogin is false", function() {
        out.vnode.state.current.onLogin = false
        out.vnode.state.current.onRegister = false
        out.redraw()
        out.should.not.have("#connectionWindow")
    })


})
