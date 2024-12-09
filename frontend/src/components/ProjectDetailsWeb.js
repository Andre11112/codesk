import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import '../styles/ProjectDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ProjectDetailsWeb() {
  const navigate = useNavigate();

  const plans = [
    {
      title: "PLAN BÁSICO",
      originalPrice: "99€/año",
      currentPrice: "49,50€",
      monthlyPrice: "4,13€",
      features: [
        "1 Dominio Gratis primer año",
        "2 desarrolladores",
        "2 sitios web",
        "límite de bases de datos",
        "Soporte básico"
      ]
    },
    {
      title: "PLAN MEDIUM",
      originalPrice: "199€/año",
      currentPrice: "99,50€",
      monthlyPrice: "8,30€",
      features: [
        "1 Dominio Gratis primer año",
        "3 desarrolladores",
        "Sin límite de sitios web",
        "Sin límite de bases de datos",
        "Soporte prioritario",
        "3 Revisiones del proyecto",
        "Integración de API"
      ]
    },
    {
      title: "PLAN MAXI",
      originalPrice: "299€/año",
      currentPrice: "149,50€",
      monthlyPrice: "12,46€",
      features: [
        "1 Dominio Gratis primer año",
        "4 desarrolladores",
        "Sin límite de sitios web",
        "Sin límite de bases de datos",
        "Soporte 24/7",
        "Revisiones ilimitadas",
        "Integración de API avanzada",
        "Mantenimiento post-lanzamiento"
      ]
    }
  ];

  const handleContract = async (planType) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // Mapeo de tipos de plan a projectType
    const projectTypeMap = {
      "PLAN BÁSICO": 2, // Web
      "PLAN MEDIUM": 2, // Web
      "PLAN MAXI": 2    // Web
    };

    const projectType = projectTypeMap[planType]; // Obtén el tipo de proyecto correspondiente

    try {
      const response = await fetch('/api/users/update-project-type', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          projectType // Asegúrate de que esto sea un número
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
      <h2 className="title">Planes de Desarrollo Web</h2>
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <Card key={index} className="relative">
            <div className="discount-badge">-50%</div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600 font-bold">{plan.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="price-original">Precio normal {plan.originalPrice}</div>
              <div className="price-current">
                {plan.currentPrice}
                <span className="price-period">/año</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">Son {plan.monthlyPrice} al mes</div>
              <ul className="feature-list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="feature-item">
                    <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="action-button" onClick={() => handleContract(plan.title)}>CONTRATAR</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
