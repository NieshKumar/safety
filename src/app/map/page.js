// src/app/map/page.js
"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import dynamic from 'next/dynamic';
import FloatingChatBot from "../components/FloatingChatBot";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState([48.8566, 2.3522]); // Default to Paris
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Import Leaflet CSS and fix marker icons
    import('leaflet/dist/leaflet.css');
    import('leaflet').then((L) => {
      // Fix default markers
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });

    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = [position.coords.latitude, position.coords.longitude];
          setUserLocation(userPos);
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
            safetyScore: Math.floor(Math.random() * 100),
            nearbyServices: ['Police Station - 0.5km', 'Hospital - 1.2km', 'Embassy - 2.1km']
          });
          setIsLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  const handleMapClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    
    const safetyScore = Math.floor(Math.random() * 100);
    const locationInfo = {
      lat,
      lng,
      address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      safetyScore,
      nearbyServices: ['Police Station - 0.5km', 'Hospital - 1.2km', 'Embassy - 2.1km']
    };
    
    setSelectedLocation(locationInfo);
  }, []);

  return (
    <>
      <FloatingChatBot />
    <div className="map-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link href="/dashboard" className="back-btn">← Dashboard</Link>
          <h1>Safety Map</h1>
          <button className="location-btn" onClick={getUserLocation}>
            📍 My Location
          </button>
        </div>
      </header>

      {/* Map Container */}
      <main className="map-container">
        <div className="map-wrapper">
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner">📍</div>
              <p>Getting your location...</p>
            </div>
          )}
          
          {!isLoading && (
            <MapContainer 
              center={userLocation} 
              zoom={14} 
              style={{ height: '100%', width: '100%' }}
              whenReady={(mapInstance) => setMap(mapInstance.target)}
              eventHandlers={{
                click: handleMapClick
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* User Location Marker */}
              <Marker position={userLocation}>
                <Popup>
                  <div>
                    <strong>📍 Your Location</strong><br/>
                    Lat: {userLocation[0].toFixed(6)}<br/>
                    Lng: {userLocation[1].toFixed(6)}
                  </div>
                </Popup>
              </Marker>

              {/* Sample Safety Markers */}
              <Marker position={[userLocation[0] + 0.005, userLocation[1] + 0.005]}>
                <Popup>
                  <div>
                    <strong>🟢 Safe Zone</strong><br/>
                    Tourist Area - Well lit and patrolled
                  </div>
                </Popup>
              </Marker>

              <Marker position={[userLocation[0] - 0.005, userLocation[1] - 0.005]}>
                <Popup>
                  <div>
                    <strong>🟡 Caution Zone</strong><br/>
                    Construction area - Be careful
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>

        {/* Location Info Sidebar */}
        <div className="info-sidebar">
          <div className="sidebar-header">
            <h3>Location Details</h3>
            {selectedLocation && (
              <button 
                className="close-btn"
                onClick={() => setSelectedLocation(null)}
              >
                ✕
              </button>
            )}
          </div>

          {selectedLocation ? (
            <div className="location-info">
              <div className="coordinates">
                <strong>📍 Coordinates:</strong>
                <p>{selectedLocation.lat?.toFixed(6)}, {selectedLocation.lng?.toFixed(6)}</p>
              </div>

              {selectedLocation.safetyScore && (
                <div className="safety-score">
                  <strong>🛡️ Safety Score:</strong>
                  <div className="score-bar">
                    <div 
                      className="score-fill"
                      style={{ 
                        width: `${selectedLocation.safetyScore}%`,
                        backgroundColor: selectedLocation.safetyScore > 70 ? '#10b981' : 
                                       selectedLocation.safetyScore > 40 ? '#f59e0b' : '#ef4444'
                      }}
                    ></div>
                  </div>
                  <span className="score-text">{selectedLocation.safetyScore}/100</span>
                </div>
              )}

              {selectedLocation.nearbyServices && (
                <div className="nearby-services">
                  <strong>🏢 Nearby Services:</strong>
                  <ul>
                    {selectedLocation.nearbyServices.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="action-buttons">
                <button className="action-btn primary">
                  🚨 Report Issue
                </button>
                <button className="action-btn secondary">
                  📍 Save Location
                </button>
                <button className="action-btn secondary">
                  🧭 Get Directions
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <div className="placeholder-icon">🗺️</div>
              <p>Click on the map to get location safety information</p>
              <div className="location-status">
                {userLocation ? (
                  <p>✅ Your location is being shown</p>
                ) : (
                  <button className="my-location-btn" onClick={getUserLocation}>
                    📍 Enable Location
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="map-legend">
            <h4>Map Legend:</h4>
            <div className="legend-item">
              <span className="legend-marker">🟢</span>
              <span>Safe Areas</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker">🟡</span>
              <span>Caution Areas</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker">🔴</span>
              <span>High Risk Areas</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker">📍</span>
              <span>Your Location</span>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .map-page {
          min-height: 100vh;
          background: #f8fafc;
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
          z-index: 1000;
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

        .location-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .location-btn:hover {
          background: #2563eb;
        }

        /* Loading Overlay */
        .loading-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .loading-spinner {
          font-size: 48px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Map Container */
        .map-container {
          display: flex;
          height: calc(100vh - 80px);
        }

        .map-wrapper {
          flex: 1;
          position: relative;
        }

        /* Info Sidebar */
        .info-sidebar {
          width: 350px;
          background: white;
          border-left: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sidebar-header h3 {
          color: #1e3a8a;
          margin: 0;
          font-size: 1.25rem;
        }

        .close-btn {
          background: #f1f5f9;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .close-btn:hover {
          background: #e2e8f0;
        }

        .location-info {
          padding: 20px;
          flex: 1;
          overflow-y: auto;
        }

        .coordinates, .safety-score, .nearby-services {
          margin-bottom: 24px;
        }

        .coordinates strong, .safety-score strong, .nearby-services strong {
          display: block;
          color: #1e3a8a;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .coordinates p {
          margin: 0;
          font-family: monospace;
          background: #f1f5f9;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .score-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin: 8px 0;
        }

        .score-fill {
          height: 100%;
          transition: width 0.8s ease;
        }

        .score-text {
          font-weight: 600;
          color: #1e3a8a;
          font-size: 0.9rem;
        }

        .nearby-services ul {
          margin: 0;
          padding-left: 16px;
        }

        .nearby-services li {
          margin-bottom: 4px;
          font-size: 0.9rem;
          color: #64748b;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .action-btn {
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn.primary {
          background: #ef4444;
          color: white;
        }

        .action-btn.primary:hover {
          background: #dc2626;
        }

        .action-btn.secondary {
          background: #f1f5f9;
          color: #3b82f6;
          border: 1px solid #e2e8f0;
        }

        .action-btn.secondary:hover {
          background: #e2e8f0;
        }

        .no-selection {
          padding: 40px 20px;
          text-align: center;
          color: #64748b;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .placeholder-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .location-status {
          margin-top: 20px;
        }

        .my-location-btn {
          padding: 10px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .my-location-btn:hover {
          background: #2563eb;
        }

        .map-legend {
          padding: 20px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .map-legend h4 {
          color: #1e3a8a;
          margin: 0 0 12px 0;
          font-size: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 0.9rem;
          color: #64748b;
        }

        .legend-marker {
          font-size: 16px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .map-container {
            flex-direction: column;
          }
          
          .info-sidebar {
            width: 100%;
            height: 300px;
          }
          
          .header .container {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </div>
    </>
  );
}
