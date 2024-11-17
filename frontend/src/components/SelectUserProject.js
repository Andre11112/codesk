import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Alert from './ui/Alert';
import { AlertDescription } from "./ui/Alert";
import '../styles/SelectUserProject.css';

const SelectUserProject = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const programmerType = localStorage.getItem('programmerType'); // 'web' o 'mobile'

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const projectType = programmerType === 'web' ? '2' : '1';
                const response = await fetch(`/api/users/users/${projectType}`);
                
                if (!response.ok) {
                    throw new Error('Error al cargar los usuarios');
                }
                
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error:', error);
                setError('Error al cargar los usuarios. Por favor, intente nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [programmerType]);

    const handleUserSelect = (userId) => {
        const chatRoute = programmerType === 'web' ? '/chat/web' : '/chat/mobile';
        localStorage.setItem('selectedUserId', userId);
        navigate(chatRoute);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
                Usuarios con Proyectos {programmerType === 'web' ? 'Web' : 'Móviles'}
            </h2>

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <div className="text-center">Cargando usuarios...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <Card 
                            key={user.id} 
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleUserSelect(user.id)}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    {user.first_name} {user.last_name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-gray-600">Email: {user.email}</p>
                                    <div className="border-t pt-2">
                                        <h4 className="font-semibold mb-2">Detalles del Plan:</h4>
                                        {user.selectedPlan && (
                                            <>
                                                <p className="text-blue-600 font-medium">
                                                    {user.selectedPlan.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Precio: {user.selectedPlan.currentPrice}
                                                </p>
                                                <ul className="mt-2 space-y-1">
                                                    {user.selectedPlan.features.map((feature, index) => (
                                                        <li key={index} className="text-sm text-gray-600">
                                                            • {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectUserProject; 