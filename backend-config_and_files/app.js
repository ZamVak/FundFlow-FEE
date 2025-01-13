const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'finance_manager', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Example route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
