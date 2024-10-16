import React, { useState, useEffect } from 'react';
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



const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <header className="bg-white shadow-md sticky top-0 z-10 w-3/4 rounded-3xl mx-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">  
          <img src="/1.png" className="logo-image" />
          <nav className="space-x-8 text-black font-semibold ">
            <a href="#" className="hover:text-gray-900 ">Inicio</a>
            <a href="#" className="hover:text-gray-900">Conocenos</a>
            <a href="#" className="hover:text-gray-900">Trabajos</a>
            <a href="MobileChat.js" className="hover:text-gray-900">Contactanos</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/login" className="botonInicioSesion">Iniciar Sesión</a>
            <a href="/register" className="text-sm">Registro</a>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </header>

      <section className="hero-bg py-20 flex items-center justify-center h-screen text-center">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-80 p-12 rounded-lg shadow-lg">
          <h1 className="text-6xl font-bold mb-6 text-gray-800">Crea tus experiencias con nosotros</h1>
          <p className="text-xl mb-8 text-gray-600">Diseñamos y desarrollamos soluciones web innovadoras para impulsar tu negocio</p>
          <button className="bg-gradient-to-r from-orange-400 to-purple-500 text-white py-3 px-8 rounded-lg font-semibold hover:from-orange-500 hover:to-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Contáctanos
          </button>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Que hacemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Diseño Web</h3>
              <p>Desde el concepto hasta el lanzamiento, creamos sitios web impresionantes y centrados en el usuario que elevan su marca y atraen a su audiencia.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Diseño UI/UX</h3>
              <p>Diseñamos experiencias de usuario fluidas y atractivas que mejoran la interacción, con el objetivo de cultivar a tus clientes y fortalecer tu marca.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 overflow-hidden flex items-center justify-center">
                <img src="/assets/images/8.png" alt="JavaScript" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-4">JavaScript</h3>
              <p>Utilizamos JavaScript para desarrollar sitios web modernos y flexibles, con un diseño impactante que refleja la identidad de tu marca.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 overflow-hidden flex items-center justify-center">
                <img src="/assets/images/10.png" alt="HTML-5" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-4">HTML-5</h3>
              <p>Utilizamos HTML para estructurar sitios web modernos y flexibles, con una disposición clara que refleja tu marca.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Desarrollo adaptado</h3>
              <p>Ofrecemos soluciones de desarrollo personalizadas para crear funcionalidades únicas que se ajusten a las necesidades del medio.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Preguntas frecuentes</h2>
          <div className="space-y-4">
            <div className="faq-item bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold">¿Cuánto cuesta desarrollar una página web?</h3>
              <div className="faq-answer mt-2">El costo varía según el tamaño y las características del sitio web.</div>
            </div>
            <div className="faq-item bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold">¿Qué incluye el mantenimiento de la página web?</h3>
              <div className="faq-answer mt-2">Incluye actualizaciones de seguridad, ajustes de contenido y soporte técnico.</div>
            </div>
            <div className="faq-item bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold">¿Cómo puedo solicitar una cotización para un proyecto?</h3>
              <div className="faq-answer mt-2">Puedes contactarnos a través del formulario en la página de contacto.</div>
            </div>
            <div className="faq-item bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold">¿Ofrecen servicios de diseño gráfico?</h3>
              <div className="faq-answer mt-2">Sí, ofrecemos servicios de diseño gráfico como parte de nuestros paquetes.</div>
            </div>
            <div className="faq-item bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold">¿Cuáles son los plazos habituales para completar un proyecto?</h3>
              <div className="faq-answer mt-2">Dependiendo del alcance del proyecto, los plazos pueden variar entre 4 a 12 semanas.</div>
            </div>
          </div>
        </div>
      </section>




      <div className="mt-16 bg-#f5f8ff"> 
            <footer class="w-[65%] bg-white shadow-md sticky top-0 z-10 rounded-3xl mx-auto">
              <div class="max-w-6xl mx-auto text-left coesk-footer-content">
                  <div class="coesk-logo-section">
                      <img src={imagen12} alt="Logo" class="coesk-logo-img"/>
                      <p class="coesk-footer-description">¿Listo para elevar su presencia en línea? Contáctenos hoy para discutir su proyecto y descubrir cómo podemos hacer realidad su visión.</p>
                  </div>
                    <div class="coesk-menu-section">
                        <a href="#" class="hover:underline">Inicio</a>
                        <a href="#" class="hover:underline">Conócenos</a>
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

export default Home;
