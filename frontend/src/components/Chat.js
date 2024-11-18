import React, { useState, useEffect, useCallback } from 'react';

const Chat = ({ userId, chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [programmers, setProgrammers] = useState([]);
    const [selectedProgrammer, setSelectedProgrammer] = useState(null);

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/chat/messages?chat_id=${chatId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('No se pudieron cargar los mensajes. Por favor, intente más tarde.');
        } finally {
            setLoading(false);
        }
    }, [chatId]);

    const fetchProgrammers = useCallback(async () => {
        try {
            const response = await fetch('/api/programmers/mobile');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProgrammers(data);
        } catch (error) {
            console.error('Error fetching programmers:', error);
            setError('No se pudieron cargar los programadores. Por favor, intente más tarde.');
        }
    }, []);

    const handleSendMessage = useCallback(async () => {
        if (newMessage.trim() && selectedProgrammer) {
            if (!chatId) {
                await handleStartChat(); // Crea el chat si no existe
            }

            const senderId = localStorage.getItem('userId'); // Obtén el ID del usuario
            const senderType = 'user';

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
                        message_text: newMessage,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error al enviar el mensaje:', errorData);
                    throw new Error(`Error al enviar el mensaje: ${errorData.error || 'Error desconocido'}`);
                }

                const newMessageResponse = await response.json();
                setMessages(prev => [...prev, newMessageResponse]);
                setNewMessage('');
            } catch (error) {
                console.error('Error en la función handleSendMessage:', error);
            }
        }
    }, [newMessage, selectedProgrammer, chatId]);

    useEffect(() => {
        fetchMessages();
        fetchProgrammers();
    }, [fetchMessages, fetchProgrammers]);

    return (
        <div>
            <div>
                {loading && <p>Cargando mensajes...</p>}
                {error && <p>{error}</p>}
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <strong>{msg.sender_type === 'user' ? 'Usuario' : 'Programador'}:</strong> {msg.message_text}
                    </div>
                ))}
            </div>
            <div>
                <h3>Selecciona un programador para chatear:</h3>
                <select onChange={(e) => setSelectedProgrammer(e.target.value)} value={selectedProgrammer}>
                    <option value="">Selecciona un programador</option>
                    {programmers.map((programmer) => (
                        <option key={programmer.id} value={programmer.id}>
                            {programmer.first_name} {programmer.last_name}
                        </option>
                    ))}
                </select>
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe tu mensaje"
            />
            <button onClick={handleSendMessage}>Enviar</button>
        </div>
    );
};

export default Chat; 