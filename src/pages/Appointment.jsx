// pages/Appointment.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Appointment.module.css';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const services = [
    "Refractive Surgery",
    "Cornea",
    "Cataract",
    "Vitreous, Retina, & Uvea",
    "ROP Screening",
    "Glaucoma",
    "Paediatric Eye Care",
    "Occuloplasty",
    "Neuropthalmology",
    "Dry Eye Management",
    "Eye Banking",
    "Low Vision Aids & Prosthetics",
    "Diabetic Eye Care",
    "Retinal Screening",
    "Telemedicine Services",
    "Eye Emergencies"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const message = `👁️ *New Appointment Request*
    
📝 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
🎂 *Age:* ${formData.age || 'Not provided'}
🏥 *Service:* ${formData.service}
📅 *Preferred Date:* ${formData.preferredDate}
🕐 *Preferred Time:* ${formData.preferredTime}
💬 *Message:* ${formData.message || 'No additional message'}`;

    // WhatsApp number (without + or spaces)
    const phoneNumber = '919960198199'; // 91 is India country code
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
  };

  return (
    <div className={styles.appointmentPage}>
      <section className={styles.appointmentHero}>
        <div className={styles.container}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Book an Appointment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Schedule your consultation with our expert eye specialists
          </motion.p>
        </div>
      </section>

      <section className={styles.appointmentFormSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.appointmentFormContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Select Service *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred Time *</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                    <option value="Evening (3:00 PM - 7:00 PM)">Evening (3:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Additional Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific concerns or questions?"
                ></textarea>
              </div>

              <button type="submit" className={styles.bookBtn}>
                <span>📅</span> Book Appointment via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;