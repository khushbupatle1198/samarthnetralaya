// components/admin/AdminAppointments.jsx
import React from 'react';
import AdminLayout from './AdminLayout';
import './AdminDashboard.css';

const AdminAppointments = () => {
  const appointments = [
    { id: 1, patient: "Rajesh Sharma", doctor: "Dr. Krishna Bhojwani", date: "2024-06-07", time: "10:00 AM", status: "Confirmed" },
    { id: 2, patient: "Priya Patel", doctor: "Dr. Sneha Deshmukh", date: "2024-06-07", time: "11:30 AM", status: "Pending" },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Appointments</h1>
            <p>Manage all patient appointments</p>
          </div>
        </div>
        
        <div className="recent-section">
          <h3>All Appointments</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.patient}</td>
                    <td>{app.doctor}</td>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td><span className="status-badge" style={{ backgroundColor: '#10b981' }}>{app.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;