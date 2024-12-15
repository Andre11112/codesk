import React from 'react';
import '../styles/home.css';
import imagen1 from'../assets/images/1.png';
import imagen3 from'../assets/images/3.png';
import imagen4 from'../assets/images/4.png';
import imagen5 from'../assets/images/5.png';
import imagen6 from'../assets/images/6.png';
import imagen7 from'../assets/images/7.png';
import imagen8 from'../assets/images/8.png';
import imagen9 from'../assets/images/9.png';
import imagen10 from'../assets/images/10.png';
import imagen12 from'../assets/images/12.png';
import imagen14 from'../assets/images/14.png';
import imagen15 from'../assets/images/15.png';
import imagen16 from'../assets/images/16.png';
import imagen17 from'../assets/images/17.png';

const Home = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <header className="bg-white shadow-md sticky top-0 z-10 w-3/4 rounded-3xl mx-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">  
          <img src={imagen1} className="logo-image" onClick={toggleDarkMode} style={{cursor: 'pointer'}} alt="Logo" />
          <nav className={`space-x-8 font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
            <a href="/" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Inicio</a>
            <a href="/Conocenos" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Conócenos</a>
            <a href="/trabajos" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Trabajos</a>
            <a href="/contacto" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Contáctanos</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/login" className="botonInicioSesion">Iniciar Sesión</a>
            <a href="/register" className="registro">Registro</a>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </header>

      <section className="hero-bg py-20 flex items-center justify-center h-screen text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-8xl font-bold mb-6">Crea tus experiencias con nosotros</h1>
          <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 w-2/5 contactanos">Contáctanos</button>
        </div>
      </section>

      <section className="py-16 services-section">
        <div className="container text-center">
          <h2 className="title">Qué hacemos</h2>
          <div className="services-grid">
            <div className="service-item">
              <div className="icon">
                <img src={imagen3} alt="Icon" />
              </div>
              <h3>Diseño Web</h3>
              <p>Desde el concepto hasta el lanzamiento, creamos sitios web impresionantes y centrados en el usuario que elevan su marca y atraen a su audiencia.</p>
            </div>
            <div className="service-item">
              <div className="icon">
                <img src={imagen4} alt="Icon" />
              </div>
              <h3>Diseño UI/UX</h3>
              <p>Diseñamos experiencias de usuario fluidas y atractivas que mejoran la interacción, con el objetivo de cultivar a tus clientes y fortalecer tu marca.</p>
            </div>
            <div className="service-item">
              <div className="icon">
                <img src={imagen5} alt="Icon" />
              </div>
              <h3>Diseño responsivo</h3>
              <p>Aseguramos que tu sitio web sea completamente adaptable a cualquier dispositivo, proporcionando una experiencia de usuario óptima.</p>
            </div>
            <div className="service-item service-html5">
              <div className="icon">
                <img src={imagen6} alt="Icon" />
              </div>
              <div className="service-item-content">
                <div>
                  <h3>HTML-5</h3>
                  <p>Utilizamos HTML para estructurar sitios web modernos y flexibles, con una disposición clara que refleja la identidad de tu marca, permitiendo además un fácil mantenimiento y actualizaciones.</p>
                </div>
                <img id="imagen10" src={imagen10} alt="Html5 Icono" />
              </div>
            </div>
            <div className="service-item javascript">
              <div className="icon">
                <img src={imagen7} alt="Icon" />
              </div>
              <div className="service-item-content javascript">
                <div className="text-content"> 
                  <h3>JavaScript</h3>
                  <p>Utilizamos JavaScript para desarrollar sitios web modernos y flexibles, con un diseño impactante que refleja la identidad de tu marca, permitiendo además un fácil mantenimiento y actualizaciones.</p>
                </div>
                <img id="imagen8" src={imagen8} alt="JavaScript Icono" />
              </div>
            </div>
            <div className="service-item">
              <div className="icon">
                <img src={imagen9} alt="Icon" />
              </div>
              <h3>Desarrollo adaptado</h3>
              <p>Ofrecemos soluciones de desarrollo personalizadas para crear funcionalidades únicas que se ajusten a las necesidades del medio.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-#f5f8ff">
        <div className="max-w-6xl mx-auto">
          <div className="faq-section-container"> 
            <div className="faq-grid">
              <div className="col-span-2 md:col-span-1 flex justify-end">
                <h2 className="text-4xl font-bold mb-8 faq-title">Preguntas frecuentes</h2>
              </div>
              <div className="col-span-2 md:col-span-1 space-y-4">
                <div className="faq-item bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold">¿Cuánto cuesta desarrollar una página web?</h3>
                  <div className="faq-answer hidden">El costo varía según el tamaño y las características del sitio web.</div>
                </div>
                <div className="faq-item bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold">¿Qué incluye el mantenimiento de la página web?</h3>
                  <div className="faq-answer hidden">Incluye actualizaciones de seguridad, ajustes de contenido y soporte técnico.</div>
                </div>
                <div className="faq-item bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold">¿Cómo puedo solicitar una cotización para un proyecto?</h3>
                  <div className="faq-answer hidden">Puedes contactarnos a través del formulario en la página de contacto.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;