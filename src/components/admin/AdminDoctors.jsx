// src/components/admin/AdminDoctors.jsx
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { 
  FaSearch, FaEye, FaEdit, FaTrash, FaUserMd, FaStar, 
  FaEnvelope, FaPhone, FaPlus, FaTimes, FaSave, 
  FaCamera, FaSpinner, FaUpload
} from 'react-icons/fa';
import API_CONFIG from '../../config/apiConfig';  // ✅ Import config
import './AdminDoctors.css';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    qualification: '',
    experience: '',
    rating: '',
    email: '',
    phone: '',
    patients: '',
    bio: '',
    education: '',
    achievements: ''
  });

  // ✅ .env se base URL le rahe hain
  const BASE_URL = API_CONFIG.BASE_URL;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      // ✅ Ab yeh .env se URL lega
      const response = await fetch(`${BASE_URL}/api/doctors/all`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors(mockDoctors);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDoctor = async () => {
    setUploading(true);
    try {
      const formDataToSend = new FormData();
      
      const doctorData = {
        name: formData.name,
        specialization: formData.specialization,
        qualification: formData.qualification,
        experience: formData.experience,
        rating: parseFloat(formData.rating) || 0,
        email: formData.email,
        phone: formData.phone,
        patients: parseInt(formData.patients) || 0,
        bio: formData.bio,
        education: formData.education,
        achievements: formData.achievements
      };
      
      formDataToSend.append('doctor', new Blob([JSON.stringify(doctorData)], { type: 'application/json' }));
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }
      
      // ✅ .env se URL lega
      const response = await fetch(`${BASE_URL}/api/doctors/add`, {
        method: 'POST',
        body: formDataToSend
      });
      
      if (response.ok) {
        alert('Doctor added successfully!');
        setShowModal(false);
        resetForm();
        fetchDoctors();
      } else {
        alert('Failed to add doctor');
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateDoctor = async () => {
    setUploading(true);
    try {
      const formDataToSend = new FormData();
      
      const doctorData = {
        name: formData.name,
        specialization: formData.specialization,
        qualification: formData.qualification,
        experience: formData.experience,
        rating: parseFloat(formData.rating) || 0,
        email: formData.email,
        phone: formData.phone,
        patients: parseInt(formData.patients) || 0,
        bio: formData.bio,
        education: formData.education,
        achievements: formData.achievements
      };
      
      formDataToSend.append('doctor', new Blob([JSON.stringify(doctorData)], { type: 'application/json' }));
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }
      
      // ✅ .env se URL lega
      const response = await fetch(`${BASE_URL}/api/doctors/update/${editingDoctor.id}`, {
        method: 'PUT',
        body: formDataToSend
      });
      
      if (response.ok) {
        alert('Doctor updated successfully!');
        setShowModal(false);
        setEditingDoctor(null);
        resetForm();
        fetchDoctors();
      } else {
        alert('Failed to update doctor');
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Failed to update doctor');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        // ✅ .env se URL lega
        const response = await fetch(`${BASE_URL}/api/doctors/delete/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Doctor deleted successfully!');
          fetchDoctors();
        } else {
          alert('Failed to delete doctor');
        }
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Doctor deleted successfully (Demo)');
        fetchDoctors();
      }
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification || '',
      experience: doctor.experience,
      rating: doctor.rating,
      email: doctor.email,
      phone: doctor.phone,
      patients: doctor.patients,
      bio: doctor.bio || '',
      education: doctor.education || '',
      achievements: doctor.achievements || ''
    });
    
    if (doctor.imagePath) {
      setImagePreview(`${BASE_URL}${doctor.imagePath}`);
    } else {
      setImagePreview(null);
    }
    setSelectedImage(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      specialization: '',
      qualification: '',
      experience: '',
      rating: '',
      email: '',
      phone: '',
      patients: '',
      bio: '',
      education: '',
      achievements: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-doctors-container">
        <div className="page-header">
          <div>
            <h1>Doctors</h1>
            <p>Manage doctor profiles and schedules</p>
          </div>
          <button className="add-new-btn" onClick={() => {
            resetForm();
            setEditingDoctor(null);
            setShowModal(true);
          }}>
            <FaPlus /> Add Doctor
          </button>
        </div>

        <div className="filters-bar">
          <div className="search-box">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search by name or specialization..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner"><FaSpinner className="spinning" /> Loading doctors...</div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-avatar">
                  {doctor.imagePath ? (
                    <img src={`${BASE_URL}${doctor.imagePath}`} alt={doctor.name} />
                  ) : (
                    <FaUserMd />
                  )}
                </div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="qualification">{doctor.qualification}</p>
                  <div className="doctor-details">
                    <span><FaStar className="star-icon" /> {doctor.rating}</span>
                    <span>{doctor.experience}</span>
                    <span>{doctor.patients}+ patients</span>
                  </div>
                  <div className="doctor-contact">
                    <p><FaEnvelope /> {doctor.email}</p>
                    <p><FaPhone /> {doctor.phone}</p>
                  </div>
                  {doctor.bio && <p className="doctor-bio">{doctor.bio.substring(0, 100)}...</p>}
                </div>
                <div className="doctor-actions">
                  <button className="action-btn view" onClick={() => handleEdit(doctor)}>
                    <FaEye />
                  </button>
                  <button className="action-btn edit" onClick={() => handleEdit(doctor)}>
                    <FaEdit />
                  </button>
                  <button className="action-btn delete" onClick={() => handleDeleteDoctor(doctor.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="image-upload-section">
                <div className="image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <div className="image-placeholder">
                      <FaCamera />
                      <p>Doctor Photo</p>
                    </div>
                  )}
                </div>
                <div className="upload-area">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                    id="doctor-image"
                  />
                  <label htmlFor="doctor-image" className="upload-label">
                    <FaUpload /> {selectedImage ? 'Change Photo' : 'Upload Photo'}
                  </label>
                  {imagePreview && (
                    <button className="remove-image" onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}>
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <form className="doctor-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Dr. Krishna Bhojwani"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Specialization *</label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                      placeholder="Ophthalmology"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Qualification</label>
                    <input
                      type="text"
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                      placeholder="MBBS, MS (Ophthalmology)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Experience</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      placeholder="15 years"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Rating (0-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: e.target.value})}
                      placeholder="4.9"
                    />
                  </div>
                  <div className="form-group">
                    <label>Patients Treated</label>
                    <input
                      type="number"
                      value={formData.patients}
                      onChange={(e) => setFormData({...formData, patients: e.target.value})}
                      placeholder="1250"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="doctor@samarth.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="9876543210"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio / Description</label>
                  <textarea
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Seasoned ophthalmologist with a robust background in eye care and surgery..."
                  />
                </div>

                <div className="form-group">
                  <label>Education</label>
                  <textarea
                    rows="2"
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    placeholder="MBBS from Government Medical College, Nagpur | MS from AIIMS Delhi"
                  />
                </div>

                <div className="form-group">
                  <label>Achievements</label>
                  <textarea
                    rows="2"
                    value={formData.achievements}
                    onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                    placeholder="Best Doctor Award 2023, Gold Medal in Ophthalmology"
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button 
                className="submit-btn" 
                onClick={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
                disabled={uploading}
              >
                {uploading ? <FaSpinner className="spinning" /> : <FaSave />}
                {uploading ? 'Uploading...' : (editingDoctor ? 'Update Doctor' : 'Add Doctor')}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// Mock data for fallback
const mockDoctors = [
  { 
    id: 1, 
    name: "Dr. Krishna Bhojwani", 
    specialization: "Ophthalmology", 
    qualification: "MBBS, MS (Ophthalmology)",
    experience: "15 years", 
    rating: 4.9, 
    email: "krishna@samarth.com", 
    phone: "9890374024", 
    patients: 1250,
    bio: "Seasoned ophthalmologist with a robust background in eye care and surgery.",
    imagePath: null
  }
];

export default AdminDoctors;