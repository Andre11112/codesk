import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import '../styles/Login.css';
=======
import '../styles/Login.css'; 
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320

function Login() {
  const [formData, setFormData] = useState({
    email: '',
<<<<<<< HEAD
    password: '',
    programmerCode: ''
  });
  const [isProgrammer, setIsProgrammer] = useState(false);
=======
    password: ''
  });
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const endpoint = isProgrammer ? '/api/auth/login/programmer' : '/api/auth/login';
      const response = await fetch(endpoint, {
=======
      console.log('Enviando solicitud de inicio de sesión:', formData);
      const response = await fetch('/api/auth/login', {
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
<<<<<<< HEAD
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
=======
      console.log('Respuesta recibida:', response);
      const data = await response.json();
      console.log('Datos de respuesta:', data);
      if (response.ok) {
        // Guardar el token en localStorage si es necesario
        localStorage.setItem('token', data.token);
        
        // Redirigir a la página de selección de proyecto
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
        navigate('/select-project');
      } else {
        alert(`Error al iniciar sesión: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

<<<<<<< HEAD
  const toggleUserType = () => {
    setIsProgrammer(!isProgrammer);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="user-type-toggle">
          <button className={!isProgrammer ? 'active' : ''} onClick={() => setIsProgrammer(false)}>Usuario</button>
          <button className={isProgrammer ? 'active' : ''} onClick={() => setIsProgrammer(true)}>Programador</button>
        </div>
        <h2>Inicia sesión como {isProgrammer ? 'Programador' : 'Usuario'}</h2>
=======
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Inicia sesión</h2>
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
<<<<<<< HEAD
          </div>
          {isProgrammer && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Código de Programador"
                name="programmerCode"
                value={formData.programmerCode}
                onChange={handleChange}
                required
              />
            </div>
          )}
=======
            <span className="toggle-password">Hide</span>
          </div>
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
          <button type="submit" className="submit-button">Iniciar Sesión</button>
          <div className="forgot-password">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="register">
            <span>¿No tienes cuenta? </span><a href="/register">Regístrate aquí</a>
          </div>
<<<<<<< HEAD
=======
          <div className="captcha-info">
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more</a>.</p>
          </div>
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
        </form>
      </div>
    </div>
  );
}

export default Login;
