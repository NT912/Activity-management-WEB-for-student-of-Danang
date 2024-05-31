const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session'); // session
const RedisStore  = require('connect-redis')(session);

const multer = require("multer");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const {initializeApp} = require("firebase/app");
const firebase = require('./util/firebase');


const dotenv = require('dotenv');
/*
    service
*/
const errorController = require('./controllers/error'); // controllers error
const { initRedis, getRedis, closeRedis } = require('./util/redis');
const db = require('./util/database'); // mysql database

dotenv.config({path: './.env'})
const app = express();

initRedis(); // connect to redis server

const upload = multer({storage: multer.memoryStorage()}); // package for get document
firebase.initialFirebaseApp();

/*
    set folder MVC
*/
app.set('view engine', 'ejs'); // view engine
app.set('views', 'views'); // folder view 
app.use(express.static('public'));

/*
    Routes
*/
const adminRoutes = require('./routes/admin');  //admin routes
const activityRoute = require('./routes/activityRoute'); // game routes
const homeRoutes = require('./routes/homeRoute'); // home routes
const authRoutes = require('./routes/authRoute'); // account routes

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'))); // path join asset
const port = 3200;

/*
    Config Redis to storage session
*/
app.use(session({
    // store: new RedisStore({ client: getRedis()}), // RedisStore
    secret: 'hehehehe',
    saveUninitialized : false,
    resave: false,
    cookie: {
        secure: false, // if true: only transmit cookie over https
        httpOnly: true, // if true: prevent client side js from reding the cookie
        maxAge: 1*10*1000, // 60 second
    }
}));

// route
app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use('/activity', activityRoute);
app.use('/account', authRoutes);
app.use(errorController.get404);

app.listen(port, () =>
{
    console.log(`running server on ${port}`);
});
