import React, { useEffect, useState, useRef, useCallback } from 'react';
import Alert, { AlertDescription } from './ui/Alert';
import '../styles/chat.css'; 

const WebChat = () => {
    const [programmers, setProgrammers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedProgrammer, setSelectedProgrammer] = useState(null);
    const chatMessagesRef = useRef(null);

    const getWebUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/users/web');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProgrammers(data);
        } catch (error) {
            console.error('Error fetching web users:', error);
            setError('No se pudieron cargar los usuarios web. Por favor, intente más tarde.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getWebUsers();
    }, [getWebUsers]);

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
                    <h2 className="text-xl font-bold">Usuarios Web</h2>
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
                        <p>No hay usuarios web disponibles en este momento</p>
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
                        {selectedProgrammer ? `Conversación con ${selectedProgrammer.first_name} ${selectedProgrammer.last_name}` : 'Conversación'}
                    </h3>
                </div>

                <div 
                    ref={chatMessagesRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col max-w-[80%] ml-auto bg-blue-500 text-white rounded-lg p-3"
                        >
                            <span className="font-medium text-sm">{msg.sender}</span>
                            <p className="break-words">{msg.content}</p>
                            <span className="text-xs opacity-75 ml-auto mt-1">
                                {msg.time}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Escribe tu mensaje"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            onClick={() => handleSendMessage(newMessage)}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebChat;