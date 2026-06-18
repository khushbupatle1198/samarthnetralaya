// components/admin/AdminHero.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { FaSave, FaTimes, FaVideo, FaImage } from 'react-icons/fa';
import API_CONFIG from '../../config/apiConfig';
import './AdminHero.css';

const AdminHero = () => {
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    description: '',
    btnText: 'Book Appointment',
    btnLink: '/appointment',
    secondaryBtnText: 'Learn More',
    secondaryBtnLink: '/about'
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const BASE_URL = API_CONFIG.BASE_URL;

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/hero/active`);
      const data = await response.json();
      setHeroData(data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('hero', new Blob([JSON.stringify(heroData)], { type: 'application/json' }));
      if (selectedVideo) formData.append('video', selectedVideo);
      if (selectedImage) formData.append('image', selectedImage);

      const response = await fetch(`${BASE_URL}/api/hero/update`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        alert('Hero section updated successfully!');
        fetchHeroData();
        setSelectedVideo(null);
        setSelectedImage(null);
      } else {
        alert('Failed to update hero section');
      }
    } catch (error) {
      console.error('Error updating hero:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-hero-container">
        <div className="page-header">
          <div>
            <h1>Hero Section Management</h1>
            <p>Manage homepage banner content and background video</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="hero-form">
          <div className="form-section">
            <h3>Content Settings</h3>
            
            <div className="form-group">
              <label>Main Title</label>
              <input
                type="text"
                value={heroData.title}
                onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                placeholder="Welcome to Samarth Netralaya"
                required
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={heroData.subtitle}
                onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                placeholder="Best Care for Your Good Eye Health"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                value={heroData.description}
                onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                placeholder="Compassionate eye care — modern tech, caring hands..."
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Button Settings</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Primary Button Text</label>
                <input
                  type="text"
                  value={heroData.btnText}
                  onChange={(e) => setHeroData({...heroData, btnText: e.target.value})}
                  placeholder="Book Appointment"
                />
              </div>
              <div className="form-group">
                <label>Primary Button Link</label>
                <input
                  type="text"
                  value={heroData.btnLink}
                  onChange={(e) => setHeroData({...heroData, btnLink: e.target.value})}
                  placeholder="/appointment"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Secondary Button Text</label>
                <input
                  type="text"
                  value={heroData.secondaryBtnText}
                  onChange={(e) => setHeroData({...heroData, secondaryBtnText: e.target.value})}
                  placeholder="Learn More"
                />
              </div>
              <div className="form-group">
                <label>Secondary Button Link</label>
                <input
                  type="text"
                  value={heroData.secondaryBtnLink}
                  onChange={(e) => setHeroData({...heroData, secondaryBtnLink: e.target.value})}
                  placeholder="/about"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Media Settings</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Background Video</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setSelectedVideo(e.target.files[0])}
                    id="video-input"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="video-input" className="file-label">
                    <FaVideo /> {selectedVideo ? selectedVideo.name : 'Choose Video File'}
                  </label>
                  {heroData.videoUrl && !selectedVideo && (
                    <p className="current-file">Current: {heroData.videoUrl}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Poster/Thumbnail Image (Optional)</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    id="image-input"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-input" className="file-label">
                    <FaImage /> {selectedImage ? selectedImage.name : 'Choose Image File'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={saving}>
              <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        <div className="preview-section">
          <h3>Live Preview</h3>
          <div className="preview-card">
            <div className="preview-header">
              <span className="preview-badge">Samarth Netralaya</span>
              <h2>{heroData.title || 'Welcome to Samarth Netralaya'}</h2>
              <h3>{heroData.subtitle || 'Best Care for Your Good Eye Health'}</h3>
              <p>{heroData.description}</p>
              <div className="preview-buttons">
                <button className="preview-btn-primary">{heroData.btnText}</button>
                <button className="preview-btn-secondary">{heroData.secondaryBtnText}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHero;