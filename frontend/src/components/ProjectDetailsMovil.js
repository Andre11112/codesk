import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import '../styles/ProjectDetails.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ProjectDetailsMovil() {
  const navigate = useNavigate();

  const plans = [
    {
      title: "PLAN BÁSICO",
      originalPrice: "3000€",
      currentPrice: "1500€",
      features: [
        "Diseño Nativo Básico",
        "1 Desarrollador",
        "4 semanas de desarrollo",
        "Soporte básico",
        "1 Revisión del proyecto"
      ]
    },
    {
      title: "PLAN MEDIUM",
      originalPrice: "5000€",
      currentPrice: "2500€",
      features: [
        "Diseño Nativo Avanzado",
        "2 Desarrolladores",
        "6 semanas de desarrollo",
        "Soporte prioritario",
        "3 Revisiones del proyecto",
        "Integración de API",
        "Pruebas de usuario"
      ]
    },
    {
      title: "PLAN MAXI",
      originalPrice: "8000€",
      currentPrice: "4000€",
      features: [
        "Diseño Nativo Premium",
        "3 Desarrolladores",
        "8 semanas de desarrollo",
        "Soporte 24/7",
        "Revisiones ilimitadas",
        "Integración de API avanzada",
        "Pruebas de usuario y rendimiento",
        "Mantenimiento post-lanzamiento"
      ]
    }
  ];

  const handleContract = async (planType) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // Mapeo de tipos de plan a projectType
    const projectTypeMap = {
        "PLAN BÁSICO": 1,
        "PLAN MEDIUM": 1,
        "PLAN MAXI": 1
    };

    const projectType = projectTypeMap[planType];

    // Guardar detalles del plan en localStorage
    const selectedPlan = plans.find(plan => plan.title === planType);
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));

    try {
        const response = await fetch('/api/users/update-project-type', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                projectType
            })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el tipo de proyecto');
        }

        // Navegar al componente de pago
        navigate('/payment');
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Planes de Desarrollo Móvil</h2>
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <Card key={index} className="relative">
            <div className="discount-badge">-50%</div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600 font-bold">{plan.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="price-original">Precio normal {plan.originalPrice}</div>
              <div className="price-current">{plan.currentPrice}</div>
              <ul className="feature-list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="feature-item">
                    <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="action-button" onClick={() => handleContract(plan.title)}>CONTRATAR</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

