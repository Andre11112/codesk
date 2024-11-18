import React, { useState, useEffect, useRef, useCallback } from 'react';
import Alert from './ui/Alert';
import { AlertDescription } from './ui/Alert';
import '../styles/chat.css';

const WebChatUser = () => {
    const [programmers, setProgrammers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedProgrammer, setSelectedProgrammer] = useState(null);
    const chatMessagesRef = useRef(null);

    const getWebProgrammers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/chat/programmers/web');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProgrammers(data);
        } catch (error) {
            console.error('Error fetching web programmers:', error);
            setError('No se pudieron cargar los programadores web. Por favor, intente más tarde.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getWebProgrammers();
    }, [getWebProgrammers]);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = useCallback(async (messageText) => {
        if (messageText.trim() && selectedProgrammer) {
            const userId = localStorage.getItem('userId');
            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        programmer_id: selectedProgrammer.id,
                        user_id: userId,
                        sender_type: 'user',
                        message_text: messageText,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al enviar el mensaje');
                }

                const newMessage = await response.json();
                setMessages(prev => [...prev, newMessage]);
                setNewMessage('');
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
            }
        }
    }, [selectedProgrammer]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(newMessage);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white shadow-lg overflow-y-auto">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Programadores Web Disponibles</h2>
                </div>
                
                {error && (
                    <Alert variant="destructive" className="m-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                
                {loading ? (
                    <div className="p-4">Cargando programadores...</div>
                ) : programmers.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        <p>No hay programadores web disponibles en este momento</p>
                        <p className="text-sm mt-2">Por favor, intente más tarde</p>
                    </div>
                ) : (
                    <div className="space-y-4 p-4">
                        {programmers.map((programmer) => (
                            <div 
                                key={programmer.id} 
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                    selectedProgrammer?.id === programmer.id 
                                        ? 'bg-blue-50 border-blue-500' 
                                        : 'hover:bg-gray-50'
                                }`}
                                onClick={() => setSelectedProgrammer(programmer)}
                            >
                                <h3 className="font-medium">
                                    {programmer.first_name} {programmer.last_name}
                                </h3>
                                <p className="text-sm text-gray-500">{programmer.email}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Área de chat */}
            <div className="flex-1 flex flex-col">
                {/* ... (resto del código del área de chat igual que en WebChat) ... */}
            </div>
        </div>
    );
};

export default WebChatUser;
