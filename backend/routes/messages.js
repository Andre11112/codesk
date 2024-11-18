const express = require('express');
const pool = require('../db');

const router = express.Router();

// Ruta para enviar un mensaje
router.post('/', async (req, res) => {
    console.log('Datos recibidos:', req.body);
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
