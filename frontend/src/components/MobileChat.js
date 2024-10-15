import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/chat.css';

const MobileChat = () => {
    const { type } = useParams();
    const [messages, setMessages] = useState([

    ]);
    const [newMessage, setNewMessage] = useState('');
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const conversationItems = document.querySelectorAll('.conversation-item');
        conversationItems.forEach(item => {
            item.addEventListener('click', () => {
                conversationItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }, []);

    const sendMessage = (e) => {
        if (e.key === 'Enter' && newMessage.trim()) {
            const newMsg = {
                sender: 'You',
                content: newMessage,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                isAgent: true
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
            
            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src="path_to_logo.png" alt="Logo" className="logo" />
                    <h2>Inbox</h2>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
                <div className="sidebar-tabs">
                    <button className="tab active">Mine</button>
                    <button className="tab">Unassigned</button>
                </div>
                <div className="sidebar-section">
                    <h3>Live (3)</h3>
                    <div className="conversation-list">
                        <div className="conversation-item active">
                            <img src="path_to_avatar1.png" alt="Stephan Thomsen" className="avatar" />
                            <div className="conversation-info">
                                <h4>Stephan Thomsen</h4>
                                <p>That's correct! 👍</p>
                            </div>
                            <span className="time">13:04</span>
                            <span className="badge live">LIVE</span>
                        </div>
                    </div>
                </div>
                <div className="sidebar-section">
                    <h3>New (2)</h3>
                </div>
                <div className="sidebar-section">
                    <h3>Open (2)</h3>
                </div>
            </div>
            <div className="main-chat">
                <div className="chat-header">
                    <h3>Conversation #904</h3>
                    <div className="chat-actions">
                        <img src="path_to_avatar.png" alt="User Avatar" className="avatar small" />
                        <span className="status-badge open">OPEN</span>
                        <button className="support-btn">SUPPORT</button>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <div className="chat-messages" ref={chatMessagesRef}>
                    <div className="date-separator">JULY 24, 2022</div>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.isAgent ? 'agent' : 'customer'}`}>
                            {!msg.isAgent && <img src="path_to_avatar1.png" alt={msg.sender} className="avatar" />}
                            <div className="message-content">
                                <span className="sender">{msg.sender}</span>
                                <p>{msg.content}</p>
                                <span className="time">{msg.time}</span>
                            </div>
                            {msg.isAgent && <img src="path_to_your_avatar.png" alt={msg.sender} className="avatar" />}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Your message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={sendMessage}
                    />
                    <div className="input-actions">
                        <button className="action-btn"><i className="far fa-smile"></i></button>
                        <button className="action-btn"><i className="fas fa-paperclip"></i></button>
                        <button className="action-btn"><i className="fas fa-microphone"></i></button>
                        <button className="action-btn"><i className="fas fa-phone"></i></button>
                        <button className="action-btn"><i className="fas fa-video"></i></button>
                        <button className="action-btn"><i className="fas fa-globe"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileChat;
