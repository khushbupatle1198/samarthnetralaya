// components/admin/AdminServices.jsx
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaUpload, 
  FaEye, FaStethoscope, FaAmbulance, FaMicroscope, 
  FaLaptopMedical, FaHeartbeat, FaImage, FaSpinner,
  FaCheckCircle, FaExclamationTriangle, FaHeading,
  FaParagraph, FaListUl, FaTable, FaImage as FaImageIcon,
  FaArrowUp, FaArrowDown, FaTrashAlt, 
  FaToggleOn, FaToggleOff, FaSearch, FaFilter
} from 'react-icons/fa';
import API_CONFIG from '../../config/apiConfig';
import './AdminServices.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingSection, setUploadingSection] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    iconName: 'FaEye',
    displayOrder: 0,
    isActive: true
  });

  const BASE_URL = API_CONFIG.BASE_URL;

  const iconOptions = [
    { value: 'FaEye', label: 'Eye Care', icon: <FaEye />, color: '#3b82f6' },
    { value: 'FaStethoscope', label: 'Stethoscope', icon: <FaStethoscope />, color: '#10b981' },
    { value: 'FaAmbulance', label: 'Emergency', icon: <FaAmbulance />, color: '#ef4444' },
    { value: 'FaMicroscope', label: 'Microscope', icon: <FaMicroscope />, color: '#8b5cf6' },
    { value: 'FaLaptopMedical', label: 'Medical', icon: <FaLaptopMedical />, color: '#f59e0b' },
    { value: 'FaHeartbeat', label: 'Heartbeat', icon: <FaHeartbeat />, color: '#ec4899' }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchTerm, filterStatus, services]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/services/all`);
      const data = await response.json();
      setServices(data);
      setFilteredServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      showErrorMessage('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = [...services];
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => 
        filterStatus === 'active' ? s.isActive : !s.isActive
      );
    }
    setFilteredServices(filtered);
  };

  const showSuccessMessage = (msg) => {
    setSuccessMessage(msg);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const showErrorMessage = (msg) => {
    setErrorMessage(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showErrorMessage('Image size should be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    setSelectedImage(file);
  };

  const uploadSectionImageToServer = async (file, index) => {
    setUploadingSection(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`${BASE_URL}/api/upload/section-image`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        const updated = [...sections];
        updated[index].imagePath = data.imageUrl;
        setSections(updated);
        showSuccessMessage('Image uploaded');
        return data.imageUrl;
      } else {
        showErrorMessage('Upload failed');
        return null;
      }
    } catch (error) {
      console.error('Upload error:', error);
      showErrorMessage('Network error');
      return null;
    } finally {
      setUploadingSection(false);
    }
  };

  const handleSectionImageSelect = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showErrorMessage('Image size should be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...sections];
      updated[index].preview = reader.result;
      setSections(updated);
    };
    reader.readAsDataURL(file);
    await uploadSectionImageToServer(file, index);
  };

  const addSection = (type) => {
    const newSection = {
      id: Date.now(),
      type: type,
      title: '',
      content: '',
      imagePath: '',
      preview: null,
      sectionOrder: sections.length,
      tableData: type === 'table' ? JSON.stringify({ 
        columns: ['Column 1', 'Column 2', 'Column 3'], 
        rows: [['', '', ''], ['', '', '']] 
      }) : null
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const moveSection = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < sections.length) {
      const updated = [...sections];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      setSections(updated);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      showErrorMessage('Please enter service name');
      return;
    }
    setSaving(true);
    try {
      let serviceImageUrl = editingService?.imagePath || null;
      if (selectedImage) {
        const imgFormData = new FormData();
        imgFormData.append('image', selectedImage);
        const uploadRes = await fetch(`${BASE_URL}/api/upload/service-image`, {
          method: 'POST',
          body: imgFormData
        });
        if (uploadRes.ok) {
          const imgData = await uploadRes.json();
          serviceImageUrl = imgData.imageUrl;
        }
      }
      
      const payload = {
        services: {
          name: formData.name,
          shortDescription: formData.shortDescription,
          iconName: formData.iconName,
          displayOrder: parseInt(formData.displayOrder),
          isActive: formData.isActive,
          imagePath: serviceImageUrl
        },
        sections: sections.map(s => ({
          type: s.type,
          title: s.title || '',
          content: s.content || '',
          imagePath: s.imagePath || '',
          sectionOrder: s.sectionOrder,
          tableData: s.tableData || null
        }))
      };

      const url = editingService 
        ? `${BASE_URL}/api/services/update/${editingService.id}`
        : `${BASE_URL}/api/services/add`;
      
      const response = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        showSuccessMessage(editingService ? 'Service updated!' : 'Service added!');
        setShowModal(false);
        resetForm();
        fetchServices();
      } else {
        const err = await response.json();
        showErrorMessage(err.error || 'Failed to save');
      }
    } catch (error) {
      console.error(error);
      showErrorMessage('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/services/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        showSuccessMessage('Service deleted!');
        fetchServices();
      } else {
        showErrorMessage('Delete failed');
      }
    } catch (error) {
      showErrorMessage('Network error');
    }
    setDeleteConfirm(null);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      shortDescription: service.shortDescription || '',
      iconName: service.iconName || 'FaEye',
      displayOrder: service.displayOrder || 0,
      isActive: service.isActive
    });
    setSelectedImage(null);
    setImagePreview(service.imagePath ? `${BASE_URL}${service.imagePath}` : null);
    
    if (service.sections && service.sections.length > 0) {
      setSections(service.sections.map(s => ({ 
        ...s, 
        id: s.id || Date.now(),
        preview: s.imagePath ? `${BASE_URL}${s.imagePath}` : null
      })));
    } else {
      setSections([]);
    }
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      shortDescription: '',
      iconName: 'FaEye',
      displayOrder: 0,
      isActive: true
    });
    setSections([]);
    setSelectedImage(null);
    setImagePreview(null);
    setEditingService(null);
  };

  const toggleStatus = async (id, currentStatus) => {
    const service = services.find(s => s.id === id);
    if (service) {
      const updated = { ...service, isActive: !currentStatus };
      try {
        await fetch(`${BASE_URL}/api/services/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ services: updated, sections: service.sections || [] })
        });
        showSuccessMessage(`Service ${!currentStatus ? 'activated' : 'deactivated'}`);
        fetchServices();
      } catch (error) {
        showErrorMessage('Status update failed');
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

  const updateTableData = (index, newData) => {
    const updated = [...sections];
    updated[index].tableData = JSON.stringify(newData);
    setSections(updated);
  };

  const renderSectionEditor = (section, idx) => {
    switch (section.type) {
      case 'heading':
        return (
          <div className="section-editor-row" key={section.id}>
            <input
              type="text"
              placeholder="Heading Title"
              value={section.title}
              onChange={(e) => updateSection(idx, 'title', e.target.value)}
              className="input-field"
            />
            <select
              value={section.content || 'h2'}
              onChange={(e) => updateSection(idx, 'content', e.target.value)}
              className="select-field"
            >
              <option value="h1">H1 - Largest</option>
              <option value="h2">H2 - Large</option>
              <option value="h3">H3 - Medium</option>
              <option value="h4">H4 - Small</option>
            </select>
          </div>
        );
      
      case 'paragraph':
        return (
          <textarea
            key={section.id}
            placeholder="Enter paragraph content..."
            value={section.content}
            onChange={(e) => updateSection(idx, 'content', e.target.value)}
            rows="5"
            className="textarea-field"
          />
        );
      
      case 'image':
        const imgSrc = section.preview || (section.imagePath ? `${BASE_URL}${section.imagePath}` : null);
        return (
          <div key={section.id} className="image-editor-modern">
            <div className="image-preview-modern">
              {imgSrc ? (
                <div className="img-wrapper">
                  <img src={imgSrc} alt="Preview" />
                  <button type="button" className="remove-img" onClick={() => {
                    const updated = [...sections];
                    updated[idx].imagePath = '';
                    updated[idx].preview = null;
                    setSections(updated);
                  }}>✕</button>
                </div>
              ) : (
                <div className="img-placeholder">
                  <FaImageIcon />
                  <span>No image</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleSectionImageSelect(e, idx)}
                id={`section-img-${idx}`}
                style={{ display: 'none' }}
              />
              <label htmlFor={`section-img-${idx}`} className="upload-btn">
                <FaUpload /> Upload Image
              </label>
            </div>
            <input
              type="text"
              placeholder="Image caption (optional)"
              value={section.title}
              onChange={(e) => updateSection(idx, 'title', e.target.value)}
              className="input-field"
              style={{ marginTop: '10px' }}
            />
          </div>
        );
      
      case 'list':
        return (
          <textarea
            key={section.id}
            placeholder="Enter list items (one per line)"
            value={section.content}
            onChange={(e) => updateSection(idx, 'content', e.target.value)}
            rows="6"
            className="textarea-field"
          />
        );
      
      case 'table':
        let tableData = { columns: ['Column 1', 'Column 2', 'Column 3'], rows: [['', '', '']] };
        try {
          if (section.tableData) tableData = JSON.parse(section.tableData);
        } catch(e) {}
        
        return (
          <div key={section.id} className="table-editor-modern">
            <div className="table-toolbar">
              <button onClick={() => {
                const newCols = [...tableData.columns, `Col ${tableData.columns.length + 1}`];
                const newRows = tableData.rows.map(row => [...row, '']);
                updateTableData(idx, { columns: newCols, rows: newRows });
              }}>+ Add Column</button>
              <button onClick={() => {
                if (tableData.columns.length > 1) {
                  const newCols = tableData.columns.slice(0, -1);
                  const newRows = tableData.rows.map(row => row.slice(0, -1));
                  updateTableData(idx, { columns: newCols, rows: newRows });
                }
              }}>- Remove Column</button>
              <button onClick={() => {
                const newRows = [...tableData.rows, Array(tableData.columns.length).fill('')];
                updateTableData(idx, { columns: tableData.columns, rows: newRows });
              }}>+ Add Row</button>
              <button onClick={() => {
                if (tableData.rows.length > 1) {
                  const newRows = tableData.rows.slice(0, -1);
                  updateTableData(idx, { columns: tableData.columns, rows: newRows });
                }
              }}>- Remove Row</button>
            </div>
            <div className="table-scroll-area">
              <table className="editor-table">
                <thead>
                  <tr>
                    {tableData.columns.map((col, ci) => (
                      <th key={ci}>
                        <input 
                          value={col} 
                          onChange={(e) => {
                            const newCols = [...tableData.columns];
                            newCols[ci] = e.target.value;
                            updateTableData(idx, { columns: newCols, rows: tableData.rows });
                          }} 
                          className="table-input" 
                        />
                      </th>
                    ))}
                    <th style={{ width: '60px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci}>
                          <input 
                            value={cell} 
                            onChange={(e) => {
                              const newRows = [...tableData.rows];
                              newRows[ri][ci] = e.target.value;
                              updateTableData(idx, { columns: tableData.columns, rows: newRows });
                            }} 
                            className="table-input" 
                          />
                        </td>
                      ))}
                      <td className="action-cell">
                        <button 
                          onClick={() => {
                            const newRows = tableData.rows.filter((_, i) => i !== ri);
                            updateTableData(idx, { columns: tableData.columns, rows: newRows });
                          }}
                          className="delete-row"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    inactive: services.filter(s => !s.isActive).length
  };

  return (
    <AdminLayout>
      <div className="admin-services-container">
        {showSuccess && <div className="toast-success"><FaCheckCircle /> {successMessage}</div>}
        {showError && <div className="toast-error"><FaExclamationTriangle /> {errorMessage}</div>}

        <div className="admin-header">
          <div>
            <h1>Services Management</h1>
            <p>Manage all medical services with rich content</p>
          </div>
          <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
            <FaPlus /> New Service
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-card"><div className="stat-icon blue"><FaEye /></div><div><h3>{stats.total}</h3><p>Total</p></div></div>
          <div className="stat-card"><div className="stat-icon green"><FaCheckCircle /></div><div><h3>{stats.active}</h3><p>Active</p></div></div>
          <div className="stat-card"><div className="stat-icon orange"><FaExclamationTriangle /></div><div><h3>{stats.inactive}</h3><p>Inactive</p></div></div>
        </div>

        <div className="filters-row">
          <div className="search-box"><FaSearch /><input type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner"></div><p>Loading services...</p></div>
        ) : filteredServices.length === 0 ? (
          <div className="empty-state"><FaImage /> <h3>No Services</h3><p>Click "New Service" to create one</p></div>
        ) : (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div key={service.id} className="service-item">
                <div className="item-header">
                  <span className="order">#{service.displayOrder}</span>
                  <span className={`status ${service.isActive ? 'active' : 'inactive'}`}>{service.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="item-icon" style={{ background: `${getIconColor(service.iconName)}20`, color: getIconColor(service.iconName) }}>
                  {getIconComponent(service.iconName)}
                </div>
                <h3>{service.name}</h3>
                <p className="desc">{service.shortDescription?.substring(0, 70)}...</p>
                <div className="sections-count">{service.sections?.length || 0} sections</div>
                <div className="item-actions">
                  <button onClick={() => toggleStatus(service.id, service.isActive)} className="action-toggle">{service.isActive ? '🔴' : '🟢'}</button>
                  <button onClick={() => handleEdit(service)} className="action-edit"><FaEdit /></button>
                  <button onClick={() => setDeleteConfirm(service.id)} className="action-delete"><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {deleteConfirm && (
          <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
            <div className="modal-small" onClick={e => e.stopPropagation()}>
              <h3>Confirm Delete</h3>
              <p>Delete this service? This cannot be undone.</p>
              <div className="modal-buttons">
                <button className="cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-fullscreen" onClick={e => e.stopPropagation()}>
              <div className="modal-header-sticky">
                <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                <button className="close-modal" onClick={() => setShowModal(false)}><FaTimes /></button>
              </div>

              <div className="modal-body-scroll">
                <div className="form-section">
                  <h3>Basic Information</h3>
                  <div className="form-group">
                    <label>Service Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Refractive Surgery" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Icon</label>
                      <select value={formData.iconName} onChange={(e) => setFormData({...formData, iconName: e.target.value})}>
                        {iconOptions.map(icon => <option key={icon.value} value={icon.value}>{icon.label}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Display Order</label>
                      <input type="number" value={formData.displayOrder} onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})} />
                      <small>Lower number appears first</small>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Short Description</label>
                    <textarea rows="2" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} placeholder="Brief description shown in service list" />
                  </div>
                  <div className="form-group">
                    <label>Service Image</label>
                    <div className="main-image-upload">
                      {imagePreview ? (
                        <div className="main-img-preview">
                          <img src={imagePreview} alt="Preview" />
                          <button onClick={() => { setImagePreview(null); setSelectedImage(null); }}>Remove</button>
                        </div>
                      ) : (
                        <div className="main-img-placeholder">
                          <FaImageIcon />
                          <span>No image</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageSelect} id="main-img" style={{ display: 'none' }} />
                      <label htmlFor="main-img" className="upload-main-btn"><FaUpload /> Upload Image</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select value={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}>
                      <option value="true">Active (Visible on website)</option>
                      <option value="false">Inactive (Hidden from website)</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <div className="sections-header">
                    <h3>Content Sections</h3>
                    <div className="section-buttons">
                      <button onClick={() => addSection('heading')}><FaHeading /> Heading</button>
                      <button onClick={() => addSection('paragraph')}><FaParagraph /> Paragraph</button>
                      <button onClick={() => addSection('image')}><FaImageIcon /> Image</button>
                      <button onClick={() => addSection('list')}><FaListUl /> List</button>
                      <button onClick={() => addSection('table')}><FaTable /> Table</button>
                    </div>
                  </div>

                  <div className="sections-list">
                    {sections.map((section, idx) => (
                      <div key={section.id} className="section-item">
                        <div className="section-item-header">
                          <span className="section-type">{section.type.toUpperCase()}</span>
                          <div className="section-item-actions">
                            {idx > 0 && <button onClick={() => moveSection(idx, 'up')}><FaArrowUp /></button>}
                            {idx < sections.length - 1 && <button onClick={() => moveSection(idx, 'down')}><FaArrowDown /></button>}
                            <button onClick={() => removeSection(idx)} className="delete-section"><FaTrashAlt /></button>
                          </div>
                        </div>
                        <div className="section-item-body">
                          {renderSectionEditor(section, idx)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {sections.length === 0 && (
                    <div className="no-sections-msg">
                      <FaImageIcon />
                      <p>No content sections</p>
                      <small>Click buttons above to add content</small>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer-sticky">
                <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="save-btn" onClick={handleSubmit} disabled={saving}>
                  {saving ? 'Saving...' : <><FaSave /> Save Service</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminServices;