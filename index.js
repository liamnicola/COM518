require("dotenv").config();
const con = require("./public/services/db");
const express = require('express');
const app = express();
const mysql = require('mysql2');
const {PORT} = process.env;
const bodyParser = require('body-parser');
const path = require('path');
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const cookieParser = require('cookie-parser')
const sessionStore = new MySQLStore({ } , con.promise());
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

app.use(express.json());


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))


app.use(cookieParser('PlacesToStay'));
app.use(expressSession({
    store: sessionStore,
    secret: 'SecretSession',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 600000,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async(username, password, done)=> {
    const userDao = new userDAO(con, "acc_users");
    try {
        const logUser = await userDao.login(username, password);
        if(logUser == null) {
            console.log("LocalStrat Fail")
            return done(null, false);
        }else {
            console.log("LocalStrat Success")
            return done(null, logUser);
        }
    } catch(error) {
        return done(error);
    }
}));

passport.serializeUser((logUser, done) => {
    done(null, logUser[0].ID);
});

passport.deserializeUser(async(userid, done) => {
    try {
        const userDao = new userDAO(con, "acc_users");
        const userInfo = await userDao.ID(userid);
        done(null, userInfo);
    } catch(error) {
        done(error);
    }
})


app.use(function(req,res,next){
    res.locals.isAuthenticated = req.isAuthenticated;
    next();
});

function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/auth/login');
    }
}

global.user = false;

app.use("*", async (req, res, next) => {
  if (!global.user && req.session.passport) {
    const user = req.user;
    global.user = user;}
  next();
});
const accRouter = require('./routes/accRouter');
const authRouter = require('./routes/authRouter');
app.use('/acc', accRouter);
app.use('/auth', authRouter);
const userDAO = require('./DAO/userDAO')

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(PORT, () => {
    console.log(
        `App listening at http://localhost:${PORT}`,
    );
    });
