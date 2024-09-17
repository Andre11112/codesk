import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const { type } = useParams();
    const [programmers, setProgrammers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProgrammers = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/programmers?type=${type}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProgrammers(data);
            } catch (e) {
                console.error("Hubo un problema con la petición fetch:", e);
                setError("No se pudieron cargar los programadores. Por favor, intenta de nuevo más tarde.");
            }
        };
        fetchProgrammers();
    }, [type]);

    const startChat = (programmerId) => {
        console.log(`Iniciar chat con programador ID: ${programmerId}`);
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="chat-container">
            <h2>Programadores disponibles para {type === 'mobile' ? 'Aplicación Móvil' : 'Aplicación Web'}</h2>
            {programmers.length === 0 ? (
                <p>Cargando programadores...</p>
            ) : (
                <ul>
                    {programmers.map((programmer) => (
                        <li key={programmer.id}>
                            {programmer.name} - {programmer.description}
                            <button onClick={() => startChat(programmer.id)}>Iniciar Chat</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Chat;