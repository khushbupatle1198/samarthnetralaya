// components/admin/AdminBlogs.jsx
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaUpload, 
  FaImage, FaSpinner, FaCheckCircle, FaExclamationTriangle,
  FaHeading, FaParagraph, FaListUl, FaTable, FaImage as FaImageIcon,
  FaArrowUp, FaArrowDown, FaTrashAlt, FaToggleOn, FaToggleOff,
  FaSearch, FaFilter, FaEye, FaCalendarAlt, FaUser, FaClock,
  FaQuoteLeft, FaTag, FaNewspaper, FaComments
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import API_CONFIG from '../../config/apiConfig';
import './AdminBlogs.css';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
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
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    category: '',
    tags: '',
    author: 'Samarth Netralaya',
    readTime: 5,
    isPublished: true,
    isFeatured: false
  });

  const BASE_URL = API_CONFIG.BASE_URL;
  const categories = ['Eye Care', 'Surgery', 'Treatments', 'Prevention', 'Technology', 'Patient Stories', 'News'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchTerm, filterStatus, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/blogs/all`);
      const data = await response.json();
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showErrorMessage('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = [...blogs];
    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => 
        filterStatus === 'published' ? b.isPublished : !b.isPublished
      );
    }
    setFilteredBlogs(filtered);
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

  const uploadSectionImage = async (file, index) => {
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
        return data.imageUrl;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setUploadingSection(false);
    }
  };

  const handleSectionImageSelect = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...sections];
      updated[index].preview = reader.result;
      setSections(updated);
    };
    reader.readAsDataURL(file);
    await uploadSectionImage(file, index);
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
        columns: ['Topic', 'Details', 'More Info'], 
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
    if (!formData.title.trim()) {
      showErrorMessage('Please enter blog title');
      return;
    }
    setSaving(true);
    try {
      const formDataToSend = new FormData();
      
      const blogData = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        category: formData.category,
        tags: formData.tags,
        author: formData.author,
        readTime: parseInt(formData.readTime),
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured
      };
      
      formDataToSend.append('blog', new Blob([JSON.stringify(blogData)], { type: 'application/json' }));
      
      const sectionsData = sections.map(s => ({
        type: s.type,
        title: s.title || '',
        content: s.content || '',
        imagePath: s.imagePath || '',
        sectionOrder: s.sectionOrder,
        tableData: s.tableData || null
      }));
      
      formDataToSend.append('sections', new Blob([JSON.stringify(sectionsData)], { type: 'application/json' }));
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const url = editingBlog 
        ? `${BASE_URL}/api/blogs/update/${editingBlog.id}`
        : `${BASE_URL}/api/blogs/add`;
      
      const response = await fetch(url, {
        method: editingBlog ? 'PUT' : 'POST',
        body: formDataToSend
      });
      
      if (response.ok) {
        showSuccessMessage(editingBlog ? 'Blog updated!' : 'Blog added!');
        setShowModal(false);
        resetForm();
        fetchBlogs();
      } else {
        showErrorMessage('Failed to save blog');
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
      const response = await fetch(`${BASE_URL}/api/blogs/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        showSuccessMessage('Blog deleted!');
        fetchBlogs();
      } else {
        showErrorMessage('Delete failed');
      }
    } catch (error) {
      showErrorMessage('Network error');
    }
    setDeleteConfirm(null);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      shortDescription: blog.shortDescription || '',
      category: blog.category || '',
      tags: blog.tags || '',
      author: blog.author || 'Samarth Netralaya',
      readTime: blog.readTime || 5,
      isPublished: blog.isPublished,
      isFeatured: blog.isFeatured
    });
    setSelectedImage(null);
    setImagePreview(blog.featuredImage ? `${BASE_URL}${blog.featuredImage}` : null);
    
    if (blog.sections && blog.sections.length > 0) {
      setSections(blog.sections.map(s => ({ 
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
      title: '',
      shortDescription: '',
      category: '',
      tags: '',
      author: 'Samarth Netralaya',
      readTime: 5,
      isPublished: true,
      isFeatured: false
    });
    setSections([]);
    setSelectedImage(null);
    setImagePreview(null);
    setEditingBlog(null);
  };

  const toggleStatus = async (id, currentStatus) => {
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      const updated = { ...blog, isPublished: !currentStatus };
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('blog', new Blob([JSON.stringify({
          title: updated.title,
          shortDescription: updated.shortDescription,
          category: updated.category,
          tags: updated.tags,
          author: updated.author,
          readTime: updated.readTime,
          isPublished: updated.isPublished,
          isFeatured: updated.isFeatured
        })], { type: 'application/json' }));
        formDataToSend.append('sections', new Blob([JSON.stringify(blog.sections || [])], { type: 'application/json' }));
        
        const response = await fetch(`${BASE_URL}/api/blogs/update/${id}`, {
          method: 'PUT',
          body: formDataToSend
        });
        
        if (response.ok) {
          showSuccessMessage(`Blog ${!currentStatus ? 'published' : 'unpublished'}`);
          fetchBlogs();
        }
      } catch (error) {
        showErrorMessage('Status update failed');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderSectionEditor = (section, idx) => {
    switch (section.type) {
      case 'heading':
        return (
          <div className="section-editor-row">
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
              <option value="h1">H1 - Main Title</option>
              <option value="h2">H2 - Section Title</option>
              <option value="h3">H3 - Subtitle</option>
            </select>
          </div>
        );
      
      case 'subheading':
        return (
          <input
            type="text"
            placeholder="Subheading Text"
            value={section.title}
            onChange={(e) => updateSection(idx, 'title', e.target.value)}
            className="input-field"
          />
        );
      
      case 'paragraph':
        return (
          <textarea
            placeholder="Write your paragraph content here..."
            value={section.content}
            onChange={(e) => updateSection(idx, 'content', e.target.value)}
            rows="6"
            className="textarea-field"
          />
        );
      
      case 'quote':
        return (
          <textarea
            placeholder="Enter quote text..."
            value={section.content}
            onChange={(e) => updateSection(idx, 'content', e.target.value)}
            rows="3"
            className="textarea-field"
          />
        );
      
      case 'image':
        const imgSrc = section.preview || (section.imagePath ? `${BASE_URL}${section.imagePath}` : null);
        return (
          <div className="image-editor-modern">
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
            placeholder="Enter list items (one per line)&#10;Example:&#10;First item&#10;Second item&#10;Third item"
            value={section.content}
            onChange={(e) => updateSection(idx, 'content', e.target.value)}
            rows="6"
            className="textarea-field"
          />
        );
      
      case 'table':
        let tableData = { columns: ['Topic', 'Details', 'More Info'], rows: [['', '', '']] };
        try {
          if (section.tableData) tableData = JSON.parse(section.tableData);
        } catch(e) {}
        
        return (
          <div className="table-editor-modern">
            <div className="table-toolbar">
              <button onClick={() => {
                const newCols = [...tableData.columns, `Col ${tableData.columns.length + 1}`];
                const newRows = tableData.rows.map(row => [...row, '']);
                updateSection(idx, 'tableData', JSON.stringify({ columns: newCols, rows: newRows }));
              }}>+ Add Column</button>
              <button onClick={() => {
                if (tableData.columns.length > 1) {
                  const newCols = tableData.columns.slice(0, -1);
                  const newRows = tableData.rows.map(row => row.slice(0, -1));
                  updateSection(idx, 'tableData', JSON.stringify({ columns: newCols, rows: newRows }));
                }
              }}>- Remove Column</button>
              <button onClick={() => {
                const newRows = [...tableData.rows, Array(tableData.columns.length).fill('')];
                updateSection(idx, 'tableData', JSON.stringify({ columns: tableData.columns, rows: newRows }));
              }}>+ Add Row</button>
              <button onClick={() => {
                if (tableData.rows.length > 1) {
                  const newRows = tableData.rows.slice(0, -1);
                  updateSection(idx, 'tableData', JSON.stringify({ columns: tableData.columns, rows: newRows }));
                }
              }}>- Remove Row</button>
            </div>
            <div className="table-scroll-area">
              <table className="editor-table">
                <thead>
                  <tr>
                    {tableData.columns.map((col, ci) => (
                      <th key={ci}>
                        <input value={col} onChange={(e) => {
                          const newCols = [...tableData.columns];
                          newCols[ci] = e.target.value;
                          updateSection(idx, 'tableData', JSON.stringify({ columns: newCols, rows: tableData.rows }));
                        }} className="table-input" />
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
                          <input value={cell} onChange={(e) => {
                            const newRows = [...tableData.rows];
                            newRows[ri][ci] = e.target.value;
                            updateSection(idx, 'tableData', JSON.stringify({ columns: tableData.columns, rows: newRows }));
                          }} className="table-input" />
                        </td>
                      ))}
                      <td className="action-cell">
                        <button onClick={() => {
                          const newRows = tableData.rows.filter((_, i) => i !== ri);
                          updateSection(idx, 'tableData', JSON.stringify({ columns: tableData.columns, rows: newRows }));
                        }} className="delete-row">🗑️</button>
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
    total: blogs.length,
    published: blogs.filter(b => b.isPublished).length,
    draft: blogs.filter(b => !b.isPublished).length
  };

  return (
    <AdminLayout>
      <div className="admin-blogs-container">
        <AnimatePresence>
          {showSuccess && <div className="toast-success"><FaCheckCircle /> {successMessage}</div>}
          {showError && <div className="toast-error"><FaExclamationTriangle /> {errorMessage}</div>}
        </AnimatePresence>

        <div className="admin-header">
          <div>
            <h1>Blog Management</h1>
            <p>Create and manage blog articles</p>
          </div>
          <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
            <FaPlus /> Write New Article
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-card"><div className="stat-icon blue"><FaNewspaper /></div><div><h3>{stats.total}</h3><p>Total Articles</p></div></div>
          <div className="stat-card"><div className="stat-icon green"><FaCheckCircle /></div><div><h3>{stats.published}</h3><p>Published</p></div></div>
          <div className="stat-card"><div className="stat-icon orange"><FaSpinner /></div><div><h3>{stats.draft}</h3><p>Drafts</p></div></div>
        </div>

        <div className="filters-row">
          <div className="search-box"><FaSearch /><input type="text" placeholder="Search blogs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner"></div><p>Loading blogs...</p></div>
        ) : filteredBlogs.length === 0 ? (
          <div className="empty-state"><FaNewspaper /> <h3>No Blogs Yet</h3><p>Click "Write New Article" to create your first blog post.</p></div>
        ) : (
          <div className="blogs-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-item">
                <div className="blog-image">
                  {blog.featuredImage ? (
                    <img src={`${BASE_URL}${blog.featuredImage}`} alt={blog.title} />
                  ) : (
                    <div className="img-placeholder"><FaNewspaper /></div>
                  )}
                  {blog.isFeatured && <span className="featured-badge">Featured</span>}
                </div>
                <div className="blog-content">
                  <div className="blog-header">
                    <span className="category">{blog.category || 'Uncategorized'}</span>
                    <span className={`status ${blog.isPublished ? 'published' : 'draft'}`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.shortDescription?.substring(0, 100)}...</p>
                  <div className="blog-meta">
                    <span><FaCalendarAlt /> {formatDate(blog.publishedAt || blog.createdAt)}</span>
                    <span><FaUser /> {blog.author}</span>
                    <span><FaClock /> {blog.readTime} min read</span>
                    <span><FaEye /> {blog.viewCount || 0} views</span>
                  </div>
                  <div className="blog-actions">
                    <button onClick={() => toggleStatus(blog.id, blog.isPublished)} className="action-toggle">
                      {blog.isPublished ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                    <button onClick={() => handleEdit(blog)} className="action-edit"><FaEdit /></button>
                    <button onClick={() => setDeleteConfirm(blog.id)} className="action-delete"><FaTrash /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {deleteConfirm && (
          <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
            <div className="modal-small" onClick={e => e.stopPropagation()}>
              <h3>Confirm Delete</h3>
              <p>Delete this blog post? This action cannot be undone.</p>
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
                <h2>{editingBlog ? 'Edit Blog Post' : 'Write New Blog Post'}</h2>
                <button className="close-modal" onClick={() => setShowModal(false)}><FaTimes /></button>
              </div>

              <div className="modal-body-scroll">
                <div className="form-section">
                  <h3>Basic Information</h3>
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Enter blog title" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tags (comma separated)</label>
                      <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="Eye Care, Surgery, Treatment" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Author</label>
                      <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Read Time (minutes)</label>
                      <input type="number" value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Short Description</label>
                    <textarea rows="2" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} placeholder="Brief summary of the blog post" />
                  </div>
                  <div className="form-group">
                    <label>Featured Image</label>
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
                      <label htmlFor="main-img" className="upload-main-btn"><FaUpload /> Upload Featured Image</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Status</label>
                      <select value={formData.isPublished} onChange={(e) => setFormData({...formData, isPublished: e.target.value === 'true'})}>
                        <option value="true">Published</option>
                        <option value="false">Draft</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Feature this article?</label>
                      <select value={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.value === 'true'})}>
                        <option value="true">Yes, Feature on homepage</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="sections-header">
                    <h3>Content Sections</h3>
                    <div className="section-buttons">
                      <button onClick={() => addSection('heading')}><FaHeading /> Heading</button>
                      <button onClick={() => addSection('subheading')}><FaHeading /> Subheading</button>
                      <button onClick={() => addSection('paragraph')}><FaParagraph /> Paragraph</button>
                      <button onClick={() => addSection('quote')}><FaQuoteLeft /> Quote</button>
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
                      <FaNewspaper />
                      <p>No content sections</p>
                      <small>Click buttons above to add headings, paragraphs, images, lists, or tables</small>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer-sticky">
                <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="save-btn" onClick={handleSubmit} disabled={saving}>
                  {saving ? 'Saving...' : <><FaSave /> {editingBlog ? 'Update Blog' : 'Publish Blog'}</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;