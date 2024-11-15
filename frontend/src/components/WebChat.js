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

    const getAllProgrammers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/programmers/web');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProgrammers(data);
        } catch (error) {
            console.error('Error fetching programmers:', error);
            setError('No se pudieron cargar los programadores. Por favor, intente más tarde.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllProgrammers();
    }, [getAllProgrammers]);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = useCallback(async (messageText) => {
        if (messageText.trim() && selectedProgrammer) {
            const chatId = 'chat_id';
            const senderId = 'user_id';
            const senderType = 'user';

            console.log('chatId:', chatId);

            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        sender_id: senderId,
                        sender_type: senderType,
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
            <div className="w-1/4 bg-white shadow-lg overflow-y-auto">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Programadores web</h2>
                </div>
                
                {error && (
                    <Alert variant="destructive" className="m-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                
                {loading ? (
                    <div className="p-4">Cargando programadores...</div>
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