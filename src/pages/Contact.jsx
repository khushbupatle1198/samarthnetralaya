// pages/Contact.jsx - Modern Premium Version
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaPaperPlane, FaCheckCircle, FaSpinner,
  FaWhatsapp, FaYoutube, FaMapPin, FaHeadset
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["+91-9890374024", "+91-9960198199"],
      color: "#10b981"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["info@samarthnetralaya.com"],
      color: "#3b82f6"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      details: ["Chhapru Nagar Sq, Central Avenue, Nagpur 440008"],
      color: "#f59e0b"
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: ["Mon-Sat: 8:00 AM - 8:00 PM", "Sunday: By Appointment Only"],
      color: "#8b5cf6"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", color: "#1877f2" },
    { icon: <FaTwitter />, href: "#", color: "#1da1f2" },
    { icon: <FaInstagram />, href: "#", color: "#e4405f" },
    { icon: <FaLinkedin />, href: "#", color: "#0a66c2" },
    { icon: <FaWhatsapp />, href: "#", color: "#25d366" },
    { icon: <FaYoutube />, href: "#", color: "#ff0000" }
  ];

  return (
    <div className="contact-page-modern">
      {/* Hero Section */}
      <section className="contact-hero-premium">
        <div className="hero-particles"></div>
        <div className="hero-glow"></div>
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content-premium"
          >
            <div className="hero-badge-premium">
              <FaHeadset className="badge-icon" />
              <span>Get in Touch</span>
            </div>
            <h1 className="hero-title-premium">
              We're Here to <span className="gradient-text">Help You</span>
            </h1>
            <div className="hero-line"></div>
            <p className="hero-description-premium">
              Have questions about our services or want to schedule a consultation? 
              Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>
        <div className="hero-wave-premium">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 74.7C384 74.7 480 53.3 576 42.7C672 32 768 32 864 42.7C960 53.3 1056 74.7 1152 74.7C1248 74.7 1344 53.3 1392 42.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-cards">
        <div className="container-premium">
          <div className="info-cards-grid">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="info-card-premium"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="info-card-icon" style={{ background: `${item.color}20`, color: item.color }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <section className="contact-main-section">
        <div className="container-premium">
          <div className="contact-main-grid">
            {/* Form Section */}
            <motion.div
              className="contact-form-modern"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>We'll get back to you within 24 hours</p>
              </div>

              {isSuccess ? (
                <motion.div 
                  className="success-message"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <FaCheckCircle />
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting us. We'll respond shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="submit-btn-modern"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><FaSpinner className="spinning" /> Sending...</>
                    ) : (
                      <><FaPaperPlane /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Side Info */}
            <motion.div
              className="contact-side-info"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="side-card">
                <div className="side-card-icon">
                  <FaMapPin />
                </div>
                <h3>Visit Our Clinic</h3>
                <p>Samarth Netralaya, Chhapru Nagar Sq, Central Avenue, Nagpur 440008</p>
                <div className="side-card-map">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.123456789012!2d79.084569!3d21.145823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0e5e5e5e5e5%3A0x1234567890abcdef!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin" 
                    width="100%" 
                    height="200" 
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Clinic Location"
                  ></iframe>
                </div>
              </div>

              <div className="side-card social-card">
                <h3>Connect With Us</h3>
                <div className="social-links-modern">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="social-link-modern"
                      style={{ '--hover-color': social.color }}
                      whileHover={{ y: -3, scale: 1.1 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                <div className="emergency-contact">
                  <h4>Emergency Support</h4>
                  <p className="emergency-phone">📞 +91-9960198199</p>
                  <p className="emergency-text">Available 24/7 for emergencies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;