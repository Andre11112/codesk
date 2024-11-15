const express = require('express');
const pool = require('../db');

const router = express.Router();

// Ruta para obtener programadores web (status_id = 1)
router.get('/api/programmers/web', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM programmers WHERE status_id = 1');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching web programmers:', error);
        res.status(500).json({ message: 'Error al obtener programadores web' });
    }
});


// Ruta para obtener programadores móviles (status_id = 2)
router.get('/api/programmers/mobile', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM programmers WHERE status_id = 2');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching mobile programmers:', error);
        res.status(500).json({ message: 'Error al obtener programadores móviles' });
    }
});

// Ruta para enviar un mensaje
router.post('/', async (req, res) => {
    const { chat_id, sender_id, sender_type, message_text } = req.body;

    if (!chat_id || !sender_id || !sender_type || !message_text) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO chat_messages (chat_id, sender_id, sender_type, message_text) VALUES ($1, $2, $3, $4) RETURNING *',
            [chat_id, sender_id, sender_type, message_text]
        );

        const newMessage = result.rows[0];
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});

module.exports = router;