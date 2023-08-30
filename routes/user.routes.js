const passport = require('passport');
const router = require('express').Router();
const asynchandler = require('express-async-handler');
const userController= require('../controller/user.controller');
const middleware = require('../middleware/auth.middleware');
router.post('/login', passport.authenticate('local', {
    successRedirect: "/api/user/success", 
    failureRedirect: "/api/user/fail"
}),asynchandler((err, req, res, next)=>{
    console.log(JSON.stringify(req.body));
    if(err) next(err);
}));
router.post('/register', asynchandler(userController.register));
router.get('/success' , asynchandler(userController.loginSuccess));
router.get('/fail', asynchandler(userController.loginFailure));
router.get('/logout', asynchandler(userController.logout));
module.exports = router;