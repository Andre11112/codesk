import React from 'react';
import '../styles/Conocenos.css'; // Asegúrate de tener este archivo CSS en la ruta especificada

const Conocenos = () => {
  return (
    <div className="conocenos-container">
      <h1 className="title">Conócenos</h1>
      <section className="section">
        <h2>Misión</h2>
        <p>Ofrecer soluciones tecnológicas innovadoras y eficientes que agreguen valor a nuestros clientes y contribuyan al desarrollo tecnológico.</p>
      </section>
      <section className="section">
        <h2>Visión</h2>
        <p>Ser líderes en el mercado tecnológico, reconocidos por nuestra creatividad, eficiencia y capacidad de adaptación a las nuevas tecnologías.</p>
      </section>
      <section className="section">
        <h2>Valores</h2>
        <ul>
          <li>Innovación</li>
          <li>Compromiso con el cliente</li>
          <li>Integridad</li>
          <li>Responsabilidad social</li>
        </ul>
      </section>
    </div>
  );
};

export default Conocenos; 