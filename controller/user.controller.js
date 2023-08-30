const userModel = require('../models/user.model');  
const mongoStore = require('connect-mongo');
const passport = require('passport');

module.exports ={
    register, 
    loginSuccess, 
    loginFailure,
    logout
}

async function register(req, res){
    console.log(req.body);
    const {username, password} = req.body;
    var model = new userModel({
        "username": username, 
    });
    await userModel.register( model, password);
    res.json({
        "status": "success",
        "result": "Registration success"
    });
}


async function loginSuccess(req, res){
    console.log(req.session)
    res.json({
        "status": "success", 
        "result": "login success"
    });
}

async function loginFailure(req, res){
    res.json({
        "status": "failed",
        "result": "login failed"
    })
}

async function logout(req, res){
    req.logout((err)=>{
        if(err) res.status(500).send({"status": "failed", "result": "Logout failed"});
        req.session.destroy();
        res.send({
            "status": "success", 
            "result": "Logout success"
        });
    });
}