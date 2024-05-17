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
// const storageFirebase = firebase.initialFirebaseApp(); // init firebase app
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
const port = 5100;

/*
    Config Redis to storage session
*/


// route
app.use('/admin', adminRoutes);
app.use('/home', homeRoutes);
app.use('/activity', activityRoute);
app.use('/account', authRoutes);
app.use(errorController.get404);

app.listen(port, () =>
{
    console.log(`running server on ${port}`);
});
