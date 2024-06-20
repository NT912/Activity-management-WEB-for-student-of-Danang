const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const connectMysql = require("connect-mysql");
const { initializeApp } = require("firebase/app");
const firebase = require("./src/utils/firebase");
const authMiddleware = require("./src/middlewares/auth");

dotenv.config();

const appPort = process.env.APP_PORT || 3000;
const app = express();
const MysqlStore = connectMysql(expressSession);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

firebase.initialFirebaseApp();

app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: Number(process.env.SESSION_MAX_AGE) || 3600000,
    },
    store: new MysqlStore({
      config: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      },
    }),
  })
);
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
  Routes
*/
const authRoute = require("./src/routes/authRoute"); //auth routes
const userRoute = require("./src/routes/userRoute"); //user routes
const acitvityRoute = require("./src/routes/activityRoute"); //user routes
const homeRoute = require("./src/routes/homeRoute"); //user routes
const adminRoute = require("./src/routes/adminRoute"); //user routes

app.get("/health_check", (req, res) => {
  res.send("OK");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
// app.use('/user', authMiddleware.isLoggedIn, userRoute );
app.use("/activity", acitvityRoute);
app.use("/admin", adminRoute);
app.use("/", homeRoute);
app.use((req, res) => {
  res.render("404");
});

app.listen(appPort, () => {
  console.log(`Server is running on http://127.0.0.1:${appPort}`);
});
