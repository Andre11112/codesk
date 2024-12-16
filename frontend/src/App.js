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
import SelectUserProject from './components/SelectUserProject';
import SelectUserProjectWeb from './components/SelectUserProjectWeb';
import UserPerfil from './components/UserPerfil';
import imagen1 from './assets/images/1.png';

function AppContent() {
    const location = useLocation();
    const hideHeaderRoutes = ['/','/login', '/register', '/select-project',
         '/chat/mobile', '/chat/web','/chat/user/web',"/chat/programmer/web",
         "/chat/programmer/mobile",
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
                    <header className={`bg-white shadow-md sticky top-0 z-10 w-3/4 rounded-3xl mx-auto ${darkMode ? 'dark-mode' : ''}`}>
                        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">  
                            <img src={imagen1} className="logo-image" onClick={toggleDarkMode} style={{cursor: 'pointer'}} alt="Logo" />
                            <nav className={`space-x-8 font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                                <a href="/" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Inicio</a>
                                <a href="/Conocenos" className={`hover:${darkMode ? 'text-white-300' : 'text-gray-900'}`}>Conocenos</a>
                                <a href="#" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Trabajos</a>
                                <a href="#" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Contactanos</a>
                            </nav>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            </div>
                        </div>
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
                        <Route path="/Conocenos" element={<Conocenos />} />
                        <Route path="/chat/user/web" element={<WebChatUser darkMode={darkMode} />} />
                        <Route path="/chat/user/mobile" element={<MobileChatUser darkMode={darkMode} />} />
                        <Route path="/chat/programmer/web" element={<WebChat darkMode={darkMode} />} />
                        <Route path="/chat/programmer/mobile" element={<MobileChat darkMode={darkMode} />} />
                        <Route path="/project-details-mobile" element={<ProjectDetailsMovil projectType="mobile" />} />
                        <Route path="/project-details-web" element={<ProjectDetailsWeb projectType="web" />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/select-user-project" element={<SelectUserProject />} />
                        <Route path="/select-user-project-web" element={<SelectUserProjectWeb />} />
                        <Route path="/selectproject" element={<SelectProject />} />
                        <Route path="/user-perfil" element={<UserPerfil darkMode={darkMode} />} />
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
