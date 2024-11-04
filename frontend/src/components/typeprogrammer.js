import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/typeprogrammer.css';
import backgroundImage from '../assets/images/30.png';

const TypeProgrammer = () => {
    const navigate = useNavigate();
    const [modalType, setModalType] = useState(null);

    const handleSelection = (type) => {
        setModalType(type);
    };

    const closeModal = () => {
        setModalType(null);
    };

    const handleNavigate = (type) => {
        closeModal();
        if (type === 'web') {
            navigate('/chat/web');
        } else {
            navigate('/chat/mobile');
        }
    };

    return (
        <div className="type-programmer-wrapper" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="type-programmer-container">
                <h1>Codesk Para desarrolladores</h1>
                <p>Especialista en crear soluciones digitales innovadoras y eficientes para tus necesidades tecnológicas.
                    Selecciona Tu especialidad de desarrollo: </p>
                <div className="buttons">
                    <button onClick={() => handleSelection('web')} className="button web">Programador Web</button>
                    <button onClick={() => handleSelection('mobile')} className="button mobile">Programador Móvil</button>
                </div>

                {modalType === 'web' && (
                    <div className="modal active" id="webModal">
                        <button className="close-modal" onClick={closeModal}>&times;</button>
                        <h2>Desarrollo Web</h2>
                        <p>Especialista en:</p>
                        <ul>
                            <li>HTML5, CSS3, JavaScript</li>
                            <li>React, Angular, Vue.js</li>
                            <li>Node.js, PHP, Python</li>
                            <li>Diseño Responsivo</li>
                        </ul>
                        <button onClick={() => handleNavigate('web')}>Continuar a Chat Web</button>
                    </div>
                )}

                {modalType === 'mobile' && (
                    <div className="modal active" id="mobileModal">
                        <button className="close-modal" onClick={closeModal}>&times;</button>
                        <h2>Desarrollo Móvil</h2>
                        <p>Especialista en:</p>
                        <ul>
                            <li>Android (Kotlin/Java)</li>
                            <li>iOS (Swift)</li>
                            <li>React Native</li>
                            <li>Flutter</li>
                        </ul>
                        <button onClick={() => handleNavigate('mobile')}>Continuar a Chat Móvil</button>
                    </div>
                )}

                {modalType && <div className="overlay active" onClick={closeModal}></div>}
            </div>
        </div>
    );
};

export default TypeProgrammer;
