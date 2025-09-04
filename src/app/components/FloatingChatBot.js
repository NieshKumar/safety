
"use client";

import { useState } from "react";
import Link from "next/link";

export default function FloatingChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Hi! I\'m your AI travel assistant. How can I help you today?',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const quickReplies = [
        "Need emergency help",
        "Find nearby restaurants",
        "Safety tips for this area",
        "Local emergency numbers"
    ];


    const sendMessage = async (messageText) => {
        const userMessage = {
            sender: 'user',
            text: messageText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageText,
                    language: 'English', // You can make this dynamic
                    location: 'Current Location' // You can get user location
                }),
            });

            const data = await response.json();

            const botMessage = {
                sender: 'bot',
                text: data.reply || "Sorry, I couldn't process that request.",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                sender: 'bot',
                text: "I'm having trouble connecting. Please try again or visit the full Chat page.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickReply = (reply) => {
        sendMessage(reply);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                className="floating-chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="AI Travel Assistant"
            >
                {isOpen ? '✕' : '🤖'}
            </button>

            {/* Floating Chat Window */}
            {isOpen && (
                <div className="floating-chat-window">
                    {/* Header */}
                    <div className="chat-header">
                        <div className="header-info">
                            <span className="bot-name">AI Travel Assistant</span>
                            <span className="bot-status">Powered by Gemini</span>
                        </div>
                        <Link href="/chat" className="full-chat-btn" title="Open Full Chat">
                            🔗
                        </Link>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                <div className="message-bubble">
                                    {message.text.split('\n').map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="message bot">
                                <div className="message-bubble typing">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Replies */}
                    <div className="quick-replies">
                        {quickReplies.map((reply, index) => (
                            <button
                                key={index}
                                className="quick-reply-btn"
                                onClick={() => handleQuickReply(reply)}
                                disabled={isLoading}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="chat-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputMessage.trim()}
                            className="send-btn"
                        >
                            {isLoading ? '⏳' : '📤'}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="chat-footer">
                        <Link href="/chat" className="open-full-chat">
                           <button> 💬 Open Full Chat Assistant</button>
                        </Link>
                    </div>
                </div>
            )}

            <style jsx>{`
        /* Floating Toggle Button */
        .floating-chat-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
         background: #1f2937;
          color: white;
         border: 2px solid #e2e8f0;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-chat-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
        }

        /* Floating Chat Window */
        .floating-chat-window {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 350px;
          height: 550px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          z-index: 999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Chat Header */
        .chat-header {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-info {
          display: flex;
          flex-direction: column;
        }

        .bot-name {
          font-weight: 600;
          font-size: 1rem;
        }

        .bot-status {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .full-chat-btn {
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .full-chat-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          text-decoration: none;
        }

        /* Messages */
        .chat-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          display: flex;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .message.user .message-bubble {
          background: #3b82f6;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.bot .message-bubble {
          background: #f1f5f9;
          color: #1e3a8a;
          border-bottom-left-radius: 4px;
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #94a3b8;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-8px);
          }
        }

        /* Quick Replies */
        .quick-replies {
          padding: 12px 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .quick-reply-btn {
          background: white;
          border: 1px solid #d1d5db;
          color: #374151;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-reply-btn:hover:not(:disabled) {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .quick-reply-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Input Area */
        .chat-input {
          display: flex;
          padding: 12px 16px;
          border-top: 1px solid #e2e8f0;
          background: white;
          gap: 8px;
        }

        .chat-input input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 20px;
          font-size: 0.9rem;
          outline: none;
        }

        .chat-input input:focus {
          border-color: #3b82f6;
        }

        .send-btn {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-btn:hover:not(:disabled) {
          background: #2563eb;
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Footer */
        .chat-footer {
          padding: 12px 16px;
          border-top: 1px solid #e2e8f0;
          background: white;
        }

        
        button
        {
          background: #3b82f6;
          color: white;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
       

        /* Responsive */
        @media (max-width: 768px) {
          .floating-chat-window {
            right: 16px;
            left: 16px;
            width: auto;
            bottom: 90px;
            height: 500px;
          }

          .floating-chat-toggle {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
        </>
    );
}
