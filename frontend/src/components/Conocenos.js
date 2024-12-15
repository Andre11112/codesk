import React from 'react';
import '../styles/Conocenos.css';
import imagen1 from '../assets/images/1.png';

const Conocenos = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`conocenos-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Encabezado */}
      <header className="header shadow-md sticky top-0 z-10 w-full">
        <div className="header-content max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="logo-section flex items-center space-x-4">
            <img src={imagen1} alt="Logo" className="logo-image" />
            <h1 className={`logo-text ${darkMode ? 'text-white' : 'text-black'}`}>Codesk</h1>
          </div>
          {/* Navegación */}
          <nav className="nav-menu space-x-4 font-semibold">
            <a href="/" className={`nav-link ${darkMode ? 'text-white' : 'text-black'}`}>Home</a>
            <a href="#sobre-nosotros" className={`nav-link ${darkMode ? 'text-white' : 'text-black'}`}>Sobre Nosotros</a>
            <a href="#contacto" className={`nav-link ${darkMode ? 'text-white' : 'text-black'}`}>Contacto</a>
          </nav>
          {/* Botones de Inicio Sesión */}
          <div className="action-buttons flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
              {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
            </button>
            <a href="/login" className="boton-inicio-sesion">Iniciar Sesión</a>
            <a href="/register" className="registro">Registro</a>
          </div>
        </div>
      </header>

      {/* Sección principal */}
      <main className="main-content">
        {/* Sobre Nosotros */}
        <section id="sobre-nosotros" className="section bg-light">
          <h2 className="section-title">Sobre Nosotros</h2>
          <p className="section-description">
            En Codesk, creemos en el poder de la tecnología para transformar ideas en soluciones innovadoras.
          </p>
          <div className="grid-content">
            {/* Tarjetas descriptivas */}
            <div className="card">
              <h3>¿Quiénes Somos?</h3>
              <p>
                Codesk nació con la misión de hacer el desarrollo de software accesible, eficiente y personalizado.
              </p>
            </div>
            <div className="card">
              <h3>Qué Hacemos</h3>
              <p>
                Transformamos ideas en proyectos exitosos: desde aplicaciones básicas hasta sistemas empresariales escalables.
              </p>
            </div>
            <div className="card">
              <h3>Nuestros Valores</h3>
              <ul>
                <li>Innovación</li>
                <li>Transparencia</li>
                <li>Trabajo en Equipo</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="section contact-section bg-dark text-white">
          <h2 className="section-title">Contáctanos</h2>
          <form className="contact-form">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" placeholder="Introduce tu nombre" required />
            
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Introduce tu email" required />
            
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" placeholder="Tu mensaje" required></textarea>
            
            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Conocenos;