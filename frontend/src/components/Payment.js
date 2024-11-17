import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [country, setCountry] = useState('');
    const [planDetails, setPlanDetails] = useState(null);
    const [isWebPlan, setIsWebPlan] = useState(false);

    useEffect(() => {
        const plan = JSON.parse(localStorage.getItem('selectedPlan'));
        const projectType = localStorage.getItem('projectType');
        setIsWebPlan(projectType === '2');
        setPlanDetails(plan);
    }, []);

    const handlePaymentSuccess = async () => {
        const userId = localStorage.getItem('userId');
        const projectType = localStorage.getItem('projectType');

        if (!userId || !email || !cardNumber || !country || !planDetails) {
            console.error('Faltan datos necesarios para procesar el pago');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/record-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    email,
                    card_number: cardNumber,
                    country_or_region: country,
                    planType: planDetails.title,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar el pago');
            }

            const chatRoute = projectType === '1' ? '/chat/mobile' : '/chat/web';
            navigate(chatRoute);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        const selectedProjectId = localStorage.getItem('selectedProjectId');
        if (selectedProjectId) {
            navigate(`/project-details-${selectedProjectId === '1' ? 'mobile' : 'web'}`);
        } else {
            console.error('No se encontró el ID del proyecto seleccionado');
        }
    };

    return (
        <div className="flex justify-center items-start space-x-8 p-4 max-w-6xl mx-auto font-sans">
            {/* Left Panel - Order Summary */}
            <div className="w-96 bg-white p-6 rounded-lg">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">
                        {planDetails ? (
                            isWebPlan ? (
                                <>
                                    {planDetails.currentPrice}
                                    <span className="text-sm text-gray-500">/año</span>
                                </>
                            ) : (
                                planDetails.currentPrice
                            )
                        ) : '0,00 €'}
                    </h2>
                    <p className="text-gray-600 text-sm">Detalles del Plan</p>
                </div>

                <div className="space-y-6">
                    {planDetails && (
                        <div className="flex items-start">
                            <div className="flex-1">
                                <h3 className="font-medium text-sm">{planDetails.title}</h3>
                                {isWebPlan && (
                                    <p className="text-gray-500 text-xs">
                                        Son {planDetails.monthlyPrice} al mes
                                    </p>
                                )}
                                <ul className="mt-2 space-y-1">
                                    {planDetails.features.map((feature, index) => (
                                        <li key={index} className="text-gray-500 text-xs flex items-center">
                                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <span className="text-sm">
                                {isWebPlan ? (
                                    <>
                                        {planDetails.currentPrice}
                                        <span className="text-xs text-gray-500">/año</span>
                                    </>
                                ) : (
                                    planDetails.currentPrice
                                )}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-6 pt-6 border-t text-xs text-gray-500">
                    Powered by Stripe
                </div>
            </div>

            {/* Right Panel - Payment Form */}
            <div className="w-96 bg-white p-6 rounded-lg">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePaymentSuccess(); }}>
                    <div>
                        <label className="block text-sm mb-1">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Detalles de la tarjeta</label>
                        <input
                            type="text"
                            placeholder="1234 1234 1234 1234"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <div className="flex space-x-4 mt-2">
                            <input
                                type="text"
                                placeholder="MM / AA"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-1/2 p-2 border rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="CVC"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                className="w-1/2 p-2 border rounded-md"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Nombre del titular de la tarjeta</label>
                        <input
                            type="text"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">País o región</label>
                        <select
                            className="w-full p-2 border rounded-md text-gray-500"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un país</option>
                            <option value="España">España</option>
                            <option value="Francia">Francia</option>
                            <option value="Alemania">Alemania</option>
                            <option value="Italia">Italia</option>
                            <option value="Reino Unido">Reino Unido</option>
                            <option value="Estados Unidos">Estados Unidos</option>
                            <option value="México">México</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Chile">Chile</option>
                            {/* Agrega más países según sea necesario */}
                        </select>
                        <input
                            type="text"
                            placeholder="Código postal"
                            className="w-full p-2 border rounded-md mt-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md mt-6"
                    >
                        Pagar {planDetails ? planDetails.currentPrice : '0,00 €'}
                    </button>

                    {/* Botón de Cancelar */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full bg-red-600 text-white py-3 rounded-md mt-2"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;