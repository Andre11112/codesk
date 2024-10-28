import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SelectProject.css';
import backgroundImage from '../assets/images/30.png'; // Asegúrate de que la ruta sea correcta

const SelectProject = () => {
    const navigate = useNavigate();

    const handleSelection = (type) => {
        if (type === 'mobile') {
            navigate('/chat/mobile');
        } else {
            navigate('/chat/web');
        }
    };

    return (
        <div className="select-project-wrapper" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="select-project-container">
                <h2>¿Qué tipo de proyecto quieres trabajar?</h2>
                <div className="buttons">
                    <button onClick={() => handleSelection('mobile')} className="button mobile">Aplicación Móvil</button>
                    <button onClick={() => handleSelection('web')} className="button web">Aplicación Web</button>
                </div>
            </div>
        </div>
    );
};

export default SelectProject;
