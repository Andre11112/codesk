const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

// Ruta para obtener usuarios según el tipo de proyecto
router.get('/users/:projectType', async (req, res) => {
  const { projectType } = req.params;
  console.log('GET /users/:projectType - Parámetros recibidos:', {
    projectType,
    tipoParametro: typeof projectType
  });
  
  try {
    console.log('Ejecutando consulta SQL para projectType:', projectType);
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, project_type FROM users WHERE project_type = $1',
      [projectType]
    );
    
    console.log('Resultados de la consulta:', {
      cantidadResultados: result.rows.length,
      primerosRegistros: result.rows.slice(0, 3)
    });
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error en GET /users/:projectType:', {
      mensaje: error.message,
      stack: error.stack,
      consulta: error.query
    });
    res.status(500).json({ error: 'Error al obtener usuarios' });
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


router.put('/update-project-type', authenticateToken, async (req, res) => {
    try {
        const { userId, projectType } = req.body;
        
        // Verificar que el usuario existe
        const userCheck = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [userId]
        );

        if (userCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar el tipo de proyecto
        const result = await pool.query(
            'UPDATE users SET project_type = $1 WHERE id = $2 RETURNING *',
            [projectType, userId]
        );

        console.log('Usuario actualizado:', result.rows[0]);

        res.json({
            message: 'Tipo de proyecto actualizado exitosamente',
            user: result.rows[0]
        });

    } catch (error) {
        console.error('Error al actualizar el tipo de proyecto:', error);
        res.status(500).json({ error: 'Error al actualizar el tipo de proyecto' });
    }
});

// Rutas para los planes de usuario
router.post('/user-plans', async (req, res) => {
    const { user_id, plan_type } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO user_plans (user_id, plan_type) VALUES ($1, $2) RETURNING *',
            [user_id, plan_type]
        );

        res.status(201).json({
            message: 'Plan añadido exitosamente',
            plan: result.rows[0]
        });
    } catch (error) {
        console.error('Error al añadir el plan:', error);
        res.status(500).json({
            error: 'Error del servidor',
            message: 'No se pudo añadir el plan'
        });
    }
});
// Ruta para registrar el pago del plan
router.put('/user-plans/:id/pay', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'UPDATE user_plans SET is_paid = TRUE, paid_at = NOW() WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Plan no encontrado',
                message: 'No se encontró el plan con el ID proporcionado'
            });
        }

        res.json({
            message: 'Pago registrado exitosamente',
            plan: result.rows[0]
        });
    } catch (error) {
        console.error('Error al registrar el pago:', error);
        res.status(500).json({
            error: 'Error del servidor',
            message: 'No se pudo registrar el pago'
        });
    }
});

// Ejemplo de endpoint en Express.js
router.post('/record-payment', async (req, res) => {
    const { userId, email, card_number, country_or_region, planType } = req.body;

    try {
        await pool.query(
            'INSERT INTO payments (user_id, email, card_number, country_or_region, plan_type, is_paid, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())',
            [userId, email, card_number, country_or_region, planType, true]
        );

        res.status(200).send('Pago registrado con éxito');
    } catch (error) {
        console.error('Error al registrar el pago:', error);
        res.status(500).send('Error al registrar el pago');
    }
});

module.exports = router;

