import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [isProgrammer, setIsProgrammer] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    securityQuestion: '',
    securityAnswer: '',
    programmerCode: '',
    status_id: 0,
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
      const endpoint = isProgrammer ? '/api/auth/register/programmer' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status_id: isProgrammer ? 0 : null,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        if (isProgrammer) {
          if (data.programmer) {
            localStorage.setItem('programmerId', data.programmer.id);
            navigate('/typeprogrammer');
          } else {
            alert('Error: No se recibió información del programador.');
          }
        } else {
          navigate('/select-project');
        }
      } else {
        alert(`Error en el registro: ${data.error || 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error en el registro: ' + error.message);
    }
  };

  return (
    <div className="register-container" >
      <div className="form-content">
        <div className="user-type-toggle">
          <button className={!isProgrammer ? 'active' : ''} onClick={() => setIsProgrammer(false)}>Usuario</button>
          <button className={isProgrammer ? 'active' : ''} onClick={() => setIsProgrammer(true)}>Programador</button>
        </div>
        <h2>Crea una cuenta como {isProgrammer ? 'Programador' : 'Usuario'}</h2>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí.</a></p>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
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
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <small className="dark-text">Utiliza 8 o más caracteres con una combinación de letras, números y símbolos</small>
          </div>
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
