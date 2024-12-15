import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    const plan = JSON.parse(localStorage.getItem('selectedPlan'));
    if (plan) {
      setPlanDetails(plan);
    } else {
      console.error('No se encontró un plan en localStorage');
    }
  }, []);

  const handlePaymentSuccess = async () => {
    if (!planDetails) {
      console.error('Datos del plan ausentes');
      return;
    }
    console.log('Procesar pago con plan:', planDetails);
    navigate('/payment-success');
  };

  const handleCancel = () => {
    const selectedProjectId = localStorage.getItem('selectedProjectId');

    if (selectedProjectId === '1') {
      navigate('/project-details-mobile');
    } else if (selectedProjectId === '2') {
      navigate('/project-details-web');
    } else {
      console.error('No se encontró el ID del proyecto seleccionado.');
      navigate('/'); // Redirige a la página principal
    }
  };

  return (
    <div className="flex justify-center items-start space-x-8 p-4 max-w-6xl mx-auto font-sans">
      {/* Panel Izquierdo - Resumen del pedido */}
      <div className="w-96 bg-white p-6 rounded-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{planDetails ? planDetails.currentPrice : '0,00 €'}</h2>
          <p className="text-gray-600 text-sm">Detalles del Plan</p>
        </div>

        <div className="space-y-6">
          {planDetails && (
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{planDetails.title}</h3>
              </div>
              <span className="text-sm">{planDetails.currentPrice}€</span>
            </div>
          )}
        </div>
      </div>

      {/* Panel Derecho - Formulario de Pago */}
      <div className="w-96 bg-white p-6 rounded-lg">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full bg-red-600 text-white py-3 rounded-md mt-2"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handlePaymentSuccess}
          className="w-full bg-blue-600 text-white py-3 rounded-md mt-2"
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Payment;