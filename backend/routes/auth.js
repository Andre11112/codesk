const express = require('express');
const router = express.Router();
const pool = require('../db'); 
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
      'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *', 
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
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

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



// Ruta de inicio de sesión para programadores
router.post('/login/programmer', async (req, res) => {
  const { email, password, programmerCode } = req.body;

  try {
    console.log('Intentando iniciar sesión con:', { email, programmerCode });

    const result = await pool.query('SELECT * FROM programmers WHERE email = $1 AND programmer_code = $2', [email, programmerCode]);
    
    if (result.rows.length === 0) {
      console.log('Credenciales incorrectas: no se encontró el programador');
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const programmer = result.rows[0];
    console.log('Programador encontrado:', programmer);

    const isValidPassword = await bcrypt.compare(password, programmer.password_hash);
    console.log('Contraseña válida:', isValidPassword);

    if (!isValidPassword) {
      console.log('Credenciales incorrectas: contraseña no válida');
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ userId: programmer.id, email: programmer.email, isProgrammer: true }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      programmer: {
        id: programmer.id,
        email: programmer.email,
        firstName: programmer.first_name,
        lastName: programmer.last_name,
        programmerCode: programmer.programmer_code
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión como programador:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});



// Ruta de registro para programadores
router.post('/register/programmer', async (req, res) => {
  const { email, password, firstName, lastName, programmerCode } = req.body; // Cambié password_hash a password
  try {
    // Hacer hash de la contraseña
    const password_hash = await bcrypt.hash(password, 10); // Asegúrate de usar password aquí

    // Insertar el nuevo programador
    const result = await pool.query(
      'INSERT INTO programmers (email, password_hash, first_name, last_name, programmer_code) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, password_hash, firstName, lastName, programmerCode]
    );
    res.status(200).json({ message: 'Registro de programador exitoso', programmer: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar programador:', error);
    res.status(500).json({ error: 'Error al registrar programador' });
  }
});

module.exports = router;
