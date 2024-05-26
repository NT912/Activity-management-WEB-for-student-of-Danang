const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const connectMysql = require('connect-mysql');

dotenv.config();

const appPort = process.env.APP_PORT || 3000;
const app = express();
const MysqlStore = connectMysql(expressSession);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: Number(process.env.SESSION_MAX_AGE) || 3600000
  },
  store: new MysqlStore({
    config: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    }
  })
}))
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health_check', (req, res) => {
  res.send('OK');
});
app.use('', require('./src/routes/home'));
app.use('/auth', require('./src/routes/auth'));
app.use('/user', require('./src/routes/user'));

app.listen(appPort, () => {
  console.log(`Server is running on http://127.0.0.1:${appPort}`);
})
