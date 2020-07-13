
const db = require("../config/db")
const fs = require('fs');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;
function mapKey(listOfKeys, req) {
    // console.log(listOfKeys, req)
    if (Object.keys(req).length === listOfKeys.length) {
        for (let i = 0; i < listOfKeys.length; i++) {
            if (!req.hasOwnProperty(listOfKeys[i])) {
                // console.log(i)
                return false
            }
        }
        return true
    }

    return false
}
function genrateToken(email) {
    var token = jwt.sign({
        data: email
    }, 'secret', { expiresIn: 60 * 60 });
    return token
}
function verifyToken(token) {
    var decoded = jwt.verify(token, 'secret');
    return decoded
}
class RouteHandler {

    async register(req, res) {
        console.log("registration")
        var myobj = req.body
        let arr = myobj.flow === 'eventManaging' ? ['name', 'mobile', 'email', 'avatar', 'regType', 'tickets', 'flow'] : ['name', 'mobile', 'email', 'password', 'flow', "tasks"]

        try {
            if (mapKey(arr, myobj)) {
                const dbo = await new db().connect();
                dbo.collection("users").findOne({ email: myobj.email }, function (err, result) {
                    if (result) {
                        res.status(400).send({
                            success: false,
                            id: null,
                            message: 'Email id is already used'
                        })
                    }
                    else {
                        dbo.collection("users").insertOne(myobj, function (err, result) {
                            if (err) throw err;
                            // console.log("1 document inserted", result.insertedId);
                            let _myObj = JSON.parse(JSON.stringify(myobj))
                            _myObj.action = 'register'
                            _myObj.id = result.insertedId
                            res.status(200).send({
                                success: true,
                                id: result.insertedId,
                                userInfo: _myObj
                            })
                        });
                    }
                })

            }
            else {
                res.status(400).send({
                    success: false,
                    id: null
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).send({
                success: false,
                id: null
            })
        }
    }

    async checkUser(req, res) {
        var email = req.query.email
        var flow = req.query.flow
        console.log(req.query)
        try {
            if (email && flow && Object.keys(req.query).length === 2) {
                const dbo = await new db().connect();
                dbo.collection("users").findOne({ email }, function (err, result) {
                    if (err) throw err;
                    // console.log("seraching", result);
                    if (result) {
                        res.status(200).send({
                            success: flow === 'login' ? false : true,
                            message: flow === 'login' ? '' : 'This Email id is already used.'
                        })
                    }
                    else {
                        res.status(200).send({
                            success: flow === 'login' ? true : false,
                            message: flow !== 'login' ? '' : 'This Email id is not registered.'
                        })
                    }
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    id: null
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).send({
                success: false,
                id: null
            })
        }
    }


    async login(req, res) {
        console.log("login")
        const dbo = await new db().connect();
        var myobj = req.body
        // console.log(myobj)
        const { flow, email, password } = myobj
        try {
            if (flow === 'eventManaging') {
                if (email && password && Object.keys(myobj).length === 3 && email === 'admin@admin.admin' && password === 'emq73123') {
                    const cookieConfig = {
                        domain: 'localhost',
                        path: '/'
                    };
                    let _myObj = JSON.parse(JSON.stringify(myobj))
                    _myObj.action = 'login'
                    let token = genrateToken(myobj.email)
                    res.cookie('token', token, cookieConfig)
                    res.status(200).send({
                        success: true,
                        token: token,
                        userInfo: _myObj
                    })
                }
                else {
                    res.status(400).send({
                        success: false,
                        id: null,
                        message: 'Only Admin can login in Event'
                    })
                }
            }
            else if (flow === 'taskManaging') {
                if (email && password && Object.keys(myobj).length === 3) {
                    dbo.collection("users").findOne({ "email": email, "password": password }, function (err, result) {
                        if (err) throw err;
                        // console.log("seraching", result);
                        if (result) {
                            res.status(200).send({
                                success: true,
                                userInfo: result,
                                token: genrateToken(result._id)
                            })
                        }
                        else {
                            res.status(400).send({
                                success: false,
                                message: 'Invalid credential'
                            })
                        }
                    });
                }
                else {
                    res.status(400).send({
                        success: false,
                        message: 'Invalid request'
                    })
                }
            }
            else {
                res.status(400).send({
                    success: false,
                    message: 'invalid request'
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                id: null
            })
        }

    }


    async getAllUsers(req, res) {
        try {
            let token = verifyToken(req.get('token'))
            // console.log(token)
            if (token.data === 'admin@admin.admin') {
                const dbo = await new db().connect();
                dbo.collection("users").find({ flow: 'eventManaging' }).toArray(function (err, result) {
                    if (err) throw err;
                    // console.log(result);
                    res.send({
                        status: true,
                        data: result
                    })
                });
            }
            else {
                res.status(400).send({
                    status: false,
                    message: 'Invalid request'
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).send({
                status: false,
                message: err.message
            })
        }
    }
    async getAllUsersCount(req, res) {
        try {

            const dbo = await new db().connect();
            dbo.collection("users").find({ flow: 'eventManaging' }).toArray(function (err, result) {
                if (err) throw err;
                // console.log(result);
                res.send({
                    status: true,
                    count: result.length
                })
            });
        }
        catch (err) {
            console.log(err)
            res.status(400).send({
                status: false,
                message: err.message
            })
        }
    }
    async addTask(req, res) {

        console.log(req.query)
        try {
            let token = verifyToken(req.get('token'))
            let id = req.query.id
            if (token.data === id) {
                const dbo = await new db().connect();
                dbo.collection("users").updateOne(
                    { "_id": new ObjectId(id) }, // query matching 
                    { $push: { "tasks": req.body } } //single object will be pushed to attachemnts
                    , function (err, result) {
                        res.status(200).send({
                            success: true,
                            userInfo: result
                        })
                    })
            }
            else {
                res.status(400).send({
                    status: false,
                    message: "id is  null"
                })
            }
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    }

    async updateTask(req, res) {
        var ObjectId = require('mongodb').ObjectID;
        console.log(req.query)
        try {
            let token = verifyToken(req.get('token'))
            let id = req.query.id
            let taskId = req.query.taskId
            let updatedStatus = req.query.updatedStatus
            if (token.data === id) {
                const dbo = await new db().connect();
                dbo.collection("users").updateOne(
                    { "_id": new ObjectId(id), "tasks.id": parseInt(taskId) }, { $set: { "tasks.$.status": updatedStatus } },
                    function (err, result) {
                        res.status(200).send({
                            success: true,
                            userInfo: result
                        })
                    })
            }
            else {
                res.status(400).send({
                    status: false,
                    message: "id is  null"
                })
            }
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    }
    async deleteTask(req, res) {
        var ObjectId = require('mongodb').ObjectID;
        console.log(req.query)
        try {
            let token = verifyToken(req.get('token'))
            let id = req.query.id
            let taskId = req.query.taskId
            console.log(id, taskId)
            if (token.data === id) {
                const dbo = await new db().connect();
                dbo.collection("users").updateOne(
                    { "_id": new ObjectId(id) }, // query matching 
                    { $pull: { "tasks": { id: parseInt(taskId) } } } //single object will be pushed to attachemnts
                    , function (err, result) {
                        res.status(200).send({
                            success: true,
                            userInfo: result
                        })
                    })
            }
            else {
                res.status(400).send({
                    status: false,
                    message: "id is  null"
                })
            }
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    }
    async getAllTask(req, res) {
        var ObjectId = require('mongodb').ObjectID;
        console.log(req.query)
        try {
            let token = verifyToken(req.get('token'))
            let id = req.query.id
            console.log(token)
            if (token.data === id) {
                const dbo = await new db().connect();
                dbo.collection("users").findOne(
                    { "_id": new ObjectId(id) }, function (err, result) {
                        res.status(200).send({
                            success: true,
                            tasks: result.tasks
                        })
                    })
            }
            else {
                res.status(400).send({
                    status: false,
                    message: "id is null"
                })
            }
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    }
    async authenticate(req, res) {
        try {
            let token = verifyToken(req.get('token'))
            let email = token.data
            console.log(email)
            if (email === 'admin@admin.admin') {
                res.status(200).send({
                    success: true, userInfo: { "name": 'Admin', "flow": 'eventManaging' }
                })
            }
            else {
                const dbo = await new db().connect();
                dbo.collection("users").findOne({ "_id": new ObjectId(email) }, function (err, result) {
                    if (err) throw err;
                    // console.log("seraching", result);
                    if (result) {
                        let _result = JSON.parse(JSON.stringify(result))
                        delete _result.password
                        delete _result.tasks
                        res.status(200).send({
                            success: true,
                            userInfo: _result
                        })
                    }
                    else {
                        res.status(400).send({
                            success: false,
                            id: null,
                            message: 'Invalid Request'
                        })
                    }
                });
            }
        }
        catch (err) {
            // console.log(err)
            res.status(400).send({
                status: false,
                message: err.message
            })
        }
    }
}
module.exports = RouteHandler;