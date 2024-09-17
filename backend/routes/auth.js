const express = require('express');
const router = express.Router();
const pool = require('../db'); // Asegúrate de que esta ruta sea correcta
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Ruta de registro
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body; 
  try {
    // Verificar si el correo ya existe
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' }); // Error si el usuario ya existe
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *', // Cambiar password a password_hash
      [email, hashedPassword, firstName, lastName] 
    );
    res.status(200).json({ message: 'Registro exitoso', user: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Buscar el usuario en la base de datos
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar respuesta exitosa
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
