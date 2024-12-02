import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Check } from 'lucide-react'
import '../styles/ProjectDetails.css'

export default function ProjectDetailsWeb() {
  const plans = [
    {
      title: "PLAN BÁSICO",
      originalPrice: "99€/año",
      currentPrice: "49,50€",
      monthlyPrice: "4,13€",
      features: [
        "1 Dominio Gratis primer año",
        "Whois privado gratuito",
        "2 sitios web",
        "Sin límite de bases de datos"
      ]
    },
    {
      title: "PLAN MEDIUM",
      originalPrice: "199€/año",
      currentPrice: "99,50€",
      monthlyPrice: "8,30€",
      features: [
        "1 Dominio Gratis primer año",
        "Whois privado gratuito",
        "Sin límite de sitios web",
        "Sin límite de bases de datos"
      ]
    },
    {
      title: "PLAN MAXI",
      originalPrice: "299€/año",
      currentPrice: "149,50€",
      monthlyPrice: "12,46€",
      features: [
        "1 Dominio Gratis primer año",
        "Whois privado gratuito",
        "Sin límite de sitios web",
        "Sin límite de bases de datos"
      ]
    }
  ];

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
                    <Check className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="action-button">CONTRATAR</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
