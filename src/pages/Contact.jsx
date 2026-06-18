// pages/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us. We will get back to you soon!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            We're here to help with all your eye care needs
          </motion.p>
        </div>
      </section>

      <div className="contact-container">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-info-section"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Get in Touch</h2>
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <h3>Phone</h3>
                  <p>+91-9890374024</p>
                  <p>+91-9960198199</p>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h3>Email</h3>
                  <p>krishnabhojwani@.com</p>
                </div>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h3>Address</h3>
                  <p>Samarth Netralaya, Chhapru Nagar Sq, Central Avenue, Nagpur 440008</p>
                </div>
              </div>
              <div className="info-item">
                <FaClock className="info-icon" />
                <div>
                  <h3>Working Hours</h3>
                  <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
                  <p>Sunday: By Appointment Only</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="contact-form-section"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
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
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;