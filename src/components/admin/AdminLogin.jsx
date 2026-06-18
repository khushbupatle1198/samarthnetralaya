// components/admin/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUserShield, FaUser, FaLock } from 'react-icons/fa';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const [adminData, setAdminData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSetupChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else {
        if (data.message === 'Invalid credentials!' && credentials.username === 'admin') {
          setShowSetup(true);
          setError('No admin found. Please setup first admin account.');
        } else {
          setError(data.message || 'Login failed!');
        }
      }
    } catch (err) {
      setError('Network error! Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Admin account created successfully! Please login.');
        setShowSetup(false);
        setCredentials({ username: adminData.username, password: adminData.password });
        setAdminData({ username: '', email: '', password: '', fullName: '', phoneNumber: '' });
      } else {
        setError(data.message || 'Setup failed!');
      }
    } catch (err) {
      setError('Network error! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-background">
        <div className="bg-overlay"></div>
      </div>
      
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-header">
          <div className="logo-icon">
            <FaUserShield />
          </div>
          <h2>Admin Portal</h2>
          <p>Samarth Netralaya</p>
        </div>

        {!showSetup ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <motion.button 
              type="submit" 
              className="login-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleSetup} className="login-form">
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={adminData.username}
                onChange={handleSetupChange}
                required
              />
            </div>

            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={adminData.email}
                onChange={handleSetupChange}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={adminData.password}
                onChange={handleSetupChange}
                required
              />
            </div>

            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={adminData.fullName}
                onChange={handleSetupChange}
              />
            </div>

            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={adminData.phoneNumber}
                onChange={handleSetupChange}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <motion.button 
              type="submit" 
              className="login-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Setting up...' : 'Setup Admin Account'}
            </motion.button>
            
            <button 
              type="button" 
              className="back-btn"
              onClick={() => setShowSetup(false)}
            >
              Back to Login
            </button>
          </form>
        )}

        <div className="login-footer">
          <p>Secure Admin Access Only</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;