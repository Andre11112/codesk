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

// Ruta para registrar el pago
router.post('/record-payment', async (req, res) => {
    const { userId, email, card_number, country_or_region, planType } = req.body;

    try {
        // Primero verificamos que el plan existe
        const planCheck = await pool.query(
            'SELECT * FROM plan_details WHERE plan_type = $1',
            [planType]
        );

        if (planCheck.rows.length === 0) {
            return res.status(400).json({
                error: 'Plan no válido',
                message: `El plan "${planType}" no existe en la base de datos`
            });
        }

        // Verificamos que el usuario existe
        const userCheck = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [userId]
        );

        if (userCheck.rows.length === 0) {
            return res.status(400).json({
                error: 'Usuario no válido',
                message: 'El usuario no existe en la base de datos'
            });
        }

        // Registramos el pago
        const paymentResult = await pool.query(
            'INSERT INTO payments (user_id, email, card_number, country_or_region, plan_type, is_paid, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
            [userId, email, card_number, country_or_region, planType, true]
        );

        // También registramos el plan del usuario
        await pool.query(
            'INSERT INTO user_plans (user_id, plan_type, is_paid, paid_at) VALUES ($1, $2, $3, NOW())',
            [userId, planType, true]
        );

        res.status(200).json({
            message: 'Pago registrado con éxito',
            payment: paymentResult.rows[0]
        });
    } catch (error) {
        console.error('Error al registrar el pago:', error);
        res.status(500).json({
            error: 'Error al registrar el pago',
            message: error.message
        });
    }
});

// Ruta para obtener información de un usuario específico
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Obtener información del usuario junto con su último pago y plan
        const result = await pool.query(
            `SELECT u.id, u.first_name, u.last_name, u.email, u.project_type,
                    p.plan_type, p.is_paid, p.created_at as payment_date,
                    (SELECT COUNT(*) FROM payments WHERE user_id = u.id AND is_paid = true) as total_plans
             FROM users u
             LEFT JOIN payments p ON u.id = p.user_id
             WHERE u.id = $1
             ORDER BY p.created_at DESC
             LIMIT 1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        res.status(500).json({
            error: 'Error al obtener datos del usuario'
        });
    }
});

// Ruta para obtener los proyectos de un usuario
router.get('/user/:userId/projects', async (req, res) => {
    const { userId } = req.params;

    try {
        // Obtener todos los pagos y planes del usuario
        const result = await pool.query(
            `SELECT p.*, pd.*, up.is_paid, up.paid_at
             FROM payments p
             JOIN plan_details pd ON p.plan_type = pd.plan_type
             LEFT JOIN user_plans up ON p.user_id = up.user_id AND p.plan_type = up.plan_type
             WHERE p.user_id = $1
             ORDER BY p.created_at DESC`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'No se encontraron proyectos para este usuario'
            });
        }

        // Formateamos la información de todos los proyectos
        const projects = result.rows.map(row => ({
            id: row.id,
            name: row.plan_type,
            type: row.plan_type.includes('WEB') ? 2 : 1,
            status: row.is_paid ? 'Activo' : 'Pendiente',
            description: row.description,
            features: row.features.split(', '),
            price: row.price,
            created_at: row.created_at,
            paid_at: row.paid_at
        }));

        res.json(projects);
    } catch (error) {
        console.error('Error al obtener proyectos del usuario:', error);
        res.status(500).json({
            error: 'Error al obtener proyectos del usuario'
        });
    }
});

// Ruta para verificar si el usuario tiene un plan
router.get('/check-user-plan/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            `SELECT EXISTS (
                SELECT 1 
                FROM payments p
                WHERE p.user_id = $1 
                AND p.is_paid = true
            ) as has_plan`,
            [userId]
        );

        res.json({ 
            hasPlan: result.rows[0].has_plan
        });
    } catch (error) {
        console.error('Error al verificar el plan del usuario:', error);
        res.status(500).json({
            error: 'Error al verificar el plan del usuario'
        });
    }
});

module.exports = router;

