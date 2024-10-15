<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import '../styles/home.css';
=======
import React, { useState } from 'react';
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

>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

=======
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <header className="bg-white shadow-md sticky top-0 z-10 w-3/4 rounded-3xl mx-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">  
<<<<<<< HEAD
          <img src="/1.png" className="logo-image" />
=======
          <img src={imagen1} className="logo-image" />
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
          <nav className="space-x-8 text-black font-semibold ">
            <a href="#" className="hover:text-gray-900 ">Inicio</a>
            <a href="#" className="hover:text-gray-900">Conocenos</a>
            <a href="#" className="hover:text-gray-900">Trabajos</a>
            <a href="MobileChat.js" className="hover:text-gray-900">Contactanos</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/login" className="botonInicioSesion">Iniciar Sesión</a>
<<<<<<< HEAD
            <a href="/register" className="text-sm">Registro</a>
=======
            <a href="/register" className="registro">Registro</a>
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </header>

      <section className="hero-bg py-20 flex items-center justify-center h-screen text-center">
<<<<<<< HEAD
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

=======
        <div className="max-w-4xl mx-auto">
          <h1 className="text-8xl font-bold mb-6">Crea tus experiencias con nosotros</h1>
          <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 w-2/5">Contáctanos</button>
        </div>
      </section>

      <section class="py-16 services-section">
      <div class="container text-center">
        <h2 class="title">Que hacemos</h2>
        <div class="services-grid">
          <div class="service-item">
            <div class="icon">
              <img src={imagen3} alt="Icon" />
            </div>
            <h3>Diseño Web</h3>
            <p>Desde el concepto hasta el lanzamiento, creamos sitios web impresionantes y centrados en el usuario que elevan su marca y atraen a su audiencia.</p>
          </div>
          <div class="service-item">
            <div class="icon">
              <img src={imagen4} alt="Icon" />
            </div>
            <h3>Diseño UI/UX</h3>
            <p>Diseñamos experiencias de usuario fluidas y atractivas que mejoran la interacción, con el objetivo de cultivar a tus clientes y fortalecer tu marca.</p>
          </div>
          <div class="service-item">
            <div class="icon">
              <img src={imagen5} alt="Icon" />
            </div>
            <h3>Diseño responsivo</h3>
            <p>Aseguramos que tu sitio web sea completamente adaptable a cualquier dispositivo, proporcionando una experiencia de usuario óptima.</p>
          </div>
          <div class="service-item service-html5">
              <div class="icon">
                <img src={imagen6} alt="Icon" />
              </div>
              <div class="service-item-content">
                <div>
                  <h3>HTML-5</h3>
                  <p>Utilizamos HTML para estructurar sitios web modernos y flexibles, con una disposición clara que refleja la identidad de tu marca, permitiendo además un fácil mantenimiento y actualizaciones.</p>
                </div>
                <img id="imagen10" src={imagen10} alt="Html5 Icono" />
              </div>
            </div>
            <div class="service-item javascript">
              <div class="icon">
                <img src={imagen7} alt="Icon" />
              </div>
              <div class="service-item-content javascript">
                <div class="text-content"> 
                  <h3>JavaScript</h3>
                  <p>Utilizamos JavaScript para desarrollar sitios web modernos y flexibles, con un diseño impactante que refleja la identidad de tu marca, permitiendo además un fácil mantenimiento y actualizaciones.</p>
                </div>
                <img id="imagen8" src={imagen8} alt="JavaScript Icono" />
              </div>
            </div>


          <div class="service-item">
            <div class="icon">
              <img src={imagen9} alt="Icon" />
            </div>
            <h3>Desarrollo adaptado</h3>
            <p>Ofrecemos soluciones de desarrollo personalizadas para crear funcionalidades únicas que se ajusten a las necesidades del medio.</p>
          </div>
        </div>
      </div>
    </section>



    <section class="py-16 bg-#f5f8ff">
        <div class="max-w-6xl mx-auto">
            <div class="faq-section-container"> 
                <div class="faq-grid">
                    <div class="col-span-2 md:col-span-1 flex justify-end">
                        <h2 class="text-4xl font-bold mb-8 faq-title">Preguntas frecuentes</h2>
                    </div>
                    <div class="col-span-2 md:col-span-1 space-y-4">
                        <div class="faq-item bg-white rounded-lg p-6 shadow-md">
                            <h3 class="text-xl font-semibold">¿Cuánto cuesta desarrollar una página web?</h3>
                            <div class="faq-answer hidden">El costo varía según el tamaño y las características del sitio web.</div>
                        </div>
                        <div class="faq-item bg-white rounded-lg p-6 shadow-md">
                            <h3 class="text-xl font-semibold">¿Qué incluye el mantenimiento de la página web?</h3>
                            <div class="faq-answer hidden">Incluye actualizaciones de seguridad, ajustes de contenido y soporte técnico.</div>
                        </div>
                        <div class="faq-item bg-white rounded-lg p-6 shadow-md">
                            <h3 class="text-xl font-semibold">¿Cómo puedo solicitar una cotización para un proyecto?</h3>
                            <div class="faq-answer hidden">Puedes contactarnos a través del formulario en la página de contacto.</div>
                        </div>
                        <div class="faq-item bg-white rounded-lg p-6 shadow-md">
                            <h3 class="text-xl font-semibold">¿Ofrecen servicios de diseño gráfico?</h3>
                            <div class="faq-answer hidden">Sí, ofrecemos servicios de diseño gráfico como parte de nuestros paquetes.</div>
                        </div>
                        <div class="faq-item bg-white rounded-lg p-6 shadow-md">
                            <h3 class="text-xl font-semibold">¿Cuáles son los plazos habituales para completar un proyecto?</h3>
                            <div class="faq-answer hidden">Dependiendo del alcance del proyecto, los plazos pueden variar entre 4 a 12 semanas.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>




    <div className="mt-16 bg-#f5f8ff"> 
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
      <footer className="py-16 bg-gradient-to-r from-orange-400 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-6">¿Listo para elevar su presencia en línea? Contáctenos hoy para discutir su proyecto.</p>
          <div className="space-x-6">
            <a href="#" className="hover:underline">Inicio</a>
<<<<<<< HEAD
            <a href="#" className="hover:underline">Conocenos</a>
            <a href="#" className="hover:underline">Trabajos</a>
            <a href="#" className="hover:underline">Contactanos</a>
=======
            <a href="#" className="hover:underline">Conócenos</a>
            <a href="#" className="hover:underline">Trabajos</a>
            <a href="#" className="hover:underline">Contáctanos</a>
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <a href="#" className="w-6 h-6 bg-gray-700 rounded-full"></a>
            <a href="#" className="w-6 h-6 bg-gray-700 rounded-full"></a>
            <a href="#" className="w-6 h-6 bg-gray-700 rounded-full"></a>
          </div>
        </div>
      </footer>
    </div>
<<<<<<< HEAD
  );
};

export default Home;
=======
    </div>
  );
};

export default Home;
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
