import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando solicitud de inicio de sesión:', formData);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      console.log('Respuesta recibida:', response);
      const data = await response.json();
      console.log('Datos de respuesta:', data);
      if (response.ok) {
        // Guardar el token en localStorage si es necesario
        localStorage.setItem('token', data.token);
        
        // Redirigir a la página de selección de proyecto
        navigate('/select-project');
      } else {
        alert(`Error al iniciar sesión: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Inicia sesión</h2>
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
            <span className="toggle-password">Hide</span>
          </div>
          <button type="submit" className="submit-button">Iniciar Sesión</button>
          <div className="forgot-password">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="register">
            <span>¿No tienes cuenta? </span><a href="/register">Regístrate aquí</a>
          </div>
          <div className="captcha-info">
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more</a>.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
