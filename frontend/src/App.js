import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import SelectProject from './components/SelectProject';
import MobileChat from './components/MobileChat';
import WebChat from './components/WebChat';
import TypeProgrammer from './components/typeprogrammer';
import './App.css';
import './styles/darkMode.css';
import Conocenos from './components/Conocenos';
import WebChatUser from './components/WebChatUser';
import MobileChatUser from './components/MobileChatUser';
import ProjectDetailsMovil from './components/ProjectDetailsMovil';
import ProjectDetailsWeb from './components/ProjectDetailsWeb';
import Payment from './components/Payment';

function AppContent() {
    const location = useLocation();
    const hideHeaderRoutes = ['/','/login', '/register', '/select-project',
         '/chat/mobile', '/chat/web','/chat/user/web',
         '/chat/user/mobile','/typeprogrammer','/project-details-mobile',
         '/project-details-web','/Conocenos','/payment'];
    
    
         const hideFooterRoutes = [ '/select-project','/typeprogrammer','/chat/web',
        '/chat/mobilechat','/chat/user/web','/chat/user/mobile ','/chat/programmer/web',
        '/chat/programmer/mobile'];
    
        const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
            <div className="content-wrapper">
                {!hideHeaderRoutes.includes(location.pathname) && (
                    <header>
                        <div className="logo" onClick={toggleDarkMode}>Codesk</div>
                        <nav>
                            <Link to="/">Inicio</Link>
                            <Link to="/#servicios">Servicios</Link>
                            <Link to="/#sobre-nosotros">Sobre Nosotros</Link>
                            <Link to="/#contacto">Contacto</Link>
                            <Link to="/register">Registro</Link>
                            <Link to="/login">Iniciar Sesión</Link>
                        </nav>
                    </header>
                )}

                <main>
                    <Routes>
                        <Route path="/" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                        <Route path="/register" element={<Register darkMode={darkMode} />} />
                        <Route path="/login" element={<Login darkMode={darkMode} />} />
                        <Route path="/select-project" element={<SelectProject darkMode={darkMode} />} />
                        <Route path="/chat/mobile" element={<MobileChat darkMode={darkMode} />} />
                        <Route path="/chat/web" element={<WebChat darkMode={darkMode} />} />
                        <Route path="/typeprogrammer" element={<TypeProgrammer />} />
                        <Route path="/conocenos" element={<Conocenos />} />
                        <Route path="/chat/user/web" element={<WebChatUser darkMode={darkMode} />} />
                        <Route path="/chat/user/mobile" element={<MobileChatUser darkMode={darkMode} />} />
                        <Route path="/chat/programmer/web" element={<WebChat darkMode={darkMode} />} />
                        <Route path="/chat/programmer/mobile" element={<MobileChat darkMode={darkMode} />} />
                        <Route path="/project-details-mobile" element={<ProjectDetailsMovil projectType="mobile" />} />
                        <Route path="/project-details-web" element={<ProjectDetailsWeb projectType="web" />} />
                        <Route path="/payment" element={<Payment />} />
                    </Routes>
                </main>
            </div>

            {!hideFooterRoutes.includes(location.pathname) && (
                <footer className={darkMode ? 'dark-mode' : ''}>
                    <p>&copy; 2023 Codesk. Todos los derechos reservados.</p>
                </footer>
            )}
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
