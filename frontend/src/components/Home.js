import React from 'react';

const Home = () => {
  return (
    <>
      <section className="hero" id="inicio">
        <h1>Bienvenidos a Codesk</h1>
        <p>Somos una empresa dedicada al desarrollo de aplicaciones móviles y páginas web. Nos especializamos en crear soluciones digitales innovadoras y personalizadas que se adaptan a las necesidades específicas de nuestros clientes.</p>
        <a href="#servicios" className="btn">Nuestros Servicios</a>
      </section>

      <section className="services" id="servicios">
        <h2>Nuestros Servicios</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>Desarrollo de Aplicaciones Móviles</h3>
            <p>Creamos aplicaciones móviles innovadoras para iOS y Android que se adaptan a tus necesidades.</p>
          </div>
          <div className="service-card">
            <h3>Desarrollo Web</h3>
            <p>Diseñamos y desarrollamos sitios web responsivos y de alto rendimiento para tu negocio.</p>
          </div>
          <div className="service-card">
            <h3>Soluciones Personalizadas</h3>
            <p>Ofrecemos soluciones digitales a medida que se adaptan perfectamente a tus requerimientos específicos.</p>
          </div>
        </div>
      </section>

      <section className="chat-feature">
        <h2>¿Qué ofrece Codesk?</h2>
        <p>Nuestra página web está diseñada para ofrecer a los usuarios una comunicación directa y efectiva con nuestros desarrolladores a través de un chat privado. Este servicio permite a los usuarios resolver sus dudas, obtener asesoramiento personalizado y recibir soporte técnico en tiempo real.</p>
        <a href="#contacto" className="btn">Contáctanos</a>
      </section>
    </>
  );
};

export default Home;
