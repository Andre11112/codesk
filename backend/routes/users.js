const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ruta para obtener usuarios según el tipo de proyecto
router.get('/users/:projectType', async (req, res) => {
  const { projectType } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, project_type FROM users WHERE project_type = $1',
      [projectType]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Ruta para actualizar el tipo de proyecto del usuario
router.put('/update-project-type', async (req, res) => {
    const { userId, projectType } = req.body;

    try {
        // Verificar si el usuario existe
        const userCheck = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

        if (userCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar el tipo de proyecto
        const updateResult = await pool.query(
            'UPDATE users SET project_type = $1 WHERE id = $2 RETURNING *',
            [projectType, userId]
        );

        res.status(200).json({
            message: 'Tipo de proyecto actualizado exitosamente',
            user: updateResult.rows[0]
        });
    } catch (error) {
        console.error('Error al actualizar el tipo de proyecto:', error);
        res.status(500).json({ error: 'Error al actualizar el tipo de proyecto', details: error.message });
    }
});

// Ruta para obtener usuarios móviles
router.get('/mobile', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE project_type = 1'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener usuarios móviles:', error);
        res.status(500).json({ error: 'Error al obtener usuarios móviles' });
    }
});

// Middleware de logging específico para rutas de usuarios
router.use((req, res, next) => {
  console.log(`Ruta de usuarios accedida: ${req.method} ${req.url}`);
  next();
});

// Ruta para obtener usuarios web
router.get('/web', async (req, res) => {
  try {
      console.log('Intentando obtener usuarios web...');
      const result = await pool.query(
          'SELECT * FROM users WHERE project_type = 2'
      );
      console.log('Usuarios encontrados:', result.rows);
      res.json(result.rows);
  } catch (error) {
      console.error('Error al obtener usuarios web:', error);
      res.status(500).json({ error: 'Error al obtener usuarios web' });
  }
});

module.exports = router;

