import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
<<<<<<< HEAD
  const [isProgrammer, setIsProgrammer] = useState(false);
=======
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    securityQuestion: '',
    securityAnswer: '',
<<<<<<< HEAD
    programmerCode: '',
=======
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
    recaptcha: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, recaptcha: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const endpoint = isProgrammer ? '/api/auth/register/programmer' : '/api/auth/register';
      const response = await fetch(endpoint, {
=======
      const response = await fetch('/api/auth/register', {
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
<<<<<<< HEAD
        navigate('/login');
=======
        navigate('/select-project');
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
      } else {
        alert(`Error en el registro: ${data.error || 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error en el registro: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="form-content">
<<<<<<< HEAD
        <div className="user-type-toggle">
          <button className={!isProgrammer ? 'active' : ''} onClick={() => setIsProgrammer(false)}>Usuario</button>
          <button className={isProgrammer ? 'active' : ''} onClick={() => setIsProgrammer(true)}>Programador</button>
        </div>
        <h2>Crea una cuenta como {isProgrammer ? 'Programador' : 'Usuario'}</h2>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí.</a></p>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
=======
        <h2>Crea una cuenta</h2>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí.</a></p>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            
          </div>
          <div className="form-group">
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
            <label htmlFor="firstName">Nombre:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
<<<<<<< HEAD
=======
            <label htmlFor="security-question">Pregunta de seguridad:</label>
            <select
              id="security-question"
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Elige una opción</option>
              <option value="q1">¿Cuál es el nombre de tu primera mascota?</option>
              <option value="q2">¿En qué ciudad naciste?</option>
              <option value="q3">¿Cuál es tu comida favorita?</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="security-answer">Respuesta de la pregunta:</label>
            <input
              type="text"
              id="security-answer"
              name="securityAnswer"
              placeholder="Respuesta"
              value={formData.securityAnswer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <small>Utiliza 8 o más caracteres con una combinación de letras, números y símbolos</small>
          </div>
<<<<<<< HEAD
          {isProgrammer && (
            <div className="form-group">
              <label htmlFor="programmerCode">Código de Programador:</label>
              <input
                type="text"
                id="programmerCode"
                name="programmerCode"
                value={formData.programmerCode}
                onChange={handleChange}
                required
              />
            </div>
          )}
=======
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
          <div className="recaptcha-container">
            <input
              type="checkbox"
              id="recaptcha"
              name="recaptcha"
              checked={formData.recaptcha}
              onChange={handleCheckboxChange}
              required
            />
            <label htmlFor="recaptcha">I'm not a robot</label>
            <div className="recaptcha-img">
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
            </div>
          </div>
          <button type="submit" className="submit-button">Crear cuenta</button>
        </form>
        <p>Al crear una cuenta, aceptas nuestra <a href="#">Términos de uso</a> y <a href="#">Política de privacidad</a>.</p>
      </div>
    </div>
  );
};

export default Register;
