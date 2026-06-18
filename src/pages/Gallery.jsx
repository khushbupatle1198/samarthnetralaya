// pages/Gallery.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaImage } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
  const galleryItems = [
    { id: 1, title: "Operation Theatre", category: "Facility", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
    { id: 2, title: "Advanced Diagnostic Equipment", category: "Equipment", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop" },
    { id: 3, title: "Patient Consultation Area", category: "Facility", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop" },
    { id: 4, title: "LASIK Surgery Suite", category: "Surgery", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop" },
    { id: 5, title: "Pediatric Eye Care Center", category: "Facility", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" },
    { id: 6, title: "Retinal Imaging System", category: "Equipment", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
    { id: 7, title: "Waiting Area", category: "Facility", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop" },
    { id: 8, title: "Cataract Surgery", category: "Surgery", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop" },
    { id: 9, title: "Glaucoma Testing", category: "Equipment", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" }
  ];

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">Our Gallery</div>
            <h1>Explore Our <span>Facilities</span></h1>
            <p>Take a visual tour of our state-of-the-art eye care facilities</p>
          </motion.div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 74.7C384 74.7 480 53.3 576 42.7C672 32 768 32 864 42.7C960 53.3 1056 74.7 1152 74.7C1248 74.7 1344 53.3 1392 42.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={item.image} alt={item.title} />
                <div className="gallery-overlay">
                  <h4>{item.title}</h4>
                  <span>{item.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;