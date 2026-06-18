// components/admin/AdminSettings.jsx
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { FaGlobe, FaBell, FaShieldAlt, FaPalette, FaDatabase, FaMailBulk } from 'react-icons/fa';
import './AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Samarth Netralaya',
    siteEmail: 'info@samarthnetralaya.com',
    sitePhone: '+91-9890374024',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    notifications: true,
    emailNotifications: true,
    darkMode: true,
    twoFactorAuth: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div className="admin-settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Configure your system preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-section">
            <div className="section-header">
              <FaGlobe />
              <h2>General Settings</h2>
            </div>
            <div className="settings-grid">
              <div className="setting-group">
                <label>Site Name</label>
                <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} />
              </div>
              <div className="setting-group">
                <label>Site Email</label>
                <input type="email" name="siteEmail" value={settings.siteEmail} onChange={handleChange} />
              </div>
              <div className="setting-group">
                <label>Site Phone</label>
                <input type="text" name="sitePhone" value={settings.sitePhone} onChange={handleChange} />
              </div>
              <div className="setting-group">
                <label>Timezone</label>
                <select name="timezone" value={settings.timezone} onChange={handleChange}>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  <option value="America/New_York">America/New York (EST)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <FaBell />
              <h2>Notification Settings</h2>
            </div>
            <div className="settings-checkbox">
              <label>
                <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} />
                Enable System Notifications
              </label>
              <label>
                <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleChange} />
                Enable Email Notifications
              </label>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <FaShieldAlt />
              <h2>Security Settings</h2>
            </div>
            <div className="settings-checkbox">
              <label>
                <input type="checkbox" name="twoFactorAuth" checked={settings.twoFactorAuth} onChange={handleChange} />
                Enable Two-Factor Authentication
              </label>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <FaPalette />
              <h2>Appearance</h2>
            </div>
            <div className="settings-checkbox">
              <label>
                <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} />
                Dark Mode (Admin Panel)
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-settings-btn">Save All Settings</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;