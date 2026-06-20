// components/Footer.jsx - Updated with Logo Image & Developer Credit
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaEye, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube,
  FaArrowUp,
  FaHeart,
  FaClock,
  FaAmbulance,
  FaShieldAlt,
  FaCode,
  FaExternalLinkAlt
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Appointment", path: "/appointment" },
    { name: "Contact Us", path: "/contact" },
    { name: "Media", path: "/media" }
  ];

  const services = [
    "Refractive Surgery", "Cornea", "Cataract", "Glaucoma",
    "Paediatric Eye Care", "Retinal Screening", "Telemedicine", "Eye Emergencies"
  ];

  const workingHours = {
    weekdays: "8:00 AM – 8:00 PM",
    saturday: "8:00 AM – 8:00 PM",
    sunday: "By Appointment Only",
    emergency: "24/7 Available"
  };

  return (
    <footer className="footer-modern">
      {/* Scroll to Top Button */}
      {showScroll && (
        <motion.button 
          className="scroll-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ y: -5 }}
        >
          <FaArrowUp />
        </motion.button>
      )}

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Section with Logo Image */}
            <motion.div 
              className="footer-brand"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="footer-logo">
                <img 
                  src="/images/logo.webp" 
                  alt="Samarth Netralaya Logo" 
                  className="footer-logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector('.footer-logo-fallback').style.display = 'flex';
                  }}
                />
                <div className="footer-logo-fallback" style={{ display: 'none' }}>
                  <div className="logo-icon-glow">
                    <FaEye />
                  </div>
                </div>
                <div className="logo-text">
                  <span className="logo-main">Samarth</span>
                  <span className="logo-sub">Netralaya</span>
                </div>
              </div>
              <p className="brand-tagline">
                Compassionate eye care — modern tech, caring hands. 
                Visit us in Nagpur.
              </p>
              <div className="trust-badges">
                <div className="badge">
                  <FaShieldAlt />
                  <span>ISO Certified</span>
                </div>
                <div className="badge">
                  <FaHeart />
                  <span>Patient First</span>
                </div>
              </div>
              <div className="social-links-modern">
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }}><FaFacebookF /></motion.a>
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }}><FaTwitter /></motion.a>
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }}><FaInstagram /></motion.a>
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }}><FaLinkedinIn /></motion.a>
                <motion.a href="#" whileHover={{ y: -3, scale: 1.1 }}><FaYoutube /></motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="footer-links"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3>Quick Links</h3>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>
                      <span className="link-arrow">→</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Services */}
            <motion.div 
              className="footer-services"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Our Services</h3>
              <ul>
                {services.map((service, index) => (
                  <li key={index}>
                    <Link to="/services">
                      <span className="service-dot">•</span>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Hours */}
            <motion.div 
              className="footer-contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3>Contact & Hours</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <FaPhone />
                  <div>
                    <p>+91-9890374024</p>
                    <p className="small">+91-9960198199</p>
                  </div>
                </div>
                <div className="contact-item">
                  <FaEnvelope />
                  <p>krishnabhojwani@.com</p>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <p>Chhapru Nagar Sq, Central Avenue, Nagpur 440008</p>
                </div>
              </div>
              
              <div className="hours-details">
                <h4>Working Hours</h4>
                <div className="hour-item">
                  <FaClock />
                  <span>Mon - Sat: {workingHours.weekdays}</span>
                </div>
                <div className="hour-item">
                  <FaClock />
                  <span>Sunday: {workingHours.sunday}</span>
                </div>
                <div className="hour-item emergency">
                  <FaAmbulance />
                  <span>Emergency: {workingHours.emergency}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div 
            className="newsletter-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="newsletter-content">
              <div className="newsletter-text">
                <h3>Subscribe to Our Newsletter</h3>
                <p>Get latest updates about eye care tips and special offers</p>
              </div>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-modern">
        <div className="footer-container">
          <div className="bottom-content">
            <p>&copy; 2025 Samarth Netralaya. All Rights Reserved.</p>
            <div className="bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Credit - New Section */}
      <div className="footer-developer">
        <div className="footer-container">
          <div className="developer-content">
            <motion.div 
              className="developer-credit"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaCode className="developer-icon" />
              <span>Developed with ❤️ by</span>
              <a 
                href="https://sujitmportfolio.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="developer-link"
              >
                Sujit Manapure
                <FaExternalLinkAlt className="external-icon" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;