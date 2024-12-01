import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import '../styles/SelectProject.css';
import backgroundImage from '../assets/images/30.png';

const SelectProject = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        console.log('Estado de autenticación:', {
            token: !!token,
            userId: userId,
            tipoUserId: typeof userId
        });

        if (!token || !userId) {
            console.log('No hay sesión activa');
            navigate('/login');
        }
    }, [navigate]);

    const handleSelection = async (type) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        setIsLoading(true);
        setError(null);

        try {
            console.log('Iniciando selección de proyecto:', {
                userId,
                type,
                token: !!token
            });

            const projectType = type === 'mobile' ? 1 : 2;
            
            const response = await fetch('/api/users/update-project-type', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    projectType
                })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar el tipo de proyecto');
            }

            localStorage.setItem('projectType', projectType.toString());
            setSelectedType(type);
            
            navigate(type === 'mobile' ? '/chat/user/mobile' : '/chat/user/web');

        } catch (error) {
            console.error('Error en la selección:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="select-project-wrapper" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="select-project-container">
                <h2>¿Qué tipo de proyecto quieres trabajar?</h2>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="buttons">
                    <button 
                        onClick={() => handleSelection('mobile')} 
                        className={`button mobile ${selectedType === 'mobile' ? 'selected' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Aplicación Móvil'}
                    </button>
                    <button 
                        onClick={() => handleSelection('web')} 
                        className={`button web ${selectedType === 'web' ? 'selected' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Aplicación Web'}
                    </button>
                </div>

                {selectedType && <ProjectDetails projectType={selectedType} />}
            </div>
        </div>
    );
};

export default SelectProject;
