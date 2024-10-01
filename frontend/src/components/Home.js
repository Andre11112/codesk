import React, { useState } from 'react';
import '../styles/home.css';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">  
          <img src="/logo.png" alt="Logo" className="logo-image" />
          <nav className="space-x-8 text-gray-700 font-semibold">
            <a href="#" className="hover:text-gray-900">Inicio</a>
            <a href="#" className="hover:text-gray-900">Conocenos</a>
            <a href="#" className="hover:text-gray-900">Trabajos</a>
            <a href="#" className="hover:text-gray-900">Contactanos</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-sm">Iniciar Sesión</a>
            <a href="/register" className="text-sm">Registro</a>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            {/* Botón deslizable para modo oscuro */}
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </header>

      <section className="hero-bg py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Crea tus experiencias con nosotros</h1>
          <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800">Contáctanos</button>
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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Diseño responsivo</h3>
              <p>Aseguramos que tu sitio web sea completamente adaptable a cualquier dispositivo, proporcionando una experiencia de usuario óptima.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">JavaScript</h3>
              <p>Utilizamos JavaScript para desarrollar sitios web modernos y flexibles, con un diseño impactante que refleja la identidad de tu marca.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
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

      <footer className="py-16 bg-gradient-to-r from-orange-400 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-6">¿Listo para elevar su presencia en línea? Contáctenos hoy para discutir su proyecto.</p>
          <div className="space-x-6">
            <a href="#" className="hover:underline">Inicio</a>
            <a href="#" className="hover:underline">Conocenos</a>
            <a href="#" className="hover:underline">Trabajos</a>
            <a href="#" className="hover:underline">Contactanos</a>
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <a href="#" className="w-6 h-6 bg-gray-700 rounded-full"></a>
            <a href="#" className="w-6 h-6 bg-gray-700 rounded-full"></a>
            <a href="#" className="w-6 h-6 bg-gray-700 rounded-full"></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;