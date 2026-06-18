// components/admin/AdminFacilities.jsx
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaUpload, 
  FaAmbulance, FaMicroscope, FaLaptopMedical, FaEye, 
  FaStethoscope, FaHeartbeat, FaImage, FaGripVertical,
  FaCheckCircle, FaExclamationTriangle, FaInfoCircle,
  FaSpinner, FaWifi, FaDatabase, FaSync
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import API_CONFIG from '../../config/apiConfig';
import './AdminFacilities.css';

const AdminFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [networkStatus, setNetworkStatus] = useState(true);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    iconName: 'FaEye',
    displayOrder: 0,
    isActive: true
  });

  const BASE_URL = API_CONFIG.BASE_URL;

  const iconOptions = [
    { value: 'FaAmbulance', label: 'Emergency', icon: <FaAmbulance />, color: '#ef4444' },
    { value: 'FaMicroscope', label: 'Microscope', icon: <FaMicroscope />, color: '#8b5cf6' },
    { value: 'FaLaptopMedical', label: 'Medical', icon: <FaLaptopMedical />, color: '#10b981' },
    { value: 'FaEye', label: 'Eye Care', icon: <FaEye />, color: '#3b82f6' },
    { value: 'FaStethoscope', label: 'Stethoscope', icon: <FaStethoscope />, color: '#f59e0b' },
    { value: 'FaHeartbeat', label: 'Heartbeat', icon: <FaHeartbeat />, color: '#ec4899' }
  ];

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus(true);
      showToastMessage('Back online!', 'success');
      fetchFacilities();
    };
    const handleOffline = () => {
      setNetworkStatus(false);
      showToastMessage('Network connection lost. Please check your internet.', 'error');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const showToastMessage = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      if (!navigator.onLine) {
        showToastMessage('No internet connection. Please check your network.', 'error');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${BASE_URL}/api/facilities/all`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setFacilities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      showToastMessage(error.message || 'Failed to load facilities', 'error');
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToastMessage('Image size should be less than 5MB', 'error');
        return;
      }
      if (!file.type.startsWith('image/')) {
        showToastMessage('Please select a valid image file (JPEG, PNG, GIF)', 'error');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showToastMessage('Please enter facility title', 'error');
      return false;
    }
    if (formData.title.length < 3) {
      showToastMessage('Title must be at least 3 characters long', 'error');
      return false;
    }
    if (formData.title.length > 100) {
      showToastMessage('Title must be less than 100 characters', 'error');
      return false;
    }
    if (formData.description && formData.description.length > 500) {
      showToastMessage('Short description must be less than 500 characters', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    if (!navigator.onLine) {
      showToastMessage('No internet connection. Please try again later.', 'error');
      return;
    }

    setSaving(true);
    try {
      const formDataToSend = new FormData();
      const facilityData = {
        title: formData.title.trim(),
        description: formData.description?.trim() || '',
        detailedDescription: formData.detailedDescription?.trim() || '',
        iconName: formData.iconName,
        displayOrder: parseInt(formData.displayOrder) || 0,
        isActive: formData.isActive
      };
      
      formDataToSend.append('facility', new Blob([JSON.stringify(facilityData)], { type: 'application/json' }));
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const url = editingFacility 
        ? `${BASE_URL}/api/facilities/update/${editingFacility.id}`
        : `${BASE_URL}/api/facilities/add`;
      
      const method = editingFacility ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (response.ok && result.success !== false) {
        showToastMessage(editingFacility ? 'Facility updated successfully!' : 'Facility added successfully!', 'success');
        setShowModal(false);
        resetForm();
        await fetchFacilities();
      } else {
        showToastMessage(result.error || result.message || 'Failed to save facility', 'error');
      }
    } catch (error) {
      console.error('Error saving facility:', error);
      showToastMessage(error.message || 'Network error. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!navigator.onLine) {
      showToastMessage('No internet connection. Please try again later.', 'error');
      return;
    }
    
    try {
      const response = await fetch(`${BASE_URL}/api/facilities/delete/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        showToastMessage('Facility deleted successfully!', 'success');
        setDeleteConfirm(null);
        await fetchFacilities();
      } else {
        const error = await response.json();
        showToastMessage(error.error || 'Failed to delete facility', 'error');
      }
    } catch (error) {
      console.error('Error deleting facility:', error);
      showToastMessage(error.message || 'Network error. Please try again.', 'error');
    }
  };

  const handleEdit = (facility) => {
    setEditingFacility(facility);
    setFormData({
      title: facility.title || '',
      description: facility.description || '',
      detailedDescription: facility.detailedDescription || '',
      iconName: facility.iconName || 'FaEye',
      displayOrder: facility.displayOrder || 0,
      isActive: facility.isActive !== undefined ? facility.isActive : true
    });
    if (facility.imagePath) {
      setImagePreview(`${BASE_URL}${facility.imagePath}`);
    } else {
      setImagePreview(null);
    }
    setSelectedImage(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      detailedDescription: '',
      iconName: 'FaEye',
      displayOrder: 0,
      isActive: true
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingFacility(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    if (!navigator.onLine) {
      showToastMessage('No internet connection. Please try again later.', 'error');
      return;
    }
    
    const facility = facilities.find(f => f.id === id);
    if (facility) {
      const updatedFacility = { 
        ...facility, 
        isActive: !currentStatus,
        title: facility.title,
        description: facility.description,
        detailedDescription: facility.detailedDescription,
        iconName: facility.iconName,
        displayOrder: facility.displayOrder
      };
      
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('facility', new Blob([JSON.stringify(updatedFacility)], { type: 'application/json' }));
        
        const response = await fetch(`${BASE_URL}/api/facilities/update/${id}`, {
          method: 'PUT',
          body: formDataToSend
        });
        
        if (response.ok) {
          showToastMessage(`Facility ${!currentStatus ? 'activated' : 'deactivated'} successfully!`, 'success');
          await fetchFacilities();
        } else {
          const error = await response.json();
          showToastMessage(error.error || 'Failed to update status', 'error');
        }
      } catch (error) {
        console.error('Error updating status:', error);
        showToastMessage(error.message || 'Network error. Please try again.', 'error');
      }
    }
  };

  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(i => i.value === iconName);
    return icon ? icon.icon : <FaEye />;
  };

  const getIconColor = (iconName) => {
    const icon = iconOptions.find(i => i.value === iconName);
    return icon ? icon.color : '#3b82f6';
  };

  return (
    <AdminLayout>
      <div className="admin-facilities-container">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast.show && (
            <motion.div 
              className={`toast-notification ${toast.type}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="toast-icon">
                {toast.type === 'success' && <FaCheckCircle />}
                {toast.type === 'error' && <FaExclamationTriangle />}
                {toast.type === 'info' && <FaInfoCircle />}
              </div>
              <div className="toast-content">
                <p>{toast.message}</p>
              </div>
              <button className="toast-close" onClick={() => setToast({ show: false, message: '', type: 'success' })}>
                <FaTimes />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Network Status Bar */}
        {!networkStatus && (
          <div className="network-warning">
            <FaWifi />
            <span>You are offline. Please check your internet connection.</span>
            <button onClick={() => window.location.reload()}>
              <FaSync /> Retry
            </button>
          </div>
        )}

        {/* Header */}
        <div className="page-header">
          <div className="header-info">
            <h1>Facilities Management</h1>
            <p>Manage clinic facilities and services displayed on homepage</p>
            <div className="header-stats">
              <span className="stat-tag">
                <FaDatabase /> Total: {facilities.length}
              </span>
              <span className="stat-tag active">
                <FaCheckCircle /> Active: {facilities.filter(f => f.isActive).length}
              </span>
            </div>
          </div>
          <button 
            className="add-new-btn" 
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            disabled={!networkStatus}
          >
            <FaPlus /> Add New Facility
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon total">
              <FaEye />
            </div>
            <div className="stat-info">
              <h3>{facilities.length}</h3>
              <p>Total Facilities</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <h3>{facilities.filter(f => f.isActive).length}</h3>
              <p>Active Facilities</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon inactive">
              <FaExclamationTriangle />
            </div>
            <div className="stat-info">
              <h3>{facilities.filter(f => !f.isActive).length}</h3>
              <p>Inactive Facilities</p>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading facilities...</p>
          </div>
        ) : facilities.length === 0 ? (
          <div className="empty-state">
            <FaImage className="empty-icon" />
            <h3>No Facilities Yet</h3>
            <p>Click the "Add New Facility" button to create your first facility.</p>
            <button className="empty-add-btn" onClick={() => {
              resetForm();
              setShowModal(true);
            }}>
              <FaPlus /> Add Your First Facility
            </button>
          </div>
        ) : (
          <div className="facilities-admin-grid">
            {facilities.map((facility, index) => (
              <motion.div 
                key={facility.id}
                className="facility-admin-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="card-header">
                  <div className="card-order">
                    <FaGripVertical className="drag-icon" />
                    <span>#{facility.displayOrder || index + 1}</span>
                  </div>
                  <div className={`status-badge ${facility.isActive ? 'active' : 'inactive'}`}>
                    {facility.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="facility-admin-image">
                  {facility.imagePath ? (
                    <img 
                      src={`${BASE_URL}${facility.imagePath}`} 
                      alt={facility.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '';
                        e.target.parentElement.innerHTML = `<div class="image-placeholder" style="color: ${getIconColor(facility.iconName)}">${getIconComponent(facility.iconName)}</div>`;
                      }}
                    />
                  ) : (
                    <div className="image-placeholder" style={{ color: getIconColor(facility.iconName) }}>
                      {getIconComponent(facility.iconName)}
                    </div>
                  )}
                </div>

                <div className="facility-admin-info">
                  <h3>{facility.title}</h3>
                  <p className="description">{facility.description?.substring(0, 80)}{facility.description?.length > 80 ? '...' : ''}</p>
                  <div className="facility-meta">
                    <div className="meta-icon" style={{ color: getIconColor(facility.iconName) }}>
                      {getIconComponent(facility.iconName)}
                    </div>
                    <span className="meta-text">{facility.iconName}</span>
                  </div>
                </div>

                <div className="facility-admin-actions">
                  <button 
                    className={`action-btn status-toggle ${facility.isActive ? 'active' : 'inactive'}`}
                    onClick={() => toggleStatus(facility.id, facility.isActive)}
                    title={facility.isActive ? 'Deactivate' : 'Activate'}
                    disabled={!networkStatus}
                  >
                    {facility.isActive ? '🔴' : '🟢'}
                  </button>
                  <button 
                    className="action-btn edit" 
                    onClick={() => handleEdit(facility)}
                    disabled={!networkStatus}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-btn delete" 
                    onClick={() => setDeleteConfirm(facility.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div 
                className="confirm-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="confirm-header">
                  <FaExclamationTriangle className="warning-icon" />
                  <h3>Confirm Delete</h3>
                </div>
                <p>Are you sure you want to delete this facility? This action cannot be undone.</p>
                <div className="confirm-actions">
                  <button className="cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                  <button className="delete-btn" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div 
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>{editingFacility ? 'Edit Facility' : 'Add New Facility'}</h2>
                  <button className="close-btn" onClick={() => setShowModal(false)}>
                    <FaTimes />
                  </button>
                </div>

                <div className="modal-body">
                  {/* Image Upload */}
                  <div className="image-upload-section">
                    <div className="image-preview">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" />
                      ) : (
                        <div className="image-placeholder-modal">
                          <FaImage />
                          <p>No Image</p>
                        </div>
                      )}
                    </div>
                    <div className="upload-area">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleImageSelect}
                        style={{ display: 'none' }}
                        id="facility-image"
                      />
                      <label htmlFor="facility-image" className="upload-label">
                        <FaUpload /> {selectedImage ? 'Change Image' : 'Upload Image'}
                      </label>
                      {imagePreview && (
                        <button 
                          type="button"
                          className="remove-image" 
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                        >
                          Remove
                        </button>
                      )}
                      <p className="upload-hint">Recommended size: 400x400px. Supported: JPG, PNG, GIF. Max 5MB</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="form-group required">
                    <label>Title <span className="required-star">*</span></label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter facility title (e.g., 'Emergency Care')"
                      maxLength="100"
                    />
                    <small>{formData.title.length}/100 characters</small>
                  </div>

                  <div className="form-group">
                    <label>Icon</label>
                    <div className="icon-selector">
                      {iconOptions.map((icon) => (
                        <button
                          key={icon.value}
                          className={`icon-option ${formData.iconName === icon.value ? 'selected' : ''}`}
                          onClick={() => setFormData({...formData, iconName: icon.value})}
                          type="button"
                          style={{ borderColor: formData.iconName === icon.value ? icon.color : 'transparent' }}
                        >
                          <div className="icon-preview" style={{ color: icon.color }}>
                            {icon.icon}
                          </div>
                          <span>{icon.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Short Description</label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Brief description of the facility (shown on card)"
                      maxLength="500"
                    />
                    <small>{formData.description.length}/500 characters</small>
                  </div>

                  <div className="form-group">
                    <label>Detailed Description</label>
                    <textarea
                      rows="5"
                      value={formData.detailedDescription}
                      onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})}
                      placeholder="Detailed information about the facility (shown on click)"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Display Order</label>
                      <input
                        type="number"
                        value={formData.displayOrder}
                        onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})}
                        placeholder="0"
                        min="0"
                      />
                      <small>Lower number appears first in the list</small>
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                      >
                        <option value="true">Active (Visible on website)</option>
                        <option value="false">Inactive (Hidden from website)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="submit-btn" 
                    onClick={handleSubmit} 
                    disabled={saving || !networkStatus}
                  >
                    {saving ? (
                      <>
                        <FaSpinner className="spinning" /> Saving...
                      </>
                    ) : (
                      <>
                        <FaSave /> {editingFacility ? 'Update Facility' : 'Add Facility'}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminFacilities;