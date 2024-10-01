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
        }
    };

    return (
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
        </div>
    );
};

export default WebChat;