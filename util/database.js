const mysql = require('mysql2');
require('dotenv').config();
console.log(process.env.DB_HOST);
const pool = mysql.createConnection(
    {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.connect(function(err, connection) 
{
         if (err)
            console.log(err);
})

module.exports = pool;
