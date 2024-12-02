const express = require('express');
const router = express.Router();
const pool = require('../db');

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


router.put('/update-project-type', async (req, res) => {
    const { userId, projectType } = req.body;
    
    console.log('Actualizando project_type:', {
        userId,
        projectType,
        tipoUserId: typeof userId,
        tipoProjectType: typeof projectType
    });

    try {
        const result = await pool.query(
            'UPDATE users SET project_type = $1 WHERE id = $2 RETURNING id, first_name, last_name, email, project_type',
            [projectType, userId]
        );

        console.log('Resultado de la actualización:', {
            filas: result.rowCount,
            datos: result.rows[0]
        });

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Usuario no encontrado',
                message: 'No se encontró el usuario con el ID proporcionado'
            });
        }

        res.json({
            message: 'Tipo de proyecto actualizado exitosamente',
            user: result.rows[0]
        });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({
            error: 'Error del servidor',
            message: 'Error al actualizar el tipo de proyecto'
        });
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

module.exports = router;

