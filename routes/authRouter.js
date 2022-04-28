const con = require('../public/services/db');
const express = require('express');
const authRouter = express.Router();
const passport = require('passport');



authRouter.get('/login',(req, res)=> {
    res.render('login')
})
authRouter.post('/login',passport.authenticate('local', {successRedirect: '/',failureRedirect: '/auth/failed'}),
    (req,res) => {
        console.log("route"+req.body.username);
});

authRouter.get('/failed',(req,res) => {
    res.status(401).json({error:"Invalid Login Details"})
})

authRouter.get('/logout', function(req,res){
    req.session.destroy();
    global.user =false;
    res.redirect('/auth/login');
    console.log("Logged out of" + user)
});

authRouter.get('/test',(req, res)=> {
    console.log("TESTINGS");
    console.log(req.session);
})

module.exports = authRouter;