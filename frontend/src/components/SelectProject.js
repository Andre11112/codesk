import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SelectProject.css';

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
        <div className="select-project-container">
            <h2>¿Qué tipo de proyecto quieres trabajar?</h2>
            <button onClick={() => handleSelection('mobile')}>Aplicación Móvil</button>
            <button onClick={() => handleSelection('web')}>Aplicación Web</button>
        </div>
    );
};

export default SelectProject;
