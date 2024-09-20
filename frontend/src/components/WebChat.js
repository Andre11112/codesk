import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WebChat = () => {
    const { type } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat para Aplicaciones Web</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
};

export default WebChat;
