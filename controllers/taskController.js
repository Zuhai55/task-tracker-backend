const db = require('../config/db');

async function getTasks(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [req.userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createTask(req, res) {
    const { title, description } = req.body;

    if (!title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
            [req.userId, title, description || null]
        );

        res.status(201).json({ message: 'Task created', taskId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateTask(req, res) {
    const { title, description, status } = req.body;
    const taskId = req.params.id;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
            [title, description, status, taskId, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteTask(req, res) {
    const taskId = req.params.id;

    try {
        const [result] = await db.query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [taskId, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };