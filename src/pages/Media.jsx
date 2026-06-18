// pages/Media.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaQuestionCircle, FaImage, FaBlog } from 'react-icons/fa';
import './Media.css';

const Media = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('blogs');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, [location]);

  const blogs = [
    {
      title: "Understanding Cataracts: Symptoms and Treatment",
      date: "March 15, 2024",
      excerpt: "Learn about the common signs of cataracts and the latest treatment options available..."
    },
    {
      title: "Digital Eye Strain: Tips for Computer Users",
      date: "March 10, 2024",
      excerpt: "How to protect your eyes in the digital age with simple exercises and habits..."
    },
    {
      title: "Glaucoma: The Silent Thief of Sight",
      date: "March 5, 2024",
      excerpt: "Early detection and management of glaucoma can prevent vision loss..."
    }
  ];

  const gallery = [
    { id: 1, title: "State-of-the-art Operation Theatre", category: "Facility" },
    { id: 2, title: "Advanced Diagnostic Equipment", category: "Equipment" },
    { id: 3, title: "Patient Consultation Area", category: "Facility" },
    { id: 4, title: "LASIK Surgery Suite", category: "Surgery" },
    { id: 5, title: "Pediatric Eye Care Center", category: "Facility" },
    { id: 6, title: "Retinal Imaging System", category: "Equipment" }
  ];

  const testimonials = [
    { name: "Rajesh Sharma", rating: 5, text: "Excellent care and professional staff. Highly recommended!" },
    { name: "Priya Patel", rating: 5, text: "The doctors are very knowledgeable and caring." },
    { name: "Amit Kumar", rating: 4, text: "Good experience overall, satisfied with the treatment." }
  ];

  const faqs = [
    { q: "What are your clinic timings?", a: "Monday to Saturday: 8:00 AM - 8:00 PM, Sunday: By appointment only." },
    { q: "Do you accept insurance?", a: "Yes, we accept most major insurance plans." },
    { q: "How do I book an appointment?", a: "You can call us or use our online appointment system." },
    { q: "Is LASIK surgery painful?", a: "LASIK is virtually painless with minimal discomfort during recovery." }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'blogs':
        return (
          <div className="blogs-grid">
            {blogs.map((blog, index) => (
              <motion.div key={index} className="blog-card" whileHover={{ y: -5 }}>
                <div className="blog-icon"><FaBlog /></div>
                <h3>{blog.title}</h3>
                <span className="blog-date">{blog.date}</span>
                <p>{blog.excerpt}</p>
                <button className="read-more-btn">Read More →</button>
              </motion.div>
            ))}
          </div>
        );
      case 'gallery':
        return (
          <div className="gallery-grid">
            {gallery.map((item) => (
              <motion.div key={item.id} className="gallery-item" whileHover={{ scale: 1.02 }}>
                <div className="gallery-placeholder">
                  <FaImage className="gallery-icon" />
                </div>
                <h4>{item.title}</h4>
                <span className="gallery-category">{item.category}</span>
              </motion.div>
            ))}
          </div>
        );
      case 'testimonials':
        return (
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} className="testimonial-card-media" whileHover={{ y: -5 }}>
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="star" />
                  ))}
                </div>
                <p>"{testimonial.text}"</p>
                <h4>- {testimonial.name}</h4>
              </motion.div>
            ))}
          </div>
        );
      case 'faqs':
        return (
          <div className="faqs-list">
            {faqs.map((faq, index) => (
              <motion.div key={index} className="faq-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <div className="faq-question">
                  <FaQuestionCircle className="faq-icon" />
                  <h3>{faq.q}</h3>
                </div>
                <p className="faq-answer">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="media-page">
      <section className="media-hero">
        <div className="container">
          <h1>Media Center</h1>
          <p>Stay updated with our latest news, events, and resources</p>
        </div>
      </section>

      <div className="media-tabs">
        <div className="container">
          <div className="tabs">
            <button className={activeTab === 'blogs' ? 'tab active' : 'tab'} onClick={() => setActiveTab('blogs')}>Blogs</button>
            <button className={activeTab === 'gallery' ? 'tab active' : 'tab'} onClick={() => setActiveTab('gallery')}>Gallery</button>
            <button className={activeTab === 'testimonials' ? 'tab active' : 'tab'} onClick={() => setActiveTab('testimonials')}>Testimonials</button>
            <button className={activeTab === 'faqs' ? 'tab active' : 'tab'} onClick={() => setActiveTab('faqs')}>FAQs</button>
          </div>
        </div>
      </div>

      <section className="media-content">
        <div className="container">
          {renderContent()}
        </div>
      </section>
    </div>
  );
};

export default Media;