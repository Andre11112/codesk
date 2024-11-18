import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SelectProject.css';
import backgroundImage from '../assets/images/30.png';

const SelectProject = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleSelection = async (type) => {
        if (!userId) {
            alert('Por favor, inicia sesión primero');
            navigate('/login');
            return;
        }

        const projectType = type === 'mobile' ? 1 : 2;

        try {
            const response = await fetch('/api/users/update-project-type', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    projectType
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Error al actualizar el tipo de proyecto:', errorData);
                throw new Error('Error al actualizar el tipo de proyecto');
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            localStorage.setItem('projectType', projectType.toString());
            navigate(type === 'mobile' ? '/chat/user/mobile' : '/chat/user/web');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al seleccionar el tipo de proyecto: ' + error.message);
        }
    };

    return (
        <div className="select-project-wrapper" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="select-project-container">
                <h2>¿Qué tipo de proyecto quieres trabajar?</h2>
                <div className="buttons">
                    <button 
                        onClick={() => handleSelection('mobile')} 
                        className="button mobile"
                    >
                        Aplicación Móvil
                    </button>
                    <button 
                        onClick={() => handleSelection('web')} 
                        className="button web"
                    >
                        Aplicación Web
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectProject;
