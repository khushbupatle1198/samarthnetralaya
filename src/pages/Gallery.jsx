// pages/Gallery.jsx - Simple Image Gallery
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaChevronLeft, FaChevronRight,
  FaExpand, FaHeart, FaRegHeart
} from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedItems, setLikedItems] = useState([]);

  // Gallery images - Only images, no extra data
  const galleryImages = [
    { id: 1, image: "/images/gallery/img (1).png" },
    { id: 2, image: "/images/gallery/img (2).png" },
    { id: 3, image: "/images/gallery/img (3).png" },
    { id: 4, image: "/images/gallery/img (4).png" },
    { id: 5, image: "/images/gallery/img (5).png" },
    { id: 6, image: "/images/gallery/img (6).png" },
    { id: 7, image: "/images/gallery/img (7).png" },
    { id: 8, image: "/images/gallery/img (8).png" },
    { id: 9, image: "/images/gallery/img (9).png" },
    { id: 10, image: "/images/gallery/img (10).png" },
    { id: 11, image: "/images/gallery/img (11).png" },
    { id: 12, image: "/images/gallery/img (12).png" },
    { id: 13, image: "/images/gallery/img (13).png" },
    { id: 14, image: "/images/gallery/img (14).png" },
    { id: 15, image: "/images/gallery/img (15).png" },
    { id: 16, image: "/images/gallery/img (16).png" },
    { id: 17, image: "/images/gallery/img (17).png" },
    { id: 18, image: "/images/gallery/img (18).png" },
    { id: 19, image: "/images/gallery/img (19).png" },
    { id: 20, image: "/images/gallery/img (20).png" },
    { id: 21, image: "/images/gallery/img (21).png" }
  ];

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(galleryImages[index]);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateModal = (direction) => {
    const newIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="gallery-page-simple">
      {/* Hero Section */}
      <section className="gallery-hero-simple">
        <div className="container-simple">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content-simple"
          >
            <div className="hero-badge-simple">
              <span>📸</span>
              <span>Our Gallery</span>
            </div>
            <h1 className="hero-title-simple">
              Explore Our <span>Facilities</span>
            </h1>
            <p className="hero-description-simple">
              A visual tour of Samarth Netralaya's state-of-the-art infrastructure
            </p>
          </motion.div>
        </div>
        <div className="hero-wave-simple">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 74.7C384 74.7 480 53.3 576 42.7C672 32 768 32 864 42.7C960 53.3 1056 74.7 1152 74.7C1248 74.7 1344 53.3 1392 42.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Gallery Grid - Only Images */}
      <section className="gallery-grid-simple">
        <div className="container-simple">
          <motion.div 
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery-item-simple"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => openModal(index)}
              >
                <div className="image-wrapper-simple">
                  <img src={item.image} alt={`Gallery ${item.id}`} />
                  <div className="image-overlay-simple">
                    <div className="overlay-content-simple">
                      <FaExpand className="expand-icon-simple" />
                      <span>View</span>
                    </div>
                    <button 
                      className="like-btn-simple"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                    >
                      {likedItems.includes(item.id) ? <FaHeart className="liked" /> : <FaRegHeart />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal - Only Image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-modal-simple"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="lightbox-content-simple"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button className="lightbox-close-simple" onClick={closeModal}>
                <FaTimes />
              </button>

              <button className="lightbox-nav-simple prev" onClick={() => navigateModal(-1)}>
                <FaChevronLeft />
              </button>
              <button className="lightbox-nav-simple next" onClick={() => navigateModal(1)}>
                <FaChevronRight />
              </button>

              <div className="lightbox-image-simple">
                <img src={selectedImage.image} alt="Gallery" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;