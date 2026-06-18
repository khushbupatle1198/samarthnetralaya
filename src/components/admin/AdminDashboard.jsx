// components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaUserMd, 
  FaSpinner,
  FaCheckCircle,
  FaEye,
  FaClock,
  FaArrowRight,
  FaChartLine,
  FaProcedures
} from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalPatients: 0,
    totalDoctors: 0,
    pendingAppointments: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    setStats({
      totalAppointments: 156,
      totalPatients: 432,
      totalDoctors: 8,
      pendingAppointments: 23,
      todayAppointments: 12,
      completedAppointments: 133,
      totalRevenue: 125000
    });
    
    setRecentAppointments([
      { id: 1, patient: "Rajesh Sharma", doctor: "Dr. Krishna Bhojwani", date: "2024-06-07", time: "10:00 AM", status: "Confirmed" },
      { id: 2, patient: "Priya Patel", doctor: "Dr. Sneha Deshmukh", date: "2024-06-07", time: "11:30 AM", status: "Pending" },
      { id: 3, patient: "Amit Kumar", doctor: "Dr. Rajesh Gupta", date: "2024-06-07", time: "02:00 PM", status: "Completed" },
      { id: 4, patient: "Sneha Reddy", doctor: "Dr. Krishna Bhojwani", date: "2024-06-08", time: "09:30 AM", status: "Confirmed" },
    ]);
    setLoading(false);
  };

  const statsCards = [
    { title: 'Total Appointments', value: stats.totalAppointments, icon: <FaCalendarAlt />, color: '#3b82f6', change: '+12%' },
    { title: 'Total Patients', value: stats.totalPatients, icon: <FaUsers />, color: '#10b981', change: '+8%' },
    { title: 'Total Doctors', value: stats.totalDoctors, icon: <FaUserMd />, color: '#f59e0b', change: '0%' },
    { title: 'Pending', value: stats.pendingAppointments, icon: <FaSpinner />, color: '#ef4444', change: '+5%' },
  ];

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening today</p>
          </div>
          <div className="header-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-details">
                <h3>{stat.value.toLocaleString()}</h3>
                <p>{stat.title}</p>
                <span className="stat-change positive">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overview Cards */}
        <div className="overview-grid">
          <motion.div className="overview-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="overview-header">
              <h3>Today's Appointments</h3>
              <FaCalendarAlt />
            </div>
            <div className="overview-value">{stats.todayAppointments}</div>
            <p>Scheduled for today</p>
          </motion.div>

          <motion.div className="overview-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="overview-header">
              <h3>Completed</h3>
              <FaCheckCircle />
            </div>
            <div className="overview-value">{stats.completedAppointments}</div>
            <p>Total completed</p>
          </motion.div>

          <motion.div className="overview-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="overview-header">
              <h3>Revenue</h3>
              <FaChartLine />
            </div>
            <div className="overview-value">₹{stats.totalRevenue.toLocaleString()}</div>
            <p>This month</p>
          </motion.div>
        </div>

        {/* Recent Appointments */}
        <motion.div className="recent-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="section-header">
            <h3>Recent Appointments</h3>
            <button className="view-all-link">View All <FaArrowRight /></button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patient}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(appointment.status) }}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;