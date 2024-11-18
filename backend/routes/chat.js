const express = require('express');
const pool = require('../db');

const router = express.Router();





// Ruta para obtener el historial del chat
router.get('/history/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params;
        const result = await pool.query(
            'SELECT * FROM chat_messages WHERE chat_id = $1 ORDER BY sent_at ASC',
            [chatId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener historial del chat:', error);
        res.status(500).json({ error: 'Error al obtener historial del chat' });
    }
});

// Ruta para crear un nuevo chat
router.post('/create', async (req, res) => {
    const { user_id, programmer_id } = req.body;

    // Agregar console.log para verificar los valores recibidos
    console.log('user_id:', user_id);
    console.log('programmer_id:', programmer_id);

    // Validar que los campos necesarios estén presentes
    if (!user_id || !programmer_id) {
        return res.status(400).json({ error: 'user_id y programmer_id son obligatorios' });
    }

    try {
        // Crear nuevo chat
        const result = await pool.query(
            `INSERT INTO chats (user_id, programmer_id, created_at, last_message_at, status) 
             VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'active') 
             RETURNING id`,
            [user_id, programmer_id]
        );

        res.status(201).json({ 
            chat_id: result.rows[0].id,
            message: 'Chat creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear chat:', error);
        res.status(500).json({ error: 'Error al crear el chat' });
    }
});

// Ruta para obtener programadores mobile
router.get('/programmers/mobile', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM programmers WHERE status_id = 2'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener programadores mobile:', error);
        res.status(500).json({ error: 'Error al obtener programadores mobile' });
    }
});

// Ruta para obtener programadores web
router.get('/programmers/web', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM programmers WHERE status_id = 1'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener programadores web:', error);
        res.status(500).json({ error: 'Error al obtener programadores web' });
    }
});

module.exports = router;
