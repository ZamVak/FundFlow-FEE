const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'finance_manager',
});

module.exports = pool.promise();
