const express = require("express")
const appConfig = require("./config/appConfig")
const routes = require('./web/route');

class Server {

    constructor() {
        this.app = express()
    }
    connect() {
        new appConfig(this.app).appConnection()
        this.app.listen(8000, function () {
            console.log("listening at 8000")
        })
        new routes(this.app).routeConfig()

    }
}
const app = new Server();
app.connect();