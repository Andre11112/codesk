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

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                // Obtener usuarios con planes móviles pagados
                const response = await fetch('http://localhost:5000/api/users/users/1');
                
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
    }, []);

    const handleChatClick = (userId) => {
        localStorage.setItem('selectedUserId', userId);
        navigate('/chat/programmer/mobile');
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
                Usuarios con Proyectos Móviles
            </h2>

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <div className="text-center">Cargando usuarios...</div>
            ) : users.length === 0 ? (
                <div className="text-center text-gray-600">
                    No hay usuarios con planes móviles activos en este momento.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <Card 
                            key={user.id} 
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl flex justify-between items-center">
                                    <span>{user.first_name} {user.last_name}</span>
                                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                        Plan Activo
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-600">Email: {user.email}</p>
                                        <p className="text-gray-600 text-sm">
                                            Fecha de compra: {new Date(user.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h4 className="font-semibold mb-2">Detalles del Plan:</h4>
                                        <p className="text-blue-600 font-medium">
                                            {user.plan_type}
                                        </p>
                                        {user.description && (
                                            <p className="text-sm text-gray-600 mt-2">
                                                {user.description}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleChatClick(user.id)}
                                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                        </svg>
                                        Iniciar Chat
                                    </button>
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