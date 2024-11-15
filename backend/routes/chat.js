const express = require('express');
const pool = require('../db');

const app = express();

app.get('/api/programmers', async (req, res) => {
    const { type } = req.query;
    try {
        const result = await pool.query('SELECT * FROM programmers WHERE type = $1 AND status = $2', [type, 'LIVE']);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener programadores:', error);
        res.status(500).json({ error: 'Error al obtener programadores' });
    }
});

module.exports = app; 