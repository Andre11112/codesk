import React from 'react';
import '../styles/Conocenos.css';
import imagen1 from '../assets/images/1.png';
import imagen2 from '../assets/images/2.png';

const Conocenos = ({ darkMode, toggleDarkMode }) => {
    return (
        <div className={darkMode ? 'dark-mode' : ''}>
            <header className="bg-white shadow-md sticky top-0 z-10 w-3/4 rounded-3xl mx-auto">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">  
                    <img src={imagen1} className="logo-image" onClick={toggleDarkMode} style={{cursor: 'pointer'}} alt="Logo" />
                    <nav className={`space-x-8 font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                        <a href="/" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Home</a>
                        <a href="#servicios" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Servicios</a>
                        <a href="#sobre-nosotros" className={`hover:${darkMode ? 'text-white-300' : 'text-gray-900'}`}>Sobre Nosotros</a>
                        <a href="#contacto" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Contacto</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        
                        <a href="/login" className="botonInicioSesion">Iniciar Sesión</a>
                        <a href="/register" className="registro">Registro</a>
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    </div>
                </div>
            </header>

            <main>
                <section id="sobre-nosotros">
                    <h1>Conócenos - Codesk</h1>
                    <p>
                        En Codesk, creemos en el poder de la tecnología para transformar ideas en soluciones innovadoras. Somos una plataforma especializada en conectar empresas, emprendedores y negocios con programadores altamente calificados para llevar a cabo proyectos tecnológicos de cualquier tamaño. Ya sea que necesites desarrollar una aplicación sencilla, un sistema de gestión empresarial o una plataforma compleja, estamos aquí para ayudarte a hacer realidad tu visión.
                    </p>

                    <h2>¿Quiénes somos?</h2>
                    <p>
                        Codesk nació con la misión de hacer que el desarrollo de software sea accesible, eficiente y personalizado. Contamos con una red de desarrolladores experimentados en diversas tecnologías y metodologías de desarrollo. Nuestro equipo está compuesto por profesionales comprometidos con ofrecer soluciones tecnológicas adaptadas a cada cliente, asegurando calidad y cumplimiento en cada proyecto.
                    </p>

                    <h2>Qué Hacemos</h2>
                    <p>En Codesk, transformamos ideas en proyectos tecnológicos exitosos:</p>
                    <ul>
                        <li><strong>Proyectos Pequeños:</strong> Desarrollamos aplicaciones básicas, páginas web y herramientas específicas para necesidades puntuales.</li>
                        <li><strong>Proyectos Medianos:</strong> Creamos soluciones de gestión, plataformas de comercio electrónico y aplicaciones personalizadas.</li>
                        <li><strong>Proyectos Grandes:</strong> Diseñamos sistemas complejos, plataformas escalables y soluciones empresariales avanzadas.</li>
                    </ul>

                    <h2>Nuestra Propuesta de Valor</h2>
                    <ul>
                        <li><strong>Equipo Experto:</strong> Contamos con desarrolladores especializados en una amplia gama de tecnologías y lenguajes de programación.</li>
                        <li><strong>Soluciones a Medida:</strong> Adaptamos cada proyecto según los requisitos específicos de tu negocio.</li>
                        <li><strong>Gestión Transparente:</strong> Te mantenemos informado durante todo el proceso de desarrollo.</li>
                        <li><strong>Escalabilidad Garantizada:</strong> Desde la idea inicial hasta la implementación, nuestros proyectos están diseñados para crecer contigo.</li>
                    </ul>

                    <h2>Nuestra Filosofía</h2>
                    <p>
                        En Codesk, valoramos la innovación, la calidad y la transparencia. Creemos que la colaboración cercana con nuestros clientes es clave para lograr resultados excepcionales. Nuestra prioridad es entender tus necesidades, superar tus expectativas y ofrecer soluciones tecnológicas que impulsen tu negocio hacia el éxito.
                    </p>

                    <p><strong>Confía en Codesk.</strong> Juntos, podemos hacer realidad cualquier proyecto tecnológico y llevar tus ideas al siguiente nivel.</p>
                </section>

                <section id="contacto">
                    <h2>Contacto</h2>
                    <form>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required />
                        
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                        
                        <label htmlFor="mensaje">Mensaje:</label>
                        <textarea id="mensaje" name="mensaje" required></textarea>
                        
                        <button type="submit">Enviar</button>
                    </form>
                </section>
            </main>

  
        </div>
    );
};

export default Conocenos;
