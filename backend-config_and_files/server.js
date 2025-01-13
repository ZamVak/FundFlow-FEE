const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Database connection file

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API Endpoints

// Add Transaction
app.post('/api/transactions', async (req, res) => {
    const { user_id, name, amount, bank_id, category_id, mode_id, status_id, transaction_date, description } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO transactions 
            (user_id, name, amount, bank_id, category_id, mode_id, status_id, transaction_date, description) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, name, amount, bank_id, category_id, mode_id, status_id, transaction_date, description]
        );
        res.status(201).json({ message: 'Transaction added successfully', transaction_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch Transactions
app.get('/api/transactions', async (req, res) => {
    try {
        const [transactions] = await db.query('SELECT * FROM transactions');
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
