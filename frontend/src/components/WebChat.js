<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/chat.css';

const WebChat = () => {
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
=======
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/chat.css'; 

const WebChat = () => {
    const { type } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, newMessage]);
            setNewMessage('');
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
        }
    };

    return (
<<<<<<< HEAD
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
=======
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src="logo.png" alt="Logo" className="logo" />
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active"><a href="#"><i className="icon-home"></i></a></li>
                        <li><a href="#"><i className="icon-message"></i></a></li>
                        <li><a href="#"><i className="icon-calendar"></i></a></li>
                        <li><a href="#"><i className="icon-reports"></i></a></li>
                        <li><a href="#"><i className="icon-settings"></i></a></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <img src="user-avatar.jpg" alt="User Avatar" className="user-avatar" />
                </div>
            </aside>
            <main className="main-content">
                <div className="conversations-list">
                    <div className="list-header">
                        <h2>Sales</h2>
                        <button className="more-options">...</button>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                    </div>
                    <ul className="conversation-items">
                        <li className="conversation-item active">
                            <img src="james-burns.jpg" alt="James Burns" className="avatar" />
                            <div className="conversation-info">
                                <h3>James Burns</h3>
                                <p>You're all admin access, right?</p>
                            </div>
                            <span className="time">1m</span>
                        </li>
                        {/* More conversation items */}
                    </ul>
                </div>
                <div className="conversation-view">
                    <div className="conversation-header">
                        <h2>James Burns</h2>
                        <div className="user-status">
                            <span className="status-indicator online"></span>
                            <span>Online</span>
                        </div>
                        <div className="conversation-actions">
                            <button><i className="icon-video"></i></button>
                            <button><i className="icon-call"></i></button>
                            <button><i className="icon-more"></i></button>
                        </div>
                    </div>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="message">
                                <img src="james-burns.jpg" alt="James Burns" className="avatar" />
                                <div className="message-content">
                                    <p>{msg}</p>
                                    <span className="time">1:50 PM</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Reply to James Burns"
                        />
                        <button onClick={sendMessage}><i className="icon-send"></i></button>
                    </div>
                </div>
            </main>
            <aside className="details-panel">
                <div className="panel-header">
                    <h2>Conversation Details</h2>
                    <button className="close-panel">×</button>
                </div>
                <div className="contact-info">
                    <img src="james-burns.jpg" alt="James Burns" className="large-avatar" />
                    <h3>James Burns</h3>
                    <p>CEO at Whitewhale</p>
                    <p>1:50 PM · San Francisco, CA</p>
                    <button className="action-button">Enroll in Sequence</button>
                </div>
                <div className="company-info">
                    <h4>COMPANY</h4>
                    <img src="company-logo.png" alt="Whitewhale" className="company-logo" />
                    <h3>Whitewhale</h3>
                    <p>whitewhale.com</p>
                    <p>5224 Seabreeze Valley Blvd<br />San Francisco, CA 94101 USA</p>
                    <p>2,000+</p>
                    <a href="#" className="view-profile">View full contact profile</a>
                </div>
            </aside>
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
        </div>
    );
};

<<<<<<< HEAD
export default WebChat;

=======
export default WebChat;
>>>>>>> 26336ac1e21d82450da4503f33b06898e27ba320
