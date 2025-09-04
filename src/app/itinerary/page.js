// src/app/itinerary/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import FloatingChatBot from "../components/FloatingChatBot";

export default function ItineraryPage() {
  const [selectedTrip, setSelectedTrip] = useState(0);
  const [showAddActivity, setShowAddActivity] = useState(false);

  const trips = [
    {
      id: 1,
      title: "Paris Adventure",
      dates: "Sep 1 - Sep 7, 2025",
      location: "Paris, France",
      duration: "7 days",
      status: "active",
      progress: 60
    },
    {
      id: 2,
      title: "Tokyo Explorer",
      dates: "Oct 15 - Oct 22, 2025",
      location: "Tokyo, Japan",
      duration: "8 days",
      status: "upcoming",
      progress: 0
    }
  ];

  const itinerary = [
    {
      day: 1,
      date: "Sep 1, 2025",
      title: "Arrival & City Overview",
      status: "completed",
      activities: [
        { time: "10:00", activity: "Flight arrival CDG", type: "transport", status: "completed", safety: "high" },
        { time: "12:00", activity: "Hotel check-in - Le Marais", type: "accommodation", status: "completed", safety: "high" },
        { time: "15:00", activity: "Walking tour - Notre Dame area", type: "sightseeing", status: "completed", safety: "medium" },
        { time: "19:00", activity: "Dinner at local bistro", type: "dining", status: "completed", safety: "high" }
      ]
    },
    {
      day: 2,
      date: "Sep 2, 2025",
      title: "Museums & Culture",
      status: "completed",
      activities: [
        { time: "09:00", activity: "Louvre Museum visit", type: "sightseeing", status: "completed", safety: "high" },
        { time: "13:00", activity: "Lunch at museum café", type: "dining", status: "completed", safety: "high" },
        { time: "15:00", activity: "Seine River cruise", type: "activity", status: "completed", safety: "high" },
        { time: "18:00", activity: "Champs-Élysées shopping", type: "shopping", status: "completed", safety: "medium" }
      ]
    },
    {
      day: 3,
      date: "Sep 3, 2025",
      title: "Montmartre Exploration",
      status: "current",
      activities: [
        { time: "09:30", activity: "Metro to Montmartre", type: "transport", status: "completed", safety: "medium" },
        { time: "10:00", activity: "Sacré-Cœur visit", type: "sightseeing", status: "current", safety: "high" },
        { time: "12:30", activity: "Local artist street tour", type: "activity", status: "pending", safety: "medium" },
        { time: "15:00", activity: "Café break - Place du Tertre", type: "dining", status: "pending", safety: "high" },
        { time: "18:00", activity: "Sunset at Sacré-Cœur", type: "sightseeing", status: "pending", safety: "medium" }
      ]
    },
    {
      day: 4,
      date: "Sep 4, 2025",
      title: "Palace of Versailles",
      status: "upcoming",
      activities: [
        { time: "08:00", activity: "Train to Versailles", type: "transport", status: "pending", safety: "high" },
        { time: "10:00", activity: "Palace tour", type: "sightseeing", status: "pending", safety: "high" },
        { time: "14:00", activity: "Gardens exploration", type: "activity", status: "pending", safety: "high" },
        { time: "17:00", activity: "Return to Paris", type: "transport", status: "pending", safety: "high" }
      ]
    }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      transport: "🚇",
      accommodation: "🏨",
      sightseeing: "🏛️",
      dining: "🍽️",
      activity: "🎭",
      shopping: "🛍️"
    };
    return icons[type] || "📍";
  };

  const getSafetyColor = (safety) => {
    const colors = {
      high: "#10b981",
      medium: "#f59e0b",
      low: "#ef4444"
    };
    return colors[safety] || "#64748b";
  };

  const addNewActivity = (dayIndex) => {
    alert("Add new activity functionality coming soon!");
    setShowAddActivity(false);
  };

  return (
    <>
      <FloatingChatBot />
    <div className="itinerary-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link href="/dashboard" className="back-btn">← Dashboard</Link>
          <div className="header-info">
            <h1>My Itinerary</h1>
            <p>{trips[selectedTrip].location} • {trips[selectedTrip].duration}</p>
          </div>
          <button className="add-btn" onClick={() => setShowAddActivity(true)}>
            ➕ Add Activity
          </button>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {/* Trip Selector */}
          <div className="trip-selector">
            <h3>Select Trip</h3>
            <div className="trips-grid">
              {trips.map((trip, index) => (
                <button
                  key={trip.id}
                  className={`trip-card ${selectedTrip === index ? 'active' : ''}`}
                  onClick={() => setSelectedTrip(index)}
                >
                  <div className="trip-info">
                    <h4>{trip.title}</h4>
                    <p>{trip.dates}</p>
                    <span className={`status ${trip.status}`}>{trip.status}</span>
                  </div>
                  <div className="progress-circle">
                    <span>{trip.progress}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Itinerary Timeline */}
          <div className="itinerary-section">
            <div className="section-header">
              <h3>Daily Schedule</h3>
              <p>Track your activities and stay safe</p>
            </div>

            <div className="timeline">
              {itinerary.map((day, dayIndex) => (
                <div key={day.day} className={`day-card ${day.status}`}>
                  <div className="day-header">
                    <div className="day-info">
                      <span className="day-number">Day {day.day}</span>
                      <h4>{day.title}</h4>
                      <p className="day-date">{day.date}</p>
                    </div>
                    <div className={`day-status ${day.status}`}>
                      {day.status === 'completed' ? '✅' : 
                       day.status === 'current' ? '⏳' : '📅'}
                    </div>
                  </div>

                  <div className="activities-list">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className={`activity-item ${activity.status}`}>
                        <div className="activity-time">{activity.time}</div>
                        <div className="activity-content">
                          <div className="activity-header">
                            <span className="activity-icon">{getActivityIcon(activity.type)}</span>
                            <span className="activity-name">{activity.activity}</span>
                            <div 
                              className="safety-indicator"
                              style={{ backgroundColor: getSafetyColor(activity.safety) }}
                              title={`Safety level: ${activity.safety}`}
                            ></div>
                          </div>
                          <div className="activity-meta">
                            <span className="activity-type">{activity.type}</span>
                            <span className={`activity-status ${activity.status}`}>
                              {activity.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="add-activity-btn"
                    onClick={() => addNewActivity(dayIndex)}
                  >
                    ➕ Add Activity
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="summary-section">
            <h3>Trip Summary</h3>
            <div className="summary-grid">
              <div className="summary-card">
                <span className="summary-number">12</span>
                <span className="summary-label">Activities Planned</span>
              </div>
              <div className="summary-card">
                <span className="summary-number">8</span>
                <span className="summary-label">Completed</span>
              </div>
              <div className="summary-card">
                <span className="summary-number">95%</span>
                <span className="summary-label">Safety Score</span>
              </div>
              <div className="summary-card">
                <span className="summary-number">4</span>
                <span className="summary-label">Days Left</span>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="safety-tips">
            <h3>🛡️ Safety Tips for Today</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <span className="tip-icon">📍</span>
                <p>Share your location with emergency contacts</p>
              </div>
              <div className="tip-card">
                <span className="tip-icon">🕒</span>
                <p>Avoid walking alone after sunset in tourist areas</p>
              </div>
              <div className="tip-card">
                <span className="tip-icon">💰</span>
                <p>Keep valuables secure and use hotel safe</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .itinerary-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .container {
          max-width: 900px;
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
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .header-info p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        .add-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .add-btn:hover {
          background: #059669;
        }

        /* Main */
        .main {
          padding: 24px 0 64px;
        }

        /* Trip Selector */
        .trip-selector {
          margin-bottom: 32px;
        }

        .trip-selector h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 16px;
          text-align: center;
        }

        .trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
        }

        .trip-card {
          background: white;
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .trip-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .trip-card.active {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .trip-info h4 {
          color: #1e3a8a;
          margin: 0 0 4px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .trip-info p {
          color: #64748b;
          margin: 0 0 8px 0;
          font-size: 0.9rem;
        }

        .status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status.active {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .status.upcoming {
          background: #f3f4f6;
          color: #6b7280;
        }

        .progress-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #1e3a8a;
          border: 3px solid #3b82f6;
        }

        /* Itinerary Section */
        .itinerary-section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .section-header h3 {
          color: #1e3a8a;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .section-header p {
          color: #64748b;
          margin: 0;
        }

        /* Timeline */
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .day-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .day-card.current {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .day-card.completed {
          border-color: #10b981;
        }

        .day-header {
          background: #f8fafc;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .day-card.current .day-header {
          background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
        }

        .day-card.completed .day-header {
          background: linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%);
        }

        .day-number {
          background: #1e3a8a;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 8px;
          display: inline-block;
        }

        .day-info h4 {
          color: #1e3a8a;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .day-date {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        .day-status {
          font-size: 1.5rem;
        }

        /* Activities */
        .activities-list {
          padding: 0 20px 16px;
        }

        .activity-item {
          display: flex;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
          position: relative;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-time {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
          height: fit-content;
        }

        .activity-content {
          flex: 1;
        }

        .activity-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .activity-icon {
          font-size: 1.1rem;
        }

        .activity-name {
          color: #1e3a8a;
          font-weight: 500;
          flex: 1;
        }

        .safety-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .activity-meta {
          display: flex;
          gap: 12px;
          font-size: 0.8rem;
        }

        .activity-type {
          color: #64748b;
          text-transform: capitalize;
        }

        .activity-status {
          font-weight: 600;
          text-transform: capitalize;
        }

        .activity-status.completed { color: #10b981; }
        .activity-status.current { color: #3b82f6; }
        .activity-status.pending { color: #6b7280; }

        .add-activity-btn {
          width: 100%;
          padding: 12px;
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          color: #64748b;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          margin: 8px 20px 16px;
          width: calc(100% - 40px);
        }

        .add-activity-btn:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          color: #475569;
        }

        /* Summary Section */
        .summary-section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .summary-section h3 {
          color: #1e3a8a;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 20px 0;
          text-align: center;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .summary-card {
          text-align: center;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .summary-number {
          display: block;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 4px;
        }

        .summary-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Safety Tips */
        .safety-tips {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .safety-tips h3 {
          color: #1e3a8a;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 20px 0;
          text-align: center;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .tip-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
        }

        .tip-icon {
          font-size: 1.2rem;
        }

        .tip-card p {
          margin: 0;
          color: #7f1d1d;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header .container {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .tips-grid {
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
