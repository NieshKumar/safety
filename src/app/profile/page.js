// src/app/profile/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import FloatingChatBot from "../components/FloatingChatBot";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    nationality: "United States",
    passportNumber: "123456789",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
    medicalInfo: "No known allergies",
    language: "English",
    currentLocation: "Paris, France",
    travelDates: "Sep 1 - Sep 10, 2025"
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const travelStats = {
    tripsCompleted: 12,
    countriesVisited: 8,
    safetyScore: 95,
    daysActive: 45
  };

  return (
    <>
      <FloatingChatBot />
    <div className="profile-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link href="/dashboard" className="back-btn">← Back</Link>
          <h1>My Profile</h1>
          <button 
            className={`edit-btn ${isEditing ? 'saving' : ''}`}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? '💾 Save' : '✏️ Edit'}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="avatar-section">
              <div className="avatar">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="profile-info">
                <h2>{profileData.name}</h2>
                <p className="location">📍 {profileData.currentLocation}</p>
                <p className="travel-dates">🗓️ {profileData.travelDates}</p>
              </div>
            </div>
            
            <div className="safety-badge">
              <div className="safety-score">
                <span className="score">{travelStats.safetyScore}</span>
                <span className="label">Safety Score</span>
              </div>
            </div>
          </div>

          {/* Travel Stats */}
          <div className="stats-section">
            <h3>Travel Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">{travelStats.tripsCompleted}</span>
                <span className="stat-label">Trips Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{travelStats.countriesVisited}</span>
                <span className="stat-label">Countries Visited</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{travelStats.daysActive}</span>
                <span className="stat-label">Days Active</span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                ) : (
                  <span className="form-value">{profileData.name}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                ) : (
                  <span className="form-value">{profileData.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                ) : (
                  <span className="form-value">{profileData.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label>Nationality</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                  />
                ) : (
                  <span className="form-value">{profileData.nationality}</span>
                )}
              </div>

              <div className="form-group">
                <label>Passport Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.passportNumber}
                    onChange={(e) => handleChange('passportNumber', e.target.value)}
                  />
                ) : (
                  <span className="form-value">*****{profileData.passportNumber.slice(-4)}</span>
                )}
              </div>

              <div className="form-group">
                <label>Preferred Language</label>
                {isEditing ? (
                  <select
                    value={editData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Español</option>
                    <option value="French">Français</option>
                    <option value="German">Deutsch</option>
                    <option value="Italian">Italiano</option>
                  </select>
                ) : (
                  <span className="form-value">{profileData.language}</span>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Information */}
          <div className="section">
            <h3>Emergency Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Emergency Contact Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  />
                ) : (
                  <span className="form-value">{profileData.emergencyContact}</span>
                )}
              </div>

              <div className="form-group">
                <label>Emergency Contact Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.emergencyPhone}
                    onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                  />
                ) : (
                  <span className="form-value">{profileData.emergencyPhone}</span>
                )}
              </div>

              <div className="form-group full-width">
                <label>Medical Information & Allergies</label>
                {isEditing ? (
                  <textarea
                    value={editData.medicalInfo}
                    onChange={(e) => handleChange('medicalInfo', e.target.value)}
                    placeholder="Any medical conditions, allergies, or medications..."
                  />
                ) : (
                  <span className="form-value">{profileData.medicalInfo}</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="action-buttons">
              <button className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                💾 Save Changes
              </button>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .profile-page {
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

        .header h1 {
          color: #1e3a8a;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .edit-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit-btn:hover {
          background: #2563eb;
        }

        .edit-btn.saving {
          background: #10b981;
        }

        /* Main */
        .main {
          padding: 24px 0 64px;
        }

        /* Profile Header */
        .profile-header {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .avatar-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .profile-info h2 {
          margin: 0 0 8px 0;
          color: #1e3a8a;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .profile-info p {
          margin: 0 0 4px 0;
          color: #64748b;
          font-size: 0.9rem;
        }

        .safety-badge {
          text-align: center;
        }

        .safety-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          background: #f0fdf4;
          border: 2px solid #10b981;
          border-radius: 12px;
        }

        .safety-score .score {
          font-size: 2rem;
          font-weight: 700;
          color: #10b981;
          line-height: 1;
        }

        .safety-score .label {
          font-size: 0.8rem;
          color: #059669;
          font-weight: 600;
          margin-top: 4px;
        }

        /* Stats Section */
        .stats-section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stats-section h3 {
          margin: 0 0 20px 0;
          color: #1e3a8a;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-card {
          text-align: center;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .stat-number {
          display: block;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Sections */
        .section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .section h3 {
          margin: 0 0 20px 0;
          color: #1e3a8a;
          font-size: 1.25rem;
          font-weight: 600;
        }

        /* Form */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .form-value {
          padding: 12px 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #1f2937;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: border-color 0.2s;
          outline: none;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .btn-primary,
        .btn-secondary {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .btn-secondary:hover {
          background: #e2e8f0;
          color: #475569;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .avatar-section {
            flex-direction: column;
            text-align: center;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
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
