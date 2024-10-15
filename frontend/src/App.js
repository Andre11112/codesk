import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import SelectProject from './components/SelectProject';
import MobileChat from './components/MobileChat';
import WebChat from './components/WebChat';
import './App.css';

function App() {
    const location = useLocation();
    const hideHeaderRoutes = ['/login', '/register', '/select-project', '/chat/mobile', '/chat/web', '/'];

    return (
        <div className="App">
            <div className="content-wrapper">
                {!hideHeaderRoutes.includes(location.pathname) && (
                    <header>
                        <div className="logo">Codesk</div>
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
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/select-project" element={<SelectProject />} />
                        <Route path="/chat/mobile" element={<MobileChat />} />
                        <Route path="/chat/web" element={<WebChat />} />
                    </Routes>
                </main>
            </div>

            <footer>
                <p>&copy; 2023 Codesk. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
