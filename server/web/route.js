const routeHandler = require("../handler/RouterHandler")

class route {

    constructor(app) {
        this.app = app;
    }
    appRoutes() {
        let route = new routeHandler()
        this.app.post("/register", route.register)
        this.app.get("/checkuser", route.checkUser)
        this.app.post("/login", route.login)
        this.app.get("/getAllUsers", route.getAllUsers)
        this.app.get("/authenticate", route.authenticate)
        this.app.post("/addTask", route.addTask)
        this.app.delete("/deleteTask", route.deleteTask)
        this.app.get("/getAllTask", route.getAllTask)
        this.app.put("/updateTask", route.updateTask)
        this.app.get("/getAllUsersCount", route.getAllUsersCount)
    }

    routeConfig() {
        this.appRoutes()
    }

}
module.exports = route;