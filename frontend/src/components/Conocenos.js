import React from 'react';
import '../styles/Conocenos.css';
import imagen1 from'../assets/images/1.png';
import imagen12 from'../assets/images/12.png';
import imagen14 from'../assets/images/14.png';
import imagen15 from'../assets/images/15.png';
import imagen16 from'../assets/images/16.png';
import imagen17 from'../assets/images/17.png';


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

      <div className="mt-16 bg-#f5f8ff"> 
            <footer class="w-[70%] bg-white shadow-md sticky top-0 z-10 rounded-3xl mx-auto">
              <div class="max-w-6xl mx-auto text-left coesk-footer-content">
                  <div class="coesk-logo-section">
                      <img src={imagen12} alt="Logo" class="coesk-logo-img"/>
                      <p class="coesk-footer-description">¿Listo para elevar su presencia en línea? Contáctenos hoy para discutir su proyecto y descubrir cómo podemos hacer realidad su visión.</p>
                  </div>
                    <div class="coesk-menu-section">
                        <a href="/Home" class="hover:underline">Inicio</a>
                        <a href="/Conocenos" class="hover:underline">Conócenos</a>
                        <a href="#" class="hover:underline">Trabajos</a>
                        <a href="#" class="hover:underline">Contáctanos</a>
                    </div>
                  <div class="coesk-social-section">
                    <a href="#"><img src={imagen14} alt="Instagram Icon" /></a>
                    <a href="#"><img src={imagen15} alt="LinkedIn Icon" /></a>
                    <a href="#"><img src={imagen16} alt="TikTok Icon" /></a>
                    <a href="#"><img src={imagen17} alt="Dribbble Icon" /></a>
                  </div>
              </div>
          </footer>
        </div>


    </div>
    
  );
};

export default Conocenos;
