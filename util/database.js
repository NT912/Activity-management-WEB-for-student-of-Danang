const mysql = require('mysql2');
require('dotenv').config();
console.log(process.env.DB_HOST);
const pool = mysql.createConnection(
    {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

pool.connect(function(err, connection) 
{
         if (err)
            console.log(err);
})

module.exports = pool;
