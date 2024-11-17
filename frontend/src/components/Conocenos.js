import React from 'react';
import '../styles/Conocenos.css';
import imagen1 from'../assets/images/1.png';


const Conocenos = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <header className="bg-white shadow-md sticky top-0 z-10 w-3/4 rounded-3xl mx-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">  
          <img src={imagen1} className="logo-image" onClick={toggleDarkMode} style={{cursor: 'pointer'}} alt="Logo" />
          <nav className={`space-x-8 font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
            <a href="/Home" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Inicio</a>
            <a href="/Conocenos" className={`hover:${darkMode ? 'text-white-300' : 'text-gray-900'}`}>Conocenos</a>
            <a href="#" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Trabajos</a>
            <a href="#" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Contactanos</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/login" className="botonInicioSesion">Iniciar Sesión</a>
            <a href="/register" className="registro">Registro</a>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Conocenos;
