"use client";

import Link from "next/link";
import FloatingChatBot from "../components/FloatingChatBot";
import { useEffect, useRef, useState } from "react";

export default function DashboardPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const [name, setName] = useState("Alex Chen");
    const [photo, setPhoto] = useState(null);
    const fileRef = useRef(null);

    const [safetyScore, setSafetyScore] = useState(85);
    const [itinerary, setItinerary] = useState([
        { day: "Day 1", plan: "Arrival and hotel check-in", status: "completed" },
        { day: "Day 2", plan: "City tour and museum", status: "current" },
        { day: "Day 3", plan: "Hiking and local market", status: "upcoming" },
    ]);

    useEffect(() => {
        function onDocClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const onPickPhoto = () => fileRef.current?.click();

    const onFileChange = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        reader.readAsDataURL(f);
    };

    const onSOS = () => {
        alert("🚨 Emergency SOS activated! Help is on the way.");
    };
    const handleQuickAction = (action) => {
        switch (action) {
            case 'map':
                // Navigate to map page or open map modal
                window.open('https://maps.google.com', '_blank');

                break;

            case 'emergency':
                // Call emergency services
                const confirmEmergency = window.confirm(
                    '🚨 This will call emergency services. Are you sure?'
                );
                if (confirmEmergency) {
                    // In a real app, this would trigger emergency protocols
                    alert('📞 Emergency services have been contacted.\n📍 Your location has been shared.');

                }
                break;

            case 'location':
                // Share current location
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            const locationUrl = `https://maps.google.com?q=${latitude},${longitude}`;

                            // Copy to clipboard
                            navigator.clipboard.writeText(locationUrl).then(() => {
                                alert(`📍 Location shared!\nCoordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}\nLink copied to clipboard.`);
                            }).catch(() => {
                                alert(`📍 Your location:\nLatitude: ${latitude.toFixed(6)}\nLongitude: ${longitude.toFixed(6)}`);
                            });
                        },
                        (error) => {
                            alert('❌ Unable to get your location. Please enable location services.');
                        }
                    );
                } else {
                    alert('❌ Geolocation is not supported by this browser.');
                }
                break;



            case 'hospital':
                window.open('https://www.google.com/maps/search/?api=1&query=hospital+near+me', '_blank');
                break;

            case 'police':
                window.open('https://www.google.com/maps/search/?api=1&query=police+station+near+me', '_blank');
                break;

            case 'atm':
                window.open('https://www.google.com/maps/search/?api=1&query=atm+near+me', '_blank');
                break;


            default:
                alert('Feature coming soon!');
        }
    };


    return (
        <>
        <FloatingChatBot />
        <div className="dashboard">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="brand">
                        <div className="logo">🛡️</div>
                        <h1>Smart Tourist Safety</h1>
                    </div>
                   
                    <nav className="nav">
                        <Link href="/dashboard" className="nav-item active"><button className="nav-item-btn"></button>Dashboard</Link>
                        <Link href="/alerts" className="nav-item"><button  className="nav-item-btn"></button>Alerts</Link>
                        {/* link for contacts
                       */}
                        <Link href="/contacts" className="nav-item"><button className="nav-item-btn"></button>Contacts</Link>
                        <div className="dropdown" ref={menuRef}>
                            <button
                                className="dropdown-btn"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                Menu ▾
                            </button>
                            {menuOpen && (
                                <div className="dropdown-menu">
                                    <Link href="/profile">Profile</Link>
                                    <br />
                                    <Link href="/itinerary">Itinerary</Link>
                                   
                                    <div className="divider"></div>
                                    <Link href="/logout" className="logout">Log out</Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="main">
                <div className="container">
                    {/* Welcome Section */}
                    <section className="welcome">
                        <div className="profile">
                            <div className="avatar" onClick={onPickPhoto}>
                                {photo ? (
                                    <img src={photo} alt="Profile" />
                                ) : (
                                    <span className="avatar-text">{name.charAt(0)}</span>
                                )}
                            </div>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="welcome-text">
                            <h2>Welcome back, {name}!</h2>
                            <p>Stay safe on your travels</p>
                        </div>
                    </section>

                    {/* Dashboard Grid */}
                    <section className="grid">
                        {/* Safety Score Card */}
                        {/* Travel Assistant Card - Add this after the Current Status card */}
                        <div className="card">
                            <div className="card-header">
                                <h3>🤖 AI Travel Assistant</h3>
                            </div>
                            <div className="chat-preview">
                                <div className="chat-features">
                                    <div className="feature">🍽️ Local food recommendations</div>
                                    <div className="feature">🛡️ Safety guidance</div>
                                    <div className="feature">🗣️ Language help</div>
                                    <div className="feature">🚨 Emergency assistance</div>
                                </div>
                                <Link href="/chat" className="chat-btn">
                                    <button className="btn">💬 Start Conversation</button>
                                </Link>
                                <p className="chat-note">Available in 10+ languages</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3>Safety Score</h3>
                                <div className="score">{safetyScore}/100</div>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${safetyScore}%` }}
                                ></div>
                            </div>
                            <div className="tips">
                                <h4>Safety Tips</h4>
                                <ul>
                                    <li>• Avoid high-risk areas after dark</li>
                                    <li>• Share your location with contacts</li>
                                    <li>• Keep emergency numbers handy</li>
                                </ul>
                            </div>
                        </div>

                        {/* Itinerary Card */}
                        <div className="card">
                            <div className="card-header">
                                <h3>Today's Plan</h3>
                                <Link href="/itinerary" className="view-all">View All</Link>
                            </div>
                            <div className="itinerary-list">
                                {itinerary.map((item, idx) => (
                                    <div key={idx} className={`itinerary-item ${item.status}`}>
                                        <div className="status-dot"></div>
                                        <div className="item-content">
                                            <div className="day">{item.day}</div>
                                            <div className="plan">{item.plan}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                       
                        <div className="actions">
                            <button className="action-btn" onClick={() => handleQuickAction('map')}>
                                <span className="icon">🗺️</span>
                                View Map
                            </button>
                            <button className="action-btn" onClick={() => handleQuickAction('hospital')}>
                                <span className="icon">🏥</span>
                                Find Hospital
                            </button>
                            <button className="action-btn" onClick={() => handleQuickAction('police')}>
                                <span className="icon">👮</span>
                                Police Station
                            </button>
                            <button className="action-btn" onClick={() => handleQuickAction('emergency')}>
                                <span className="icon">📞</span>
                                Emergency
                            </button>
                            <button className="action-btn" onClick={() => handleQuickAction('location')}>
                                <span className="icon">📍</span>
                                Share Location
                            </button>
                            <button className="action-btn" onClick={() => handleQuickAction('atm')}>
                                <span className="icon">💰</span>
                                Find ATM
                            </button>
                        </div>



                        {/* Weather & Status Card */}
                        <div className="card">
                            <div className="card-header">
                                <h3>Current Status</h3>
                            </div>
                            <div className="status-info">
                                <div className="status-item">
                                    <span className="icon">🌤️</span>
                                    <div>
                                        <div className="label">Weather</div>
                                        <div className="value">22°C, Partly Cloudy</div>
                                    </div>
                                </div>
                                <div className="status-item">
                                    <span className="icon">📍</span>
                                    <div>
                                        <div className="label">Location</div>
                                        <div className="value">Paris, France</div>
                                    </div>
                                </div>
                                <div className="status-item">
                                    <span className="icon">🕒</span>
                                    <div>
                                        <div className="label">Local Time</div>
                                        <div className="value">2:30 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Emergency SOS */}
                    <section className="emergency">
                        <button className="sos-btn" onClick={onSOS}>
                            🚨 Emergency SOS
                        </button>
                        <p>Tap to instantly alert emergency services with your location</p>
                    </section>
                </div>
            </main>
            <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
          // And add this CSS to your existing styles
            .chat-preview {
            text-align: center;
            }

            .chat-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 16px;
            }

            .feature {
            font-size: 0.85rem;
            color: #64748b;
            padding: 4px;
            }

            .chat-btn {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            transition: transform 0.2s ease;
            margin-bottom: 8px;
            }
                        
                .btn {
            
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            border: none;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            padding: 12px 24px;
            margin: 0;
            cursor: pointer;
            outline: none;
            
        
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            transition: all 0.2s ease-in-out;
            
        
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            
        
            user-select: none;
            -webkit-user-select: none;
        }

        .btn:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .btn:focus {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }

        .btn:disabled {
            background: #94a3b8;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
                    .chat-btn:hover {
            transform: translateY(-1px);
            text-decoration: none;
            }

            .chat-note {
            font-size: 0.8rem;
            color: #94a3b8;
            margin: 0;
            }

            /* Button inside chat-btn */
            .chat-btn .btn {
              background: transparent;
              border: none;
              color: inherit;
              font-size: 1rem;
              font-weight: 600;
              padding: 0;
              margin: 0;
              cursor: pointer;
              outline: none;
              box-shadow: none;
            }
            .chat-btn .btn:active {
              opacity: 0.8;
            }

        .dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .container {
          max-width: 1200px;
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
          justify-content: space-between;
          padding: 16px 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          font-size: 28px;
        }

        .brand h1 {
          color: #1e3a8a;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .nav {
          display: flex;
          text-decoration: none;
          align-items: center;
          gap: 8px;
        }

        .nav-item-btn {
          background: transparent;
          border: none;
          color: inherit;
          font-size: inherit;
          font-weight: inherit;
          padding: 0;
          cursor: pointer;
          transition: background 0.2s;
        }

        .nav-item-btn:hover {
          background: #f1f5f9;
          text-decoration: none;
        }

        /* Dropdown */
        .dropdown {
          position: relative;
        }

        .dropdown-btn {
          background: #f1f5f9;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          color: #64748b;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .dropdown-btn:hover {
          background: #e2e8f0;
          color: #1e3a8a;
        }

        .dropdown-menu {
          position: absolute;
          display: flex;
          flex-direction: column;
          
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 8px;
          min-width: 160px;
          z-index: 200;
        }

        .dropdown-menu a {
          display: block;
          margin-bottom: 3px;
          color: #64748b;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.2s;
        }
         
          

        .dropdown-menu a:hover {
          background-color: #f1f5f9;
          color: #1e3a8a;
          text-decoration: none; /* Remove underline on hover for dropdown items */
        }

        .dropdown-menu .logout {
          color: #ef4444;
        }

        .dropdown-menu .logout:hover {
          background: #fef2f2;
          text-decoration: none; /* Remove underline on hover for logout */
        }

        .divider {
          height: 1px;
          background: #e2e8f0;
          margin: 8px 0;
        }

        /* Main Content */
        .main {
          padding: 32px 0 64px;
        }

        /* Welcome Section */
        .welcome {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          overflow: hidden;
        }

        .avatar:hover {
          transform: scale(1.05);
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-text {
          color: white;
          font-size: 32px;
          font-weight: 700;
        }

        .welcome-text h2 {
          color: #1e3a8a;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .welcome-text p {
          color: #64748b;
          font-size: 1.1rem;
        }

        /* Grid */
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        @media (min-width: 768px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Cards */
        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.2s;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .card-header h3 {
          color: #1e3a8a;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .score {
          background: #dbeafe;
          color: #1e3a8a;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .view-all {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        /* Progress Bar */
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #10b981);
          border-radius: 4px;
          transition: width 0.8s ease;
        }

        /* Tips */
        .tips h4 {
          color: #1e3a8a;
          font-size: 1rem;
          margin-bottom: 12px;
        }

        .tips ul {
          list-style: none;
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .tips li {
          margin-bottom: 6px;
        }

        /* Itinerary */
        .itinerary-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .itinerary-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
          border-left: 3px solid #e2e8f0;
        }

        .itinerary-item.completed {
          border-left-color: #10b981;
        }

        .itinerary-item.current {
          border-left-color: #3b82f6;
          background: #dbeafe;
        }

        .itinerary-item.upcoming {
          border-left-color: #f59e0b;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e2e8f0;
        }

        .itinerary-item.completed .status-dot {
          background: #10b981;
        }

        .itinerary-item.current .status-dot {
          background: #3b82f6;
        }

        .itinerary-item.upcoming .status-dot {
          background: #f59e0b;
        }

        .day {
          font-weight: 600;
          color: #1e3a8a;
          font-size: 0.9rem;
        }

        .plan {
          color: #64748b;
          font-size: 0.85rem;
          margin-top: 2px;
        }

        /* Actions */
        .actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
          color: #64748b;
        }

        .action-btn:hover {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
          transform: translateY(-1px);
        }

        .action-btn .icon {
          font-size: 20px;
        }

        /* Status Info */
        .status-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-item .icon {
          font-size: 20px;
          width: 32px;
          text-align: center;
        }

        .label {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 2px;
        }

        .value {
          font-weight: 600;
          color: #1e3a8a;
          font-size: 0.9rem;
        }

        /* Emergency */
        .emergency {
          text-align: center;
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .sos-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 12px;
        }

        .sos-btn:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        .emergency p {
          color: #64748b;
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header .container {
            flex-direction: column;
            gap: 16px;
          }

          .nav {
            width: 100%;
            justify-content: space-between;
          }

          .welcome {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .actions {
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
