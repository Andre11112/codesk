import React, { useEffect, useState, useRef, useCallback } from 'react';
import Alert, { AlertDescription } from './ui/Alert';
import '../styles/chat.css'; 

const MobileChat = () => {
    const [programmers, setProgrammers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedProgrammer, setSelectedProgrammer] = useState(null);
    const chatMessagesRef = useRef(null);

    const getMobileUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/users/mobile'); // Obtener usuarios móviles
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProgrammers(data);
        } catch (error) {
            console.error('Error fetching mobile users:', error);
            setError('No se pudieron cargar los usuarios móviles. Por favor, intente más tarde.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getMobileUsers();
    }, [getMobileUsers]);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = useCallback(async (messageText) => {
        if (messageText.trim() && selectedProgrammer) {
            const userId = localStorage.getItem('userId');
            const chatId = localStorage.getItem('currentChatId');

            if (!chatId || !userId) {
                console.error('Falta información necesaria para enviar el mensaje');
                return;
            }

            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: parseInt(chatId),
                        sender_id: parseInt(userId),
                        sender_type: 'user',
                        message_text: messageText,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error al enviar el mensaje');
                }

                const newMessageData = await response.json();
                setMessages(prev => [...prev, newMessageData]);
                setNewMessage('');

                // Actualizar estado del chat
                await fetch(`/api/chat/status/${chatId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: 'active'
                    })
                });
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                setError('Error al enviar el mensaje. Por favor, intente nuevamente.');
            }
        }
    }, [selectedProgrammer]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(newMessage);
        }
    };

    const handleProgrammerSelect = (programmer) => {
        setSelectedProgrammer(programmer);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-full bg-white shadow-lg overflow-y-auto">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Usuarios Móviles</h2>
                </div>
                
                {error && (
                    <Alert variant="destructive" className="m-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                
                {loading ? (
                    <div className="p-4">Cargando usuarios...</div>
                ) : programmers.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        <p>No hay usuarios móviles disponibles en este momento</p>
                    </div>
                ) : (
                    <div className="space-y-4 p-4">
                        {programmers.map((programmer) => (
                            <div 
                                key={programmer.id} 
                                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => handleProgrammerSelect(programmer)}
                            >
                                <h3 className="font-medium">
                                    {programmer.first_name} {programmer.last_name}
                                </h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b bg-white shadow">
                    <h3 className="text-lg font-semibold">
                        {selectedProgrammer ? 
                            `Conversación con ${selectedProgrammer.first_name} ${selectedProgrammer.last_name}` : 
                            'Selecciona un programador para chatear'}
                    </h3>
                </div>

                <div 
                    ref={chatMessagesRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col max-w-[80%] ${
                                msg.sender_type === 'user' 
                                    ? 'ml-auto bg-blue-500 text-white' 
                                    : 'mr-auto bg-gray-200'
                            } rounded-lg p-3`}
                        >
                            <p className="break-words">{msg.message_text}</p>
                            <span className="text-xs opacity-75 ml-auto mt-1">
                                {new Date(msg.sent_at).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Escribe tu mensaje..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={!selectedProgrammer}
                        />
                        <button
                            onClick={() => handleSendMessage(newMessage)}
                            className={`px-6 py-2 rounded-lg transition-colors ${
                                selectedProgrammer 
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                            }`}
                            disabled={!selectedProgrammer}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileChat;
