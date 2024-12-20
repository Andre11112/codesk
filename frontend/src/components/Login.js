import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [isProgrammer, setIsProgrammer] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    programmerCode: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isProgrammer ? '/api/auth/login/programmer' : '/api/auth/login';
      const dataToSend = isProgrammer 
        ? { email: formData.email, password: formData.password, programmerCode: formData.programmerCode }
        : { email: formData.email, password: formData.password };
      
      console.log('Datos enviados al servidor:', dataToSend);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        // Guardar todos los datos necesarios en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', isProgrammer ? 'programmer' : 'user');
        
        if (isProgrammer) {
          localStorage.setItem('programmerId', data.programmer.id);
          navigate('/typeprogrammer');
        } else {
          localStorage.setItem('userId', data.user.id);
          console.log('userId guardado:', data.user.id);
          
          // Verificar si el usuario tiene un plan
          const planCheckResponse = await fetch(`http://localhost:5000/api/users/check-user-plan/${data.user.id}`, {
            headers: {
              'Authorization': `Bearer ${data.token}`
            }
          });

          if (planCheckResponse.ok) {
            const planData = await planCheckResponse.json();
            if (planData.hasPlan) {
              navigate('/user-perfil');
            } else {
              navigate('/select-project');
            }
          } else {
            navigate('/select-project'); // Por defecto, si hay error en la verificación
          }
        }
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
        <div className="user-type-toggle">
          <button className={!isProgrammer ? 'active' : ''} onClick={() => setIsProgrammer(false)}>Usuario</button>
          <button className={isProgrammer ? 'active' : ''} onClick={() => setIsProgrammer(true)}>Programador</button>
        </div>
        <h2>Inicia sesión como {isProgrammer ? 'Programador' : 'Usuario'}</h2>
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
          <button type="submit" className="submit-button">Iniciar Sesión</button>
          <div className="register-prompt">
            <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
