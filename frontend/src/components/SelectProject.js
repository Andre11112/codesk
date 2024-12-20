import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectDetails from './ProjectDetailsMovil';
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
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        if (!userId) {
            console.error('No se encontró el ID del usuario');
            setError('Error: Usuario no identificado');
            navigate('/login');
            return;
        }

        console.log('ID del usuario actual:', userId);
        const projectType = type === 'mobile' ? 1 : 2;

        setIsLoading(true);
        setError(null);
        setSelectedType(type);

        try {
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
            
            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar el tipo de proyecto');
            }

            console.log('Actualización exitosa para el usuario:', data.user);
            localStorage.setItem('projectType', projectType.toString());
            
            if (type === 'mobile') {
                navigate('/project-details-mobile');
            } else {
                navigate('/project-details-web');
            }

        } catch (error) {
            console.error('Error:', error);
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
