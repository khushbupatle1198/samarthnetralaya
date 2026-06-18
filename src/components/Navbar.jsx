// components/Navbar.jsx - Updated
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEye, 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaHome,
  FaConciergeBell,
  FaPhotoVideo,
  FaInfoCircle,
  FaPhoneAlt,
  FaCalendarAlt,
  FaNewspaper,
  FaImage
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mediaDropdown, setMediaDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  // Static Services List
  const servicesList = [
    "Refractive Surgery", "Cornea", "Cataract", "Vitreous, Retina, & Uvea",
    "ROP Screening", "Glaucoma", "Paediatric Eye Care", "Occuloplasty",
    "Neuropthalmology", "Dry Eye Management", "Eye Banking", 
    "Low Vision Aids & Prosthetics", "Diabetic Eye Care", "Retinal Screening",
    "Telemedicine Services", "Eye Emergencies"
  ];

  // ✅ Updated Media Items - Only Blog and Gallery
  const mediaItems = [
    { name: "Blog", path: "/blogs", icon: <FaNewspaper /> },
    { name: "Gallery", path: "/gallery", icon: <FaImage /> }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        if (!event.target.closest('.mobile-toggle')) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
    setMediaDropdown(false);
  }, [location]);

  const handleServiceClick = (service) => {
    navigate('/services', { state: { selectedService: service } });
    setIsOpen(false);
    setServicesDropdown(false);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdown(!servicesDropdown);
    setMediaDropdown(false);
  };

  const toggleMediaDropdown = () => {
    setMediaDropdown(!mediaDropdown);
    setServicesDropdown(false);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Services", path: null, icon: <FaConciergeBell />, hasDropdown: true },
    { name: "Media", path: null, icon: <FaPhotoVideo />, hasDropdown: true },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="logo-wrapper">
              <div className="logo-icon"><FaEye /></div>
              <div className="logo-text">
                <span className="logo-main">Samarth</span>
                <span className="logo-sub">Netralaya</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-menu-desktop">
            {navLinks.map((link, index) => (
              <div 
                key={index} 
                className={`nav-item ${link.hasDropdown ? 'dropdown-trigger' : ''}`}
                onMouseEnter={() => {
                  if (!isMobile && link.hasDropdown) {
                    if (link.name === 'Services') setServicesDropdown(true);
                    if (link.name === 'Media') setMediaDropdown(true);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile && link.hasDropdown) {
                    if (link.name === 'Services') setServicesDropdown(false);
                    if (link.name === 'Media') setMediaDropdown(false);
                  }
                }}
              >
                {link.path ? (
                  <Link to={link.path} className="nav-link">
                    {link.icon} <span>{link.name}</span>
                  </Link>
                ) : (
                  <button 
                    className="nav-link dropdown-btn"
                    onClick={() => {
                      if (link.name === 'Services') toggleServicesDropdown();
                      if (link.name === 'Media') toggleMediaDropdown();
                    }}
                  >
                    {link.icon} <span>{link.name}</span>
                    <FaChevronDown className={`dropdown-arrow ${(link.name === 'Services' && servicesDropdown) || (link.name === 'Media' && mediaDropdown) ? 'rotated' : ''}`} />
                  </button>
                )}

                {/* Services Dropdown */}
                {link.name === 'Services' && servicesDropdown && (
                  <div className="dropdown-mega">
                    <div className="dropdown-header">
                      <h3>Our Services</h3>
                      <p>Advanced eye care solutions</p>
                    </div>
                    <div className="dropdown-grid">
                      {servicesList.map((service, idx) => (
                        <div key={idx} className="dropdown-item" onClick={() => handleServiceClick(service)}>
                          <span className="dot"></span> {service}
                        </div>
                      ))}
                    </div>
                    <div className="dropdown-footer">
                      <button className="view-all" onClick={() => navigate('/services')}>
                        View All Services →
                      </button>
                    </div>
                  </div>
                )}

                {/* Media Dropdown - Only Blog & Gallery */}
                {link.name === 'Media' && mediaDropdown && (
                  <div className="dropdown-simple">
                    {mediaItems.map((item, idx) => (
                      <Link key={idx} to={item.path} className="dropdown-item-simple" onClick={() => {
                        setMediaDropdown(false);
                        setIsOpen(false);
                      }}>
                        <span className="item-icon">{item.icon}</span> {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="nav-actions">
            <button className="appointment-btn" onClick={() => navigate('/appointment')}>
              <FaCalendarAlt /> <span>Book Now</span>
            </button>
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              ref={mobileMenuRef}
              className="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-menu-inner">
                <div className="mobile-nav-links">
                  <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                    <FaHome /> Home
                  </Link>
                  
                  <div className="mobile-dropdown">
                    <button className="mobile-dropdown-header" onClick={toggleServicesDropdown}>
                      <FaConciergeBell /> Services
                      <FaChevronDown className={servicesDropdown ? 'rotated' : ''} />
                    </button>
                    {servicesDropdown && (
                      <div className="mobile-dropdown-menu">
                        {servicesList.map((service, idx) => (
                          <div key={idx} className="mobile-dropdown-item" onClick={() => handleServiceClick(service)}>
                            {service}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mobile-dropdown">
                    <button className="mobile-dropdown-header" onClick={toggleMediaDropdown}>
                      <FaPhotoVideo /> Media
                      <FaChevronDown className={mediaDropdown ? 'rotated' : ''} />
                    </button>
                    {mediaDropdown && (
                      <div className="mobile-dropdown-menu">
                        {mediaItems.map((item, idx) => (
                          <Link key={idx} to={item.path} className="mobile-dropdown-item" onClick={() => setIsOpen(false)}>
                            {item.icon} {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link to="/about" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                    <FaInfoCircle /> About
                  </Link>
                  <Link to="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                    <FaPhoneAlt /> Contact
                  </Link>
                  <Link to="/appointment" className="mobile-nav-link appointment-mobile" onClick={() => setIsOpen(false)}>
                    <FaCalendarAlt /> Book Appointment
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;