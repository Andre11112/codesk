import React, { useState, useEffect, useRef, useCallback } from 'react';
import Alert from './ui/Alert';
import { AlertDescription } from './ui/Alert';
import '../styles/chat.css';

const MobileChatUser = () => {
    const [programmers, setProgrammers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [selectedProgrammer, setSelectedProgrammer] = useState(null);
    const chatMessagesRef = useRef(null);
    
    const getMobileProgrammers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/chat/programmers/mobile'); // Asegúrate de que esta ruta sea correcta
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProgrammers(data);
        } catch (error) {
            console.error('Error fetching mobile programmers:', error);
            setError('No se pudieron cargar los programadores móviles. Por favor, intente más tarde.');
        } finally {
            setLoading(false);
        }
    }, []);
    

    useEffect(() => {
        getMobileProgrammers();
    }, [getMobileProgrammers]);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleProgrammerSelect = async (programmer) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('Error: Usuario no identificado');
                return;
            }
    
            const response = await fetch('/api/chat/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: parseInt(userId),
                    programmer_id: programmer.id
                })
            });
    
            if (!response.ok) {
                throw new Error('Error al crear el chat');
            }
    
            const data = await response.json();
            localStorage.setItem('currentChatId', data.chat_id.toString());
            setSelectedProgrammer(programmer);
    
            // Cargar historial del chat
            await loadChatHistory(data.chat_id, programmer.id);
        } catch (error) {
            console.error('Error al iniciar el chat:', error);
            setError('Error al iniciar el chat. Por favor, intente nuevamente.');
        }
    };
    
    const loadChatHistory = async (chatId, programmerId) => {
        try {
            const response = await fetch(`/api/chat/history/${chatId}`);
            if (!response.ok) {
                throw new Error('Error al cargar el historial');
            }
            const history = await response.json();
            setMessages(prevMessages => ({
                ...prevMessages,
                [programmerId]: [...(prevMessages[programmerId] || []), ...history] // Agregar nuevos mensajes al historial existente
            }));
        } catch (error) {
            console.error('Error al cargar historial:', error);
            setError('Error al cargar el historial del chat');
        }
    };
    
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedProgrammer) return;
    
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
                    message_text: newMessage,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al enviar el mensaje');
            }
    
            const newMessageData = await response.json();
            setMessages(prevMessages => ({
                ...prevMessages,
                [selectedProgrammer.id]: [...(prevMessages[selectedProgrammer.id] || []), newMessageData] // Agregar el nuevo mensaje al historial del programador
            }));
            setNewMessage('');
    
            // Actualizar last_message_at
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
    };

   
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white shadow-lg overflow-y-auto">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Programadores Mobile Disponibles</h2>
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
                        <p>No hay programadores móviles disponibles en este momento</p>
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
                                onClick={() => handleProgrammerSelect(programmer)}
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

            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b bg-white shadow">
                    <h3 className="text-lg font-semibold">
                        {selectedProgrammer ? `Conversación con ${selectedProgrammer.first_name} ${selectedProgrammer.last_name}` : 'Selecciona un programador para chatear'}
                    </h3>
                </div>

                <div 
                    ref={chatMessagesRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                    {selectedProgrammer && messages[selectedProgrammer.id] && messages[selectedProgrammer.id].map((msg, index) => (
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
                        />
                        <button
                            onClick={handleSendMessage}
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

export default MobileChatUser; 