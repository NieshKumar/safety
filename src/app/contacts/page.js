// src/app/contacts/page.js
"use client";

import Link from "next/link";
import FloatingChatBot from "../components/FloatingChatBot";

export default function ContactsPage() {
  const emergencyContacts = [
    { 
      name: "Emergency Services", 
      number: "112", 
      icon: "🚨", 
      description: "Police, Fire, Medical Emergency" 
    },
    { 
      name: "Police", 
      number: "100", 
      icon: "👮", 
      description: "Non-emergency police assistance" 
    },
    { 
      name: "Medical Emergency", 
      number: "102", 
      icon: "🏥", 
      description: "Ambulance and medical help" 
    },
    { 
      name: "Fire Department", 
      number: "101", 
      icon: "🚒", 
      description: "Fire emergency and rescue" 
    }
  ];

  const travelContacts = [
    { 
      name: "US Embassy", 
      number: "+33-1-43-12-22-22", 
      icon: "🏛️", 
      description: "American citizens emergency assistance",
      address: "2 Avenue Gabriel, 75008 Paris"
    },
    { 
      name: "Tourist Helpline", 
      number: "+33-1-42-96-70-00", 
      icon: "ℹ️", 
      description: "24/7 tourist information and help" 
    },
    { 
      name: "Hotel Reception", 
      number: "+33-1-55-555-555", 
      icon: "🏨", 
      description: "Your accommodation front desk" 
    }
  ];

  const quickActions = [
    { 
      name: "Share Location", 
      icon: "📍", 
      action: () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const coords = `${position.coords.latitude},${position.coords.longitude}`;
            const message = `My current location: https://maps.google.com?q=${coords}`;
            if (navigator.share) {
              navigator.share({ title: 'My Location', text: message });
            } else {
              navigator.clipboard.writeText(message);
              alert('Location copied to clipboard!');
            }
          });
        }
      }
    },
    { 
      name: "Send SOS SMS", 
      icon: "📱", 
      action: () => {
        const message = "URGENT: I need help. This is my current location.";
        window.open(`sms:?body=${encodeURIComponent(message)}`);
      }
    },
    { 
      name: "Medical Info", 
      icon: "💊", 
      action: () => {
        alert("Medical Info:\n\nBlood Type: O+\nAllergies: None\nEmergency Contact: +1-555-0123\n\n(Update this in Settings)");
      }
    }
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`);
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  return (
    <>
      <FloatingChatBot />
   
    <div className="contacts-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link href="/dashboard" className="back-btn">← Back</Link>
          <h1>Emergency Contacts</h1>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {/* Emergency Contacts */}
          <section className="section">
            <h2>🚨 Emergency Services</h2>
            <div className="contacts-grid">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="contact-card emergency">
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-info">
                    <h3>{contact.name}</h3>
                    <p>{contact.description}</p>
                  </div>
                  <button 
                    className="call-btn emergency"
                    onClick={() => handleCall(contact.number)}
                  >
                    📞 {contact.number}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Travel Assistance */}
          <section className="section">
            <h2>🌍 Travel Assistance</h2>
            <div className="contacts-grid">
              {travelContacts.map((contact, index) => (
                <div key={index} className="contact-card travel">
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-info">
                    <h3>{contact.name}</h3>
                    <p>{contact.description}</p>
                    {contact.address && (
                      <p className="address">📍 {contact.address}</p>
                    )}
                  </div>
                  <button 
                    className="call-btn travel"
                    onClick={() => handleCall(contact.number)}
                  >
                    📞 Call
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="section">
            <h2>⚡ Quick Actions</h2>
            <div className="actions-grid">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="action-card"
                  onClick={action.action}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-text">{action.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* App Support */}
          <section className="section">
            <h2>📞 App Support</h2>
            <div className="support-card">
              <div className="support-info">
                <h3>Need help with the app?</h3>
                <p>Contact our 24/7 support team</p>
              </div>
              <div className="support-actions">
                <button 
                  className="support-btn"
                  onClick={() => handleCall("+1-800-SAFETY")}
                >
                  📞 Call Support
                </button>
                <button 
                  className="support-btn"
                  onClick={() => handleEmail("help@touristsafety.com")}
                >
                  ✉️ Email Support
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .contacts-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .header {
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header .container {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 20px;
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

        .header h1 {
          color: #1e3a8a;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        /* Main */
        .main {
          padding: 24px 0 64px;
        }

        .section {
          margin-bottom: 32px;
        }

        .section h2 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 16px;
          text-align: center;
        }

        /* Contact Cards */
        .contacts-grid {
          display: grid;
          gap: 16px;
        }

        .contact-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .contact-icon {
          font-size: 32px;
          min-width: 50px;
          text-align: center;
        }

        .contact-info {
          flex: 1;
        }

        .contact-info h3 {
          color: #1e3a8a;
          margin: 0 0 4px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .contact-info p {
          color: #64748b;
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .address {
          font-size: 0.8rem !important;
          color: #94a3b8 !important;
          margin-top: 4px !important;
        }

        .call-btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .call-btn.emergency {
          background: #ef4444;
          color: white;
        }

        .call-btn.emergency:hover {
          background: #dc2626;
        }

        .call-btn.travel {
          background: #3b82f6;
          color: white;
        }

        .call-btn.travel:hover {
          background: #2563eb;
        }

        /* Quick Actions */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .action-card {
          background: white;
          border: none;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          background: #f8fafc;
        }

        .action-icon {
          font-size: 28px;
        }

        .action-text {
          color: #1e3a8a;
          font-weight: 600;
          text-align: center;
        }

        /* Support */
        .support-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .support-info h3 {
          color: #1e3a8a;
          margin: 0 0 4px 0;
          font-size: 1.1rem;
        }

        .support-info p {
          color: #64748b;
          margin: 0;
          font-size: 0.9rem;
        }

        .support-actions {
          display: flex;
          gap: 12px;
        }

        .support-btn {
          padding: 10px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          color: #3b82f6;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .support-btn:hover {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .support-card {
            flex-direction: column;
            text-align: center;
          }

          .support-actions {
            width: 100%;
            justify-content: center;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }

          .container {
            padding: 0 16px;
          }
        }
      `}</style>
    </div>
    </>
  );
}
