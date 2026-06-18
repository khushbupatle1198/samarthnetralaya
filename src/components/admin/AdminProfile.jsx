// components/admin/AdminProfile.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { FaUserCircle, FaEnvelope, FaPhone, FaUser, FaSave, FaLock, FaCamera } from 'react-icons/fa';
import './AdminProfile.css';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    username: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      setAdmin(parsedAdmin);
      setFormData({
        fullName: parsedAdmin.fullName || '',
        email: parsedAdmin.email || '',
        phoneNumber: parsedAdmin.phoneNumber || '',
        username: parsedAdmin.username || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAdmin = { ...admin, ...formData };
    localStorage.setItem('adminData', JSON.stringify(updatedAdmin));
    setAdmin(updatedAdmin);
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <AdminLayout>
      <div className="admin-profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <FaUserCircle />
              <button className="change-avatar-btn"><FaCamera /></button>
            </div>
            <div className="profile-info">
              <h3>{formData.fullName || admin?.username || 'Admin User'}</h3>
              <p>{admin?.role || 'Administrator'}</p>
              <p className="member-since">Member since {new Date().getFullYear()}</p>
            </div>
          </div>

          <div className="profile-form-container">
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label><FaUser /> Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label><FaEnvelope /> Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group">
                <label><FaPhone /> Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label><FaUser /> Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  disabled
                  className="disabled-input"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn"><FaSave /> Save Changes</button>
                <button type="button" className="password-btn" onClick={() => setShowPasswordForm(!showPasswordForm)}>
                  <FaLock /> Change Password
                </button>
              </div>
            </form>

            {showPasswordForm && (
              <div className="password-form">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <button type="submit" className="update-password-btn">Update Password</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;