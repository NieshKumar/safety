// src/app/chat/page.js
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hello! I\'m your travel assistant. I can help with:\n• Local food recommendations 🍽️\n• Safety tips 🛡️\n• Language help 🗣️\n• Emergency info 🚨\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [userLocation, setUserLocation] = useState('Paris, France');
  const messagesEndRef = useRef(null);

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 
    'Portuguese', 'Japanese', 'Chinese', 'Arabic', 'Hindi'
  ];

  const quickQuestions = [
    "What's the best local food here?",
    "Is this area safe at night?",
    "Help me order food in local language",
    "What should I be careful about?",
    "Emergency numbers in this city",
    "How to ask for help in local language"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // In real app, reverse geocode to get city name
        setUserLocation("Current Location");
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      sender: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          language: selectedLanguage,
          location: userLocation
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
        text: "I'm having trouble connecting. Please check your internet and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link href="/dashboard" className="back-btn">← Back</Link>
          <div className="header-info">
            <h1>Travel Assistant</h1>
            <p>📍 {userLocation}</p>
          </div>
          <select 
            className="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="chat-container">
        {/* Messages */}
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">
                <div className="message-text">
                  {message.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="quick-questions">
          <p>Quick questions:</p>
          <div className="questions-grid">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question"
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="input-area">
          <div className="input-container">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask me anything in ${selectedLanguage}...`}
              rows="2"
              disabled={isLoading}
            />
            <button 
              onClick={() => sendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="send-btn"
            >
              {isLoading ? '⏳' : '📤'}
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .chat-page {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Header */
        .header {
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-btn {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .back-btn:hover {
          background: #f1f5f9;
          text-decoration: none;
        }

        .header-info h1 {
          color: #1e3a8a;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .header-info p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        .language-select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #1e3a8a;
          font-weight: 500;
        }

        /* Chat Container */
        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          padding: 0 20px;
        }

        .messages {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }

        .message {
          margin-bottom: 16px;
          display: flex;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
        }

        .message.user .message-content {
          background: #3b82f6;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.bot .message-content {
          background: white;
          color: #1e3a8a;
          border: 1px solid #e2e8f0;
          border-bottom-left-radius: 4px;
        }

        .message-text {
          line-height: 1.4;
          margin-bottom: 4px;
        }

        .message-time {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 8px 0;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
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
            transform: translateY(-10px);
          }
        }

        /* Quick Questions */
        .quick-questions {
          padding: 16px 0;
          border-top: 1px solid #e2e8f0;
          background: white;
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
        }

        .quick-questions p {
          margin: 0 0 12px 0;
          font-weight: 600;
          color: #64748b;
          font-size: 0.9rem;
        }

        .questions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 8px;
        }

        .quick-question {
          padding: 8px 12px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          color: #3b82f6;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .quick-question:hover {
          background: #3b82f6;
          color: white;
        }

        /* Input Area */
        .input-area {
          padding: 16px 0;
          background: white;
          border-top: 1px solid #e2e8f0;
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
        }

        .input-container {
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }

        .input-container textarea {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          resize: none;
          outline: none;
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .input-container textarea:focus {
          border-color: #3b82f6;
        }

        .send-btn {
          padding: 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 48px;
          height: 48px;
        }

        .send-btn:hover:not(:disabled) {
          background: #2563eb;
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .message-content {
            max-width: 85%;
          }

          .questions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
