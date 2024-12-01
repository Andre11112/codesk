import React from 'react';

const ProjectDetails = ({ projectType }) => {
    const projectInfo = {
        mobile: {
            price: '$5000',
            developersNeeded: 3,
            estimatedTime: '8 semanas',
        },
        web: {
            price: '$3000',
            developersNeeded: 2,
            estimatedTime: '6 semanas',
        },
    };

    const info = projectInfo[projectType];

    if (!info) {
        return null; // No mostrar nada si no hay información
    }

    return (
        <div className="project-details">
            <h2>Detalles del Proyecto {projectType === 'mobile' ? 'Móvil' : 'Web'}</h2>
            <p><strong>Precio:</strong> {info.price}</p>
            <p><strong>Desarrolladores Necesarios:</strong> {info.developersNeeded}</p>
            <p><strong>Tiempo Estimado de Finalización:</strong> {info.estimatedTime}</p>
        </div>
    );
};

export default ProjectDetails;
