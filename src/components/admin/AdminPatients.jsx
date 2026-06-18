// components/admin/AdminPatients.jsx
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { FaSearch, FaEye, FaEdit, FaTrash, FaUserPlus, FaCalendarAlt } from 'react-icons/fa';
import './AdminTable.css';

const AdminPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    { id: 1, name: "Rajesh Sharma", email: "rajesh@example.com", phone: "9876543210", age: 45, lastVisit: "2024-06-01", visits: 3 },
    { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "9876543211", age: 32, lastVisit: "2024-06-05", visits: 5 },
    { id: 3, name: "Amit Kumar", email: "amit@example.com", phone: "9876543212", age: 28, lastVisit: "2024-06-03", visits: 2 },
    { id: 4, name: "Sneha Reddy", email: "sneha@example.com", phone: "9876543213", age: 52, lastVisit: "2024-06-02", visits: 8 },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "9876543214", age: 38, lastVisit: "2024-05-30", visits: 1 },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <AdminLayout>
      <div className="admin-page-container">
        <div className="page-header">
          <div>
            <h1>Patients</h1>
            <p>Manage all patient records</p>
          </div>
          <button className="add-new-btn"><FaUserPlus /> Add Patient</button>
        </div>

        <div className="filters-bar">
          <div className="search-box">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Last Visit</th>
                <th>Visits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>#{patient.id}</td>
                  <td><strong>{patient.name}</strong></td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.age}</td>
                  <td>{patient.lastVisit}</td>
                  <td><span className="visit-badge">{patient.visits}</span></td>
                  <td className="action-buttons">
                    <button className="action-btn view" title="View"><FaEye /></button>
                    <button className="action-btn edit" title="Edit"><FaEdit /></button>
                    <button className="action-btn delete" title="Delete"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPatients;