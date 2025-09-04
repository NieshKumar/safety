// src/app/alerts/page.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FloatingChatBot from "../components/FloatingChatBot";

export default function AlertsPage() {
    const [alerts, setAlerts] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'critical', 'warning', 'info'

    // Mock alerts data - replace with real API calls
    useEffect(() => {
        const mockAlerts = [
            {
                id: 1,
                type: 'critical',
                title: 'High Crime Area Alert',
                message: 'You are approaching a high-risk area. Consider taking an alternative route after 9 PM.',
                location: 'Downtown District, 5th Street',
                timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
                read: false,
                priority: 'urgent'
            },
            {
                id: 2,
                type: 'warning',
                title: 'Weather Advisory',
                message: 'Heavy rainfall expected in your area. Flooding possible on low-lying roads.',
                location: 'Paris, France',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                read: false,
                priority: 'moderate'
            },
            {
                id: 3,
                type: 'info',
                title: 'Travel Tip',
                message: 'Local festival happening nearby. Expect crowded streets and road closures.',
                location: 'City Center',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                read: true,
                priority: 'low'
            },
            {
                id: 4,
                type: 'warning',
                title: 'Embassy Advisory',
                message: 'US Embassy advises tourists to avoid political demonstrations in the area.',
                location: 'Government Quarter',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                read: true,
                priority: 'moderate'
            },
            {
                id: 5,
                type: 'critical',
                title: 'Emergency Services Alert',
                message: 'Medical emergency reported. Emergency vehicles may cause delays.',
                location: 'Main Highway, Exit 15',
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                read: true,
                priority: 'urgent'
            }
        ];
        setAlerts(mockAlerts);
    }, []);

    const markAsRead = (alertId) => {
        setAlerts(alerts.map(alert =>
            alert.id === alertId ? { ...alert, read: true } : alert
        ));
    };

    const deleteAlert = (alertId) => {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
    };

    const filteredAlerts = alerts.filter(alert =>
        filter === 'all' || alert.type === filter
    );

    const unreadCount = alerts.filter(alert => !alert.read).length;

    const formatTime = (date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)}h ago`;
        } else {
            return `${Math.floor(diffInMinutes / 1440)}d ago`;
        }
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'critical': return '🚨';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '📢';
        }
    };

    return (
        <>
          <FloatingChatBot />
        <div className="alerts-page">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <Link href="/dashboard" className="back-btn">← Back</Link>
                        <div className="title-section">
                            <h1>Safety Alerts</h1>
                            <p>{unreadCount} unread notifications</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="container">
                    {/* Filter Tabs */}
                    <div className="filter-tabs">
                        <button
                            className={`tab ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All ({alerts.length})
                        </button>
                        <button
                            className={`tab ${filter === 'critical' ? 'active' : ''}`}
                            onClick={() => setFilter('critical')}
                        >
                            Critical ({alerts.filter(a => a.type === 'critical').length})
                        </button>
                        <button
                            className={`tab ${filter === 'warning' ? 'active' : ''}`}
                            onClick={() => setFilter('warning')}
                        >
                            Warning ({alerts.filter(a => a.type === 'warning').length})
                        </button>
                        <button
                            className={`tab ${filter === 'info' ? 'active' : ''}`}
                            onClick={() => setFilter('info')}
                        >
                            Info ({alerts.filter(a => a.type === 'info').length})
                        </button>
                    </div>

                    {/* Alerts List */}
                    <div className="alerts-list">
                        {filteredAlerts.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">🔔</div>
                                <h3>No alerts found</h3>
                                <p>You're all caught up! No {filter === 'all' ? '' : filter + ' '}alerts at this time.</p>
                            </div>
                        ) : (
                            filteredAlerts.map(alert => (
                                <div key={alert.id} className={`alert-card ${alert.type} ${alert.read ? 'read' : 'unread'}`}>
                                    <div className="alert-content">
                                        <div className="alert-header">
                                            <div className="alert-meta">
                                                <span className="alert-icon">{getAlertIcon(alert.type)}</span>
                                                <span className="alert-type">{alert.type.toUpperCase()}</span>
                                                <span className="alert-time">{formatTime(alert.timestamp)}</span>
                                            </div>
                                            <div className="alert-actions">
                                                {!alert.read && (
                                                    <button
                                                        className="mark-read-btn"
                                                        onClick={() => markAsRead(alert.id)}
                                                        title="Mark as read"
                                                    >
                                                        ✓
                                                    </button>
                                                )}
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => deleteAlert(alert.id)}
                                                    title="Delete alert"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="alert-title">{alert.title}</h3>
                                        <p className="alert-message">{alert.message}</p>
                                        <div className="alert-location">
                                            📍 {alert.location}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Quick Actions */}
                    {/* Quick Actions */}
                    <div className="quick-actions">
                        <h3>Quick Actions</h3>
                        <div className="actions-grid">
                            <Link href="/dashboard" className="action-card">
                                <span className="action-icon">🏠</span>
                                <span>Go Home</span>
                            </Link>
                            <Link href="/map" className="action-card">
                                <span className="action-icon">🗺️</span>
                                <span>View Map</span>
                            </Link>
                            <button className="action-card" onClick={() => {
                                // Check in with emergency contacts
                                alert('✅ Check-in sent to your emergency contacts:\n"I am safe at my current location"');
                            }}>
                                <span className="action-icon">✅</span>
                                <span>Check-in Safe</span>
                            </button>
                            <button className="action-card" onClick={() => {
                                // Open embassy/consulate contacts
                                alert('🏛️ Embassy Contacts:\n\nUS Embassy: +33-1-43-12-22-22\nEmergency Line: +33-1-43-12-47-08\n📍 2 Avenue Gabriel, 75008 Paris');
                            }}>
                                <span className="action-icon">🏛️</span>
                                <span>Embassy Help</span>
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            <style jsx>{`
        .alerts-page {
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

        .header-content {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 0;
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

        .title-section h1 {
          color: #1e3a8a;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .title-section p {
          color: #64748b;
          margin: 0;
          font-size: 0.9rem;
        }

        /* Main */
        .main {
          padding: 24px 0 64px;
        }

        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          background: white;
          padding: 8px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .tab {
          flex: 1;
          padding: 12px;
          border: none;
          background: transparent;
          border-radius: 8px;
          color: #64748b;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .tab.active {
          background: #3b82f6;
          color: white;
        }

        .tab:hover:not(.active) {
          background: #f1f5f9;
          color: #1e3a8a;
        }

        /* Alerts List */
        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .alert-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .alert-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .alert-card.unread {
          border-left: 4px solid #3b82f6;
        }

        .alert-card.critical {
          border-left-color: #ef4444;
        }

        .alert-card.warning {
          border-left-color: #f59e0b;
        }

        .alert-card.info {
          border-left-color: #10b981;
        }

        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .alert-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .alert-icon {
          font-size: 16px;
        }

        .alert-type {
          background: #f1f5f9;
          color: #64748b;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .alert-card.critical .alert-type {
          background: #fef2f2;
          color: #dc2626;
        }

        .alert-card.warning .alert-type {
          background: #fffbeb;
          color: #d97706;
        }

        .alert-card.info .alert-type {
          background: #f0fdf4;
          color: #16a34a;
        }

        .alert-time {
          color: #94a3b8;
          font-size: 0.8rem;
        }

        .alert-actions {
          display: flex;
          gap: 8px;
        }

        .mark-read-btn, .delete-btn {
          width: 28px;
          height: 28px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .mark-read-btn {
          background: #dbeafe;
          color: #2563eb;
        }

        .mark-read-btn:hover {
          background: #3b82f6;
          color: white;
        }

        .delete-btn {
          background: #fef2f2;
          color: #dc2626;
        }

        .delete-btn:hover {
          background: #dc2626;
          color: white;
        }

        .alert-title {
          color: #1e3a8a;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .alert-message {
          color: #475569;
          line-height: 1.5;
          margin: 0 0 12px 0;
        }

        .alert-location {
          color: #64748b;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 64px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          color: #1e3a8a;
          margin: 0 0 8px 0;
        }

        .empty-state p {
          color: #64748b;
          margin: 0;
        }

        /* Quick Actions */
        .quick-actions {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .quick-actions h3 {
          color: #1e3a8a;
          margin: 0 0 16px 0;
          font-size: 1.1rem;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          text-decoration: none;
          color: #475569;
          transition: all 0.2s;
          cursor: pointer;
        }

        .action-card:hover {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
          transform: translateY(-1px);
          text-decoration: none;
        }

        .action-icon {
          font-size: 24px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .filter-tabs {
            flex-direction: column;
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
