var bodyParser = require("body-parser");
const cors = require('cors');
var cookieParser = require('cookie-parser')

class appConfig {

    constructor(app) {
        this.app = app;
    }

    appConnection() {
        this.app.use(bodyParser.json())
        this.app.use(cors())
        this.app.use(cookieParser())
    }

}
module.exports = appConfig;