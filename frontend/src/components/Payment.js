import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();

    const handlePaymentSuccess = () => {
        // Suponiendo que el tipo de proyecto se guarda en localStorage
        const projectType = localStorage.getItem('projectType');
        const chatRoute = projectType === '1' ? '/chat/mobile' : '/chat/web';
        navigate(chatRoute);
    };

    return (
        <div>
            <h1>Pago del Proyecto</h1>
            <button onClick={handlePaymentSuccess}>Confirmar Pago</button>
        </div>
    );
};

export default Payment; 