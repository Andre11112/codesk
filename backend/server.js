require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');  
const pool = require('./db');
const authRoutes = require('./routes/auth');  
const chatRoutes = require('./routes/chat');
const messageRoutes = require('./routes/messages');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use(bodyParser.json());

// Middleware para loggear todas las peticiones
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
};
app.use(cors(corsOptions));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Registra las rutas
app.use('/', chatRoutes);

// Prueba de conexión a la base de datos
pool.query('SELECT NOW()', (err, result) => {  
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos:', result.rows);
  }
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error en el middleware:', err); 
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Servir archivos estáticos de React en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}
