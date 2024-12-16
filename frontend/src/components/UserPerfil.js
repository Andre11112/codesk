import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Alert from './ui/Alert';
import { AlertDescription } from "./ui/Alert";

const UserPerfil = ({ darkMode }) => {
    const [userData, setUserData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');

                if (!userId || !token) {
                    navigate('/login');
                    return;
                }

                console.log('Fetching user data for ID:', userId);

                // Obtener datos del usuario
                const userResponse = await fetch(`http://localhost:5000/api/users/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!userResponse.ok) {
                    const errorData = await userResponse.json();
                    throw new Error(errorData.error || 'Error al cargar los datos del usuario');
                }

                const userData = await userResponse.json();
                console.log('User data received:', userData);
                setUserData(userData);

                // Obtener proyectos del usuario
                const projectsResponse = await fetch(`http://localhost:5000/api/users/user/${userId}/projects`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!projectsResponse.ok) {
                    const errorData = await projectsResponse.json();
                    throw new Error(errorData.error || 'Error al cargar los proyectos');
                }

                const projectsData = await projectsResponse.json();
                console.log('Projects data received:', projectsData);
                setProjects(projectsData);
            } catch (error) {
                console.error('Error in fetchUserData:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const getProjectTypeText = (type) => {
        return type === 1 ? 'Móvil' : 'Web';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className={`container mx-auto p-6 ${darkMode ? 'dark-mode' : ''}`}>
            {/* Información del Usuario */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl">Perfil de Usuario</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-2xl">
                                    {userData?.first_name?.charAt(0)}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {userData?.first_name} {userData?.last_name}
                                        </h2>
                                        <p className="text-gray-600">{userData?.email}</p>
                                        {userData?.plan_type && (
                                            <div className="mt-2">
                                                <p className="text-sm text-blue-600">
                                                    Plan actual: {userData.plan_type}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Estado: {userData.is_paid ? 'Pagado' : 'Pendiente'}
                                                </p>
                                                {userData.payment_date && (
                                                    <p className="text-xs text-gray-500">
                                                        Último pago: {new Date(userData.payment_date).toLocaleDateString()}
                                                    </p>
                                                )}
                                                {userData.total_plans > 0 && (
                                                    <p className="text-xs text-blue-500 font-semibold mt-1">
                                                        Total de planes activos: {userData.total_plans}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => navigate('/select-project')}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                        </svg>
                                        <span>Comprar Nuevo Plan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Lista de Proyectos */}
            <div>
                <h3 className="text-xl font-semibold mb-4">
                    Mis Proyectos ({projects.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{project.name}</span>
                                    <span className={`text-sm px-2 py-1 rounded ${
                                        project.status === 'Activo' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {project.status}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        Tipo: {getProjectTypeText(project.type)}
                                    </p>
                                    <p className="text-gray-600">
                                        Precio: {project.price}€
                                    </p>
                                    {project.paid_at && (
                                        <p className="text-gray-600 text-sm">
                                            Pagado el: {new Date(project.paid_at).toLocaleDateString()}
                                        </p>
                                    )}
                                    {project.description && (
                                        <p className="text-gray-600 text-sm mt-2">
                                            {project.description}
                                        </p>
                                    )}
                                    <div className="mt-4">
                                        <h4 className="font-semibold mb-2">Características:</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {project.features.map((feature, index) => (
                                                <li key={index} className="text-gray-600 text-sm">
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            onClick={() => navigate(
                                                project.type === 1 
                                                    ? '/chat/user/mobile'  // Chat para proyectos móviles
                                                    : '/chat/user/web'     // Chat para proyectos web
                                            )}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full flex items-center justify-center gap-2"
                                        >
                                            <span>Chatear con Programadores</span>
                                            <span className="text-sm">
                                                ({project.type === 1 ? 'Móvil' : 'Web'})
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPerfil; 