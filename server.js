require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', async function (req, res) {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ message: 'Connected to MySQL!', result: rows[0].result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/users', async function (req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});