const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Ruta de registro para usuarios
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validar que todos los campos estén presentes
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    // Hashear la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, password_hash]
    );

    console.log('Usuario registrado:', result.rows[0]);

    // Responder con éxito
    res.status(201).json({ message: 'Registro exitoso', user: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
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
  const { email, password, firstName, lastName, programmerCode, status_id } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO programmers (email, password_hash, first_name, last_name, programmer_code, status_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [email, password_hash, firstName, lastName, programmerCode, status_id !== null ? status_id : 0]
    );
    res.status(200).json({ message: 'Registro de programador exitoso', programmer: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar programador:', error);
    res.status(500).json({ error: 'Error al registrar programador' });
  }
});



// Ruta para actualizar el estado del programador
router.put('/update/status', async (req, res) => {
  const { programmerId, status } = req.body;

  try {
    let id_status;
    if (status === 'web') {
      id_status = 1;
    } else if (status === 'mobile') {
      id_status = 2;
    } else {
      console.error('Estado no válido recibido:', status);
      return res.status(400).json({ error: 'Estado no válido' });
    }

    console.log('ID del programador:', programmerId);
    console.log('Estado recibido:', status);

    const result = await pool.query(
      'UPDATE programmers SET status_id = $1 WHERE id = $2 RETURNING *',
      [id_status, programmerId]
    );

    if (result.rows.length === 0) {
      console.error('Programador no encontrado con ID:', programmerId);
      return res.status(404).json({ error: 'Programador no encontrado' });
    }

    res.status(200).json({ message: 'Estado actualizado exitosamente', programmer: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar el estado:', error.message);
    res.status(500).json({ error: 'Error al actualizar el estado' });
  }
});

module.exports = router;
