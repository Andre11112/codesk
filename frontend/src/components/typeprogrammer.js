import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/typeprogrammer.css';
import backgroundImage from '../assets/images/30.png';

const TypeProgrammer = () => {
    const navigate = useNavigate();
    const [modalType, setModalType] = useState(null);
    const [status_id, setStatusId] = useState(null);

    const handleSelection = (type) => {
        setModalType(type);
        setStatusId(type === 'web' ? 1 : (type === 'mobile' ? 2 : null));
    };

    const closeModal = () => {
        setModalType(null);
    };

    const handleNavigate = async () => {
        closeModal();
        const programmerId = localStorage.getItem('programmerId');
        console.log('Programmer ID:', programmerId);
        console.log('Modal Type:', modalType);
        try {
            const response = await fetch('/api/auth/update/status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    programmerId: programmerId,
                    status: modalType
                }),
            });

            if (response.ok) {
                if (status_id === 1) {
                    navigate('/select-user-project-web');
                } else if (status_id === 2) {
                    navigate('/select-user-project');
                }
            } else {
                const errorData = await response.json();
                console.error('Error al actualizar el estado:', errorData);
                alert('Error al actualizar el estado: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error al enviar el estado:', error);
            alert('Error al enviar el estado: ' + error.message);
        }
    };

    return (
        <div className="type-programmer-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="type-programmer-container">
                <h1>Codesk Para desarrolladores</h1>
                <p>Especialista en crear soluciones digitales innovadoras y eficientes para tus necesidades tecnológicas.
                    Selecciona Tu especialidad de desarrollo: </p>
                <div className="buttons">
                    <button onClick={() => handleSelection('web')} className="button web">Programador Web</button>
                    <button onClick={() => handleSelection('mobile')} className="button mobile">Programador Móvil</button>
                </div>

                {modalType && (
                    <div className="modal active">
                        <button className="close-modal" onClick={closeModal}>&times;</button>
                        <h2>{modalType === 'web' ? 'Desarrollo Web' : 'Desarrollo Móvil'}</h2>
                        <p>Especialista en:</p>
                        <ul>
                            <li>HTML5, CSS3, JavaScript</li>
                            <li>React, Angular, Vue.js</li>
                            <li>Node.js, PHP, Python</li>
                            <li>Diseño Responsivo</li>
                        </ul>
                        <button onClick={handleNavigate}>Continuar a Chat Web</button>
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
                        <button onClick={handleNavigate}>Continuar</button>
                    </div>
                )}

                {modalType && <div className="overlay active" onClick={closeModal}></div>}
            </div>
        </div>
    );
};

export default TypeProgrammer;
